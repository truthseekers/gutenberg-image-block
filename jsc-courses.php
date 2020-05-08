<?php

/**
 * Plugin Name: jsc-courses
 * Plugin URI: https://truthseekers.io
 * Description: A Course creation and management plugin
 * Author: John
 * Author URI: https://truthseekers.io
 */

// This where it all comes together. or not?


// copied...

register_block_type(
    'jsc-courses/lesson',
    array(
        'editor_script' => 'jsc-courses-editor-script',
        'editor_style' => 'jsc-courses-editor-style',
        'script' => 'jsc-courses-script',
        'style' => 'jsc-courses-style'
    ),
    array()
);



function jsc_courses_enqueue()
{


    // What is the difference between wp_enqueue_script and the other?
    wp_enqueue_script(
        'jsc-courses-script',
        plugins_url('build/index.js', __FILE__)
        //, array('wp-blocks') not necessary because using wp-scripts
    );
}

function jsc_courses_block_register()
{

    wp_register_script(
        'jsc-courses-editor-script',
        plugins_url('build/index.js', __FILE__), // This use to be the src/editor.js but webpack.
        array('wp-blocks', 'wp-i18n', 'wp-element')
    );
}

add_action('init', 'jsc_courses_block_register');
// not sure if I even need the below script
//add_action('enqueue_block_editor_assets', 'jsc_courses_enqueue');
