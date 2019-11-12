/*
Todo: If using, could add, e.g.:

"reverse-roman": {
    "applicable-fields": {
        "Section": {}
    }
}
*/

/**
 *
 * @param {string} str
 * @returns {Integer}
 */
function convertFromRoman (str) {
  let result = 0;
  // the result is now a number, not a string
  const roman = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1
  };
  for (const [rom, dec] of Object.entries(roman)) {
    while (str.indexOf(rom) === 0) {
      result += dec;
      str = str.replace(rom, '');
    }
  }
  return result;
}

export const getCellData = function ({
  applicableFieldText, tr,
  fieldLang, meta
}) {
  return convertFromRoman(String(applicableFieldText));
  // console.log('plugin');
};
