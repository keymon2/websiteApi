export const isAuthenticated = request =>{
    if(!request.user){
        return false;
    }
    return true;
};

