define(["backbone","models/SingleArticle"],function(Backbone, SingleArticleModel){
	 var SingleArticleCollection = Backbone.Collection.extend({
		model: SingleArticleModel	
	});
	return SingleArticleCollection;
});
