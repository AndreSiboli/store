"use client";

import { useState } from "react";
import styles from "./Manager.module.scss";
import Description from "./manager/Information";
import { ProductsAPIType } from "@/_types/ProductsType";

import { Poppins } from "next/font/google";
import Comments from "./manager/Comments";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type ManagerType = "Description" | "Comments";

//This components has more components within
export default function Manager({ product }: { product: ProductsAPIType }) {
  const [manager, setManager] = useState<ManagerType>("Description");

  function defineManager(option: ManagerType) {
    setManager(option);
  }

  return (
    <div className={styles.manager}>
      <div className={styles.manager_buttons}>
        <ManagerButton
          handleFunction={() => defineManager("Description")}
          manager={manager}
          text="Description"
        />
        <ManagerButton
          handleFunction={() => defineManager("Comments")}
          manager={manager}
          text="Comments"
        />
      </div>

      {manager === "Description" && <Description product={product} />}
      {manager === "Comments" && <Comments comments={product.reviews} />}
    </div>
  );
}

interface ManagerButtonPropsType {
  handleFunction: () => void;
  manager: ManagerType;
  text: ManagerType;
}

function ManagerButton(props: ManagerButtonPropsType) {
  const { handleFunction, manager, text } = props;
  return (
    <button
      onClick={handleFunction}
      className={`${poppins.className} ${manager === text && styles.active}`}
    >
      {text}
    </button>
  );
}
