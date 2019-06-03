export function addLeadingSlash(path) {
  return path.charAt(0) === '/' ? path : `/${path}`;
}

export function stripLeadingSlash(path) {
  return path.charAt(0) === '/' ? path.substr(1) : path;
}

export function hasBasename(path, prefix) {
  return (
    path.toLowerCase().indexOf(prefix.toLowerCase()) === 0 &&
    '/?#'.indexOf(path.charAt(prefix.length)) !== -1
  );
}

export function stripBasename(path, prefix) {
  return hasBasename(path, prefix) ? path.substr(prefix.length) : path;
}

export function stripTrailingSlash(path) {
  return path.charAt(path.length - 1) === '/' ? path.slice(0, -1) : path;
}

export function createPath(location) {
  const { pathname, search, hash } = location;

  let path = pathname || '/';

  if (search && search !== '?') path += search.charAt(0) === '?' ? search : `?${search}`;

  if (hash && hash !== '#') path += hash.charAt(0) === '#' ? hash : `#${hash}`;

  return path;
}
