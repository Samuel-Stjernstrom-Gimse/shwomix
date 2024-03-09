 export const getRandomNumberInRange = (min: number, max: number) => (Math.random() * (max - min)) + min

 export const calculateDistance = (x1: number, y1: number, x2: number, y2: number): number => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)

 export const getRandomColor = (): string => {
  // Generate random values for red, green, and blue components
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  // Convert the RGB values to hexadecimal format
  const redHex = red.toString(16).padStart(2, '0');
  const greenHex = green.toString(16).padStart(2, '0');
  const blueHex = blue.toString(16).padStart(2, '0');

  // Concatenate the hexadecimal values with '#' and return
  return `#${redHex}${greenHex}${blueHex}`;
};
