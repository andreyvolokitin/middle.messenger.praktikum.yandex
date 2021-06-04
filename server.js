const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'dist')));
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  res.redirect('./500.html');
});
app.use((req, res) => {
  res.redirect('./404.html');
})

app.listen(port, () => {
  console.log(`The app is running at http://localhost:${port}`);
});