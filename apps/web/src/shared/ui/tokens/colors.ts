/**
 * DriveOS Color System Tokens
 * Source of Truth: /Color Mode/Light Mode.tokens.json & /Color Mode/Dark mode.tokens.json
 */

export const lightTokens = {
  text: {
    display: "#0B0D12",
    primary: "#181D27",
    secondary: "#414651",
    tertiary: "#535862",
    muted: "#717680",
    placeholder: "#A3A7AE",
    brandPrimary: "#4B8E55",
    onBrand: "#FFFFFF",
  },
  border: {
    primary: "#D5D7DA",
    secondary: "#E9EAEB",
    subtle: "#F5F5F5",
    brand: "#4B8E55",
    brandHover: "#3F7747",
  },
  bg: {
    canvas: "#FFFFFF",
    primary: "#FFFFFF",
    secondary: "#FAFAFA",
    pearl: "#FAFAFC",
    tertiary: "#F5F5F5",
    brandSolid: "#4B8E55",
    brandSolidHover: "#33613A",
    brandSection: "#274F2D",
  },
} as const;

export const darkTokens = {
  text: {
    display: "#FFFFFF",
    primary: "#F7F7F7",
    secondary: "#CECFD2",
    tertiary: "#95979D",
    muted: "#84888E",
    placeholder: "#95979D",
    brandPrimary: "#6BA374",
    onBrand: "#FFFFFF",
  },
  border: {
    primary: "#383A41",
    secondary: "#22262F",
    subtle: "#14161B",
    brand: "#6BA374",
    brandHover: "#383A41",
  },
  bg: {
    canvas: "#0C0E12",
    primary: "#0C0E12",
    secondary: "#14161B",
    pearl: "#14161B",
    tertiary: "#22262F",
    brandSolid: "#4B8E55",
    brandSolidHover: "#33613A",
    brandSection: "#14161B",
  },
} as const;

export const colors = lightTokens;
