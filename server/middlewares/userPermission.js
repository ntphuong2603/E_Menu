import AccessControl from 'accesscontrol'

export default () => {

    const roles = new AccessControl({
        customer:{
            user:{
                'create:own':['*'],
                'update:own':['*'],
                'delete:own':['*'],
                'read:own':['*'],
            },
            category:{
                'read:any':['*'],
            },
        },
    
        user:{
            user:{
                'read:own':['*','!password'],
                'update:own':['*'],
                'read:own':['*']
            },
            category:{
                'read:any':['*'],
            },
        },
    
        admin:{
            category:{
                'create:any':['*'],
                'update:any':['*'],
                'delete:any':['*'],
                'read:any':['*'],
            },
            user:{
                'create:any':['*'],
                'read:any':['*','!password'],
                'update:any':['*'],
            },
        },
    
        owner:{
            user:{
                'create:any':['admin'],
                'delete:any':['admin']
            },
        },
    
        super:{
            user:{
                'create:any':['owner'],
                'delete:any':['owner']
            }
        }
    
    })

    return {
        grantAccess (action, resource) {
            return (req, res, next) => {
                try {
                    const permission = roles.can(res.locals.userInfo.role)[action](resource)
                    res.locals.permission = permission.granted
                } catch (error){
                    console.log('Error:', error);
                } finally {
                    next()
                }
            }
        }
    }
}