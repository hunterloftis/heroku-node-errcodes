# H15 - Idle connection

An example of triggering [Heroku's H15 Error](https://devcenter.heroku.com/articles/error-codes#h15-idle-connection) with Node.js.

## Try it on Heroku

```
$ git clone https://github.com/hunterloftis/heroku-node-errcodes.git
$ cd heroku-node-errcodes/h15
$ git init
$ git add --all
$ git commit -am 'h15 example'
$ heroku create
$ git push heroku master
$ heroku open
$ heroku logs --tail
```

## What happens

The server begins writing a response, sending over a header.
However, the rest of the response isn't sent within a 55-second window.
When this happens, the Heroku Router raises an H15 error.

You can also see this error when using long-polling WebSocket fallbacks
or persistent WebSocket connections without sub-55s pings.

## How to fix it

This error usually indicates that your application started processing a request,
but never finished.

To debug, you should make the request that is going idle and look at which headers (or response) is coming back.
This will give you clues about which parts of your route handler are working, and which parts are failing to continue the response.
