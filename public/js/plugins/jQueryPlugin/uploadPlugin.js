require(
  [
    "jquery",
    "jquery-ui",
    "jquery-ui-widget",
    "jquery-ui-dialog",
    "jquery-iframe-transport",
    "jquery-fileupload"
  ],
  function(){
    $(function() {
    if ($('#feed_plugin_id option').length <= 1) {
      showUploadField();
    };

    var prevOption = $('#feed_plugin_id').find(":selected").val();

    $('#feed_plugin_id').change(function(){
      if ($(this).val() == 'Other plugin') {
        showUploadField();
      }
      else {
        $('#uploadfileplace').hide( "blind");
      }
    });

    $('#fileupload').fileupload({
      dataType: 'json',

      formData: [
        { name: 'authenticity_token', value: $('meta[name="csrf-token"]').attr('content') }
      ],

      add: function (e, data) {
        $('<br />').appendTo($('#uploadfileplace'));

        data.context = $('<button/>').text('Upload')
          .appendTo($('#uploadfileplace'))
          .click(function () {
              $('input, select, textarea').each(function(index){
              $(this).prop('disabled', true);
            });

            $('#uploadfileplace br').remove();
            $('#progress').css('display', 'block');
            data.context = $('<p/>').text('Uploading...').replaceAll($(this));
            data.submit();
          });
      },

      done: function (e, data) {
        $('input, select, textarea').each(function() {
          $(this).prop('disabled', false);
        });

        if (data.result["id"] != undefined) {
          data.context.text('Upload finished.');
          $('#uploadfileplace').delay(1000).fadeIn().hide( "blind" );
          var option = $('<option/>');
          option.attr({ 'value': data.result["id"], 'selected': true }).text(data.result["name"]);
          $("#feed_plugin_id").prepend(option);
        }
        else {
          var errorMessage = "File you want to upload isn't a plugin!";

          /*for(var i in data.result) {
            errorMessage += data.result[i] + "<br/>";
          }*/
          data.context.text('Upload failed.');
          $('#uploadfileplace').stop();
          var dialog = $('<div id="dialog-modal"></div>');
          dialog.html(errorMessage);
          $(".ui-button-icon-primary ui-icon ui-icon-closethick").hide();
          
          dialog.dialog({
            height:150,
            minWidth: 300,
            modal: true,
            buttons: [{
              text: "Ok",
              click: function(){
                $(this).dialog("close");
                $('#uploadfileplace').delay(1000).fadeIn().hide("blind");
              }
            }]
          });
          $('#feed_plugin_id').val(prevOption);
        }
      },

      progressall: function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);
        $('#progress .bar').css(
          'width',
          progress + '%'
        );
      }
    });
  });

  function showUploadField() {
    $('#uploadfileplace br').remove();
    $('#uploadfileplace p').remove();
    $('#uploadfileplace').show('fold');
    $('#progress').css('display', 'none');
  }
})
