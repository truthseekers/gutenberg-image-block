console.log("in the index.js of src in jsc-courses");
import { registerBlockType } from '@wordpress/blocks';





registerBlockType('jsc-courses/lesson', {
    title: 'jsc lesson',
    icon: 'smiley',
    category: 'layout',
    edit: () => <div>Lesson 1</div>,
    save: () => <div>Hola, mundo!</div>,
});
