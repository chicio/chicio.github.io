export const useShuffleArray = <T>(array?: T[]): T[] => {
  if (!array) {
    return Array<T>(0);
  }

  let currentIndex = array.length;
  let randomIndex;
  const newArray = Array<T>(...array);

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    const elementAtRandomIndex = array[randomIndex];
    const elementAtCurrentIndex = newArray[currentIndex];

    newArray[currentIndex] = elementAtRandomIndex;
    newArray[randomIndex] = elementAtCurrentIndex;
  }

  return newArray;
};
