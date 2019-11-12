
export const escapeColumn = false;

export const getCellData = function ({
  applicableFieldText, tr,
  fieldLang, meta, metaApplicableField
}) {
  let style = metaApplicableField.width ? `width: ${metaApplicableField.width};` : '';
  if (metaApplicableField.height) {
    style += `height: ${metaApplicableField.height};`;
  }
  return `<iframe ${style ? ` style="${style}"` : ''}src="${metaApplicableField.baseURL}${applicableFieldText}?useskin=chameleon">${
    applicableFieldText
  }</iframe>`;
};
