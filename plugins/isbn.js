
export const escapeColumn = false;

export const getCellData = function ({
  applicableFieldText, tr,
  fieldLang, meta
}) {
  // Todo: Could return empty string if no ISBN detected
  return `<a href="https://www.amazon.com/gp/search/?ie=UTF8&Adv-Srch-Books-Submit.y=0&sort=relevanceexprank&search-alias=stripbooks&tag=wiki-addon-20&linkCode=ur2&unfiltered=1&camp=1789&Adv-Srch-Books-Submit.x=0&field-dateop=&creative=390957&field-isbn=${applicableFieldText}">${
    applicableFieldText
  }</a>`;
};
