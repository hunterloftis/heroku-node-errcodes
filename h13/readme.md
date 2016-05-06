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
In practice, this usually happens due to the application throwing an error before a response is sent.
Throwing the error exits the process, which destroys any open sockets, triggering H13s.

## How to fix it

To fix an H13, you'll need to find where the socket is being prematurely destroyed.

The first thing to check is for unhandled exceptions (stack traces) in your logs around the H13.
If you see them, this error is probably what's destroying the response's socket.

Next, try to isolate a single route that consistently creates an H13 error.
Then, add logs along all the steps in that route that logs the step along with the x-request-id header.
These logs will tell you what you can safely ignore - everything logged is successfully handled.
Somewhere in the rest of the handler, an error is thrown or a socket is explicitly destroyed.
