<?php
/*
Plugin Name: WP Post Image Grid
Plugin URI: 
Description: 
Author: 
Version: 0.1
Author URI: 
*/

/* 
 * Actions used by the plugin
 */
// ToDo: adding of the front-end Grid CSS	
add_action('admin_head', array('WP_Post_Image_Grid', 'add_tinymce_button'));
add_action('admin_enqueue_scripts', array('WP_Post_Image_Grid', 'add_tinymce_ui_css'));

/*
 * Filters used by the plugin
 */
add_filter('mce_css', array('WP_Post_Image_Grid', 'add_tinymce_editor_css'));

/**
 * Main class of the plugin
 *
 * @since 0.1
 */
class WP_Post_Image_Grid {
	/**
	 * Method used to add the TinyMCE button in the editor
	 *
	 * @since 0.1
	 */
	static function add_tinymce_button() {
	    global $typenow;
	    // check user permissions
	    if (!current_user_can('edit_posts') && !current_user_can('edit_pages')) {
	        return;
	    }
		// check the current editor content
	    if(!in_array($typenow, array('post', 'page'))) {
	        return;
	    }
	    // check if the WYSIWYG mode is enabled
	    if ( get_user_option('rich_editing') == 'true') {
	        add_filter("mce_external_plugins", array('WP_Post_Image_Grid', 'add_tinymce_plugin'));
	        add_filter('mce_buttons', array('WP_Post_Image_Grid', 'register_tinymce_button'));
	    }
	}
	
	/**
	 * Method used to register the plugin in TinyMCE
	 *
	 * @since 0.1
	 * 
	 * @param  array $plugin_array - array of the existing TinyMCE plugins
	 * @return array - modified array of plugins
	 */
	static function add_tinymce_plugin($plugin_array) {
	    $plugin_array['wp_post_image_grid'] = plugins_url( '/wp-post-image-grid.js', __FILE__ );
	    
	    return $plugin_array;
	}
	
	/**
	 * Method used to add the button to the first toolbar
	 *
	 * @since 0.1
	 * 
	 * @param  array $buttons - array of the existing TinyMCE buttons for the first toolbar
	 * @return array - modified array of buttons
	 */
	static function register_tinymce_button($buttons) {
	   array_push($buttons, "wp_post_image_grid");
	   
	   return $buttons;
	}
	
	/**
	 * Method used to a TinyMCE UI CSS code
	 *
	 * @since 0.1
	 */
	static function add_tinymce_ui_css() {
		wp_enqueue_style('wp-post-image-grid', plugins_url('tinymce-ui.css', __FILE__));
	}
	
	/**
	 * Method used to a TinyMCE UI CSS code
	 *
	 * @since 0.1
	 *
	 * @return string - list of the comma-separated CSS files to load in the TinyMCE editor
	 */
	static function add_tinymce_editor_css($mce_css) {
		if(!empty($mce_css)) {
			$mce_css .= ',';
		}
	
		$mce_css .= plugins_url('tinymce-editor.css', __FILE__);
	
		return $mce_css;
	}
	
	/**
	 * Method used to generate the transparent PNG image with specific dimensions
	 *
	 * @since 0.1
	 * 
	 * @param  array $width - width in pixels of the generated image
	 * @param  array $height - height in pixels of the generated image 
	 * @return string - base64-encoded string of the PNG image
	 */
	static function generate_blank_png($width, $height) {
		$image = imagecreatetruecolor($width, $height);
		imagesavealpha($image, true);
		$transparent = imagecolorallocatealpha($image, 0, 0, 0, 127);
		imagefill($image, 0, 0, $transparent);
		// cache the output
		ob_start();
		imagepng($image);
		$img =  ob_get_contents();
		ob_end_clean();
		// return the string
		return base64_encode($img);
	}
}

// EOF