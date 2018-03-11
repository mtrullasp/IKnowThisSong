import * as React from "react";
import { inject, observer } from "mobx-react";
import { AppState, DZ } from "../../stores/AppStore";
//import GridList, { GridListTile,  GridListTileBar } from 'material-ui/GridList';
import Subheader from "material-ui/List/ListSubheader";
import IconButton from "material-ui/IconButton";
import InfoIcon from "material-ui-icons/Info";
import withStyles, { ClassNameMap } from "material-ui/styles/withStyles";
import { Grid, Row, Col } from "react-flexbox-grid";
//import GridListTile, {default as GridListTileBar} from "material-ui";
import GridList, { GridListTile, GridListTileBar } from "material-ui/GridList";
import Paper from "material-ui/Paper";
import { style } from "typestyle";
import { EventHandler } from "react";
import { withRouter } from "react-router";
import TextField from "material-ui/TextField";
import { FANCY_FONT } from "../../util/constants";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    /*overflow: 'hidden',*/
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: "100%",
    height: "auto"
    /*overflowY: 'hidden'*/
  },
  gridTileBar: {
    fontSize: 9
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  }
});

interface IProps {
  appState?: AppState;
  classes?: ClassNameMap<string>;
  history?: any;
  fontSize?: number;
}
@inject("appState")
@observer
class MyArtists extends React.Component<IProps, {}> {
  constructor(props: IProps, context: any) {
    super(props, context);
  }

  static defaultProps: Partial<IProps> = {
    fontSize: 40
  };

  renderItem(index, key) {
    return (
      <div key={key}>
        <img src={this.props.appState.userArtists[index].picture_medium} />
      </div>
    );
  }

  render() {
    const classes: ClassNameMap<string> = this.props.classes;
    /*
      const imatges = this.props.appState.userArtists.map(art => {
        return <Col lg={3}><img src={art.picture_medium} style={{display: "inline"}}/></Col>
      });
      return (0
        <Grid fluid={true}>
          <Row>
            {imatges}
          </Row>
        </Grid>
      );
*/
    /*
      return (<div style={{overflow: 'auto', maxHeight: 400}}>
        <ReactList
          itemRenderer={this.renderItem}
          length={this.props.appState.userArtists.length}
          type='uniform'
        />
      </div>)
*/
    return (
      <GridList cellHeight={300} cols={4}>
        <GridListTile
          key="Subheader"
          cols={4}
          style={{ height: 40, padding: 0, margin: 0 }}
        >
          <Subheader component="div" style={{ margin: 0, padding: 0 }}>
            <TextField
              id="filtreArtists"
              placeholder={this.props.appState.filterByKindArtist}
              className={style({
                width: "100%",
                fontSize: 50,
                fontFamily: FANCY_FONT
              })}
              margin="none"
              onChange={(e: any) => {
                this.props.appState.filterByArtistNsme(e.target.value);
              }}
            />
          </Subheader>
        </GridListTile>
        {this.props.appState.userArtists.map((artist, index) => (
          <GridListTile
            key={artist.id}
            className={style({ cursor: "pointer" })}
            onClick={() => {
              //this.props.appState.artistIdActive = artist.id;
              //this.props.appState.goArtistTracks(artist.id);
              this.props.appState.toggleComposer(artist.id);
              /*
              DZ.api("artist/" + artist.id + "/comments", "POST", {
                comment: '{"composer": true}'
              });
*/
            }}
          >
            <img src={artist.picture_medium} alt={artist.name} />
            <GridListTileBar
              className={classes.gridTileBar}
              title={<span style={{ fontSize: 12 }}>{artist.name}</span>}
              subtitle={
                <div>
                  <span style={{ fontSize: 11 }}>
                    {artist.nb_album} àlbumsi {artist.nb_fan} fans
                  </span>
                  <span
                    style={{
                      display: "flexbox",
                      justifyContent: "flex-end",
                      fontSize: 14,
                      color: "white"
                    }}
                  >
                    {artist.isComposer ? "Composer" : ""}
                  </span>
                </div>
              }
              /*
                  actionIcon={
                    <IconButton className={classes.icon}>
                      <a href={artist.link}><InfoIcon /></a>
                    </IconButton>
                  }
*/
            />
          </GridListTile>
        ))}
      </GridList>
    );
  }
}

//export default App;
export default withRouter(withStyles(styles as any)(MyArtists as any) as any);
