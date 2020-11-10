<?php 
/* Enqueue style file. */

	add_action( 'wp_enqueue_scripts' , 'theme_enqueue_styles');
    function theme_enqueue_styles() {
        wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
    }

    	// add_action( 'wp_enqueue_scripts' , 'theme_enqueue_styles', 99);
	// function theme_enqueue_styles() {
	//   $parent_style = 'parent-style';
	//   wp_enqueue_style( 'hotel-imperial-style', get_stylesheet_directory_uri(). '/style.css', $parent_style  );
	// }