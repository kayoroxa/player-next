const express = require('express')
const app = express()

const videosFolder = 'M:/series' // Substitua pelo caminho da pasta onde seus vídeos estão armazenados

app.use(express.static(videosFolder))

const port = 9999 // Porta em que o servidor irá rodar
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})
