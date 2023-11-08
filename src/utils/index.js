export const getWordStyle = (coords, cellSize, isReverseLine = false) => {
  const length = coords.length;
  if (!length) return '';
  if (length < 2) return `w-[26px] h-[26px]`;

  const first = coords[0];
  const last = coords[coords.length - 1];
  const direction = first.colIndex !== last.colIndex ? 'colIndex' : 'rowIndex';
  const selectedLetters = Math.floor(last[direction] - first[direction]);
  const size = 24 + cellSize * selectedLetters + 'px';

  if (last?.colIndex == first.colIndex) {
    return `h-[${size}] w-[24px]`;
  }

  return last?.rowIndex == first.rowIndex ? `w-[${size}] h-[24px]` : '';
};

export const isFoundWord = (searchWords, word) => {
  if (!!searchWords.find(item => item == word)) {
    return true;
  }
  return searchWords.includes(word.split('').reverse().join(''));
};
