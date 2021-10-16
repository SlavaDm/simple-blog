/**
 * Delays function.
 * @param fn the function to debounce.
 * @param delay time to delay execution of function.
 * @returns the debounced function.
 */
export function debounce<TArgs extends any[]>(
  fn: (this: void, ...args: TArgs) => unknown,
  delay: number
): (...args: TArgs) => void {
  let timeoutID: number | null = null;
  return (...args: TArgs) => {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    timeoutID = window.setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
