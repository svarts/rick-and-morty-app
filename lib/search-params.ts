import { createSearchParamsCache, parseAsInteger, parseAsString } from 'nuqs/server';

export const characterSearchParams = {
  status: parseAsString.withDefault(''),
  gender: parseAsString.withDefault(''),
  page: parseAsInteger.withDefault(1),
};

export const searchParamsCache = createSearchParamsCache(characterSearchParams);
