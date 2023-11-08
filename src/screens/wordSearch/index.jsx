import React, {useState, useEffect, useRef, createRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ImageBackground,
  SafeAreaView,
  PanResponder,
} from 'react-native';

import tw from 'twrnc';
import images from '../../assets/images';
import {crosswords, searchWords} from '../../constants';
import {getWordStyle, isFoundWord} from '../../utils';
import DefaultModal from '../../components/modal';
import CrosswordQuestions from '../../components/crosswordQuestions';
import Menu from '../../components/menu';

const cellSize = 30;
const boardSize = crosswords.length;
const buttons = ['Answer', 'Reset'];

const WordSearch = ({navigation}) => {
  const [selectedWord, setSelectedWord] = useState('');
  const [foundWords, setFoundWords] = useState([]);
  const [wordsCoords, setWordsCoords] = useState([]);
  const [letterIndexes, setLetterIndexes] = useState([]);
  const [isTouched, setIsTouched] = useState(false);
  const [isReversedLine, setIsReversedLine] = useState(false);
  const viewRef = createRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [containerPosition, setContainerPosition] = useState({x: 0, y: 0});

  useEffect(() => {
    // selectedWord.length && console.log(selectedWord);
  }, [letterIndexes, wordsCoords]);

  const handleCellPress = (letter, rowIndex, colIndex) => {
    const word = selectedWord + letter;

    // PREVENT DUPLICATE LETTER
    if (letterIndexes.length) {
      const last = letterIndexes[letterIndexes.length - 1];
      const isDuplicateIndex =
        last.colIndex == colIndex && last.rowIndex == rowIndex;
      if (isDuplicateIndex) return;
    }

    if (letterIndexes.length < 2) {
      setLetterIndexes([...letterIndexes, {rowIndex, colIndex}]);
      setSelectedWord(word);
      return;
    }
    const first = !isReversedLine
      ? letterIndexes[0]
      : letterIndexes[letterIndexes.length - 1];
    const isHasOneAxis =
      first?.colIndex === colIndex || first?.rowIndex === rowIndex;

    if (letterIndexes.length && !isHasOneAxis) {
      setLetterIndexes([{colIndex, rowIndex}]);
      return;
    }

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

    if (isReverseLine) {
      const coords = lineCoords.reverse();
      console.log(coords);
      setLetterIndexes(coords);
    } else {
      setLetterIndexes([letterIndexes[0], {rowIndex, colIndex}]);
    }

    if (isFoundWord(searchWords, word)) {
      setFoundWords([...foundWords, word]);
      console.log(letterIndexes);
      setWordsCoords([
        ...wordsCoords,
        [letterIndexes[0], {colIndex, rowIndex}],
      ]);
      setSelectedWord('');
    }
    setIsReversedLine(isReverseLine);
    setSelectedWord(word);
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
      const roundedCol =
        colIndex < crosswords[0].length ? colIndex : boardSize - 1;
      const roundedRow =
        rowIndex < crosswords.length ? rowIndex : boardSize - 1;

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

  const onLayout = () => {
    viewRef.current?.measure((x, y, width, height, pageX, pageY) => {
      setContainerPosition({x: pageX, y: pageY});
    });
  };

  const handleButtonTouch = index => {
    if (index > 0) {
      setWordsCoords([]);
    } else {
      setIsModalVisible(true);
    }
  };

  const selectedStyle = getWordStyle(letterIndexes, cellSize, isReversedLine);
  const questionButtons = buttons.map((item, index) => (
    <TouchableOpacity
      activeOpacity={0.5}
      onPressOut={() => handleButtonTouch(index)}
      style={tw`rounded-2xl bg-white p-2 px-8 h-11 mb-1 `}>
      <Text
        style={tw` font-semibold text-[#00095D] text-lg uppercase text-center`}>
        {item}
      </Text>
    </TouchableOpacity>
  ));

  return (
    <View>
      <DefaultModal
        onClose={() => setIsModalVisible(false)}
        visible={isModalVisible}
      />
      <View>
        <ImageBackground
          style={tw`flex items-center h-full pt-5 bg-cover bg-top`}
          source={images.wordSearchBg}>
          <View style={styles.container}>
            <View style={tw`flex flex-row justify-between gap-3 mb-5`}>
              {questionButtons}
            </View>

            <View
              ref={viewRef}
              onLayout={onLayout}
              style={tw`shadow-2xl shadow-black py-2 h-[284px] bg-white rounded-lg border-none overflow-hidden`}>
              <FlatList
                data={crosswords}
                style={tw`border-none `}
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

                      return (
                        <TouchableOpacity
                          key={colIndex}
                          onPressIn={() =>
                            handleCellPress(letter, rowIndex, colIndex)
                          }
                          style={tw`h-[30px] w-[30px] flex items-center justify-center`}>
                          {isSelected && (
                            <View
                              style={tw`absolute left-[1px] top-[1px] ${
                                wordStyle || selectedStyle
                              } bg-pink-500 rounded-lg`}
                            />
                          )}
                          <Text style={tw`text-black text-lg uppercase`}>
                            {letter}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                )}
              />
            </View>
          </View>

          <CrosswordQuestions />
          <Menu activeIndex={2} navigation={navigation} />
        </ImageBackground>
      </View>
    </View>
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
