define(
	[
		"text!templates/breadcrumbs_template.html",
		"backbone",
		"underscore",
		"jquery",
		"marionette"
	],
	function(breadcrumbs_template,Backbone, _,$){
		
		var BreadcrumbsVeiw = Backbone.Marionette.ItemView.extend({
			tagName: 'li',
			template: _.template(breadcrumbs_template)
		});
		var BreadcrumbsColectionView = Backbone.Marionette.CollectionView.extend({
			itemView: BreadcrumbsVeiw,
			animateShow: function(){
				var coutViews = this.children.length;
				var lastView  = this.children.last();

				if(lastView && coutViews > 1)
				{
					lastView.$el.css('marginLeft',"-32px")
								.animate({marginLeft: "+=64px"}, 200)
								.animate({marginLeft: "-=32px"}, 400);
				}
			},
			onRender: function(){
				this.animateShow();
			}
		});
		
		return BreadcrumbsColectionView;
	}
);