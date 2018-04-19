
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
    // Todo: Ideally support read-only mouseover of specific sentences with coordinates?
    // Todo: Ability for highlight to even span multiple cells vertically
    // Todo: Ability to add/remove multiple notes within a cell
    // Todo: Ability to obtain or display notes from a specific website (or via
    //          `postMessage` in case it too is local)

    // height: -webkit-fill-available; // Works but we want to allow multiple
    return `
    <textarea style="width: 300px !important; height: 200px;"></textarea>`;
};
