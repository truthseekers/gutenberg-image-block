import { Component } from "@wordpress/element";

// import { InspectorControls, BlockControls, BlockEditorProvider } from "@wordpress/block-editor"; // Why won't this work?
var InspectorControls = wp.blockEditor.InspectorControls; // I have to do this for some reason
var BlockControls = wp.blockEditor.BlockControls;
var MediaUpload = wp.blockEditor.MediaUpload;
var MediaPlaceholder = wp.blockEditor.MediaPlaceholder;
var MediaUploadCheck = wp.blockEditor.MediaUploadCheck;
import { __ } from "@wordpress/i18n";
import { isBlobURL } from '@wordpress/blob';
import { withSelect } from "@wordpress/data";
import { Spinner, withNotices, Toolbar, PanelBody, TextareaControl, SelectControl } from "@wordpress/components";
var IconButton = wp.components.Button; // formerly in @wordpress/components
import { useState, useEffect } from "@wordpress/element";


function JscImage2Edit(props) {

    const [lightbox, setLightbox] = useState(false);

    useEffect(() => {
        //componentDidMount() {}
        const { attributes, setAttributes } = props;
        const { url, id } = attributes;
        if (url && isBlobURL(url) && !id) {
            setAttributes({
                url: '',
                alt: ''
            })
        }
    })

    const { className, attributes, noticeUI, isSelected } = props;
    const { url, alt, id } = attributes;

    const logStuff = () => {
        setLightbox(!lightbox);
    }

    const onSelectImage = ({ id, url, alt }) => {
        console.log("set attributes");
        props.setAttributes({
            id, url, alt
        })
    }

    const onSelectURL = (url) => {
        props.setAttributes({
            url,
            id: null,
            alt: ""
        })
    }

    const onUploadError = (message) => {
        const { noticeOperations } = props;
        noticeOperations.createErrorNotice(message)
    }

    const removeImage = () => {
        console.log("inside remove image");
        props.setAttributes({
            id: null,
            url: '',
            alt: ''
        })
    }

    const updateAlt = (alt) => {
        props.setAttributes({
            alt
        })
    }

    const onImageSizeChange = (url) => {
        props.setAttributes({
            url
        })
    }



    const getImageSizes = () => {
        const { image, imageSizes } = props;
        if (!image) return [];
        let options = [];
        const sizes = image.media_details.sizes;
        for (const key in sizes) {
            const imageSize = imageSizes.find(size => size.slug === key);
            if (imageSize) {
                options.push({
                    label: imageSize.name,
                    value: size.source_url
                })
            }
        }
        return options;
    }

    return (
        <>
            <InspectorControls>
                <PanelBody title={__("Image Settings", "jsc-courses")}>
                    {(url && !isBlobURL(url)) &&
                        <TextareaControl
                            label={__('Alt Text (Alternative Text)',
                                'jsc-courses')}
                            value={alt}
                            onChange={updateAlt}
                            help={__('Alternative text describes your image to people who cannot see it. Add a short description with its details.', 'jsc-courses')}
                        />
                    }
                    {id &&
                        <SelectControl
                            label={__('Image Size', 'jsc-courses')}
                            // options={this.getImageSizes()}
                            options={getImageSizes}
                            onChange={onImageSizeChange}
                            value={url}
                        />
                    }
                </PanelBody>
            </InspectorControls>
            <BlockControls>
                {url &&
                    <Toolbar>
                        {id &&
                            <MediaUploadCheck>
                                <MediaUpload
                                    allowedTypes={['image']}
                                    value={id}
                                    onSelect={onSelectImage}
                                    render={({ open }) => {
                                        return (
                                            <IconButton
                                                className="components-icon-button components-toolbar_control"
                                                label={__("Edit Image", "jsc-courses")}
                                                onClick={open}
                                                icon="edit"
                                            />
                                        )
                                    }}
                                />
                            </MediaUploadCheck>
                        }
                        <IconButton
                            className="components-icon-button components-toolbar__control"
                            label={__("Remove Image", "jsc-courses")}
                            onClick={removeImage}
                            icon="trash"
                        />
                    </Toolbar>
                }
            </BlockControls>
            <div className={lightbox == true ? className : "green-bg"}>
                {url ?
                    <>
                        <img onClick={logStuff} src={url} alt={alt} />
                    </>
                    : <MediaPlaceholder
                        icon="format-image"
                        onSelect={onSelectImage}
                        onSelectURL={onSelectURL}
                        onError={onUploadError}
                        //accept="image/*"
                        allowedTypes={["image"]}
                        notices={noticeUI}
                    />
                }
                {/* {this.state.isLightbox &&} */}
                {/* <div className={"outer"}>
                    <div className="outerCenter">
                        <div className="outerx">
                            <span onClick={logStuff} className="close">&times;</span>
                            {/* <span className="x">X</span> */}
                {/* </div>
                        <div className="first">
                            <img className={""} onClick={logStuff} src={url} alt={alt} />
                        </div>
                    </div>
                </div> */}
                {/* } */}
                {/* {isBlobURL(url) && <Spinner />} */}
            </div>
        </>
    );
    // }
}


export default withSelect((select, props) => {
    const id = props.attributes.id;
    return {
        image: id ? select('core').getMedia(id) : null,
        imageSizes: select('core/editor').getEditorSettings().imageSizes
    }
})(withNotices(JscImage2Edit));
