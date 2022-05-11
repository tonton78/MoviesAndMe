import React from 'react'
import {StyleSheet,View,TextInput,Button, FlatList, Text, ActivityIndicator} from 'react-native'
import FilmItem from './FilmItem'
import {getFilmsFromApiWithSearchedText} from '../API/TMDBApi'

class Search extends React.Component{

    constructor (props){
        super(props)
        this.state = { films : [],
        IsLoading : false 
    }

        this.searchedText=""
        this.page =0
        this.totalPages=0
    }
    
    _displayLoading() {
        if(this.state.IsLoading)
        return (
            <View style ={styles.loading_container} >
                <ActivityIndicator size={'large'} color='red'/>
            </View>
        )
    }

    _displayDetailForFilm = (idFilm) => {
        console.log('Display film with id'+ idFilm)
        this.props.navigation.navigate('FilmDetail', {idFilm:idFilm})
    }

    _searchTextInputChanged(text){
        this.searchedText= text
    }
    _loadFilms() {
        this.setState({IsLoading:true})
        if (this.searchedText.length> 0)
        getFilmsFromApiWithSearchedText(this.searchedText,this.page+1).then(data => 
        { this.page= data.page
          this.totalPages=data.total_pages
        
            this.setState({ films :this.state.films.concat(data.results),
        IsLoading : false})
        })


    }

    _searchFilms() {
        this.page=0
        this.totalPages=0
        this.setState({
            films : []} ,() => {
                console.log ('Page :'+ this.page+'/TotalPages:'+this.totalPages+'/Nombre de Films:'+this.state.films.length)
        this._loadFilms()

            
        })
        
    }

    render(){
        console.log(this.props)
    
        return(
            <View style= {styles.main_container}>
                <TextInput onSubmitEditing={()=> this._searchFilms()} style={styles.textInput} placeholder="Titre du film" onChangeText={(text)=> this._searchTextInputChanged(text)}/>
                <Button style={styles.textInput} title="Rechercher" onPress={() => this._searchFilms()}/>
                <FlatList
                  data={this.state.films}
                  onEndReachedThreshold={0.5}
                  onEndReached = {() => { if (this.page< this.totalPages) {this._loadFilms()}
                  }}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({item}) => <FilmItem film={item}  displayDetailForFilm= {this._displayDetailForFilm}/>}
        />
        {this._displayLoading()}
            </View>

        )

    } 

}
const styles =  StyleSheet.create({

    main_container : {
        flex: 1,

    },
    textInput : {
        marginLeft :5,
        marginRight: 5,
        height: 50, 
        borderColor: '#000000', 
        borderWidth: 1, 
        paddingLeft: 5 ,
    },

    loading_container : {
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        top:100,
        right:0,
        left:0,
        bottom: 0,

    }
})
export default Search