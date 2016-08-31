// CORE VIEW MODEL - SINGLE PAGE APPLICATIONS SHOULD ONLY INCLUDE TEMPLATES AND COMPONENTS WITIN THIS AND ONLY THIS VIEW MODEL
// DEFINE DEPENDENCIES
/*global define, console*/
define(['jquery', 'knockout', 'router'], function ($, ko, router) {
	"use strict";
	// REGISTER KNOCKOUT COMPONENTS AS AMD MODULES
	ko.components.register('main',	{ require: 'pages/main/main' });
	// START THE APPLICATION
	ko.applyBindings({ route: router.activeRoute });
});
