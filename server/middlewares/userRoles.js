import AccessControl from 'accesscontrol'

// const CRUD_Own = {
//     'create:own':['*'],
//     'update:own':['*'],
//     'delete:own':['*'],
//     'read:own':['*'],
// }

// const CRUD_Any = {
//     'create:any':['*'],
//     'update:any':['*'],
//     'delete:any':['*'],
//     'read:any':['*'],
// }

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

export default () => {
    return {
        grantAccess (action, resource) {
            return (req, res, next) => {
                try {
                    const userInfo = res.locals.userInfo
                    // let permission = null
                    // if (userInfo === undefined) {
                    //     permission = roles.can('customer')[action](resource)
                    // } else {
                    //     permission = roles.can(userInfo.role)[action](resource)
                    // }
                    const permission = roles.can(userInfo.role)[action](resource)
                    res.locals.permission = permission.granted
                } catch (error){
                    console.log('Error:', error);
                } finally {
                    next()
                }
            }
        },

        actions : {
            create:{
                any:'createAny',
                own:'createOwn'
            },
            update:{
                any:'updateAny',
                own:'updateOwn'
            },
            read:{
                any:'readAny',
                own:'readOwn'
            },
            delete:{
                any:'deleteAny',
                own:'deleteOwn'
            },
        },

        resource : {
            category : 'category',
            user : 'user',
        },

        roles: {
            customer:'customer',
            user:'user',
            admin: 'admin',
            owner: 'owner',
            super: 'super',
        }
    }
}