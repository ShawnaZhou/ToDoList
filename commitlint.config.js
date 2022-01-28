module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Place your rules here
    "type-enum": [2, "always", ["build", "chore"]], // error if type is given but not in provided list
  },
};
