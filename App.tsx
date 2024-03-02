import {StatusBar} from 'expo-status-bar';
import Navigator from './src/navigators/Navigator';
import {UpdateProvider} from './src/contexts/UpdateContext';
import {UserProvider} from './src/contexts/userContext';

const App = () => {
  return (
    <UserProvider>
      <UpdateProvider>
        <Navigator />
        <StatusBar style="auto" />
      </UpdateProvider>
    </UserProvider>
  );
};

export default App;
