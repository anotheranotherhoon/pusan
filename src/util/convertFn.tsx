interface FahToCelParams {
  (fah: number): number;
}

export const convertFahToCel: FahToCelParams = (fah) => {
  const CELSIUS = Math.round((Number(fah) - 273.15) * 10) / 10;
  return CELSIUS;
};
