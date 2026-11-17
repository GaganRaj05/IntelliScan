const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const AI_SERVICE_URL = process.env.AI_SERVICE_URL;
async function handleFileUpload(req, res) {
    try {
        if(!req.file) return res.status(400).json("No image uploaded");
        const formData = new FormData();
        formData.append('file',fs.createReadStream(req.file.path));
        let response = ""
        try {
            response = await axios.post(`${AI_SERVICE_URL}/predict`,formData, {
            headers:formData.getHeaders()
        });
        }
        catch(err) {
            console.log(err.message);
            return res.status(501).json("Model Service Error");
        }
        fs.unlinkSync(req.file.path);
        return res.status(200).json(response.data);
    }
    catch(err) {
        console.log(err.message);
        return res.status(501).json("Some error occured please try again later");
    }
}
module.exports = handleFileUpload;