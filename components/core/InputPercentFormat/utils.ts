export const formatPercent = (value: string) => {
  const val = Number(value)
  // eslint-disable-next-line
  return (val > 100 ? 100 : val < 0 ? 0 : val).toString() + ' %'
}
