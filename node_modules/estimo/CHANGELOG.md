# Change Log

This project adheres to [Semantic Versioning](http://semver.org/).

## 2.0.1
- Use `PUPPETEER_EXECUTABLE_PATH` to find chrome execute path if variable available

## 2.0.0

- Add page-mode for processing web pages by url.
- Change processing logic and split it apart for js files and web pages.
- Add check for inexistent local js files.
- Add `device` option for chrome device emulation.
- Add `width`, `height` options for custom viewport emulation.
- Add `userAgent` option for custom userAgent emulation.
- Add `IncognitoBrowserContext` support for better performance.
- Change `-l` argument to `-r` (**CLI API**).
- Change `library` field in result output to `name` (**JS API**).
- Add debug log via `ESTIMO_DEBUG=true`.
- Add `TypeScript` typings for better DX.
- Update tests.
- Update project documentation.

## 1.1.6

- Fix path resolving to chrome binary when using npx.

## 1.1.5

- Change chrome detection script for not executing if `ESTIMO_DISABLE=true`.

## 1.1.4

- Fix error on windows.
- Fix Travis CI error (`Build terminated after build exited successfully`).
- Update tests.

## 1.1.3

- Fix chrome version check.
- Remove debug code.

## 1.1.1

- Fix security issue with npm packages.

## 1.1.0

- Change Travis CI config for launching test with and without suitable chrome.
- Fix `FP`, `FCP`, `FMP`, `LHError` errors.
- Fix memory error on CI (`'--no-sandbox', '--disable-setuid-sandbox'`).
- Add support for env variables from puppeteer.
- Add script for local chrome detection.
- Drop `puppeteer` support and use `puppeteer-core` instead.
- Add multiple files processing.
- Update project documentation.
- Add usage examples.

## 1.0.0

- Drop `perf-timeline` support and use `puppeteer` instead.
- Drop `bigrig` support and use `tracium` instead.
- Change js/cli api.
- Update project documentation.

## 0.1.9

- Fix path resolving to `perf-timeline` binary.

## 0.1.8

- Update project documentation.
- Code-style refactoring.

## 0.1.7

- Replace `node-npx` to `cross-spawn`.

## 0.1.6

- Run `perf-timeline` via `node-npx`.
- Add Travis CI.

## 0.1.5

- Show processing time when using CLI.
- Add fields description for `estimo` result.
- Add documentation for Network/CPU Emulation.

## 0.1.4

- Fix file path resolving when using CLI.

## 0.1.3

- Initial release.

## 0.1

- PoC implementation.
