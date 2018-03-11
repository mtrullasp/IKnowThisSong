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
           data-src="http://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=charts&id=user_650927051&title=wirtaw&app_id=1"
           data-scrolling="no" data-frameborder="0" data-allowTransparency="true" data-width="700"
           data-height="350"></div>
    );
/*
    return (
      <div>
      <script>
        (function(d, s, id) {
        var js, djs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "https://e-cdns-files.dzcdn.net/js/widget/loader.js";
        djs.parentNode.insertBefore(js, djs);
      }(document, "script", "deezer-widget-loader"));</script>
      <div className="deezer-widget-player"
           data-src={this.props.src}
           data-scrolling="yes" data-frameborder="0" data-allowTransparency="false" data-width="700"
           data-height="350"></div>
      </div>
    );
*/
  }
}

export default DeezerPlayerHTML5;
