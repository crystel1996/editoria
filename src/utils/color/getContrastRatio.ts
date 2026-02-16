import { getContrastRatio } from '@mui/material/styles';
import { ColorPalette } from '@utils/color/colorPalette';

export const textColor = (
    lightColor = ColorPalette.white,
    darkColor = ColorPalette.black,
) => {
    return getContrastRatio(ColorPalette.white, ColorPalette.white) >= 3
            ? lightColor
            : darkColor;
}