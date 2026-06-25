import pg from 'pg'

const {Pool} = pg;

const pool = new Pool({
    host : 'localhost',
    database : process.env.DATABASE,
    user : process.env.USER,
    password : process.env.PASSWORD,
    port : process.env.DB_PORT
})

await pool.query(`CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL
    )`)

await pool.query(`CREATE TABLE IF NOT EXISTS posts(
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    image TEXT,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
    )`)

export default pool;