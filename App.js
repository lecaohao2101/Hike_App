// Import necessary React components and libraries for navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Import the screens for navigation
import FormScreen from "./Form/form.js";
import HomeScreen from "./Home/home.js";
import UpdateScreen from "./Update/update.js";

// Create a stack navigator
const Stack = createStackNavigator();

// Define the main App component
const App = () => {
  // Return the NavigationContainer containing the Stack.Navigator with screens
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Form Screen */}
        <Stack.Screen
          name="Form"
          component={FormScreen}
          options={{ headerShown: false }}
        />

        {/* Home Screen */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />

        {/* Update Screen */}
        <Stack.Screen
          name="Update"
          component={UpdateScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Export the App component for use in other modules
export default App;
