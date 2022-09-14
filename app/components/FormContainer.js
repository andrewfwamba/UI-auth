import { Dimensions, KeyboardAvoidingView, StyleSheet, Text, View , Platform} from 'react-native'
import React from 'react'

const FormContainer = ({children}) => {
  return (
    <KeyboardAvoidingView 
    enabled behavior={Platform.OS === 'ios' ? "padding" : null}
    style={styles.container}>
        {children}
    </KeyboardAvoidingView>
  )
}

export default FormContainer

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    width: Dimensions.get('window').width},
})