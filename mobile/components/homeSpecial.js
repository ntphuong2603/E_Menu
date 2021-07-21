import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'

const mockData = [
    {
        id:1,
        name:'Pizza',
        isNew: true,
    },{
        id:2,
        name:'Grill',
        isNew: false,
    },{
        id:3,
        name:'Pasta',
        isNew: true,
    },{
        id:4,
        name:'Salad',
        isNew: false,
    },{
        id:5,
        name:'Soup',
        isNew: true,
    }
]

const specialCard = ({item})=> (
    <View style={styles.specialCard}>
        {item.isNew && 
            <View style={styles.newContainer}>
                <Text style={styles.newText}>NEW</Text>
            </View>
        }
        <Image style={styles.specialImg} source={{uri:'https://picsum.photos/700'}}/>
        <Text style={styles.specialOfferTitle}>{item.name}</Text>
        <Text style={styles.specialOfferPrice}>$ 9.99</Text>
        <TouchableOpacity style={styles.btnSpecialOrder}>
            <Text style={styles.btnOrder}>Order</Text>
        </TouchableOpacity>
    </View>
)

export default function HomeSpecialOffers(){
    return(
        <FlatList
            data={mockData}
            horizontal={true}
            keyExtractor={item=>`${item.id}-${item.name}`}
            renderItem={specialCard}
            showsHorizontalScrollIndicator={false}
        />
    )
}

const styles = StyleSheet.create({
    newContainer:{
        position: 'absolute',
        margin: 3,
        borderRadius: 11,
        borderColor:'white',
        borderWidth: 0.75,
        zIndex:1,
        backgroundColor: '#3cb371',
    },
    newText:{
        padding: 5,
        color:'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    specialCard:{
        borderWidth: 0.5,
        marginRight: 10,
        borderColor: '#708090',
        borderRadius: 5,
    },
    specialImg:{
        height: 155,
        width: 155,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    btnSpecialOrder:{
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        padding:11,
        flexGrow:1,
        backgroundColor:'#ff6347',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText:{
        color: 'white',
        fontWeight:'bold',
        fontSize: 15,
    },
    specialOfferTitle:{
        marginLeft: 7,
        fontSize: 15,
    },
    specialOfferPrice:{
        marginLeft: 7,
        fontSize: 17,
        fontWeight: 'bold',
        color:'#3cb371',
        paddingBottom: 10,
        paddingTop: 10,
    },
    btnOrder:{
        fontWeight:'bold',
        color:'white',
    }
})