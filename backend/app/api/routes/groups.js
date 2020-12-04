const express = require('express')
const router = express.Router()

// Come evitare che chi non fa parte del gruppo non possa vedere i messaggi?

router.get('/:id', (req, res, next) => {
    const id = req.params.id

    res.status(200).json({
        message: 'Che gruppo?',
        id: id
    })
})

router.get('/:groupId', (req, res, next) => {
    if(req.userData) {
        
    }
    else myutils.message(res, 500, 'login first')
})

module.exports = router;