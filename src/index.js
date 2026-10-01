const express = require("express");
const pool = require("../db/db.js");
const app = express();
app.use(express.json());
app.use(express.static("public"));

app.get("/objetos", (req, res) => {
  pool.query(`SELECT * FROM objetos`, (error, result) => {
    if (error) {
      return res.status(500).json({ messsage: "error no servidor" });
    }
    res.status(200).json(result);
  });
});

app.get("/objetos/:id", (req, res) => {
  const { id } = req.params;
  pool.query(`SELECT * FROM objetos WHERE id = ?`, [id], (error, result) => {
    if (error) {
      return res.status(500).json(error);
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "nao encontrado" });
    }
    res.status(200).json(result);
  });
});

app.get("/objetos/busca/:nome", (req, res) => {
  const { nome } = req.params;

  pool.query(
    `SELECT * FROM objetos WHERE nome LIKE  ? `,
    [`%${nome}%`],
    (error, result) => {
      if (error) {
        return res.status(500).json(error);
      }
      res.status(200).json(result);
    },
  );
});

app.post('/objetos', (req,res) => {
  const {nome,descricao,categoria,local,data_ocorrencia,status} = req.body

  if(!nome || !descricao || !categoria || !local || !data_ocorrencia || !status ){
    return res.status(400).json({message:'dados incompletos!'})
  }

  pool.query('INSERT INTO objetos (nome,descricao,categoria,local,data_ocorrencia,status) VALUES (?,?,?,?,?,?)', [nome,descricao,categoria,local,data_ocorrencia,status], (err) => {
    if(err){
      return res.status(500).json(err)
    }
    res.status(201).json({message:'objeto cadastrado'})
  })
})

app.put('/objetos/:id', (req,res) => {
  const {id} = req.params
  const {nome,descricao,categoria,local,data_ocorrencia,status} = req.body

  if(!nome || !descricao || !categoria || !local || !data_ocorrencia || !status){
    return res.status(400).json({message:'dados incompletos'})
  }

  pool.query(`UPDATE objetos SET nome = ?, descricao = ?, categoria = ?, local = ?, data_ocorrencia = ?, status = ? WHERE id = ?`, [nome,descricao,categoria,local,data_ocorrencia,status, id], (err,result) =>{
    if(err){
      return res.status(500).json(err)
    }
    if(result.affectedRows === 0){
      return res.status(404).json({message:'objeto nao encontrado! '})
    }
    res.status(200).json({message:'dados atualizado!'})
  } )
})

app.delete('/objetos/:id', (req,res) => {
  const {id} = req.params
  pool.query(`DELETE FROM objetos WHERE id = ?`, [id], (error,result) => {
    if(error){
      return res.status(500).json(error)
    }
    if(result.affectedRows === 0){
      return res.status(404).json({message:'nao encontrado'})
    }
    res.status(200).json({message:'usuario deletado'})
  })
})

app.listen(3000);
