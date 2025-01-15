import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Image} from "react-native";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import {useAuth, useOAuth} from "@clerk/clerk-expo";


import {useEffect, useState} from "react";

import * as WebBrowser from 'expo-web-browser';
import * as Linking from "expo-linking";

import React from "react";
import { Button, ButtonIcon, ButtonSpinner, ButtonText } from "@/components/ui/button";
import colors from 'tailwindcss/colors'

import Ionicons from '@expo/vector-icons/Ionicons';


WebBrowser.maybeCompleteAuthSession()



const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
  

    

    const {top} = useSafeAreaInsets()


    useEffect(() => {
         WebBrowser.warmUpAsync()
        return () => {
            void WebBrowser.coolDownAsync()
        }
    }, [])

    
    const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const handleGoogleLogin = React.useCallback(async () => {
    try {
      setIsLoading(true)
      const { createdSessionId,  setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('(tabs)/home', { scheme: 'medi-track' }),
      })

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({ session: createdSessionId })
      } else {
        setIsLoading(false);
      }
    } catch (err) {
        console.error(err)
    }
  }, [])




    return (
        <View  >
            
    
            <Image source={require("@/assets/images/pills.png")}  className=" w-[350px] h-[450px]  self-center " resizeMode="contain"/>

            <View  className="h-full bg-blue-700 p-4 rounded-t-[30px] " >
                <Text className="text-center text-[24px] font-bold mt-2 text-white" >Welcome to Medication Tracker</Text>
                <Text className="text-center text-2xl font-semibold mt-3 text-white" >
                    Let's Stay on Track, {"\n"}
                    <Text >Stay Healthy!</Text>
                </Text>
      
                <Text  className="text-center mt-3 text-lg mb-2 text-white">Track your meds, take control of your health. Stay consistent, stay confident</Text> 

                <View className="w-[200px] mx-auto" >
                  <Button size="xl" variant="outline" action="primary"  className="mt-4 rounded-lg border-white  " onPress={handleGoogleLogin} >

                   {isLoading ? (
                     <ButtonSpinner color={colors.white} />
                   ):  <View className="flex-row gap-2" >
                   <Ionicons name="logo-google" size={24} color="white"  />
                   <ButtonText className="text-xl text-white">Sign with Google</ButtonText>
                 </View>}
                     
                  </Button>
               </View>

                <Text className="text-center mt-5 text-white" >
                    By continuing you agree to Medi-Tracker's{' '}
                    <Text>
                        Terms of Service
                    </Text>{' '}
                    and{' '}
                    <Text>Privacy Policy.</Text>
                </Text>            
               
              </View>

                

                
       </View>

            
        
    )
}



export default  Login;

