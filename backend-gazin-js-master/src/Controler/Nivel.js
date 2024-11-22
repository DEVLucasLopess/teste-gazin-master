import { openDb } from "../configDB.js";

export async function createTableNivel() {
  openDb().then((db) => {
    db.exec(`
      CREATE TABLE IF NOT EXISTS Nivel (
        id INTEGER PRIMARY KEY,
        nome TEXT NOT NULL
      )
    `);
  });
}

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
  res.json({ statusCode: 200 });
}

export async function insertNivel(req, res) {
  let nivel = req.body;
  openDb().then((db) => {
    db.run("INSERT INTO Nivel (nome) VALUES (?)", [nivel.nome]);
  });
  res.json({ statusCode: 201 });
}

export async function updateNivel(req, res) {
  const { id } = req.params;
  const { nome } = req.body;
  openDb().then((db) => {
    db.run("UPDATE Nivel SET nome = ? WHERE id = ?", [nome, id]);
  });
  res.json({ statusCode: 200 });
}

export async function deleteNivel(req, res) {
  let id = req.params.id;
  openDb().then((db) => {
    db.run("DELETE FROM Nivel WHERE id=?", [id]);
  });
  res.json({ statusCode: 200 });
}
