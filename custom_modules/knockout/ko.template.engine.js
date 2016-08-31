/*
	KnockoutJS plugin designed for the use of including templates as string parsed from HTML files.
	Inspired by: Ryan Niemeyer at http://www.knockmeout.net/
	Inspired by: Artem Stepanyuk at http://faulknercs.github.io/Knockstrap/
*/
/*global ko, jQuery, require, exports, module, define, console*/
(function (factory) {
	"use strict";

	if (typeof ko !== 'undefined' && typeof jQuery !== 'undefined') {
		// GLOBAL KNOCKOUT AND JQUERY EXIST
		factory(ko, jQuery);
	} else if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
		// COMMON / NODE
		factory(require('knockout'), require('jquery'));
	} else if (typeof define === 'function' && define.amd) {
		// AMD
		define(['knockout', 'jquery'], factory);
	} else {
		throw new Error('jQuery and KnockoutJS required.');
	}

}(function (ko, $) {
	"use strict";

//	var ste, templates	= {};
	var templates = {};

	templates.modal			=
		'<div class="modal-dialog" role="document">\n' +
			'\t<div class="modal-content">\n' +
				'\t\t<div class="modal-header"></div>' +
				'\t\t<div class="modal-body">\n' +
					'\t\t\t<p data-bind="html: selectedMethod().prompt"></p>' +
				'\t\t</div>\n' +
				'\t\t<div class="modal-footer">\n' +
					'\t\t\t<a class="btn btn-cancel" data-dismiss="modal" role="button">cancel</a>' +
					'\t\t\t<a data-bind="attr: { href: selectedMethod().url }" target="_self" class="btn btn-ok" role="button">ok</a>\n' +
				'\t\t</div>\n' +
			'\t</div>\n' +
		'</div>';

//	templates.modalBody		= '<div data-bind="html: content"></div>\n';

//	templates.modalFooter	=
//		'<a href="#" class="btn btn-cancel" data-dismiss="modal" role="button">cancel</a>' +
//		'<a href="#" class="btn btn-ok" data-bind="click: action" role="button">ok</a>\n';

//	templates.modalHeader	=
//		'<button type="button" class="close" data-dismiss="modal">\n' +
//			'\t<i class="fa fa-times" aria-hidden="true" role="button"></i>\n' +
//		'<h4 class="modal-title"></h3>\n';

	ko.templateSources.stringTemplate = function (template) {
		this.templateName = template;

		this.data = function (key, value) {
			templates.data = templates.data || {};
			templates.data[this.templateName] = templates.data[this.templateName] || {};

			if (arguments.length === 1) {
				return templates.data[this.templateName][key];
			}

			templates.data[this.templateName][key] = value;
		};

		this.text = function (value) {
			if (arguments.length === 0) {
				return templates[this.templateName];
			}

			templates[this.templateName] = value;
		};
	};

	// CREATE TEMPLATE ENGINE FOR STRING AS NEW SOURCE
	ko.stringTemplateEngine = function () {
		this.allowTemplateRewriting = false;
	};

	ko.stringTemplateEngine.prototype = new ko.nativeTemplateEngine();
	ko.stringTemplateEngine.prototype.constructor = ko.stringTemplateEngine;

	ko.stringTemplateEngine.prototype.makeTemplateSource = function (template) {
		return new ko.templateSources.stringTemplate(template);
	};

	ko.stringTemplateEngine.prototype.getTemplate = function (name) {
		return templates[name];
	};

	ko.stringTemplateEngine.prototype.addTemplate = function (name, template) {
		if (arguments.length < 2) {
			throw new Error('No template provided.');
		}

		templates[name] = template;
	};

	ko.stringTemplateEngine.prototype.removeTemplate = function (name) {
		if (!name) {
			throw new Error('Name for template not provided.');
		}

		delete templates[name];
	};

	ko.stringTemplateEngine.prototype.isTemplateExist = function (name) {
		return !!templates[name];
	};

	ko.stringTemplateEngine.instance = new ko.stringTemplateEngine();


//	ste = ko.stringTemplateEngine.instance;

//	return ste;

}));
