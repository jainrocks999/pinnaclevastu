import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { colors } from '../../../Component/colors';

const SplashScreen =({navigation})=> {
    useEffect(() => {
        setTimeout(() => {
          navigation.replace('Home');
        }, 2000);
      }, []);
  return (
    <View style={styles.main}>
     <View style={styles.contain}>   
     <Image source={require('../../../assets/image/Pinnacle-vastu-logo.png')}/>
    </View>
    </View>
  )
}
export default SplashScreen;
const styles = StyleSheet.create({
main:{
    flex:1,
    backgroundColor:colors.white,
    alignItems:'center',
    justifyContent:'center'
},
contain:{
    alignItems:'center',
    justifyContent:'center',
   
}

})

// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

// const NumerologyApp = () => {
//   const [birthDate, setBirthDate] = useState(''); // For Life Path Number
//   const [fullName, setFullName] = useState(''); // For Expression and Soul Urge Numbers
//   const [lifePathNumber, setLifePathNumber] = useState(null);
//   const [expressionNumber, setExpressionNumber] = useState(null);
//   const [soulUrgeNumber, setSoulUrgeNumber] = useState(null);

//   // Helper function to calculate the sum of digits and reduce to a single digit (or master numbers)
//   const reduceToSingleDigit = (num) => {
//     while (num > 9 && ![11, 22, 33].includes(num)) {
//       num = num
//         .toString()
//         .split('')
//         .reduce((acc, curr) => acc + parseInt(curr, 10), 0);
//     }
//     return num;
//   };

//   // Calculate Life Path Number
//   const calculateLifePathNumber = () => {
//     const digits = birthDate.replace(/[^0-9]/g, ''); // Remove non-numeric characters
//     const sum = digits.split('').reduce((acc, curr) => acc + parseInt(curr, 10), 0);
//     setLifePathNumber(reduceToSingleDigit(sum));
//   };

//   // Convert letters to corresponding numbers (A=1, B=2, ..., Z=26)
//   const letterToNumber = (letter) => {
//     const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//     return alphabet.indexOf(letter.toUpperCase()) + 1;
//   };

//   // Calculate Expression Number
//   const calculateExpressionNumber = () => {
//     const letters = fullName.replace(/[^a-zA-Z]/g, ''); // Remove non-alphabetic characters
//     const sum = letters.split('').reduce((acc, letter) => acc + letterToNumber(letter), 0);
//     setExpressionNumber(reduceToSingleDigit(sum));
//   };

//   // Calculate Soul Urge Number (using vowels only)
//   const calculateSoulUrgeNumber = () => {
//     const vowels = 'AEIOU';
//     const letters = fullName.replace(/[^a-zA-Z]/g, ''); // Remove non-alphabetic characters
//     const sum = letters
//       .split('')
//       .filter((letter) => vowels.includes(letter.toUpperCase()))
//       .reduce((acc, letter) => acc + letterToNumber(letter), 0);
//     setSoulUrgeNumber(reduceToSingleDigit(sum));
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Numerology App</Text>

//       {/* Life Path Number */}
//       <TextInput
//         style={styles.input}
//         placeholder="Enter your birth date (MM/DD/YYYY)"
//         value={birthDate}
//         onChangeText={setBirthDate}
//         keyboardType="numeric"
//       />
//       <Button title="Calculate Life Path Number" onPress={calculateLifePathNumber} />
//       {lifePathNumber && (
//         <Text style={styles.result}>
//           Your Life Path Number is: {lifePathNumber}
//         </Text>
//       )}

//       {/* Expression Number */}
//       <TextInput
//         style={styles.input}
//         placeholder="Enter your full name"
//         value={fullName}
//         onChangeText={setFullName}
//       />
//       <Button title="Calculate Expression Number" onPress={calculateExpressionNumber} />
//       {expressionNumber && (
//         <Text style={styles.result}>
//           Your Expression Number is: {expressionNumber}
//         </Text>
//       )}

//       {/* Soul Urge Number */}
//       <Button title="Calculate Soul Urge Number" onPress={calculateSoulUrgeNumber} />
//       {soulUrgeNumber && (
//         <Text style={styles.result}>
//           Your Soul Urge Number is: {soulUrgeNumber}
//         </Text>
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f8f9fa',
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#4CAF50',
//   },
//   input: {
//     width: '80%',
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     marginBottom: 20,
//   },
//   result: {
//     marginTop: 20,
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#4CAF50',
//   },
// });

// export default NumerologyApp;
