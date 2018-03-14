import * as React from "react";
import Button from "material-ui/Button";
declare let window: any;

interface IProps {
  isPlaying: boolean;
}
class MyPlayer extends React.Component<IProps, {}> {
  constructor(props: IProps, context: any) {
    super(props, context);
  }

  static defaultProps = {};

  render() {
    const DZ = window.DZ;
    return (
      <div>
        <Button
          style={{ fontSize: 20 }}
          value={this.props.isPlaying ? "Pause" : "Play"}
          onClick={() => {
            if (this.props.isPlaying) {
              DZ.player.pause();
            } else {
              DZ.player.play();
            }
          }}
        >Botó</Button>
      </div>
    );
  }
}

export default MyPlayer;
