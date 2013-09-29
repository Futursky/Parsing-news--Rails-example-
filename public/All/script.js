$(function() {
	$('.menu_box ul li a').click(function(){
		$('.menu_box ul li a').removeClass('active');
		$(this).addClass('active');
		$('#main-content_box .content_box').addClass('active');	
	})
});
