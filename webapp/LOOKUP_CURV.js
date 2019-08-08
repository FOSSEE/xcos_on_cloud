function showGraphWindow(graph, cell, diagRoot) {
    var name = cell.getAttribute('blockElementName');
    var myGraph;
    var graphParameters = cell.blockInstance.instance.get();
    // for replotting the grph
    var defaultPoints = graphParameters.graphPoints.slice();
    // to store all the states of graph points for undo function
    var pointsHistory = [];
    // to contain menubar and graphic
    var content = document.createElement('div');
    // to contain menubar
    var menuBar = document.createElement('div');
    menuBar.setAttribute('id','graphMenuBar');
    var edit = document.createElement('span');
    edit.innerHTML= 'Edit';
    edit.setAttribute('class','menu');
    menuBar.appendChild(edit);
    var data = document.createElement('span');
    data.innerHTML= 'Data';
    data.setAttribute('class','menu');
    menuBar.appendChild(data);
    content.appendChild(menuBar);
    var editOptions = ['Undo','Size','Replot','Ok','Abort'];
    var editMenuOptions=[];
    var editMenu = document.createElement('div');
    for (var i=0;i<=4;i++) {
        editMenuOptions[i] = document.createElement('li');
        editMenuOptions[i].innerHTML = editOptions[i];
        editMenuOptions[i].setAttribute('class','optionsDropdown');
        editMenu.appendChild(editMenuOptions[i]);
    };
    editMenu.setAttribute('class','menuDropdown displayNone');
    content.appendChild(editMenu);
    var dataOptions = ['Read','Save','Clear'];
    var dataMenuOptions=[];
    var dataMenu = document.createElement('div');
    for (var i=0;i<=2;i++) {
        dataMenuOptions[i] = document.createElement('li');
        dataMenuOptions[i].innerHTML = dataOptions[i];
        dataMenuOptions[i].setAttribute('class','optionsDropdown');
        dataMenu.appendChild(dataMenuOptions[i]);
    };
    dataMenu.setAttribute('class','menuDropdown displayNone');
    content.appendChild(dataMenu);
    dataMenu.style.display = 'none';
    var chart = document.createElement('div');
    chart.setAttribute('id','drag_chart');
    var fileSelector = document.createElement("input");
    fileSelector.setAttribute("type","file");
    fileSelector.setAttribute("id","inputFile");
    chart.appendChild(fileSelector);
    content.appendChild(chart);
    var wind = showModalWindow(graph, 'Properties', content, 450, 450);
    var drag_chart = create_draggable_points_chart(graphParameters.graphPoints, pointsHistory, graphParameters.xmin, graphParameters.xmax, graphParameters.ymin, graphParameters.ymax);
    content.onclick = function() {
        dataMenu.style.display = 'none';
        editMenu.style.display = 'none';
    }
    edit.onclick = function(event) {
        event.stopPropagation();
        if (editMenu.style.display == 'none') {
            dataMenu.style.display = 'none';
            editMenu.style.display = 'block';
        } else
            editMenu.style.display = 'none';
    };
    data.onclick = function(event) {
        event.stopPropagation();
        if (dataMenu.style.display == 'none') {
            editMenu.style.display = 'none';
            dataMenu.style.display = 'block';
        } else
            dataMenu.style.display = 'none';
    };

    // Undo Option
    editMenuOptions[0].onclick = function() {
        if (pointsHistory.length>=2) {
            graphParameters.graphPoints = pointsHistory[pointsHistory.length-2].slice();
            graphParameters.graphPoints = objToArrayList(graphParameters.graphPoints);
            pointsHistory = [];
            drag_chart = create_draggable_points_chart(graphParameters.graphPoints, pointsHistory, graphParameters.xmin, graphParameters.xmax, graphParameters.ymin, graphParameters.ymax);
        }
    };

    // Size Option
    editMenuOptions[1].onclick = function () {
        // Create basic structure for the form
        var inputSize = document.createElement('div');
        inputSize.setAttribute("id", "contentProperties");

        // Heading of content
        var heading = document.createElement('h2');
        heading.innerHTML = "Please input new limits";
        heading.id = "headingProperties"
        inputSize.appendChild(heading);

        // Add Form
        var myform = document.createElement("form");
        myform.method = "post";
        myform.id = "formProperties";

        // Line break
        var linebreak = document.createElement('br');
        myform.appendChild(linebreak);

        for (var key in graphParameters) {
            if (key!="graphPoints") {
                // Input Title
                var namelabel = document.createElement('label');
                namelabel.innerHTML = key;
                myform.appendChild(namelabel);

                // Input
                var input = document.createElement("input");
                input.value = graphParameters[key];
                input.setAttribute("id", key.toString());
                input.setAttribute("class", "fieldInput");
                myform.appendChild(input);

                // Line break
                var linebreak = document.createElement('br');
                myform.appendChild(linebreak);

                // Line break
                var linebreak = document.createElement('br');
                myform.appendChild(linebreak);
            }
        }

        // Line break
        var linebreak = document.createElement('br');
        myform.appendChild(linebreak);

        // Button - Ok
        var Ok = document.createElement("button");
        Ok.innerHTML = 'Submit';
        Ok.onclick = function () {
            for (var key in graphParameters) {
                if (key!='graphPoints') {
                    graphParameters[key] = document.getElementById(key.toString()).value;
                }
            }
            inputSizeMenu.destroy();
            drag_chart = create_draggable_points_chart(graphParameters.graphPoints, pointsHistory, graphParameters.xmin, graphParameters.xmax, graphParameters.ymin, graphParameters.ymax);
        }
        myform.appendChild(Ok);

        // Button - Cancel
        var Cancel = document.createElement("button");
        Cancel.innerHTML = 'Reset';
        Cancel.onclick = function() {
            inputSizeMenu.destroy();
        }
        myform.appendChild(Cancel);
        inputSize.appendChild(myform);
        height = 135 + 26 * 4 + 15;
        var inputSizeMenu = showModalWindow(graph, 'Properties', inputSize, 450, height);
    };

    // To Replot
    editMenuOptions[2].onclick = function () {
        editMenu.style.display = 'none';
        graphParameters.graphPoints = defaultPoints.slice();
        drag_chart = create_draggable_points_chart(graphParameters.graphPoints, pointsHistory, graphParameters.xmin, graphParameters.xmax, graphParameters.ymin, graphParameters.ymax);
    };
    // To Submit
    editMenuOptions[3].onclick = function() {
        /*
         * Model is updated below to convert all points that as been convert
         * to object (due to dragging) back to array before xml is created
         */

        editMenu.style.display = 'none';
        var model = graph.getModel();
        model.beginUpdate();
        try {
            graphParameters.graphPoints= objToArrayList(graphParameters.graphPoints);
            for (var i=0;i<(graphParameters.graphPoints.length-1);i++) {
                if (graphParameters.graphPoints[i+1][0]-graphParameters.graphPoints[i][0] <= 0) {
                    alert("You have not defined a function");
                    wind.destroy();
                    return;
                }
            }

            var oldPorts = getPorts(cell.blockInstance.instance);
            var details = cell.blockInstance.instance.set(graphParameters);
            updateDetails(cell, details);
            var newPorts = getPorts(cell.blockInstance.instance);
            modifyPorts(graph, cell, cell.ports.left, 'left', oldPorts.inputPorts, newPorts.inputPorts);
            modifyPorts(graph, cell, cell.ports.top, 'top', oldPorts.controlPorts, newPorts.controlPorts);
            modifyPorts(graph, cell, cell.ports.right, 'right', oldPorts.outputPorts, newPorts.outputPorts);
            modifyPorts(graph, cell, cell.ports.bottom, 'bottom', oldPorts.commandPorts, newPorts.commandPorts);
        } finally {
            model.endUpdate();
        }

        graph.refresh();
        wind.destroy();
    };
    // To Abort
    editMenuOptions[4].onclick = function() {
        editMenu.style.display = 'none';
        wind.destroy();
    };
    // To Read from file
    dataMenuOptions[0].onclick = function () {
        dataMenu.style.display = 'none';
        if ("FileReader" in window) {
            fileSelector.click();
        } else {
            alert("Your browser does not support the HTML5 FileReader.");
        }
    };
    fileSelector.onchange = function(event) {
        var fileToLoad = event.target.files[0];
        if (fileToLoad) {
            var reader = new FileReader();
            reader.onload = function(fileLoadedEvent) {
                var textFromFileLoaded = fileLoadedEvent.target.result;
                var number=["",""];
                var coordinatesFromFile=[];
                var count=0;
                for (var i=0;i<(textFromFileLoaded.length);i++) {
                    if (textFromFileLoaded[i]!="\t" && textFromFileLoaded[i]!="\n")
                        number[count]=number[count]+textFromFileLoaded[i];
                    else {
                        number[count]=Number(number[count]);
                        count++;
                        if (count==2) {
                            coordinatesFromFile.push([number[0],number[1]]);
                            count=0;
                            number=["",""];
                        }
                    }
                }
                coordinatesFromFile=coordinatesFromFile.sort(function(a,b) {
                    return a[0] - b[0];
                });
                graphParameters.graphPoints = coordinatesFromFile.slice();
                drag_chart = create_draggable_points_chart(graphParameters.graphPoints, pointsHistory, graphParameters.xmin, graphParameters.xmax, graphParameters.ymin, graphParameters.ymax);
            };
            reader.readAsText(fileToLoad, "UTF-8");
        }
    };
    // To write to file
    dataMenuOptions[1].onclick = function() {
        graphParameters.graphPoints= objToArrayList(graphParameters.graphPoints);
        for (var i=0;i<(graphParameters.graphPoints.length-1);i++) {
            if (graphParameters.graphPoints[i+1][0]-graphParameters.graphPoints[i][0] <= 0) {
                alert("You have not defined a function");
                return;
            }
        }
        dataMenu.style.display = 'none';
        if ("Blob" in window) {
            var fileName = "coordinates.xy";
            var textToWrite = "";
            for (var i=0;i<graphParameters.graphPoints.length;i++) {
                textToWrite = textToWrite + graphParameters.graphPoints[i][0] + "\t" + graphParameters.graphPoints[i][1] + "\r\n";
            }
            var textFileAsBlob = new Blob([textToWrite], { type: "text/plain" });
            if ("msSaveOrOpenBlob" in navigator) {
                navigator.msSaveOrOpenBlob(textFileAsBlob, fileName);
            } else {
                var downloadLink = document.createElement("a");
                downloadLink.download = fileName;
                downloadLink.innerHTML = "Download File";
                if ("webkitURL" in window) {
                    // Chrome allows the link to be clicked without actually
                    // adding it to the DOM.
                    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
                } else {
                    // Firefox requires the link to be added to the DOM before
                    // it can be clicked.
                    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
                    downloadLink.onclick = destroyClickedElement;
                    downloadLink.style.display = "none";
                    document.body.appendChild(downloadLink);
                }
                downloadLink.click();
            }
        } else {
            alert("Your browser does not support the HTML5 Blob.");
        }
    };
    // To clear the graph window
    dataMenuOptions[2].onclick = function() {
        dataMenu.style.display = 'none';
        graphParameters.graphPoints = [];
        drag_chart = create_draggable_points_chart(graphParameters.graphPoints, pointsHistory, graphParameters.xmin, graphParameters.xmax, graphParameters.ymin, graphParameters.ymax);
    };
    function destroyClickedElement(event) {
        document.body.removeChild(event.target);
    }
}
