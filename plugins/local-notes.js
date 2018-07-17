const locales = {
    'en-US': {
        'loading': 'Loading...',
        'please_reload': 'Please reload this page for the latest version.',
        'error_opening': 'There was an error opening the database. Please report the issue.',
        'blocked_opening': 'The database is blocked due to another request being present on the database. Please try again later.',
        'error_retrieval_transaction': 'There was an error during the transaction to retrieve items. Please try again later.'
    },
    'ar': {
        'loading': 'Loading...',
        'please_reload': 'Please reload this page for the latest version.',
        'error_opening': 'There was an error opening the database. Please report the issue.',
        'blocked_opening': 'The database is blocked due to another request being present on the database. Please try again later.',
        'error_retrieval_transaction': 'There was an error during the transaction to retrieve items. Please try again later.'
    }
};

const $$ = (sel) => {
    return [...document.querySelectorAll(sel)];
};

function getCanonicalID (textarea) {
    return textarea.parentNode.parentNode.dataset.canonicalId;
}

const localNotesDatabase = 'textbrowser-local-notes';

export const escapeColumn = false;

// `done` is always only run on the client
export const done = async ({$p}) => { // , canonicalBrowseFieldNames
    // Todo: Fetch locales
    // const results = await fetch('locales.json');
    // const locales = await results.json();

    // Todo: Should probably utilize same i18n mechanism as TextBrowser (passed from it?)
    const lang = $p.get('lang', true);
    const l = (key) => {
        const locale = locales[lang] || locales['en-US'];
        return locale[key];
    };

    const workStore = 'work-' + $p.get('work');
    const workIndex = 'work-retrieval-' + $p.get('work');

    // Todo: Accept alternative namespace through TextBrowser
    const openReq = indexedDB.open(localNotesDatabase);
    openReq.addEventListener('upgradeneeded', ({target: {result: db}}) => {
        db.addEventListener('versionchange', () => {
            if (!document.hasFocus()) {
                location.reload();
            } else {
                alert(l('please_reload'));
            }
        });
        // const keyPath = canonicalBrowseFieldNames; // E.g., book-chapter-verse
        const keyPath = 'id';
        const store = db.createObjectStore(workStore, {
            keyPath,
            autoIncrement: false
        });
        store.createIndex(workIndex, keyPath, {
            unique: true,
            multiEntry: false
        });
    });
    openReq.addEventListener('error', () => {
        alert(l('error_opening'));
    });
    openReq.addEventListener('blocked', () => {
        alert(l('blocked_opening'));
    });
    openReq.addEventListener('success', ({target: {result: db}}) => {
        const tx = db.transaction(workStore, 'readonly');
        // tx.addEventListener('complete', () => {});
        tx.addEventListener('error', () => {
            alert(l('error_retrieval_transaction'));
        });
        const store = tx.objectStore(workStore);
        const idx = store.index(workIndex);
        // Todo: Ideally we'd get starts/ends, but these can vary for browse field set
        // const req = idx.getAll(IDBKeyRange.bound(starts, ends));
        const req = idx.getAll();
        req.addEventListener('success', ({target: {result}}) => {
            $$('textarea[data-local-notes]').forEach((textarea, i) => {
                // textarea.value = result[i] || '';
                const id = getCanonicalID(textarea);
                // const canonicalBrowseFieldVals = id.split('-');
                const matchingObj = result.find((obj) => {
                    return obj.id === id;
                });
                textarea.value = (matchingObj && matchingObj.value) || '';
                // textarea.value = result[i] || '';
                textarea.disabled = false;
            });
        });
    });

    // Todo: Depending on config, allow this to be optional (i.e., readonly)
    window.addEventListener('change', ({target: textarea}) => {
        if (!textarea.matches('textarea[data-local-notes]')) {
            return;
        }
        const id = getCanonicalID(textarea);
        // const canonicalBrowseFieldVals = id.split('-');

        const openReq = indexedDB.open(localNotesDatabase);
        openReq.addEventListener('success', ({target: {result: db}}) => {
            const tx = db.transaction(workStore, 'readwrite');
            // tx.addEventListener('complete', () => {});
            tx.addEventListener('error', () => {
                alert(l('error_retrieval_transaction'));
            });
            const store = tx.objectStore(workStore);
            // Todo: Ensure multiple entries per verse are supported
            const obj = {id, value: textarea.value};
            /*
            canonicalBrowseFieldVals.forEach((browseFieldVal, i) => {
                obj[canonicalBrowseFieldNames[i]] = browseFieldVal;
            });
            */
            store.put(obj);
        });
    });

    // Todo: Not yet supported in Chrome (Firefox only); otherwise need
    //          `mousedown`, etc.
    // Also a `selectstart` event
    window.addEventListener('selectionchange', () => {
        const sel = window.getSelection();
        // Todo: Use this to set (last focused?) path adjoining textarea
        console.log('sel', sel);
    });
};

export const getCellData = ({
    fieldLang, meta, $p
}) => {
    const lang = $p.get('lang', true);
    const l = (key) => {
        const locale = locales[lang] || locales['en-US'];
        return locale[key];
    };

    // Todo: Ability to add/remove multiple notes within a cell and display existing

    // Todo: Ability to highlight to even span multiple cells vertically
    // Todo: Indicate specific sentences/words with coordinates (and ellipses)

    // Todo: Ability to obtain or display notes from a specific website (or via
    //          `postMessage` in case it too is local), optionally PUT back
    // Todo: Ideally support read-only mouseover of specific sentences with coordinates?

    // height: -webkit-fill-available; // Works but we want to allow multiple
    return `
    <textarea
        data-local-notes=""
        disabled="disabled"
        style="width: 300px !important; height: 200px;"
    >${l('loading')}</textarea>`;
};
