define(
  [
    "text!templates/single_Article_template.html",
    "backbone",
    "underscore",
    "jquery", 
    "marionette"
  ],
  function(single_Article_template,Backbone, _,$){
		var SingleArticleVeiw = Backbone.Marionette.ItemView.extend({
	    template: _.template(single_Article_template),
		initialize: function(){
		    this.on("before:render", this.addSourceName);
		},
		addSourceName: function(){
		 	var feedUrl = this.model.collection.models[0].get("url");
			if(feedUrl)
			{
				var feedName = feedUrl.match(/[\w-\._]+/g)
				if(feedName)
				{
					feedName =  feedName[1];
					  this.model.collection.models[0].set("feedName",feedName); 
				}   			 			  			 		
			}
			else
			{
			    this.model.collection.models[0].set({ feedName: "Unknown", url: "#" });
			}
		 }
	});
	var SingleArticleColectionView = Backbone.Marionette.CollectionView.extend({
		itemView: SingleArticleVeiw,
		backLink: function(feedId){
			return 	"<a href='/#feeds/"+feedId+"/articles'>Back</a>"
		}			
	});
	return SingleArticleColectionView;
});