const debug = (message, color='#ffb703', tag='Debug') => console.log(`%c${tag}%c${JSON.stringify(message, null, 2)}`, `color: white;background-color: ${color}; padding: 2px 6px; border-radius: 2px; margin-right: 2px;`, '')

export const info = (message) => debug(message)
export const error = (message) => debug(message, '#e63946')

export default info