export interface ButtonProps {
  buttonText: string | undefined;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  disabled?: boolean;
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
  buttonTextAuthenticated?: string | undefined;
  color: string;
}
