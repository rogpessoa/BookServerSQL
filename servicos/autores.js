const db = require("../bd")

async function getTodosAutores(){
    const [rows] = await db.query("SELECT * FROM autor")
    return rows
}


async function getAutorPorId(id){
    const [rows] = await db.query("SELECT * FROM autor WHERE id = ?", [id]); 
    return rows[0];
}

async function insereAutor(AutorNovo){
    const {nome, nacionalidade} = AutorNovo
    const [result] = await db.query("INSERT INTO autor (nome, nacionalidade) VALUES (?,?)", [nome, nacionalidade]) 
    return {id: result.insertId, ...AutorNovo}
}  
   

async function deleteAutor(id) {
    await db.query("DELETE FROM autor WHERE id = ?", [id])    
}


module.exports = {
    getTodosAutores,
    getAutorPorId,
    insereAutor,
    deleteAutor
}