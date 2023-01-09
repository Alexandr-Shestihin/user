export function isConfirmPasswordCorrect(newPassword: string, oldPassword: string) {
    return newPassword === oldPassword ? '' : 'ChangePassword not match';
}