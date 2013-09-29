$(document).ready(function(){ 						
	$(".search").val("Search for...");		// Adds the value of "Search..." to the input field
	$(".search").focus(function(){		// When you click on .search			
		if($(this).val() == "Search for...") {	// If the value is equal to "Search..."
			$(this).val("");                   // remove all the text
		}		
	});
	
	$(".search").blur(function(){				// When the focus on .search is lost	
		if($(this).val() == "") {             // If the input field is empty
			$(this).val("Search for...");	 // Adds the text "Search..."
		}		
	});
});