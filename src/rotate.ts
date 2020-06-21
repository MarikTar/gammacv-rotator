import * as gm from 'gammacv';

export const rotate = (image: gm.Tensor, rad: number): gm.Tensor => {
  const [height, width, chanel] = image.shape;
  const outputTensor = new gm.Tensor(
    'uint8',
    [height, width, chanel],
    new Uint8Array(new Array(height * width * chanel).fill(255)),
  );
  const middleW = width / 2;
  const middleH = height / 2;

  for (let i = 0; i < height; i += 1) {
    for (let j = 0; j < width; j += 1) {
      const x = (i - middleH) * Math.cos(rad) - (j - middleW) * Math.sin(rad) + middleH;
      const y = (i - middleH) * Math.sin(rad) + (j - middleW) * Math.cos(rad) + middleW;
      const roundX = Math.round(x);
      const roundY = Math.round(y);
      const floorX = Math.floor(x);
      const floorY = Math.floor(y);

      if (roundX < height && roundY < width && roundX >= 0 && roundY >= 0) {
        for (let rgb = 0; rgb < 3; rgb += 1) {
          const color = image.get(i, j, rgb);
          outputTensor.set(roundX, roundY, rgb, color);

          if (roundX !== floorX && floorX < height && floorX >= 0) {
            outputTensor.set(floorX, roundY, rgb, color);
          }
          if (roundY !== floorY && floorY < width && floorY >= 0) {
            outputTensor.set(roundX, floorY, rgb, color);
          }
        }
      }
    }
  }

  return outputTensor;
};
