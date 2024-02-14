import React, { useState } from "react";
import Button from "../Button/Button";

let shuffled;

function isValidityBoard(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] !== i + 1) {
      return false;
    }
  }
  return true;
}

function shuffle(array) {
  for (let i = array.length - 2; i > 1; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const board = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, ""]
];

const univariateArr = board.flat();

export default function GameBoard({
  onChangeCounterIncrement,
  onClick,
  onChangeClassName,
  onChangeFireworks
}) {
  const [values, setValues] = useState(univariateArr);
  const [blockBoard, setBlockBoard] = useState(false);

  function handleButtonMixClick() {
    shuffled = shuffle([...univariateArr]);
    setValues(shuffled);
    onClick(); // должен обнулится/исчезнуть счетчик, текст_Win и fire
    setBlockBoard(false);
  }

  function handleMoveButtonClick(i) {
    if (!shuffled) return; // для проверки конца игры
    let newBoard = [...values];

    const isEmptyTop = newBoard[i - 4] === "";
    const isEmptyBottom = newBoard[i + 4] === "";
    const isEmptyNext = newBoard[i + 1] === "";
    const isEmptyPrev = newBoard[i - 1] === "";
    const isCheckEmptyOnRightFromClick = (i + 1) % 4 === 0;
    const isCheckEmptyOnLeftFromClick = i % 4 === 0;

    if (isEmptyNext && !isCheckEmptyOnRightFromClick) {
      [newBoard[i], newBoard[i + 1]] = [newBoard[i + 1], newBoard[i]];
      onChangeCounterIncrement();
    } else if (isEmptyPrev && !isCheckEmptyOnLeftFromClick) {
      [newBoard[i], newBoard[i - 1]] = [newBoard[i - 1], newBoard[i]];
      onChangeCounterIncrement();
    } else if (isEmptyBottom) {
      [newBoard[i], newBoard[i + 4]] = [newBoard[i + 4], newBoard[i]];
      onChangeCounterIncrement();
    } else if (isEmptyTop) {
      [newBoard[i], newBoard[i - 4]] = [newBoard[i - 4], newBoard[i]];
      onChangeCounterIncrement();
    }

    setValues(newBoard);
    if (isValidityBoard(newBoard)) {
      onChangeClassName();
      onChangeFireworks();
      setBlockBoard(true);
    }
  }


  return (
    <div id="board">
      <div className="row">
        {values.map((item, index) => {
          return item === "" ? (
            <Button
              className={"empty"}
              disabled={blockBoard}
              key={item}
              index={index}
            >
              {item}
            </Button>
          ) : (
            <Button
              className={"btn"}
              disabled={blockBoard}
              key={item}
              onClick={(e) => {
                handleMoveButtonClick(index);
              }}
            >
              {item}
            </Button>
          );
        })}
      </div>
      <Button className={"mix"} onClick={handleButtonMixClick}>
        Mix
      </Button>
    </div>
  );
}
