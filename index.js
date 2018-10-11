require('babel-register')({
  "plugins": [
    "transform-decorators-legacy",
    "transform-class-properties"
  ],
  "presets": ["react", "env", "stage-0"]
});
require.extensions['.css'] = () => {
  return;
};
require('./src/server');
