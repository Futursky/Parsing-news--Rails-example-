//добавление еще одного региона для одной статьи
var App = new Backbone.Marionette.Application();
App.addRegions({
	articlesReg: "div.content_box_highlight";
	articleReg: "div.article"
});



//добавление одного айтема

(function(App, Backbone, _, $){
	var ArticleView = Backbone.Marionette.ItemView.extend({
		template: "#onearticle-template"
	});

	

	App.addInitializer(function(opt){
		var articleView = new ArticleView({
			collection: opt.articles 
		});
		App.articleReg.show(articlesView);
	});

})(App, Backbone, _, $);


//так будет выглядеть темплэйт для одной статьи
<script type="text/template" id="onearticle-template">
		<div  class='article'>
			<div class="title" > 
    <h1> <%= raw "<%= title %\>" %> </h1>
  </div>

  
    <div class="a_image">
      <img src=" <%= raw "<%= image %\>" %>" width="100%" height="auto"></img>
    </div>  
  
  
  <div class="content">
    <p><%= raw "<%= content %\>" %></p>
  </div>
  
  
    <div class="adress">
      <p>Джерело: <a href="<%= raw "<%= url%\>" %>/" target="_blank"><%= @article.feed.name %></a></p>
    </div>
  
  
		</div>