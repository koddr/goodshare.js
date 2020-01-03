## Estimo ![Travis CI Status](https://travis-ci.org/mbalabash/estimo.svg?branch=master) [![CircleCI](https://circleci.com/gh/mbalabash/estimo/tree/master.svg?style=svg)](https://circleci.com/gh/mbalabash/estimo/tree/master)

Estimo is a tool for measuring parse / compile / execution time of javascript.

This tool can emulate CPU throttling, Network conditions, use Chrome Device emulation and more for measuring javascript performance.

*Inspired by [Size Limit](https://github.com/ai/size-limit). Thanks [@ai](https://github.com/ai/) for support.*

## Why?

**JavaScript** is the **most expensive part** of our frontend.

![3.5 seconds to process 170 KB of JS and 0.1 second for 170 KB of JPEG. @Addy Osmani](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/javascript-startup-optimization/images/1_PRVzNizF9jQ_QADF5lQHpA.png)

3.5 seconds to process 170 KB of JS and 0.1 second for 170 KB of JPEG.

- [JavaScript Start-up Optimization](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/javascript-startup-optimization/)

- [The Cost Of JavaScript In 2018](https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4)

- [The Cost Of JavaScript In 2019](https://v8.dev/blog/cost-of-javascript-2019)

## Usage

**JS API**

```js
const path = require('path')
const estimo = require('estimo')

;(async () => {
  const report = await estimo(path.join(__dirname, '..', 'libs', 'someLib.js'))
  console.log(report)
})()
```

**CLI**

```sh
estimo -r ./libs/someLib.js
```

**Output**

```
[
  {
    name: string
    parseHTML: number
    styleLayout: number
    paintCompositeRender: number
    scriptParseCompile: number
    scriptEvaluation: number
    javaScript: number
    garbageCollection: number
    other: number
    total: number
  }
]
```

## Fields Description

- **name** - Resource name (file name or web url).

- **parseHTML** - Time which was spent for `ParseHTML`, `ParseAuthorStyleSheet` events.

- **styleLayout** - Time which was spent for `ScheduleStyleRecalculation`, `UpdateLayoutTree`, `InvalidateLayout`, `Layout` events.

- **paintCompositeRender** - Time which was spent for `Animation`, `HitTest`, `PaintSetup`, `Paint`, `PaintImage`, `RasterTask`, `ScrollLayer`, `UpdateLayer`, `UpdateLayerTree`, `CompositeLayers` events.

- **scriptParseCompile** - Time which was spent for `v8.compile`, `v8.compileModule`, `v8.parseOnBackground` events.

- **scriptEvaluation** - Time which was spent for `EventDispatch`, `EvaluateScript`, `v8.evaluateModule`, `FunctionCall`, `TimerFire`, `FireIdleCallback`, `FireAnimationFrame`, `RunMicrotasks`, `V8.Execute` events.

- **javaScript** - Time which was spent for both event groups (**scriptParseCompile** and **scriptEvaluation**).

- **garbageCollection** - Time which was spent for `MinorGC`, `MajorGC`, `BlinkGC.AtomicPhase`, `ThreadState::performIdleLazySweep`, `ThreadState::completeSweep`, `BlinkGCMarking` events.

- **other** - Time which was spent for `MessageLoop::RunTask`, `TaskQueueManager::ProcessTaskFromWorkQueue`, `ThreadControllerImpl::DoWork` events.

- **total** - Total time.

## Additional Use Cases

### CPU Throttling Rate

The CPU Throttling Rate Emulation allow you to generate a Performance timeline under specified CPU conditions. To turn on CPU emulation, you must pass the **emulateCpuThrottling** flag along with additional configuration options.

- **emulateCpuThrottling** (default: `false`) - This flag allows the other CPU Throttling Rate options to be respected. They will be completely ignored unless this flag is set.

- **cpuThrottlingRate** (default: `1`) - Sets the CPU throttling rate. The number represents the slowdown factor (e.g., 2 is a "2x" slowdown).

**JS API**:

```js
await estimo('/path/to/someLib.js', {
  emulateCpuThrottling: true,
  cpuThrottlingRate: 4,
})
```

**CLI**:

```sh
estimo -r ./libs/someLib.js --cpu --cpuRate 4
```

### Network Emulation

The Network Emulation allow you to generate a Performance timeline under specified network conditions. To turn on network emulation, you must pass the **emulateNetworkConditions** flag along with additional configuration options.

- **emulateNetworkConditions** (default: `false`) - This flag allows the other Network Emulation options to be respected. They will be completely ignored unless this flag is set.

- **offline** (default: `false`) - Passing the `offline` flag to the generate command emulate a network disconnect.

- **latency** (default: `0`) - Artificial, minimum latency between request sent and response header received expressed in milliseconds (ms).

- **downloadThroughput** (default: `0`) - The maximum download speed in megabits per second. `0` disables throttling.

- **uploadThroughput** (default: `0`) - The maximum upload speed in megabits per second. `0` disables throttling.

- **connectionType** (default: `none`) - A label of the supposed underlying network connection type that the browser is using. Supported values are documented under Chrome Headless ConnectType documentation. Variants: `none`, `cellular2g`, `cellular3g`, `cellular4g`, `bluetooth`, `ethernet`, `wifi`, `wimax`, `other`.

**JS API**:

```js
await estimo('/path/to/someLib.js', {
  emulateNetworkConditions: true,
  offline: false,
  latency: 150,
  downloadThroughput: 1.6,
  uploadThroughput: 0.75,
  connectionType: 'cellular3g',
})
```

**CLI**:

```sh
estimo -r ./libs/someLib.js --net --latency 150 --download 1.6 --upload 0.75 --connection cellular3g
```

### Chrome Device Emulation

The Chrome Device Emulation allow you to generate a Performance timeline under specified device conditions.

- **device** (default: `false`) - One of [Puppeteer Device Descriptor](https://github.com/GoogleChrome/puppeteer/blob/master/lib/DeviceDescriptors.js).


**JS API**

```js
const report = await estimo('/path/to/someLib.js', {
  device: 'Galaxy S5'
})
```

**CLI**

```sh
estimo -r ./libs/someLib.js -d Galaxy\ S5
```

When using CLI, for device names with spaces you should use symbols escaping.

### Multiple Resources

**JS API**

```js
const report = await estimo(['/path/to/libs/someLib.js', 'https://unpkg.com/react@16/umd/react.development.js'])
```

**CLI**

```sh
estimo -r /path/to/libs/someLib.js https://unpkg.com/react@16/umd/react.development.js
```

### Pages

You can use all features not only with js files, but with web pages too.

We will wait for navigation to be finished when the `load` event is fired.

**JS API**

```js
const report = await estimo('https://www.google.com/')
```

**CLI**

```sh
estimo -r https://www.google.com/
```

## Time

**All metrics in milliseconds**.

We are measure system-cpu time. The number of seconds that the process has spent on the CPU.

We not including time spent waiting for its turn on the CPU.


## Install

```js
npm i estimo
```

or

```js
yarn add estimo
```

## How?

It uses [puppeteer](https://github.com/GoogleChrome/puppeteer) to generate Chrome Timelines. Which can be transformed in human-readable shape by [Tracium](https://github.com/aslushnikov/tracium).

We will use your local **Chrome** if it suitable for using with Estimo.

**Keep in mind** there result depends on your device and available resources.


## Who Uses Estimo

- [Size Limit](https://github.com/ai/size-limit)

## Contributing

Feel free to ask or open an issue.
