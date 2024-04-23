
function statButtonListener(buttonId, widgetType, widgetClass) {
    const button = document.getElementById(buttonId);
    button.addEventListener("click", function() {
        addWidget(widgetType, widgetClass);
        saveWidgetState(widgetType, widgetClass);
    });
}

statButtonListener("addDescription", "descriptive-widget", "descriptiveWidget");
statButtonListener("addMean", "normality-widget", "normalityWidget");
statButtonListener("addTTest", "ttest-widget", "ttestWidget");
statButtonListener("addCorrelation", "correlation-widget", "correlationWidget");

//Input: the element to be added to the page and it's belong class name
function addWidget(element, className){
    const widgetInstance = document.createElement(element)
    widgetInstance.setAttribute("class", "row border border-dark widget " + className + " flex")
    document.getElementById("userCanvas").appendChild(widgetInstance)

}

// Calculates the descriptive statistics for the selected column
function descriptiveStatCalculation(button){
    var parent = button.closest(".descriptiveWidget");
    column = parent.getElementsByClassName('columnDrop')[0].innerText;
    $.ajax({
    type:'POST',
    url:'/summaryStatistics/' + column,
    processData: false,
    contentType: false,
    success:function(data)
    {
        // parse the return data so that it is in JSON format
        answers = JSON.parse(data)
        // Gets the closest element with the class descriptiveWidget
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
function normalityCalculation(button){
    var parent = button.closest(".normalityWidget");
    column = parent.getElementsByClassName('columnDrop')[0].innerText;
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
        tableElements = parent.getElementsByClassName('normalityAnswer');
        tableElements[0].innerHTML =  answers['pValue'] 
        tableElements[1].innerHTML =  answers['statistic'] 
        var imageHolder = parent.querySelector(".normalImageHolder")
        imageHolder.innerHTML = "<img class=standard_img src='data:image/png;base64," + answers['imageData'] + "'/>"


    }
})
}

// Calculates the ttest test for the selected columns

function ttestCalculation(button){
    var parent = button.closest(".ttestWidget");
    columnElements = parent.getElementsByClassName('ttestDrop');
    selection = parent.getElementsByClassName('ttestIddChoice')[0].value;
    if (!columnElements[0].innerHTML.includes("Drag column") && !columnElements[1].innerHTML.includes("Drag column")){
        var column1 = columnElements[0].innerText
        var column2 = columnElements[1].innerText

        var sendInfo = {
            "column1": column1,
            "column2": column2,
            "selection": selection
        }
        sendInfo = JSON.stringify(sendInfo)
        $.ajax({
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
        type:'POST',
        url:'/ttest',
        data: sendInfo,
        success:function(data)
        {
            // parse the return data so that it is in JSON format
            answers = JSON.parse(data)
            // Gets the closest element with the class ttestWidget
            tableElements = parent.getElementsByClassName('ttestAnswer');
            tableElements[0].innerHTML =  answers['pValue'] 
            tableElements[1].innerHTML =  answers['statistic'] 
            var imageHolder = parent.querySelector(".ttestImageHolder")
            imageHolder.innerHTML = "<img class=standard_img src='data:image/png;base64," + answers['imageData'] + "'/>"
    
        }
    })
    }


}


function correlationCalculation(button){
    var parent = button.closest(".correlationWidget");

    columnElements = parent.getElementsByClassName('doubleDrops')[0].getElementsByClassName('ttestDrop');
    console.log(columnElements)

    if (!columnElements[0].innerHTML.includes("Drag column") && !columnElements[1].innerHTML.includes("Drag column")){
        var column1 = columnElements[0].innerText
        var column2 = columnElements[1].innerText

        var sendInfo = {
            "column1": column1,
            "column2": column2,
        }
        sendInfo = JSON.stringify(sendInfo)
        $.ajax({
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
        type:'POST',
        url:'/correlation',
        data: sendInfo,
        success:function(data)
        {
            answers = JSON.parse(data)
            // Gets the closest element with the class ttestWidget
            tableElements = parent.getElementsByClassName('correlationAnswer');
            console.log(tableElements)
            tableElements[0].innerHTML =  answers['correlation'] 
            tableElements[1].innerHTML =  answers['pValue']         
        }
    })
    }


}

// Deletes the widget with current class name (closest to button)
function deleteWidget(button, className){
    var parent = button.closest(className);
    var order = Array.from(parent.parentNode.children).indexOf(parent)
    $.ajax({
        type:'GET',
        url:'/removeWidgetIndex/' + order,
        success:function(data)
        {
            if(data != "None"){
                parent.remove();

                }
            }

        })};


function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.innerHTML);
  }

  function columnDrop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.innerHTML = data;
  }
  


  //Move widget up or down deping on parameter
  function moveOrder(button, direction) {
    var widget = button.closest(".widget");
    var canvas = document.getElementById("userCanvas");
    var sibling = direction === 1 ? widget.previousElementSibling : widget.nextElementSibling;



    if (sibling) {
        var oldIndex = Array.from(widget.parentNode.children).indexOf(widget);
        var newIndex = direction === 1 ? oldIndex - 1 : oldIndex + 1;
        var sendInfo = {
            "oldIndex": oldIndex,
            "newIndex": newIndex,
            "direction": direction
        };

        sendInfo = JSON.stringify(sendInfo);

        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: 'POST',
            url: '/switchWidgetIndex',
            data: sendInfo,
            success: function(data) {
                widgetInnerHTML = widget.innerHTML;
                siblingInnerHTML = sibling.innerHTML;
                if (direction === 1) {
                    canvas.insertBefore(widget, sibling)
                    widget.innerHTML = widgetInnerHTML;

                } else {
                    canvas.insertBefore(sibling, widget)
                    sibling.innerHTML = siblingInnerHTML;

                }
            }
        });
    }
}

 //When this function is called, it will add the state of the widget to the session variable
  function saveWidgetState(type, className){

    var sendInfo = {
        "type": type,
        "className":className,
    }
    sendInfo = JSON.stringify(sendInfo)
    $.ajax({
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        },
    type:'POST',
    url:'/widgetDictionary',
    data: sendInfo,
    success:function(data)
    {}

    })};

    // if there is a page state, it will create these widgets on page load
    window.onload = function(){
        $.ajax({
        type:'GET',
        url:'/getWidgetDictionary',
        success:function(data)
        {
            if(data != "None"){
                for(widget in data){
                    addWidget(data[widget]['type'], data[widget]['className']);

                }
            }

        }
    
        })
    }