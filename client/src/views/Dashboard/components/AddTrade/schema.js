export default {
    stock: {
      presence: { allowEmpty: false, message: 'is required' },
      length: {
        maximum: 128
      }
    },
    action: {
      presence: { allowEmpty: false, message: 'is required' },
      length: {
        maximum: 6
      }
    },
    stockquantity: {
      presence: { allowEmpty: false, message: 'is required' },
      length: {
        maximum: 64
      },
      format: {
        pattern: "^[0-9]+",
        flags: "i",
        message: "must be numeric"
      }
    },
    startingprice: {
      presence: { allowEmpty: false, message: 'is required' },
      length: {
        maximum: 64
      },
      format: {
        pattern: "^[0-9]+(\\.[0-9]{1,2})?$",
        flags: "i",
        message: "must be numeric"
      }
    },
    stoploss: {
      presence: { allowEmpty: false, message: 'is required' },
      length: {
        maximum: 64
      },
      format: {
        pattern: "^[0-9]+(\\.[0-9]{2})?$",
        flags: "i",
        message: "must be numeric"
      }
    },
    targetprice: {
      presence: { allowEmpty: false, message: 'is required' },
      length: {
        maximum: 64
      },
      format: {
        pattern: "^[0-9]+(\\.[0-9]{2})?$",
        flags: "i",
        message: "must be numeric"
      }
    },
    reasonfortrade: {
      presence: { allowEmpty: false, message: 'is required' },
      length: {
        maximum: 128
      }
    },
    closingprice: {
      length: {
        maximum: 64
      },
      format: {
        pattern: "^$|^[0-9]+(\\.[0-9]{2})?$",
        flags: "i",
        message: "must be numeric"
      }
    }
  }; 