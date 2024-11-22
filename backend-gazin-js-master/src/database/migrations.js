import { openDb } from "../config/configDB.js";

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

export async function createTableDesenvolvedores() {
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

export async function runMigrations() {
  await createTableNivel();
  await createTableDesenvolvedores();
  console.log("Migrations executadas com sucesso!");
}