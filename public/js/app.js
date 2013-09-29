/*$(function(){_.templateSettings={interpolate : /\{\{([\s\S]+?)\}\}/g }; }); _.mixin(_.str.exports())*/
define(
        [ 
            "jquery",
            "underscore",
            "backbone",  
            "views/Article",
            "views/Menu",
            "views/LastArticles",
            "views/SingleArticle",
            "views/Breadcrumbs",
            "views/NotFoundPage",
            "views/Search",
            "colections/Articles",
            "colections/Feeds",
            "colections/LastArticles",
            "colections/SingleArticle",
            "colections/Breadcrumbs",
            "colections/NotFoundPage",
            "plugins/scrollTitle"         

        ],
function(   
            $,
            _, 
            Backbone,
            ArticleCollectionView,
            MenuCollectionView, 
            LastArticleColectionView,
            SingleArticleColectionView,
            BreadcrumbsColectionView,
            NotFoundPageView,
            SearchColectionView,
            ArticlesCollection,
            FeedCollection,
            LastArticlesColection,
            SingleArticleCollection,
            BreadcrumbsColection,
            NotFoundPageColection            
        )
{    
    var app = new Backbone.Marionette.Application();
    app.feeds = new FeedCollection();
    app.articles = new ArticlesCollection();
    app.breadcrumbs = new BreadcrumbsColection();
    app.lastArticles = new LastArticlesColection();            
    app.notFoundPage = new NotFoundPageColection();
    app.singleArticle = new SingleArticleCollection();      
          
    app.addRegions({
        menuReg: "div.menu_box",
        searchReg: "div.search_part", 
        contentReg:  "div.content_box",            
        breadcrumbsReg: "ul.breadcrumbs1"
    });    
    
    app.contentReg.on("addBackLink", function(link){
        this.$el.append(link)
    });
    app.contentReg.on("show", function(){
        this.$el.find("h1").scrollTitle({className: "showFullTitle"});      
    });
    app.contentReg.on("addSearchTitle", function(searchString){
        this.$el.prepend(app.searchView.addTitle(searchString, app));
    });

    app.addInitializer(function(opt){
        this.menuView = new MenuCollectionView({ 
            collection: opt.feeds        
        });
        this.menuReg.show(this.menuView);
       
        this.articlesView = new ArticleCollectionView({ 
            collection: opt.articles 
        });            
        this.singleArticleView = new SingleArticleColectionView({
            collection: opt.singleArticle   
        });
        this.notFoundPageView = new NotFoundPageView({
            collection: opt.notFoundPage 
        });           
        this.breadcrumbsView = new BreadcrumbsColectionView({
            collection: opt.breadcrumbs  
        });
        this.lastArticlesView = new LastArticleColectionView({
            collection: opt.lastArticles 
        });            
        this.searchView = new SearchColectionView({
            app: app  
        });
        this.searchReg.show(this.searchView);
    });

    app.on("initialize:after", function(options){
        if (Backbone.history){
            Backbone.history.start();
        }
    });
    app.on("search", function(searchString){
            app.articles.url = "/search?utf8=✓&q=" + searchString;
            app.articles.fetch({
                success: function(){
                    app.contentReg.show(app.articlesView);
                    app.contentReg.trigger("addBackLink", app.articlesView.backLink);
                    app.contentReg.trigger("addSearchTitle", searchString);
                    app.breadcrumbs.generate(app);
                    app.menuView.trigger("highlightMenuItem","")
                    app.router.navigate("search/"+searchString);                    
                }
            });
    });
    return app;
});