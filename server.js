// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'dist')));

// eslint-disable-next-line consistent-return
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.redirect('/500');
});
app.use((req, res) => {
  res.redirect('/404');
});

app.listen(port, () => {
  console.log(`The app is running at http://localhost:${port}`);
});
