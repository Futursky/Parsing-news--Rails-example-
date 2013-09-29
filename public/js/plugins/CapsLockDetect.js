define(["jquery", "jquery-ui"],function($) {

	$.widget("custom.CapsLockDetect", {
		options: {
			className: "capsLockOnMsg",
			message: "Caps Lock is ON !!!"
	    },
	    _create: function() {
	       	this._on( this.element, {
           		keypress: "detectCapsLock"          	
        	});
	    },
	    detectCapsLock: function(e){
	    	var s = String.fromCharCode( e.which );
		    if ( s.toUpperCase() === s && s.toLowerCase() !== s && !e.shiftKey ) {
		    	if(!$("."+this.options.className)[0])
		    	{
		    	   this.addMsg();       	
		    	}	        
		    }
		    else
		    {
		    	if($("."+this.options.className))
		    	{
		    		$("."+this.options.className).remove();
		    	}
		    }
	    },
	    addMsg: function(){
	    	$('<div>'+this.options.message+'</div>')
		    	   		.addClass(this.options.className)
		    	   		.insertBefore(this.element);
	    }
	    
	});
});