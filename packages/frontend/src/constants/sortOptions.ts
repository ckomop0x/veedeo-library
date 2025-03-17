import { capitalize } from '@/lib/capitalize';

export const SORT_BY = {
  NEWEST: 'newest',
  OLDEST: 'oldest',
  ALPHABETICAL: 'alphabetical',
} as const;

export const SORT_BY_OPTIONS = Object.entries(SORT_BY).map(([, value]) => ({
  label: capitalize(value),
  value,
}));
