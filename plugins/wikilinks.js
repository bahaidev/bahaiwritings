
export const escapeColumn = false;

export const getCellData = function ({
  applicableFieldText, tr,
  fieldLang, meta, metaApplicableField
}) {
  return `<a href="${metaApplicableField.baseURL}${applicableFieldText}">${
    applicableFieldText
  }</a>`;
  // console.log('plugin');
};
