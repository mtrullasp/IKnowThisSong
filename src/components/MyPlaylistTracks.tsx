import * as React from "react";
import { match } from "react-router";
import { AppState, IResponseCollection, ITrack } from "../stores/AppStore";
import { inject, observer } from "mobx-react";
import DeezerPlayerHTML5 from "./DeezerPlayerHTML5";
import DeezerPlayer from "./DeezerPlayerFlash";
import MyPlayer from "./myPlayer/MyPlayer";

declare let window: any;

interface IProps {
  match: match<any>;
  appState?: AppState;
}
@inject("appState")
@observer
class MyPlaylistTracks extends React.Component<IProps, {}> {
  constructor(props: IProps, context: any) {
    super(props, context);
    debugger;
    props.appState.activeTracksList = [];
    const AppId = this.props.appState.APP_ID;
    const host = "https://www.deezer.com/plugins/";
    const playlistId: number = parseFloat(
      this.props.match.params["playlistId"]
    );
    props.appState.activePlayListId = playlistId;
    const DZ = window.DZ;
    /*
            const src: string = host + "player?format=classic&autoplay=true&playlist=true&width=700&height=550&color=007FEB&" +
              "layout=light&size=medium&type=playlist&limit=20&id=" + playlistId + "&" + AppId + "\\";
      */
/*
    DZ.player.playPlaylist(playlistId, false, 0, 0, resp => {
      this.props.appState.activeTracksList = resp.tracks;
    });
*/
    DZ.api("/playlist/" + playlistId + "/tracks?limit=1000", (tracks: IResponseCollection<ITrack>) => {
      debugger ;this.props.appState.activeTracksList = tracks.data;
      tracks.data.forEach(track => {
        DZ.api("/track/" + track.id, trackAmpliat => {
          debugger ;track = trackAmpliat;
        })
      })
    });
  }

  static defaultProps = {};

  render() {
    return <MyPlayer />;
  }
}

export default MyPlaylistTracks;
