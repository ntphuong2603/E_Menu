import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, Image, Alert } from 'react-native'

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
    <TouchableOpacity style={styles.categoryCard}>
        <Text style={styles.cardText}>{item.name}</Text>
        <Image style={styles.cardImage} source={{uri:'https://picsum.photos/500'}}/>
    </TouchableOpacity>
)

export default function HomeCategories({viewCategories}){
    return(
        <>
            <TouchableOpacity style={styles.allCategories} onPress={()=>viewCategories()}>
                <Text style={styles.allCategoriesText}>View all</Text>
            </TouchableOpacity>
            <FlatList 
                horizontal={true}
                data={mockData}
                renderItem={categoryCard}
                keyExtractor={item=>`${item.id}-${item.name}`}
                showsHorizontalScrollIndicator={false}
            />
        </>
    )
}

const styles = StyleSheet.create({
    allCategories:{
        position: 'absolute',
        top: 10,
        right:0,
    },
    allCategoriesText:{
        color:'#3cb371',
        fontSize: 15,
        fontWeight:'500'
    },
    categoryCard:{
        borderRadius: 7,
        borderColor: '#ff4500',
        borderWidth: 0.75,
        height: 70,
        width: 110,
        justifyContent:'flex-end',
        alignItems:'center',
        marginRight: 7,
    },
    cardText:{
        color:'white',
        zIndex: 10,
        fontWeight: '700',
    },
    cardImage:{
        position:'absolute',
        height:'100%',
        width:'100%',
        borderRadius: 7,
        top:0,
        right:0,
    }
})