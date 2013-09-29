define(["backbone","models/NotFoundPage"],function(Backbone, NotFoundPageModel){

	var NotFoundPageColection = Backbone.Collection.extend({
		model: NotFoundPageModel
	});	
	return NotFoundPageColection;
});
