import * as gm from 'gammacv';

const imgURL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSva5ZvjoZhPmJP6dLVYiP5UzXVRtWkYLjWAt7u684DXNH5cc2y&usqp=CAU';
const width = 256;
const height = 256;
const wrapper = document.getElementById('container');
const rangeGrad = document.querySelector('#range_grad') as HTMLElement;
const valueGrad = document.querySelector('#value_grad');
const canvas = gm.canvasCreate(width, height);
wrapper.prepend(canvas);

const render = (g: number) => {
  gm.imageTensorFromURL(imgURL, 'uint8', [height, width, 4], true).then((input) => {
    const outputTensor = new gm.Tensor(
      'uint8',
      [height, width, 4],
      new Uint8Array(new Array(height * width * 4).fill(255)),
    );
    const rad = g * (Math.PI / 180);
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
            const color = input.get(i, j, rgb);
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
    gm.canvasFromTensor(canvas, outputTensor);
  });
};

render(0);

rangeGrad.addEventListener('input', (e) => {
  const g = (e.target as HTMLTextAreaElement).value;
  valueGrad.innerHTML = `${g}°`;
  render(+g);
});
