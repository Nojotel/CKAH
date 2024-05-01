export interface ButtonProps {
  buttonText: string;
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
  buttonTextAuthenticated?: string;
  color: string;
}
export interface BurgerMenuProps {
  isAuthenticated: boolean;
  logout: () => void;
  handleLogin: () => void;
}

export interface Publication {
  id: string;
  title: { text: string; markup?: string };
  issueDate: string;
  source: { name: string };
  url: string;
  content: { text?: string; markup?: string };
  attributes: any;
}

export interface PublicationCardProps {
  publication: Publication;
}

export interface XmlContent {
  scandoc: {
    sentence: { _text: string } | { _text: string }[];
  };
}

export interface FormData {
  inputValue: string;
  totalityValue: string;
  documentCount: string;
  startDate: string;
  endDate: string;
  options: {
    [key: string]: boolean;
  };
}

export interface SearchParams {
  startDate: string | Date;
  endDate: string | Date;
  inputValue: string;
  totalityValue: string;
  documentCount: string;
  options: {
    maxRelevance: boolean;
    mentionInBusinessContext: boolean;
    mainRoleInPublication: boolean;
    publicationsOnlyWithRiskFactors: boolean;
    includeTechnicalNews: boolean;
    includeAnnouncementsAndCalendars: boolean;
    includeNewsDigests: boolean;
  };
}

export interface SearchState {
  params: SearchParams;
}

export interface AuthContextValue {
  login: (email: string, password: string) => Promise<string | undefined>;
  logout: () => void;
  getUserInfo: (token: string) => Promise<void>;
  user: any;
  accessToken: string | null;
  accountInfo: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAuthCheckingInProgress: boolean;
}

export interface UserHeaderProps {
  user: {
    name: string;
  } | null;
  accountInfo: {
    companyLimit: number;
    usedCompanyCount: number;
  } | null;
  logout: () => void;
  isLoading: boolean;
}
export interface HistogramData {
  date: string;
  totalDocuments: number;
  riskFactors: number;
}

export interface HistogramResponse {
  data: {
    data: { date: string; value: number; histogramType: string }[];
    histogramType: string;
  }[];
}
