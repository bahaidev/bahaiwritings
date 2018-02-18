/* eslint-env node */
import IntlMessageFormat from 'intl-messageformat';
import imf from './index-es6.js';

if (typeof global !== 'undefined') {
    global.IntlMessageFormat = IntlMessageFormat;
}

export default imf;
