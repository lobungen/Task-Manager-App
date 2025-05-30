import { describe, it, expect, beforeEach, vi } from 'vitest';
import Auth from './auth';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();

Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

//delete the localStorage mock if it exists later

// Mock window if not present
if (!('window' in globalThis)) {
  // @ts-ignore
  globalThis.window = globalThis;
}

// delete later

describe('AuthService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns false when not logged in', () => {
    expect(Auth.loggedIn()).toBe(false);
  });

  it('returns true when token is present', () => {
    localStorage.setItem('id_token', 'token');
    expect(Auth.loggedIn()).toBe(true);
  });

  it('can login and logout', () => {
    // Mock window.location.assign to prevent navigation
    const assignMock = vi.fn();
    Object.defineProperty(window, 'location', {
      value: { assign: assignMock },
      writable: true,
    });

    Auth.login('token');
    expect(localStorage.getItem('id_token')).toBe('token');
    expect(assignMock).toHaveBeenCalled();

    Auth.logout();
    expect(localStorage.getItem('id_token')).toBeNull();
    expect(assignMock).toHaveBeenCalled();
  });
});