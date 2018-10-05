(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

var title = 'Ice Watch London'
var description = 'A project by Olafur Eliasson and Minik Rosing, on the occasion of COP 21 – United Nations Conference on Climate Change.'
var pageUrl = 'http://icewatchlondon.com'
var image = 'http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/image/assets/thumbnail.jpg'
var twitterHandle = '@olafureliasson'
buf.push("<!DOCTYPE html><html lang=\"en\"><head><title>" + (jade.escape(null == (jade_interp = 'Ice Watch London') ? "" : jade_interp)) + "</title><meta name=\"description\"" + (jade.attr("content", '' + (description) + '', true, true)) + "><meta name=\"keywords\" content=\"Ice Watch,COP 21,Climate Change,United Nations,Paris,London,Olafur Eliasson,Minik Rosing,Greenland,Ice\"><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no\"><meta name=\"twitter:card\"" + (jade.attr("content", '' + (title) + '', true, true)) + "><meta name=\"twitter:site\"" + (jade.attr("content", '' + (twitterHandle) + '', true, true)) + "><meta name=\"twitter:title\"" + (jade.attr("content", '' + (title) + '', true, true)) + "><meta name=\"twitter:description\"" + (jade.attr("content", '' + (description) + '', true, true)) + "><meta name=\"twitter:creator\"" + (jade.attr("content", '' + (twitterHandle) + '', true, true)) + "><meta name=\"twitter:image\"" + (jade.attr("content", '' + (image) + '', true, true)) + "><meta property=\"og:title\"" + (jade.attr("content", '' + (title) + '', true, true)) + "><meta property=\"og:type\" content=\"website\"><meta property=\"og:url\"" + (jade.attr("content", '' + (pageUrl) + '', true, true)) + "><meta property=\"og:image\"" + (jade.attr("content", '' + (image) + '', true, true)) + "><meta property=\"og:description\"" + (jade.attr("content", '' + (description) + '', true, true)) + "><meta property=\"og:site_name\"" + (jade.attr("content", '' + (title) + '', true, true)) + "><link rel=\"icon\" type=\"image/png\" href=\"http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/image/assets/favicon.png\"><link rel=\"stylesheet\" href=\"vendor.css\"><link rel=\"stylesheet\" href=\"app.css\"><script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){\n(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\nm=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\n})(window,document,'script','//www.google-analytics.com/analytics.js','ga');\n\nga('create', 'UA-30609807-3', 'auto');\nga('send', 'pageview');</script><div class=\"media-gallery\"></div><div id=\"logo-panel\" data-scrollto=\"content-panel\" class=\"logo-stroke-red scrollto\"></div><div id=\"logo-panel\" data-scrollto=\"content-panel\" class=\"logo-stroke-white bg-red scrollto\"></div><div id=\"content-panel\" class=\"content-toggle\"><ul id=\"navigation\" class=\"columns hide-for-small-only medium-4 large-3 content-toggle hidden\"><li id=\"nav-project-info\"><a href=\"#project-info\" data-scrollto=\"project-info\" class=\"scrollto\">Project Info</a></li><li id=\"nav-climate-facts\"><a href=\"#climate-facts\" data-scrollto=\"climate-facts\" class=\"scrollto\">Climate Facts</a></li><li id=\"nav-press\"><a href=\"#press\" data-scrollto=\"press\" class=\"scrollto\">Press</a></li><li id=\"nav-instagram\"><a href=\"http://icewatchparis.com/instagram\">#IceWatchLondon</a></li><li id=\"nav-social\"><a href=\"http://twitter.com/share?text=Follow the journey of the ice. Ice Watch by @olafureliasson and Minik Rosing;hashtags=icewatchparis\" class=\"twitter-popup social-button icon-1446658193_twitter_online_social_media\">&#xe800;</a><a href=\"#\" class=\"facebook-popup social-button icon-1446658206_online_social_media_facebook\">&#xe801;</a></li></ul><div class=\"row full-width red\"><div class=\"columns small-12\"><section id=\"intro-text\" class=\"content-section\"><h3 id=\"intro\"></h3></section></div></div><div class=\"row full-width\"><div class=\"columns small-12\"><section class=\"media-gap\"></section></div></div><div class=\"row full-width white-clear\"><div class=\"columns small-12\"><section class=\"quote-text content-section\"><h3 id=\"intro-quote\"></h3></section></div></div><div class=\"row full-width red\"><div class=\"columns small-12 medium-offset-5 medium-7 large-offset-4 large-8\"><section id=\"project-info\" class=\"content-section\"><p><span id=\"about-info\"> </span></p><div><div class=\"columns small-6 medium-6 large-6\"><a href=\"http://bloomberg.org\" style=\"border-bottom: none\" target=\"_blank\"><img src=\"http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/image/assets/bloomberg-logo-white.png\" class=\"partner-logo\"></a></div><div class=\"columns small-6 medium-6 large-6\"><a href=\"http://www.juliesbicycle.com\" style=\"border-bottom: none\" target=\"_blank\"><img src=\"http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/image/assets/julie-logo-white.png\" class=\"partner-logo\"></a></div></div><br><br></section></div></div><div class=\"row full-width\"><div class=\"columns small-12\"><section class=\"media-gap\"></section></div></div><div class=\"row full-width white-clear\"><div class=\"columns small-12\"><section class=\"quote-text content-section\"><h3 id=\"olafur-quote\"></h3></section></div></div><div class=\"row full-width white\"><div class=\"columns small-12 medium-offset-5 medium-7 large-offset-4 large-8\"><section id=\"climate-facts\" class=\"content-section\"></section></div></div><div class=\"row full-width\"><div class=\"columns small-12\"><section class=\"media-gap\"></section></div></div><div class=\"row full-width red\"><div class=\"columns small-12 medium-offset-5 medium-7 large-offset-4 large-8\"><section id=\"press\" class=\"content-section\"><p class=\"subsection-heading\">Press contacts</p><div class=\"press-item-basic-top clearfix\"><div id=\"press-contact-1\"></div></div><div class=\"press-item-basic clearfix\"><div id=\"press-contact-2\"></div></div><div class=\"press-item-basic clearfix\"><div id=\"press-contact-3\"></div></div><div class=\"press-item-basic clearfix\"><div id=\"press-contact-4\"></div></div><br><br><p class=\"subsection-heading\">Social</p><div class=\"press-item-basic-top clearfix\"><div class=\"press-item-basic clearfix\"><div id=\"twitter-list\" class=\"columns\"></div></div><div class=\"press-item-basic clearfix\"><div id=\"instagram-list\" class=\"columns\"></div></div></div><br><p class=\"subsection-heading\">Downloads</p><div id=\"press-items\"></div></section></div></div><div class=\"row full-width red\"><div class=\"columns small-12 medium-offset-5 medium-7 large-offset-4 large-8\"><section id=\"legal\" class=\"content-section\"><p class=\"subsection-heading\"><span id=\"legal-bt\">Legal&nbsp;&nbsp;<span class=\"arrow\">&#8250;</span></span></p><div class=\"press-item clearfix hidden\"><p>Studio Olafur Eliasson GmbH<br/>\nChristinenstrasse 18/19, Haus 2<br/>\n10119 Berlin</p><p>Director<br/>\nOlafur Eliasson</p><p>Contact<br/>\nstudio@olafureliasson.net<br/>\n+49 30 2000 391 50</p><p>VAT ID: DE 247257125<br/>\nTax No.: 37/415/21533<br/>\nCommercial registry: HRB 99366<br/>\nRegistration office: Amtsgericht Charlottenburg</p><p>The copyright for published objects developed by Studio Olafur Eliasson GmbH itself remains only with Studio Olafur Eliasson GmbH. The use or sharing of such images, audio features, video sequences, and texts in other electronic or printed publications is permitted for all non-commercial purposes.</p><p>Studio Olafur Eliasson GmbH explicitly reserves the right to alter, supplement, or delete parts or the whole of the website's content, or to temporarily or completely discontinue publication without further notice.</p><p>Studio Olafur Eliasson GmbH has no influence whatsoever on content offered through direct or indirect links to other web providers and pages and does not endorse any of this content – with the exception of the content on social media profiles administered by Studio Olafur Eliasson GmbH.</p><p>Third Party Cookies<br/>\nThe sharing buttons on this site that allow visitors to share content onto social networks use cookies. The cookies are set by domains external to this website and are required in order to implement these buttons and connect them to the relevant social networks and third party sites. You should be aware that these sites are likely to be collecting information about what you are doing all around the internet, including on this website. You should check the respective policies of each of these sites to see how exactly they use your information and to find out how to opt out, or delete, such information.</p></div></section><section id=\"privacy\" class=\"content-section\"><p class=\"subsection-heading\"><a href=\"http://olafureliasson.net/privacy\" target=\"_blank\" class=\"btn\">Privacy</a></p></section></div></div></div><script src=\"vendor.js\"></script><script src=\"app.js\"></script></head></html>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
;var assetPath = 'http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis';

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

;var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"media-gallery\"></div><div id=\"logo-panel\" data-scrollto=\"content-panel\" class=\"logo-stroke-red scrollto\"></div><div id=\"logo-panel\" data-scrollto=\"content-panel\" class=\"logo-stroke-white bg-red scrollto\"></div><div id=\"content-panel\" class=\"content-toggle\"><ul id=\"navigation\" class=\"columns hide-for-small-only medium-4 large-3 content-toggle hidden\"><li id=\"nav-project-info\"><a href=\"#project-info\" data-scrollto=\"project-info\" class=\"scrollto\">Project Info</a></li><li id=\"nav-climate-facts\"><a href=\"#climate-facts\" data-scrollto=\"climate-facts\" class=\"scrollto\">Climate Facts</a></li><li id=\"nav-press\"><a href=\"#press\" data-scrollto=\"press\" class=\"scrollto\">Press</a></li><li id=\"nav-instagram\"><a href=\"http://icewatchparis.com/instagram\">#IceWatchLondon</a></li><li id=\"nav-social\"><a href=\"http://twitter.com/share?text=Follow the journey of the ice. Ice Watch by @olafureliasson and Minik Rosing;hashtags=icewatchparis\" class=\"twitter-popup social-button icon-1446658193_twitter_online_social_media\">&#xe800;</a><a href=\"#\" class=\"facebook-popup social-button icon-1446658206_online_social_media_facebook\">&#xe801;</a></li></ul><div class=\"row full-width red\"><div class=\"columns small-12\"><section id=\"intro-text\" class=\"content-section\"><h3 id=\"intro\"></h3></section></div></div><div class=\"row full-width\"><div class=\"columns small-12\"><section class=\"media-gap\"></section></div></div><div class=\"row full-width white-clear\"><div class=\"columns small-12\"><section class=\"quote-text content-section\"><h3 id=\"intro-quote\"></h3></section></div></div><div class=\"row full-width red\"><div class=\"columns small-12 medium-offset-5 medium-7 large-offset-4 large-8\"><section id=\"project-info\" class=\"content-section\"><p><span id=\"about-info\"> </span></p><div><div class=\"columns small-6 medium-6 large-6\"><a href=\"http://bloomberg.org\" style=\"border-bottom: none\" target=\"_blank\"><img src=\"http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/image/assets/bloomberg-logo-white.png\" class=\"partner-logo\"/></a></div><div class=\"columns small-6 medium-6 large-6\"><a href=\"http://www.juliesbicycle.com\" style=\"border-bottom: none\" target=\"_blank\"><img src=\"http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/image/assets/julie-logo-white.png\" class=\"partner-logo\"/></a></div></div><br/><br/></section></div></div><div class=\"row full-width\"><div class=\"columns small-12\"><section class=\"media-gap\"></section></div></div><div class=\"row full-width white-clear\"><div class=\"columns small-12\"><section class=\"quote-text content-section\"><h3 id=\"olafur-quote\"></h3></section></div></div><div class=\"row full-width white\"><div class=\"columns small-12 medium-offset-5 medium-7 large-offset-4 large-8\"><section id=\"climate-facts\" class=\"content-section\"></section></div></div><div class=\"row full-width\"><div class=\"columns small-12\"><section class=\"media-gap\"></section></div></div><div class=\"row full-width red\"><div class=\"columns small-12 medium-offset-5 medium-7 large-offset-4 large-8\"><section id=\"press\" class=\"content-section\"><p class=\"subsection-heading\">Press contacts</p><div class=\"press-item-basic-top clearfix\"><div id=\"press-contact-1\"></div></div><div class=\"press-item-basic clearfix\"><div id=\"press-contact-2\"></div></div><div class=\"press-item-basic clearfix\"><div id=\"press-contact-3\"></div></div><div class=\"press-item-basic clearfix\"><div id=\"press-contact-4\"></div></div><br/><br/><p class=\"subsection-heading\">Social</p><div class=\"press-item-basic-top clearfix\"><div class=\"press-item-basic clearfix\"><div id=\"twitter-list\" class=\"columns\"></div></div><div class=\"press-item-basic clearfix\"><div id=\"instagram-list\" class=\"columns\"></div></div></div><br/><p class=\"subsection-heading\">Downloads</p><div id=\"press-items\"></div></section></div></div><div class=\"row full-width red\"><div class=\"columns small-12 medium-offset-5 medium-7 large-offset-4 large-8\"><section id=\"legal\" class=\"content-section\"><p class=\"subsection-heading\"><span id=\"legal-bt\">Legal&nbsp;&nbsp;<span class=\"arrow\">&#8250;</span></span></p><div class=\"press-item clearfix hidden\"><p>Studio Olafur Eliasson GmbH<br/>\nChristinenstrasse 18/19, Haus 2<br/>\n10119 Berlin</p><p>Director<br/>\nOlafur Eliasson</p><p>Contact<br/>\nstudio@olafureliasson.net<br/>\n+49 30 2000 391 50</p><p>VAT ID: DE 247257125<br/>\nTax No.: 37/415/21533<br/>\nCommercial registry: HRB 99366<br/>\nRegistration office: Amtsgericht Charlottenburg</p><p>The copyright for published objects developed by Studio Olafur Eliasson GmbH itself remains only with Studio Olafur Eliasson GmbH. The use or sharing of such images, audio features, video sequences, and texts in other electronic or printed publications is permitted for all non-commercial purposes.</p><p>Studio Olafur Eliasson GmbH explicitly reserves the right to alter, supplement, or delete parts or the whole of the website's content, or to temporarily or completely discontinue publication without further notice.</p><p>Studio Olafur Eliasson GmbH has no influence whatsoever on content offered through direct or indirect links to other web providers and pages and does not endorse any of this content – with the exception of the content on social media profiles administered by Studio Olafur Eliasson GmbH.</p><p>Third Party Cookies<br/>\nThe sharing buttons on this site that allow visitors to share content onto social networks use cookies. The cookies are set by domains external to this website and are required in order to implement these buttons and connect them to the relevant social networks and third party sites. You should be aware that these sites are likely to be collecting information about what you are doing all around the internet, including on this website. You should check the respective policies of each of these sites to see how exactly they use your information and to find out how to opt out, or delete, such information.</p></div></section><section id=\"privacy\" class=\"content-section\"><p class=\"subsection-heading\"><a href=\"http://olafureliasson.net/privacy\" target=\"_blank\" class=\"btn\">Privacy</a></p></section></div></div></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
;var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<script src=\"vendor.js\"></script><script src=\"app.js\"></script>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
;var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

var title = 'Ice Watch London'
var description = 'A project by Olafur Eliasson and Minik Rosing, on the occasion of COP 21 – United Nations Conference on Climate Change.'
var pageUrl = 'http://icewatchlondon.com'
var image = 'http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/image/assets/thumbnail.jpg'
var twitterHandle = '@olafureliasson'
buf.push("<!DOCTYPE html><html lang=\"en\"><head><title>" + (jade.escape(null == (jade_interp = 'Ice Watch London') ? "" : jade_interp)) + "</title><meta name=\"description\"" + (jade.attr("content", '' + (description) + '', true, true)) + "><meta name=\"keywords\" content=\"Ice Watch,COP 21,Climate Change,United Nations,Paris,London,Olafur Eliasson,Minik Rosing,Greenland,Ice\"><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no\"><meta name=\"twitter:card\"" + (jade.attr("content", '' + (title) + '', true, true)) + "><meta name=\"twitter:site\"" + (jade.attr("content", '' + (twitterHandle) + '', true, true)) + "><meta name=\"twitter:title\"" + (jade.attr("content", '' + (title) + '', true, true)) + "><meta name=\"twitter:description\"" + (jade.attr("content", '' + (description) + '', true, true)) + "><meta name=\"twitter:creator\"" + (jade.attr("content", '' + (twitterHandle) + '', true, true)) + "><meta name=\"twitter:image\"" + (jade.attr("content", '' + (image) + '', true, true)) + "><meta property=\"og:title\"" + (jade.attr("content", '' + (title) + '', true, true)) + "><meta property=\"og:type\" content=\"website\"><meta property=\"og:url\"" + (jade.attr("content", '' + (pageUrl) + '', true, true)) + "><meta property=\"og:image\"" + (jade.attr("content", '' + (image) + '', true, true)) + "><meta property=\"og:description\"" + (jade.attr("content", '' + (description) + '', true, true)) + "><meta property=\"og:site_name\"" + (jade.attr("content", '' + (title) + '', true, true)) + "><link rel=\"icon\" type=\"image/png\" href=\"http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/image/assets/favicon.png\"><link rel=\"stylesheet\" href=\"vendor.css\"><link rel=\"stylesheet\" href=\"app.css\"><script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){\n(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\nm=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\n})(window,document,'script','//www.google-analytics.com/analytics.js','ga');\n\nga('create', 'UA-30609807-3', 'auto');\nga('send', 'pageview');</script></head></html>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
;var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"gallery-cell\"><div class=\"img-wrapper\"><img src=\"http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/image/slideshow1/set1a_1.jpg\"/></div></div><div class=\"gallery-cell\"><div class=\"img-wrapper\"><img src=\"http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/image/slideshow1/set1a_2.jpg\"/></div></div><div class=\"gallery-cell\"><div class=\"img-wrapper\"><img src=\"http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/image/slideshow1/set1a_3.jpg\"/></div></div><div class=\"gallery-cell\"><div class=\"img-wrapper\"><img src=\"http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/image/slideshow1/set1a_4.jpg\"/></div></div><div class=\"gallery-cell\"><div class=\"img-wrapper\"><img src=\"http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/image/slideshow1/set1a_5.jpg\"/></div></div><div class=\"gallery-cell\"><div class=\"img-wrapper\"><img src=\"http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/image/slideshow1/set1a_6.jpg\"/></div></div><div class=\"gallery-cell\"><div class=\"img-wrapper\"><img src=\"http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/image/slideshow1/set1a_7.jpg\"/></div></div><div class=\"gallery-cell\"><div class=\"img-wrapper\"><img src=\"http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/image/slideshow1/set1a_8.jpg\"/></div></div><div class=\"gallery-cell\"><div class=\"img-wrapper\"><img src=\"http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/image/slideshow1/set1a_9.jpg\"/></div></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
;var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"gallery-cell\"><video src=\"http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/video/IceWatch_HD__1-HD.mp4\" poster=\"http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/video/poster/IceWatch_HD__1-HD.jpg\" id=\"video_1_1\" width=\"auto\" height=\"auto\" controls=\"controls\" data-setup=\"{&quot;autoplay&quot;: false}\" class=\"video-js vjs-sublime-skin\"></video></div><div class=\"gallery-cell\"><video src=\"http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/video/IceWatch_HD_day1-HD.mp4\" poster=\"http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/video/poster/IceWatch_HD_day1-HD.jpg\" id=\"video_1_2\" width=\"auto\" height=\"auto\" controls=\"controls\" data-setup=\"{&quot;autoplay&quot;: false}\" class=\"video-js vjs-sublime-skin\"></video></div><div class=\"gallery-cell\"><video src=\"http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/video/IceWatch_HD__3-HD.mp4\" poster=\"http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/video/poster/IceWatch_HD__3-HD.jpg\" id=\"video_1_3\" width=\"auto\" height=\"auto\" controls=\"controls\" data-setup=\"{&quot;autoplay&quot;: false}\" class=\"video-js vjs-sublime-skin\"></video></div><div class=\"gallery-cell\"><video src=\"http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/video/IceWatch_STEEN_Slomo-HD.mp4\" poster=\"http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/video/poster/IceWatch_STEEN_Slomo-HD.jpg\" id=\"video_1_4\" width=\"auto\" height=\"auto\" controls=\"controls\" data-setup=\"{&quot;autoplay&quot;: false}\" class=\"video-js vjs-sublime-skin\"></video></div><div class=\"gallery-cell\"><div class=\"img-wrapper\"><img src=\"http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/image/onsite/iw_1.jpg\"/></div></div><div class=\"gallery-cell\"><div class=\"img-wrapper\"><img src=\"http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/image/onsite/iw_2.jpg\"/></div></div><div class=\"gallery-cell\"><div class=\"img-wrapper\"><img src=\"http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/image/onsite/iw_3.jpg\"/></div></div><div class=\"gallery-cell\"><div class=\"img-wrapper\"><img src=\"http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/image/onsite/iw_4.jpg\"/></div></div><div class=\"gallery-cell\"><div class=\"img-wrapper\"><img src=\"http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/image/onsite/iw_5.jpg\"/></div></div><div class=\"gallery-cell\"><div class=\"img-wrapper\"><img src=\"http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/image/onsite/iw_6.jpg\"/></div></div><div class=\"gallery-cell\"><div class=\"img-wrapper\"><img src=\"http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/image/onsite/iw_7.jpg\"/></div></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
;var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"gallery-cell\"><video src=\"http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/video/ICEWatch_SlowMo_01.mp4\" poster=\"http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/video/poster/ICEWatch_SlowMo_01.jpg\" id=\"video_2_1\" width=\"auto\" height=\"auto\" controls=\"controls\" data-setup=\"{&quot;autoplay&quot;: false}\" class=\"video-js vjs-sublime-skin\"></video></div><div class=\"gallery-cell\"><video src=\"http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/video/ICE_Watch_SlowMO_03.mp4\" poster=\"http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/video/poster/ICE_Watch_SlowMO_03.jpg\" id=\"video_2_2\" width=\"auto\" height=\"auto\" controls=\"controls\" data-setup=\"{&quot;autoplay&quot;: false}\" class=\"video-js vjs-sublime-skin\"></video></div><div class=\"gallery-cell\"><video src=\"http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/video/Ice_Master_rough_cut_with_sound_Sub_01.mp4\" poster=\"http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/video/poster/Ice_Master_rough_cut_with_sound_Sub_01.jpg\" id=\"video_2_3\" width=\"auto\" height=\"auto\" controls=\"controls\" data-setup=\"{&quot;autoplay&quot;: false}\" class=\"video-js vjs-sublime-skin\"></video></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
;var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"gallery-cell\"><video src=\"http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/video/ICE_Watch_SlowMO_0_1.mp4\" poster=\"http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/video/poster/ICE_Watch_SlowMO_0_1.jpg\" id=\"video_3_1\" width=\"auto\" height=\"auto\" controls=\"controls\" data-setup=\"{}\" class=\"video-js vjs-sublime-skin\"></video></div><div class=\"gallery-cell\"><video src=\"http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/video/Ice_Master_rough_cut_with_sound_Sub_02.mp4\" poster=\"http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/video/poster/Ice_Master_rough_cut_with_sound_Sub_02.jpg\" id=\"video_3_2\" width=\"auto\" height=\"auto\" controls=\"controls\" data-setup=\"{}\" class=\"video-js vjs-sublime-skin\"></video></div><div class=\"gallery-cell\"><video src=\"http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/video/Ice_Master_rough_cut_with_sound_Sub_01_Sub_01_a.mp4\" poster=\"http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/video/poster/Ice_Master_rough_cut_with_sound_Sub_01_Sub_01_a.jpg\" id=\"video_3_3\" width=\"auto\" height=\"auto\" controls=\"controls\" data-setup=\"{}\" class=\"video-js vjs-sublime-skin\"></video></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
;var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"gallery-cell\"><video src=\"http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/video/ICE_Watch_SlowMO_02.mp4\" poster=\"http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/video/poster/ICE_Watch_SlowMO_02.jpg\" id=\"video_intro_1\" width=\"auto\" height=\"auto\" loop=\"loop\" data-setup=\"{}\" class=\"video-js vjs-sublime-skin\"></video></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
;var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"gallery-cell\"><div class=\"img-wrapper\"><img src=\"http://olafureliasson.net.s3.amazonaws.com/subpages/icewatchparis/video/poster/ICE_Watch_SlowMO_02.jpg\"/></div></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
;require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');

