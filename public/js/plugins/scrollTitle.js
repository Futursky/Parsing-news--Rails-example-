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