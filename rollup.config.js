/**
 *  Rollup.js Config
 */

import babel from "rollup-plugin-babel";
import compiler from "@ampproject/rollup-plugin-closure-compiler";

export default [
  {
    input: "./src/goodshare.js",
    output: {
      name: "goodshare",
      file: "./goodshare.min.js",
      format: "iife"
    },
    plugins: [
      babel({
        exclude: "node_modules/**"
      }),
      compiler({
        compilation_level: "SIMPLE"
      })
    ]
  }
];
