import { describe, it, expect } from 'vitest';
import { capitalize } from './capitalize';

describe('capitalize function', () => {
  it('capitalizes a lowercase word', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('returns an empty string when given an empty string', () => {
    expect(capitalize('')).toBe('');
  });

  it('capitalizes a single-character string', () => {
    expect(capitalize('a')).toBe('A');
  });

  it('does not change an already capitalized word', () => {
    expect(capitalize('Hello')).toBe('Hello');
  });

  it('does not change a string starting with a space', () => {
    expect(capitalize(' hello')).toBe(' hello');
  });

  it('does not change a string starting with a number', () => {
    expect(capitalize('123abc')).toBe('123abc');
  });
});
