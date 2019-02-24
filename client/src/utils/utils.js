/* eslint-disable import/prefer-default-export */
function delay(time) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), time);
  });
}

export {
  delay,
};
