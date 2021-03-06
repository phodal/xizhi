import React from 'react';
import Draft, {Editor, EditorState, SelectionState, ContentState, RichUtils, getDefaultKeyBinding} from 'draft-js';

import {StyleButton} from '../../components/Editor/StyleButton';
import {POEM} from "../../commons/constants/poem";
import {XizhiSidebar} from '../../components/Editor/XizhiSidebar';
import ContentHelper from "../../commons/utils/content.helper";

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

  mapKeyToEditorCommand(e: any) {
    return getDefaultKeyBinding(e);
  }

  handleKeyCommand(command: any, editorState: EditorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  }

  getBlockStyle(block: any) {
    switch (block.getType()) {
      case 'blockquote':
        return 'RichEditor-blockquote';
      default:
        return '';
    }
  }

  updateBlock() {
    let generateBlock = ContentHelper.contentBlock(POEM);
    function formatStyle(blockArray: ContentState) {
      let lastBlock = blockArray.getLastBlock();
      let lastBlockKey = lastBlock.getKey();

      let empty: SelectionState = Draft.SelectionState.createEmpty(lastBlockKey);
      empty.merge({
        anchorKey:lastBlock.getKey(),
        anchorOffset: 1,
        focusOffset: 100
      });

      let boldInline = Draft.Modifier.applyInlineStyle(blockArray, empty, 'BOLD');

      empty.merge({
        anchorKey:lastBlock.getKey(),
        anchorOffset: 20,
        focusOffset: 24
      });
      let finalStyle = Draft.Modifier.applyInlineStyle(boldInline, empty, 'ITALIC');
      return finalStyle
    }

    let fromBlockArray = Draft.ContentState.createFromBlockArray(generateBlock);
    let formatBlock = formatStyle(fromBlockArray);
    let content = Draft.EditorState.createWithContent(formatBlock);

    this.setState({
      editorState: content
    });
  }

  componentDidMount(): void {
    this.updateBlock();
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
      <div className="Xizhi-container">
        <div className="XizhiEditor-root">
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
              readOnly={true}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand.bind(this)}
              keyBindingFn={this.mapKeyToEditorCommand.bind(this)}
              blockStyleFn={this.getBlockStyle.bind(this)}
              onChange={this.onChange}/>
          </div>
        </div>
        <XizhiSidebar editorState={editorState}/>
      </div>
    )
  };
}

export default HomePage;
