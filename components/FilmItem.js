import React from 'react'
import {StyleSheet, View,Text,Image, TouchableOpacity} from 'react-native'
import {getImageFromApi} from '../API/TMDBApi'

class filmItem extends React.Component {
    render () {
        const { film , displayDetailForFilm} = this.props
        return (
            <TouchableOpacity 
            onPress= {() => displayDetailForFilm(film.id)}
             style= {styles.main_container}>
                <Image style={styles.poster_path} source={{uri:getImageFromApi(film.poster_path)}}/>
                <View style={styles.content_container}>
                 <View style={styles.header_container}>
                   <Text style={styles.title_text} >{film.title}</Text>
                   <Text style={styles.vote} > {film.vote_average}</Text>
                   
                   </View>
                   <View style={styles.description_container}>
                       <Text style ={styles.description_text} numberOfLines = {6}>{film.overview}</Text>
                       </View>
                       <View style={styles.date_container}>
                           <Text style={styles.date_text}> Sorti Le {film.release_date}</Text>
                       </View>


                </View>



                
            </TouchableOpacity>

        )
    }
}

const styles = StyleSheet.create({
    main_container : {
        flexDirection :'row',
        height : 190,
        
    },
    content_container:{
        flex:1,
        margin:5,

    },
    header_container: {
        flex: 3,
        flexDirection:'row',
    },
    title_text : {
        fontSize: 20,
        fontWeight:'bold',
        fontFamily:'Helvetica-Bold',
        flex:1,
        paddingRight:5,
        
    },
    vote : {
        fontSize : 20,
        fontWeight: 'bold',

    },
    poster_path: {
        backgroundColor: 'black',
        width :120,
        height: 180,
        margin:5,
    },
    description_container : {
        fontSize : 12,
        flex:7,
    },
    description_text:{
        fontStyle : 'italic',
        color : 'grey',

    },
    date_container :{
        flex: 1,

    },
    date_text : {
        fontWeight:'bold',
        fontSize : 14,
        textAlign: 'right',

    }


})
export default filmItem