import { Typography } from "@mui/material";

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "caption"
  | "button"
  | "overline";

interface TypographyTextProps {
  props: {
    variant?: TypographyVariant;
    component?: React.ElementType;
    color?: string;
    gutterBottom?: boolean;
    noWrap?: boolean;
    title?: string;
  };
  children: React.ReactNode;
}

export function TypographyText({ props, children }: TypographyTextProps) {
  const { variant, component, color, gutterBottom, noWrap, title } = props;
  const baseProps = { variant, color, gutterBottom, noWrap, title };

  if (component !== undefined) {
    return (
      <Typography {...baseProps} component={component}>
        {children}
      </Typography>
    );
  }
  return (
    <Typography {...baseProps}>
      {children}
    </Typography>
  );
}
