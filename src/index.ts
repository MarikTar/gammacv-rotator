import * as gm from 'gammacv';

import { rotate } from './rotate';

const imgURL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSva5ZvjoZhPmJP6dLVYiP5UzXVRtWkYLjWAt7u684DXNH5cc2y&usqp=CAU';
const w = 256;
const h = 256;
const wrapper = document.getElementById('container');
const rangeGrad = document.querySelector('#range_grad') as HTMLElement;
const valueGrad = document.querySelector('#value_grad');
const canvas = gm.canvasCreate(w, h);
wrapper.prepend(canvas);

gm.imageTensorFromURL(imgURL, 'uint8', [h, w, 4], true).then((input) => {
  rangeGrad.addEventListener('input', (e) => {
    const g = (e.target as HTMLTextAreaElement).value;
    const rad = +g * (Math.PI / 180);
    valueGrad.innerHTML = `${g}°`;
    gm.canvasFromTensor(canvas, rotate(input, rad));
  });

  gm.canvasFromTensor(canvas, input);
});
