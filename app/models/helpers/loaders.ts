
export function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise(resolve => {
    const image = new Image();
    image.addEventListener('load', () => {
      resolve(image);
    });
    image.src = url;
  });
}

export function getPleaseWait(label: string) {
  const div = document.createElement('div');
  const text = document.createTextNode(label);
  div.appendChild(text);
  return div;
}
