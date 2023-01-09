export function isFieldEmptyAndLength(value: string) {
  if (!value.length) return "This field is required";
  if (value.length < 2) return "min 2 characters";
  return "";
}
