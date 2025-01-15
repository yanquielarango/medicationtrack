import { Button, ButtonText } from '@/components/ui/button';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native'
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useAuth, useUser} from "@clerk/clerk-expo";


const Home = () => {
    const { signOut, } = useAuth()
    // const {user} = useUser()
    const {top} = useSafeAreaInsets()



    return (
         <View style={[styles.container, {paddingTop: top}]}>
                    
                   
        
                    <View>
                        <Text style={styles.textTitle}>Welcome 
                            <Text style={styles.textName}> hello</Text>
                        </Text>
                        <Text style={styles.textSubtitle}>
                            You are logged in
                        </Text>
        
                    </View>
        
                    <View style={styles.buttonContainer}>
                      <Button  onPress={() => signOut()} >
                        <ButtonText>Log out</ButtonText>
                     </Button>
        
                       
                    </View>
                </View>
    )
}


const styles = StyleSheet.create({
    container: {
        gap: 20
    },
    logoContainer: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    loginImage: {
        marginTop: 20,
        height: 70,
        resizeMode: "contain",
    },
   
    textTitle: {
        textAlign: "center",
        fontSize: 20,
        fontFamily: "Rubik-Regular",
        marginBottom: 40,
        marginTop: 30,
    },
    textName: {
        textAlign: "center",
        fontSize: 20,
        fontFamily: "Rubik-Bold",
        color: "#FF6B3C"
    },
    textSubtitle: {
        textAlign: "center",
        fontSize: 22,
        fontFamily: "Rubik-Regular",
        marginBottom: 40,
    },
    textDescription: {
        textAlign: "center",
        fontSize: 15,
        marginTop: 16,
        color: "#8E8E8E" ,
        fontFamily: "Rubik-Light",
    },
    buttonContainer: {
        paddingHorizontal: 40
    },

    policy: {
        color: 'gray',
        fontSize: 12,
        fontFamily: "Rubik-Regular",
        textAlign: "center",
        marginTop: 20
    }
});

export default Home
