const axios = require('axios');
const { tenmpsController } = require('../controllers/tempsControllers');

const getAllTemps = async (req, res) => {
    try {
        const temperaments = await axios.get()
    } catch (error) {
        
    }
}

module.exports = {
    getAllTemps,
}