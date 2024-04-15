$(document).ready(function() {
    $('#csv_upload').submit(function (e) {
        console.log("function executed")
        var form = new FormData($(this)[0])
        // AJAX request to submit the form data
        $.ajax({
            type:'POST',
            url:'/load_csv',
            data: form, 
            processData: false,
            contentType: false,
            success:function(data)
            {
            }
        })

    })
});
