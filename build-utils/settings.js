module.exports = {
  // When using these paths in webpack config, only use them with Node.js `path` module to allow cross-platform compatibility.
  // Paths are relative to the 'base' key, 'base' path is relative to the project root.
  // Do not use trailing slash (/).
  paths: {
    src: {
      base: './src',
      css: './css',
    },
    dist: {
      base: './dist',
      css: './css',
      js: './js',
    },
    static: {
      base: './static',
    },
  },
};
