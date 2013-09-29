define(
	[
		"text!templates/notFoundPage_template.html", 
		"backbone",
		"underscore",
		"jquery",
		"marionette"
	],
	function(notFoundPage_template, Backbone, _, $){
	
	    var notFoundPageView = Backbone.Marionette.ItemView.extend({
	    	className: "notFoundPageBox",
			template: _.template(notFoundPage_template)
		});

		var notFoundPageView = Backbone.Marionette.CollectionView.extend({
			itemView: notFoundPageView			
		});
		
		return notFoundPageView;
    }
);
