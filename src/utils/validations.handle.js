const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
const validateDNI = (dni)=>{
  var re = /^[0-9]{8}$/;
  return re.test(dni)
}
const validateParameters = (email,password,dni)=>{
    if(!validateEmail(email)){
      return 'Correo no valido'
    }
    if(!validateDNI(dni)){
      return 'DNI no valido'
    }
    return ''
}
module.exports = {validateParameters}