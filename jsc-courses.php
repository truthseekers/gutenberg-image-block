<?php

/**
 * Plugin Name: jsc-courses
 * Plugin URI: https://truthseekers.io
 * Description: A Course creation and management plugin
 * Author: John
 * Author URI: https://truthseekers.io
 */

register_block_type(
    'jsc-courses/jsc-custom-image',
    array(
        'editor_script' => 'jsc-courses-editor-script',
        'editor_style' => 'jsc-courses-editor-style',
        'script' => 'jsc-courses-script',
        'style' => 'jsc-courses-style'
    ),
    array()
);


function jsc_courses_block_register()
{
    wp_register_script(
        'jsc-courses-editor-script',
        plugins_url('build/index.js', __FILE__), // This use to be the src/editor.js but webpack.
        array('wp-blocks', 'wp-i18n', 'wp-element')
    );

    wp_register_style(
        'jsc-courses-editor-style',
        plugins_url('style.css', __FILE__),
        array('wp-edit-blocks')
    );
}

add_action('init', 'jsc_courses_block_register');


function my_block_plugin_editor_scripts()
{
    // die(var_dump(plugins_url('/blocks/jsc-custom-image/frontend.js', __FILE__)));

    wp_enqueue_script(
        'my-block-editor-js',
        plugins_url('src/blocks/jsc-custom-image/frontend.js', __FILE__),
        ['wp-blocks', 'wp-i18n', 'wp-element', 'wp-components', 'wp-editor'],
        filemtime(plugin_dir_path(__FILE__) . 'src/blocks/jsc-custom-image/frontend.js')
    );
}

add_action('enqueue_block_editor_assets', 'my_block_plugin_editor_scripts');

/**
 * Enqueue frontend and editor JavaScript and CSS
 */
function my_block_plugin_scripts()
{

    wp_enqueue_script(
        'my-block-js',
        plugins_url('src/blocks/jsc-custom-image/frontend.js', __FILE__),
        ['wp-blocks', 'wp-i18n', 'wp-element', 'wp-components', 'wp-editor'],
        filemtime(plugin_dir_path(__FILE__) . 'src/blocks/jsc-custom-image/frontend.js')
    );


    // Enqueue block editor styles
    wp_enqueue_style(
        'my-block-css',
        plugins_url('src/blocks/jsc-custom-image/style.css', __FILE__),
        [],
        filemtime(plugin_dir_path(__FILE__) . 'src/blocks/jsc-custom-image/style.css')
    );
}

// Hook the enqueue functions into the frontend and editor
// jquery must be enqueued before enqueue_block_asset
wp_enqueue_script('jquery');
add_action('enqueue_block_assets', 'my_block_plugin_scripts');

//////////////////////////////////

function gutenberg_examples_01_register_block()
{
    // automatically load dependencies and version
    $asset_file = include(plugin_dir_path(__FILE__) . 'build/index.asset.php');

    wp_register_script(
        'gutenberg-examples-01-esnext',
        plugins_url('build/block.js', __FILE__),
        $asset_file['dependencies'],
        $asset_file['version']
    );

    register_block_type('gutenberg-examples/example-01-basic-esnext', array(
        'editor_script' => 'gutenberg-examples-01-esnext',
    ));

    ////////////////////////////////


    wp_register_style(
        'gutenberg-examples-02-editor',
        plugins_url('editor.css', __FILE__),
        array('wp-edit-blocks')
        //filemtime(plugin_dir_path(__FILE__) . 'editor.css')
    );

    // die(var_dump(plugins_url('style.css', __FILE__)));
    wp_register_style(
        'gutenberg-examples-02',
        plugins_url('style.css', __FILE__),
        array()
        //filemtime(plugin_dir_path(__FILE__) . 'style.css')
    );


    register_block_type('gutenberg-examples/example-02-stylesheets', array(
        'style' => 'gutenberg-examples-02',
        'editor_style' => 'gutenberg-examples-02-editor',
        'editor_script' => 'gutenberg-examples-02',
    ));
}


add_action('init', 'gutenberg_examples_01_register_block');
