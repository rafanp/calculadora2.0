//O servidor recebe o express, 
//que é um pacote com diversas funcionalidades

//usei o express para criar e configurar meu servidor
const express = require("express") 
const server = express()

const db = require("./db") 
/* 
const ideas = [
    {
        img:"https://image.flaticon.com/icons/svg/2731/2731308.svg",
        title: "Cursos de Programação",
        category: "Estudos",
        description: " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere minus aliquid commodi vitae recusandae asperiores nihil assumenda cumque",
        url: "http://www.google.com.br"
    },

    {
        img:"https://image.flaticon.com/icons/svg/2731/2731297.svg",
        title: "Ler bons livros",
        category: "Estudo",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere minus aliquid commodi vitae recusandae asperiores nihil assumenda cumque ",
        url: ""
    },

    {
        img:"https://image.flaticon.com/icons/svg/2731/2731275.svg",
        title: "Jogar Video-Game",
        category: "Diversão",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere minus aliquid commodi vitae recusandae asperiores nihil assumenda cumque ",
        url: ""
    },

    {
        img:"https://image.flaticon.com/icons/svg/2731/2731290.svg",
        title: "Limpar a casa",
        category: "Faxina",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere minus aliquid commodi vitae recusandae asperiores nihil assumenda cumque ",
        url: ""
    },

]
 */



// configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"))


// habilitar uso do req.body
server.use(express.urlencoded({ extended: true }))


// configuração do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    
    noCache: true, //cache guarda coisas que julga ser importante
                    //para ser usado depois
                    //noCache serve para desabilita-lo
                    //bom desativa-lo enquanto está desenvolvendo
} )

//criei uma rota /
//e capturo o pedido do cliente para responder

server.get("/", function(req, res) {
    
        // CONSULTAR DADOS DA TABELA

     db.all(` SELECT * FROM ideas `, function(err,rows) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }


        const reversedIdeas = [...rows].reverse()

        let lastIdeas = []
        //dá pra tirar esse reverse para não ficar mostrando as últimas na inicial
        for (let idea of reversedIdeas){
            if ( lastIdeas.length < 3){
                lastIdeas.push(idea)
            }
        }
    
       // lastIdeas = lastIdeas.reverse() //Inverte a sequencia das ideias, e coloca as últimas por primeiro
    
    
        console.log(lastIdeas.length)
    
        return res.render("index.html", { ideas: lastIdeas}) 
    })
 

/*
    Aqui estamos criando uma nova variável chamada lastIdeas, que vai pegar as ultimas 3
    e só depois atualizar na página, para cada "idea" em "ideas", e analisará pelo if
    se a quantidade de lastIdeas é menor que 2, se forem, as jogarão pelo "push" para idea 
*/

//aqui pegará as ultimas ideias
} )


server.get("/ideias", function(req, res) {
    
    req.query

    db.all(` SELECT * FROM ideas `, function(err,rows) {
        
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }
        
        const reversedIdeas = [...rows].reverse()
        return res.render("ideias.html", { ideas: reversedIdeas})

    })    

} )


server.post("/",function(req,res){
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
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ]

    db.run(query, values, function(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }
        
        return res.redirect("/ideias")
    }) 

    
    console.log(req.body)


})

//liguei meu servidor na porta 3000
server.listen(3000)




/* server.get("/", function(req, res) {
    console.log("Cheguei")
    return res.sendFile(__dirname + "/index.html")
    //O __dirname vai automaticamente buscar o meu diretório,
    //Então estamos concatenando com o /index.html
} )

server.get("/ideias", function(req, res) {
    return res.sendFile(__dirname + "/ideias.html")
} )
 */
