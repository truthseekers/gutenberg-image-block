<?php

/**
 * Plugin Name: jsc-courses
 * Plugin URI: https://truthseekers.io
 * Description: A Course creation and management plugin
 * Author: John
 * Author URI: https://truthseekers.io
 */

// functions to look at:
// wp_register_script
// wp_register_style
// register_block_type
// --------
// wp_enqueue_script
// https://developer.wordpress.org/plugins/javascript/enqueuing/


function jsc_courses_block_register()
{
    $asset_file = include(plugin_dir_path(__FILE__) . 'build/index.asset.php');

    wp_register_script(
        'jsc-courses-editor-script', // handle.
        plugins_url('build/index.js', __FILE__), // This use to be the src/editor.js but webpack.
        $asset_file['dependencies'], //array('wp-blocks', 'wp-i18n', 'wp-element')
        $asset_file['version']
    );

    wp_register_script(
        'jsc-courses-script', //handle
        plugins_url('/src/blocks/jsc-custom-image/frontend.js', __FILE__),
        array('jquery'),
        // $asset_file['dependencies'],
        $asset_file['version']
    );

    wp_register_style(
        'jsc-courses-style',
        plugins_url('/src/blocks/jsc-custom-image/style.css', __FILE__),
        array('wp-edit-blocks')
    );

    wp_register_style(
        'jsc-courses-editor-style',
        plugins_url('/src/blocks/jsc-custom-image/style.editor.css', __FILE__),
        array('wp-edit-blocks')
    );

    register_block_type(
        'jsc-courses/jsc-custom-image',
        array(
            'editor_script' => 'jsc-courses-editor-script', // handle from before.
            'editor_style' => 'jsc-courses-editor-style',
            'script' => 'jsc-courses-script',
            'style' => 'jsc-courses-style'
        ),
        array()
    );
}

add_action('init', 'jsc_courses_block_register');
