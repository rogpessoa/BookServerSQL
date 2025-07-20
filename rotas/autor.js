const {getAutores, getAutor, postAutor, delAutor} = require ("../controladores/autores")
const { Router } = require("express")
const router = Router()

router.get("/", getAutores)

router.get("/:id", getAutor) //consulta livros por id

router.post("/", postAutor)

router.delete("/:id", delAutor)


module.exports = router