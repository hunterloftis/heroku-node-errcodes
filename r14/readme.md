# R14 - Memory quota exceeded

An example of triggering [Heroku's R14 Error](https://devcenter.heroku.com/articles/error-codes#r14-memory-quota-exceeded) with Node.js.

## Try it on Heroku

```
$ git clone https://github.com/hunterloftis/heroku-node-errcodes.git
$ cd heroku-node-errcodes/r14
$ git init
$ git add --all
$ git commit -am 'r14 example'
$ heroku create
$ git push heroku master
$ heroku open
$ heroku logs --tail
```

After several refreshes, you should see R14 errors begin to appear in your logs.

## What happens

An R14 error can indicate either a memory leak, an improperly tuned garbage collector,
or an app that is memory-bound and needs vertical scaling.

In this case, the server creates a memory leak by registering a million event listeners each time a request is made.
Each listener takes up very little memory, but they add up over time and are never garbage collected.
A typical case is usually the inverse: an app that leaks perhaps one or two event listeners per request,
but then gets hundreds of thousands of requests over a period of time.

## How to fix it

To debug an R14, first you must identify whether your app has a leak,
requires a container with more memory, or just needs more aggressive garbage collection settings.

First, you should [tune the garbage collector](https://blog.heroku.com/archives/2015/11/10/node-habits-2016#7-avoid-garbage)
to fit your container's available memory.
If this fixes your issue, great! It was just V8's default garbage collection being lazy and greedy.

If your app continues to exceed available memory, you should then run
[heapdump](https://github.com/bnoordhuis/node-heapdump) locally.
Run it several times as you simulate traffic to the app,
then compare the resulting memory dumps to see what is growing over time in memory.
If you see a class of objects (for instance, the above event listeners) growing without reason,
then you've identified a memory leak.

Finally, if you don't see any type of objects growing beyond what you would expect per request,
or being retained for longer than they're necessary, it could be that your app simply requires more memory.
If it's on a 1X dyno, try it out on a 2X dyno. If it's on a 2X, try a Performance-M.
If this is the necessary solution, you should also consider refactoring -
V8 is designed to use about 1.5 GB of memory per process; apps that approach this limit are usually
better decoupled into separate services.
