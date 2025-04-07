const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
async function uploadFile(formData) {
    try {
        const response = await fetch(`${BACKEND_URL}/features/predict-tumor`,{
            method:"POST",
            body:formData,
            credentials:'include'
        })
        const data = await response.json();
        if(!response.ok) return {error:data};
        return data;
    }
    catch(err) {
        console.log(err.message);
        return {error:err.message};
    }
}
export default uploadFile;