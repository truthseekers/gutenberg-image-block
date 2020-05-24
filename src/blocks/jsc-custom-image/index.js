// import './style.editor.css';
// import './style.css';
import { registerBlockType, registerBlockStyle, createBlock } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import edit from "./edit";
import { RichText } from "@wordpress/editor";
import { Dashicon } from "@wordpress/components";

registerBlockStyle('jsc-courses/jsc-custom-image', {
    name: 'jsc-lightbox',
    label: 'Simple Lightbox',
    isDefault: true
});

registerBlockStyle('jsc-courses/jsc-custom-image', {
    name: 'no-style',
    label: 'None'
});

const attributes = {
    id: {
        type: 'number'
    },
    alt: {
        type: 'string',
        source: 'attribute',
        selector: 'img',
        attribute: 'alt',
        default: ''
    },
    url: {
        type: 'string',
        source: 'attribute',
        selector: 'img',
        attribute: 'src',
    },
}



registerBlockType('jsc-courses/jsc-custom-image', {
    title: __('JSC Custom Image', 'jsc-courses'),
    description: __('Block for custom lightbox image', 'jsc-courses'),

    icon: 'admin-users',

    supports: {
        reusable: false,
        html: false
    },

    category: 'layout',

    keywords: [__('image', 'jsc-courses'), __('photo', 'jsc-courses'), ('img', 'jsc-courses'), __('picture', 'jsc-courses')],

    attributes,

    transforms: {
        to: [
            {
                type: 'block',
                blocks: ['core/image'],
                transform: function (attributes) {
                    console.log("attributes of transform:");
                    console.log(attributes);
                    return createBlock('core/image', {
                        url: attributes.url,
                        alt: attributes.alt
                    });
                }
                // transform: ({ attributes }) => {
                //     console.log("I have transformed");
                //     console.log(attributes);
                //     return createBlock('core/image', {
                //         content: content
                //         // textAlignment
                //     })
                // }
            }
        ]
    },


    save: ({ attributes }) => {
        const { title, info, url, alt, id, social } = attributes;
        return (
            <div>
                <img src={url} id={id} alt={alt} className={`jsc-lightbox-img wp-image-${id}`} />
                <div className={"outer"}>
                    <div className="outercenter">
                        <div className="outerx">
                            <span className="close">&times;</span>
                        </div>
                        <div className="first">
                            <img className={"jsc-lightbox"} src={url} alt={alt} />
                        </div>
                    </div>
                </div>
                {title &&
                    <RichText.Content
                        className={"wp-block-mytheme-blocks-team-member__title"}
                        tagName="h4"
                        value={title}
                    />
                }
            </div>
        )
    },

    edit
});
