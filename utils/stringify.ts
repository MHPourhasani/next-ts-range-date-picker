import isArray from "./isArray";

export default function stringify(array: string | any[]) {
  if (!isArray(array)) array = [];

  return JSON.stringify(array);
}
