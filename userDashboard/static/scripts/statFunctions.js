descriptiveButton =  document.getElementById("addDescription");
descriptiveButton.addEventListener("click", function(e){
    e.preventDefault();
    console.log("test")
    $.ajax({
        type:'POST',
        url:'/descriptive/meantemp',
        processData: false,
        contentType: false,
        success:function(data)
        {
            // Call the load_csvdata function upon successful form submission
            console.log(data)
        }
    })

});