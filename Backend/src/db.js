import {DatabaseSync} from 'node:sqlite'

const db = new DatabaseSync('blog.db')

db.exec(`CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email STRING UNIQUE NOT NULL,
    username STRING NOT NULL,
    password STRING NOT NULL
    )`)

export default db;