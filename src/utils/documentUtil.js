// @flow

export default {
    getElementOrThrow({id, document}: { id: string, document: Document }) {
        return document.getElementById(id);
    }
}