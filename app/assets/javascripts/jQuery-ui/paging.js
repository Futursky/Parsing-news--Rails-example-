  $(document).ready(function(){
	
	var requestUrl = function(n){
	  return "/feeds/" + gon.cur_feed_id + "/articles?only_list=true&page=" + n;
	}

	
    $("#pagination").jPaginator({ 
	  nbPages:gon.pages,
	  marginPx:5,
	  length:7, 
   	  overBtnLeft:'#over_backward', 
	  overBtnRight:'#over_forward', 
	  maxBtnLeft:'#max_backward', 
      maxBtnRight:'#max_forward', 
	  selectedPage:1,
	  onPageClicked: function(a,num) {
	    $.ajax({
          type: 'GET',
          url: requestUrl(num),
          success: function(data) {
            $("#new_list_wrap").html(data);            
            }
        });						
	  }
	  
    });
    
    $(".paginator_slider").slider({
      min:1,           
      change: function(event, ui) {      
        var sl_pos =  Math.ceil((ui.value)/(100/gon.pages));           
        if(sl_pos !== (Math.ceil(((ui.value)-1)/(100/gon.pages)))){
          $.ajax({
            type: 'GET',
            url: requestUrl(sl_pos),
            success: function(data) {
              $("#new_list_wrap").html(data);
              $('.paginator_p_bloc').find("div").each(function(){
        	    var elm = $(this); 
        	    if(sl_pos == parseInt(elm.html())){
                  elm.addClass('selected');
        	    } else {
                  if(elm.hasClass('selected')){
                    elm.removeClass('selected');
                  }
                }
              });
            }             
          }); 
        }              
      }
    });    
  }) 