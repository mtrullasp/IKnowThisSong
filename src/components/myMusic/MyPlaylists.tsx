import * as React from "react";
import { inject, observer } from "mobx-react";
import { AppState } from "../../stores/AppStore";
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
import { Route, withRouter } from "react-router";
import TextField from "material-ui/TextField";
import PlaylistTracks from "../PlaylistTracks";

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
class MyPlaylists extends React.Component<IProps, {}> {
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
        <GridListTile key="Subheader" cols={4} style={{ height: 50}}>
          <Subheader component="div">
          </Subheader>
          <Subheader component="div">
            <TextField
              id="filtreArtists"
              placeholder="Filter Artist"
              className={style({width: '100%', fontSize: 50})}
              margin="normal"
              onChange={(e: any) => {
                this.props.appState.filterByArtistNsme(e.target.value);
              }}
            />
          </Subheader>
        </GridListTile>
        {this.props.appState.userPlaylists.map((playlist, index) => (
          <GridListTile
            key={playlist.id}
            className={style({ cursor: "pointer" })}
            onClick={() => {
              //this.props.appState.artistIdActive = artist.id;
              debugger ;this.props.appState.goPlaylistTracks(playlist.id);
            }}
          >
            <img src={playlist.picture_medium} alt={playlist.title} />
            <GridListTileBar
              className={classes.gridTileBar}
              title={<span style={{ fontSize: 12 }}>{playlist.title}</span>}
              subtitle={
                <span style={{ fontSize: 11 }}>
                  {playlist.nb_tracks} traks and {playlist.fans} fans
                </span>
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
export default withRouter(withStyles(styles as any)(
  MyPlaylists as any
) as any);