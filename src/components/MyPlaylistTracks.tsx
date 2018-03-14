import * as React from "react";
import { match } from "react-router";
import { AppState } from "../stores/AppStore";
import { inject } from "mobx-react";
import DeezerPlayerHTML5 from "./DeezerPlayerHTML5";
import DeezerPlayer from "./DeezerPlayerFlash";
import MyPlayer from "./myPlayer/MyPlayer";

declare let window: any;

interface IProps {
  match: match<any>;
  appState?: AppState;
}
@inject("appState")
class MyPlaylistTracks extends React.Component<IProps, {}> {
    constructor(props: IProps, context: any) {
      super(props, context);
    }

    static defaultProps = {};

    render() {
      const AppId = this.props.appState.APP_ID;
      const host = "https://www.deezer.com/plugins/";
      const playlistId: string = this.props.match.params['playlistId'];
/*
      const src: string = host + "player?format=classic&autoplay=true&playlist=true&width=700&height=550&color=007FEB&" +
        "layout=light&size=medium&type=playlist&limit=20&id=" + playlistId + "&" + AppId + "\\";
*/
      const DZ = window.DZ;
      DZ.player.playPlaylist(playlistId);

      return (
    	  <MyPlayer isPlaying={false}/>
      );
    }
}

export default MyPlaylistTracks;