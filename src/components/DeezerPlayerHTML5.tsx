import * as React from "react";

interface IProps {
  src: string;
  width?: number;
  height?: number;
}
class DeezerPlayerHTML5 extends React.Component<IProps, {}> {
  constructor(props: IProps, context: any) {
    super(props, context);
  }

  static defaultProps = {
    width: 700,
    height: 500
  };

  render() {
    console.log(this.props.src);
    return (
      <div className="deezer-widget-player"
           data-src={this.props.src}
           data-scrolling="no" data-frameborder="0" data-allowTransparency="true" data-width="700"
           data-height="350"></div>
    );
  }
}

export default DeezerPlayerHTML5;
