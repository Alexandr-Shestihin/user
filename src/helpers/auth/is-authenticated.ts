export function isAuthenticated() {
    const sessionToken = sessionStorage.getItem('token');
    const storageToken = localStorage.getItem('token');
    return sessionToken || storageToken;
}