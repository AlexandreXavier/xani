import kleur from 'kleur';
export class Logger {
    constructor() {
        this.prefix = '';
    }
    Logger(prefix = '') {
        this.prefix = prefix;
    }
    debug(message) {
        console.debug(this.prefix + message);
    }
    info(message) {
        console.info(this.prefix + message);
    }
    warn(message) {
        console.warn(this.prefix + message);
    }
    error(message) {
        console.error(this.prefix + message);
    }
}
export function printTitle(msg, bgColor = kleur.bgGreen) {
    console.log('');
    console.log(kleur.black(bgColor(` ${msg} `)));
}
