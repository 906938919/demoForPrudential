import { Provider } from 'react-redux';
import { store } from './models/store';
import { HashRouter } from "react-router-dom";
import './App.css';
import Routes from "./pages"

function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <Routes />
      </Provider>
    </HashRouter>
  );
}

export default App;
