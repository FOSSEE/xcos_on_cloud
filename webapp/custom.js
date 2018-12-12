$(function() {
  $(document).ready(function(){
  
  //clear
  if($('#book-list').val() ==0){
    $('#book').hide();
    $('#chapter').hide();
    $('#example').hide();
    $('#example-file').hide();
  }
  // books fetch
    $('#category-list').on('change',function() {
      var catid = $('#category-list').val();
      if(catid != 0){
      $('#book').show();
        $.ajax({
            url: '/get_book',
            data: {
              'catid': catid
            },
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                var $options = [];
                var i = 1;
                $options.push(
                $('<option />', {
                    "value": 0, "text": "Select Book" }));
                for(var a = 0, len = data.length; a < len; a++) {
                $options.push(
                $('<option />', {
                    "value": data[a][0], "text": i+") " + 
                    data[a][1] + "(Author: "+ data[a][2] +") " }));
                i++;
                }
                $("#book-list").empty().append($options);
            },
            error: function(error) {
                alert(error);
            }
        });
        }else{
          $('#book').hide();
          $('#chapter').hide();
          $('#example').hide();
          $('#example-file').hide();
        }
    });
 // chapters fetch
    $('#book-list').on('change',function() {
      var bookid = $('#book-list').val();
      if(bookid != 0){
      $('#chapter').show();
        $.ajax({
            url: '/get_chapter',
            data: {
              'bookid': bookid
            },
            type: 'GET',
            dataType: 'json',
            success: function(chapter) {
                var $options = [];
                var i = 1;
                $options.push(
                $('<option />', {
                    "value": 0, "text": "Select Chapter" }));
                for(var a = 0, len = chapter.length; a < len; a++) {
                $options.push(
                $('<option />', {
                    "value": chapter[a][0], "text": chapter[a][1]+") " + 
                    chapter[a][2] }));
                i++;
                }
                $("#chapter-list").empty().append($options);
            },
            error: function(error) {
                alert(error);
            }
        });
        }else{
        $('#chapter').hide();
        $('#example').hide();
        $('#example-file').hide();
        }
    });
  //examples fetch
    $('#chapter-list').on('change',function() {
      var chapterid = $('#chapter-list').val();
      if(chapterid != 0){
      $('#example').show();
        $.ajax({
            url: '/get_example',
            data: {
              'chapterid': chapterid
            },
            type: 'GET',
            dataType: 'json',
            success: function(example) {
                var $options = [];
                var i = 1;
                $options.push(
                $('<option />', {
                    "value": 0, "text": "Select Example" }));
                for(var a = 0, len = example.length; a < len; a++) {
                $options.push(
                $('<option />', {
                    "value": example[a][0], "text":
                    example[a][1] + ") " + example[a][2] }));
                i++;
                }
                $("#example-list").empty().append($options);
            },
            error: function(error) {
                alert(error);
            }
        });
        }else{
            $('#example').hide();
            $('#example-file').hide();
        }
    
    });
  //examples list
    $('#example-list').on('change',function() {
      var exampleid = $('#example-list').val();
      if(exampleid !=0){
       $('#example-file').show();
       $("#example-file-list > tbody:last-child").empty();
        $.ajax({
            url: '/get_example_file',
            data: {
              'exampleid': exampleid
            },
            type: 'GET',
            dataType: 'json',
            success: function(example_file) {
                var $options = [];
                var i = 1;
                for(var a = 0, len = example_file.length; a < len; a++) {
                $('#example-file-list > tbody:last-child')
                .append("<tr><td><a href='https://xcos.fossee.in?efid="+
                example_file[a][0] + "' target='_blank'>" + example_file[a][1]
                + "</a></td><td>" + "XCOS file" + "</td></tr>");
                }
            },
            error: function(error) {
                alert(error);
            }
        });
      }else{
        $('#example-file').hide();
      }
    });


  });//document.ready
});//function

