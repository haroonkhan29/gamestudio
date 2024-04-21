export default function ValidateInput(value, regex) {
    if (regex.test(value)) {
      return true;
    } else {
      return false;
    }
  }
  