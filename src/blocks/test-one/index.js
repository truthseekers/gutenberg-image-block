// console.log("welll here we are in the other block");

import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { RichText, InspectorControls } from "@wordpress/editor";
import { AlignmentToolbar, BlockControls } from "@wordpress/block-editor"; // Test to see if InspectorControls works from here as well.
import { PanelBody, ColorPalette, RangeControl } from "@wordpress/components";
import { withState } from '@wordpress/compose';

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
        fontColor: {
            type: 'string'
        },
        fontSize: {
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
            color: attributes.fontColor,
            fontSize: attributes.fontSize,
        }

        const onChangeAlignment = (newAlignment) => {
            setAttributes({ alignment: newAlignment });
        };
        const onChangeColor = (newColor) => {
            console.log("newColor: ", newColor);
            setAttributes({ bgColor: newColor });
        };
        const onChangeFontColor = (newColor) => {
            console.log("newColor: ", newColor);
            setAttributes({ fontColor: newColor });
        };
        const onChangeFontSize = (newSize) => {
            console.log("new FontSize: ", newSize);
            setAttributes({ fontSize: newSize });
        };
        return <div style={blockStyle} className="background-wrapper">
            <InspectorControls>
                <PanelBody
                    title={__('Background Color picker hello', 'jsc-courses')}
                    initialOpen={false}
                >
                    <RangeControl
                        label="font size"
                        min={6}
                        max={48}
                        onChange={onChangeFontSize}
                        value={attributes.fontSize}
                    />
                    <ColorPalette
                        colors={[
                            { color: '#f03' },
                            { color: 'blue' },
                        ]}
                        onChange={onChangeColor}
                    />
                </PanelBody>
                <PanelBody
                    title={__('Font Color picker', 'jsc-courses')}
                    initialOpen={true}
                >
                    {/* <MyColorPalette /> */}
                    <ColorPalette
                        colors={[
                            { color: 'green' },
                            { color: 'blue' },
                        ]}
                        onChange={onChangeFontColor}
                    />
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
        </div>
    },
    save: () => {
        return <div> dunno what to do</div>
    }
});











/////////////////////////////////////////////////////////////////
