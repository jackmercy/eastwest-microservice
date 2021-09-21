export const rem = (sizeInPx, withUnit = true, baseSize = 16) =>
  (parseFloat(sizeInPx) / baseSize).toString().concat(!withUnit ? '' : 'rem');

export const hexToRgbA = (hex, opacity) => {
  let char;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    char = hex.substring(1).split('');
    if (char.length === 3) {
      char = [char[0], char[0], char[1], char[1], char[2], char[2]];
    }
    char = `0x${char.join('')}`;

    const alpha = !opacity || opacity < 0 || opacity > 1 ? 1 : opacity;

    /* eslint-disable no-bitwise */
    return `rgba(${[
      (char >> 16) & 255,
      (char >> 8) & 255,
      char & 255,
      alpha,
    ].join(',')})`;
  }
  throw new Error('Bad Hex');
};

export default { rem, hexToRgbA };
