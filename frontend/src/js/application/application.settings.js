//	SETUP CONFIGURATIONS FOR REQUIRE.JS WHICH WILL BE LOOKING FOR GLOBAL VARIABLE NAMED REQUIRE
var require = {

	baseUrl	: './js/',

	paths		: {
		'jquery'				: 'modules/jquery/jquery',
		'velocity'				: 'modules/velocity/velocity',
		'velocity.ui'			: 'modules/velocity/velocity.ui',
		'knockout'				: 'modules/knockout/knockout',
		'ko.template.engine'	: 'modules/knockout/ko.template.engine',
		'bs.modal'				: 'modules/bootstrap/bs.modal',
		'crossroads'			: 'modules/crossroads/crossroads',
		'hasher'				: 'modules/hasher/hasher',
		'signals'				: 'modules/signals/signals',
		'text'					: 'modules/require/text',
		'router'				: 'application/application.router',
		'ko.bs.modal'			: 'bindings/ko.bs.modal',
		'ko.fx.intro'			: 'bindings/ko.fx.intro',
		'google.analytics'		: 'analytics/google.analytics'
	},

	shim		: {
		'jquery'				: {
			exports					: '$'
		},

		'knockout'				: {
			exports					: 'ko'
		},

		'ko.template.engine'	: {
			deps					: ['jquery', 'bs.modal', 'knockout'],
			exports					: 'ste'
		},

		'bs.modal'				: {
			deps					: ['jquery'],
			exports					: 'bs'
		},

		'google.analytics'		: {
			exports					: '__ga__'
		},

		'velocity'				: {
			deps					: ['jquery'],
			exports					: 'velocity'
		},

		'velocity.ui'			: {
			deps					: ['velocity']
		},

		'crossroads'			: {
			deps					: ['signals'],
			exports					: 'crossroads'
		},

		'hasher'				: {
			deps					: ['crossroads'],
			exports					: 'hasher'
		},

		'signals'				: {
			deps					: ['jquery'],
			exports					: 'signals'
		},
		
		'ko.bs.modal'			: {
			deps					: ['jquery', 'knockout', 'ko.template.engine', 'bs.modal']
		},

		'ko.fx.intro'			: {
			deps					: ['jquery', 'knockout', 'velocity', 'velocity.ui']
		}
	}
};
