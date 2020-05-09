console.log("welll here we are in the other block");

import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { RichText } from "@wordpress/editor";
import { AlignmentToolbar, BlockControls } from "@wordpress/block-editor";


// const blockStyle = {
//     backgroundColor: '#900',
//     color: '#fff',
//     padding: '20px',
// };


// This is working even though its not registered in PHP. why?
registerBlockType('jsc-courses/test-one', {
    title: 'test one',
    description: __('a test for stuff', 'jsc-courses'),
    icon: 'smiley',
    category: 'layout',
    attributes: {
        content: {
            type: 'string'
        },
        bgColor: {
            type: 'string'
        },
        alignment: {
            type: 'string',
            default: 'none',
        },
    },
    //edit: function ({ className, attributes, setAttributes }) {
    edit: function (props) {
        let blockStyle = {
            backgroundColor: props.attributes.bgColor,
        }
        console.log(props);
        const { content } = props.attributes;
        const onChangeAlignment = (newAlignment) => {
            console.log("new alignment. ");
            props.setAttributes({ alignment: newAlignment });
        };
        return <div style={blockStyle} className="background-wrapper">
            <BlockControls>
                <AlignmentToolbar
                    value={props.attributes.alignment}
                    onChange={onChangeAlignment}
                />
            </BlockControls>
            <RichText
                tagName="p"
                className={props.className}
                style={{ textAlign: props.attributes.alignment }}
                onChange={(value) => {
                    setAttributes({ content: value })
                    console.log("it works?");
                    console.log(attributes.bgColor);
                }}
                value={content}
            // formattingControls={['bold']} // This... Property? Isn't in the documentation for some reason.
            />
            <RichText
                tagName="p"
                className={props.className}
                onChange={(value) => {
                    props.setAttributes({ bgColor: value })
                    console.log("it works?");
                    console.log(value);
                    console.log(props.attributes.bgColor);
                }}
                value={props.attributes.bgColor}
                formattingControls={['bold']}
            />
        </div>
    },
    save: () => {
        return <div> dunno what to do</div>
    }
});
