import con from "../../dbCon.js";
import express from "express";

const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const [rows] = await con.query(`
        SELECT prescriptions.*,
        pets.name, pets.dob, pets.client_email, pets.archived,
        medications.medicament, medications.description
        FROM prescriptions
        JOIN pets ON pets.id = prescriptions.pet_id
        JOIN medications ON medications.id = prescriptions.medication_id
        WHERE prescriptions.pet_id = ?
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
            INSERT INTO prescriptions
            (medication_id, pet_id, comment, timestamp)
            VALUES(?, ?, ?, ?)
            `, [b.medication_id, b.pet_id, b.comment, new Date().toLocaleString('LT')])
        rows.msg ? res.status(400).send(rows.msg) : res.status(200).send({ msg: 'Prescription added'})
    } catch (err) {
        res.send({ msg: err })
    }
})

export { router as prescriptionsRouter }