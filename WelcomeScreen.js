import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Modal, KeyboardAvoidingView, TouchableHighlightBase } from 'react-native';
import * as firebase from 'firebase';
import db from '../config';
import DonaAnimation from '../components/DonaAnimation';

export default class WelcomeScreen extends React.Component {

  constructor(){
    super();
    this.state={emailId: '', password:'', isModalVisible: 'false', firstName:'', lastName:'', address:'', phoneNumber:'', confirmPassword:''};
  }

  showModal = ()=>{
    return(
      <Modal
          animationType = 'fade'
          transparent = {true}
          visible = {this.state.isModalVisible}>
            <View style={styles.container}>
                <KeyboardAvoidingView>
                    <Text>Register Here</Text>
                    <TextInput placeholder= {"First Name"} maxLength = {20} onChangeText ={(text)=>{this.setState({firstName:text})}}/>
                    <TextInput placeholder= {"Last Name"} maxLength = {20} onChangeText ={(text)=>{this.setState({lastName:text})}}/>
                    <TextInput placeholder= {"Address"} multiline = {true} onChangeText ={(text)=>{this.setState({address:text})}}/>
                    <TextInput placeholder= {"Phone Number"} maxLength = {20} onChangeText ={(text)=>{this.setState({phoneNumber:text})}}/>
                    <TextInput placeholder= {"Email"} keyboardType = {'email-address'} onChangeText ={(text)=>{this.setState({emailId:text})}}/>
                    <TextInput placeholder= {"Password"} secureTextEntry = {true} onChangeText ={(text)=>{this.setState({password:text})}}/>
                    <TextInput placeholder= {"Confirm Password"} secureTextEntry = {true} maxLength = {20} onChangeText ={(text)=>{this.setState({confirmPassword:text})}}/>
                  <View style={styles.container}>
                    <TouchableOpacity onPress = {()=>this.signUp(this.state.emailId, this.state.password, this.state.confirmPassword)}>
                      <Text>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {()=> this.setState({isModalVisible : false})}>
                      <Text>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                  </KeyboardAvoidingView>
            </View>
      </Modal>
    )
  }


  login = (emailId, password)=>{
    firebase.auth().signInWithEmailAndPassword(emailId, password).then(()=>{
      //Alert.alert("You have Loged In!");
      this.props.navigation.navigate('Donate')
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage);
    });

  }


  signUp = (emailId, password, confirmPassword)=>{

    if(password !== confirmPassword){
      return Alert.alert("Password Not Matching!");
    }
    else{
      firebase.auth().createUserWithEmailAndPassword(emailId, password).then((Response)=>{
        db.collection('UserInfo').add({
          FirstName : this.state.firstName,
          LastName : this.state.lastName,
          EmailId : this.state.emailId,
          Password : this.state.password,
          Address : this.state.address,
          PhoneNumber : this.state.phoneNumber
          
        })
        return Alert.alert("You Have Signed Up",'', [{text:'ok', onPress : ()=>this.setState({isModalVisible:false})}])
      })
    
    .catch((error)=> {
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage);
    });
  }
}
    render(){
      return (
        <View style={styles.container}>
            <View style = {{justifyContent:'center', alignItems:'center'}}>

            </View>
            {this.showModal()}
            <View style = {{justifyContent:'center', alignItems:'center'}}>
                <Text>BookDona</Text>
            </View>
            <View>
              <TextInput placeholder = "Email" keyboardType = 'email-address' onChangeText = {(text)=>{this.setState({emailId:text})}}/>
              <TextInput placeholder = "Password" secureTextEntry = {true} onChangeText = {(text)=>{this.setState({password:text})}}/>
              <TouchableOpacity onPress = {()=>{this.setState({isModalVisible:true})}}>
                <Text>Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress = {()=>{this.login(this.state.emailId, this.state.password)}}>
                <Text>Login Here</Text>
              </TouchableOpacity>
            </View>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
