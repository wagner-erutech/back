const {Validator} = require('jsonschema')
const validator = new Validator()

const candidatoSchema = {    
    type: "object",
    properties: {
      id: {type: 'string'},
      cpf: {type: 'number'},
      first_name: {type: 'string'},
      last_name: {type: 'string'},
      age: {type: 'number', minimum :18},
      phone: {type:'string'},
      graduation:{type:'string'},
      time_experience: {type:'string'},
      residence: {type:'string'}
    },
    "required": ['cpf','first_name','first_name','age','phone','graduation','time_experience','residence']
  }

  const validateDataCandidato = (e)=>{
    return validator.validate(e,candidatoSchema)
  }

  module.exports= {validateDataCandidato}
