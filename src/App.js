import { Provider } from "react-redux";
import ResponsiveDrawer from "./components/ResponsiveDrawer";
import {store} from './util/store/Redux_store'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <ResponsiveDrawer />
      </Provider>
    </div>
  );
}

export default App;
