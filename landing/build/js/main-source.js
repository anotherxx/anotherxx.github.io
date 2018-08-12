$(document).ready(function() {
    /*
    ==========   NiceScroll   ==========
    */
    if(screen.width > 768){
        (function ($) {
            $("body").niceScroll({
                cursorborder: false
            });
        })(jQuery);
    }

    /*
    ==========   Mobile Navigation   ==========
    */
    (function($) {
        var mobileNavigation = $('.mobile-navigation__links');

        $(".mobile-navigation__hamburger").on('click', function(){
            mobileNavigation.toggleClass('mobile-navigation__links--visible');
        });
    })(jQuery);

    /*
    ==========   Wow js Init   ==========
    */
    (function($) {
        new WOW({
            mobile: false
        }).init();
    })(jQuery);

    /*
    ==========   Fixed Navigation   ==========
    */
    (function($) {
        var needestScrollHeight = $('.top-line').outerHeight(true);
        var navigation = $(".navigation");
        var isNavigationFixed = false;
        window.addEventListener('scroll', function(e){
            if(window.pageYOffset > needestScrollHeight && !isNavigationFixed){
                navigation.addClass('navigation--fixed');
                isNavigationFixed = true;
            }

            if(window.pageYOffset < needestScrollHeight && isNavigationFixed){
                navigation.removeClass('navigation--fixed');
                isNavigationFixed = false;
            }
        })
    })(jQuery);


    /*
    ==========   Smooth Scroll To Section   ==========
    */
    (function($) {
        var links = $(".navigation a");
        var mobileLinks = $(".mobile-navigation a");
        var doScroll = function(e) {
            var goToClass = "." + e.target.dataset.goTo;
            $('html, body').animate({
                scrollTop: $(goToClass).offset().top
            }, 500);
        };
        links.click(function(e) {
            e.preventDefault();
            doScroll(e);
        });
        mobileLinks.click(function(e){
            e.preventDefault();
            doScroll(e);
            $(".mobile-navigation__links").removeClass('mobile-navigation__links--visible');
        });
    })(jQuery);

    /*
    ==========   Modals   ==========
    */
    (function($) {
        MicroModal.init();
    })(jQuery);


    /*
    ==========   Owl Carousel Init   ==========
    */
    (function($) {
        $(".owl-carousel").owlCarousel({
            loop: false,
            margin: 10,
            items: 1,
            nav: false
        });
    })(jQuery);

    /*
    ==========   Map Adress Module   ==========
    */
    (function() {

        ymaps.ready(initMap);

        function initMap()
        {
            var myMap = new ymaps.Map("address-map", {
                center: [59.959012,30.313523],
                zoom: 16
            });

            var myPlaceMark = new ymaps.Placemark([59.959012,30.313523], {
                hintContent: "Расположение"
            });

            myMap.geoObjects.add(myPlaceMark);
        }


    })();
});
