async function checkAuth() {
    try {
        const respone = await fetch(`${BACKEND_URL}/auth/check-auth`, {
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

async function signIn() {

}
async function signUp() {

}
async function signOut() {

}
export {checkAuth, signIn, signUp, signOut};
