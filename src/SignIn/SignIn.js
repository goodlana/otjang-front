import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Title, HelperText } from 'react-native-paper';
import FormInput from '../UIcomponents/FormInput';
import FormButton from '../UIcomponents/FormButton';

import axios from 'axios';
axios.defaults.withCredentials = true;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        marginTop: 120,
        marginBottom: 20
    },
    formContainer: {
        flex: 1
    },
    titleText: {
        fontSize: 24,
        marginBottom: 10
    },
    loginButtonLabel: {
        fontSize: 18
    },
    navButtonText: {
        fontSize: 16
    },
})
// #6200EE
function SignIn({ navigation }) {
    useEffect(() => {
        autoLogin()
    })

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const hasEmailError = () => {

        if (email.length > 4 && email.includes('@') === false) {
            return (<HelperText type="error" visible={true}>
                올바른 Email 형식이 아닙니다!
            </HelperText>)
        }
    };

    async function autoLogin() {
        let arr = await AsyncStorage.multiGet(['EMAIL', 'PASSWORD'])
        if (arr[0][1] && arr[1][1]) {
            try {
                axios.post('http://15.165.197.67:5000/user/signin', {
                    email: arr[0][1],
                    password: arr[1][1]
                }).then(async res => {
                    try {
                        let token = res.data.token;
                        if (res.status === 200) {
                            await AsyncStorage.setItem('TOKEN', token);
                            return navigation.replace('MainContainer');
                        }
                    } catch (e) {
                        Alert.alert('입력 정보를 다시 확인해주세요')
                        console.log(e)
                    }
                }).catch(e => e)
            } catch (e) {
                console.log('hi')
                Alert.alert('입력 정보를 다시 확인해주세요')
                console.log(e)
            }
        }
    }

    const handleSignIn = (email, password) => {
        axios.post('http://15.165.197.67:5000/user/signin', {
            email: email,
            password: password

        }).then(async res => {
            try {

                let token = res.data.token;

                if (res.status === 200) {
                    await AsyncStorage.setItem('TOKEN', token);
                    await AsyncStorage.setItem('EMAIL', email);
                    await AsyncStorage.setItem('PASSWORD', password);
                    // setEmail('');
                    // setPassword('');

                    return navigation.replace('MainContainer');
                }
            } catch (e) {
                console.log(e)
                Alert.alert("유효하지 않은 회원입니다.")
            }
        }).catch(e => {
            console.log(e)
            Alert.alert("유효하지 않은 회원입니다.")
        })
    };


    // async function autoSignIn(e='',p='') {
    //     let arr = await AsyncStorage.multiGet(['EMAIL','PASSWORD'])
    //     if(!arr) {
    //         await handleSignIn(e,p)
    //     } else {
    //         handleSignIn(arr[0][1], arr[1][1])
    //         //SignIn 버튼 누른 거랑 같은 효과가 나와야 함... 그런데 왜 안나와?
    //     }
    // }

    return (
        <View style={styles.container} >
            <Image
                style={styles.logo}
                source={require('./Logo/logo.png')} />
            <View style={styles.formContainer}>
                <FormInput
                    labelName='이메일'
                    value={email}
                    autoCapitalize='none'
                    onChangeText={email => setEmail(email)}
                />
                {hasEmailError()}
                <FormInput
                    labelName='비밀번호'
                    value={password}
                    secureTextEntry={true}
                    onChangeText={password => setPassword(password)}
                />
                <FormButton
                    title='로그인'
                    modeValue='contained'
                    labelStyle={styles.loginButtonLabel}
                    onPress={() => handleSignIn(email, password)}
                />
                <FormButton
                    title='회원가입'
                    modeValue='text'
                    uppercase={false}
                    labelStyle={styles.navButtonText}
                    onPress={() => { navigation.navigate('SignUp') }}
                />
            </View>
        </View>


    );
}

export default SignIn;