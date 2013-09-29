$(function() {
  $('#fileupload').fileupload({
    dataType: 'json',

    formData: [
      { name: 'authenticity_token', value: $('meta[name="csrf-token"]').attr('content') }
    ],

    add: function (e, data) {
      $('#uploadfileplace p, #uploadfileplace br').remove();
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
      data.context.text('Upload finished.');
      $('#uploadfileplace').delay(1000).fadeIn().hide( "blind", { direction: "vertical" }, 1000 );
      filename = data.result[0]["name"].replace(".rb","");
      var option = $('<option/>');
      option.attr({ 'value': filename, 'selected': true }).text(filename);
      $("#feed_plugin_path").prepend(option);
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

function otherPlugin(option) {
  if (option == 'Other plugin') {
  	$('#uploadfileplace').show( "blind", { direction: "vertical" }, 1000 );
  	$('#progress').css('display', 'none');
  }
  else {
  	$('#uploadfileplace').hide( "blind", { direction: "vertical" }, 1000 );
  }
};