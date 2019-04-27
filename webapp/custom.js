$(function() {
    $(document).ready(function() {

        //clear
        if ($('#book-list').val() == 0) {
            $('#book').hide();
            $('#chapter').hide();
            $('#example').hide();
            $('#example-file').hide();
            $("#contributor").hide();
        }
        // books fetch
        $('#category-list').on('change', function() {
            ajax_loader(this);
            var catid = $('#category-list').val();
            if (catid != 0) {
                $('#book').show();
                $("#contributor").hide();
                $('#chapter').hide();
                $('#example').hide();
                $('#example-file').hide();
                $.ajax({
                    url: '/get_book',
                    data: {
                        'catid': catid
                    },
                    type: 'GET',
                    dataType: 'json',
                    success: function(data) {
                        ajax_loader("clear");
                        var $options = [];
                        $options.push(
                            $('<option />', {
                                "value": 0,
                                "text": "Select Book"
                            }));
                        for (var a = 0, len = data.length; a < len; a++) {
                            var row = data[a];
                            $options.push(
                                $('<option />', {
                                    "value": row[0],
                                    "text": row[1] + " (Author: " + row[2] + ") (" + row[3] + " " + (row[3] != 1 ? "examples" : "example") + ")"
                                }));
                        }
                        $("#book-list").empty().append($options);
                    },
                    error: function(xhr, error) {
                        ajax_loader("clear");
                        $('#book').hide();
                        alert(error);
                    }
                });
            } else {
                ajax_loader("clear");
                $('#book').hide();
                $("#contributor").hide();
                $('#chapter').hide();
                $('#example').hide();
                $('#example-file').hide();
            }
        });
        // chapters fetch
        $('#book-list').on('change', function() {
            ajax_loader(this);
            var bookid = $('#book-list').val();
            if (bookid != 0) {
                $("#contributor").show();
                $('#chapter').show();
                $('#example').hide();
                $('#example-file').hide();
                $.ajax({
                    url: '/get_chapter',
                    data: {
                        'bookid': bookid
                    },
                    type: 'GET',
                    dataType: 'json',
                    success: function(chapter) {
                        ajax_loader("clear");
                        var $options = [];
                        $options.push(
                            $('<option />', {
                                "value": 0,
                                "text": "Select Chapter"
                            }));
                        for (var a = 0, len = chapter.length; a < len; a++) {
                            $options.push(
                                $('<option />', {
                                    "value": chapter[a][0],
                                    "text": chapter[a][1] + ") " +
                                        chapter[a][2]
                                }));
                        }
                        $("#chapter-list").empty().append($options);
                    },
                    error: function(xhr, error) {
                        ajax_loader("clear");
                        $("#contributor").hide();
                        $('#chapter').hide();
                        alert(error);
                    }
                });
            } else {
                ajax_loader("clear");
                $("#contributor").hide();
                $('#chapter').hide();
                $('#example').hide();
                $('#example-file').hide();
            }
        });
        //examples fetch
        $('#chapter-list').on('change', function() {
            ajax_loader(this);
            var chapterid = $('#chapter-list').val();
            if (chapterid != 0) {
                $('#example').show();
                $('#example-file').hide();
                $.ajax({
                    url: '/get_example',
                    data: {
                        'chapterid': chapterid
                    },
                    type: 'GET',
                    dataType: 'json',
                    success: function(example) {
                        ajax_loader("clear");
                        var $options = [];
                        $options.push(
                            $('<option />', {
                                "value": 0,
                                "text": "Select Example"
                            }));
                        for (var a = 0, len = example.length; a < len; a++) {
                            $options.push(
                                $('<option />', {
                                    "value": example[a][0],
                                    "text": example[a][1] + ") " + example[a][2]
                                }));
                        }
                        $("#example-list").empty().append($options);
                    },
                    error: function(xhr, error) {
                        ajax_loader("clear");
                        $('#example').hide();
                        alert(error);
                    }
                });
            } else {
                ajax_loader("clear");
                $('#example').hide();
                $('#example-file').hide();
            }

        });
        //examples list
        $('#example-list').on('change', function() {
            ajax_loader(this);
            var exampleid = $('#example-list').val();
            if (exampleid != 0) {
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
                        ajax_loader("clear");
                        var $options = [];
                        for (var a = 0, len = example_file.length; a < len; a++) {
                            var ef = example_file[a];
                            var filetype = ef[2];
                            var dispfiletype;
                            var actions;
                            switch (filetype) {
                                case 'X':
                                    dispfiletype = 'Xcos File';
                                    actions = "<a href='/example_file?efid=" + ef[0] + "' target='_blank'>Download</a>";
                                    actions += " | <a href='/open?efid=" + ef[0] + "' target='_blank'>Open on Cloud</a>";
                                    break;
                                case 'S':
                                    dispfiletype = 'Prerequisite';
                                    actions = "<a href='/prerequisite_file?efid=" + ef[0] + "' target='_blank'>Download</a>";
                                    break;
                            }
                            $('#example-file-list > tbody:last-child')
                                .append("<tr>")
                                .append("<td>" + ef[1] + "</td>")
                                .append("<td>" + dispfiletype + "</td>")
                                .append("<td>" + actions + "</td>")
                                .append("</tr>");
                        }
                    },
                    error: function(xhr, error) {
                        ajax_loader("clear");
                        $('#example-file').hide();
                        alert(error);
                    }
                });
            } else {
                ajax_loader("clear");
                $('#example-file').hide();
            }
        });


    /********************************************/
    /****** Get contributor *********************/
    /********************************************/
    $(document).on("click", "#contributor", function(e) {
        $.ajax({
            url: '/get_contributor_details',
            dataType: 'JSON',
            type: 'GET',
            data: {
                book_id: $("#book-list").val()
            },
            success: function(data) {
                for (var a = 0, len = data.length; a < len; a++) {
                var cdata= data[a];
                    $('#full_name').html(cdata[5]);
                    $('#branch').html(cdata[6]);
                    $('#university').html(cdata[7]);
                    $('#book-data').html(cdata[1] + ' (Author: '+ cdata[2] + ', ISBN: ' + cdata[3] + ', Publication: ' + cdata[4]+ ')' );
                }
                $("#contributor_wrapper").modal('show');
            },
            error: function(xhr, error) {
                alert(error);
            }
        });
        e.preventDefault();
    });
    /********************************************/


    }); //document.ready
}); //function

/* Ajax loader */
function ajax_loader(key) {
    if (key == "clear") {
        $(".ajax-loader").remove();
    } else {
        $(".ajax-loader").remove();
        $(key).after("<span class='ajax-loader'></span>");
    }
}
