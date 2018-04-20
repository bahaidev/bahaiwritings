const locales = {
    'en-US': {
        'loading': 'Loading...',
        'error_retrieval_notes': 'There was an error retrieving notes',
        'error_saving_notes': 'There was an error saving notes'
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

// We do this here instead of synchronously in anticipation of
//    possible async localStorage: https://domenic.github.io/async-local-storage/
export const done = async ({$p}) => {
    const lang = $p.get('lang', true);
    const l = (key) => {
        const locale = locales[lang] || locales['en-US'];
        return locale[key];
    };

    // We could shift to individual keys for each item (though would be
    //         much harder to export)
    function getNotes () {
        try {
            return JSON.parse(localStorage.getItem(localNotesDatabase) || '{}');
        } catch (err) {
            alert(l('error_retrieval_notes'));
        }
    }
    function saveNotes (obj) {
        try {
            localStorage.setItem(localNotesDatabase, JSON.stringify(obj));
        } catch (err) {
            alert(l('error_saving_notes'));
        }
    }

    $p.get('work');
    const obj = getNotes();
    $$('textarea[data-local-notes]').forEach((textarea) => {
        const id = getCanonicalID(textarea);
        textarea.value = obj[id] || '';
        textarea.disabled = false;
    });

    window.addEventListener('change', ({target}) => {
        if (!target.matches('textarea[data-local-notes]')) {
            return;
        }
        const id = getCanonicalID(target);
        console.log('id', id);
        const obj = getNotes();
        obj[id] = target.value;
        saveNotes(obj);
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

    // Todo: We need a stable `data-local-notes-id`

    // height: -webkit-fill-available; // Works but we want to allow multiple
    return `
    <textarea
        data-local-notes=""
        disabled="disabled"
        style="width: 300px !important; height: 200px;"
    >${l('loading')}</textarea>`;
};
