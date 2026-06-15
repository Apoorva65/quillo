import {DatabaseSync} from 'node:sqlite'

const db = new DatabaseSync('blog.db')

db.exec(`CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email STRING UNIQUE NOT NULL,
    username STRING NOT NULL,
    password STRING NOT NULL
    )`)

db.exec(`CREATE TABLE IF NOT EXISTS posts(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title STRING NOT NULL,
    image STRING,
    content STRING,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE 
    )`)

export default db;