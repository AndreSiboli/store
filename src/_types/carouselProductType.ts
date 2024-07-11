export interface CarouselProductType {
  animationTime: number;
  parentWidth: string;
  childWidth: string;
  margin: number;
  buttons: boolean;
  slide: boolean;
  autoSlide: boolean;
  itemPerView: number;
}

export interface CarouselProductTypeUser {
  animationTime?: number;
  parentWidth?: string;
  childWidth?: string;
  margin?: number;
  buttons?: boolean;
  slide?: boolean;
  autoSlide?: boolean;
  itemPerView?: number;
}
