'use strict';

// Check browser 4 accessing webp
function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";

}

testWebP(function (support) {
	if (support == true) {
		document.querySelector('body').classList.add('webp');
	} else {
		document.querySelector('body').classList.add('no-webp');
	}

});

$(window).on('load', function () {
	// navigation trigger to needed page
	$('.navbar-nav .nav-item.active').removeClass('active');
	$('.navbar-nav .nav-item:contains("CONTACT")').addClass('active');

	// begin loader
	$('.loader').hide();
	$('body').removeClass('lock');

	// animation
	$('.triangles').addClass('loaded')

	// sticky navbar on scroll
	$(window).scroll(() => {
		if ($(this).scrollTop() > 52) {
			if (!$('.navbar').hasClass('fix')) {
				$('.navbar').addClass('fix');
			}
			$('.white').addClass('hide');
			$('.black').removeClass('hide');
		} else {
			$('.navbar').removeClass('fix');
			$('.white').removeClass('hide');
			$('.black').addClass('hide');
			if ($('.navbar-toggler').attr('aria-expanded') === 'true') {
				$('.navbar-toggler').trigger('click');
			}
		}
	});
	// sticky navbar on burger click
	$('.navbar-toggler').on('click', () => {
		if ($('.navbar-toggler').hasClass('collapsed')) {
			if ($(this).scrollTop() == 0) {
				$('header').addClass('animate__fadeInDown fix');
			}
			$('.white').addClass('hide');
			$('body, html').addClass('lock');
			$('.black').removeClass('hide');
		} else {
			$('header').removeClass('animate__fadeInDown');
			if ($(this).scrollTop() == 0) {
				$('header').removeClass('fix');
				$('.white').removeClass('hide');
				$('.black').addClass('hide');
			}
			$('body, html').removeClass('lock');
		}
	})

	// form validator
	$('.js-ajax-form').validate()

	// maps
	const lat1=40.747393262031714;
	const lng1=-73.98988571554197;
	var map = new GMaps({
		el: '#map',
		lat: lat1,
		lng: lng1,
	});
	map.addMarker({
		lat: lat1,
		lng: lng1,
		icon: 'img/marker.png',
		infoWindow: {
			content: '<div class="map-info"><div class="map-title"><h3><img alt="" src="img/brand.png"></h3></div><p class="map-address"><i class="fa fa-map-marker"></i><span class="text"><strong>100 Broadway</strong><br> New York, NY 10005, США</span><br><i class="fa fa-phone"></i><span class="text">604-788-1832</span><br><span class="map-email"><i class="fa fa-envelope"></i><span class="text">info@sitename.com</span></span></p><p><a href="https://www.google.com/maps/place/851+6th+Ave,+New+York,+NY+10001,+USA/data=!4m2!3m1!1s0x89c259af44f80211:0xbd87d30d3c7da9d2?sa=X&amp;ei=KqAdVazxJMTkuQS9sIGIBQ&amp;aved=0CB0Q8gEwAA" target="_blank">Open on Google Maps</a></p></div>'
		}
	 });

	// scrollTop button
	$('.scroll-top').on('click', (e) => {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: 0
		}, '1500');
	})
});