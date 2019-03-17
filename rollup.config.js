/**
 *  Rollup.js Config
 */

import babel from "rollup-plugin-babel";
import { uglify } from "rollup-plugin-uglify";

export default [
  {
    input: "./src/goodshare.js",
    plugins: [
      babel({
        exclude: "node_modules/**"
      }),
      uglify()
    ],
    output: {
      name: "goodshareBundle",
      file: "./goodshare.min.js",
      format: "iife"
    }
  },
  {
    input: "./src/goodshare.polyfill.js",
    plugins: [
      babel({
        exclude: "node_modules/**"
      }),
      uglify()
    ],
    output: {
      name: "goodsharePolyfillBundle",
      file: "./goodshare.polyfill.min.js",
      format: "iife"
    }
  }
];
