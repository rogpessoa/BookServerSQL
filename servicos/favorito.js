const db = require("../bd")

async function getTodosLivrosFavoritos(){
    const [rows] = await db.query("SELECT * FROM favoritos")
    return rows
}


async function getLivroPorIdFavoritos(id){
    const [rows] = await db.query("SELECT * FROM favoritos WHERE id = ?", [id]); 
    return rows[0];
}

async function insereLivroFavorito(livroNovo){
    const {nome, autor, ano} = livroNovo
    const [result] = await db.query("INSERT INTO favoritos (nome, autor, ano) VALUES (?,?,?)", [nome, autor, ano]) 
    return {id: result.insertId, ...livroNovo}
}  
   

async function deleteLivroFavorito(id) {
    await db.query("DELETE FROM favoritos WHERE id = ?", [id])    
}


module.exports = {
    getTodosLivrosFavoritos,
    getLivroPorIdFavoritos,
    insereLivroFavorito,
    deleteLivroFavorito
}