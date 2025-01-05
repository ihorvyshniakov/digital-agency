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
	// animations
   new WOW().init();

	// begin loader
	$('.loader').hide();
	$('body').removeClass('lock');

	// turn on parallax only for PC's
	$(window).on('resize', function () {
		if ($('body').width() >= 1200) {
			// parallax
			$.stellar({
				responsive: true,
			});
		}
	})

	// sticky navbar on scroll
	$(window).scroll(() => {
		if ($(this).scrollTop() > 0) {
			if (!$('header').hasClass('fix')) {
				$('header').addClass('animate__fadeInDown fix');
			}
			$('.white').addClass('hide');
			$('.black').removeClass('hide');
		} else {
			$('header').removeClass('animate__fadeInDown fix');
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

	// owl-carousel 2x
	$('.review-carousel').owlCarousel({
		items: 1,
		center: true,
		dots: false,
		nav: true,
		navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
		autoHeight: true,
		startPosition: 1,
		rewind: true,
		navElement: 'div',
		mouseDrag: false,
		touchDrag: false
	});
	$('.clients-carousel').owlCarousel({
		dots: true,
		responsive: {
			0: {
				items: 1
			},
			491: {
				items: 2
			},
			781: {
				items: 3
			},
			992: {
				items: 4
			}
		}
	});

	// custom add to carousel
	// arrows click trigger
	$('.owl-prev, .owl-next').on('click', () => {
		let index = $('.owl-item').index($('.owl-item.active')) + 1;
		$('.thumbnail-pagination>a.active').removeClass('active');
		$('.thumbnail-pagination>a:nth-of-type(' + index + ')').addClass('active');
	});
	// photos click trigger
	$('.thumbnail-pagination>a').on('click', (e) => {
		e.preventDefault();
		let indexPrevSlide = $('.thumbnail-pagination>a').index($('.thumbnail-pagination>a.active')) + 1;

		// change active img
		$('.thumbnail-pagination>a.active').removeClass('active');
		$(e.target).addClass('active');

		let indexNextSlide = $('.thumbnail-pagination>a').index($('.thumbnail-pagination>a.active')) + 1;

		// compare prev and clicked slide and change state of slider
		if (indexPrevSlide > indexNextSlide) {
			if (indexPrevSlide - indexNextSlide > 1) {
				$('.owl-prev').trigger('click');
				$('.owl-prev').trigger('click');
			} else {
				$('.owl-prev').trigger('click');
			}
		} else if (indexPrevSlide == indexNextSlide) {} else {
			if (indexNextSlide - indexPrevSlide > 1) {
				$('.owl-next').trigger('click');
				$('.owl-next').trigger('click');
			} else {
				$('.owl-next').trigger('click');
			}
		}
	});

	// filter staff
	// init Isotope
	var $grid = $('.grid').isotope({
		itemSelector: '.grid-item',
		percentPosition: true,
		masonry: {
			// use element for option
			columnWidth: '.grid-sizer'
		}
	});
	// filter items on button click
	$('.filter').on('click', 'li', function (e) {
		// add/remove class active
		$('.f-item.active').removeClass('active');
		$(this).addClass('active');

		var filterValue = $(this).attr('data-filter');
		$grid.isotope({
			filter: filterValue
		});
	});

	// pie-chart
	$(window).on('scroll', () => {
		$('.chart').each(function () {
			var bottom_of_object = $(this).offset().top + $(this).outerHeight();
			var bottom_of_window = $(window).scrollTop() + $(window).height();
			if (bottom_of_window > bottom_of_object) {
				$('.chart').easyPieChart({
					scaleColor: false,
					trackColor: '#ebedee',
					barColor: function (percent) {
						var ctx = this.renderer.getCtx();
						var canvas = this.renderer.getCanvas();
						var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
						gradient.addColorStop(0, "#fa4951");
						gradient.addColorStop(1, "#febf28");
						return gradient;
					},
					lineWidth: 4,
					lineCap: 'round',
					size: 150,
					animate: 1000
				});
			}
		});
	});

	// form validator
	$('.js-ajax-form').validate()

	// scrollTop button
	$('.scroll-top').on('click', (e) => {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: 0
		}, '1500');
	})
})