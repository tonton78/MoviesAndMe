import React from 'react'
import {View,Text,StyleSheet,ActivityIndicator, ScrollView, Image} from 'react-native'
import { getFilmDetailFromApi } from '../API/TMDBApi'
import {getImageFromApi} from '../API/TMDBApi'


class FilmDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          film: undefined, 
          isLoading: true 
        }
      }


      _displayFilm() {
          const film = this.state.film
          if (film!= undefined) {
              return(
                  <ScrollView style={styles.scrollview_container}>
                      <Image style = {styles.backdrop_path}  source = {{uri:getImageFromApi(film.backdrop_path)}}/>
                      <Text style ={styles.text_title}> {film.title}</Text>
                      <View style = {styles.description_container}>
                      <Text style = {styles.description_text} >{film.overview}</Text>
                      <View style = {styles.extra_infos}>
                      <Text style={styles.text_extra}> Sortie le {film.release_date}</Text>
                      <Text style= {styles.vote_average}> Note: {film.vote_average}</Text>
                      </View>

                          </View>
                  </ScrollView>
              )
          }
      }



    
      _displayLoading() {
        if (this.state.isLoading) {
          
          return (
            <View style={styles.loading_container}>
              <ActivityIndicator size='large' color='red' />
            </View>
          )
        }
      }

      componentDidMount () {
          getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
              this.setState({
                  film: data, isLoading: false
              })
          })
      }
    
      render() {
          
        return (
          <View style={styles.main_container}>
              {this._displayFilm()}
            {this._displayLoading()}
          </View>
        )
      }
    }
    
    const styles = StyleSheet.create({
      main_container: {
        flex: 1
      },
      loading_container: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        
      },
      backdrop_path :{
          flexDirection: 'row',
          width :366,
        height: 180,
        margin:5,
      },

      text_title : {
          flex:1,
          alignItems:'center',
          justifyContent:'center',
          fontSize: 30,
        fontWeight:'bold',
        textAlign:'center',

      },
      description_container :{
          flex: 1,

      },
      description_text:{
        fontStyle : 'italic',
        color : 'grey',
        textAlign:'center',
        paddingTop : 10,

    },
    extra_infos:{
         flex: 2,
         paddingTop : 20,
         paddingLeft:10,
         
    },
    text_extra : {
        fontWeight:'bold',
        fontSize : 14,
        textAlign: 'left',

    },
    vote_average: {
        fontWeight : 'bold',
        fontSize: 14,
    },
    })
    
    export default FilmDetail