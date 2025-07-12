const db = require("../bd")

async function getTodosLivros(){
   const [rows] = await db.query("SELECT * FROM livros")
   return rows
}


async function getLivroPorId(id){
    const [rows] = await db.query("SELECT * FROM livros WHERE id = ?", [id]); 
    return rows[0];
}

async function insereLivro(livroNovo){
    const {nome, autor, ano} = livroNovo
    const [result] = await db.query("INSERT INTO livros (nome, autor, ano) VALUES (?,?,?)", [nome, autor, ano]) 
    return {id: result.insertId, ...livroNovo}
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
    getLivroPorId,
    insereLivro,
    modificaLivro,
    deleteLivro
}