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
	$('.navbar-nav .nav-item:contains("POST")').addClass('active');

	// begin loader
	$('.loader').hide();
	$('body').removeClass('lock');

	// animation
	$('.triangles').addClass('loaded')

	// owl-carousel 2x
	$('.post-gallery').owlCarousel({
		items: 1,
		animateIn: 'fadeIn',
		animateOut: 'fadeOut',
		dots: false,
		nav: true,
		navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
		startPosition: 3,
		rewind: true,
		navElement: 'div',
	});

	// form validator
	$('.js-ajax-form').validate()

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

	// scrollTop button
	$('.scroll-top').on('click', (e) => {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: 0
		}, '1500');
	})
});