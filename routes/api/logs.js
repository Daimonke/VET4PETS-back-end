import con from "../../dbCon.js";
import express from "express";

const router = express.Router();

router.get('/:id?', async (req, res) => {
    try {
        const [rows] = await con.query(`
        SELECT logs.*, pets.name, pets.dob, pets.client_email, pets.archived FROM logs
        JOIN pets ON pets.id = logs.pet_id
        ORDER BY logs.id
        ${req.params.id ? `WHERE pets.id = ?` : ''}
        `, [req.params.id])
        res.send(rows)
    } catch (err) {
        res.send({ msg: err })
    }
})
router.post('/', async (req, res) => {
    const b = req.body
    try {
        const [rows] = await con.query(`
            INSERT INTO logs
            (pet_id, description, status)
            VALUES(?, ?, ?)
            `, [b.pet_id, b.description, b.status])
        rows.msg ? res.status(400).send(rows.msg) : res.status(200).send({ msg: 'Log added'})
    } catch (err) {
        res.send({ msg: err })
    }
})

export { router as logsRouter }