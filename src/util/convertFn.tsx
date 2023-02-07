interface FahToCelParams {
  (fah:number) : number
}

export const convertFahToCel : FahToCelParams = (fah) => {
  let CELSIUS = Math.round((Number(fah)-273.15) * 10) /10
  return CELSIUS
}