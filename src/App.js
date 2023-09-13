import { Provider } from "react-redux";

import BaseRoutes from "./Routing/routes";
import store from "./Redux/Store/Store";
import "./App.css";

export default function App() {
  return (
    <Provider store={store}>
      <BaseRoutes />
    </Provider>
  );
}
