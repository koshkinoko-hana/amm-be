export function undefinedToNull(obj: { [key: string]: any }) {
  for (const key in obj) {
    if (obj[key] === undefined) {
      obj[key] = null;
    }
  }
}

export function isNull(obj: any) {
  return obj === null || obj === undefined;
}
