const { getTodosLivros, getLivroPorId, insereLivro, modificaLivro, deleteLivro} = require("../servicos/livro")

async function getLivros(req, res) { //req = requisiçao res = response
    try{
        const livros =  await getTodosLivros()
        res.send(livros)      
    } catch(error){
        res.status(500)
        res.send(error.message)
    }
    
}

async function getLivro(req, res) { //req = requisiçao res = response
    try{

        const id = req.params.id
        if (id && Number(id)){
            const livro = await getLivroPorId(id)
            if (!livro){
                return res.status(404).send("Livro não encontrado")
            }
            res.send(livro)
        } else{
            res.status(422)
            res.send("ID invalido!")
        }
             
    } catch(error){
        res.status(500)
        res.send(error.message)
    }
    
}

async function postLivro(req, res){
    try{
        const livroNovo = req.body
        
        if (req.body.nome){
            const livroCriado = await insereLivro(livroNovo)         
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


async function patchLivro(req, res){
    try{
        const id = req.params.id
        if (id && Number(id)){
            const body = req.body
            await modificaLivro(body, id) //importa a função de serviço
            res.send("Item modificado com sucesso")
        } else{
            res.send(422)
            res.send("ID invalido")
        }      
    }catch(error){
        res.status(500)
        res.send(error.message)
    }
}

async function delLivro(req, res){
    try{
        const id = req.params.id      
        if (id && Number(id)){
            await deleteLivro(id)
            res.send("Livro deletado com sucesso")
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
    getLivros,
    getLivro,
    postLivro,
    patchLivro,
    delLivro

}

