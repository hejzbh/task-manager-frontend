export const truncString = (str: string, max: number) =>
  str.length <= max ? str : `${str.slice(0, max)}...`;
