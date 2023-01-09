const REGEXP_EMAIL = new RegExp('^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@(([[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');

export function isEmailValid(value: string) {
    if (!value.length)
        return 'This field is required'

    if (!value.match(REGEXP_EMAIL))
        return 'Email not valid'

    return '';
}