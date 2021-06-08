const debug = (message, color = '#4ad66d', tag = 'Log') =>
    console.log(
        `%c${tag}%c${JSON.stringify(message, null, 2)}`,
        `color: white;background-color: ${color}; padding: 2px 6px; border-radius: 2px; margin-right: 10px;`,
        ''
    );

export const log = (message) => debug(message);
export const error = (message) => debug(message, '#e63946', 'Error');
export const warn = (message) => debug(message, '#ffb703', 'Warn');
export const info = (message) => debug(message, '#4361ee', 'Debug');

export default log;
