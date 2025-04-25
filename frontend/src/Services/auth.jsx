const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
async function checkAuth() {
    try {
        const response = await fetch(`${BACKEND_URL}/auth/check-auth`, {
            credentials:'include',
            method:'GET',
        });
        const data = await response.json();
        if(!response.ok) return {error:data};
        return data;
    }   
    catch(err) {
        console.log(err.message);
        return {error:err.message};
    }
}

async function signIn(formData) {
    try {       
        const response = await fetch(`${BACKEND_URL}/auth/sign-in`,{
            method:"POST",
            credentials:'include',
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(formData)
        });
        const data = await response.json();
        if(!response.ok) return {error:data};
        return data;
    }       
    catch(err) {
        console.log(err.message);
        return {error:err.message};
    }
}
async function sign_Up(formData) {
    try {       
        const response = await fetch(`${BACKEND_URL}/auth/sign-up`,{
            method:"POST",
            credentials:'include',
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(formData)
        });
        const data = await response.json();
        if(!response.ok) return {error:data};
        return data;
    }       
    catch(err) {
        console.log(err.message);
        return {error:err.message};
    }
}
async function signOut() {
    try {       
        const response = await fetch(`${BACKEND_URL}/auth/sign-out`,{
            method:"POST",
            credentials:'include',
        });
        const data = await response.json();
        if(!response.ok) return {error:data};
        return data;
    }       
    catch(err) {
        console.log(err.message);
        return {error:err.message};
    }
}
export {checkAuth, signIn, sign_Up, signOut};
