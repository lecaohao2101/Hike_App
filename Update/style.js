
import {StyleSheet, Dimensions} from 'react-native'

const {width, height} = Dimensions.get('screen')
const styles = StyleSheet.create({
    imageBackground: {
        width: width,
        height:height,
        position: 'absolute'
      },
      
    title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,   
    },

    form: {
        marginTop: 15
    },

    text: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 20, 
        marginTop: 10,
    },

    input: {
        height: 40,
        borderColor: '#000000',
        borderWidth: 1,
        marginTop: 5,
        paddingLeft: 10,
        marginHorizontal: 20,  
        fontWeight: 'bold',       
    },

    date: {

      alignItems: 'center',
      marginTop: 8
    },
    
    description: {
        height: 100,
        borderColor: '#000000',
        borderWidth: 1,
        marginTop: 5,
        paddingLeft: 10,
        marginHorizontal: 20,
        fontWeight: 'bold',
        fontSize: 15,
          
    },

    button: {
        marginTop:20,
        backgroundColor: '#00C8FF',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginHorizontal: 20,
      },

      buttonText: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
      },

    navBar: {
        flexDirection: 'row',
        marginTop: 70,
      },

      navButton: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        padding: 10,
        margin: 2,
      },

      navButtonText: {
        fontSize: 20,
      },
  });

  export default styles