module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    env: {
      production: {
        plugins: ["transform-remove-console"],
      },
    },
    plugins: [
      "react-native-reanimated/plugin", // Reanimated plugin has to be listed last.
    ],
  };
};
