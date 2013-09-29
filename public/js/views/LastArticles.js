define(
	[
		"text!templates/last_article_template.html",
		"backbone",
		"underscore",
		"jquery", 
		"marionette"
	],
	function(last_article_template, Backbone, _, $){
		var LastArticlePreVeiw = Backbone.Marionette.ItemView.extend({
			template: _.template(last_article_template)
		});
		var	LastArticleColectionView = Backbone.Marionette.CollectionView.extend({
			itemView: LastArticlePreVeiw					
		});
		
		return LastArticleColectionView;
	}
);