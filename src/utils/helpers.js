export function warning(condition, message) {
  if (condition) return;
  // eslint-disable-next-line no-console
  console.warn(message);
}

export function invariant(condition, message) {
  if (condition) return;
  throw new Error(`Invariant failed: ${message || ''}`);
}
