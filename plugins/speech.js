/* eslint-disable no-alert */
export const escapeColumn = false;
const locales = {
  'en-US': {
    listenToAll: '(Listen to all)'
  },
  ar: {
    listenToAll: '(Listen to all)'
  }
};

export const getCellData = function ({
  applicableFieldText, $p,
  applicableFieldIdx, fieldInfo, getLangDir
}) {
  const lang = $p.get('lang', true);
  const l = (key) => {
    const locale = locales[lang] || locales['en-US'];
    return locale[key];
  };
  return applicableFieldText.split(/\s+/u).reduce((s, text) => {
    return s +
            `<a data-speech="_" href="javascript:void(0);">${text}</a> `;
  }, `<div dir="${getLangDir(fieldInfo[applicableFieldIdx].fieldLang)}">`) +
        '<br /><br />' +
        ` <a data-speech="${applicableFieldText}" href="javascript:void(0);">
            ${l('listenToAll')}
        </a></div>`;
};

let run = false;
export const done = function ({meta: {language}}) {
  if (run) {
    return;
  }
  run = true;
  let voice, notify = false;
  speechSynthesis.addEventListener('voiceschanged', () => {
    console.log('voices changed');
    const voices = speechSynthesis.getVoices().filter(({lang, name}) => {
      return lang === language || lang.startsWith(language + '-');
    });
    console.log('voices', voices);
    // Todo: Make `voice` as preference instead
    [voice] = voices;
    if (notify) {
      alert('Voices are now available');
    }
  });
  window.addEventListener('click', ({target: {textContent, dataset: {speech}}}) => {
    if (!speech) {
      return;
    }
    if (!voice) {
      notify = true;
      alert('Please wait while voices load');
      return;
    }
    if (speech !== '_') {
      textContent = speech;
    }
    const utterance = new SpeechSynthesisUtterance(textContent);
    utterance.voice = voice;
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  });
};
