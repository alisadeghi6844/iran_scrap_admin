type TypographyTag =
  | "div"
  | "span"
  | "a"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  |"svg"
  | "box"|any|null; // اضافه کردن 'box' به نوع

export interface TypographyTypes extends React.HTMLProps<HTMLElement> {
  children?: React.ReactNode;
  tag?: TypographyTag | any;
  variant?: string;
  className?: string;
  link?: string;
}
