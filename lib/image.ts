// Credit: https://ffan0811.medium.com/nextjs-tip-how-to-resize-image-url-dynamically-with-next-image-component-150d170c74f

export const getImageRef = (url) => {
  return new Promise((resolve, reject) => {
     const img = new Image();
     img.onload = () => resolve(img);
     img.onerror = () => reject();
     img.src = url;
  });
};

