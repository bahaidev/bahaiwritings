import tippy from '../node_modules/tippy.js/dist/esm/tippy.js';
import loadStylesheets from '../node_modules/load-stylesheets/dist/index-es.js';

loadStylesheets('../node_modules/tippy.js/dist/tippy.css');

export const escapeColumn = false;
export const getCellData = function ({
    applicableFieldText, tr,
    fieldLang, metaApplicableField, fieldInfo
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
