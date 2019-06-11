import 'babel-polyfill'
import * as React from 'react';
import * as ReactDOM from 'react-dom'
import { Editor, EditorState, RichUtils, DraftHandleValue, ContentState, SelectionState, Modifier, DraftEntityMutability} from 'draft-js';

const allEntities = [
    { id: 101, name: "Bugs Bunny" },
    { id: 102, name: "Tweety Bird" },
    { id: 103, name: "Daffy Duck" },
    { id: 104, name: "Tasmanian Devil" },
    { id: 105, name: "Porky Pig" },
    { id: 106, name: "Donald Duck" },
    { id: 107, name: "Pepe Le Pew" },
    { id: 108, name: "Elmer Fudd" },
    { id: 109, name: "Sylvester Cat" },
    { id: 110, name: "Speedy Gonzales" },
    { id: 111, name: "Yosemite Sam" },
    { id: 112, name: "Foghorn Leghorn" },
    { id: 113, name: "Road Runner" },
    { id: 114, name: "Wile E Coyote" }
]

const DraftJsEditor = function DraftJsEditor() {
    const [editorState, setEditorState] = React.useState(EditorState.createWithContent(ContentState.createFromText("\n\nEntity to link: Devon Aleshire")));//Initial State

    //Allows using key commands for Rich Styling Bold, Italic, Underline, and more.
    //https://draftjs.org/docs/quickstart-rich-styling
    const handleKeyCommand = (command, editorState): DraftHandleValue => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    const linkSelection = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const selectionState = editorState.getSelection();

        //Display Selected Text
        console.log(`Selected Text: ${getSelectedText(selectionState, editorState)}`)

        //showEntityLinkDialog(editorState.getSelection(), editorState.getCurrentContent(), editorState, setEditorState);
    };

    const toggleLinkStyle = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const newState = RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHT');
        setEditorState(newState);
    }

    //Create custom style mapping for highlighting selected text
    const styleMap = {
        'HIGHLIGHT': {
            backgroundColor: 'lightgreen'
        }
    };
    return (
        <div>
            <div className="tool-bar">
                <button type="button" onClick={toggleLinkStyle}>Link Entity</button>
            </div>
            <div id="editor">
                <Editor
                    customStyleMap={styleMap}
                    editorState={editorState}
                    onChange={editorState => setEditorState(editorState)}
                    handleKeyCommand={handleKeyCommand}
                />
            </div>
        </div>
    );
}

function getSelectedText(selectionState: SelectionState, editorState: EditorState) {
    var anchorKey = selectionState.getAnchorKey();
    var currentContent = editorState.getCurrentContent();
    var currentContentBlock = currentContent.getBlockForKey(anchorKey);
    var start = selectionState.getStartOffset();
    var end = selectionState.getEndOffset();
    return currentContentBlock.getText().slice(start, end);
}

ReactDOM.render(<DraftJsEditor />, document.getElementById('textEditor'))

//export default DraftJsEditor;


//import * as $ from 'jquery';
//import * as React from 'react';
//import * as ReactDOM from "react-dom";
//import DraftJsEditor from "./components/DraftJsPOC";

