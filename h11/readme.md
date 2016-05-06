# H11 - Backlog too deep

An example of triggering [Heroku's H11 Error](https://devcenter.heroku.com/articles/error-codes#h11-backlog-too-deep) with Node.js.

## Try it on Heroku

```
$ git clone https://github.com/hunterloftis/heroku-node-errcodes.git
$ cd heroku-node-errcodes/h11
$ git init
$ git add --all
$ git commit -am 'h11 example'
$ heroku create
$ git push heroku master
```

Now, replacing `foobar.herokuapp.com` with the app you created:

```
$ HOST=foobar.herokuapp.com PORT=80 node client.js
(Ctrl + C to exit when you start hitting errors)
```

Then see your H11 errors:

```
$ heroku logs --tail
```

## What happens

This server includes a very slow route which takes 15 seconds to serve a request.
When requests come in faster than the server can serve those requests,
the backlog of unhandled requests grows.

Eventually, the router will start failing requests with H11 errors.

## How to fix it

H11 errors can be fixed by increasing your app's throughput.
In Node, this might entail:

- Increasing the [per-dyno concurrency](https://devcenter.heroku.com/articles/node-concurrency) level of your app
- Moving a slow request [from a web dyno into a worker dyno](https://devcenter.heroku.com/articles/asynchronous-web-worker-model-using-rabbitmq-in-node)
- [Scaling the app horizontally](https://devcenter.heroku.com/articles/scaling) to more dynos
