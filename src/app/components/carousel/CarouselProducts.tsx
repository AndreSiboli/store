"use client";

import {
  MouseEvent,
  ReactElement,
  TouchEvent,
  cloneElement,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  CarouselProductType,
  CarouselProductTypeUser,
} from "@/_types/carouselProductType";
import styles from "@/styles/carousel/CarouselProducts.module.scss";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

interface PropsType {
  carouselConfig: CarouselProductTypeUser;
  children: ReactElement[];
}

export default function CarouselProducts(props: PropsType) {
  const { carouselConfig, children } = props;
  const configBase = {
    animationTime: 200,
    parentWidth: "100%",
    childWidth: "calc(100% - 200px)",
    margin: 0,
    buttons: true,
    slide: true,
    autoSlide: false,
    itemPerView: 4,
  };
  const [config, setConfig] = useState<CarouselProductType>({
    ...configBase,
    ...carouselConfig,
  });

  const [currentPosition, setCurrentPosition] = useState(0);
  const parentRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const allowShift = useRef(false);
  const dragging = useRef(false);
  const initialClick = useRef(0);
  const initialTimeClick = useRef(0);
  const translate = useRef(0);
  const intervalAnimation = useRef<NodeJS.Timeout>();

  function fixItemPerView() {
    const width = window.innerWidth;

    if (width > 1220) {
      setConfig((prevState) => ({ ...prevState, itemPerView: 4, margin: 8 }));
      return;
    }
    if (width > 780) {
      setConfig((prevState) => ({ ...prevState, itemPerView: 3, margin: 8 }));
      return;
    }
    if (width > 500) {
      setConfig((prevState) => ({ ...prevState, itemPerView: 2, margin: 8 }));
      return;
    }
    setConfig((prevState) => ({ ...prevState, itemPerView: 1, margin: 0 }));
  }

  //It'll fix the size on first loading
  useEffect(() => {
    const move = calculateNextMove(currentPosition);
    moveCarousel(move);
    fixItemPerView();
  }, []);

  //Always the user resize the page, it'll fix the carousel
  useEffect(() => {
    function resize() {
      fixItemPerView();
    }

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [currentPosition, config]);

  useEffect(() => {
    const move = calculateNextMove(0);
    moveCarousel(move);
    setCurrentPosition(0);
  }, [config]);

  //This calculate exactly the next move
  function calculateNextMove(currentPos: number) {
    const parentElement = parentRef.current;
    const childElement = wrapperRef.current;
    if (!parentElement || !childElement) return 0;

    const childrenWidth = childElement.children[0].clientWidth;
    const boxShadowWidth = -1;
    const marginLeftRight = 2 * config.margin;
    const itemWidth = childrenWidth + marginLeftRight;
    const movePerSlide = itemWidth * config.itemPerView;
    const totalItems = childElement.children.length;
    const remainderItems = totalItems % config.itemPerView;
    const totalSlides = totalItems / config.itemPerView - 1;

    if (currentPos >= totalSlides && remainderItems !== 0) {
      const leftItemsWitdh = remainderItems * itemWidth;
      return movePerSlide * (currentPos - 1) + leftItemsWitdh + boxShadowWidth;
    }

    return movePerSlide * currentPos + boxShadowWidth;
  }

  function moveCarousel(to: number) {
    if (!wrapperRef.current) return;
    to >= 0
      ? (wrapperRef.current.style.transform = `translate3d(-${to}px, 0, 0)`)
      : (wrapperRef.current.style.transform = `translate3d(${Math.abs(
          to
        )}px, 0, 0)`);
  }

  //this is the core function
  function changeItem(num: 1 | 0 | -1) {
    if (!wrapperRef.current || dragging.current || allowShift.current) return;
    const nextItem = currentPosition + num;
    const children = wrapperRef.current.childNodes.length;
    const movement = (children - 1) / config.itemPerView;

    if (nextItem < 0 || nextItem > movement) {
      return;
    }

    const moveTo = calculateNextMove(nextItem);
    allowShift.current = true;
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
    const parent = parentRef.current;
    const wrapper = wrapperRef.current;
    if (!parent || !wrapper || allowShift.current) return;

    dragging.current = true;

    const style = window.getComputedStyle(wrapper);
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

    const parent = parentRef.current;
    const wrapper = wrapperRef.current;
    if (!parent || !wrapper || !dragging.current || allowShift.current) return;
    let getCurrentGrab = 0;

    if ("touches" in e) {
      getCurrentGrab =
        translate.current - (-e.touches[0].clientX - initialClick.current);
    } else {
      getCurrentGrab = translate.current - (-e.pageX - initialClick.current);
    }

    if (-getCurrentGrab <= -50) return;
    wrapper.style.transform = `translate3d(${getCurrentGrab}px, 0, 0)`;

    parent.style.cursor = "grabbing";
  }

  function dragEnd(e: MouseEvent | TouchEvent) {
    if (!config.slide) return;

    const parent = parentRef.current;
    const wrapper = wrapperRef.current;
    if (!parent || !wrapper) return;
    dragging.current = false;
    if (allowShift.current) return;

    parent.style.cursor = "auto";
    const width = parent.clientWidth;
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
    </div>
  );
}
