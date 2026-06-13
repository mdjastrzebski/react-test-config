import React from 'react';

const RECENTLY_CREATED_OWNER_STACKS = 'recentlyCreatedOwnerStacks';

// Prevent React from collecting owner stacks during tests.
export function disableOwnerStacks(): void {
  try {
    const ReactSharedInternals = getReactSharedInternals();
    if (!ReactSharedInternals) {
      return
    }

    if (!(RECENTLY_CREATED_OWNER_STACKS in ReactSharedInternals)) {
      console.error(`[react-test-config] Cannot access ReactSharedInternals.${RECENTLY_CREATED_OWNER_STACKS}`);
      return;
    }

    Object.defineProperty(ReactSharedInternals, RECENTLY_CREATED_OWNER_STACKS, {
      get: () => Infinity,
      set: () => {},
      configurable: true,
      enumerable: true,
    });
  } catch (error) {
    console.error('[react-test-config] Failed to disable owner stacks:', error);
  }
}

function getReactSharedInternals(): Record<string, unknown> | undefined {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ReactSharedInternals = (React as any).__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  if (!ReactSharedInternals) {
    console.error('[react-test-config] Cannot access ReactSharedInternals using React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE');
  }

  return ReactSharedInternals
}