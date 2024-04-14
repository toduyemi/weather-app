const kmhBoundaries = [
  1, 6, 11, 19, 30, 39, 50, 61, 74, 87, 102, 117, 177, 249, 332, 418, 512,
];

export function convertToBeaufort(speed: number) {
  if (speed < 0) {
    throw new Error('Invalid speed value');
  }
  const beaufort = kmhBoundaries.reduce((acc, curr) => {
    return acc + (speed > curr ? 1 : 0);
  }, 0);

  return beaufort;
}
