import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import CONFIG from './config'; // Importing firebase config from const from another file. 
import { Header } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {

    componentWillMount() {
        firebase.initializeApp({ CONFIG });
    }

    render() {
        return (
            <View>
                <Header headerText="Authentication" />
                <LoginForm />
            </View>
        );
    }
}

export default App;
