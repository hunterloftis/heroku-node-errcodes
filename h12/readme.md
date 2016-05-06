# H12 - Request timeout

An example of triggering [Heroku's H12 Error](https://devcenter.heroku.com/articles/error-codes#h12-request-timeout) with Node.js.

## Try it on Heroku

```
$ git clone https://github.com/hunterloftis/heroku-node-errcodes.git
$ cd heroku-node-errcodes/h12
$ git init
$ git add --all
$ git commit -am 'h12 example'
$ heroku create
$ git push heroku master
$ heroku open works
$ heroku logs --tail
```

This first route (/works) will work.
However, visiting any other route will lead to an H12:

```
$ heroku open
```

## What happens

Node doesn't implicitly handle requests by sending responses -
that responsibility is up to you as the developer.
A common mistake in node applications is to provide responses in some branches,
but leave out responses in other logical branches.

In this server, routes with 'works' in their url are handled,
but routes that fail the `if` test are left to linger.

Noticing that the app hasn't sent a response within 30 seconds,
Heroku's router triggers an H12.

## How to fix it

If your app triggers H12s, the first thing you should do is add logs along
every branch of the failing route (every if statement, function call, etc).
It's best if these logs include the x-request-id header so you can easily grep
for a single request thread.

Then, make a request to that route and see where the request ends in the logs.
What is the last successful step?

Finally, investigate the code to find which branch doesn't provide a response.

Following the chain-of-responsibility pattern can help minimize this sort of logical error.
