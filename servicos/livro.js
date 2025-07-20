const db = require("../bd");
const { getAutorPorId } = require("./autores");

async function getTodosLivros(){
   const [rows] = await db.query("SELECT * FROM livros")
   return rows
}


async function listarLivrosPorAutor(autor) {
    const rows = `
        SELECT 
            livros.*, 
            autor.nome AS autor_nome, 
            autor.nacionalidade
        FROM livros
        JOIN autor ON livros.autorId = autor.id
        WHERE autor.nome LIKE ?
    `;

    const [resultado] = await db.query(rows, [`%${autor}%`]);
    return resultado;
  
}

async function getLivroPorId(id){
    const [rows] = await db.query("SELECT * FROM livros WHERE id = ?", [id]); 
    return rows[0];
}

async function insereLivro(livroNovo){
    let {nome, ano, autorId} = livroNovo
    let autorCompleto = null

    if(autorId){
        const autorEncontrado = await getAutorPorId(autorId)
        if(autorEncontrado){
            autorCompleto = autorEncontrado
        }else{
            autorId = null
        }
    }
    const [result] = await db.query("INSERT INTO livros(nome, ano, autorId) VALUES (?,?,?)", [nome, ano, autorId])
    return {id:result.insertId, nome, ano, autorId}
}



async function modificaLivro(modificacoes, id){
    const campos = []
    const valores = []
    for (const [chave, valor] of Object.entries(modificacoes)){
        campos.push(`${chave} = ?`)
        valores.push(valor)
    }
    valores.push(id)
    const sql = `UPDATE livros SET ${campos.join(', ')} WHERE id = ?`
    await db.query(sql, valores)

}


async function deleteLivro(id) {
    await db.query("DELETE FROM livros WHERE id = ?", [id])
    
}


module.exports = {
    getTodosLivros,
    listarLivrosPorAutor,
    getLivroPorId,
    insereLivro,
    modificaLivro,
    deleteLivro
}