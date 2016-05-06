# H10 - App Crashed

An example of triggering [Heroku's H10 Error](https://devcenter.heroku.com/articles/error-codes#h10-app-crashed) with Node.js.

## Try it on Heroku

```
$ git clone https://github.com/hunterloftis/heroku-node-errcodes.git
$ cd heroku-node-errcodes/h10
$ git init
$ git add --all
$ git commit -am 'h10 example'
$ heroku create
$ git push heroku master
$ heroku open
$ heroku logs --tail
```

## What happens

As a human, you can look at the source code and realize that this app starts with `node app.js`.
However, deployments must be automated so we follow some standard practices to start your app on a dyno:

To try to start your app, Heroku first looks for a Procfile, which doesn't exist here.
Then, it checks for a `start` script in package.json, which also doesn't exist.
Finally, it tries to run the default start script, which is `node server.js`, which fails
because there's no server.js file.

Having been unable to start the app, Heroku logs an H10 error.

This is just one common way to trigger an H10.
You'll also see this error if your app consistently fails with an error after being
started - for instance, if it can't connect to a database or tries to require a missing file.

## How to fix it

The fix is easy - provide a `start` script in package.json:

```json
"scripts": {
  "start": "node app.js"
}
```
