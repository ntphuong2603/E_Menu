import React from 'react'
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet} from 'react-native'

const mockData = [
    {
        id:1,
        name:'Pizza'
    },{
        id:2,
        name:'Grill'
    },{
        id:3,
        name:'Pasta',
    },{
        id:4,
        name:'Salad'
    },{
        id:5,
        name:'Soup'
    }
]

const categoryCard = ({item}) => (
    <TouchableOpacity key={`${item.id}-${item.name}`} style={styles.categoryCard}>
        <Text style={styles.categoryTxt}>{item.name}</Text>
        <Image style={styles.categoryImg} source={{uri:'https://picsum.photos/700'}}/>
    </TouchableOpacity>
)

export default function AllCategories(){
    return (
        <FlatList
            data={mockData}
            keyExtractor={item=>item.id}
            renderItem={categoryCard}
            showsVerticalScrollIndicator={false}
        />
    )
}

const styles = StyleSheet.create({
    categoryCard:{
        height:150,
        width:'100%',
        borderColor:'white',
        borderWidth:1.0,
        borderRadius: 7,
        marginBottom:5,
        marginTop:5,
        justifyContent:'flex-end',
        alignItems:'center',
    },
    categoryImg:{
        position:'absolute',
        height:'100%',
        width:'100%',
        borderRadius: 7,
    },
    categoryTxt:{
        fontWeight:'bold',
        fontSize:25,
        color:'#f5fffa',
        zIndex:1,
    }
})