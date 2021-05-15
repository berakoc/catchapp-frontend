/**
 * Combines multiple style classes into one string
 * @param {object} styles
 * @param  {...String} classNames
 * @returns {String}
 */
export const combine = (styles, ...classNames) => {
    let result = '';
    if (!classNames[0]) return '';
    for (const className of classNames) {
        const isGlobal = ~className.indexOf(':');
        result += (
            isGlobal ? className.substring(1) : styles[className]
        ).concat(' ');
    }
    return result.trim();
};
