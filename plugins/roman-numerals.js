/*
Todo:

If needing to add to add, can supply as with pm (which doesn't need as it already has):

"roman-numerals": {
    "applicable-fields": {
        "Number": {}
    }
}

*/

/**
 *
 * @param {Integer} num
 * @returns {string}
 */
function convertToRoman (num) {
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

  let str = '';
  for (const [rom, dec] of Object.entries(roman)) {
    const q = Math.floor(num / dec);
    num -= q * dec;
    str += rom.repeat(q);
  }
  return str;
}

export const getCellData = function ({
  applicableFieldText, tr,
  fieldLang, meta
}) {
  return convertToRoman(applicableFieldText);
  // console.log('plugin');
};
