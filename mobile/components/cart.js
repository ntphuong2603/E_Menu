import React from 'react'
import { Text, View, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'

const mockData=[
    {
        id:1,
        name:'Subway sandwich',
        price:9.00,
        qty:2,
    },{
        id:2,
        name:'Pizza Margarita 35cm',
        price:20.00,
        qty:1,
    },{
        id:3,
        name:'Chocalate cake',
        price:30.00,
        qty:2,
    }
]

const orderItem = (item) => (
    <View key={`${item.id}-${item.name}`} style={styles.cartCard}>
        <Image style={styles.cartImg} source={{uri:'https://picsum.photos/700'}}/>
        <View style={{width:'65%', flexDirection:'column'}}>
            <View style={styles.cartNamePrice}>
                <Text style={styles.cartName}>{item.name}</Text>
                <View style={{flexDirection:'column'}}>
                    <Text style={styles.cartPrcOrg}>$ 7.64</Text>
                    <Text style={styles.cartPrcPrv}>$ 8.49</Text>
                </View>
            </View>
            <View style={styles.cartQuantity}>
                <TouchableOpacity style={styles.cartBtn}>
                    <AntDesign name='minuscircle' size={30} color="#1e90ff"/>
                </TouchableOpacity>
                <Text style={styles.cartQty}>{item.qty}</Text>
                <TouchableOpacity style={styles.cartBtn}>
                    <AntDesign name='pluscircle' size={30} color="#dc143c"/>
                </TouchableOpacity>
            </View>
        </View>
    </View>
)

export default function Cart(){
    return(
        <View style={{flex:1}}>
            <View style={styles.sumContainer}>
                <Text style={styles.sumTxt}>Cart</Text>
                <Text style={styles.sumSubTxt}>Subtotal:
                    <Text style={styles.sumAmt}> $ 98.00</Text>
                </Text>
            </View>
            <ScrollView>
                {mockData.map(item=>orderItem(item))}
            </ScrollView>
            <View style={styles.btnCheckoutContainer}>
                <TouchableOpacity style={styles.btnCheckout}>
                    <Text style={{color:'white'}}>Check out</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    sumContainer:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:20,
        marginTop:7,
        justifyContent:'flex-end'
    },
    sumTxt:{
        fontSize: 20,
        fontWeight:'bold',
        flex:1
    },
    sumSubTxt:{
        color:'gray',
        fontSize: 15,
    },
    sumAmt:{
        fontSize: 18,
        fontWeight:'bold',
        color:'green',
    },
    cartCard:{
        flexDirection:'row',
        borderWidth:0.5,
        borderColor:'#708090',
        borderRadius: 7,
        height: 125,
        marginBottom: 10,
    },
    cartImg:{
        height: '100%',
        width: '35%',
        borderTopLeftRadius:7,
        borderBottomLeftRadius:7,
    },
    cartName:{
        width:'70%',
        marginLeft: 10,
        padding: 5,
    },
    cartPrcOrg:{
        fontWeight: 'bold',
        fontSize: 15,
        color:'#3cb371',
        marginTop: 5,
        marginBottom: 5,
    },
    cartPrcPrv:{
        fontWeight: 'bold',
        fontSize: 13,
        color:'silver',
        textDecorationLine:'line-through',
        textAlign: 'right',
    },
    cartNamePrice:{
        flexGrow: 1,
        flexDirection: 'row',
    },
    cartQuantity:{
        flexGrow: 1,
        flexDirection:'row',
        justifyContent:'flex-end',
    },
    cartBtn:{
        alignItems: 'center',
        justifyContent: 'center',
        margin:10,
    },
    cartQty:{
        fontSize:20,
        fontWeight: '500',
        alignSelf: 'center',
        padding: 15,
    },
    btnCheckoutContainer:{
        // backgroundColor:'green',
        borderTopWidth:0.5,
        borderBottomWidth:0.5,
        borderColor:'#696969',
        padding:20,
    },
    btnCheckout:{
        backgroundColor:'#3cb371',
        padding: 20,
        borderRadius: 7,
        alignItems:'center',
    }
})