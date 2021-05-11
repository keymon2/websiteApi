export const isAuthenticated = request =>{
    if(!request.user){
        throw Error("You need to long in to perform this action");
    }
    return;
};

