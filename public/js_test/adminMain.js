require.config({
  paths: {
    'jquery': 'lib/jquery',
    'jqueryUI': 'lib/jquery-ui',
    'CKEditor': 'plugins/CKEditor/ckeditor',
    'CapsLockDetect': 'plugins/CapsLockDetect'    
  }
});

require(
        [               
            "jquery",
            "CKEditor",
            "CapsLockDetect"        
        ],
function(   
          $
        )
{
    $(function() {      
        if($("#password")[0]) $("#password").CapsLockDetect({className: "capsLockOnMsg"});
        if($("#article_content")[0]) CKEDITOR.replace("article_content");
        if($("#feed_content")[0]) CKEDITOR.replace("feed_content");
    });
});