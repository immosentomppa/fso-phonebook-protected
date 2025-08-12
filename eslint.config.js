import js from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"

export default [
  { ignores: ["dist", "index.js"] },
  // Node.js files
  {
    files: ["**/*.cjs", "**/*.mjs", "**/*.js", "**/*.ts"],
    ignores: ["frontend/**"], // ignore frontend for node config
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node,
      sourceType: "module",
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
    },
  },
  // React/browser files
  {
    files: ["src/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
]
