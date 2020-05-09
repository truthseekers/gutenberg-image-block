import './blocks/test-one';
console.log("in the index.js of src in jsc-courses");
import { registerBlockType, registerBlockStyle } from '@wordpress/blocks';
import { __ } from "@wordpress/i18n";

// import './styles.editor.scss';
// import './style.scss';
// import { registerBlockType } from "@wordpress/blocks";
// import edit from './edit';
// import { RichText } from "@wordpress/editor";
// import { Dashicon } from "@wordpress/components";
// const attributes = {
//     id: {
//         type: 'number'
//     },
//     alt: {
//         type: 'string',
//         source: 'attribute',
//         selector: 'img',
//         attribute: 'alt',
//         default: ''
//     },
//     url: {
//         type: 'string',
//         source: 'attribute',
//         selector: 'img',
//         attribute: 'src',
//     },
// }

// registerBlockType('mytheme-blocks/jsc-image2', {
//     title: __('JSC IMAGE 2', 'mytheme-blocks'),

//     description: __('Block showing a Team Member.', 'mytheme-blocks'),

//     icon: 'admin-users',

//     supports: {
//         reusable: false,
//         html: false
//     },

//     category: "mytheme-category",

//     keywords: [__('team', 'mytheme-blocks'), __('member', 'mytheme-blocks'), __('person', 'mytheme-blocks')],

//     attributes,

//     save: ({ attributes }) => {
//         const { title, info, url, alt, id, social } = attributes;
//         console.log("img id: ", id);
//         return (
//             <div>
//                 <img src={url} id={id} alt={alt} className={id ? `jsc-lightbox-img wp-image-${id}` : null} />
//                 <div className={"outer"}>
//                     <div className="outercenter">
//                         <div className="outerx">
//                             <span className="close">&times;</span>
//                             {/* <span className="x">X</span> */}
//                         </div>
//                         <div className="first">
//                             <img className={"jsc-lightbox"} src={url} alt={alt} />
//                         </div>
//                     </div>
//                 </div>
//                 {title &&
//                     <RichText.Content
//                         className={'wp-block-mytheme-blocks-team-member__title'}
//                         tagName="h4"
//                         value={title}
//                     />
//                 }
//             </div>
//         )
//     },
//     edit
// });







registerBlockType('jsc-courses/custom-image', {
    title: 'custom image',
    description: __('A simple lightbox image.', 'jsc-courses'),
    icon: 'smiley',
    keywords: [__('image', 'jsc-courses'), __('photo', 'jsc-courses'), __('picture', 'jsc-courses')],
    category: 'layout',
    edit: function ({ className }) { // destructuring from props
        console.log("props!");
        console.log(className);
        return <div className={className}>Lesson 1 in a function yo</div>
    },
    save: () => {
        return <div>Hola, mundo!</div>
    }
});


































































///////////////////

//import { registerBlockType } from '@wordpress/blocks';

const blockStyle = {
    backgroundColor: '#900',
    color: '#fff',
    padding: '20px',
};

registerBlockType('gutenberg-examples/example-01-basic-esnext', {
    title: 'Example: Basic (esnext)',
    icon: 'universal-access-alt',
    category: 'layout',
    example: {},
    edit() {
        return <div style={blockStyle}>Hello World, step 1million (from the editor).</div>;
    },
    save() {
        return <div style={blockStyle}>Hello World, step 1 (from the frontend).</div>;
    },
});



registerBlockType('gutenberg-examples/example-02-stylesheets', {
    title: 'Example Stylesheets',
    icon: 'universal-access-alt',
    category: 'layout',
    example: {},
    edit({ className }) {
        return <p className={className}>Hello World, step 2 (from the editor, in green).</p>;
    },
    save() {
        return <p>Hello World, step 2 (from the frontend, in red).</p>;
    },
});
