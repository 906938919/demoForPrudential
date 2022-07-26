module.exports = {
  presets: ["@babel/preset-react"],
  plugins: [
    ["@babel/plugin-syntax-dynamic-import"],
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }]
  ]
}