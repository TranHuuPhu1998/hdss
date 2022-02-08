export default (list: Array<string | number>): Array<string | number> =>
  Array.from(new Set(list))
