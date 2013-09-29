define(
	[
		"text!templates/article_template.html", 
		"backbone",
		"underscore",
		"jquery",
		"marionette"
	],
function(article_template, Backbone, _, $){
	
    var ArticlePreView = Backbone.Marionette.ItemView.extend({
		template: _.template(article_template),
	});

	var ArticleCollectionView = Backbone.Marionette.CollectionView.extend({
		itemView: ArticlePreView,
		backLink: "<a href='/'>Back</a>"
	});
	
	return ArticleCollectionView;
});