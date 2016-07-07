# H13 - Connection closed without response

An example of triggering [Heroku's H13 Error](https://devcenter.heroku.com/articles/error-codes#h13-connection-closed-without-response) with Node.js.

## Try it on Heroku

```
$ git clone https://github.com/hunterloftis/heroku-node-errcodes.git
$ cd heroku-node-errcodes/h13
$ git init
$ git add --all
$ git commit -am 'h13 example'
$ heroku create
$ git push heroku master
$ heroku open
$ heroku logs --tail
```

## What happens

The server listens on `PORT` and accepts connections,
but then destroys the connection's socket without sending any response.

The simplest way to simulate this is to immediately call `req.socket.destroy()`.
In practice, the socket is usually destroyed because the application threw an error before a response is sent.
Throwing the error exits the process, which destroys any open sockets, triggering H13s.

If you're neither explicitly destroying a socket, nor seeing any exceptions,
your app may be [catching UncaughtExceptions](https://nodejs.org/api/process.html#process_event_uncaughtexception).
It may be doing this directly, in your code, or through one of several
modules that implement an UncaughtException handler.
Note that this is [almost always a bad idea](https://nodejs.org/api/process.html#process_warning_using_uncaughtexception_correctly).

## How to fix it

To fix an H13, you'll need to find where the socket is being prematurely destroyed.

The first thing to check is for unhandled exceptions (stack traces) in your logs around the H13.
If you see them, this error is probably what's destroying the response's socket.

Next, try to isolate a single route that consistently creates an H13 error.
Then, add logs along all the steps in that route that logs the step along with the x-request-id header.
These logs will tell you what you can safely ignore - everything logged is successfully handled.
Somewhere in the rest of the handler, an error is thrown or a socket is explicitly destroyed.

## Bad clients

Bad clients can also cause H13 errors by sending invalid requests that Node's low-level HTTP server will reject immediately.
You can test this out on any Heroku Node.js app with the `bad-client.js` file here:

```
$ HOST=appname.herokuapp.com PORT=80 node bad-client.js
$ heroku logs --tail -a appname
```

In this case, the client sends a path which starts with '?' ('?invalid=request' vs the correct '/?invalid=request').
Node's HTTP server will close the connection immediately without giving your application a chance to handle it.
