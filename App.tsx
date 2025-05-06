import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  Button,
  TouchableOpacity,
} from 'react-native';
import darkmode from './darkMode/darkMode'
import {Appearance} from 'react-native';


const {width} = Dimensions.get('window');
const BUTTON_SIZE = width / 5;
const myColors = {
  light: '#F1F2F3',
  dark: '#17171C',
  blue: '#4B5EFC',
  btnGray: '#4E505F',
  btnDark: '#2E2F38',
  gray: '#747477',
  black: '#000000',
  white: '#FFFFFF',
  result: '#46D5B2'
}
export default function App() {
  const [value, setValue] = useState('');
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });
  
    return () => subscription.remove();
  }, []);
  
 
  const calculatorButtons = [
    'C',
    '00',
    '%',
    '/',
    '7',
    '8',
    '9',
    '*',
    '4',
    '5',
    '6',
    '-',
    '1',
    '2',
    '3',
    '+',
    '0',
    '.',
    'DEL',
    '=',
  ];
  const BtnPress = (item: string) => {
    if (item === 'DEL') {
      let newVal = value.slice(0, -1);
      setValue(newVal);
      return;
    }
  
    if (item === 'C') {
      setValue('');
      return;
    }
  
    if (item === '=') {
      try {
        let result = eval(value); 
        if (result % 1 !== 0) {
          result = result.toFixed(6);
        }
        setValue(result.toString());
      } catch (e) {
        setValue('Error');
      }
      return;
    }
  
    if (item === '%') {
      try {
        let result = parseFloat(value) / 100;
        setValue(result.toString());
      } catch (e) {
        setValue('Error');
      }
      return;
    }
  
    // Default: append item to value
    setValue(prev => prev + item);
  };
  // const darkmodeControl=()=>{
  //   if(theme==='dark'){
  //     setTheme('light')
  //   }
  //   if(theme==='light'){
  //     setTheme('dark')
  //   }
   
  // }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar 
       backgroundColor={theme === 'dark' ? myColors.dark : '#FFFFFF'} 
      barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />

      <View style={(theme==='light')?styles.mainContainer:darkmode.mainContainer}>
        <View style={styles.display}>
        {/* <Button title="Press Me" onPress={darkmodeControl}></Button> */}
        <Text style={styles.displayText} 
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.4}
        >
            {value}
         </Text>
        </View>
        <View style={styles.numberSection}>
          <View style={styles.buttonGrid}>
            {calculatorButtons.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => BtnPress(item)}>
                <View style={[styles.button,
                (item==='C')||(item=== '%' )||(item=== '00' )?styles.specialBtn:null,
                (item==='/')||(item=== '*' ) ||(item=== '-' )||(item=== '+')||(item=== '=' )?styles.specialBtn2:null,
                ]}>
                  <Text style={[styles.buttonText,(item==='C')||(item=== '%' )||(item=== '00' )||(item==='/')||(item=== '*' ) ||(item=== '-' )||(item=== '+')||(item=== '=' )?styles.specialBtnText:null]}>{item}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContainer: {
    flex: 1,
   backgroundColor:myColors.light,
  },
  display: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems:'flex-end',
    padding:20,
  },
  numberSection: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    margin: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: BUTTON_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: width * 0.07,
    color: '#000000',
    fontWeight: 'bold',
  },
  displayText: {
    fontSize: width * 0.18,
    fontWeight: 'bold',
    marginRight: 12,
    justifyContent:'center',
    alignItems:'center',
    color:'#2E2F38'
    
  },
  specialBtn:{
    backgroundColor:'#2E2F38',
  },
  specialBtnText:{
    color:'#FFFFFF'
  },
  specialBtn2:{
    backgroundColor:'#4B5EFC',
  },
 
  

});
