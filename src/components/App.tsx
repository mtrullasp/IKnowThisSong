///<reference path="../../node_modules/@types/react-router/index.d.ts"/>
import * as React from "react";
import Artists, { default as MyArtists } from "./myMusic/MyArtists";
import { Grid, Row, Col } from "react-flexbox-grid";
import styled from "styled-components";
import { style } from "typestyle";
import { inject, observer } from "mobx-react";
import { AppState } from "../stores/AppStore";
import { CSSProperties } from "react";
import { Route, withRouter } from "react-router";
import ArtistTracks from "./ArtistTracks";
import TextField from "material-ui/TextField";
import MyMusic from "./myMusic/MyMusic";
import {
  FUNNY_FONT, INFO_FONT,
  ROUTE_INTERPRETERS,
  ROUTE_PLAYLIST,
  ROUTE_PLAYLISTS
} from "../util/constants";
import PlaylistTracks from "./PlaylistTracks";
import MyPlaylists from "./myMusic/MyPlaylists";
import SwipeableViews from "react-swipeable-views";
import MyPlaylistTracks from "./MyPlaylistTracks";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";

const theme = createMuiTheme({
  overrides: {
    MuiListItemText: {
      primary: {
        fontSize: 26,
        fontFamily: INFO_FONT
      },
      secondary: {
        color: "#6b5e51",
        fontSize: 24,
        fontFamily: INFO_FONT
      }
    }
  }
});

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    fontFamily: "Amatic SC",
    fontSize: 50,
    width: "100%"
  },
  menu: {
    width: 200
  }
};

//const HEADER_HEIGHT = 150;
interface IProps {
  appState?: AppState;
  history?: any;
}
@inject("appState")
@observer
class App extends React.Component<IProps, {}> {
  constructor(props: IProps, context: any) {
    super(props, context);
    //const {history} = props;
    props.appState.setHistory(this.props.history);
    props.appState.go(ROUTE_INTERPRETERS);
  }

  static defaultProps = {};

  render() {
    const store = this.props.appState;
    const titleStyle: CSSProperties = {
      fontSize: 80,
      color: "#36454f",
      fontFamily: FUNNY_FONT,
      fontWeight: 900,
      bold: "900",
      alignSelf: "flex-end"
    };
    const overlayImageStyle: CSSProperties = {
      position: "relative",
      top: 0,
      left: 0
    };
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <header>
            <Grid
              fluid
              className={style({
                margin: 0,
                padding: 0,
                overflowX: "hidden",
                overflowY: "auto"
              })}
            >
              <Row>
                <Col lg={4}>
                  <Row>
                    <Col lg={12}>
                      <div id="titolº" style={titleStyle}>
                        I KNOW THIS SONG
                      </div>
                      <span
                        style={{
                          fontFamily: "verdana",
                          fontSize: 12,
                          display: "block",
                          position: "relative",
                          left: 10,
                          top: "-15px"
                        }}
                      >
                        <a href="http://twitter.com/CalDirHo">
                          by Moisès Trullàs
                        </a>
                      </span>
                    </Col>
                    <Col lg={12}>
                      <div style={{ marginBottom: 10 }}>
                        <div>
                          <span>Powered by </span>
                          <a href="http://www.deezer.com" target="_blank">
                            <img src="../../img/deezer.png" />
                          </a>
                        </div>
                      </div>
                    </Col>
                    <Col
                      className={style({
                        width: "100%",
                        height: "100%",
                        margin: 10
                      })}
                    >
                      <div id="overlayCcontainer">
                        <img
                          onClick={() => {this.props.appState.goBack()}}
                          src={"../../img/" + this.props.appState.imageSide}
                          style={{
                            width: "100%",
                            cursor: "pointer",
                            ...overlayImageStyle
                          }}
                        />
                        {/*
                      <img
                        src={'../../img/' + this.props.appState.imageSizeOverlay}
                        style={{ width: "100%", cursor: "pointer", opacity: 1, zIndex: 100, ...overlayImageStyle }}
                        onClick={() => {
                          this.props.appState.playerTogglePlay();
                        }}
                      />
*/}
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col lg={8}>
                  {/*
                <Row className={style({ height: HEADER_HEIGHT })}>
                  <Col lg={2}>
                    <img
                      src="../../img/transparentPlay.png"
                      style={{
                        height: store.isPlayHover ? "110%" : "100%",
                        cursor: "pointer"
                      }}
                      onMouseEnter={() => store.setPlayHover(true)}
                      onMouseLeave={() => store.setPlayHover(false)}
                      onClick={() => {
                        const state = this.props.appState;
                        state.goArtistTracks(state.artistIdActive);
                      }}
                    />
                  </Col>
                  <Col lg={8}>
                    <label style={{ ...titleStyle, textAlign: "left" }}>
                      {store.statusPlay}
                    </label>
                  </Col>
                </Row>
*/}
                  <Row>
                    <Col lg={12}>
                      <div style={{ marginTop: 30 }}>
                        <MyMusic />
                      </div>
                      {/*<SwipeableViews>*/}
                      <Route path={ROUTE_INTERPRETERS} component={MyArtists} />
                      <Route
                        path={"/Me/Playlist/:playlistId/Tracks"}
                        component={MyPlaylistTracks}
                        exact
                      />
                      <Route
                        path={ROUTE_PLAYLISTS}
                        component={MyPlaylists}
                        exact
                      />
                      <Route
                        path={ROUTE_PLAYLIST}
                        component={MyPlaylistTracks}
                        exact
                      />
                      {/*</SwipeableViews>*/}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Grid>
          </header>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(App as any);
