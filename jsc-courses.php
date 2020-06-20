<?php

/**
 * Plugin Name: jsc-courses
 * Plugin URI: https://truthseekers.io
 * Description: A Course creation and management plugin
 * Author: John
 * Author URI: https://truthseekers.io
 */



function jsc_courses_block_register()
{
    $asset_file = include(plugin_dir_path(__FILE__) . 'build/index.asset.php');

    wp_enqueue_script(
        'main-plugin-script',
        plugins_url('build/index.js', __FILE__),
        $asset_file['dependencies']
    );

    wp_register_style(
        'jsc-course-editor-style',
        plugins_url('/src/blocks/course/style.css', __FILE__),
        array('wp-edit-blocks')
    );

    register_block_type('jsc-courses/course', array(
        'editor_script' => 'main-plugin-script',
        'editor_style' => 'jsc-course-editor-style',
    ));
}

add_action('init', 'jsc_courses_block_register');
