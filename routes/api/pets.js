import con from "../../dbCon.js";
import express from "express";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const [rows] = await con.query(`
            SELECT * FROM pets 
            WHERE archived = 0
            `)
        res.send(rows)
    } catch (err) {
        res.send({ msg: err })
    }
})
router.post('/', async (req, res) => {
    const b = req.body
    try {
        const [rows] = await con.query(`
            INSERT INTO pets
            (name, dob, client_email)
            VALUES(?, ?, ?)
            `, [b.name, b.dob, b.client_email])
        rows.msg ? res.status(400).send(rows.msg) : res.status(200).send({ msg: 'Pet added'})
    } catch (err) {
        res.send({ msg: err })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const [rows] = await con.query(`
        UPDATE pets
        SET archived = 1
        WHERE id = ?
        `, [req.params.id])
        rows.affectedRows > 0 ? res.status(200).send({ msg: 'Pet deleted'}) : res.status(400).send( { msg: 'Incorrect ID' } )
    } catch (err) {
        res.send({ msg: err })
    }
})

export { router as petsRouter }