export default {
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