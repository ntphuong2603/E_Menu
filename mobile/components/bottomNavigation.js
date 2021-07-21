import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AntDesign from 'react-native-vector-icons/AntDesign'
import tabIndex from './tabIndex'

const BottomTabs = createBottomTabNavigator()

const constList = {
    active:'#ff1493',
    inactive: '#1e90ff',
    background:'#fff',
    badgeRadius: 9,
}

const bottomTabList = [
        { key:'0', name: 'Home', comp: tabIndex.home, icon: "home"}, 
        { key:'1', name: 'Search', comp: tabIndex.search, icon: "search1"}, 
        { key:'2', name: 'Cart', comp: tabIndex.cart, icon: "shoppingcart"},
        { key:'3', name: 'Favourite', comp: tabIndex.favourite, icon: "staro"}, 
        { key:'4', name: 'Setting', comp: tabIndex.setting, icon: "setting"}
    ]

function MyBottomTab({state, navigation}){
    const badge = 7;
    return (
        <View style={styles.tabBar}>
            {state.routes.map((route,index)=>{
                const isFocused = index === state.index
                return(
                    <TouchableOpacity style={styles.tabBarItem} key={route.key} onPress={()=>navigation.navigate(route.name)}>
                        <View style={{alignItems:'center'}}>
                            <AntDesign 
                                name={bottomTabList[index].icon} 
                                size={isFocused ? 25 : 30} 
                                color={isFocused ? constList.active: constList.inactive}/>
                            {route.name === 'Cart' && badge > 0 ? 
                                <View style={{...styles.badgeContainer, borderColor: isFocused ? constList.active : constList.inactive}}>
                                    <Text style={{...styles.badgeText, color: isFocused ? constList.active : constList.inactive}}>{badge}</Text>
                                </View> 
                            :  null}
                            {isFocused ? <Text style={styles.tabBarLabel}>{route.name}</Text> : null}
                        </View>
                    </TouchableOpacity>
                )}
            )}
        </View>
    )
}

export default function BottomNavigation(){
    return(
        <BottomTabs.Navigator 
            initialRouteName='Home'
            tabBar={props=><MyBottomTab {...props}/>}
        >
            {bottomTabList.map( eachTab => (
                    <BottomTabs.Screen key={eachTab.key} name={eachTab.name} component={eachTab.comp} />
                ))
            }
        </BottomTabs.Navigator>
    )
}

const styles = StyleSheet.create({
    tabBar:{
        flexDirection:'row',
        height: 55,
        justifyContent:'space-around',
        alignItems: 'center',
        backgroundColor: constList.background,
    },
    tabBarItem:{
        height: '90%',
        justifyContent: 'center',
        flexGrow:1, 
    },
    tabBarLabel:{
        fontSize:11, 
        fontWeight:'bold', 
        color:constList.active
    },
    badgeContainer:{
        position:'absolute',
        right:15,
        top: -5,
        borderWidth: 0.5,
        backgroundColor: 'white',
        // minWidth:0,
        width: constList.badgeRadius*2,
        height: constList.badgeRadius*2,
        borderRadius: constList.badgeRadius,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText:{
        fontWeight: 'bold',
        fontSize: 10,
    }
})