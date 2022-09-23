import React from "react"

//react-mde from npm
import ReactMde from "react-mde"
//react-mde styling from https://github.com/andrerpena/react-mde#readme
import 'react-mde/lib/styles/css/react-mde-all.css';

//react-showdown from npm
import Showdown from "showdown"


export default function Editor({ currentNote, updateNote }) {
    
    const [selectedTab, setSelectedTab] = React.useState("write")

    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
    })  

    return (
        <section className="pane editor">
            <ReactMde
                value={currentNote.body}
                onChange={updateNote}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown) =>
                    Promise.resolve(converter.makeHtml(markdown))
                }
                minEditorHeight={80}
                heightUnits="vh"
            />
        </section>
    )
}
