define(["backbone"], function(Backbone) {
  var ArticleModel = Backbone.Model.extend({
  	defaults: { 
  		"title": "Wrong address",
  		"text": "The page you were looking for doesn't exist!"
  	 }
  });
  return ArticleModel;
});