export const replaceStrSpaces = (str: string, symbol = "_"): string =>
  str.split(" ").join(symbol);
