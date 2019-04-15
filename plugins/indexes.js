import indexJSON from '../node_modules/bahai-indexes/indexes/json-flattened/aqdas.js';
import {escapeHTML} from '../node_modules/textbrowser/resources/utils/sanitize.js';

export const escapeColumn = false;

export const getCellData = ({
    applicableFieldText, fieldLang,
    getLangDir, fieldInfo, metaApplicableField
}) => {
    const {targetField} = metaApplicableField;
    const targetFieldIdx = fieldInfo.findIndex(({field}) => {
        return field === targetField;
    });
    let output = `<ul dir="${getLangDir(fieldInfo[targetFieldIdx].fieldLang)}">`;
    indexJSON[applicableFieldText].forEach(([text]) => {
        output += `<li>${escapeHTML(text)}</li>`;
    });
    output += '</ul>';
    return output;
};
