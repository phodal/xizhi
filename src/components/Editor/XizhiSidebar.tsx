import React from "react";

export class XizhiSidebar extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <div className="xizhi-sidebar">
        <span>Toolbar</span>
      </div>
    );
  }
}
