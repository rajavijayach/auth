import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Spinner, Input, Button, Card, CardSection } from './common';


class LoginForm extends Component {

    state = { email: '', password: '', error: '', loading: false };    

    onButtonPress() {
        const { email, password } = this.state;

        this.setState({ error: '', loading: true });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSucess.bind(this))
            .catch(() => {                
                    firebase.auth().createUserWithEmailAndPassword(email, password)
                        .then(this.onLoginSucess.bind(this))
                        .catch(this.onLoginFail.bind(this));
                });
    }

    onLoginFail() {       
          this.setState({ 
                email: '',
                password: '',
                error: 'Authentication Failed.',
                loading: false
             });
        }

    onLoginSucess() {
        this.setState({ 
            loading: false,
            email: '',
            password: '',
            error: ''
         });
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" />;
        }

        return <Button onPress={this.onButtonPress.bind(this)}> Login </Button>;
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                    placeholder="Enter Email"
                    label="Email"
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}                   
                    />
                </CardSection>

                <CardSection>
                    <Input
                    placeholder="Enter Password"
                    label="Password"
                    secureTextEntry
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    />
                </CardSection>
                
                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

export default LoginForm;
