const ellipsis = '\u2026';
export const getCellData = function ({
    applicableFieldText, tr,
    fieldLang, meta
}) {
    // To ensure we end the ellipsis on a word
    const words = applicableFieldText.split(/\s/);
    let output = '';
    words.some((word) => {
        if ((output + word).length >= 25) {
            return true;
        }
        output += ' ' + word;
    });
    return output.slice(1) + ellipsis;
};
