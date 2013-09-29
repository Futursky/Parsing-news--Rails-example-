define(
	[	
		"app",
		"text!templates/menu_item_template.html",
		"backbone",
		"underscore",
		"jquery",
		"marionette"
	],
	function(app, menu_item_template, Backbone, _, $){
		
		var MenuPreView = Backbone.Marionette.ItemView.extend({
			tagName: 'li',
			template: _.template(menu_item_template)
		});

		var MenuCollectionView = Backbone.Marionette.CollectionView.extend({
			el: $(".menu_box ul"),
			itemView: MenuPreView,
			initialize: function(){
				this.on("highlightMenuItem", this.highlight_menu_item) 
			},
			highlight_menu_item: function(feedId){
				this.children.each(function(view){
	  				if(view.model.get('id') == feedId)
	  				{
	  					view.$("a").addClass("highlight_menu_item");		  					
	  				}
	  				else
	  				{
	  					view.$("a").removeClass("highlight_menu_item");
	  				}
  				});
			},
			onBeforeRender: function(){
				this.$el.empty();
			}
		});	
		return MenuCollectionView;
	}
);