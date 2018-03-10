import * as React from "react";
import { AppState, IMyTab } from "../stores/AppStore";
import { inject, observer } from "mobx-react";
import { FANCY_FONT } from "../util/constants";

interface IProps {
  appState?: AppState;
}
@inject("appState")
@observer
class MyTab extends React.Component<IProps, {}> {
  constructor(props: IProps, context: any) {
    super(props, context);
  }

  static defaultProps = {};

  render() {
    const Tabs = this.props.appState.tabDataSet.map((tab, index: number) => {
      const fontSize = this.props.appState.tabActiveIndex === index ? 50 : 40;
      const fontWeight = this.props.appState.tabActiveIndex === index ? 900 : 200;
      return (
        <li
          key={index}
          style={{
            fontFamily: FANCY_FONT,
            fontSize: fontSize,
            fontWeight: fontWeight,
            display: "inline",
            cursor: "pointer",
            marginRight: 40
          }}
          onClick={(e: any) => {
            debugger ;this.props.appState.setTabActiveIndex(index);
          }}
        >{tab.title}</li>
      );
    });
    return <ul style={{ listStyleType: "none", display: "inline", padding: 0 }}>{Tabs}</ul>;
  }
}

export default MyTab;