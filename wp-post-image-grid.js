/*
 * Code used to create a TinyMCE UI for the Grid
 */
(function() {
    // creating wp_post_image_grid plugin
    tinymce.PluginManager.add('wp_post_image_grid', function( editor, url ) {       
       // adding the button
       editor.addButton("wp_post_image_grid", {
            title: 'Add image grid',
            tooltip: "Adds the image grid to the post",
            // uses the mce-i-icon CSS class to get any Dashicons
            icon: 'icon dashicons-schedule',
            // onclick event of the button
            onclick: function() {
            	var img_1x1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==';
 				var output = '<div class="wp_post_image_grid"><div class="wp_post_image_grid_element"><img src="'+img_1x1+'" class="image"><div class="empty"></div></div><div class="wp_post_image_grid_element"><img src="'+img_1x1+'" class="image"><div class="empty"></div></div><div class="wp_post_image_grid_element"><img src="'+img_1x1+'" class="image"><div class="empty"></div></div></div>';
 				// insert text to the editor
 				// ToDo: find a method to put into editor unmodified code
 				editor.insertContent(output);
           	}
        })
    });
})();