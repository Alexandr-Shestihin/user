function validate(rosterName, rosterCountry) {
  // we are going to store errors for all fields
  // in a signle array
  const errors = [];

  if (rosterName.length === 0) {
    errors.push("Name can't be empty");
  }

  if (rosterCountry.length === 0) {
    errors.push("Password should be at least 6 characters long");
  }

  return errors;
}
export default validate;
