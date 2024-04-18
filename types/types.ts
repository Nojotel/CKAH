export interface ButtonProps {
  buttonText: string;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export interface Slide {
  id: number;
  description: string;
  imageUrl: string;
}

export interface Rate {
  id: number;
  title: string;
  imageUrl: string;
  subTitle: string;
  currentPrice: number;
  oldPrice: number;
  priceDescription: string;
  features: string[];
  buttonText: string;
  color: string;
}
