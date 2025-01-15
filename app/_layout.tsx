import "@/global.css";
import { Slot, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { tokenCache } from "@/utils/cache";
import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { ActivityIndicator, View } from "react-native";

import {
  useFonts,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from '@expo-google-fonts/dm-sans';

import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env')
}

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

function RootLayoutNav() {
  const {isLoaded, isSignedIn} =  useAuth();

  const [fontsLoaded, fontError] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
        <Stack screenOptions={{contentStyle: {backgroundColor: "white"}}}>
            <Stack.Screen name="index" options={{headerShown: false}} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
  )
}

export default function RootLayout() {
  return (
      <GluestackUIProvider mode="light">
        <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
         
            <ClerkLoaded>
              <RootLayoutNav />         
              <StatusBar style="auto" />
            </ClerkLoaded>
        
        </ClerkProvider>
      </GluestackUIProvider>
    
  );
}

