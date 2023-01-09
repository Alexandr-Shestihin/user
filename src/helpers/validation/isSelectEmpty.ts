export function isSelectEmpty(value: string) {
    return !value.length ? 'This field is required' : '';
}