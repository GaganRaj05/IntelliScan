const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const AI_SERVICE_URL = process.env.AI_SERVICE_URL;
async function handleFileUpload(req, res) {
    try {
        if(!req.file) return res.status(400).json("No image uploaded");
        const formData = new FormData();
        formData.append('file',fs.createReadStream(req.file.path));

        const response = await axios.post(`${AI_SERVICE_URL}/predict`,formData, {
            headers:formData.getHeaders()
        });
        fs.unlinkSync(req.file.path);
        return res.json(response.data.class);
    }
    catch(err) {
        console.log(err.message);
        return res.status(501).json("Some error occured please try again later");
    }
}
module.exports = handleFileUpload;