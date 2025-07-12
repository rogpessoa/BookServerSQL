const express = require("express")
const app = express()
const port = 8000
const rotaLivro = require("./rotas/livro")
const rotaFavorito = require("./rotas/favorito")
app.use(express.json())
const cors = require("cors")

app.use("/livros", rotaLivro)
app.use("/favoritos", rotaFavorito)
app.use(cors({origin: "*"}))
app.listen(port, () =>{
    console.log(`Escutando a porta ${port}`)
})


