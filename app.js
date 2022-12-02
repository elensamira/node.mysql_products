const express = require("express");

const Produtos = require('./models/Products');
const app  = express();

app.use(express.json());



app.get("/Products", async (req, res) => {

    await Produtos.findAll({
        attributes: ['id', 'name', 'price'],
        order: [['id', 'DESC']]}).then((Produtos) =>{
        return res.json({
            erro: false,
            products: Produtos
        });
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Produto não encontrado"
        });
    });

    
});


app.get("/Product/:id", async (req, res) => {
    const { id } = req.params;
   
    await Produtos.findByPk(id)
    .then((Produtos) =>{
        return res.json({
            erro: false,
            Produtos
        });
    }).catch(() =>{
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Produto não encontrado!"
        });
    });
   
});


app.post("/Product", async (req, res) => {
    const { name, price } = req.body;
    

    await Produtos.create(req.body).then(() => {
        return res.json({
            
            erro: false,
            mensagem: "Produto cadastrado com sucesso"
        });
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Produto não cadastrado com sucesso"
        });
    });    
});



app.put("/Product", async (req, res) => {
    const { id } = req.body;
    await Produtos.update(req.body, {where: {id: id}})
    .then(() =>{
        return res.json({
            erro: false,
            mensagem: "Produto editado com sucesso"
        });
    }).catch(() =>{
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Produto não editado com sucesso"
        });
    })
    
});


app.delete("/Product/:id", async (req, res) => {
    const { id } = req.params;

    await Produtos.destroy({where: {id}})
    .then(()=> {
        return res.json({
            erro: false,
            mensagem: "Produto apagado com sucesso"
        });
    }).catch(()=>{
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Produto não apagado com sucesso"
        });
    })
   
});


app.listen(8081, () =>{
    console.log("Servidor iniciado na porta 8080: http://localhost:8081 ")
});