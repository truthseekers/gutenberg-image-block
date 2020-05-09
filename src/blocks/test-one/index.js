console.log("welll here we are in the other block");

import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { RichText } from "@wordpress/editor";


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
        }
    },
    edit: function ({ className, attributes, setAttributes }) {
        let blockStyle = {
            backgroundColor: attributes.bgColor,
        }
        const { content } = attributes;
        return <div style={blockStyle} className="background-wrapper">
            <RichText
                tagName="p"
                className={className}
                onChange={(value) => {
                    setAttributes({ content: value, bgColor: "green" })
                    console.log("it works?");
                    console.log(attributes.bgColor);
                }}
                value={content}
                formattingControls={['bold']}
            />
            <RichText
                tagName="p"
                className={className}
                onChange={(value) => {
                    setAttributes({ bgColor: value })
                    console.log("it works?");
                    console.log(value);
                    console.log(attributes.bgColor);
                }}
                value={attributes.bgColor}
                formattingControls={['bold']}
            />
        </div>
    },
    save: () => {
        return <div> dunno what to do</div>
    }
});
