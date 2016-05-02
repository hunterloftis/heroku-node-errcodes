# H10 - App Crashed

An example of triggering [Heroku's H10 Error](https://devcenter.heroku.com/articles/error-codes#h10-app-crashed) in node.

## What happens

As a human, you can look at the source code and realize that this app starts with `node app.js`.
However, deployments must be automated.

To try to start your app, Heroku first looks for a Procfile, which doesn't exist here.
Then, it checks for a `start` script in package.json, which also doesn't exist.
Finally, it tries to run the default start script, which is `node server.js`, which fails.

Having been unable to start the app, Heroku logs an H10 error.

## How to fix it

The fix is easy - provide a `start` script in package.json:

```json
"scripts": {
  "start": "node app.js"
}
```
