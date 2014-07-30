/*
 * Code used to create a TinyMCE UI for the Grid
 */
(function() {
    /*
     * function used to call media manager
     */
    var select_img = function(grid_item) {
        // clicked element handler
        grid_item = jQuery(grid_item);
        // handler for the media manager window
        var file_frame;

        // If the media frame already exists, reopen it.
        if (file_frame) {
            file_frame.open();
            return;
        }
        // Create the media frame if not exists.
        file_frame = wp.media.frames.file_frame = wp.media({
            title: 'Choose Image',
            multiple: false,
            library: {
                type: 'image'
            },
            button: {
                text: 'Use This Image'
            }
        });
        // When an image is selected, run a callback.
        file_frame.on( 'select', function() {
            // We set multiple to false so only get one image from the uploader
            var attachment = file_frame.state().get('selection').first().toJSON();
			// Remove the empty CSS class from the container
            grid_item.removeClass('empty');
            // Set the background image of a container
            grid_item.css('background-image', 'url(' + attachment.url + ')');
        });
        // Finally, open the modal
        file_frame.open();
    }
    /*
     * creating wp_post_image_grid plugin
     */
    tinymce.PluginManager.add('wp_post_image_grid', function( editor, url ) {       
       /* 
        * Adding the onclick event for the editor content
        */
       editor.on('mouseup', function( event ) {
       		var dom = editor.dom,
       			node = event.target;
       
       		if (node.nodeName === 'DIV' && dom.hasClass(node.parentNode, 'wp_post_image_grid_element')) {
       			// Don't trigger on right-click
       			if (event.button !== 2) {
       				select_img(node);
       			}
       		}
       });
       /* 
        * Adding the button
        */
       editor.addButton("wp_post_image_grid", {
            title: 'Add image grid',
            tooltip: "Adds the image grid to the post",
            // uses the mce-i-icon CSS class to get any Dashicons
            icon: 'icon dashicons-schedule',
            // onclick event of the button
            onclick: function() {
            	var img_1x1 = '../wp-content/plugins/wp-post-image-grid/1x1.png';
 				var output = '<div class="wp_post_image_grid" contenteditable="false"><div class="wp_post_image_grid_element"><img src="'+img_1x1+'" class="image" alt="img" /><div class="empty"></div></div><div class="wp_post_image_grid_element"><img src="'+img_1x1+'" class="image" alt="img" /><div class="empty"></div></div><div class="wp_post_image_grid_element"><img src="'+img_1x1+'" class="image" alt="img" /><div class="empty"></div></div></div>';
 				
 				// insert text to the editor
 				editor.insertContent(output);
           	}
        })
    });
})();