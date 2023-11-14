import React, {useState, useEffect, useRef, createRef} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ImageBackground,
  SafeAreaView,
  PanResponder,
  Alert,
} from "react-native";

import tw from "twrnc";
import images from "../../assets/images";
import {crosswords, searchWords} from "../../constants";
import {getWordStyle, findMatches} from "../../utils";
import DefaultModal from "../../components/modal";
import CrosswordQuestions from "../../components/crosswordQuestions";
import Menu from "../../components/menu";
import Shadow from "../../components/shadow";
import CrosswordInitial from "../../components/crossword/CrosswordInitial";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useTranslation} from "react-i18next";

const cellSize = 30;
const boardSize = crosswords.length;

const WordSearch = ({navigation, route}) => {
  const {t} = useTranslation();
  const [selectedWord, setSelectedWord] = useState("");
  const [foundWords, setFoundWords] = useState([]);
  const [wordsCoords, setWordsCoords] = useState([]);
  const [letterIndexes, setLetterIndexes] = useState([]);
  const [isTouched, setIsTouched] = useState(false);
  const [isReversedLine, setIsReversedLine] = useState(false);
  const viewRef = createRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [containerPosition, setContainerPosition] = useState({x: 0, y: 0});
  const [isStartCrossword, setIsStartCrossword] = useState(false);

  const [isVisitedScreen, setIsVisitedScreen] = useState(false);
  useEffect(() => {
    const getIsVisit = async () => {
      const isVisited = await AsyncStorage.getItem("visitedCrossword");
      setIsVisitedScreen(isVisited);
    };

    getIsVisit();
  }, []);

  const handleCellPress = (letter, rowIndex, colIndex) => {
    const word = selectedWord + letter;

    // PREVENT DUPLICATE LETTER
    if (letterIndexes.length) {
      const first = letterIndexes[0];

      const last = letterIndexes[letterIndexes.length - 1];
      const isDuplicateLetter =
        first.colIndex == colIndex && first.rowIndex == rowIndex;
      const isDuplicateReverseLetter =
        last.colIndex == colIndex && last.rowIndex == rowIndex;

      if (
        (isReversedLine && isDuplicateLetter) ||
        (!isReversedLine && isDuplicateReverseLetter)
      )
        return;
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
    const isReversed = isRowReverse || isColumnReverse;
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

    if (isReversed) {
      const coords = lineCoords.reverse();

      setLetterIndexes(coords);
    } else {
      setLetterIndexes([letterIndexes[0], {rowIndex, colIndex}]);
    }

    const matchedWord = findMatches(searchWords, word);

    if (matchedWord) {
      setFoundWords([...foundWords, matchedWord]);
      const wordCoords = [first, {colIndex, rowIndex}];
      const dimensionCoords = isReversed ? wordCoords.reverse() : wordCoords;

      setWordsCoords([...wordsCoords, dimensionCoords]);
      setSelectedWord("");
      return;
    }

    !isReversedLine && setIsReversedLine(isReversed);
    setSelectedWord(word);
  };

  const resetCoords = () => {
    setLetterIndexes([]);
    setIsTouched(false);
    setIsReversedLine(false);
    setSelectedWord("");
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
        colIndex < crosswords[0].length ? colIndex : crosswords[0].length - 1;
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
    setTimeout(() => {
      viewRef.current?.measure((x, y, width, height, pageX, pageY) => {
        setContainerPosition({x: pageX, y: pageY});
      });
    }, 500);
  };

  const handleButtonTouch = index => {
    if (index > 0) {
      setWordsCoords([]);
    } else {
      setIsModalVisible(true);
    }
  };

  const onPress = async () => {
    setIsStartCrossword(true);
    if (!isVisitedScreen) {
      try {
        await AsyncStorage.setItem("visitedCrossword", JSON.stringify(true));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const selectedStyle = getWordStyle(letterIndexes, cellSize, isReversedLine);
  const questionButtons = [...Array(2)].map((item, index) => (
    <TouchableOpacity
      key={`question-button-${index}`}
      activeOpacity={0.5}
      onPressOut={() => handleButtonTouch(index)}
      style={tw`rounded-2xl bg-white p-2 px-8 h-11 mb-1 `}>
      <Text
        style={tw` font-semibold text-[#00095D] text-lg uppercase text-center`}>
        {index == 0
          ? t("wordsearch_button_answer")
          : t("wordsearch_button_reset")}
      </Text>
    </TouchableOpacity>
  ));
  const showInitialScreen = !isVisitedScreen && !isStartCrossword;

  return (
    <SafeAreaView>
      {showInitialScreen && <CrosswordInitial onPress={onPress} />}
      {!showInitialScreen && (
        <View style={tw`h-full`}>
          <DefaultModal
            onClose={() => setIsModalVisible(false)}
            visible={isModalVisible}
          />
          <View>
            <ImageBackground
              style={tw`h-full pt-5`}
              source={images.wordSearchBg}>
              <View>
                <View style={tw`flex flex-row justify-center gap-8 mb-5`}>
                  {questionButtons}
                </View>

                <Shadow>
                  <View
                    ref={viewRef}
                    onLayout={onLayout}
                    style={tw`h-[270px] w-[360px] mx-auto bg-white rounded-lg overflow-hidden`}>
                    <FlatList
                      data={crosswords}
                      style={tw``}
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
                            const wordStyle =
                              word && getWordStyle(word, cellSize);

                            const isSelected =
                              (letterIndexes.length &&
                                letterIndexes[0].colIndex === colIndex &&
                                letterIndexes[0].rowIndex === rowIndex) ||
                              !!word;

                            return (
                              <TouchableOpacity
                                key={`wordsearch-${rowIndex}-${colIndex}`}
                                onPressIn={() =>
                                  handleCellPress(letter, rowIndex, colIndex)
                                }
                                style={tw` h-[30px] w-[30px] flex items-center justify-center`}>
                                {isSelected && (
                                  <View
                                    style={tw`absolute left-[1px] top-[1px] ${
                                      wordStyle || selectedStyle
                                    } bg-pink-600 rounded-xl`}
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
                </Shadow>
              </View>
              <CrosswordQuestions />
            </ImageBackground>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
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
    flexDirection: "row",
  },
  cell: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "gray",
  },
  letter: {
    fontSize: 16,
  },
  foundWords: {
    fontSize: 16,
  },
});

export default WordSearch;
