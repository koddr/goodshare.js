# CI Job Number

Return CI job number to run huge tests only on first job.

Often we test different Node.js versions on Travis CI.
But Node.js version doesn’t affect on many tests. For example, using
external API for docs spelling check.

Since Travis CI is a free common resource, we should be responsible.
So we can run big tasks only on first Node.js version.

```js
const ciJobNumber = require('ci-job-number')

if (ciJobNumber() === 1) {
  runSpellingCheck()
} else {
  console.warn('To speed up CI spelling check runs only in first job')
}
```

<a href="https://evilmartians.com/?utm_source=ci-job-number">
  <img src="https://evilmartians.com/badges/sponsored-by-evil-martians.svg"
       alt="Sponsored by Evil Martians" width="236" height="54">
</a>


## CI Support

* Travis CI
* AppVeyor
* CircleCI
* Semaphore


## Who Use It

* [Size Limit](https://github.com/ai/size-limit)
* [`yaspeller-ci`](https://github.com/ai/yaspeller-ci)
* [`eslint-ci`](https://github.com/JLHwung/eslint-ci)
