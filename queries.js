
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'storageboxv3',
  password: 'elreys13',
  port: 5432,
})

const getUsers = (req, res) =>{
    pool.query('SELECT * FROM users ORDER BY ID ASC', (error, result) =>{
        if(error) {throw error}
        res.status(200).json(result.rows);
    })
};

const getUserById = (req, res) =>{
    const id = parseInt(req.params.id);
    pool.query('SELECT * FROM users WHERE id = $1',[id], (error,result)=>{
        if(error) {throw error}
        res.status(200).json(result.rows);
    })
};

const createUser = (req, res) =>{
    const {name, email} = req.body;
    pool.query('INSERT INTO users(name, email) VALUES ($1,$2) RETURNING *', [name,email],(error,result) =>{
        if(error) {throw error}
        res.status(201).send(`User added with ID: ${result.insertId}`)
    })
};

const updateUser = (req, res) =>{
    const id = parseInt(req.params.id);
    const {name, email} = req.body;

    pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id],
        (error, result) =>{
            if(error) {throw error}
            res.status(200).send(`User modified with the id of: ${id}`);
        }
    )

};

const deleteUser = (req, res) =>{
    const id = parseInt(req.params.id);
    pool.query('DELETE FROM users WHERE id = $1', [id] , (error, result)=>{
        if(error) {throw error}
        res.status(200).send(`The user with the id: ${id} was sucessfully deleted`);
    })
};


module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
