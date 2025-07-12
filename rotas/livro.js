const { getLivros, getLivro, postLivro, patchLivro, delLivro} = require("../controladores/livro")
const { Router } = require("express")
const router = Router()

router.get("/", getLivros)

router.get("/:id", getLivro) //consulta livros por id

router.post("/", postLivro)

router.patch("/:id", patchLivro) //importa do controlador

router.delete("/:id", delLivro)


module.exports = router