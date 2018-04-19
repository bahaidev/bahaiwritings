
export const escapeColumn = false;

let eventSet = false;

export const getCellData = function ({
    applicableFieldText, tr,
    fieldLang, meta
}) {
    if (!eventSet) {
        // Also a `selectstart` event
        window.addEventListener('selectionchange', () => {
            window.getSelection();
        });
        eventSet = true;
    }
    // Ideally support read-only mouseover of specific sentencnes with coordinates?

    // height: -webkit-fill-available; // Works but we want to allow multiple
    return `
    <textarea style="width: 300px !important; height: 200px;"></textarea>`;
};
