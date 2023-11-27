import moment from "moment";
import {currency} from "../constants";
import {seedrandom} from "seedrandom";

export const getWordStyle = (coords, cellSize, isReverseLine = false) => {
  const length = coords.length;
  if (!length) return "";
  if (length < 2) return `w-[26px] h-[26px]`;

  const first = coords[0];
  const last = coords[coords.length - 1];
  const direction = first.colIndex !== last.colIndex ? "colIndex" : "rowIndex";
  const selectedLetters = Math.floor(last[direction] - first[direction]);
  const size = 28 + cellSize * selectedLetters + "px";

  if (last?.colIndex == first.colIndex) {
    return `h-[${size}] w-[26px]`;
  }

  return last?.rowIndex == first.rowIndex ? `w-[${size}] h-[26px]` : "";
};

export const filterRoutesWithPrivacy =
  ({date}) =>
  route => {
    if (route.name == "WelcomeQuiz" || !date) return true;
    return moment().isBefore(date, "day");
  };

export const getNewsKeys = () => {
  const today = new Date();
  const seed = today.toDateString();
  const seedValue = Array.from(seed).reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0,
  );
  const seededRandom = seed => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  const randomNumber1 = Math.floor(seededRandom(seedValue) * 10) + 1;
  const randomNumber2 = Math.floor(seededRandom(seedValue) * 10) + 1;

  return [randomNumber1, randomNumber2];
};

export const selectCryptoPrices = data => {
  let prices = {};
  for (let item of data) {
    if (item?.market_data) {
      prices = {
        ...prices,
        [item.id]: {
          image: item.image.small,
          price: item.market_data.current_price[currency],
        },
      };
    }
  }
  return prices;
};

export const findMatches = (searchWords, word) => {
  const match = searchWords.find(item => item == word);
  if (!!match) {
    return match;
  }
  const reversed = word.split("").reverse().join("");
  return !!searchWords.includes(reversed);
};
