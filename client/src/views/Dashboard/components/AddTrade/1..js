export default {
    action: {
      presence: { allowEmpty: false, message: 'is required' },
      length: {
        maximum: 64
      }
    }
  };  