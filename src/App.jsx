import AppRouter from './routers/AppRouter';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Provider } from 'react-redux';
import { store } from './app/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Header />
        <AppRouter />
        <Footer />
      </Provider>
    </div>
  );
}

export default App;
