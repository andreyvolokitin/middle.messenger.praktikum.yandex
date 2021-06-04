const path = require('path');

module.exports = {
  data: 'src/data.json',
  helpers: 'src/utils/handlebars-helpers/**/*.js',
  partials: 'src/partials/**/*.hbs',
  partialsOptions: {
    parsePartialName(options, file) {
      return path.parse(file.path).name;
    },
  },
};