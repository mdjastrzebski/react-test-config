import * as React from 'react';
import { disableOwnerStacks } from '../dist/index.cjs';
import { isReactVersionAtLeast } from '../src/utils';

const CLIENT_INTERNALS = '__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE';
const OWNER_STACKS = 'recentlyCreatedOwnerStacks';

describe('disableOwnerStacks', () => {
  test('supports the installed React version', () => {
    const internals = React[CLIENT_INTERNALS];
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    try {
      disableOwnerStacks();

      expect(consoleErrorSpy).not.toHaveBeenCalled();

      if (isReactVersionAtLeast(19, 1)) {
        expect(internals[OWNER_STACKS]).toBe(Infinity);
      }
    } finally {
      consoleErrorSpy.mockRestore();
    }
  });
});
