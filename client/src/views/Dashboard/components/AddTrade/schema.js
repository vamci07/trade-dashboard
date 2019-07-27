export default {
    action: {
      presence: { allowEmpty: false, message: 'is required' },
      length: {
        maximum: 64
      }
    },
    stockquantity: {
      presence: { allowEmpty: false, message: 'is required' },
      length: {
        maximum: 64
      }
    }
  }; 