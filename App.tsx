import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigator from './src/navigators/Navigator';
import {UserProvider} from './src/contexts/userContext';

const App = () => {
  console.log('moro');
  return (
    <SafeAreaProvider>
      <UserProvider>
        <Navigator />
        <StatusBar style="auto" />
      </UserProvider>
    </SafeAreaProvider>
  );
};

export default App;
