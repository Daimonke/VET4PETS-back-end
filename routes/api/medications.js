import con from "../../dbCon.js";
import express from "express";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const [rows] = await con.query(`SELECT * FROM medications`)
        res.send(rows)
    } catch (err) {
        res.send({ msg: err })
    }
})
router.post('/', async (req, res) => {
    const b = req.body
    try {
        const [rows] = await con.query(`
            INSERT INTO medications
            (medication, description)
            VALUES(?, ?)
            `, [b.name, b.description])
        rows.msg ? res.status(400).send(rows.msg) : res.status(200).send({ msg: 'Medication added' })
    } catch (err) {
        res.send({ msg: err })
    }
})

export { router as medicationsRouter }