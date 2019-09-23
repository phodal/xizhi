import React, {Component, Props} from 'react';
import {Editor, EditorState} from 'draft-js';

interface HomeState {
  editorState: EditorState
}

class HomePage extends Component <any, HomeState>{
  constructor(props: any) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
  }

  onChange = (editorState: EditorState) => {
    return this.setState({editorState});
  };

  render() {
    return (
      <div className="home">
        <Editor editorState={this.state.editorState} onChange={this.onChange}/>
      </div>
    )
  };
}

export default HomePage;
