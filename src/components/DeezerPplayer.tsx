import * as React from "react";

interface IProps {
  src: string;
  width: number;
  height: number;
}
class DeezerPlayer extends React.Component<IProps, {}> {
  constructor(props: IProps, context: any) {
    super(props, context);
  }

  static defaultProps = {
    width: 700,
    height: 50
  };

  render() {
    return (
      <iframe
        scrolling="no"
        frameBorder="0"
        allowTransparency={true}
        src={this.props.src}
        width={this.props.width}
        height={this.props.height}
      />
    );
  }
}

export default DeezerPlayer;
