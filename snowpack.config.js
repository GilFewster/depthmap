// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: { url: "/", static: true },
    src: { url: "/dist" },
  },
  plugins: [
    [
      "@snowpack/plugin-sass",
      {
        useAlias: true,
        aliasPrefix: "@",
      },
    ],
  ],
  alias: {
    "libheif-js": "libheif-js/libheif/libheif.js",
    "@scss": "/dist/styles",
  },
  packageOptions: {
    polyfillNode: true,
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};
