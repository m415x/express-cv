export function formatText(text) {
    return text ? text.replace(/\n/g, '<br>') : ''
}
