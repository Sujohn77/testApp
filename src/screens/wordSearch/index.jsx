import React, {useState, useEffect, useRef, createRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ImageBackground,
  SafeAreaView,
  Alert,
  PanResponder,
} from 'react-native';

import tw from 'twrnc';
import images from '../../images';
import {crosswords, searchWords} from '../../constants';
import {getWordStyle} from '../../utils';

const cellSize = 30;
const boardSize = crosswords.length;
const WordSearch = () => {
  const [selectedWord, setSelectedWord] = useState('');
  const [foundWords, setFoundWords] = useState([]);
  const [wordsCoords, setWordsCoords] = useState([]);
  const [letterIndexes, setLetterIndexes] = useState([]);
  const [isTouched, setIsTouched] = useState(false);
  const [isReversedLine, setIsReversedLine] = useState(false);
  const viewRef = createRef(null);
  const [containerPosition, setContainerPosition] = useState({x: 0, y: 0});

  useEffect(() => {
    viewRef.current?.measure &&
      viewRef.current?.measure((x, y, width, height, pageX, pageY) => {
        setContainerPosition({x: pageX, y: pageY});
      });
  }, []);

  useEffect(() => {
    wordsCoords.length && console.log(wordsCoords);
  }, [letterIndexes, wordsCoords]);

  const handleCellPress = (letter, rowIndex, colIndex) => {
    // if (selectedWord[selectedWord.length - 1] == letter) return;
    const word = selectedWord + letter;
    setSelectedWord(word);
    // console.log(word, rowIndex, colIndex);
    if (searchWords.includes(word)) {
      setFoundWords([...foundWords, word]);
      setWordsCoords([
        ...wordsCoords,
        [...letterIndexes, {colIndex, rowIndex}],
      ]);
      setSelectedWord('');
    }

    const first = !isReversedLine
      ? letterIndexes[0]
      : letterIndexes[letterIndexes.length - 1];
    const isHasOneAxis =
      first?.colIndex === colIndex || first?.rowIndex === rowIndex;

    if (letterIndexes.length && !isHasOneAxis) {
      setLetterIndexes([{colIndex, rowIndex}]);
      console.log('new axis');
      return;
    }

    if (letterIndexes.length) {
      const isColumnReverse = first.colIndex > colIndex;
      const isRowReverse = first.rowIndex > rowIndex;
      const isReverseLine = isRowReverse || isColumnReverse;
      const lineCoords = [
        {
          rowIndex: first.rowIndex,
          colIndex: first.colIndex,
        },
        {
          rowIndex,
          colIndex,
        },
      ];

      setIsReversedLine(isReverseLine);
      if (isReverseLine) {
        const coords = isReverseLine ? lineCoords.reverse() : lineCoords;
        setLetterIndexes(coords);
        return;
      }
    }
    if (letterIndexes.length) {
      setLetterIndexes([letterIndexes[0], {rowIndex, colIndex}]);
    } else {
      setLetterIndexes([{rowIndex, colIndex}]);
    }
  };

  const resetCoords = () => {
    setLetterIndexes([]);
    setIsTouched(false);
    setIsReversedLine(false);
    setSelectedWord('');
    return;
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      if (!isTouched) return false;

      const {moveX, moveY} = gestureState;

      // Calculate the coordinates relative to the top-left corner of the view
      const relativeX = moveX - containerPosition.x;
      const relativeY = moveY - containerPosition.y;

      const colIndex = Math.floor(relativeX / cellSize);
      const rowIndex = Math.floor(relativeY / cellSize);
      const roundedCol = colIndex < boardSize ? colIndex : boardSize - 1;
      const roundedRow = rowIndex < boardSize ? rowIndex : boardSize - 1;
      if (roundedCol == 2) {
        console.log('test');
      }
      handleCellPress(
        crosswords[roundedRow][roundedCol],
        roundedRow,
        roundedCol,
      );
    },
    onPanResponderGrant: (evt, gestureState) => {
      setIsTouched(true);
    },
    onPanResponderRelease: () => {
      resetCoords();
    },
  });

  const buttons = ['Answer', 'Question'];

  const selectedStyle = getWordStyle(letterIndexes, cellSize);

  // const length = letterIndexes.length;
  // const firstElem = length ? letterIndexes[0] : {};
  // const lastElem = length > 1 ? letterIndexes[letterIndexes.length - 1] : {};
  // const isRowSelection = firstElem.colIndex !== lastElem.colIndex;
  // const direction = isRowSelection ? 'colIndex' : 'rowIndex';
  // const selectedLetters =
  //   length > 1 ? Math.floor(lastElem[direction] - firstElem[direction]) : 1;

  // const size = 30 + cellSize * selectedLetters + 'px';

  // const rowClass =
  //   lastElem?.colIndex == firstElem.colIndex ? `h-[${size}] rounded-xl` : '';

  // const columnClass =
  //   lastElem?.rowIndex == firstElem.rowIndex ? `w-[${size}] rounded-xl` : '';

  return (
    <SafeAreaView>
      <View>
        <ImageBackground
          style={tw`h-full flex justify-center items-center bg-cover bg-top`}
          source={images.wordSearchBg}>
          <View style={styles.container}>
            <View style={tw`flex flex-row justify-between gap-3 mb-5`}>
              {buttons.map(item => (
                <View style={tw`rounded-2xl bg-white p-2 px-8 h-11 mb-1 `}>
                  <Text
                    style={tw` font-semibold text-[#00095D] text-lg uppercase text-center`}>
                    {item}
                  </Text>
                </View>
              ))}
            </View>

            <View
              ref={viewRef}
              style={tw`h-[240px] bg-white rounded-lg border-none overflow-hidden`}>
              <FlatList
                data={crosswords}
                style={tw`border-none  overflow-hidden`}
                keyExtractor={(item, index) => index.toString()}
                {...panResponder.panHandlers}
                scrollEnabled={false}
                onTouchEnd={resetCoords}
                renderItem={({item, index: rowIndex}) => (
                  <View style={styles.row}>
                    {item.map((letter, colIndex) => {
                      const word = wordsCoords?.find(
                        item =>
                          item.length &&
                          item[0].colIndex == colIndex &&
                          item[0].rowIndex == rowIndex,
                      );
                      const wordStyle = word && getWordStyle(word, cellSize);

                      const isSelected =
                        (letterIndexes.length &&
                          letterIndexes[0].colIndex === colIndex &&
                          letterIndexes[0].rowIndex === rowIndex) ||
                        !!word;
                      if (isSelected) console.log(selectedStyle);
                      return (
                        <TouchableOpacity
                          key={colIndex}
                          onPressIn={() =>
                            handleCellPress(letter, rowIndex, colIndex)
                          }
                          style={tw`h-[30px] w-[30px] flex items-center justify-center border`}>
                          {isSelected && (
                            <View
                              style={tw`absolute left-[2px] top-[2px] ${selectedStyle} bg-rose-500 rounded-xl`}
                            />
                          )}
                          <Text style={styles.letter}>{letter}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                )}
              />
            </View>
            {/* <Text style={tw`text-white text-xl `}>Found Indexes:</Text>
            {letterIndexes.map((item, index) => (
              <View style={tw`flex `}>
                <Text key={index} style={tw`text-xl text-white `}>
                  row: {item.rowIndex + 1} col: {item.colIndex + 1}
                </Text>
              </View>
            ))} */}
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  selectedWord: {
    fontSize: 16,
    marginBottom: 10,
  },
  crosswords: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'gray',
  },
  letter: {
    fontSize: 16,
  },
  foundWords: {
    fontSize: 16,
  },
});

export default WordSearch;
