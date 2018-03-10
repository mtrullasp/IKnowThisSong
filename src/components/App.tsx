///<reference path="../../node_modules/@types/react-router/index.d.ts"/>
import * as React from "react";
import FavoriteComposers, {
  default as MyFavoriteComposers
} from "./myMusic/MyFavoriteComposers";
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
  FANCY_FONT,
  ROUTE_FAVORITES,
  ROUTE_PLAYLISTS
} from "../util/constants";
import PlaylistTracks from "./PlaylistTracks";
import MyPlaylists from "./myMusic/MyPlaylists";
import SwipeableViews from "react-swipeable-views";

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

const HEADER_HEIGHT = 150;
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
    props.appState.go(ROUTE_FAVORITES);
  }

  static defaultProps = {};

  render() {
    const store = this.props.appState;
    const titleStyle: CSSProperties = {
      fontSize: 100,
      color: "#36454f",
      fontFamily: FANCY_FONT,
      fontWeight: 900,
      bold: "900",
      alignSelf: "flex-end"
    };
    return (
      <div>
        <header>
          <Grid fluid className={style({ margin: 0, padding: 0 })}>
            <Row>
              <Col lg={4}>
                <Row>
                  <Col lg={12} className={style({ height: HEADER_HEIGHT })}>
                    <span style={titleStyle}>I KNOW THIS SONG</span>
                    <span
                      style={{
                        fontFamily: "verdana",
                        fontSize: 12                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ,
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
                  <Col
                    className={style({
                      width: "100%",
                      height: "100%",
                      margin: 0
                    })}
                  >
                    <img
                      src="../../img/gramophone.png"
                      style={{ width: "100%", cursor: "pointer" }}
                      onClick={() => {
                        this.props.appState.goBack();
                      }}
                    />
                  </Col>
                </Row>
              </Col>
              <Col lg={8}>
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
                <Row>
                  <Col lg={12}>
                    <MyMusic />
                    {/*<SwipeableViews>*/}
                      <Route
                        path={ROUTE_FAVORITES}
                        component={MyFavoriteComposers}
                      />
                      <Route
                        path={"/Me/Playlist/:playlistId/Tracks"}
                        component={PlaylistTracks}
                        exact
                      />
                      <Route
                        path={ROUTE_PLAYLISTS}
                        component={MyPlaylists}
                        exact
                      />
                    {/*</SwipeableViews>*/}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Grid>
        </header>
        <div style={{ marginBottom: 10 }}>
          <div style={{ position: "absolute", right: 10, top: 10 }}>
            <span>Streaming partner </span>
            <a href="http://www.deezer.com" target="_blank">
              <img src="../../img/deezer.png" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(App as any);
