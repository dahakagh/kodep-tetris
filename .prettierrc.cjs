module.exports = {
  importOrder: ["^react$", "^((?!(@/|\\./)).)*$", "^@/(.*)$", "^[./]"],
  importOrderParserPlugins: [
    "typescript",
    "jsx",
    "classProperties",
    '["decorators", { "decoratorsBeforeExport": true }]',
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: false,
};
