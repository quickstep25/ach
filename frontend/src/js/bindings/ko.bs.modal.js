/*
	name:			Bootstrap 3 Modal - Knockout Custom Binding
	description:	displays a series of slides in a content window.
	usage:			add the data-bind attribute to an element: data-bind='bsModal: { custom options }'
*/
/*global define, console*/
define(["jquery", "knockout", "bs.modal", "ko.template.engine"], function ($, ko, bs) {
	"use strict";

	ko.bindingHandlers.modal = {

		init	: function (element, valueAccessor, allBindingsAccessor, bindingContext) {

			var $element			= $(element),
				value				= valueAccessor(),
				options				= { show: $element.data().show || false};

			//	EXTEND OPTIONS TO INCLUDE DEFAULTS
			ko.utils.extend(options, ko.bindingHandlers.modal.defaults);
			// EXTEND OPTIONS TO INCLUDE CUSTOM SETTINGS
			ko.utils.extend(options, value.options);
			// RENDER THE TEMPLATE
			ko.renderTemplate('modal', bindingContext, { templateEngine: ko.stringTemplateEngine.instance }, element);
			// INITIALIZE MODAL
			$element.modal(options);
			// CHANGE VALUE ACCESSOR WHEN MODEL OPENS AND CLOSES
			$element.on('shown.bs.modal', function () {
				if (typeof value.visible !== 'undefined' && typeof value.visible === 'function' && !ko.isComputed(value.visible)) {
					return value.visible(true);
				}
			});
			// CHANGE VALUE ACCESSOR WHEN MODEL OPENS AND CLOSES
			if (typeof value.visible !== 'undefined' && typeof value.visible === 'function' && !ko.isComputed(value.visible)) {
				$element.on('hidden.bs.modal', function () {
					return value.visible(false);
				});
				// IF NEEDED TO SHOW MODAL AFTER INIT
				if (options.show) {
					value.visible(true);
				}
			}
			//  WHEN NODE REMOVED FROM DOM TO PREVENT MEMORY LEAKS
			ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
				$element.remove();
				return $element.removeData();
			});
			// ALLOW KO TO CONTROL CHILD BINDINGS
			return { controlsDescendantBindings: true };
		},

		update	: function (element, valueAccessor, allBindingsAccessor, bindingContext) {

			var $element			= $(element),
				value				= valueAccessor();
			// WHEN VALUE ACCESSOR CHANGES - CHECK THE VISIBILITY AND UPDATE THE MODAL BASED ON THE OPPOSITE OF WHAT IT CURRENTLY IS
			if (typeof value.visible !== 'undefined') {
				$(element).modal(!ko.unwrap(value.visible) ? 'hide' : 'show');
			}
		},
		defaults	: {
			keyboard: true,
			backdrop: true
		}
	};
});
