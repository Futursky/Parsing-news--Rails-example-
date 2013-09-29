define(
	[
		"text!templates/search_template.html",
		"text!templates/search_title_template.html", 
		"backbone",
		"underscore",
		"jquery",
		"colections/Articles",
		"views/Article",
		"marionette"
	],
function(search_template, search_title_template, Backbone, _, $, ArticlesCollection, ArticleCollectionView){
    var SearchView = Backbone.Marionette.ItemView.extend({
        events: {
      	  'keypress': 'search',
          'focus .search': 'clearValue',
          'blur .search': 'setDefaultValue'
    	},
        defaultValue: "Search for...",
        containsResultTitle: "Search results for: ",
        noResultsTitle: "There were no results for your query: ",
        emptyQueryTitle: "There is not query",
    	template: _.template(search_template),
    	templateTitle: _.template(search_title_template),
        setTemplateValues: function(titleText, searchString, countResults){
            return this.templateTitle({
                        titleText: titleText,
                        searchString: searchString,
                        countResults: countResults
                    });
        },
    	addTitle: function(searchString, app){
    		var countResults = app.articles.length;
    		if(searchString!=""){
                if(countResults){
                    return this.setTemplateValues(this.containsResultTitle, searchString, countResults);
                }
                else{
                    return this.setTemplateValues(this.noResultsTitle, searchString, "");
                }
            }
            else{
                return this.setTemplateValues(this.emptyQueryTitle, searchString, "");
            }
    		
    	},
    	search: function(event){
            var app = this.options.app;
    		if (event.keyCode == 13){
    			var searchString = this.$(".search").val();
                if(searchString != ''){
    			    app.trigger("search", searchString);
                }
                else{
                    app.contentReg.$el.empty();
                    app.contentReg.trigger("addBackLink", app.articlesView.backLink);
                    app.contentReg.trigger("addSearchTitle", searchString);
                    app.breadcrumbs.generate(app);
                    app.menuView.trigger("highlightMenuItem","")   
                }
    		}	    		
    	},
        clearValue: function(){
            if(this.$(".search").val() == this.defaultValue){
                this.$(".search").val("");                 
            }
        },
        setDefaultValue: function(){
            if(this.$(".search").val() == "") {             
               this.$(".search").val(this.defaultValue);    
            }
        },
        onRender: function(){
            this.$(".search").val(this.defaultValue);
        } 
	});
	return SearchView;
});