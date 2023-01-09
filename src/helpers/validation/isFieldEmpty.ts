export function isFieldEmpty(value: string) {
   return !value ? 'This field is required' : '';
}