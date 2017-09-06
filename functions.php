<?php

if ( ! class_exists( 'Timber' ) ) {
	add_action( 'admin_notices', function() {
		echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php') ) . '</a></p></div>';
	});
	
	add_filter('template_include', function($template) {
		return get_stylesheet_directory() . '/static/no-timber.html';
	});
	
	return;
}

Timber::$dirname = array('templates', 'views');

class StarterSite extends TimberSite {

	function __construct() {
		add_theme_support( 'post-formats' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'menus' );
		add_theme_support( 'html5', array( 'comment-list', 'comment-form', 'search-form', 'gallery', 'caption' ) );
		add_filter( 'timber_context', array( $this, 'add_to_context' ) );
		add_action( 'init', array( $this, 'register_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );
		parent::__construct();
	}

	function register_post_types() {
		//this is where you can register custom post 
		register_post_type( 'cky_menu_item',
    array(
      'labels' => array(
        'name' => __( 'Menu Items' ),
        'singular_name' => __( 'Menu Item' )
      ),
      'public' => true,
			'has_archive' => true,
    )
  );
	}

	function register_taxonomies() {
		//this is where you can register custom taxonomies
		$labels = array(
			'name'              => _x( 'Menu Types', 'taxonomy general name', 'textdomain' ),
			'singular_name'     => _x( 'Menu Type', 'taxonomy singular name', 'textdomain' ),
			'search_items'      => __( 'Search Menu Types', 'textdomain' ),
			'all_items'         => __( 'All Menu Types', 'textdomain' ),
			'edit_item'         => __( 'Edit Menu Type', 'textdomain' ),
			'update_item'       => __( 'Update Menu Type', 'textdomain' ),
			'add_new_item'      => __( 'Add New Menu Type', 'textdomain' ),
			'new_item_name'     => __( 'New Menu Type Name', 'textdomain' ),
			'menu_name'         => __( 'Menu Types', 'textdomain' ),
		);

		$args = array(
			'hierarchical'      => true,
			'labels'            => $labels,
			'show_ui'           => true,
			'show_admin_column' => true,
			'query_var'         => true,
			'rewrite'           => array( 'slug' => 'menu_type' ),
		);

		register_taxonomy( 'cky_menu_type', array( 'cky_menu_item' ), $args );

	}

	function add_to_context( $context ) {
		$context['top_menu'] = new TimberMenu("Top Menu");
		$context['footer_menu'] = new TimberMenu("Social Media Menu");
		$context['site'] = $this;
		return $context;
	}
}

new StarterSite();

 /* Register sidebar */
 function cky_widgets_init() {
	
			register_sidebar( array(
					'name'          => 'Archive Sidebar',
					'id'            => 'archive_sidebar',
					'before_widget' => '<div class="widget">',
					'after_widget'  => '</div>',
					'before_title'  => '<h4>',
					'after_title'   => '</h4>',
			) );
	
	}
	add_action( 'widgets_init', 'cky_widgets_init' );
