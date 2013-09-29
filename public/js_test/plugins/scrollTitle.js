define(["jquery","jqueryUI"],function($){
	$.widget("custom.scrollTitle", {
		options: {
			className: "",
			scrollLeftTime: 4500,
			scrollRightTime: 750,
			waitToScroll: 500,
	    },
	    _create: function() {
	       	this._on( this.element, {
           		mouseover: "scrollLeft",
          		mouseleave: "scrollRight"
        	});
	    },
	    scrollLeft: function(){
    		this.waitTimeout = this._delay(function(){
				var elementWidth = parseInt(this.element.css("width"));
		  		if(this.options.className)
		  		{
		  			this.element.addClass(this.options.className)	
		  		}
		  		this.element.animate({scrollLeft: elementWidth}, this.options.scrollLeftTime, "linear")
		  					.animate({scrollLeft: "0px"}, this.options.scrollRightTime);
			}, this.options.waitToScroll);
	    },
	    scrollRight: function(){
    		clearTimeout(this.waitTimeout);
			this.element.stop()
						.stop()	
						.animate({scrollLeft: "0px"}, this.options.scrollRightTime);
			if(this.options.className)
	  		{
	  			this._delay(function(){
					this.element.removeClass(this.options.className);
				}, this.options.scrollRightTime);
	  		}								
	    }
	});
});

	/*function ScrollTitle(element, options){
		var elementScroll = this;	
		var setOptions = function(options){
			if(options)
			{	
				elementScroll.scrollLeftTime = options.scrollLeftTime || 4000;
				elementScroll.scrollRightTime = options.scrollRightTime || 750;
				elementScroll.waitToScroll = options.waitToScroll || 500;
			}	
			else
			{
				elementScroll.scrollLeftTime = 4000;
				elementScroll.scrollRightTime = 750;
				elementScroll.waitToScroll = 500;
			}	
		}				
		this.scroll = function(){
			setOptions(options);
			var waitTimeout = {};
					
			$(element).bind('mouseover', function(){ 	
				var self = $(this)
				waitTimeout = setTimeout(function(){
					var elementWidth = parseInt(self.css("width"));
			  		self.addClass("showFullTitle")
			  			.animate({scrollLeft: elementWidth}, elementScroll.scrollLeftTime, "linear")
			  			.animate({scrollLeft: "0px"}, elementScroll.scrollRightTime);
				}, elementScroll.waitToScroll);
			});

			$(element).bind('mouseleave', function(){ 
				clearTimeout(waitTimeout);
				var self = $(this);
				self.stop()
					.stop()	
					.animate({scrollLeft: "0px"}, elementScroll.scrollRightTime);
				setTimeout(function(){
					self.removeClass("showFullTitle");
				}, elementScroll.scrollRightTime);
			});
		}		
	}
	return ScrollTitle;
	*/
