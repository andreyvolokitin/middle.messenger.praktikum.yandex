const path = require('path');

module.exports = {
  partials: 'src/layout/**/*.hbs',
  partialsOptions: {
    parsePartialName(options, file) {
      return path.parse(file.path).name;
    },
  },
};
