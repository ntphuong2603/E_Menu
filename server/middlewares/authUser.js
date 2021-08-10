import jsonwebtoken from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export default () => {
    return {
        checkToken (req, res, next) {
            try {
                const token = req.body.token
                if (token !== undefined){
                    res.locals.userInfo = jsonwebtoken.verify(token, process.env.JWT_SECRET)
                }
            } catch (error) {
                console.log('Error:', error);
            } finally{
                next()
            }
        },
        
    }
}