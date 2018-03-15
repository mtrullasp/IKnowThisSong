import * as React from "react";
import Button from "material-ui/Button";
import { inject, observer } from "mobx-react";
import { AppState } from "../../stores/AppStore";
import List, { ListItem, ListItemText } from "material-ui/List";
import { FANCY_FONT, SELECTED_COLOR } from "../../util/constants";
import Typography from "material-ui/Typography";
import { style } from "typestyle";
declare let window: any;

interface IProps {
  appState?: AppState;
}
@inject("appState")
@observer
class MyPlayer extends React.Component<IProps, {}> {
  constructor(props: IProps, context: any) {
    super(props, context);
  }

  static defaultProps = {};

  render() {
    //const DZ = window.DZ;
    const state = this.props.appState;
    const items = this.props.appState.activeTracksList.map((track, index) => {
      return (
        <ListItem
          style={{
            background:
              index === this.props.appState.activeTrackIndex
                ? SELECTED_COLOR
                : "transparent"
          }}
          button
          component="a"
          href="#simple-list"
          onClick={() => {
            debugger ;if (
              state.playerIsPlaying &&
              this.props.appState.activeTrackIndex === index
            ) {
              this.props.appState.activeTrackIndex = -1;
              state.playerPause();
            } else {
              this.props.appState.activeTrackIndex = index;
              debugger;
              state.playerPlayPlaylist(
                this.props.appState.activePlayListId,
                true,
                index
              );
            }
            /*
            DZ.player.pause();
            DZ.player.seek(index);
            DZ.player.play();
*/
          }}
        >
          <ListItemText
            key={index}
            primary={track.album.title}
            secondary={track.title}
            className={style({ fontFamily: FANCY_FONT, fontSize: 20 })}
          />
        </ListItem>
      );
    });
    return (
      <div>
        <List>{items}</List>
      </div>
    );
  }
}

export default MyPlayer;
