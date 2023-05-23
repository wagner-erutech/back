const {v4:uuidv4} = require('uuid')
const {validateDataCandidato} = require('../model/candidatoModel')
const fs = require('fs')

//Adicionar candidato
function addCandidatosPromise(candidato){
  
  return new Promise((resolve, reject)=>{      
    
    fs.readFile('../back/model/candidatos.json', 'utf8', (err, data) => {
  
      if (err){
        
        reject(err);

      } 
      else {        
        
        let candidatos = JSON.parse(data)   
        
        if(candidatos.some(e=>e.cpf===candidato.cpf)){
          
          reject(new Error('CPF já cadastrado'))                  
        }

        const id = uuidv4()         
        const candidatoNew = { id, ...candidato }  
        
        candidatos.push(candidatoNew)  
        
        fs.writeFile('../back/model/candidatos.json', JSON.stringify(candidatos), (err) => {
          
          if (err) {
            reject(err);
          } else {
            resolve(candidatoNew);
          }
        })
      }
    })
  })
}

const addCandidatos = (req,res)=>{
  
  const candidato = req.body
  const validResult = validateDataCandidato(candidato)
  
  if(!validResult.valid){

      return res.status(400).json({message:'Dados do candidato invalidos', errors : validResult.errors})
    }    

    addCandidatosPromise(candidato)
    .then(candidatoNew => res.status(200).json(candidatoNew))
    .catch(err => res.status(500).send(err.message))
}  

//Editar Candidatos
function updateCandidatosPromise(id,candidato) 
{
  return new Promise((resolve, reject)=>{      
    
    fs.readFile('../back/model/candidatos.json', 'utf8', (err, data) => {
      
      if (err){
        
        reject(err)
      } else {
        
        let candidatos = JSON.parse(data)  
        
        const index = candidatos.findIndex((e) => e.id === id)

        if (index === -1){
          
          reject(new Error('Candidatos não encontrado'))
        } 
        else 
        {
          
          const candidatoUpdate = { ...candidatos[index], ...candidato, email: candidatos[index].email }  
          
          candidatos[index] = candidatoUpdate  
          
          fs.writeFile('../back/model/candidatos.json', JSON.stringify(candidatos), (err) => {
            if (err) {
              reject(err)
            } else {
              resolve(candidatoUpdate)
            }
          })
        }
      }
    })
  })
}
  
const updateCandidatos = (req,res) =>{
  const id = req.params.id
  const candidato = req.body
  updateCandidatosPromise(id,candidato) 
  .then(candidatoUpdate => res.status(200).json(candidatoUpdate))
  .catch(err => res.status(500).send(err.message))
}

//Listar Candidatos
function getCandidatosPromise()
{
    return new Promise((resolve, reject) => {        
        fs.readFile('../back/model/candidatos.json', 'utf8', (err, data) => {
          if (err) {
            reject(err)
          } 
          else {            
            let candidatos = JSON.parse(data)            
            resolve(candidatos)
          }
        })
    })
}
const getCandidatos = (req,res)=>{
  getCandidatosPromise()
  .then(candidatos => res.status(200).json(candidatos))
  .catch(err => res.status(500).send(err.message));
}  

//Deletar Candidatos
function removeCandidatosPromise(id) 
{
  return new Promise((resolve, reject) => {
    fs.readFile('../back/model/candidatos.json', 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } 
      else {
        
          const candidatos = JSON.parse(data)
          
          const index = candidatos.findIndex(e => e.id === id)

          if (index === -1) {
            reject(new Error('Candidatos não encontrado'))
          } 
          else {
            
            candidatos.splice(index, 1)
            
            fs.writeFile('../back/model/candidatos.json', JSON.stringify(candidatos), err => {
              if (err) {
                reject(err)
              } else {
                resolve()
              }
            })
          }       
      }
    })
  })
}

const removeCandidatos = (req,res)=>{      
    const id = req.params.id
    removeCandidatosPromise(id)
    .then(() => res.status(200).json({message:'Candidato deletado'}))
    .catch(err => res.status(500).send(err.message))
}


module.exports = {addCandidatos,updateCandidatos,getCandidatos,removeCandidatos}