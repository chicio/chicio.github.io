module.exports = {
  "stories": [
    "../__stories__/**/*.stories.mdx",
    "../__stories__/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
  ],
  webpackFinal: async config => {
    /** https://www.gatsbyjs.com/docs/how-to/testing/visual-testing-with-storybook/ **/
    config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/]
    config.module.rules[0].use[0].loader = require.resolve("babel-loader")
    config.module.rules[0].use[0].options.presets = [
      require.resolve("@babel/preset-react"),
      require.resolve("@babel/preset-env"),
    ]
    config.module.rules[0].use[0].options.plugins = [
      require.resolve("@babel/plugin-proposal-class-properties"),
      require.resolve("babel-plugin-remove-graphql-queries"),
    ]
    config.resolve.mainFields = ["browser", "module", "main"];
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve("babel-loader"),
      options: {
        presets: [["react-app", { flow: false, typescript: true }]],
        plugins: [
          require.resolve("@babel/plugin-proposal-class-properties"),
          /** https://github.com/gatsbyjs/gatsby/issues/26099 **/
          [require.resolve("babel-plugin-remove-graphql-queries"), {
            stage: config.mode === `development` ? "develop-html" : "build-html",
            staticQueryDir: "page-data/sq/d",
          }],
        ],
      },
    })
    config.resolve.extensions.push(".ts", ".tsx")

    return config;
  },
}
