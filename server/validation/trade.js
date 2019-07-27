const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateTradeInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.stock = !isEmpty(data.stock) ? data.stock : "";
  data.action = !isEmpty(data.action) ? data.action : "";

  // Stock checks
  if (Validator.isEmpty(data.stock)) {
    errors.stock = "stock field is required";
  } 


  // Action checks
  if (Validator.isEmpty(data.action)) {
    errors.action = "Action field is required";
  } 
  

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
