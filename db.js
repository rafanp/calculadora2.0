const sqlite3 = require('sqlite3').verbose() //verbose trás mensagens ao terminal
const db = new sqlite3.Database('./ws.db')

db.serialize(function () {

    // CRIAR A TABELA
    db.run(` 
        CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
        );
    `)

    
/* 
    // INSERIR DADOS NA TABELA

    const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES (?,?,?,?,?);
    `

    const values = [
        "https://image.flaticon.com/icons/svg/2731/2731308.svg",
        "Cursos de Programação",
        "Estudos",
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere minus aliquid commodi vitae recusandae asperiores nihil assumenda cumque",
        "http://www.google.com.br"
    ]

    db.run(query, values, function(err) {
        if (err) return console.log(err)

        console.log(this)
    })  */


    // DELETAR DADOS DA TABELA

/*     db.run(`DELETE FROM ideas WHERE id = ?`, [2], function(err){
        if (err) return console.log(err)
        console.log("DELETEI",this)
    }) */



    // CONSULTAR DADOS DA TABELA

/*      db.all(` SELECT * FROM ideas `, function(err,rows) {
        if (err) return console.log(err)
        console.log(rows)
    }) */
 




})


module.exports = db