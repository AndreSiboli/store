"use cleint";

import { ChangeEvent, useContext, useRef, useState } from "react";
import styles from "@/styles/layout/HowMuch.module.scss";

import { FaPlus, FaMinus } from "react-icons/fa6";
import { CartContext } from "@/_contexts/CartContext";
import { updateHowManyDB } from "@/services/cart";

interface PropsType {
  inCart: number;
  max: number;
  id: string | number;
}

export default function HowMuch(props: PropsType) {
  const { increaseItem } = useContext(CartContext);
  const { inCart = 1, max, id } = props;
  const [state, setState] = useState(inCart);
  const timeout = useRef<NodeJS.Timeout>();

  function insertByButton(add: 1 | -1) {
    let how = state + add;

    if (how > max) how = max;
    else if (how < 1) how = 1;

    setState(how);
    addHowMany(how);
  }

  function insertByInput(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    let number = 1;
    const regex = /[-e]/;

    if (!Number.isNaN(value) && !value.match(regex)) {
      number = parseInt(value);
      if (number > max) number = max;
      else if (number < 1) number = 1;
    }

    if (!number) number = 1;

    setState(number);
    addHowMany(number);
  }

  function addHowMany(how: number) {
    clearTimeout(timeout.current);

    timeout.current = setTimeout(async () => {
      const res = await updateHowManyDB({ productId: id, howMany: how });
      if (!res) return;
      increaseItem(id, how);
    }, 700);
  }

  return (
    <div className={styles.howmuch}>
      <button
        onClick={() => insertByButton(-1)}
        aria-label="Button to decrease"
      >
        <FaMinus />
      </button>
      <input
        type="number"
        max={max}
        min={1}
        value={state}
        onChange={insertByInput}
        aria-label="How many items"
      />
      <button onClick={() => insertByButton(1)} aria-label="Button to increase">
        <FaPlus />
      </button>
    </div>
  );
}
