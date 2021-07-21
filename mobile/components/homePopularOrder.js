import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'

const mockData = [
    {
        id:1,
        name:'Pizza',
    },{
        id:2,
        name:'Grill',
    },{
        id:3,
        name:'Pasta',
    },{
        id:4,
        name:'Salad',
    },{
        id:5,
        name:'Soup',
    }
]

const popularCard = (item) => (
    <View key={`${item.id}-${item.name}`} style={styles.popularCard}>
        <Image style={styles.popularImg} source={{uri:'https://picsum.photos/700'}}/>
        <Text style={styles.popularTxt}>{item.name}</Text>
        <View style={{flexDirection:'column'}}>
            <Text style={styles.popularPrcOrg}>$ 7.64</Text>
            <Text style={styles.popularPrcPrv}>$ 8.49</Text>
            <TouchableOpacity style={styles.popularAdd}>
                <AntDesign name='pluscircle' size={32} color="#dc143c"/>
            </TouchableOpacity>
        </View>
    </View>
)

export default function HomePopularOrder({viewPopularOrder}){
    return(
        <>
            <TouchableOpacity style={styles.allPopular} onPress={()=>viewPopularOrder()}>
                <Text style={styles.allPopularText}>View all</Text>
            </TouchableOpacity>
            {mockData.map(item=>popularCard(item))}
        </>
    )
}

const styles = StyleSheet.create({
    allPopular:{
        position: 'absolute',
        top: 10,
        right:0,
    },
    allPopularText:{
        color:'#3cb371',
        fontSize: 15,
        fontWeight:'500',
    },
    popularCard:{
        flexDirection:'row',
        borderWidth:0.5,
        borderColor:'#708090',
        borderRadius: 7,
        height: 125,
        marginBottom: 10,
    },
    popularImg:{
        height: '100%',
        width: '35%',
        borderTopLeftRadius:7,
        borderBottomLeftRadius:7,
    },
    popularTxt:{
        height:'100%',
        width:'40%',
        marginLeft: 10,
        marginRight: 10,
        padding: 7,
    },
    popularPrcOrg:{
        fontWeight: 'bold',
        fontSize: 18,
        color:'#3cb371',
        marginTop: 5,
        marginBottom: 5,
    },
    popularPrcPrv:{
        fontWeight: 'bold',
        fontSize: 13,
        color:'silver',
        textDecorationLine:'line-through',
        textAlign: 'right',
    },
    popularAdd:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth: 1,
        // borderColor: 'blue',
    }
})