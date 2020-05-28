import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Modal, KeyboardAvoidingView } from 'react-native';
import * as firebase from 'firebase';
import db from '../config';
import DonaAnimation from '../components/DonaAnimation';

export default class DonateBookScreen extends React.Component {

    render(){
        return(
            <Text>Donate a book</Text>
        )
    }
}