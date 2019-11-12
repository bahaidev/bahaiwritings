import tippy from '../external/tippy.js';

export const escapeColumn = false;
export const getCellData = function ({
  applicableFieldText, tr,
  metaApplicableField, fieldInfo /* , fieldLang */
}) {
  const {targetField} = metaApplicableField;
  const targetFieldIdx = fieldInfo.findIndex(({field}) => {
    return field === targetField;
  });
    // Namespace this tippy plugin from other tippy plugins
  return `<span data-tooltip=""
        data-tippy-content="${tr[targetFieldIdx]}">${applicableFieldText}</span>`;
};

export const done = function () {
  tippy('[data-tooltip][data-tippy-content]', {
    followCursor: true,
    distance: 50,
    placement: 'right'
  });
};
