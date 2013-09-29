require.config({
  paths: {
    'jquery': 'lib/jquery',
    'jquery-ui': 'lib/jquery-ui',
    'jquery-ui-dialog': 'lib/jquery.ui.dialog',
    'jquery-ui-widget': 'plugins/jQueryPlugin/jquery.ui.widget',
    'jquery-iframe-transport': 'plugins/jQueryPlugin/jquery.iframe-transport',
    'jquery-fileupload': 'plugins/jQueryPlugin/jquery.fileupload',
    'jquery-uploadPlugin': 'plugins/jQueryPlugin/uploadPlugin',
    'CKEditor': 'plugins/CKEditor/ckeditor',
    'CapsLockDetect': 'plugins/CapsLockDetect',
    'authentication': 'lib/authentication'     
  }
});

require(
        [             
            "jquery",
            "CapsLockDetect",        
            "jquery-uploadPlugin",
            "CKEditor",
            "authentication"        
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