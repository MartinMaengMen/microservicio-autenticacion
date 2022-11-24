const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
const validatePassword = (password) => {
    var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return re.test(password);
  }
const validateDNI = (dni)=>{
  var re = /^[0-9]{8}$/;
  return re.test(dni)
}
const validateParameters = (email,password,dni)=>{
    if(!validateEmail(email)){
      return 'Correo no valido'
    }
    if(!validatePassword(password)){
      return 'La contraseña debe de contener al menos 6 caracteres, un número y un caracter especial'
    }
    if(!validateDNI(dni)){
      return 'DNI no valido'
    }
    return ''
}
module.exports = {validateParameters}