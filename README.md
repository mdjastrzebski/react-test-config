# react-test-config

Configure the React testing environment for improved performance.

## What it does

React 19 collects owner stacks (component stack traces) on every render. This is useful for debugging in development, but adds measurable overhead during tests. `react-test-config` disables this behaviour so your test suite runs faster.

## Installation

```sh
npm install --save-dev react-test-config
# or
yarn add --dev react-test-config
# or
pnpm add --save-dev react-test-config
```

**Peer dependency:** React 19 (`react@^19.0.0`).

## Usage

Call `disableOwnerStacks()` once, before your tests run. The right place is a setup file that your test runner loads before the test suite.

To disable owner-stack collection:

```ts
import { disableOwnerStacks } from 'react-test-config';

disableOwnerStacks();
```

### Jest

Add the setup file to `jest.config.js`:

```js
module.exports = {
  setupFiles: ['./jest.setup.ts'],
};
```

### Vitest

Add the setup file to `vitest.config.ts`:

```ts
export default {
  test: {
    setupFiles: ['./vitest.setup.ts'],
  },
};
```

## Recommended with

This package is particularly useful when testing React Native and React applications with:

- [React Native Testing Library](https://github.com/callstack/react-native-testing-library) — testing utilities for React Native
- [React Testing Library](https://github.com/testing-library/react-testing-library) — testing utilities for React DOM
- [Reassure](https://github.com/callstack/reassure) — performance regression testing for React and React Native. Disabling owner stacks stabilises measurement results and resolves [bimodal test result distributions](https://github.com/callstack/reassure/issues/585) caused by React's stack collection overhead

## Configuration

### `RTC_SKIP_DISABLE_OWNER_STACKS`

Set this environment variable to any truthy value to make `disableOwnerStacks()` a no-op. This is useful when you want to temporarily re-enable owner stacks — for example, to debug a component hierarchy without changing your setup file.

```sh
RTC_SKIP_DISABLE_OWNER_STACKS=1 npx jest
```

## API

### `disableOwnerStacks()`

Disables React's owner-stack collection by forcing React's internal `recentlyCreatedOwnerStacks` value to `Infinity`. Respects the [`RTC_SKIP_DISABLE_OWNER_STACKS`](#rtc_skip_disable_owner_stacks) environment variable.

## License

MIT
