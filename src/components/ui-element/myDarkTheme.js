import {
  cyan700,
  grey600,
  pinkA100,
  pinkA200,
  pinkA400,
  fullWhite,
  white,
  darkBlack,
  fullBlack,
  grey100,
  grey300,
  grey400,
  grey500,
  cyan500
} from "material-ui/styles/colors";
import { fade } from "material-ui/utils/colorManipulator";
import spacing from "material-ui/styles/spacing";

export default {
  spacing: spacing,
  fontFamily: "Roboto, sans-serif",
  borderRadius: 2,
  palette: {
    primary1Color: cyan500,
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: fullWhite,
    secondaryTextColor: fade(fullWhite, 0.54),
    alternateTextColor: fullWhite,
    canvasColor: "#303030",
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack
  }
};
