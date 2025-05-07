import {StyleSheet,View, Text, FlatList } from "react-native";
import 'expo-router/entry';
import products from '../assets/products.json';
import ProductListItem from "../components/ProductListItem";




export default function HomeScreen(){

return(
<FlatList

data = {products}

renderItem ={({item }) => <ProductListItem product = {item}/>}


/>

)

}