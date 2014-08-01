/*
 * Code used to create a TinyMCE UI for the Grid
 */
(function() {

    /*
     * creating wp_post_image_grid plugin
     */
    tinymce.PluginManager.add('wp_post_image_grid', function( editor, url ) {

		/*
		 * grid templates
		 */
		var grid_templates = {
			// number of images in grid
			2: {
				// 1 number = 1 row - 2 images in 1 row  [1][2]
				2: {
					desktop: [
						{ top: 0, left: 0, width: 50, height: 100 },
						{ top: 0, left: 50, width: 50, height: 100 }
					],
					tablet: [],
					mobile: []
				},
				// 2 numbers = 2 rows - 2 images, one in each row
				// [1]
				// [2]
				11: {
					desktop: [
						{ top: 0, left: 0, width: 100, height: 200 },
						{ top: 200, left: 0, width: 100, height: 200 }
					],
					tablet: [],
					mobile: []
				}
			},
			3: {
				// 2 images in first row, 1 image in second row
				// [1][2]
				// [3333]
				21: {
					desktop: [
						{ top: 0, left: 0, width: 50, height: 100 },
						{ top: 0, left: 50, width: 50, height: 100 },
						{ top: 100, left: 0, width: 100, height: 200 }
					],
					tablet: [],
					mobile: []
				},
				12: {
					desktop: [
						{ top: 100, left: 0, width: 100, height: 200 },
						{ top: 0, left: 0, width: 50, height: 100 },
						{ top: 0, left: 50, width: 50, height: 100 }
					],
					tablet: [],
					mobile: []
				},
				// this one is tricky, 2 images in first column, 1 image in second column
				// [1][333]  
				// [2][333]
				_21: {
					desktop: [
						{ top: 0, left: 0, width: 50, height: 100 },
						{ top: 100, left: 0, width: 50, height: 100 },
						{ top: 0, left: 50, width: 100, height: 200 }
					],
					tablet: [],
					mobile: []
				},
				_12: {
					desktop: [
						{ top: 0, left: 0, width: 50, height: 100 },
						{ top: 0, left: 50, width: 50, height: 100 },
						{ top: 100, left: 0, width: 100, height: 200 }
					],
					tablet: [],
					mobile: []
				}
			},
			4: {
				31: {
					desktop: [
						{ top: 0, left: 0, width: 33.333, height: 100 },
						{ top: 0, left: 33.333, width: 33.333, height: 100 },
						{ top: 0, left: 66.666, width: 33.333, height: 100 },
						{ top: 100, left: 0, width: 100, height: 200 }
					],
					tablet: [],
					mobile: []
				},
				13: {
					desktop: [
						{ top: 100, left: 0, width: 100, height: 200 },
						{ top: 0, left: 0, width: 33.333, height: 100 },
						{ top: 0, left: 33.333, width: 33.333, height: 100 },
						{ top: 0, left: 66.666, width: 33.333, height: 100 }
					],
					tablet: [],
					mobile: []
				},
				121: {
					desktop: [
						{ top: 0, left: 0, width: 100, height: 200 },
						{ top: 200, left: 0, width: 50, height: 100 },
						{ top: 200, left: 50, width: 50, height: 100 },
						{ top: 300, left: 0, width: 100, height: 200 }
					],
					tablet: [],
					mobile: []
				},
				22: {
					desktop: [
						{ top: 0, left: 0, width: 50, height: 100 },
						{ top: 0, left: 50, width: 50, height: 100 },
						{ top: 100, left: 0, width: 50, height: 100 },
						{ top: 100, left: 50, width: 50, height: 100 }
					],
					tablet: [],
					mobile: []
				}
			}
		};

		/*
		 * function used to generate content of grid select window popup
		 */
		function windowContent() {
			var content_html, x, y, z, window;

			content_html = '<div class="mce-image-grids"">';

			for (y in grid_templates) {
				content_html += '<h6>' + y + '-images layouts</h6>';
				content_html += '<div class="image-grids-' + y + ' image-grids-conteiner">';
				for (x in grid_templates[y]){
					content_html += '<div id="image-grid-' + x + '" class="image-grid" title="image-grid-' + x + '" role="button"><div id="image-grid-template-' + x + '" class="image-grid-template" title="image-grid-' + x + '" role="button">';
					for (z in grid_templates[y][x]["desktop"]){
					//	content_html += '<div style="display: block; background: #BBB; width: ' + grid_templates[y][x]["desktop"][z]["width"] + 'px; height: ' + grid_templates[y][x]["desktop"][z]["height"] + 'px; top: ' + grid_templates[y][x]["desktop"][z]["top"] + 'px; left: ' + grid_templates[y][x]["desktop"][z]["left"] + 'px; position: absolute;"></div>';
					}
					content_html += '</div></div>';
				}
				content_html += '</div>';
			}

			content_html += '</div>';

			window = editor.windowManager.open({
				title: "Select your grid layout",
				classes: 'image-grid-layout',
				resizable: true,
				scrollbars: true,
				padding: 15,
				maxHeight: 800,
				items: {
					type: 'container',
					html: content_html,
					minWidth: 770,
					onclick: function(e) {
						var target = e.target;
						var img_1x1 = '../wp-content/plugins/wp-post-image-grid/1x1.png';
						var output = '<div class="wp_post_image_grid" contenteditable="false"><div class="wp_post_image_grid_element"><img src="'+img_1x1+'" class="image" alt="img" /><div class="empty"></div></div><div class="wp_post_image_grid_element"><img src="'+img_1x1+'" class="image" alt="img" /><div class="empty"></div></div><div class="wp_post_image_grid_element"><img src="'+img_1x1+'" class="image" alt="img" /><div class="empty"></div></div></div>&nbsp;';

						console.log(e);
						if ( target.nodeName === "DIV" ) {
							editor.execCommand('mceInsertContent', false, '<p>' + tinymce.trim(target.title) + '</p>');
							editor.insertContent(output);

							// make sure that onclick was actually on some layout block
							if (!e.ctrlKey && ( target.className === "image-grid" ||  target.className === "image-grid-template" ) ) {
								window.close();
							}
						}
					}
				},
				buttons: [
					{
						text: "Close",
						onclick: function() {
							window.close();
						}
					},
					// may be removed, just onclick on selected grid should be fine, and also easier/faster
					{
						text: "Insert into post",
						onclick: function() {
							var img_1x1 = '../wp-content/plugins/wp-post-image-grid/1x1.png';
							var output = '<div class="wp_post_image_grid" contenteditable="false"><div class="wp_post_image_grid_element"><img src="'+img_1x1+'" class="image" alt="img" /><div class="empty"></div></div><div class="wp_post_image_grid_element"><img src="'+img_1x1+'" class="image" alt="img" /><div class="empty"></div></div><div class="wp_post_image_grid_element"><img src="'+img_1x1+'" class="image" alt="img" /><div class="empty"></div></div></div>';
							
							// insert text to the editor
							editor.insertContent(output);
							window.close();
						}
					}
				]
			});
		}

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
			onclick: windowContent
        })
    });
})();