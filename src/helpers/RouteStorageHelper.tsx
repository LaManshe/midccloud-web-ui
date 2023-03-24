export default class RouteStorageHelper {
    static root() : string {
        return '\\';
    }

    static up(current: string, next: string) : string {
        return `${current}${next}\\`
    }

    static down(current: string) : string {
        if (current === '\\'){
            return current;
        }

        const array = current.split('\\');

        array.splice(array.length - 2, 1);

        return array.join('\\');
    }
}