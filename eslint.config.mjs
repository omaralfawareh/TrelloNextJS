import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import prettier from "eslint-config-prettier";
import pluginQuery from "@tanstack/eslint-plugin-query";
import reactCompiler from "eslint-plugin-react-compiler";

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  ...pluginQuery.configs["flat/recommended"],
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: {
      "react-compiler": reactCompiler,
    },
    rules: {
      "react/prop-types": "off", // Disable prop-types rule
      "react/react-in-jsx-scope": "off", // Disable requirement for React in scope
    },
    ignores: ["node_modules/*", "**/.next/*"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  prettier,
];
