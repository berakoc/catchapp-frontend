const debug = (message) => console.log(`%cDebug%c${JSON.stringify(message, null, 2)}`, 'color: white;background-color: #ffb703; padding: 2px 6px; border-radius: 2px; margin-right: 2px;', '')

export default debug