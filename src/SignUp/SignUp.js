import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Title, HelperText } from 'react-native-paper';
import FormInput from '../UIcomponents/FormInput';
import FormButton from '../UIcomponents/FormButton';
// import { Button } from 'react-native-elements';

import axios from 'axios';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 24,
        marginBottom: 10
    },
    signUpButtonLabel: {
        fontSize: 18
    },
    navButtonText: {
        fontSize: 16
    }
})

function SignUp({ navigation }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const hasEmailError = () => {

        if (email.length > 4 && email.includes('@') === false) {
            return (<HelperText type="error" visible={true}>
                올바른 Email 형식이 아닙니다!
            </HelperText>)
        }
    };

    const handleSignUp = (email, password) => {
        axios.post('http://15.165.197.67:5000/user/signup', {
            email: email,
            password: password
        }).then(res => {
            console.log(res.data)
            if (res.status === 200) {
                Alert.alert("회원가입이 완료되었습니다.")
                navigation.navigate('SignIn')
            }
        }).catch(err => {
            console.log(err)
            Alert.alert("이미 가입한 회원입니다.")
        })
    };

    return (
        <View style={styles.container} >
            <Title style={styles.titleText}>Sign Up</Title>
            <FormInput
                labelName='Email'
                value={email}
                autoCapitalize='none'
                onChangeText={email => setEmail(email)}
            />
            {hasEmailError()}
            <FormInput
                labelName='Password'
                value={password}
                secureTextEntry={true}
                onChangeText={password => setPassword(password)}
            />
            <FormButton
                title='Sign Up'
                modeValue='contained'
                labelStyle={styles.signUpButtonLabel}
                onPress={() => handleSignUp(email, password)}
            />

            <FormButton
                title='go to Sign In'
                icon='keyboard-backspace'
                modeValue='text'
                uppercase={false}
                labelStyle={styles.navButtonText}
                onPress={() => { navigation.navigate('SignIn') }}
            />
        </View>
    );
}

export default SignUp;