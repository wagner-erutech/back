const express  = require('express')
const cors = require('cors')
const app = express()

const candidatoRoutes = require('./routes/candidatoRoutes')

const host = '127.0.0.1'
const port = 8080

app.use(cors("http://localhost:3000/candidatos"))
app.use(express.json())
app.use('/candidatos',candidatoRoutes)

app.listen(port, host,()=>{
    console.log(`Server running at http://${host}:${port}`)
})