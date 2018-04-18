const ellipsis = '\u2026';
export const getCellData = function ({
    tableData, i, j, applicableField,
    applicableFieldIdx, fieldLang, meta
}) {
    // console.log('applicableFieldIdx', applicableFieldIdx, tableData[i][applicableFieldIdx]);
    const applicableFieldText = tableData[i][applicableFieldIdx];

    // To ensure we end the ellipsis on a word
    const words = applicableFieldText.split(/\s/);
    let output = '';
    words.some((word) => {
        if ((output + word).length < 25) {
            output += ' ' + word;
            return false;
        }
        return true;
    });
    return output.slice(1) + ellipsis;
};
