import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {observable} from "mobx";
import {observer, Provider} from "mobx-react";
import {AppState} from "./stores/AppStore";
import App from "./components/App";
import {BrowserRouter} from "react-router-dom";

const appState: AppState = new AppState();
appState.login();

ReactDOM.render(
  (<Provider appState={appState}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>), document.getElementById('dz-root')
);
document.getElementById('dz-root').style.width = "auto";
document.getElementById('dz-root').style.height = "auto";