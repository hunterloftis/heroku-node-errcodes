# H18 - Server request interrupted

An example of triggering [Heroku's H18 Error](https://devcenter.heroku.com/articles/error-codes#h18-server-request-interrupted) with Node.js.

## Try it on Heroku

```
$ git clone https://github.com/hunterloftis/heroku-node-errcodes.git
$ cd heroku-node-errcodes/h18
$ git init
$ git add --all
$ git commit -am 'h18 example'
$ heroku create
$ git push heroku master
$ heroku open
$ heroku logs --tail
```

## What happens

The H18 error is similar to the H13 in that both signify that the socket was destroyed before a response was completed.
With an H13, the socket was connected, then destroyed without sending any data.
An H18 signifies that the socket connected, some data was sent as part of a response by the app,
but then the socket was destroyed without completing the response.

In this case, we write 'test' to the response, then throw an error before `res.end()`.

## How to fix it

Usually, an H18 indicates that a response has multiple stages -
for instance, streaming chunks of a large response -
and that one of those stages has thrown an error.

To find the error, first check your logs for stack traces near the H18.
If you see none, you'll need to look more closely at the handlers for the specific request that's failing.
Logging each step of the response, including the x-request-id header, can help.
