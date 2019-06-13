import 'babel-polyfill'
import * as React from 'react';
import * as ReactDOM from 'react-dom'
import { Editor, EditorState, RichUtils, DraftHandleValue, ContentState, SelectionState, Modifier, CompositeDecorator } from 'draft-js';
import getRangesForDraftEntity from 'draft-js/lib/getRangesForDraftEntity'

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

const linkedEntities = [];

const styles = {
    linkedEntity: {
        backgroundColor: 'lightgreen'
    }
}

const DraftJsEditor = function DraftJsEditor() {

    //Set up composite decorator for linked entities
    const entityStrategy = (contentBlock, callback, contentState) => {
        contentBlock.findEntityRanges(
            (character) => {
                const entityKey = character.getEntity();
                return (
                    entityKey !== null &&
                    contentState.getEntity(entityKey).getType() === 'LINKED-ENTITY'
                );
            },
            callback
        );
    }
    //Decorator Component
    //https://draftjs.org/docs/advanced-topics-decorators.html#decorator-components
    const entitySpan = (props) => {
        const entity = props.contentState.getEntity(props.entityKey);
        console.log(`Entity Id: ${entity.data.entityId}`)
        return <span className="linked-entity" data-anchoroffset={entity.data.anchorOffset} data-focusoffset={entity.data.focusOffset} data-entity-id={entity.data.entityId} data-draftjs-entity-key={props.entityKey} data-offset-key={props.offsetKey} style={styles.linkedEntity}>{props.decoratedText}</span>
    }

    const compositeDecorator = new CompositeDecorator([{
        strategy: entityStrategy,
        component: entitySpan
    }])

    const [editorState, setEditorState] = React.useState(EditorState.createWithContent(ContentState.createFromText("\n\nEntity to link: Devon Aleshire\n\nAnother Entity to link: 555-555-5555\n\nAnother Entity to link: email@email.com"), compositeDecorator));//Initial State

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

    const setMetaData = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const selectionState = editorState.getSelection();
        var anchorKey = selectionState.getAnchorKey();
        var currentContent = editorState.getCurrentContent();
        var currentContentBlock = currentContent.getBlockForKey(anchorKey);
        var start = selectionState.getStartOffset();
        var end = selectionState.getEndOffset();
    }

    const linkEntity = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        //Highlight Text
        //const newState = RichUtils.toggleInlineStyle(currentState, 'HIGHLIGHT');

        const contentState = editorState.getCurrentContent();
        const entityId = 1;
        const entityName = getSelectedText(editorState.getSelection(), editorState)

        //Apply entity Id to ContentBlock
        const newEditorState = createEntity(editorState.getSelection(), editorState, 1);

        //Store Created Entity
        linkedEntities.push({ id: entityId, entityKey: editorState.getCurrentContent().getLastCreatedEntityKey(), name: entityName })

        refreshLinkedEntitesList();
        setEditorState(newEditorState);
    }

        const unlinkEntity = (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();

            const entityKey = "1";
            const selectionState = editorState.getSelection();
            const currentContent = editorState.getCurrentContent();

            //Get Entity
            const entity = currentContent.getEntity(entityKey)
            const data = entity.getData()
            console.log('Focus Offset: ', data.focusOffset)

            //Unlink Entity
            const newContentState = Modifier.applyEntity(currentContent, selectionState, null);
            const newEditorState = EditorState.push(editorState, newContentState, 'undo')
            setEditorState(newEditorState)
        }

    const removeEntity = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const entityKey = "1";
        const selectionState = editorState.getSelection();
        const contentState = editorState.getCurrentContent();

        //Get Entity
        const entity = contentState.getEntity(entityKey)
        const data = entity.getData()
        console.log(`Selection State: ${data.selectionState}`)

        //Unlink Entity
        const newContentState = Modifier.applyEntity(contentState, data.selectionState, null);
        const newEditorState = EditorState.push(editorState, newContentState, 'apply-entity')
        setEditorState(newEditorState)

        //const offsetKey = data.offsetKey;
        //const anchorOffset = data.anchorOffset;
        //const focusOffset = data.focusOffset;

        //console.log(`Anchor Offset: ${anchorOffset}`)
        //console.log(`Focus Offset: ${focusOffset}`)
        //console.log(`Offset Key: ${data.offsetKey}`)

        ////Set the selection context
        //const block = contentState.getBlockForKey(data.offsetKey);
        //const blockKey = block.getKey();

        //console.log(`Block Key: ${blockKey}`)

        //let entitySelection;
        //getRangesForDraftEntity(block, blockKey).forEach((range) => {
        //    if (range.start <= anchorOffset && anchorOffset <= range.end) {
        //        entitySelection = new SelectionState({
        //            anchorOffset: range.start,
        //            anchorKey: blockKey,
        //            focusOffset: range.end,
        //            focusKey: blockKey,
        //            isBackward: false,
        //            hasFocus: selectionState.getHasFocus(),
        //        });
        //    }
        //});

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
                <button type="button" onClick={setMetaData}>Set Data to Element</button>
                <button type="button" onClick={linkEntity}>Link Selected Entity</button>
                <button type="button" onClick={unlinkEntity}>Unlink Entity</button>
                <button type="button" onClick={removeEntity}>Remove Entity</button>
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

function createEntity(selectionState: SelectionState, editorState: EditorState, entityId: Number) {
    //Create Entity
    const selectedText = getSelectedText(selectionState, editorState)
    const currentContent = editorState.getCurrentContent();
    const newContentState = currentContent.createEntity('LINKED-ENTITY', 'MUTABLE', { selectedText: selectedText, entityId: entityId, anchorOffset: selectionState.getAnchorOffset(), focusOffset: selectionState.getFocusOffset(), selectionState: selectionState });
    console.log(`Entity Key: ${newContentState.getLastCreatedEntityKey()}`)
    const textWithEntity = Modifier.applyEntity(newContentState, selectionState, newContentState.getLastCreatedEntityKey());
    const newEditorState = EditorState.push(editorState, textWithEntity, 'apply-entity')

    //Get Created Entity
    const e = editorState.getCurrentContent().getEntity(textWithEntity.getLastCreatedEntityKey())
    return newEditorState;
}

const refreshLinkedEntitesList = function () {

    //document.querySelectorAll("span.linked-entity").forEach((entity) => {
    //    const id = $(entity).data("entity-id")

    //    if (!linkedEntities.find(x => x.id === id)) {
    //        const entity = allEntities.find(x => x.id === id)
    //        const name = entity.name

    //        linkedEntities.push({ id: id, name: name })
    //    }
    //})

    linkedEntities.sort((x, y) => (x.name > y.name) ? 1 : -1)

    let htmlString: string = ""

    linkedEntities.forEach(x => {
        htmlString += `<li data-linkedentityid="${x.id}" data-entitykey="${x.entityKey}">${x.name} <i class="fas fa-times unlink"></i></li>`
    })

    document.getElementById("linkedEntitiesList").innerHTML = htmlString
}
ReactDOM.render(<DraftJsEditor />, document.getElementById('textEditor'))


