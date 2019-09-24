import React from "react";

export class StyleButton extends React.Component<any, any> {
  onToggle = (e: any) => {
    e.preventDefault();
    this.props.onToggle(this.props.style);
  };

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }
    return (
      <span className={className} onMouseDown={this.onToggle}>
              {this.props.label}
            </span>
    );
  }
}
