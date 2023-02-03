module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        "babel-preset-expo",
        {
          runtime: "automatic",
          development: false,
          importSource: "@welldone-software/why-did-you-render",
        },
      ],
    ],
  };
};
