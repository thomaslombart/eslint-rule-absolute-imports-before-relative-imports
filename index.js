module.exports = {
  create: function(context) {
    const imports = [];
    return {
      ImportDeclaration(node) {
        imports.push(node);
      },
      "Program:exit"() {
        let hasFoundRelativeImport = false;
        imports.forEach(importNode => {
          const importName = importNode.source.value;
          const isAbsoluteImport = !isRelativeImport(importName);

          if (!isAbsoluteImport) {
            hasFoundRelativeImport = true;
          }

          if (isAbsoluteImport && hasFoundRelativeImport) {
            context.report({
              node: importNode,
              message: "Absolute imports should be put before relative imports"
            });
          }
        });
      }
    };
  }
};

function isRelativeImport(packageName) {
  return /(\.|\.\.)\//g.test(packageName);
}
