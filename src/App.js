import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store/store';
import EmailList from './components/EmailList';
import EmailDetail from './components/EmailDetail';
import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="app">
          <EmailList />
          <EmailDetail />
        </div>
      </PersistGate>
    </Provider>
  );
};

export default App;
