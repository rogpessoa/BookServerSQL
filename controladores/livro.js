const { getTodosLivros, getLivroPorId, insereLivro, modificaLivro, deleteLivro, listarLivrosPorAutor} = require("../servicos/livro")


async function getLivros(req, res) { //req = requisiçao res = response
    try{
        const livros =  await getTodosLivros()
        res.send(livros)      
    } catch(error){
        res.status(500)
        res.send(error.message)
    }
    
}


async function getLivrosPorAutor(req, res) {
    const nomeAutor = req.query.autor
    if(!nomeAutor){
        res.send("Nome não encontrado!")
    }
    try{
        const livrosPorAutor = await listarLivrosPorAutor(nomeAutor)
        res.status(201)
        res.send(livrosPorAutor)
    }catch(error){
        res.status(500)
        res.send("Erro ao buscar autor")
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
            res.send("Livro criado com sucesso")
        }
    }catch(error){
        res.status(500)
        res.send("ID invalido")
    }
}



async function patchLivro(req, res){
    
   
    try{   
        const id = req.params.id   
        if (id && Number (id)){
            const body = req.body
            await modificaLivro(body, id)
            res.status(201)
            res.send("Livro modificado com sucesso")
        }    
    }catch(error){
        res.status(500)
        res.send("ID invalido")
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
    getLivrosPorAutor,
    getLivro,
    postLivro,
    patchLivro,
    delLivro

}

