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
            menuReg:        "div.menu_box",
            contentReg:     "div.content_box",            
            breadcrumbsReg: "ul.breadcrumbs1"
        });
        
        app.contentReg.on("addBackLink", function(link){
            this.$el.append(link)
        });

        app.contentReg.on("show", function(){
            // can take options: { scrollLeftSpeed: 4000, scrollRightSpeed: 5000, waitToScroll: 3000}
            //var scrollTitle = new ScrollTitle(this.$el.find("h1")); 
            //scrollTitle.scroll();
            this.$el.find("h1").scrollTitle({className: "showFullTitle"});

        });

        app.addInitializer(function(opt){

            this.menuView = new MenuCollectionView({ 
                collection: opt.feeds        
            });
            this.feeds.fetch();
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
        });

        app.on("initialize:after", function(options){
            if (Backbone.history){
                Backbone.history.start();
            }
        });

        return app;
});