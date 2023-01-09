export const getPrivacyPolicyLink = (lang?: unknown) => {
    switch (lang) {
        case 'fr':
            return 'https://passport.gg/fr/privacy-policy-fr/'
        case 'ru':
            return 'https://passport.gg/ru/privacy-policy-ru/'
        default:
            return 'https://passport.gg/privacy-policy/'
    }
}

export const getCookiesPolicyLink = (lang?: unknown) => {
    switch (lang) {
        case 'fr':
            return 'https://passport.gg/fr/cookie-policy-fr/'
        case 'ru':
            return 'https://passport.gg/ru/cookie-policy-ru/'
        default:
            return 'https://passport.gg/cookie-policy/'
    }
}

export const getTermsLink = (lang?: unknown) => {
    switch (lang) {
        case 'fr':
            return 'https://passport.gg/fr/tou-fr/'
        case 'ru':
            return 'https://passport.gg/ru/tou-ru/ '
        default:
            return 'https://passport.gg/tou/'
    }
}