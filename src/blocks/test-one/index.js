console.log("welll here we are in the other block");

import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { RichText } from "@wordpress/editor";

// This is working even though its not registered in PHP. why?
registerBlockType('jsc-courses/test-one', {
    title: 'test one',
    description: __('a test for stuff', 'jsc-courses'),
    icon: 'smiley',
    category: 'layout',
    attributes: {
        content: {
            type: 'string'
        }
    },
    edit: function ({ className, attributes, setAttributes }) {
        const { content } = attributes;
        return <RichText
            tagName="p"
            className={className}
            onChange={(value) => setAttributes({ content: value })}
            value={content}
            formattingControls={['bold']}
        />
    },
    save: () => {
        return <div> dunno what to do</div>
    }
});
