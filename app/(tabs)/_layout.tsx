import { Tabs } from "expo-router";
import { Image, View, StyleSheet } from "react-native";
import { BlurView } from 'expo-blur';

import { Ionicons } from "@expo/vector-icons";


const TabIcon = ({
    focused,
    icon,
    label,
    }: {
    focused: boolean;
    icon: keyof typeof Ionicons.glyphMap;
    label?: string;
    }) => {
    return (
        <View style={[styles.container]}>
        <View
            style={[styles.iconContainer, focused && styles.iconContainerFocused]}
        >
        <Ionicons
            name={icon }
            size={30}
            color={focused ? "white" : "white"}
        />
        </View>
        </View>
    );
}



export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarBackground: () => (
          <BlurView tint="dark" intensity={100} style={StyleSheet.absoluteFill} />
        ),
        tabBarStyle: {
        //   backgroundColor: "red",
          borderRadius: 50,
          overflow: "hidden",
          marginHorizontal: 80,
          marginBottom: 20,
          paddingBottom: 25,
          height: 70,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({size, color, focused}) => (
           <TabIcon icon="home" focused={focused} />
          )
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "history",
          headerShown: false,
          tabBarIcon: ({size, focused}) => (
           <TabIcon icon="time" focused={focused} />
        )
        }}
      />
           
        <Tabs.Screen
            name="profile"
            options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({size, focused}) => (
               <TabIcon icon="person" focused={focused} />
            )
            }}
            />
    </Tabs>
  );
}


const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      // Large enough to ensure a circular shape
    },
    containerFocused: {
      backgroundColor: "#D1D5DB", // Replace with your "bg-general-300" color
    },
    iconContainer: {
      borderRadius: 999, // Circular shape
      width: 48, // Equivalent to w-12 in Tailwind
      height: 48, // Equivalent to h-12 in Tailwind
      justifyContent: "center",
      alignItems: "center",
    },
    iconContainerFocused: {
      backgroundColor: 'blue', // Replace with your "bg-general-400" color
    },
  });