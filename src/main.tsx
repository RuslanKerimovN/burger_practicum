import ReactDOM from 'react-dom/client';
import './main.css';
import { App } from './components/app/app';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { HashRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const store = setupStore();

root.render(
  <HashRouter>
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <App />
      </Provider>
    </DndProvider>
  </HashRouter>
);
