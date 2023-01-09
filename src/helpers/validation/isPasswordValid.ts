export function isPasswordValid(value: string) {
    if (!value.length)
        return 'This field is required';

    if (value.length < 8)
        return 'At least 8 characters';

    return ''
}