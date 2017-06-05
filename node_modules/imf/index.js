/* globals getJSON, IntlMessageFormat */
/* exported IMF */

(function () {
    'use strict';

    function IMFClass (opts) {
        if (!(this instanceof IMFClass)) {
            return new IMFClass(opts);
        }
        opts = opts || {};
        const that = this;

        this.defaultNamespace = opts.defaultNamespace || '';
        this.defaultSeparator = opts.defaultSeparator === undefined ? '.' : opts.defaultSeparator;
        this.basePath = opts.basePath || 'locales/';
        this.fallbackLanguages = opts.fallbackLanguages;

        this.localeFileResolver = opts.localeFileResolver || function (lang) {
            return this.basePath + lang + '.json';
        };

        this.locales = opts.locales || [];
        this.langs = opts.langs;
        this.fallbackLocales = opts.fallbackLocales || [];

        function loadFallbacks (cb) {
            that.loadLocales(that.fallbackLanguages, function () {
                const fallbackLocales = Array.from(arguments);
                that.fallbackLocales.push.apply(that.fallbackLocales, fallbackLocales);
                if (cb) {
                    return cb(fallbackLocales);
                }
            }, true);
        }

        if (opts.languages || opts.callback) {
            this.loadLocales(opts.languages, function () {
                const locales = Array.from(arguments);
                function runCallback (fallbackLocales) {
                    if (opts.callback) {
                        opts.callback.apply(that, [that.getFormatter(opts.namespace), that.getFormatter.bind(that), locales, fallbackLocales]);
                    }
                }
                if (opts.hasOwnProperty('fallbackLanguages')) {
                    loadFallbacks(runCallback);
                } else {
                    runCallback();
                }
            });
        } else if (opts.hasOwnProperty('fallbackLanguages')) {
            loadFallbacks();
        }
    }

    IMFClass.prototype.getFormatter = function (ns, sep) {
        const that = this;

        function messageForNSParts (locale, namesp, separator, key) {
            let loc = locale;
            const found = namesp.split(separator).every(function (nsPart) {
                loc = loc[nsPart];
                return loc && typeof loc === 'object';
            });
            return found && loc[key] ? loc[key] : '';
        }
        const isArray = Array.isArray;

        ns = ns === undefined ? this.defaultNamespace : ns;
        sep = sep === undefined ? this.defaultSeparator : sep;
        ns = isArray(ns) ? ns.join(sep) : ns;

        return function (key, values, formats, fallback) {
            let message;
            let currNs = ns;
            if (key && !isArray(key) && typeof key === 'object') {
                values = key.values;
                formats = key.formats;
                fallback = key.fallback;
                key = key.key;
            }
            if (isArray(key)) { // e.g., [ns1, ns2, key]
                const newKey = key.pop();
                currNs = key.join(sep);
                key = newKey;
            } else {
                const keyPos = key.indexOf(sep);
                if (!currNs && keyPos > -1) { // e.g., 'ns1.ns2.key'
                    currNs = key.slice(0, keyPos);
                    key = key.slice(keyPos + 1);
                }
            }
            function findMessage (locales) {
                locales.some(function (locale) {
                    message = locale[(currNs ? currNs + sep : '') + key] || messageForNSParts(locale, currNs, sep, key);
                    return message;
                });
                return message;
            }
            findMessage(that.locales);
            if (!message) {
                if (typeof fallback === 'function') {
                    return fallback({message: that.fallbackLocales.length && findMessage(that.fallbackLocales), langs: that.langs, namespace: currNs, separator: sep, key: key, values: values, formats: formats});
                }
                if (fallback !== false) {
                    return that.fallbackLocales.length && findMessage(that.fallbackLocales);
                }
                throw new Error(
                    'Message not found for locales ' + that.langs +
                    (that.fallbackLanguages
                        ? ' (with fallback languages ' + that.fallbackLanguages + ')'
                        : ''
                    ) +
                    ' with key ' + key + ', namespace ' + currNs +
                    ', and namespace separator ' + sep
                );
            }
            if (!values && !formats) {
                return message;
            }
            const msg = new IntlMessageFormat(message, that.langs, formats);
            return msg.format(values);
        };
    };

    IMFClass.prototype.loadLocales = function (langs, cb, avoidSettingLocales) {
        const that = this;
        langs = langs || navigator.language || 'en-US';
        langs = Array.isArray(langs) ? langs : [langs];
        if (!avoidSettingLocales) {
            this.langs = langs;
        }
        getJSON(
            langs.map(this.localeFileResolver, this),
            function () {
                const locales = Array.from(arguments);
                if (!avoidSettingLocales) {
                    that.locales.push.apply(that.locales, locales);
                }
                if (cb) {
                    cb.apply(that, locales);
                }
            }
        );
    };

    window.IMF = IMFClass;
}());
