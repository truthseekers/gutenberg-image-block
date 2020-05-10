// console.log("welll here we are in the other block");

import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { RichText, InspectorControls } from "@wordpress/editor";
import { AlignmentToolbar, BlockControls } from "@wordpress/block-editor"; // Test to see if InspectorControls works from here as well.
import { PanelBody, ColorPicker, ColorPalette } from "@wordpress/components";
import { withState } from '@wordpress/compose';

const MyColorPicker = withState({
    color: '#f00',
})(({ color, setState }) => {
    return (
        <ColorPicker
            color={color}
            onChangeComplete={(value) => setState(value.hex)}
            disableAlpha
        />
    );
});


// console.log(InspectorControls);

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
    edit: function (props) {

        const { attributes, setAttributes } = props;
        const { content } = attributes;

        let blockStyle = {
            backgroundColor: attributes.bgColor,
        }

        const onChangeAlignment = (newAlignment) => {
            setAttributes({ alignment: newAlignment });
        };
        const onChangeColor = (newColor) => {
            console.log("newColor: ", newColor);
            setAttributes({ bgColor: newColor });
        };
        return <div style={blockStyle} className="background-wrapper">
            <InspectorControls>
                <PanelBody
                    title={__('Background Color picker', 'jsc-courses')}
                    initialOpen={true}
                >
                    <ColorPalette
                        colors={[
                            { color: '#f03' },
                            { color: 'blue' },
                        ]}
                        onChange={onChangeColor}
                    // onChange={(value) => console.log(value)}
                    />
                    {/* <ColorPicker
                        color={attributes.bgColor}
                        onChange={(value) => console.log(value)}
                    // onChange={onChangeColor}
                    /> */}
                    {/* <MyColorPicker
                        color="#00ff"
                    /> */}
                </PanelBody>
            </InspectorControls>
            <BlockControls>
                <AlignmentToolbar
                    value={attributes.alignment}
                    onChange={onChangeAlignment}
                />
            </BlockControls>
            <RichText
                tagName="p"
                className={props.className}
                style={{ textAlign: attributes.alignment }}
                onChange={(value) => {
                    setAttributes({ content: value })
                }}
                value={content}
            // formattingControls={['bold']} // This... Property? Isn't in the documentation for some reason.
            />
            <RichText
                tagName="p"
                className={props.className}
                onChange={(value) => {
                    setAttributes({ bgColor: value })
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
