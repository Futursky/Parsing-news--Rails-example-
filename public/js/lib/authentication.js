define(["jquery"], function($){

	if($("#login_box :submit")){
		$("#login_box :submit").click(function(e){
			var name = $('#name').val();
			var password = $('#password').val();
			if(name == "" && password == "")
			{
				return false;
			}			
		});
	}
});