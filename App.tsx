import { AuthProvider } from "./src/contexts/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignInScreen } from "./src/screens/auth/SignInScreen";
import { SignUpScreen } from "./src/screens/auth/SignUpScreen";
import { HomeScreen } from "./src/screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator initialRouteName="Sign In">
          <Stack.Screen
            name="Sign In"
            component={SignInScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Sign Up" component={SignUpScreen} />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "The Reading Rune", headerBackTitle: "Back" }}
          />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}
