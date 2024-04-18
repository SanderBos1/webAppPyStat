

descriptiveButton =  document.getElementById("addDescription");
descriptiveButton.addEventListener("click", function(){
    addWidget("descriptive-widget", "descriptiveWidget");
});

normalityButton =  document.getElementById("addMean");
normalityButton.addEventListener("click", function(){
     addWidget("normality-widget", "normalityWidget");
});

ttestButton =  document.getElementById("addTTest");
ttestButton.addEventListener("click", function(){
    addWidget("ttest-widget", "ttestWidget");
});


//Input: the element to be added to the page and it's belong class name
function addWidget(element, className){
    const widgetInstance = document.createElement(element)
    widgetInstance.setAttribute("class", "widget " + className + " flex")
    document.getElementById("userCanvas").appendChild(widgetInstance)

}

// Calculates the descriptive statistics for the selected column
function descriptiveStatCalculation(columnHolder, column){
    $.ajax({
    type:'POST',
    url:'/descriptive/' + column,
    processData: false,
    contentType: false,
    success:function(data)
    {
        // parse the return data so that it is in JSON format
        answers = JSON.parse(data)
        // Gets the closest element with the class descriptiveWidget
        var parent = columnHolder.closest(".descriptiveWidget");
        tableElements = parent.getElementsByClassName('descriptiveAnswer');
        let i = 0
        for (key in answers){
            tableElements[i].innerHTML = answers[key]
            i++
        }

    }
})
}

// Calculates the normality test for the selected column
function normalityCalculation(columnHolder, column){
    $.ajax({
    type:'POST',
    url:'/normality/' + column,
    processData: false,
    contentType: false,
    success:function(data)
    {
        // parse the return data so that it is in JSON format
        answers = JSON.parse(data)
        // Gets the closest element with the class normalityWidget
        var parent = columnHolder.closest(".normalityWidget");
        tableElements = parent.getElementsByClassName('normalityAnswer');
        tableElements[0].innerHTML =  answers['pValue'] 
        tableElements[1].innerHTML =  answers['statistic'] 
        var imageHolder = parent.querySelector(".normalImageHolder")
        imageHolder.innerHTML = "<img class=standard_img src='data:image/png;base64," + answers['imageData'] + "'/>"


    }
})
}

// Calculates the ttest test for the selected columns

function ttestCalculation(columnHolder, column1, column2){
    $.ajax({
    type:'POST',
    url:'/ttest/' + column1 + "/" + column2,
    processData: false,
    contentType: false,
    success:function(data)
    {
        // parse the return data so that it is in JSON format
        answers = JSON.parse(data)
        // Gets the closest element with the class ttestWidget
        var parent = columnHolder.closest(".ttestWidget");
        tableElements = parent.getElementsByClassName('ttestAnswer');
        tableElements[0].innerHTML =  answers['pValue'] 
        tableElements[1].innerHTML =  answers['statistic'] 
        var imageHolder = parent.querySelector(".ttestImageHolder")
        imageHolder.innerHTML = "<img class=standard_img src='data:image/png;base64," + answers['imageData'] + "'/>"

    }
})
}

// Deletes the widget with current class name (closest to button)
function deleteWidget(button, className){
    var parent = button.closest(className);
    parent.remove();
}

function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.innerHTML);
  }

  function columnDropTTest(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.innerHTML = "<p>" + data + "</p>";
    var parent = ev.target.closest(".ttestWidget");
    columnElements = parent.getElementsByClassName('ttestDrop');
    //Checks if both columns have been selected (by dragging to the drop area)
    if (!columnElements[0].innerHTML.includes("Drag column") && !columnElements[1].innerHTML.includes("Drag column")){
        ttestCalculation(ev.target, columnElements[0].innerText, data)
    }

  }
  
  function columnDropDescriptive(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.innerHTML = "<p>" + data + "</p>";
    descriptiveStatCalculation(ev.target, data)
  }

  function columnDropNormality(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.innerHTML = "<p>" + data + "</p>";
    normalityCalculation(ev.target, data)
  }