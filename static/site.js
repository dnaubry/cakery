jQuery( document ).ready( function( $ ) {

  var NavMenu = (function() {
    const $main = $('.main'),
          $navContainer = $('.nav-mobile-container'),
          $mainOverlay = $('.nav-mobile-overlay'),
          $reply = $('.reply'),
          $cancelComment = $('#cancel-comment'),
          mainVisible = 'main-nav-mobile-visible',
          containerVisible = 'nav-mobile-container-visible',
          overlayVisible = 'nav-mobile-overlay-visible';

    // Show the nav menu container and cover the main section with an overlay    
    var open = function() {
      $navContainer.addClass(containerVisible);
      $main.addClass(mainVisible);      
      $mainOverlay.addClass(overlayVisible);
    }

    // Hide the nav menu container and remove the overlay over the main section       
    var close = function() {
      $navContainer.removeClass(containerVisible);
      $main.removeClass(mainVisible);      
      $mainOverlay.removeClass(overlayVisible);
    }

    return {
      open: open,
      close: close
    }
  })();

  // Event for opening nav menu on smaller screens when menu icon is clicked
  $('.menu-mobile-icon').on('click', NavMenu.open);
  // Event for closing nav menu when close icon is clicked
  $('.menu-mobile-close').on('click', NavMenu.close);
  // Event for closing nav menu when click occurs outside of the nav menu
  $('.nav-mobile-overlay').on('click', NavMenu.close);
  // Event for closing nav menu when escape key is pressed
  $(window).on('keyup', function() {
    const ESC_KEY = 27;

    if (event.keyCode === ESC_KEY) {
      NavMenu.close();
    }
  });

  // Menu Types (Food & Drink Menu page)
  var MenuTypes = (function() {
    const menu = $('.menu-type-list'),
          items = $('.menu-type-item'),
          menus = $('.menu-food-drink');

    // Remove current style from all menu list items and hides associated menu table
    // Add current style to selected item and remove hidden class on associated menu table
    var showSelectedItem = function() {
      const target = event.target,
            targetType = $(target).attr('data-type');

      items.removeClass('menu-type-item--current');
      menus.addClass('hidden');
      $(target).addClass('menu-type-item--current');
      menus.filter('[data-type="' + targetType + '"]').removeClass('hidden');
    }

    // Set first menu item to current style and remove hidden class on associated menu table
    var init = function() {
      items.first().addClass('menu-type-item--current');
      menus.first().removeClass('hidden');
      showSelectedItem = showSelectedItem.bind(this);
      // Add event listener to ul.menu-food-drink
      menu.on('click', showSelectedItem);
    }

    return {
      init: init
    }
  })();

  MenuTypes.init();
});