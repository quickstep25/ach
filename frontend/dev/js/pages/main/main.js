/*global ga, define, console*/
/*jslint nomen: true */
define(["jquery", "knockout", "text!./main.html", "text!./main.json", "google.analytics", "ko.bs.modal", "ko.fx.intro"], function ($, ko, templateHTML, modelData, __ga__) {
	"use strict";

	// DEFINE DATA MODEL
	var ContactMethod		= function (label, icon, url, id, prompt, selected) {
		this.label			= label;
		this.icon			= icon;
		this.url			= url;
		this.id				= id;
		this.prompt			= prompt;
		this.isSelected		= ko.pureComputed(function () {
			return this === selected();
		}.bind(this));
	},
		// DEFINE VIEW MODEL
		P_Main = function (params) {
			// ROUTING AND NAVIGATION
			this.route			= ko.observable(params);
			this.componentID	= ko.observable('page-' + params.page);

			//BUILD DATA MODEL
			this.contactMethods	= ko.observableArray(ko.utils.arrayMap($.parseJSON(modelData), function (item) {
				return new ContactMethod(item.label, item.icon, item.url, item.id, item.prompt, this.selectedMethod);
			}.bind(this)));

			// CONTROLLERS
			this.selectedMethod	= ko.observable('').extend({ notify: 'always' });
			this.modalVisible	= ko.observable(false).extend({ notify: 'always' });

			// OPERATIONS
			this.showModal		= this.showModal.bind(this);

			// ANALYTICS
			this.pageview();
		};
	// EXTEND FUNCTIONS ON THE VIEW MODEL AFTER INTITIALIZATION
	ko.utils.extend(P_Main.prototype, {

		// SEND PAGE VIEW TO GOOGLE
		pageview:		function () {
			ga('create', 'UA-26957181-16', 'auto');
			ga('set', {
				page: 'index',
				title: 'Landing'
			});
			return ga('send', 'pageview');
		},
		// SHOW MODAL
		showModal:		function (data) {
			this.selectedMethod(data);
			return this.modalVisible(true);
		}
	});
	return { viewModel: P_Main, template: templateHTML };
});
/*jslint nomen: false */
