export default {
  name: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64
    }
  },
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 6,
      maximum: 30,
      message: "must be at least 6 to max 30 characters"
    }
/*,
    format: {
      pattern: "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*]).{6,30}",
      flags: "i",
      message: "must contain lowercase, uppercase, number and special charater"
    } */
  }
};
  