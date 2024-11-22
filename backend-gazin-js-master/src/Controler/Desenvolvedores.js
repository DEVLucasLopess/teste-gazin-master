import { openDb } from "../configDB.js";

export async function selectDesenvolvedores(req, res) {
  const filter = req.query.nivel || "";
  const pagina = parseInt(req.query.pagina) || 1;
  const limite = parseInt(req.query.limite) || 10;
  const offset = (pagina - 1) * limite;

  try {
    const db = await openDb();

    let data = [];
    let qtd;

    if (filter) {
      data = await db.all(
        `
        SELECT 
          d.id, 
          d.nome, 
          d.sexo, 
          d.data_nascimento, 
          d.idade, 
          d.hobby, 
          n.id AS nivel_id, 
          n.nome AS nivel
        FROM Desenvolvedores d
        LEFT JOIN Nivel n ON d.nivel_id = n.id
        WHERE d.nome LIKE ? 
        LIMIT ? OFFSET ?
        `,
        [`%${filter}%`, limite, offset]
      );

      qtd = await db.get(
        "SELECT COUNT(*) as qtd FROM Desenvolvedores WHERE nome LIKE ?",
        [`%${filter}%`]
      );
    } else {
      data = await db.all(
        `
        SELECT 
          d.id, 
          d.nome, 
          d.sexo, 
          d.data_nascimento, 
          d.idade, 
          d.hobby, 
          n.id AS nivel_id, 
          n.nome AS nivel
        FROM Desenvolvedores d
        LEFT JOIN Nivel n ON d.nivel_id = n.id
        LIMIT ? OFFSET ?
        `,
        [limite, offset]
      );

      qtd = await db.get("SELECT COUNT(*) as qtd FROM Desenvolvedores");
    }

    const total = qtd.qtd;

    res.status(200).json({
      pagina,
      limite,
      total,
      statusCode: 200,
      paginas: Math.ceil(total / limite),
      data,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 404,
      message: "Erro ao buscar desenvolvedores",
      error: error.message,
    });
  }
}

export async function selectDesenvolvedor(req, res) {
  let id = req.params.id;
  openDb()
    .then((db) => {
      db.get(
        `
        SELECT 
          d.id, 
          d.nome, 
          d.sexo, 
          d.data_nascimento, 
          d.idade, 
          d.hobby, 
          n.id AS nivel_id, 
          n.nome AS nivel
        FROM Desenvolvedores d
        LEFT JOIN Nivel n ON d.nivel_id = n.id
        WHERE d.id = ?
      `,
        [id]
      )
        .then((desenvolvedor) => {
          if (desenvolvedor) {
            res.json(desenvolvedor);
          } else {
            res.status(404).json({ error: "Desenvolvedor não encontrado" });
          }
        })
        .catch((err) => {
          console.error("Erro ao executar consulta:", err);
          res.status(404).json({ error: "Erro ao buscar desenvolvedor" });
        });
    })
    .catch((err) => {
      console.error("Erro ao abrir banco de dados:", err);
      res.status(404).json({ error: "Erro ao conectar ao banco de dados" });
    });
}

export async function insertDesenvolvedor(req, res) {
  let desenvolvedor = req.body;
  try {
    const db = await openDb();
    const result = await db.run(
      `
      INSERT INTO Desenvolvedores (nome, sexo, data_nascimento, idade, hobby, nivel_id) 
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        desenvolvedor.nome,
        desenvolvedor.sexo,
        desenvolvedor.data_nascimento,
        desenvolvedor.idade,
        desenvolvedor.hobby,
        desenvolvedor.nivel_id,
      ]
    );

    if (result.changes > 0) {
      res.status(201).json({
        statusCode: 201,
        message: "Desenvolvedor inserido com sucesso",
      });
    } else {
      res.status(400).json({
        statusCode: 404,
        message: "Falha ao inserir desenvolvedor",
      });
    }
  } catch (error) {
    res.status(500).json({
      statusCode: 404,
      message: "Erro ao inserir desenvolvedor",
      error: error.message,
    });
  }
}


export async function updateDesenvolvedor(req, res) {
  let desenvolvedor = req.body;
  try {
    const db = await openDb();
    const result = await db.run(
      "UPDATE Desenvolvedores SET nome=?, sexo=?, data_nascimento=?, idade=?, hobby=?, nivel_id=? WHERE id=?",
      [
        desenvolvedor.nome,
        desenvolvedor.sexo,
        desenvolvedor.data_nascimento,
        desenvolvedor.idade,
        desenvolvedor.hobby,
        desenvolvedor.nivel_id,
        desenvolvedor.id,
      ]
    );

    if (result.changes === 0) {
      return res.status(404).json({
        statusCode: 404,
        message: "Desenvolvedor não encontrado",
      });
    }

    res.status(200).json({
      statusCode: 200,
      message: "Desenvolvedor atualizado com sucesso",
    });
  } catch (error) {
    res.status(404).json({
      statusCode: 404,
      message: "Erro ao atualizar desenvolvedor",
      error: error.message,
    });
  }
}

export async function deleteDesenvolvedor(req, res) {
  let id = req.params.id;
  openDb().then((db) => {
    db.run("DELETE FROM Desenvolvedores WHERE id = ?", [id], function (err) {
      if (err) {
        console.error("Erro ao deletar o desenvolvedor:", err);
        return res
          .status(404)
          .json({ error: "Erro ao deletar o desenvolvedor" });
      }
      res.json({
        statusCode: 200,
        message: `Desenvolvedor com ID ${id} deletado com sucesso`,
      });
    });
    res.json({
      statusCode: 200,
    });
  });
}
