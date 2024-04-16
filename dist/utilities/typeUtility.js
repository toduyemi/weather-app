export function getElement(selector, type) {
    const el = document.querySelector(selector);
    if (!(el instanceof type)) {
        throw new Error('Element does not exist');
    }
    return el;
}
//# sourceMappingURL=typeUtility.js.map