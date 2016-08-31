/*
	name:			Intro Animation - Knockout Custom Binding
	description:	Controls the introduction animation
	usage:			add the data-bind attribute to an element: data-bind='fxIntro: { custom options }'
*/
/*global define, console*/
define(["jquery", "knockout", "velocity", "velocity.ui"], function ($, ko, velocity) {
	"use strict";

	ko.bindingHandlers.fxIntro = {

		init	: function (element, valueAccessor, allBindingsAccessor, bindingContext) {
			
			//  WHEN NODE REMOVED FROM DOM TO PREVENT MEMORY LEAKS
			ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
				return $(element).remove();
			});
			
			return $(document).ready(function () {

				var $logo		= $('.logo'),
					$path		= $('.logo path'),
					$fnam		= $('.firstname'),
					$lnam		= $('.lastname'),
					$tgln		= $('.text-tagline span'),
					$list		= $('.content-nav'),
					light		= '#DDDDBB',
					speed		= 800,
					posLSt		= -Math.ceil($logo.height() + $logo.offset().top),
					posLEn		= Math.ceil(($fnam.offset().top - $logo.offset().top) - (parseFloat($('.firstname').css('fontSize')))),
					posFN		= -Math.ceil($fnam.width() + $fnam.offset().left),
					posLN		= -Math.ceil($lnam.offset().left),
					sequence	= [
						{ e: $logo,	p: { rotateZ: [1080, 0], scale: [1.7, 1.7], top: [posLEn, posLSt] },	o: { duration: speed, easing: [0.15, 0.79, 0.79, 0.96] } },
						{ e: $logo,	p: { scale: [1], top: [0] },											o: { duration: speed / 1.5, delay: speed / 3, sequenceQueue: true } },
						{ e: $path,	p: { fill: light },														o: { duration: speed, delay: 0, sequenceQueue: false } },
						{ e: $fnam, p: { left: [0, posFN] },												o: { duration: speed / 1.4, delay: 0, sequenceQueue: false } },
						{ e: $lnam, p: { right: [0, posLN] },												o: { duration: speed / 1.4, delay: 0, sequenceQueue: false } },
						{ e: $tgln, p: "transition.slideDownIn",											o: { duration: speed / 2, stagger: 100, delay: speed, display: null, sequenceQueue: false } },
						{ e: $list, p: { height: 40 },														o: { duration: speed / 5, delay: 400, sequenceQueue: false } }
					];
				// RUN THE ANIMATION
				function startFX() {
					return $.Velocity.RunSequence(sequence);
				}
				// PREPARE ELEMENTS FOR ANIMATION
				function prepFX() {
					$logo.css("top", posLSt);
					$fnam.css("left", posFN);
					$lnam.css("right", posLN);
					$tgln.css("opacity", 0);
					$list.css("height", 0);
					$path.css("fill", "#758961");
					$(element).velocity({
						opacity: [1, "easeInSine", 0]
					}, {
						complete: function () { return startFX(); }
					});
				}
				return prepFX();
			});
		},
		update	: function (element, valueAccessor, allBindingsAccessor, bindingContext) {}
	};
});