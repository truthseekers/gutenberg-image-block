// import './style.editor.css';
// import './style.css';
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import edit from "./edit";
import { RichText } from "@wordpress/editor";
import { Dashicon } from "@wordpress/components";


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

    save: ({ attributes }) => {
        const { title, info, url, alt, id, social } = attributes;
        return (
            <div>
                <img src={url} id={id} alt={alt} className={id ? `jsc-lightbox-img wp-image-${id}` : null} />
                <div className={"outer"}>
                    <div className="outercenter">
                        <div className="outerx">
                            <span className="close">&times;</span>
                            {/* <span className="x">X</span>*/}
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
