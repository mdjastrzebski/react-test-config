import * as React from 'react';

export function isReactVersionAtLeast(major: number, minor: number): boolean {
  const match = /^(\d+)\.(\d+)/.exec(React.version);
  if (!match) {
    return false;
  }

  const actualMajor = Number(match[1]);
  const actualMinor = Number(match[2]);

  return actualMajor > major || (actualMajor === major && actualMinor >= minor);
}

export function isEnvTruthy(value: string | undefined): boolean {
  if (!value || value === '0') {
    return false;
  }

  return value.toLowerCase() !== 'false';
}
