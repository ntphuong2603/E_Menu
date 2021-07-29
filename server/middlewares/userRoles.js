import AccessControl from 'accesscontrol'

const roles = new AccessControl({
    user:{
        profile:{
            'read:own':['*','!password'],
            'update:own':['*'],
        }
    },
    admin:{
        category:{
            'create:any':['*'],
            'read:any':['*'],
            'update:any':['*'],
            'delete:any':['*'],
        },
        profile:{
            'create:any':['*'],
            'read:any':['*','!password'],
            'update:any':['*'],
            'delete:any':['*'],
        }
    },
    // owner:{
    //     'create:user':['*'],
    //     'read:any':['*','!password'],
    //     'update:any':['*'],
    //     'delete:any':['*'],
    //     'drop:any':['*'],
    // },
    // super:{
    //     'create:owner':['*'],
    // },
})

export default () => {
    return {
        grantAccess (action, resource) {
            return (req, res, next) => {
                try {
                    const permission = roles.can(res.locals.userInfo.role)[action](resource)
                    if (!permission.granted){
                        res.locals.permission = false
                    } else  {
                        res.locals.permission = permission
                    }
                } catch (error){
                    console.log('Error:', error);
                } finally {
                    next()
                }
            }
        },

        ACTION : {
            OWN : {
                READ: 'read_own',
                UPDATE: 'update_own',
            },
            ANY : {
                CREATE: 'create_any',
                READ: 'read_any',
                UPDATE: 'update_any',
                DELETE: 'delete_any',
                DROP: 'drop_any'
            }
        },

        RESOURCE : {
            CATEGORY : 'category',
            USER : 'user',
        }

    }
}

// exports.grantAccess = function (action, resource) {
//     return (req, res, next) => {
//         try {
//             const permission = roles.can(req.user.role)[action](resource)
//             if (!permission.granted){
//                 res.locals.permission = false
//             } else  {
//                 res.locals.permission = permission
//             }
//         } catch (error){
//             console.log('Error:', error);
//         } finally {
//             next()
//         }
//     }
// }

// exports.ACTION = {
//     OWN : {
//         READ: 'read_own',
//         UPDATE: 'update_own',
//     },
//     ANY : {
//         CREATE: 'create_any',
//         READ: 'read_any',
//         UPDATE: 'update_any',
//         DELETE: 'delete_any',
//         DROP: 'drop_any'
//     }
// }

// exports.RESOURCE = {
//     CATEGORY : 'category',
//     USER : 'user',
// }