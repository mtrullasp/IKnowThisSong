import * as React from "react";
import FavoriteComposers from "./FavoriteComposers";
import { Grid, Row, Col } from "react-flexbox-grid";
import styled from "styled-components";
import { style } from "typestyle";
import { inject, observer } from "mobx-react";
import { AppState } from "../stores/AppStore";
import { CSSProperties } from "react";

const HEADER_HEIGHT = 150;
interface IProps {
  appState?: AppState;
}
@inject("appState")
@observer
class App extends React.Component<IProps, {}> {
  constructor(props: IProps, context: any) {
    super(props, context);
  }

  static defaultProps = {};

  render() {
    const store = this.props.appState;
    const titleStyle: CSSProperties = {
      fontSize: 100,
      color: "#36454f",
      fontFamily: "Amatic SC",
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
                        fontSize: 12,
                        display: "block",
                        position: "relative",
                        left: 10,
                        top: "-15px"
                      }}
                    >
                      {" "}
                      by{" "}
                      <a href="http://twitter.com/CalDirHo">Moisès Trullàs</a>
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
                      style={{ width: "100%" }}
                    />
                  </Col>
                </Row>
              </Col>
              <Col lg={8}>
                <Row className={style({ height: HEADER_HEIGHT })}>
                  <Col lg={2}>
                    <img
                      src="../../img/transparentPlay.png"
                      style={{ height: store.isPlayHover ? "110%" : "100%", cursor: "pointer" }}
                      onMouseEnter={() => store.setPlayHover(true)}
                      onMouseLeave={() => store.setPlayHover(false)}
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
                    <div
                      style={{
                        width: "100%",
                        fontFamily: "Amatic SC",
                        bold: "700",
                        fontSize: 30
                      }}
                    >
                      My Favorite Composers
                    </div>
                    <FavoriteComposers />
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

export default App;
