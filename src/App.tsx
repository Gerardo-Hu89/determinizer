import { Body } from './components/body';
import { Header } from './components/header';
import { AppProvider } from './context/appContext';

function App() {
  return (
    <AppProvider>
      <div className='min-h-screen bg-gray-200'>
        <Header />
        <Body />
      </div>
    </AppProvider>
  );
}

export default App;
