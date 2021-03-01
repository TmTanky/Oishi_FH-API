const express = require(`express`)
const router = express.Router()

router.get(`/oishi/api/v1`, (req, res) => {
    
    res.status(200).json({
        message: `Hello from oishi-API`
    })
})

module.exports = router