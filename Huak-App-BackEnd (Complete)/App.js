import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Preload from './pages/Preload';
import Timeline from './pages/Timeline'
import Gallery from './pages/Gallery';
import Prepost from './pages/Prepost';
import Post from './pages/Post';

const Stack = createNativeStackNavigator();

function PageStack() {
  return (
    <Stack.Navigator 
      initialRouteName='Preload'
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1b8057'
        },
        headerTintColor: '#ede9a3',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      }}
    >
      <Stack.Screen 
        name="Preload" 
        component={Preload} 
        options={{headerShown:false}}
      />
      <Stack.Screen 
        name="Timeline" 
        component={Timeline}
        options={{title: 'HUAK'}} 
      />
      <Stack.Screen 
        name="Gallery" 
        component={Gallery}
        options={{title: 'Share Your Idea'}} 
      />
      <Stack.Screen 
        name="Prepost" 
        component={Prepost}
        options={{title: 'Share Your Idea'}} 
      />
      <Stack.Screen 
        name="Post" 
        component={Post}
        options={{title: 'HUAK'}} 
      />
    </Stack.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <PageStack />
    </NavigationContainer>
  );
}

export default App;