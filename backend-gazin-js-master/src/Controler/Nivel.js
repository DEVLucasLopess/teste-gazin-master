import { openDb } from "../configDB.js";

export async function selectNiveis(req, res) {
  const filter = req.query.nivel || "";
  const pagina = req.query.pagina || 1; 
  const limite = req.query.limite || 10; 
  const offset = (pagina - 1) * limite; 
  let data = [];
  let qtd = '';

  if (filter) {
    data = await openDb().then((db) =>
      db.all("SELECT * FROM Nivel WHERE nome LIKE ? LIMIT ? OFFSET ?", [
        `%${filter}%`,
        limite,
        offset,
      ])
    );
    qtd = await openDb().then((db) =>
      db.get("SELECT COUNT(*) as qtd FROM Nivel WHERE nome LIKE ?", [`%${filter}%`])
    );
  } else {
    data = await openDb().then((db) =>
      db.all("SELECT * FROM Nivel LIMIT ? OFFSET ?", [limite, offset])
    );

    qtd = await openDb().then((db) =>
      db.get("SELECT COUNT(*) as qtd FROM Nivel")
    );
  }
  const total = qtd.qtd;
  res.json({
    pagina,
    limite,
    total,
    statusCode: 200,
    paginas: Math.ceil(total / limite),
    data, 
  });
}

export async function selectNivel(req, res) {
  let id = req.params.id;
  openDb().then((db) => {
    db.get("SELECT * FROM Nivel WHERE id=?", [id]).then((nivel) =>
      res.json(nivel)
    );
  });
}

export async function insertNivel(req, res) {
  const { nome } = req.body;

  try {
    const db = await openDb();
    const result = await db.run("INSERT INTO Nivel (nome) VALUES (?)", [nome]);

    if (result.changes > 0) {
      res.status(201).json({
        statusCode: 201,
        message: "Nível inserido com sucesso",
        id: result.lastID,
      });
    } else {
      res.status(400).json({
        statusCode: 404,
        message: "Falha ao inserir nível",
      });
    }
  } catch (error) {
    res.status(500).json({
      statusCode: 404,
      message: "Erro ao inserir nível",
      error: error.message,
    });
  }
}


export async function updateNivel(req, res) {
  const { id } = req.params;
  const { nome } = req.body;

  try {
    const db = await openDb();
    const result = await db.run("UPDATE Nivel SET nome = ? WHERE id = ?", [nome, id]);
    if (result.changes > 0) {
      res.status(200).json({
        statusCode: 200,
        message: "Nível atualizado com sucesso",
      });
    } else {
      res.status(404).json({
        statusCode: 404,
        message: "Nível não encontrado",
      });
    }
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "Erro ao atualizar nível",
      error: error.message,
    });
  }
}

export async function deleteNivel(req, res) {
  let id = req.params.id;

  try {
    const db = await openDb();
    const result = await db.run("DELETE FROM Nivel WHERE id=?", [id]);

    if (result.changes > 0) {
      res.status(200).json({
        statusCode: 200,
        message: "Nível deletado com sucesso",
      });
    } else {
      res.status(404).json({
        statusCode: 404,
        message: "Nível não encontrado",
      });
    }
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "Erro ao deletar nível",
      error: error.message,
    });
  }
}

