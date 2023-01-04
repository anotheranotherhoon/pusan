export const convertFahtoCel = (nk) => {
  let CELSIUS = Math.round((Number(nk)-273.15) * 10) /10
  return CELSIUS
}