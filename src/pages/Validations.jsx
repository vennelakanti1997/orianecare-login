import validator from 'validator';
export default function validatePhonenumber(inputtxt) {
    return /\d{10}/.test(inputtxt)&& inputtxt.length===10;
  }
export function validateName(inputtxt){
  return /^(?![. ])[a-zA-Z. ]+(?<! )$/.test(inputtxt)
}

export function validateEmail(inputtxt){
  
  return validator.isEmail(inputtxt,{blacklisted_chars:'` |',allow_utf8_local_part:false})
}
export function validateRegistrationNumber(inputtxt){
  return validator.isAlphanumeric(inputtxt)
}