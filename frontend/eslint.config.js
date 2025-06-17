// eslint.config.js
import { defineConfig } from "eslint/config";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import globals from "globals";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";

// FlatCompat without __dirname, using cwd()
const compat = new FlatCompat({
  baseDirectory: process.cwd(),
  recommendedConfigs: {
    "plugin:@typescript-eslint/recommended": tsPlugin.configs.recommended,
    "plugin:react/recommended": reactPlugin.configs.recommended,
    "plugin:react/jsx-runtime": reactPlugin.configs["jsx-runtime"],
  },
});

export default defineConfig([
  // 1) Core JS rules
  js.configs.recommended,

  // 2) TS & React shareables flattened
  ...compat.extends(
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime"
  ),

  // 3) Project overrides & ignores
  {
    files: ["**/*.{js,mjs,cjs,jsx,tsx,ts,mts,cts}"],
    ignores: ["node_modules/**", "dist/**", "public/**"],

    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        // no `project` here—avoids TS project-reference errors
      },
      globals: globals.browser,
    },

    settings: {
      react: { version: "detect" },
    },

    rules: {
      // automatic JSX runtime—no need to import React
      "react/react-in-jsx-scope": "off",
      // enforce rel="noreferrer" on target="_blank"
      "react/jsx-no-target-blank": [
        "error",
        { enforceDynamicLinks: "always", allowReferrer: false },
      ],
    },
  },
]);
