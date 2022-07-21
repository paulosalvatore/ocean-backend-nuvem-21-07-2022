const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const url = "mongodb://localhost:27017";
const dbName = "ocean_bancodados_19_07_2022";

async function main() {
  /*
  console.log("Conectando ao banco de dados...");

  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  const collection = db.collection("herois");

  console.log("Banco de dados conectado com sucesso!");
  */

  // Aplicação Backend com Express

  const app = express();

  // Registrar que estamos usando JSON no Body
  // da requisição
  app.use(express.json());

  app.get("/", function (req, res) {
    res.send("Hello World");
  });

  // /oi -> "Olá, mundo"
  app.get("/oi", function (req, res) {
    res.send("Olá, mundo");
  });

  // Endpoints de Heróis

  const herois = ["Mulher Maravilha", "Capitã Marvel", "Homem de Ferro"];
  //               0                   1                2

  // [GET] /herois -> Read All (Ler tudo)
  app.get("/herois", async function (req, res) {
    const documentos = await collection.find().toArray();

    res.send(documentos);
  });

  // [GET] /herois/:id -> Read by ID (Ler pelo ID)
  app.get("/herois/:id", async function (req, res) {
    // Pegamos o ID pela rota
    const id = req.params.id;

    // Acessar o registro na collection, usando o ID
    const item = await collection.findOne({ _id: new ObjectId(id) });

    // Enviar o registro encontrado
    res.send(item);
  });

  // [POST] /herois -> Create (Criar)
  app.post("/herois", async function (req, res) {
    // console.log(req.body);

    // Acessamos o valor que foi enviado na request
    const item = req.body;

    // Insere esse valor na collection
    await collection.insertOne(item);

    // Exibe uma mensagem de sucesso
    res.send(item);
  });

  // [PUT] /herois/:id -> Update (Atualizar)
  app.put("/herois/:id", function (req, res) {
    // Pegar o ID
    const id = req.params.id;

    // Pegar o item a ser atualizado
    const item = req.body;

    // Atualizar na collection o valor recebido
    collection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: item,
      }
    );

    // Envio uma mensagem de sucesso
    res.send(item);
  });

  // [DELETE] /herois/:id -> Delete (Remover)
  app.delete("/herois/:id", async function (req, res) {
    // Pegar o ID
    const id = req.params.id;

    // Remove o item da lista
    await collection.deleteOne({ _id: new ObjectId(id) });

    // Exibimos uma mensagem de sucesso
    res.send("Item removido com sucesso!");
  });

  app.listen(process.env.PORT || 3000, function () {
    console.log("Aplicação rodando em http://localhost:3000");
  });
}

main();
