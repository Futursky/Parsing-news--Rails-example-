define(["backbone","models/Feed"],function(Backbone, FeedModel){
	var FeedCollection = Backbone.Collection.extend({
		model: FeedModel,
		url: '/feeds',
		initialize: function(){
			this.fetch();
		}
	});
	return FeedCollection;
});
