// console.log("welll here we are in the other block");

import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { RichText, InspectorControls } from "@wordpress/editor";
import { AlignmentToolbar, BlockControls } from "@wordpress/block-editor"; // Test to see if InspectorControls works from here as well.
import { PanelBody, ColorPalette, ColorPicker, RangeControl } from "@wordpress/components";
import { withState } from '@wordpress/compose';
import { registerStore } from "@wordpress/data";
import { useState } from "@wordpress/element";


function MyColor(props) {
    //console.log("Hello from MyColor!");
    //console.log(props);
    const testClick = () => {
        props.onSelect(props);
    }

    return (<div onClick={testClick} style={{ display: "inline-block", width: "25px", height: "25px", borderRadius: "50%", margin: "5px", borderStyle: props.selected == props.id ? "solid" : "", background: props.color }}>{props.id}</div>);

}


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
        colorList: {
            type: 'array',
            default: [
                {
                    // id: 0,
                    color: "red"
                },
                {
                    // id: 1,
                    color: "green"
                },
                {
                    // id: 2,
                    color: "blue"
                }
            ]
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

        const [selectedColor, setSelectedColor] = useState(0);

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
            // console.log("changed color with MyColorPicker");
            // console.log("Color picked from MyColorPicker: ", newColor);
            setAttributes({ bgColor: newColor.hex });
        };
        const onChangeFontColor = (newColor) => {
            setAttributes({ fontColor: newColor });
        };
        const onChangeFontSize = (newSize) => {
            setAttributes({ fontSize: newSize });
        };
        const addToPalette = () => {
            let newColor = { id: attributes.colorList.length, color: attributes.bgColor };
            setAttributes({ colorList: [...attributes.colorList, newColor] });
            // setCount(count + 1);
            console.log("Added to palette: attributes.colorList");
            console.log(attributes.colorList);
        }

        const removeFromPalette = () => {
            // console.log("need to remove: " + selectedColor + " from palette");
            let newList = [...attributes.colorList];
            newList.splice(selectedColor, 1);
            // const result = attributes.colorList.filter(item => item.id != selectedColor);

            setAttributes({ colorList: newList });
            console.log("removed from palette: ");
            console.log(attributes.colorList);
        }
        const selectPaletteItem = (item) => {
            console.log("(selected an item");
            console.log(attributes.colorList);
            setSelectedColor(item.id);
        }

        return <div style={blockStyle} className="background-wrapper">
            <InspectorControls>
                <PanelBody
                    title={__('Background Color picker hello', 'jsc-courses')}
                    initialOpen={true}
                >
                    <RangeControl
                        label="font size"
                        min={6}
                        max={48}
                        onChange={onChangeFontSize}
                        value={attributes.fontSize}
                    />

                    <ColorPicker
                        onChangeComplete={onChangeColor}
                    />
                    <p onClick={addToPalette}>Add to palette</p>
                    <p onClick={removeFromPalette}>Remove from palette yooo</p>
                    {attributes.colorList.map((item, i) => {
                        return <MyColor onSelect={selectPaletteItem} selected={selectedColor} key={i} id={i} color={item.color} />;
                    })}

                </PanelBody>
                <PanelBody
                    title={__('Font Color picker', 'jsc-courses')}
                    initialOpen={false}
                >

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
