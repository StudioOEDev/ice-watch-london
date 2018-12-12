var assetPath = 'http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis';

var isMobile;

var aspectRatio = 1.777;

var ss_timeout = 25000;

$(document).ready(function(){

    getAirtableData()

	if(mobileAndTabletcheck()) {
		isMobile = true;
	} else {
		isMobile = false;
	}

	if(isMobile) {
		$('body').addClass('mobile');
	} else {
		// Force to top of page
		$(window).on('beforeunload', function() {
			$(window).scrollTop(0);
		});
		$(document).scrollTop(0);
	}

    // Make media gaps clickless
    if(!isMobile) {
    	$('.media-gap').closest('.row').css({'pointer-events': 'none'});
    	$('.media-gap').closest('.columns').css({'pointer-events': 'none'});
    } else {
    	$('.media-gap').closest('.columns').css({'padding-left': '0', 'padding-right': '0'});
		$('.media-gap').closest('.row').css({'padding-left': '0', 'padding-right': '0'});
		$('.medium-offset-5').removeClass('medium-offset-5 medium-7 large-offset-4 large-8');
    }

	// Tooltips
	$('[data-caption!=""]').qtip({ // Grab all elements with a non-blank data-caption attr.
		content: {
			attr: 'data-caption' // Tell qTip2 to look inside this attr for its content
		},
		position: {
			target: 'mouse',
			adjust: {
				mouse: true  // Can be omitted (e.g. default behaviour)
			}
		}
	});

	// Mobile Nav
	$('#navigation').slicknav({
		label: "",
		closeOnClick: true
	});
	if(isMobile) {
		$('.slicknav_menu').css('display', 'block');
	}

	// Legal notice
	$('#legal-bt').click(function() {
		var $legalInfo = $('#legal .press-item');
		var $arrow = $('#legal .arrow');
		if($legalInfo.hasClass('hidden')) {
			$legalInfo.removeClass('hidden');
			$arrow.addClass('down');
			$.scrollTo(this, 500, {
				easing: 'easeOutQuad',
				offset: -57
			});
			return false;
		} else {
			$legalInfo.addClass('hidden');
			$arrow.removeClass('down');
		}
	});

	// Click to scroll to info section
	$('.scrollto').click(function(e){
		$.scrollTo(document.getElementById($(this).data('scrollto')), 650, {
			easing: 'easeOutQuad',
			offset: -57
		});
		return false;
	});

	// Screensaver Functionality
	var s_saver;

	if(!isMobile) {
		function onUserAction() {
			clearTimeout(s_saver);
			s_saver = setTimeout(function(){
				$('#content-panel').stop().fadeTo(2500, 0);
			}, ss_timeout);
			$('#content-panel').stop().fadeTo(100, 1);
		}
		$('body').on('mousemove', onUserAction);
		$(window).on('scroll', onUserAction);
	}

	// Init bg intro video
	if(isMobile) {
		$('.media-gallery').replaceWith('<div class="mobile-intro-bg"></div>');
		initSlideshow('.media-gap:eq(0)', 'slideshow1', aspectRatio, true);
		initSlideshow('.media-gap:eq(1)', 'slideshow2', aspectRatio, true);
		initSlideshow('.media-gap:eq(2)', 'slideshow3', aspectRatio, true);
	} else {
		initSlideshow('.media-gallery', 'slideshowIntro', aspectRatio, false);
	}

	// Init social buttons
	$('.twitter-popup').click(function(event) {
		var width  = 575,
		    height = 400,
		    left   = ($(window).width()  - width)  / 2,
		    top    = ($(window).height() - height) / 2,
		    url    = this.href,
		    opts   = 'status=1' +
		             ',width='  + width  +
		             ',height=' + height +
		             ',top='    + top    +
		             ',left='   + left;

		window.open(url, 'twitter', opts);
		return false;
	});

	$('.facebook-popup').click(function(event) {
		var width	= 400,
			height	= 300,
			left 	= (window.screen.width / 2) - ((width / 2) + 10),
			top  	= (window.screen.height / 2) - ((height / 2) + 50);
		var windowFeatures = "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + left + ",top=" + top + ",screenX=" + left + ",screenY=" + top + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no";
		var u = location.href;
		var t = document.title;
		window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(u)+'&t='+encodeURIComponent(t),'sharer', windowFeatures);
		return false;
	});

	// Handle window resize
	if(!isMobile)
		initWaypoints();

	$(window).on('resize', function() {
		resizeSlideshow();
		if(!isMobile)
			Waypoint.refreshAll();
	}).trigger('resize');

	// Fade in

	$('.logo-stroke-white').delay(3000).fadeTo(5000, 0);

});

function getAirtableData() {
  var typeFunc = {
    'html': ( e ) => {if ('html' in e) {$('#'+e.id).html(e.html)}}
  }

  dataTypes = ['html']
  apiKey = 'keyJLphBGupIn2AC0'
  dataTypes.forEach( (dataType) => {
    airtableURL = 'https://api.airtable.com/v0/appreTVJ5YHFpiVmS/'+dataType+'?api_key='+apiKey
    $.get( airtableURL,  function (data, textStatus, jqXHR) {  // success callback
      insertAirtableData( data, typeFunc[dataType] )
    })
  })
}

function insertAirtableData( data, func ) {
  data.records.forEach( ( record ) => {
    fields = record.fields
    //console.log(fields)
    func(fields)
  })
}

function destroySlideshow(gallerySelector) {

	if(!isMobile) {
		try {
			//destroy videojs players
			$.each(_V_.players, function(key, player) {
				if(player != null) {
					player.dispose();
				} else {
					delete _V_.players[key];
				}
			});

			//destroy flickity
			$(gallerySelector).flickity('destroy');

			//empty
			$(gallerySelector).empty();

		} catch(e) {
			console.log('Cound not destroy slideshow');
		}
	}

}

function initSlideshow(gallerySelector, slideshowName, aspectRatio, shouldShowControls, callback) {

	var url = window.location.href + 'partials/' + slideshowName + '.html';

	(function(gallerySelector, slideshowName, aspectRatio, shouldShowControls, callback) {

		$(gallerySelector).load(url, function() {

			resizeSlideshow();

			var slideCount = $(gallerySelector).find('img, video').length;

			$(gallerySelector).each(function() {

				var showControls, shouldWrap, showDots;
				if(shouldShowControls !== undefined && shouldShowControls === false) {
					showControls = false;
					shouldWrap = true;
					showDots = false;
				} else {
					showControls = true;
					shouldWrap = false;
					if(slideCount < 2) {
						showDots = false;
					} else {
						showDots = true;
					}
				}

				// Init flickity slideshow
				$(this).flickity({
					cellAlign: 'left',
					imagesLoaded: true,
					prevNextButtons: false,
					pageDots: showDots,
					wrapAround: shouldWrap,
					contain: true
				});

				this.lastIndex = 0;

				// Add arrow UI elements
				if(showControls) {

					var $viewport = $(this).find('.flickity-viewport');
					var $left, $right;
					if(!isMobile) {
						$viewport.append('<span class="arrow arrow--left media-gallery-left"></span><span class="arrow arrow--right media-gallery-right"></span>');
						$left = $viewport.find('.media-gallery-left');
						$right = $viewport.find('.media-gallery-right');
						$left.hide();
						if($(this).find('.gallery-cell').length <= 1) {
							$right.hide();
						}
					}

					// Handle arrow left click
					$viewport.find('.media-gallery-left').click(function() {
						var $gallery = $(this).closest(gallerySelector);
						$gallery.flickity('previous');
						$gallery.find('.media-gallery-right').show();
						var flkty = $gallery.data('flickity');
						if(flkty.selectedIndex === 0) {
							$(this).hide();
						} else {
							$(this).show();
						}
						var $gallery = $(this).closest('.media-gallery');
						var flkty = $gallery.data('flickity');
						onSelected(flkty.selectedIndex, $gallery[0]);
						$gallery[0].lastIndex = flkty.selectedIndex;
					});

					// Handle arrow right click
					$viewport.find('.media-gallery-right').click(function() {
						var $gallery = $(this).closest(gallerySelector);
						$gallery.flickity('next');
						$gallery.find('.media-gallery-left').show();
						var flkty = $gallery.data('flickity');
						var len = $gallery.find('.gallery-cell').length;
						if(flkty.selectedIndex === len - 1) {
							$(this).hide();
						} else {
							$(this).show();
						}
						var $gallery = $(this).closest('.media-gallery');
						var flkty = $gallery.data('flickity');
						onSelected(flkty.selectedIndex, $gallery[0]);
						$gallery[0].lastIndex = flkty.selectedIndex;
					});

					// Handle drag events event
					$(this).on('dragStart', function(event, pointer) {
						var flkty = $(this).data('flickity');
						var $slides = $(this).find('img, video');
						var current = $slides[flkty.selectedIndex];
						if(current.nodeName === 'VIDEO') {
							var id = $(current).attr('id');
							videojs(id).pause();
						}
						if(isMobile) {
							this.allowVideoPlay = false;
						}
					});
					$(this).on( 'dragEnd', function( event, pointer ) {
						var flkty = $(this).data('flickity');
						if(!isMobile) {
							var $left = $(this).find('.media-gallery-left');
							var $right = $(this).find('.media-gallery-right');
							if(this.lastIndex < flkty.selectedIndex) {
								$left.show();
								var flkty = $(this).data('flickity');
								var len = $(this).find('.gallery-cell').length;
								if(flkty.selectedIndex === len - 1) {
									$right.hide();
								} else {
									$right.show();
								}
							} else if(this.lastIndex > flkty.selectedIndex) {
								$right.show();
								var flkty = $(this).data('flickity');
								if(flkty.selectedIndex === 0) {
									$left.hide();
								} else {
									$left.show();
								}
							}
						}
						if(this.lastIndex !== flkty.selectedIndex) {
							onSelected(flkty.selectedIndex, this);
							this.lastIndex = flkty.selectedIndex;
						}
						if(isMobile) {
							var me = this;
							setTimeout(function() {
								me.allowVideoPlay = true;
							}, 10);
						}
					});

				}

				// Don't init videojs on mobile
				if(isMobile) {
					$('video').removeAttr('data-setup');
					$('video').removeClass('video-js');
				}

				$(this).find('video').each(function(index) {
					var id = $(this).attr('id');
					var v = this;

					(function(id, index) {

						videojs(id).ready(function() {

							var vId = this.Qa;
							var v = $('#' + vId).find('video');
							var vp = $('#' + vId).find('.vjs-poster');

							// Video tooltips
							$('[data-caption!=""]').qtip({
								content: {
									attr: 'data-caption'
								},
								position: {
									target: 'mouse',
									adjust: {
										mouse: true
									}
								}
							});

							resizeSlideshow();
							var player = this;
							if(!showControls) {
								// Hide videojs controls
								$(v).closest('.video-js').find('.vjs-control-bar, .vjs-big-play-button').remove();
								if(index === 0) {
									player.play();
								}
							}
							// Hide fullscreen
							$(v).closest('.video-js').find('.vjs-fullscreen-control').remove();
							if(!isMobile) {
								// Handle video end event (Go to next slide)
								(function(videoId) {
									player.on('ended', function() {
										var $gallery = $('#'+videoId).closest('.media-gallery');
										$gallery.flickity('next');
										var flkty = $gallery.data('flickity');
										onSelected(flkty.selectedIndex, $gallery[0]);
										$gallery[0].lastIndex = flkty.selectedIndex;
									});
								})(id);
							} else {
								// Hide controls for mobile
								$(v).closest('.video-js').find('.vjs-control-bar').remove();
								$(v).closest('.video-js').children().css('pointer-events', 'none');
								$(v).closest('.gallery-cell')
								.on('click', function() {
									if($(v).closest('.media-gap')[0].allowVideoPlay) {
										if($(v).closest('.video-js').hasClass('vjs-playing')) {
											player.pause();
										} else {
											player.play();
										}
									}
								});
							}
						});
					})(id, index);
				});

			});

			if(callback) {
				callback();
			}

		});

	})(gallerySelector, slideshowName, aspectRatio, shouldShowControls, callback);

}

function onSelected(index, galleryElement) {

	var $slides = $(galleryElement).find('img, video');
	var lastIndex = galleryElement.lastIndex;
	var element = $slides.eq(index)[0];
	var prevElement = $slides.eq(lastIndex)[0];
	var firstElement = $slides.eq(0)[0];

	if(index !== lastIndex) {
		if(prevElement.nodeName === 'VIDEO') {
				// Pause previous video
				var id = $(prevElement).attr('id');
				videojs(id).pause();
			}
			if(element.nodeName === 'VIDEO') {
				if(!isMobile) {
					// Play current video
					var id = $(element).attr('id');
					videojs(id).play();
				}
			}
		}
	}

	function resizeSlideshow() {

		var ww = $(window).width();
		var wh = $(window).height();
		var a = ww / wh;

		var w, h, t, l;

		if(isMobile) {
			w = ww;
			h = w / aspectRatio;
			t = 0;
			l = 0;

			$('.media-gap, .flickity-viewport, .gallery-cell').css({
				'width': w + 'px',
				'height': h + 'px'
			});

			$('.gallery-cell div.video-js, .gallery-cell div.img-wrapper').css({
				'width': w + 'px',
				'height': h + 'px',
				'top': '0',
				'left': '0'
			});

			$('.gallery-cell img, .gallery-cell video').css({
				'width': w + 'px',
				'height': 'auto'
			});

		} else {
			if(aspectRatio > a) {
			//media wider than screen, match by height
			h = wh;
			w = wh * aspectRatio;
			t = 0;
			l = (ww - w) * 0.5;
		} else {
			//screen wider than media, match by width
			w = ww;
			h = ww / aspectRatio;
			t = (wh - h) * 0.5;
			l = 0;
		}

		$('.media-gallery, .flickity-viewport, .gallery-cell').css({
			'width': ww + 'px',
			'height': wh + 'px'
		});

		$('.gallery-cell div.video-js, .gallery-cell div.img-wrapper').css({
			'width': w + 'px',
			'height': h + 'px',
			'top': t + 'px',
			'left': l + 'px'
		});

		$('.gallery-cell img, .gallery-cell video').css({
			'width': w + 'px',
			'height': 'auto'
		});

		$('.vjs-control-bar').css({
			'bottom': -t + 'px',
			'left': -l + 'px',
			'right': -l + 'px'
		});
	}



}

function initWaypoints() {

	// Intro text top (toggle video)
	new Waypoint({
		element: $('#intro-text').closest('.row')[0],
		handler: function(direction) {
			if(direction === 'up') {
				destroySlideshow('.media-gallery');
				initSlideshow('.media-gallery', 'slideshowIntro', aspectRatio, false);
				$('.logo-stroke-red, .logo-stroke-white').show();
			} else {
				destroySlideshow('.media-gallery');
				initSlideshow('.media-gallery', 'slideshow1', aspectRatio, true, function() {
					if(!isMobile) {
						playSlideshow('.media-gallery');
					}
				});
				$('.logo-stroke-red, .logo-stroke-white').hide();
			}
		}
	});

	// Intro text bottom (show/hide nav)
	if(!isMobile) {
		new Waypoint({
			element: $('#intro-text').closest('.row')[0],
			handler: function(direction) {
				if(direction === 'up') {
					hideNav();
				} else {
					showNav();
				}
			},
			offset: function() {
				return ($(window).height() - $(this.element).height()) * 0.5;
			}
		});
	}

	// Project info top (play/pause slideshow 1)
	new Waypoint({
		element: $('#project-info').closest('.row')[0],
		handler: function(direction) {
			if(direction === 'up') {
				if(!isMobile) {
					// hideNav();
					playSlideshow('.media-gallery');
				}
			} else {
				if(!isMobile) {
					// showNav();
					stopSlideshow('.media-gallery');
				}
			}
		}
	});

	// Project info middle (swap slideshows)
	new Waypoint({
		element: $('#project-info').closest('.row')[0],
		handler: function(direction) {
			if(direction === 'up') {
				destroySlideshow('.media-gallery');
				initSlideshow('.media-gallery', 'slideshow1', aspectRatio, true, function() {
					// playSlideshow('.media-gallery');
				});
			} else {
				destroySlideshow('.media-gallery');
				initSlideshow('.media-gallery', 'slideshow2', aspectRatio, true, function() {
					// playSlideshow('.media-gallery');
				});
			}
		},
		offset: function() {
			return ($(window).height() - $(this.element).height()) * 0.5;
		}
	});

	// Project info bottom (play/pause slideshow 2)
	new Waypoint({
		element: $('#project-info').closest('.row')[0],
		handler: function(direction) {
			if(direction === 'down') {
				if(!isMobile) {
					// hideNav();
					playSlideshow('.media-gallery');
				}
			} else {
				if(!isMobile) {
					// showNav();
					stopSlideshow('.media-gallery');
				}
			}
		},
		offset: 'bottom-in-view'
	});

	// Climate facts top (play/pause slideshow 1)
	new Waypoint({
		element: $('#climate-facts').closest('.row')[0],
		handler: function(direction) {
			if(direction === 'up') {
				if(!isMobile) {
					// hideNav();
					whiteNav();
					playSlideshow('.media-gallery');
				}
			} else {
				if(!isMobile) {
					// showNav();
					redNav();
					stopSlideshow('.media-gallery');
				}
			}
		}
	});

	// Climate facts middle (swap slideshows)
	new Waypoint({
		element: $('#climate-facts').closest('.row')[0],
		handler: function(direction) {
			if(direction === 'up') {
				destroySlideshow('.media-gallery');
				initSlideshow('.media-gallery', 'slideshow2', aspectRatio, true, function() {
					// playSlideshow('.media-gallery');
				});
			} else {
				destroySlideshow('.media-gallery');
				initSlideshow('.media-gallery', 'slideshow3', aspectRatio, true, function() {
					// playSlideshow('.media-gallery');
				});
			}
		},
		offset: function() {
			return ($(window).height() - $(this.element).height()) * 0.5;
		}
	});

	// Climate facts bottom (play/pause slideshow 2)
	new Waypoint({
		element: $('#climate-facts').closest('.row')[0],
		handler: function(direction) {
			if(direction === 'down') {
				if(!isMobile) {
					// hideNav();
					whiteNav();
					playSlideshow('.media-gallery');
				}
			} else {
				if(!isMobile) {
					// showNav();
					redNav();
					stopSlideshow('.media-gallery');
				}
			}
		},
		offset: 'bottom-in-view'
	});

	// Press top (play/pause slideshow 1)
	new Waypoint({
		element: $('#press').closest('.row')[0],
		handler: function(direction) {
			if(direction === 'up') {
				if(!isMobile) {
					// hideNav();
					playSlideshow('.media-gallery');
				}
			} else {
				if(!isMobile) {
					// showNav();
					stopSlideshow('.media-gallery');
				}
			}
		}
	});

}

function playSlideshow(gallerySelector) {
	var $gallery = $(gallerySelector);
	var flkty = $gallery.data('flickity');
	if(flkty === undefined) {
		//begin polling here?
		return;
	}
	var $slides = $gallery.find('video, img');
	var el = $slides[flkty.selectedIndex];
	if(el.nodeName === 'VIDEO') {
		var id = $(el).attr('id');
		videojs(id).currentTime(0);
		videojs(id).play();
	}
}

function stopSlideshow(gallerySelector) {
	var $gallery = $(gallerySelector);
	var flkty = $gallery.data('flickity');
	if(flkty === undefined) {
		return;
	}
	var $slides = $gallery.find('video, img');
	var el = $slides[flkty.selectedIndex];
	if(el.nodeName === 'VIDEO') {
		var id = $(el).attr('id');
		videojs(id).pause();
	}

}

function hideNav() {
	var $nav = $('#navigation');
	if(!$nav.hasClass('hidden')) {
		$nav.addClass('hidden');
	}
}

function showNav() {
	$('#navigation').removeClass('hidden');
}

function redNav() {
	var $nav = $('#navigation');
	if(!$nav.hasClass('red')) {
		$nav.addClass('red');
	}
}

function whiteNav() {
	$('#navigation').removeClass('red');
}

window.mobilecheck = function() {
	var check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
}

window.mobileAndTabletcheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}
