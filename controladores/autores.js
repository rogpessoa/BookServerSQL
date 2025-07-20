const {getTodosAutores, getAutorPorId, insereAutor, deleteAutor} = require ("../servicos/autores.js")


async function getAutores(req, res) { //req = requisiçao res = response
    try{
        const AutoresFavoritos = await getTodosAutores()
        res.send(AutoresFavoritos)      
    } catch(error){
        res.status(500)
        res.send(error.message)
    }
    
}

async function getAutor(req, res) { //req = requisiçao res = response
    try{

        const id = req.params.id
        if (id){
          const AutoresFavoritosId = await getAutorPorId(id)
            res.send(AutoresFavoritosId)
        } else{
            res.status(422)
            res.send("ID invalido!")
        }
             
    } catch(error){
        res.status(500)
        res.send(error.message)
    }
    
}


async function postAutor(req, res){
    try{
        const AutorNovo = req.body
        if (req.body.nome){
            await insereAutor(AutorNovo)
            res.status(201)
            res.send("Autor inserido com sucesso")
        }else{
            res.status(422)
            res.send("O campo é obrigatório")
}
    }catch(error){
        res.send(500)
        res.send(error.message)
    }
}


async function delAutor(req, res){
    try{
        const id = req.params.id      
        if (id){
            await deleteAutor(id)
            res.send("Autor deletado com sucesso")
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
    getAutores,
    getAutor,
    postAutor,
    delAutor
}