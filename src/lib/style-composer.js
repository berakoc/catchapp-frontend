import { EMPTY_STRING } from './string';

/**
 * Combines multiple style classes into one string
 * @param {object} styles
 * @param  {...String} classNames
 * @returns {String}
 */
const combine = (styles, ...classNames) => {
    let result = EMPTY_STRING;
    if (!classNames[0]) return result;
    for (const className of classNames) {
        const isGlobal = ~className.indexOf(':');
        result += (
            isGlobal ? className.substring(1) : styles[className]
        ).concat(' ');
    }
    return result.trim();
};

export default combine;
