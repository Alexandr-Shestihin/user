export function isPhoneValid(value: string) {
    if (!value.length) return 'This field is required'
    if (value.length < 11) return 'Phone number is not valid'
    return ''
}