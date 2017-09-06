<?php

$context = Timber::get_context();
$context['posts'] = Timber::get_posts();
$context['pagination'] = Timber::get_pagination();
$context['dynamic_sidebar'] = Timber::get_widgets('archive_sidebar');
$templates = array( 'home.twig' );
Timber::render( $templates, $context );