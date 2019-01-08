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

        var model = graph.getModel();
        model.beginUpdate();
        try {
            graphParameters.graphPoints= objToArrayList(graphParameters.graphPoints);
            cell.blockInstance.instance.set(graphParameters);
        } finally {
            model.endUpdate();
        }

        /*
         * Loading XML of last graph configuration so that all the links nodes
         * of the previous xml can be copied to the new XML
         */

        var encPrevXml = new mxCodec(mxUtils.createXmlDocument());
        var nodePrevXml = encPrevXml.encode(diagRoot);
        var strPrevXml = mxUtils.getPrettyXml(nodePrevXml);
        strPrevXml = mxUtils.parseXml(strPrevXml);
        var resultDocumentPrevXml = getXsltProcessor().transformToDocument(strPrevXml);
        /*
         * Maverick
         * Using resultDocument.documentElement to remove an additional tag
         * "<#document>" created by the XSLTProcessor.
         */
        strPrevXml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\n" + mxUtils.getPrettyXml(resultDocumentPrevXml.documentElement);
        strPrevXml = strPrevXml.replace(/\n\n/g, "\n");
        strPrevXml = strPrevXml.replace(/\n*/, '');
        strPrevXml = strPrevXml.replace(/>\s*</g, '><');
        strPrevXml = strPrevXml.replace(/<!--[\s\S]*?-->/g, '');
        var docPrevXml = mxUtils.parseXml(strPrevXml);
        var codecPrevXml = new mxCodec(docPrevXml);
        var rootNode = docPrevXml.documentElement;
        while (rootNode.nodeName != 'root') {
            rootNode = rootNode.firstChild;
        }
        var currentNode = rootNode.firstChild;

        editMenu.style.display = 'none';
        var parent = graph.getDefaultParent();
        var model = graph.getModel();
        var v1 = null;
        var doc = mxUtils.createXmlDocument();
        model.beginUpdate();
        try {
            var geometry = cell.getGeometry();
            var x=geometry.x;
            var y=geometry.y;
            var details_instance = new window[name]();

            graphParameters.graphPoints= objToArrayList(graphParameters.graphPoints);
            for (var i=0;i<(graphParameters.graphPoints.length-1);i++) {
                if (graphParameters.graphPoints[i+1][0]-graphParameters.graphPoints[i][0] <= 0) {
                    alert("You have not defined a function");
                    wind.destroy();
                    return;
                }
            }
            var details = cell.blockInstance.instance.set(graphParameters);
            // window[name]("set",cell.value,propertiesObject);

            editor.execute('deleteBlock',(editor, cell));
            var enc = new mxCodec(mxUtils.createXmlDocument());
            var node = enc.encode(details);
            var temp = enc.encode(parent);

            // Get the stylesheet for the graph
            var stylesheet = graph.getStylesheet();
            // From the stylesheet, get the style of the particular block
            var style = stylesheet.styles[name];

            /*
             * When a particular block is loaded for the first time, the image
             * in the style of the block will be a path to the image. Set the
             * label in the style property of the block has a html image, and
             * set the image in the style property as null
             *
             * NOTE: Since the image of any block need not be changed for for
             * every movement of that block, the image must be set only once.
             */

            if (style != null && style['image'] != null) {
                // Make label as a image html element
                var label = '<img src="' + style['image'] + '" height="80" width="80">';
                // Set label
                style['label'] = label;

                style['imagePath'] = style['image'];

                // Set image as null
                style['image'] = null;

                // Add the label as a part of node
                node.setAttribute('label', label);
            }

            /*
             * If a particular block with image tag in it's style property
             * has been invoked already, the image tag would be null for any
             * successive instances of the same block. Hence, set the label
             * from the label tag in style which was set when that blockModel
             * was invoked on the first time.
             */
            if (style != null && style['label'] != null) {
                // Set label from the label field in the style property
                node.setAttribute('label', style['label']);
            }

            node.setAttribute('parent', temp.getAttribute('id'));
            var i, arr = [];

            var details_instance=cell.blockInstance.instance;

            var blockModel = details_instance.x.model;
            var graphics = details_instance.x.graphics;

            /* To determine number and type of Port */
            var inputPorts = [],
                outputPorts = [],
                controlPorts = [],
                commandPorts = [];
            if (blockModel.in.height != null) {
                arr = getData(graphics.in_implicit);
                if (arr.length != 0) {
                    inputPorts = arr;
                } else {
                    for (i = 0; i < blockModel.in.height; i++) {
                        inputPorts.push("E");
                    }
                }
            }
            if (blockModel.out.height != null) {
                arr = getData(graphics.out_implicit);
                if (arr.length != 0) {
                    outputPorts = arr;
                } else {
                    for (i = 0; i < blockModel.out.height; i++) {
                        outputPorts.push("E");
                    }
                }
            }
            if (blockModel.evtin.height != null) {
                for (i = 0; i < blockModel.evtin.height; i++) {
                    controlPorts.push("CONTROL");
                }
            }
            if (blockModel.evtout.height != null) {
                for (i = 0; i < blockModel.evtout.height; i++) {
                    commandPorts.push("COMMAND");
                }
            }
            v1 = graph.insertVertex(parent, null, node, x, y, 80, 80, name);

            // @Chhavi: Additional attribute to store the block's instance
            v1.blockInstance = createInstanceTag(details_instance);
            v1.currentAngle = 0;
            v1.flipX = 1;
            v1.flipY = 1;
            createPorts(graph, v1, inputPorts, controlPorts, outputPorts, commandPorts);
            v1.setConnectable(false);
        } finally {
            model.endUpdate();
        }

        /*
         * The code below is responsible for moving the new (non-links) node
         * created after the set function is called back to their previous
         * positions as in their previous XML.  This is done to retain the id's
         * so that the Link node of previous XML can be used to create
         * connecting wires for the new XML also.
         */

        var referenceModelCount = referenceModelProps.length;
        var missingKeys = [];
        var lastId = Math.max(...Object.keys(model.cells));

        for (var i=0;i< referenceModelCount ; i++) {
            var present = false;
            for (var key in model.cells) {
                if (model.cells.hasOwnProperty(key)) {
                    if (referenceModelProps[i].id == key) {
                        present = true;
                        break;
                    }
                }
            }
            if (present == false)
                missingKeys.push(referenceModelProps[i].id);
        }

        var newIDs= [];
        for (var i=modelNextId;i<=lastId;i++)
            newIDs.push(i);
        var j = 0;

        for (var i = 0; i < missingKeys.length; i++) {
            var referenceModelStyle = referenceModelProps.find( function (obj) {
                return obj.id == missingKeys[i];
            }).style;

            if (model.cells[newIDs[j]].style.endsWith('Port')) {
                if (referenceModelStyle == model.cells[newIDs[j]].style) {
                    model.cells[missingKeys[i]] = model.cells[newIDs[j]];
                    model.cells[missingKeys[i]].id = String(missingKeys[i]);
                    delete model.cells[newIDs[j++]];
                } else {
                    var tempId = j;
                    while (newIDs[++j] <= lastId) {
                        if (referenceModelStyle == model.cells[newIDs[j]].style) {
                            model.cells[missingKeys[i]] = model.cells[newIDs[j]];
                            model.cells[missingKeys[i]].id = String(missingKeys[i]);
                            delete model.cells[newIDs[j]];
                            newIDs.splice(j,1);
                            j = tempId;
                            break;
                        }
                    }
                }
            } else if (model.cells[newIDs[j]].style) {
                model.cells[missingKeys[i]] = model.cells[newIDs[j]];
                model.cells[missingKeys[i]].id = String(missingKeys[i]);
                delete model.cells[newIDs[j++]];
            }
        }
        referenceModelProps = [];
        newIDs = [];

        model.beginUpdate();
        try {
            // Connecting the blocks by inserting link nodes
            while (currentNode!=null) {
                var curNodeName = currentNode.nodeName;
                if (curNodeName.endsWith('Link')) {
                    var pointsArray = [];
                    var newSourceCell = graph.getModel().getCell(currentNode.getAttribute('source'));
                    var newTargetCell = graph.getModel().getCell(currentNode.getAttribute('target'));

                    if (newSourceCell.getEdgeCount() <=0 && newTargetCell.getEdgeCount()<=0) {
                        var childNode = currentNode.firstChild;
                        if (childNode != null) {
                            if (childNode.nodeName == 'mxGeometry') {
                                var tempNode = childNode.firstChild;
                                if (tempNode != null) {
                                    if (tempNode.nodeName == 'mxPoint') {
                                        pointsArray.push(new mxPoint(tempNode.getAttribute('x'), tempNode.getAttribute('y')));
                                    } else {
                                        if (tempNode.nodeName == 'Array') {
                                            var mxPointNode = tempNode.firstChild;
                                            while (mxPointNode != null) {
                                                pointsArray.push(new mxPoint(mxPointNode.getAttribute('x'), mxPointNode.getAttribute('y')));
                                                mxPointNode = mxPointNode.nextSibling;
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        createEdgeObject(graph, newSourceCell, newTargetCell, null);
                    }
                }
                currentNode=currentNode.nextSibling;
            }
        } finally {
            model.endUpdate();
        }
        graph.setSelectionCell(v1);
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
