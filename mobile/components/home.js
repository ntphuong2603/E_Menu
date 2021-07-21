import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import HomeCategories from './homeCategories'
import HomeSpecialOffers from './homeSpecial'
import HomePopularOrder from './homePopularOrder'
import AllCategories from './allCategories'
import PopularOrders from './popularOrders'

const partitionList = [
    {
        key:'0',
        name:'Categories',
        comp: HomeCategories,
    },{
        key:'1',
        name:'Special offers',
        comp: HomeSpecialOffers,
    },{
        key:'2',
        name:'Popular orders',
        comp: HomePopularOrder,
    }
]

const Stack = createStackNavigator();

function Main({navigation}){
    return(
        <ScrollView >
            {partitionList.map((item)=>{
                const MyComponent = item.comp
                return(
                    <View key={item.key} style={styles.container}>
                        <Text  style={styles.itemTitle}>{item.name}</Text>
                        <MyComponent 
                            viewCategories={()=>navigation.navigate('All categories')}
                            viewPopularOrder={()=>navigation.navigate('Popular orders')}
                        />
                    </View>
                )}
            )}
        </ScrollView>
    )
}

export default function Home(){
    return(
        <Stack.Navigator initialRouteName='Home' headerMode='none' >
            <Stack.Screen name='Home' component={Main} />
            <Stack.Screen name="All categories" component={AllCategories} />
            <Stack.Screen name='Popular orders' component={PopularOrders} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#f5f5f5',
        marginBottom: 25,
    },
    itemTitle:{
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 15,
    }
})