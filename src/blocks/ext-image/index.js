console.log("ext-image yo");

import { registerBlockType } from '@wordpress/blocks';
import { addFilter } from "@wordpress/hooks";

// wp.hooks.addFilter(
addFilter(
    'blocks.getSaveElement',
    'slug/modify-get-save-content-extra-props',
    modifyGetSaveContentExtraProps
);

function modifyGetSaveContentExtraProps(element, blockType, attributes) {
    // Check if that is not a table block.
    if (blockType.name !== 'core/table') {
        return element;
    }

    // Return the table block with div wrapper.
    return (
        <div className='test-table-wrapper'>
            {element}
        </div>
    );
}


addFilter(
    "blocks.registerBlockType",
    "jsforwp-advgb/extending-register-block-type",
    extendTable
);

function extendTable(settings, name) {
    if ("core/table" === name) {
        let newDep = {
            attributes: settings.attributes,
            save: settings.save
        }
        let deps2 = [
            ...settings.deprecated,
            newDep
        ];
        settings.deprecated = deps2;
        return settings;
    }

    return settings;
}
