const express = require('express');
const helmet = require('helmet');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'dist')));
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        'script-src': ["'self'", "'unsafe-eval'"],
        'connect-src': ['ya-praktikum.tech', 'wss://ya-praktikum.tech'],
        'img-src': ["'self'", 'data:', 'ya-praktikum.tech'],
        'object-src': ["'self'"],
      },
    },
  })
);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// eslint-disable-next-line consistent-return
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.redirect('/500');
});

app.listen(port, () => {
  console.log(`The app is running at http://localhost:${port}`);
});
