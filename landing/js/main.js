/*******************************************************
					Reviews Carousel Module
*******************************************************/
(function($) {
	$(".owl-carousel").owlCarousel({
		loop: false,
		margin: 10,
		nav: true,
		items: 1,
		nav: false
	});
})(jQuery);

/*
==========   Map Address Module   ==========
*/
(function($) {

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


})(jQuery);
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
==========   Modals   ==========
*/

(function($) {
	MicroModal.init();
})(jQuery);

/*
==========   Smooth Scroll To Section   ==========
*/
(function($) {
	let links = $(".navigation a");
	let mobileLinks = $(".mobile-navigation a");
	let doScroll = function(e) {
        	let goToClass = e.target.dataset.goTo;
        	$('html, body').animate({
            	scrollTop: $(`.${goToClass}`).offset().top
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
==========   Fixed Navigation   ==========
*/
(function($) {
	let needestScrollHeight = $('.top-line').outerHeight(true);
	let navigation = $(".navigation");
	let isNavigationFixed = false;
    window.addEventListener('scroll', e => {
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




