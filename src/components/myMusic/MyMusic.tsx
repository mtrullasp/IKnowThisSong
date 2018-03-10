import * as React from "react";
import ArtistTracks from "../ArtistTracks";
import FavoriteComposers, {
  default as MyFavoriteComposers
} from "./MyFavoriteComposers";
import { Route, Switch } from "react-router";
import { ROUTE_FAVORITES, ROUTE_PLAYLISTS } from "../../util/constants";
import { CSSProperties } from "react";
import Tabs, { Tab } from "material-ui/Tabs";
import AppBar from "material-ui/AppBar";
import SwipeableViews from "react-swipeable-views";
import MyPlaylists from "./MyPlaylists";
import { AppState } from "../../stores/AppStore";
import { inject, observer } from "mobx-react";
import Typography from "material-ui/Typography";
import { Link } from "react-router-dom";
import PlaylistTracks from "../PlaylistTracks";
import MyTab from "../MyTab";

interface IProps {
  appState?: AppState;
}
@inject("appState")
@observer
class MyMusic extends React.Component<IProps, {}> {
  constructor(props: IProps, context: any) {
    super(props, context);
  }

  static defaultProps = {};

  render() {
    const style: CSSProperties = {
      width: "100%",
      fontFamily: "Amatic SC",
      bold: "700",
      fontSize: 40,
      fontWeight: 900
    };
    const liStyle: CSSProperties = {
      display: "inline"
    };
    return (
      <div>
        <MyTab />
{/*
        <Route path={ROUTE_FAVORITES} component={MyFavoriteComposers} />
        <Route
          path={"/Me/Playlist/:playlistId/Tracks"}
          component={PlaylistTracks}
          exact
        />
        <Route path={ROUTE_PLAYLISTS} component={MyPlaylists} exact />
*/}
      </div>
    );
  }
}

export default MyMusic;
