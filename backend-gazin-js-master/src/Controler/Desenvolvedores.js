import { openDb } from "../configDB.js";

// Query que usei pra criar a tabela!
export async function createTable() {
  openDb().then((db) => {
    db.exec(`
            CREATE TABLE IF NOT EXISTS Desenvolvedores (
                id INTEGER PRIMARY KEY,
                nome TEXT NOT NULL,
                sexo TEXT NOT NULL,
                data_nascimento TEXT NOT NULL,
                idade INTEGER NOT NULL,
                hobby TEXT NOT NULL,
                nivel_id INTEGER,
                FOREIGN KEY (nivel_id) REFERENCES Nivel(id)
            )
        `);
  });
}

export async function selectDesenvolvedores(req, res) {
  const filter = req.query.nivel || "";
  const pagina = req.query.pagina || 1;
  const limite = req.query.limite || 10;
  const offset = (pagina - 1) * limite;
  let data = [];
  let qtd = '';

  if (filter) {
    data = await openDb().then((db) =>
      db.all(
      `SELECT 
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
    WHERE d.nome LIKE ? LIMIT ? OFFSET ?`, [`%${filter}%`, limite, offset]));

    qtd = await openDb().then((db) =>
      db.get("SELECT COUNT(*) as qtd FROM Desenvolvedores WHERE nome LIKE ?", [
        filter,
      ])
    );
  } else {
    data = await openDb().then((db) =>
      db.all(
      `SELECT 
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
      )
    );

    qtd = await openDb().then((db) =>
      db.get("SELECT COUNT(*) as qtd FROM Desenvolvedores")
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
          res.status(500).json({ error: "Erro ao buscar desenvolvedor" });
        });
    })
    .catch((err) => {
      console.error("Erro ao abrir banco de dados:", err);
      res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
    });
}

export async function insertDesenvolvedor(req, res) {
  let desenvolvedor = req.body;
  openDb().then((db) => {
    db.run(
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
        desenvolvedor.nivelId,
      ]
    );
  });
  res.json({ statusCode: 200 });
}

export async function updateDesenvolvedor(req, res) {
  let desenvolvedor = req.body;
  openDb().then((db) => {
    db.run(
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
  });
  res.json({
    statusCode: 200,
    message: "Desenvolvedor atualizado com sucesso",
  });
}

export async function deleteDesenvolvedor(req, res) {
  let id = req.params.id;
  openDb().then((db) => {
    db.run("DELETE FROM Desenvolvedores WHERE id = ?", [id], function (err) {
      if (err) {
        console.error("Erro ao deletar o desenvolvedor:", err);
        return res
          .status(500)
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
