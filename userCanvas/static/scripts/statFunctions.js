
//Helper functions

// This function will add a listener to the button with the given id. When the button is clicked, it will add the widget to the page and save the widget state to the session variable
function statButtonListener(buttonId, widgetType, widgetClass, functionCall) {
    const button = document.getElementById(buttonId);
    button.addEventListener("click", function() {
        addWidget(widgetType, widgetClass);
        saveWidgetState(widgetType, widgetClass, functionCall);
    });
}


//Input: the element to be added to the page and it's belong class name
function addWidget(element, className){
    const widgetInstance = document.createElement(element)
    widgetInstance.setAttribute("class", "row border border-dark widget pb-3 " + className)
    document.getElementById("userCanvas").appendChild(widgetInstance)

}

// This functionw will select the imagePlaceholderClass closest to the parent and add the image to the placeholder
function makeImage(parent, imagePlaceholderClass, imageData){
    var imageHolder = parent.querySelector(imagePlaceholderClass)
    imageHolder.innerHTML = "<img class=standard_img src='data:image/png;base64," + imageData + "'/>"
}

statButtonListener("addDescription", "descriptive-widget", "descriptiveWidget", "descriptiveStatCalculation");
statButtonListener("addMean", "normality-widget", "normalityWidget", "normalityCalculation");
statButtonListener("addTTest", "ttest-widget", "ttestWidget", "ttestCalculation");
statButtonListener("addCorrelation", "correlation-widget", "correlationWidget", "correlationCalculation");


function statCalculation(button, className, functionCall){
    var parent = button.closest(className);
    var index = Array.from(parent.parentNode.children).indexOf(parent);
    if(parent.getElementsByClassName('columnDrop').length == 1){
        column = parent.getElementsByClassName('columnDrop')[0].innerText;
        functionCall(parent, index, column)

    }
    else{
        column1= parent.getElementsByClassName('columnDrop')[0].innerText;
        column2 = parent.getElementsByClassName('columnDrop')[1].innerText;
        functionCall(parent, index, column1, column2)

    }
}


// Calculates the descriptive statistics for the selected column
function descriptiveStatCalculation(parent, index, column){
    var sendInfo = {
        "column": column,
        "index": index,
    }
    sendInfo = JSON.stringify(sendInfo)
    $.ajax({
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        },
    type:'POST',
    url:'/summaryStatistics',
    data: sendInfo,
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
function normalityCalculation(parent, index, column){
    var sendInfo = {
        "column": column,
        "index": index,
    }
    sendInfo = JSON.stringify(sendInfo)
    $.ajax({
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        },
    type:'POST',
    url:'/normality',
    data: sendInfo,
    success:function(data)
    {
        // parse the return data so that it is in JSON format
        answers = JSON.parse(data)
        // Gets the closest element with the class normalityWidget
        tableElements = parent.getElementsByClassName('normalityAnswer');
        tableElements[0].innerHTML =  answers['pValue'] 
        tableElements[1].innerHTML =  answers['statistic'] 
        makeImage(parent, ".normalImageHolder", answers['imageData'])


    }
})
}

// Calculates the ttest test for the selected columns

function ttestCalculation(parent, index, column1, column2){
    selection = parent.getElementsByClassName('ttestIddChoice')[0].value;
    if (column1 != "Drag column" && column2 != "Drag column"){

        var sendInfo = {
            "column1": column1,
            "column2": column2,
            "selection": selection,
            "index": index,
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
            makeImage(parent, ".ttestImageHolder", answers['imageData'])
        }
    })
    }


}


function correlationCalculation(parent, index, column1, column2){
    if (column1 != "Drag column" && column2 != "Drag column"){

        var sendInfo = {
            "column1": column1,
            "column2": column2,
            "index": index
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
            tableElements[0].innerHTML =  answers['correlation'] 
            tableElements[1].innerHTML =  answers['pValue']         
            makeImage(parent, ".correlationImageHolder", answers['scatterImage'])
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
  // Need to save internal state, otherwise the page forgets it
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
  function saveWidgetState(type, className, functionString){
    var sendInfo = {
        "type": type,
        "className":className,
        "function": functionString,
        "column": "None"
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
            if(data != "noState"){
                var canvas = document.getElementById("userCanvas");
                for(widget in data){
                    var newWidget = document.createElement(data[widget]['type']);
                    newWidget.className = "row border border-dark widget pb-3 " + data[widget]['className']
                    canvas.appendChild(newWidget)
                    if (data[widget]['column'].length == 1){
                        eval(data[widget]['function'] + "(newWidget, " + widget + ", '" + data[widget]['column'] + "')")
                    }
                    if (data[widget]['column'].length == 2){
                        eval(data[widget]['function'] + "(newWidget, " + widget + ", '" + data[widget]['column'][0] + "', '"  + data[widget]['column'][1] + "')")
                    }


                    

                }
            }

        }
    
        })
    }