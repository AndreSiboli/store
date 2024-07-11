"use client";

import {
  ChangeEvent,
  MouseEvent,
  ReactElement,
  TouchEvent,
  cloneElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { CarouselType, CarouselTypeUser } from "@/_types/carouselType";
import styles from "@/styles/carousel/Carousel.module.scss";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import Radio from "../inputs/Radio";

interface PropsType {
  carouselConfig: CarouselTypeUser;
  children: ReactElement[];
}

export default function Carousel(props: PropsType) {
  const { carouselConfig, children } = props;
  const configBase = {
    animationTime: 200,
    parentWidth: "100%",
    childWidth: "calc(100% - 200px)",
    margin: 0,
    buttons: true,
    slide: true,
    autoSlide: false,
  };
  const [config, setConfig] = useState<CarouselType>({
    ...configBase,
    ...carouselConfig,
  });

  const [currentPosition, setCurrentPosition] = useState(1);
  const parentRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const allowShift = useRef(false);
  const dragging = useRef(false);
  const initialClick = useRef(0);
  const initialTimeClick = useRef(0);
  const translate = useRef(0);
  const interval = useRef<NodeJS.Timeout>();
  const intervalAnimation = useRef<NodeJS.Timeout>();

  //It'll fix the size on first loading
  useEffect(() => {
    const move = calculateNextMove(currentPosition);
    moveCarousel(move);
  }, []);

  //Always the user resize the page, it'll fix the carousel
  useEffect(() => {
    function resize() {
      const move = calculateNextMove(currentPosition);
      moveCarousel(move);
    }

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [currentPosition]);

  useEffect(() => {
    if (!config.autoSlide) return;
    if (interval.current) clearTimeout(interval.current);

    interval.current = setTimeout(() => {
      changeItem(1);
    }, 6000);

    return () => {
      clearTimeout(interval.current);
    };
  }, [currentPosition]);

  //This calculate exactly the next move
  function calculateNextMove(currentPos: number) {
    const parentElement = parentRef.current;
    const childElement = wrapperRef.current;
    if (!parentElement || !childElement) return 0;

    const parentWidth = parentElement.clientWidth;
    const childrenWidth = childElement.children[0].clientWidth;
    const calculatingMargin =
      parentWidth / 2 - childrenWidth / 2 - config.margin;

    return (childrenWidth + 2 * config.margin) * currentPos - calculatingMargin;
  }

  function moveCarousel(to: number) {
    if (!wrapperRef.current) return;
    wrapperRef.current.style.transform = `translate3d(-${to}px, 0, 0)`;
  }

  function infiniteCarousel(num: 1 | -1) {
    if (!wrapperRef.current) return;
    const children = wrapperRef.current.childNodes.length;
    const initialItem = 1;
    const lastItem = children - 2;
    addAnimation(true);

    if (num === 1) {
      moveCarousel(calculateNextMove(0));
    } else if (num === -1) {
      moveCarousel(calculateNextMove(children - 1));
    }

    setTimeout(() => {
      addAnimation(false);
      if (num === 1) {
        const moveTo = calculateNextMove(lastItem);
        moveCarousel(moveTo);
        setCurrentPosition(lastItem);
      } else if (num === -1) {
        const moveTo = calculateNextMove(initialItem);
        moveCarousel(moveTo);
        setCurrentPosition(initialItem);
      }
    }, config.animationTime + 50);
    clearShift();
  }

  //this is the core function
  function changeItem(num: 1 | 0 | -1) {
    if (!wrapperRef.current || dragging.current || allowShift.current) return;

    const nextItem = currentPosition + num;
    const moveTo = calculateNextMove(nextItem);
    const children = wrapperRef.current.childNodes.length - 1;
    allowShift.current = true;

    if (nextItem <= 0) {
      infiniteCarousel(1);
      return;
    }
    if (nextItem >= children) {
      infiniteCarousel(-1);
      return;
    }

    addAnimation(true);
    moveCarousel(moveTo);
    clearAnimation();
    clearShift();
    setCurrentPosition(nextItem);
  }

  function addAnimation(current: boolean) {
    if (!wrapperRef.current) return;

    wrapperRef.current.className = `${styles.carousel_wrapper} ${
      current && styles.animation
    }`;
  }

  function clearAnimation() {
    if (intervalAnimation.current) {
      clearTimeout(intervalAnimation.current);
    }

    intervalAnimation.current = setTimeout(() => {
      addAnimation(false);
    }, config.animationTime);
  }

  function clearShift() {
    setTimeout(() => {
      allowShift.current = false;
    }, config.animationTime);
  }

  //MOBILE FUNCTIONS

  function dragStart(e: MouseEvent | TouchEvent) {
    if (!config.slide) return;
    const main = parentRef.current;
    const slider = wrapperRef.current;
    if (!main || !slider || allowShift.current) return;

    dragging.current = true;

    const style = window.getComputedStyle(slider);
    const matrix = new WebKitCSSMatrix(style.transform);
    const currentTranslateX = matrix.m41;
    translate.current = Number(currentTranslateX);
    initialTimeClick.current = e.timeStamp;

    if ("touches" in e) {
      initialClick.current = -e.touches[0].pageX;
    } else {
      initialClick.current = -e.pageX;
    }
  }

  function dragMove(e: MouseEvent | TouchEvent) {
    if (!config.slide) return;

    const main = parentRef.current;
    const slider = wrapperRef.current;
    if (!main || !slider || !dragging.current || allowShift.current) return;

    if ("touches" in e) {
      slider.style.transform = `translate3d(${
        translate.current - (-e.touches[0].clientX - initialClick.current)
      }px, 0px, 0px)`;
    } else {
      slider.style.transform = `translate3d(${
        translate.current - (-e.pageX - initialClick.current)
      }px, 0px, 0px)`;
    }

    main.style.cursor = "grabbing";
  }

  function dragEnd(e: MouseEvent | TouchEvent) {
    if (!config.slide) return;

    const main = parentRef.current;
    const slider = wrapperRef.current;
    if (!main || !slider) return;
    dragging.current = false;
    if (allowShift.current) return;

    main.style.cursor = "auto";
    const width = main.clientWidth;
    const howFast = e.timeStamp - initialTimeClick.current;

    function movement(position: number) {
      if (
        initialClick.current < -position - width / 2 ||
        (howFast <= 200 && initialClick.current < -position - 25)
      ) {
        changeItem(1);
        return;
      }
      if (
        initialClick.current > -position + width / 2 ||
        (howFast <= 200 && initialClick.current > -position + 25)
      ) {
        changeItem(-1);
        return;
      }
      changeItem(0);
    }

    if ("touches" in e) {
      const pos = e.changedTouches[0].pageX;
      movement(pos);
    } else {
      const pos = e.pageX;
      movement(pos);
    }
  }

  function dragOut(e: MouseEvent | TouchEvent) {
    dragging.current = false;
  }

  //RADIO FUNCTIONS

  function radio(e: ChangeEvent<HTMLInputElement>) {
    const value = Number((e.target as any).value);
    addAnimation(true);
    const moveTo = calculateNextMove(value);
    moveCarousel(moveTo);
    setCurrentPosition(value);
    clearAnimation();
  }

  return (
    <div
      className={styles.carousel}
      ref={parentRef}
      style={{ maxWidth: `${config.parentWidth}` }}
    >
      {config.buttons && (
        <div className={styles.carousel_buttons}>
          <button onClick={() => changeItem(-1)} aria-label="previous">
            <FaAngleLeft />
          </button>
          <button onClick={() => changeItem(1)} aria-label="next">
            <FaAngleRight />
          </button>
        </div>
      )}

      <div
        className={`${styles.carousel_wrapper}`}
        ref={wrapperRef}
        style={{
          transform: `translate3d(-${0}px, 0, 0)`,
        }}
        onMouseDown={(e) => dragStart(e)}
        onMouseMove={(e) => dragMove(e)}
        onMouseUp={(e) => dragEnd(e)}
        onMouseOut={(e) => dragOut(e)}
        onTouchStart={(e) => dragStart(e)}
        onTouchMove={(e) => dragMove(e)}
        onTouchEndCapture={(e) => dragEnd(e)}
      >
        {children.map((item) =>
          cloneElement(item, {
            style: {
              margin: `0 ${config.margin}px`,
            },
          })
        )}
      </div>

      <div className={styles.carousel_radios}>
        <Radio
          id="radio1"
          name="radio"
          value="1"
          checked={currentPosition === 1}
          handleRadio={radio}
        />
        <Radio
          id="radio2"
          name="radio"
          value="2"
          checked={currentPosition === 2}
          handleRadio={radio}
        />
        <Radio
          id="radio3"
          name="radio"
          value="3"
          checked={currentPosition === 3}
          handleRadio={radio}
        />
      </div>
    </div>
  );
}
