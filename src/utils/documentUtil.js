// @flow

export default {
    getElementOrThrow({id, document}: { id: string, document: Document }): Element {
        const element = document.getElementById(id);
        if (!(element instanceof Element)) {
            throw new TypeError(`Invalid type - document.getElementById(${id}) does not return a proper Element`);
        }
        return element;
    }
}