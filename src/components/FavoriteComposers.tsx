import * as React from "react";
import {inject, observer} from "mobx-react";
import {AppState} from "../stores/AppStore";
//import GridList, { GridListTile,  GridListTileBar } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import IconButton from "material-ui/IconButton";
import InfoIcon from 'material-ui-icons/Info';
import withStyles, {ClassNameMap} from "material-ui/styles/withStyles";
import {Grid, Row, Col} from "react-flexbox-grid";
//import GridListTile, {default as GridListTileBar} from "material-ui";
import GridList, {GridListTile, GridListTileBar} from "material-ui/GridList";
import Paper from "material-ui/Paper";

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    /*overflow: 'hidden',*/
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    height: 'auto',
    /*overflowY: 'hidden'*/
  },
  gridTileBar: {
    fontSize: 9
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

interface IProps {
  appState?: AppState;
  classes?: ClassNameMap<string>;
}
@inject("appState")
@observer
class FavoriteComposers extends React.Component<IProps, {}> {
    constructor(props: IProps, context: any) {
        super(props, context);
    }

  renderItem(index, key) {
    return <div key={key}><img src={this.props.appState.userArtists[index].picture_medium}/></div>;
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
            {this.props.appState.userArtists.map((artist, index) => (
              <GridListTile key={artist.id}>
                <img src={artist.picture_medium} alt={artist.name} />
                <GridListTileBar
                  className={classes.gridTileBar}
                  title={<span style={{fontSize: 12}}>{artist.name}</span>}
                  subtitle={<span style={{fontSize: 11}}>{artist.nb_album} àlbumsi {artist.nb_fan} fans</span>}
                  actionIcon={
                    <IconButton className={classes.icon}>
                      <a href={artist.link}><InfoIcon /></a>
                    </IconButton>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
      );
    }
}

//export default App;
export default withStyles(styles as any)(FavoriteComposers as any);