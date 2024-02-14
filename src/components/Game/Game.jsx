import { useState } from "react";
import GameBoard from "../GameBoard/GameBoard";
import fire from "../../img/fire.gif";

export default function Game() {
  const [count, setCount] = useState(0);
  const [countVisible, setCountVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [fireworks, setFireworks] = useState(false);

  function handleGetFireworks() {
    setFireworks(true);
  }

  function handleChangeCounterIncrement() {
    setCount(count + 1);
  }

  function handleCounterReset() {
    setCount(0);
    setCountVisible(false);
    setTextVisible(false);
    setFireworks(false);
  }

  function handleCountStepVisible() {
    setCountVisible(true);
    setTextVisible(true);
  }

  function Fireworks() {
    return (
      <div className={fireworks ? "img-fire" : "img-fire hidden"}>
        <img className="img-fire" src={fire} alt="fire" />
      </div>
    );
  }

  function TextWin({ text }) {
    return (
      <div className="win-wrapper">
        <p className={textVisible ? "text-win" : "text-win hidden"}>{text}</p>
      </div>
    );
  }

  function CountStep({ count, text }) {
    return (
      <p className={countVisible ? "text-counter" : "text-counter hidden"}>
        {text} {count}
      </p>
    );
  }

  return (
    <div className="wrapper">
      <Fireworks />
      <h1 className="heading">
        <i>Игра Пятнашки</i>
      </h1>
      <TextWin text="You Win!" />
      <GameBoard
        onChangeCounterIncrement={handleChangeCounterIncrement}
        onClick={handleCounterReset}
        onChangeClassName={handleCountStepVisible}
        onChangeFireworks={handleGetFireworks}
      />
      <CountStep text="Количество сделанных ходов: " count={count} />
    </div>
  );
}
