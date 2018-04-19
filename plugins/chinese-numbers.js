
export const getCellData = function ({
    applicableFieldText, tr,
    fieldLang, meta
}) {
    return applicableFieldText.toLocaleString('zh-u-nu-hanidec');
};
