import crypto from 'crypto-js';

export const EMPTY_STRING = '';

const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];

/**
 * Generates a date string
 * @param {Date} date
 * @returns {String}
 */
export const getDateString = (date) =>
    `${monthNames[date.getMonth()]} ${date.getDay()} ${
        new Date().getFullYear() !== date.getFullYear()
            ? date.getFullYear()
            : ''
    }`;

/**
 * @param {Number} num Number to be converted
 * @returns
 */
export const convertNumberToString = (num) =>
    num < 1000 ? num : (num / 100).toFixed(0);

export const encrypt = (str) =>
    crypto.enc.Base64.stringify(crypto.enc.Utf8.parse(str));
export const decrypt = (secret) =>
    crypto.enc.Base64.parse(secret).toString(crypto.enc.Utf8);

const hashCode = (str) => {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash * 100;
};

const intToRGB = (i) => {
    var c = (i & 0x00ffffff).toString(16).toUpperCase();

    return '#' + ('00000'.substring(0, 6 - c.length) + c);
};

export const stringToRGB = (string) => intToRGB(hashCode(string));
