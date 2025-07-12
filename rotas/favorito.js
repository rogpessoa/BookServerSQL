const { getLivrosFavoritos, getLivroFavorito, postLivroFavorito, delLivroFavorito } = require("../controladores/favorito")
const { Router } = require("express")
const router = Router()

router.get("/", getLivrosFavoritos)

router.get("/:id", getLivroFavorito) //consulta livros por id

router.post("/", postLivroFavorito)

router.delete("/:id", delLivroFavorito)


module.exports = router