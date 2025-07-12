const { getTodosLivrosFavoritos, getLivroPorIdFavoritos, deleteLivroFavorito, insereLivroFavorito } = require("../servicos/favorito")


async function getLivrosFavoritos(req, res) { //req = requisiçao res = response
    try{
        const livros = await getTodosLivrosFavoritos()
        res.send(livros)      
    } catch(error){
        res.status(500)
        res.send(error.message)
    }
    
}

async function getLivroFavorito(req, res) { //req = requisiçao res = response
    try{

        const id = req.params.id
        if (id && Number(id)){
            const livros = await getLivroPorIdFavoritos(id)
            res.send(livros)
        } else{
            res.status(422)
            res.send("ID invalido!")
        }
             
    } catch(error){
        res.status(500)
        res.send(error.message)
    }
    
}

async function postLivroFavorito(req, res){
    try{
        const livroNovo = req.body
        if (req.body.nome){
            const livroCriado = await insereLivroFavorito(livroNovo)         
            res.status(201)
            res.send(livroCriado)
        }else{
            res.status(422)
            res.send("O campo é obrigatório")
}
    }catch(error){
        res.send(500)
        res.send(error.message)
    }
}



async function delLivroFavorito(req, res){
    try{
        const id = req.params.id      
        if (id && Number(id)){
            await deleteLivroFavorito(id)
            res.send("Livro favorito deletado com sucesso")
        }else{
            res.status(422)
            res.send("ID invalido")
        }
        

    }catch(error){
        res.status(500)
        res.send(error.message)
    }
}

module.exports = {
    getLivrosFavoritos,
    getLivroFavorito,
    postLivroFavorito,
    delLivroFavorito

}

