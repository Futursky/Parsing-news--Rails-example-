define(["backbone","models/LastArticle"],function(Backbone, LastArticlesModel){

	var LastArticlesColection = Backbone.Collection.extend({
		model: LastArticlesModel,
		url: '/feeds/lastArticles'
	});
	return LastArticlesColection;
});
