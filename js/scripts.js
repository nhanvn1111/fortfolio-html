(function($) {
    "use strict";

    $(document).ready(function() {    

        fullscreen_section($(this));
        parallax_image();
        flex_slider($);
        fix_height();
        progress_bar($(this));
        mobile_nav($(this));
        owl_carousel($(this));
        one_page_scroll($(this));
        sticky_header($(this));
        shortcodes($(this));
        youtube_bg($(this));
        scroll_down($(this));
        nivo_lightbox($(this));
        mobile_touch($(this));
        folio_col($(this));
    });

    /* Window Load/All Media Loaded */
    jQuery(window).load(function() {
        
        site_loader($(this));
        fullscreen_section($(this));
        parallax_image();
        isotope_go($(this));
        isotope_fit_rows($(this));
        sticky_header($(this));

        $('.section').each(function() {
            animate_start($(this));
        });

    });

    jQuery(window).resize(function() {
        isotope_go($(this));
        folio_col($(this));
    });

    //
    //  FUNCTIONS
    //

    // Flex slider
    var flex_slider = function($this){
        $('.hero-slider').flexslider({
            animation: "fade",
            direction: "horizontal",
            animationSpeed: 1000,
            animationLoop: true,
            smoothHeight: false,
            directionNav: false,
            controlsContainer: ".hero-controls",
            controlNav: true,
            slideshow: true,               
            useCSS: true,

            // for Transparent Header
            after: function(slider){
                if($('li.flex-active-slide').hasClass("dark-slider")){
                    $('.header').addClass('white-header');
                }
                else {       
                    $('.header').removeClass('white-header');
                }
                if($('li.flex-active-slide').hasClass("white-slider")){
                    $('.header').addClass('black-header');
                }
                else {       
                    $('.header').removeClass('black-header');
                }
            },
            start: function(slider){
                if($('li.flex-active-slide').hasClass("dark-slider")){
                    $('.header').addClass('inverse-header');
                }
                else {       
                    $('.header').removeClass('inverse-header');
                }
                if($('li.flex-active-slide').hasClass("white-slider")){
                    $('.header').addClass('black-header');
                }
                else {       
                    $('.header').removeClass('black-header');
                }
            }
        });
        
        $('.flex-prev, .flex-next').on('click', function(){
            var href = $(this).attr('href');
            $('.hero-slider').flexslider(href)
            return false;
        })
        
        $('.flexslider').flexslider({
            animation: "fade",
            controlNav: true,
            useCSS: true,
            directionNav: false
        });
    }

    // Animation with Waypoints.js
    var animate_start = function($this) {
        $this.find('.animate').each(function(i) {
            var $item = jQuery(this);
            var animation = $item.data("animate");

            $item.waypoint(function(direction) {
                $item.css({
                    '-webkit-animation-delay': (i * 0.1) + "s",
                    '-moz-animation-delay': (i * 0.1) + "s",
                    '-ms-animation-delay': (i * 0.1) + "s",
                    '-o-animation-delay': (i * 0.1) + "s",
                    'animation-delay': (i * 0.1) + "s"
                });
                $item.removeClass('animate').addClass('animated ' + animation).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                    jQuery(this).removeClass(animation + ' animated');
                });
            }, {
                offset: '80%',
                triggerOnce: true
            });
        });
    };

    //  Parallax Background (Stellar.js)
    var parallax_image = function($this){
        $.stellar({
            horizontalScrolling: false,
            responsive: true
        });
    }
    // Youtube Video Background
    var youtube_bg = function($this){
        $('.video-background').each(function(){
            $(this).YTPlayer({
                videoURL: $(this).data('video-id'),
                containment:'self', 
                showControls:false, 
                autoPlay:true, 
                loop:true, 
                mute:true, 
                startAt:10, 
                opacity:1, 
                addRaster:true, 
                quality:'default'
            });
        });
    }

    // Fullscreen Section
    var fullscreen_section = function($this) {
        $this.find('.fullscreen').each(function() {
            var $this = $(this);
            var resize_height = function() {
                    $this.height($(window).height());
                    fullscreenFix();
            }
            resize_height();
            $(window).resize(function() {
                resize_height();
            });
        });
    }
    function fullscreenFix(){
        var h = $(window).height();
        // set .fullscreen height
        $(".fullscreen").children(".container").each(function(i){
            var hc = $(this).innerHeight() + 270;
            if(hc >= h){
                $(this).parent(".fullscreen").addClass("not-overflow");
            } else {
                $(this).parent(".fullscreen").removeClass("not-overflow");
            }
        });
    }

    // Fix Height 
    var fix_height = function($this) {
        var auto_height = function() {
            if ($(window).width() > 991) {
                $('.auto-height').each(function() {
                    var element = $(this);
                    var height = element.height();
                    var parent_height = element.parent().parent().height();
                    element.css('height', parent_height);
                });
            } else {
                $('.auto-height').each(function() {
                    var element = $(this);
                    element.css('height', 'auto');
                });
            }
        }
        auto_height();
        $(window).resize(function() {
            auto_height();
        });
    }

    // Progress Bar
    var progress_bar = function($this) {
        $this.find('.progress-bar').each(function() {
            var $this = $(this);
            
            $this.waypoint(function(direction) {
                $this.css('width', $this.attr('aria-valuenow') + '%');    
            }, {
                offset: '80%',
                triggerOnce: true
            });
        });
    }

    // Mobile Menu
    var mobile_nav =function($this) {
        $('.menu-toggle').on('click', function() {
            $(this).closest('header').toggleClass('menu-open');
            if ($(this).closest('header').hasClass('menu-3')) {
                $(this).toggleClass('active');
            }
        });
        var add_mm_class = function() {
            if ($(window).width() < 991) {
                $('.menu').addClass('mobile-menu')
            } else {
                $('.menu').removeClass('mobile-menu')
            }
        }
        add_mm_class();
        $(window).resize(function() {
            add_mm_class();
        });
    }
    // Mobile touch
    var mobile_touch = function($this){

        var $menu = $(".mobile-menu");
        $menu.find('li.dropdown').hover(
            function() {
                var $this = $(this);
                $this.find('>.dropdown-menu').slideDown();
            },
            function() {
                $(this).find('>.dropdown-menu').slideUp();
            }
        );
        
    }

    // OWL Carousel
    var owl_carousel = function($this) {
        $('.owl-carousel').each(function() {
            var $this = $(this);
            $this.owlCarousel({
                loop: true,
                margin: 0,
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1,
                        nav: true
                    },
                    768: {
                        items: $this.data('col-sm'),
                        nav: false
                    },
                    992: {
                        items: $this.data('col-md'),
                        nav: true,
                        loop: false
                    },
                    1200: {
                        items: $this.data('col-lg'),
                        nav: true,
                        loop: false
                    }
                }
            });
        });
    }

    // One Page Scrolling Menu
    var one_page_scroll = function ($this) {
        jQuery(function() {
            var sections = jQuery('.section');
            var navigation_links = jQuery('.menu a');
            sections.waypoint({
            handler: function(direction) {
                var active_section;
                active_section = jQuery(this);
                if (direction === "up") active_section = active_section.prev();
                var active_link = jQuery('.menu a[href="#' + active_section.attr("id") + '"]');
                navigation_links.removeClass("active");
                active_link.addClass("active");
                active_section.addClass("active-section");
            },
            offset: '35%'
            });
        });

        // SCROLL DOWN
        jQuery('.menu').localScroll({
            offset: -110,
            duration: 500
        });
    }

    // Scroll Down Mneu
    var scroll_down = function($this) {
        $('a[href*=#]:not([href=#]):not([data-toggle="tab"])').on('click', function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html,body').animate({
                       scrollTop: target.offset().top - 110
                        }, 500);
                    return false;
                }
            }
        });
    }

    // Remove Page Loader Screen Function
    var site_loader = function($this) {
        $('.loader').css('opacity', 0);
        setTimeout(function() {
            $('.loader').hide();
            $('body').addClass('loaded')
        }, 600);
    }
    // Bootstrap Tooltip
    var shortcodes = function($this) {
        $('[data-toggle="tooltip"]').tooltip()

        //count up
        $('.counter').counterUp({
            delay: 10,
            time: 1000
        });
    
        var tab_height;
        $(".nav-tabs > li > a").on('click', function(){
        
            if (!($(this).parent("li").hasClass("active"))) {
                tab_height = $(".tab-content > .tab-pane").filter($(this).attr("href")).height();
                $(".tab-content").animate({
                    height: tab_height
                }, function(){
                    $(".tab-content").css("height", "auto");
                });
                
            }
            
        });
        
        // Accordion
        var allPanels = $(".accordion > dd").hide();
        allPanels.first().slideDown("easeOutExpo");
        $(".accordion > dt > a").first().addClass("active");
        
        $(".accordion > dt > a").on('click', function(){
        
            var current = $(this).parent().next("dd");
            $(".accordion > dt > a").removeClass("active");
            $(this).addClass("active");
            allPanels.not(current).slideUp("easeInExpo");
            $(this).parent().next().slideDown("easeOutExpo");
            
            return false;
            
        });
        
        // Toggle
        var allToggles = $(".toggle > dd").hide();
        
        $(".toggle > dt > a").on('click', function(){
        
            if ($(this).hasClass("active")) {
            
                $(this).parent().next().slideUp("easeOutExpo");
                $(this).removeClass("active");
                
            }
            else {
                var current = $(this).parent().next("dd");
                $(this).addClass("active");
                $(this).parent().next().slideDown("easeOutExpo");
            }
            
            return false;
        });

    }
    
    // Nivo Lightbox
    var nivo_lightbox = function($this) {
        $('a.light-box').nivoLightbox({
            effect: 'fade',                             // The effect to use when showing the lightbox
            theme: 'default',                             // The lightbox theme to use
            keyboardNav: true
        });
    }
    // Sticky Header
    var sticky_header = function ($this) {
        $("<div class='blank-space'></div>").insertAfter("#header");
        $(window).scroll(function() {
            if (window.scrollY > 0 && !$('.mobile-toggle').is(":visible")) {
                $('#header').addClass('sticky');
            } else {
                $('#header').removeClass('sticky');
            }
        });   
    }
    // FOLIO COL
    var folio_col = function($this) {
        var $foliocol = $('.folio-col');
            if ($(window).width() > 1600) {
                $foliocol.css('width', 1600 / 5);
            } else if ($(window).width() > 1199) {
                $foliocol.css('width', $(window).width() / 5);
            } else if ($(window).width() > 991) {
                $foliocol.css('width', $(window).width() / 4);
            } else if ($(window).width() > 767) {
                $foliocol.css('width', $(window).width() / 3);
            } else if ($(window).width() > 500) {
                $foliocol.css('width', $(window).width() / 2);
            } else if ($(window).width() > 300) {
                $foliocol.css('width', $(window).width());
            }

    }
    // ISOTOPE Go
    var isotope_go = function($this) {
        var $container = $('.isotope-container');
        $container.isotope({
            itemSelector: '.isotope-item',
            layoutMode: 'masonry',
            filter: '*',
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        $('ul.portfolio-filter a').on('click', function(){
            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
          return false;
        });
        var $optionSets = $('ul.portfolio-filter'),
           $optionLinks = $optionSets.find('a');
      
           $optionLinks.on('click', function(){
              var $this = $(this);
          // don't proceed if already selected
          if ( $this.hasClass('selected') ) {
              return false;
          }
        var $optionSet = $this.parents('ul.portfolio-filter');
           $optionSet.find('.selected').removeClass('selected');
           $this.addClass('selected'); 
        });
    }
    var isotope_fit_rows = function($this) {
        var $container = $('.isotope-fit-rows');
        $container.isotope({
            layoutMode: 'fitRows',
            itemSelector: '.isotope-item'
        });
    }

})(jQuery);

