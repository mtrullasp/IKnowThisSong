import * as React from "react";

interface IProps {
  src: string;
  width?: number;
  height?: number;
}
class DeezerPlayerFlash extends React.Component<IProps, {}> {
  constructor(props: IProps, context: any) {
    super(props, context);
  }

  static defaultProps = {
    width: "100%",
    height: 800
  };

  render() {
    return (
      <iframe
        scrolling="yes"
        frameBorder="0"
        style={{fontSize: 20}}
        allowTransparency={true}
        src={this.props.src}
        width={this.props.width}
        height={this.props.height}
      />
    );
  }
}

export default DeezerPlayerFlash;
