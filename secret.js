import crypto from 'crypto'



const hash = (password) => {
    crypto.randomBytes(64,(err,buf) => {
        crypto.pbkdf2(password,buf, 100, 64,'sha512',(err,key)=>{
            return {
                password: key.toString('base64'),
                salt: buf
            };   
           })
    })

}

export default hash;