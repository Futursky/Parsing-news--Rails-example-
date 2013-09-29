define(["backbone","models/Article"],function(Backbone, ArticleModel){

	var ArticlesCollection = Backbone.Collection.extend({
		model: ArticleModel,
		url: '/feeds/5/articles'
	});	
	return ArticlesCollection;
});
