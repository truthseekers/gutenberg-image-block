console.log("still works in jsc-course");
// import './style.css';

import { registerBlockType } from "@wordpress/blocks";

registerBlockType('jsc-courses/course', {
    title: 'jsc course',
    icon: 'smiley',
    category: 'layout',
    edit: ({ className }) => <div className={className}>Hola uhh, I am the test. teh heck</div>,
    save: () => <div>Hola, I am the test again!</div>,
});
