define(["backbone","models/SingleArticle"],function(Backbone, SingleArticleModel){
	 var SingleArticleCollection = Backbone.Collection.extend({
		model: SingleArticleModel,
		url: '/feeds/5/articles/4'	
	});
	return SingleArticleCollection;
});
