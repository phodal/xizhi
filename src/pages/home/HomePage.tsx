import React from 'react';
import Draft, {Editor, EditorState, ContentState, RichUtils} from 'draft-js';
import {StyleButton} from '../../components/Editor/StyleButton';
import {POEM} from "../../commons/constants/poem";

const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'Quote', style: 'blockquote'},
  {label: "Bullets", style: "unordered-list-item"},
  {label: "Numbers", style: "ordered-list-item"}
];

const INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'}
];

const InlineStyleControls = (props: any) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="xizhi-inline-controls">
      {INLINE_STYLES.map((type) =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

const BlockStyleControls = (props: any) => {
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return (
    <div className="xizhi-block-controls">
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

class HomePage extends React.Component <{}, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      editorState: EditorState.createWithContent(
        ContentState.createFromText(POEM)
      )
    };
  }

  onChange = (editorState: EditorState) => {
    return this.setState({editorState});
  };

  toggleBlockType(blockType: any) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  toggleInlineStyle(inlineStyle: any) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  focus = () => {
    // return this.refs.editor.focus();
  };

  getBlockStyle(block: any) {
    switch (block.getType()) {
      case 'blockquote':
        return 'RichEditor-blockquote';
      default:
        return '';
    }
  }

  render() {
    console.log(this.state);
    const {editorState} = this.state;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <div className="RichEditor-root">
        <div className="xizhi-toolbar">
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle.bind(this)}
          />
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType.bind(this)}
          />
        </div>
        <div className={className} onClick={this.focus}>
          <Editor
            editorState={editorState}
            blockStyleFn={this.getBlockStyle.bind(this)}
            onChange={this.onChange}/>
        </div>
      </div>
    )
  };
}

export default HomePage;
