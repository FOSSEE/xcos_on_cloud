var check_call = 1;
function showGraphWindowSigBlk(graph,graphParameters,cell) {
    var drag_sig_chart = "";
    var parameters = {
        xx: "",
        yy: "",
        mtd: "",
        PeriodicOption: "",
        graf: ""
    };
    var defaultPoints = graphParameters.graphPoints.slice();
    // to store all the states of graph points for undo function
    var pointsHistory = [];
    // to contain menubar and graphic
    var content = document.createElement('div');
    // to contain menubar
    var menuBar = document.createElement('div');
    menuBar.setAttribute('id','graphMenuBar');
    //Menu File
    var filemenu = document.createElement('span');
    filemenu.innerHTML= 'File';
    filemenu.setAttribute('class','menu');
    filemenu.setAttribute('id','file_menu');
    filemenu.onclick = 
    menuBar.appendChild(filemenu);
    //Menu Tools
    var tools = document.createElement('span');
    tools.innerHTML= 'Tools';
    tools.setAttribute('class','menu');
    tools.setAttribute('id','tools_menu');
    menuBar.appendChild(tools);
    //menu Edit
    /*var edit = document.createElement('span');
    edit.innerHTML= 'Edit';
    edit.setAttribute('class','menu');
    edit.setAttribute('id','edit_menu');
    menuBar.appendChild(edit);
    //menu ?
    var question = document.createElement('span');
    question.innerHTML= '?';
    question.setAttribute('class','menu');
    question.setAttribute('id','question_menu');
    menuBar.appendChild(question);*/
    //menu Autoscale
    var autoscale = document.createElement('span');
    autoscale.innerHTML= 'Autoscale';
    autoscale.setAttribute('class','menu');
    autoscale.setAttribute('id','autoscale_menu');
    menuBar.appendChild(autoscale);
    //menu Spline
    var spline = document.createElement('span');
    spline.innerHTML= 'Spline';
    spline.setAttribute('class','menu');
    spline.setAttribute('id','spline_menu');
    menuBar.appendChild(spline);
    //menu Data
    var data = document.createElement('span');
    data.innerHTML= 'Data';
    data.setAttribute('class','menu');
    data.setAttribute('id','data_menu');
    menuBar.appendChild(data);
    //menu Standards
    var standards = document.createElement('span');
    standards.innerHTML= 'Standards';
    standards.setAttribute('class','menu');
    standards.setAttribute('id','standards_menu');
    menuBar.appendChild(standards);
    //menu Exit
    var exit = document.createElement('span');
    exit.innerHTML= 'Exit';
    exit.setAttribute('class','menu');
    exit.setAttribute('id','exit_menu');
    menuBar.appendChild(exit);
    content.appendChild(menuBar);

    //Submenu for menu File
    var fileOptions = ['New Figure...','Load...','Save...','Export to...','Copy to clipboard','Page setup...','Print...','Close'];
    var fileMenuOptions=[];
    var fileSubMenu = document.createElement('div');
    for (var i = 0; i < fileOptions.length; i++) {
        fileMenuOptions[i] = document.createElement('li');
        fileMenuOptions[i].innerHTML = fileOptions[i];
        fileMenuOptions[i].setAttribute('class','optionsDropdown');
        fileSubMenu.appendChild(fileMenuOptions[i]);
    }
    fileSubMenu.setAttribute('class','menuDropdown displayNone');
    filemenu.appendChild(fileSubMenu);
    //Submenu for menu Tools
    var toolsOptions = ['Show/Hide Toolbar','Zoom','Original View','2D/3D Rotation'];
    var toolsMenuOptions=[];
    var toolsSubMenu = document.createElement('div');
    for (var i = 0; i < toolsOptions.length; i++) {
        toolsMenuOptions[i] = document.createElement('li');
        toolsMenuOptions[i].innerHTML = toolsOptions[i];
        toolsMenuOptions[i].setAttribute('class','optionsDropdown');
        toolsSubMenu.appendChild(toolsMenuOptions[i]);
    }
    toolsSubMenu.setAttribute('class','menuDropdown displayNone');
    tools.appendChild(toolsSubMenu);
    //Submenu for menu Edit option
    /*var editOptions = ['Undo','Size','Replot','Ok','Abort'];
    var editMenuOptions=[];
    var editMenu = document.createElement('div');
    for (var i=0;i<=4;i++) {
        editMenuOptions[i] = document.createElement('li');
        editMenuOptions[i].innerHTML = editOptions[i];
        editMenuOptions[i].setAttribute('class','optionsDropdown');
        editMenu.appendChild(editMenuOptions[i]);
    };
    editMenu.setAttribute('class','menuDropdown displayNone');
    edit.appendChild(editMenu);*/
    //Submenu for menu Spline
    var splineOptions = ['zero order','linear','order 2','not_a_knot','periodic','monotone','fast','clamped'];
    var splineMenuOptions=[];
    var splineSubMenu = document.createElement('div');
    for (var i = 0; i < splineOptions.length; i++) {
        splineMenuOptions[i] = document.createElement('li');
        splineMenuOptions[i].innerHTML = splineOptions[i];
        splineMenuOptions[i].setAttribute('class','optionsDropdown');
        splineSubMenu.appendChild(splineMenuOptions[i]);
    }
    splineSubMenu.setAttribute('class','menuDropdown displayNone');
    spline.appendChild(splineSubMenu);
    //Submenu for menu Data
    var dataOptions = ['Clear','Data Bounds','Load from text file','Save to text file','Load from Excel','Periodic signal'];
    var dataMenuOptions=[];
    var dataSubMenu = document.createElement('div');
    for (var i = 0; i < dataOptions.length; i++) {
        dataMenuOptions[i] = document.createElement('li');
        dataMenuOptions[i].innerHTML = dataOptions[i];
        dataMenuOptions[i].setAttribute('class','optionsDropdown');
        dataSubMenu.appendChild(dataMenuOptions[i]);
    }
    dataSubMenu.setAttribute('class','menuDropdown displayNone');
    data.appendChild(dataSubMenu);
    //Submenu for menu Standards
    var standardsOptions = ['sine','sawtooth1','sawtooth2','pulse','random normal','random uniform'];
    var standardsMenuOptions=[];
    var standardsSubMenu = document.createElement('div');
    for (var i = 0; i < standardsOptions.length; i++) {
        standardsMenuOptions[i] = document.createElement('li');
        standardsMenuOptions[i].innerHTML = standardsOptions[i];
        standardsMenuOptions[i].setAttribute('class','optionsDropdown');
        standardsSubMenu.appendChild(standardsMenuOptions[i]);
    }
    standardsSubMenu.setAttribute('class','menuDropdown displayNone');
    standards.appendChild(standardsSubMenu);
    //Submenu for menu exit
    var exitOptions = ['Help','Exit without save','Save/Exit'];
    var exitMenuOptions=[];
    var exitSubMenu = document.createElement('div');
    for (var i = 0; i < exitOptions.length; i++) {
        exitMenuOptions[i] = document.createElement('li');
        exitMenuOptions[i].innerHTML = exitOptions[i];
        exitMenuOptions[i].setAttribute('class','optionsDropdown');
        exitSubMenu.appendChild(exitMenuOptions[i]);
    }
    exitSubMenu.setAttribute('class','menuDropdown displayNone');
    exit.appendChild(exitSubMenu);

    var chart = document.createElement('div');
    chart.setAttribute('id','drag_sig_chart');
    var fileSelector = document.createElement("input");
    fileSelector.setAttribute("type","file");
    fileSelector.setAttribute("id","inputFile");
    chart.appendChild(fileSelector);
    content.appendChild(chart);
    var messageLabel = document.createElement('span');
    messageLabel.innerHTML = "";
    messageLabel.setAttribute('id','messageLabel');
    content.appendChild(messageLabel);
    var wind = showModalWindow(graph, 'Graphic Window', content, 550, 480);
    drag_sig_chart = create_draggable_points_chart_sigbuilder(graphParameters, pointsHistory, graphParameters.xmin, graphParameters.xmax, graphParameters.ymin, graphParameters.ymax, graphParameters.chartType, graphParameters.points, graphParameters.mtd, graphParameters.xmaxTitle,graphParameters.xpointInterval,graphParameters.step,graphParameters.stepname);
    //For displaying and hiding of submenus
    content.onclick = function() {
        fileSubMenu.style.display = 'none';
        toolsSubMenu.style.display = 'none';
        splineSubMenu.style.display = 'none';
        dataSubMenu.style.display = 'none';
        standardsSubMenu.style.display = 'none';
        exitSubMenu.style.display = 'none';
    }
    filemenu.onclick = function(event) {
        event.stopPropagation();
        if (fileSubMenu.style.display == 'none') {
            toolsSubMenu.style.display = 'none';
            splineSubMenu.style.display = 'none';
            dataSubMenu.style.display = 'none';
            standardsSubMenu.style.display = 'none';
            exitSubMenu.style.display = 'none';
            fileSubMenu.style.display = 'block';
        }else{
            fileSubMenu.style.display = 'none';
        }
    };
    tools.onclick = function(event) {
        event.stopPropagation();
        if (toolsSubMenu.style.display == 'none') {
            splineSubMenu.style.display = 'none';
            dataSubMenu.style.display = 'none';
            standardsSubMenu.style.display = 'none';
            exitSubMenu.style.display = 'none';
            fileSubMenu.style.display = 'none';
            toolsSubMenu.style.display = 'block';
        }else{
            toolsSubMenu.style.display = 'none';
        }
    };
    spline.onclick = function(event) {
        event.stopPropagation();
        if (splineSubMenu.style.display == 'none') {
            dataSubMenu.style.display = 'none';
            standardsSubMenu.style.display = 'none';
            exitSubMenu.style.display = 'none';
            fileSubMenu.style.display = 'none';
            toolsSubMenu.style.display = 'none';
            splineSubMenu.style.display = 'block';
        }else{
            splineSubMenu.style.display = 'none';
        }
    };
    /*edit.onclick = function(event) {
        event.stopPropagation();
        if (editMenu.style.display == 'none') {
            dataMenu.style.display = 'none';
            editMenu.style.display = 'block';
        }else{
            editMenu.style.display = 'none';
        }
    };*/
    data.onclick = function(event) {
        event.stopPropagation();
        if (dataSubMenu.style.display == 'none') {
            standardsSubMenu.style.display = 'none';
            exitSubMenu.style.display = 'none';
            fileSubMenu.style.display = 'none';
            toolsSubMenu.style.display = 'none';
            splineSubMenu.style.display = 'none';
            dataSubMenu.style.display = 'block';
        }else{
            dataSubMenu.style.display = 'none';
        }
    };
    standards.onclick = function(event) {
        event.stopPropagation();
        if (standardsSubMenu.style.display == 'none') {
            exitSubMenu.style.display = 'none';
            fileSubMenu.style.display = 'none';
            toolsSubMenu.style.display = 'none';
            splineSubMenu.style.display = 'none';
            dataSubMenu.style.display = 'none';
            standardsSubMenu.style.display = 'block';
        }else{
            standardsSubMenu.style.display = 'none';
        }
    };
    exit.onclick = function(event) {
        event.stopPropagation();
        if (exitSubMenu.style.display == 'none') {
            fileSubMenu.style.display = 'none';
            toolsSubMenu.style.display = 'none';
            splineSubMenu.style.display = 'none';
            dataSubMenu.style.display = 'none';
            standardsSubMenu.style.display = 'none';
            exitSubMenu.style.display = 'block';
        }else{
            exitSubMenu.style.display = 'none';
        }
    };
    //Functionalities of different menus

    //menu Autoscale
    autoscale_menu.onclick = function() {
        //Called function for autoscaling axis
        autoscaleFunctionalityForGraph(drag_sig_chart,graphParameters);
    };
    // menu Spline -> submenus 'zero order','linear','order 2','not_a_knot','periodic','monotone','fast','clamped'
    splineMenuOptions[0].onclick = function() {
        // zero order
        graphParameters.mtd = 0;
        graphParameters.points = (drag_sig_chart.series[0].points).length;
        graphParameters.xmaxTitle = (drag_sig_chart.xAxis[0].getExtremes().dataMax).toFixed(6)
        drag_sig_chart.setTitle(null, {
            text: updateSubtitleForSigbuilderGraph(graphParameters.points, graphParameters.mtd, graphParameters.xmaxTitle)
            });
        drag_sig_chart.series[0].update({
                type: "line",
                step: 'left',
                name: 'Left'
        });
    };
    splineMenuOptions[1].onclick = function() {
        // linear
        graphParameters.mtd = 1;
        graphParameters.points =(drag_sig_chart.series[0].points).length;
        graphParameters.xmaxTitle = (drag_sig_chart.xAxis[0].getExtremes().dataMax).toFixed(6)
        drag_sig_chart.setTitle(null, {
            text: updateSubtitleForSigbuilderGraph(graphParameters.points, graphParameters.mtd, graphParameters.xmaxTitle)
            });
        drag_sig_chart.series[0].update({
                type: "line",
                step: '',
                name: ''
        });
    };
    splineMenuOptions[2].onclick = function() {
        // order 2
        graphParameters.mtd = 2;
        graphParameters.points = (drag_sig_chart.series[0].points).length;
        graphParameters.xmaxTitle = (drag_sig_chart.xAxis[0].getExtremes().dataMax).toFixed(6)
        drag_sig_chart.setTitle(null, {
            text: updateSubtitleForSigbuilderGraph(graphParameters.points, graphParameters.mtd, graphParameters.xmaxTitle)
        });
        drag_sig_chart.series[0].update({
            type: "spline"
        });
    };
    splineMenuOptions[3].onclick = function() {
        // not_a_knot
        graphParameters.mtd = 3;
        graphParameters.points = (drag_sig_chart.series[0].points).length;
        graphParameters.xmaxTitle = (drag_sig_chart.xAxis[0].getExtremes().dataMax).toFixed(6)
        drag_sig_chart.setTitle(null, {
            text: updateSubtitleForSigbuilderGraph(graphParameters.points, graphParameters.mtd, graphParameters.xmaxTitle)
            });
        drag_sig_chart.series[0].update({
                type: "spline"
        });
    };
    splineMenuOptions[4].onclick = function() {
        // periodic
        graphParameters.mtd = 4;
        graphParameters.points = (drag_sig_chart.series[0].points).length;
        graphParameters.xmaxTitle = (drag_sig_chart.xAxis[0].getExtremes().dataMax).toFixed(6)
        drag_sig_chart.setTitle(null, {
            text: updateSubtitleForSigbuilderGraph(graphParameters.points, graphParameters.mtd, graphParameters.xmaxTitle)
            });
        drag_sig_chart.series[0].update({
                type: "spline"
        });
    };
    splineMenuOptions[5].onclick = function() {
        // monotone
        graphParameters.mtd = 5;
        graphParameters.points = (drag_sig_chart.series[0].points).length;
        graphParameters.xmaxTitle = (drag_sig_chart.xAxis[0].getExtremes().dataMax).toFixed(6)
        drag_sig_chart.setTitle(null, {
            text: updateSubtitleForSigbuilderGraph(graphParameters.points, graphParameters.mtd, graphParameters.xmaxTitle)
            });
        drag_sig_chart.series[0].update({
                type: "spline"
        });
    };
    splineMenuOptions[6].onclick = function() {
        // fast
        graphParameters.mtd = 6;
        graphParameters.points = (drag_sig_chart.series[0].points).length;
        graphParameters.xmaxTitle = (drag_sig_chart.xAxis[0].getExtremes().dataMax).toFixed(6)
        drag_sig_chart.setTitle(null, {
            text: updateSubtitleForSigbuilderGraph(graphParameters.points, graphParameters.mtd, graphParameters.xmaxTitle)
            });
        drag_sig_chart.series[0].update({
                type: "spline"
        });
    };
    splineMenuOptions[7].onclick = function() {
        //clamped
        graphParameters.mtd = 7;
        graphParameters.points = (drag_sig_chart.series[0].points).length;
        graphParameters.xmaxTitle = (drag_sig_chart.xAxis[0].getExtremes().dataMax).toFixed(6)
        drag_sig_chart.setTitle(null, {
            text: updateSubtitleForSigbuilderGraph(graphParameters.points, graphParameters.mtd, graphParameters.xmaxTitle)
            });
        drag_sig_chart.series[0].update({
                type: "spline"
        });
    };
    //menu Data - > Clear
    dataMenuOptions[0].onclick = function() {
        clearPoints(drag_sig_chart, graphParameters, pointsHistory);
    };
    //menu Data - > Data Bounds
    dataMenuOptions[1].onclick = function() {
        editandUpdateDataBoundsValue(graph_sigbuilder,drag_sig_chart);
    };
    //menu Data - > Load from text file
    dataMenuOptions[2].onclick = function() {
        loadPointsFromDatFile(graph_sigbuilder,drag_sig_chart,fileSelector);
    };
    //menu Data - > Save to text file
    dataMenuOptions[3].onclick = function() {
        saveToTextFile(graph_sigbuilder,drag_sig_chart,fileSelector,graphParameters);
    };
    //menu Data - > Load from Excel
    dataMenuOptions[4].onclick = function() {
        loadFromExcel(graph_sigbuilder,drag_sig_chart,fileSelector);
    };
    // menu Exit -> Help
    exitMenuOptions[0].onclick = function() {
       alert("Mouse-left click: adding a new point\n"+
       "Mouse-right click: remove a point\n"+
       "Mouse-left double click: edit a point's coordinates\n"+
       "Mouse-left button press/drag/release: move a point\n"+
       "Change the window size: 'Data' menu -> 'Databounds'");
    };
    // menu Exit -> submenu Exit without save
    exitMenuOptions[1].onclick = function() {
        wind.destroy();
    };
    // menu Exit -> submenu Save/Exit
    exitMenuOptions[2].onclick = function() {

        var x_arr = "";
        var y_arr = "";
        if(graphParameters.graphPoints!=[] && graphParameters.graphPoints.length!=0){
        //Called function for autoscaling axis according to new points
        autoscaleFunctionalityForGraph(drag_sig_chart,graphParameters);

        //Saving points and sending it to set method of JS
        x_arr = "[";
        y_arr = "[";
        graphParameters.graphPoints = objToArrayList(graphParameters.graphPoints);
        for (var i = 0; i < graphParameters.graphPoints.length; i++){
            var x = graphParameters.graphPoints[i][0];
            var y = graphParameters.graphPoints[i][1];
            if((x.toString()).includes(".") == true){
                var x_check = (x.toString()).split(".");
                if(x_check[1].length > 7){
                    x = x.toFixed(7);
                }
            }
            if((y.toString()).includes(".") == true){
                var y_check = (y.toString()).split(".");
                if(y_check[1].length > 7){
                    y = y.toFixed(7);
                }
            }
            if(i == (graphParameters.graphPoints.length-1)){
                x_arr += x + "]";
                y_arr += y + "]";
            }else{
                x_arr += x + ";";
                y_arr += y + ";";
            }
        }
        }else{
            x_arr = "[0]";
            y_arr = "[0]";
        }
        var propertiesObject = {
            id: cell.id
                };
        propertiesObject["xx"] = x_arr;
        propertiesObject["yy"] = y_arr;
        propertiesObject["Method"] = (graphParameters.mtd).toString();
        propertiesObject["PeriodicOption"] = (graphParameters.PeriodicOption).toString();
        propertiesObject["graf"] = "y";
        wind.destroy();
        check_call = 2;
        cell.blockInstance.instance.set(propertiesObject);
    };
    check_call = 1;
}

function autoscaleFunctionalityForGraph(drag_sig_chart,graphParameters){
    //Added for postive/maximum value autoscale functionality
        var max_x_value_new = (drag_sig_chart.xAxis[0].getExtremes().dataMax).toFixed(1);
        var max_y_value_new = (drag_sig_chart.yAxis[0].getExtremes().dataMax).toFixed(1);
        var max_x = drag_sig_chart.xAxis[0].getExtremes().max;
        var max_y = drag_sig_chart.yAxis[0].getExtremes().max;
        if(Math.abs(max_x - max_x_value_new) < parseFloat(graphParameters.xpointInterval) ){
            max_x = parseFloat(parseFloat(max_x) + parseFloat(graphParameters.xpointInterval)).toFixed(1);
            drag_sig_chart.xAxis[0].update({
                max: parseFloat(max_x)
            });
        }
        if(Math.abs(max_y - max_y_value_new) < parseFloat(10/2) ){
            max_y = parseFloat(parseFloat(max_y) + parseFloat(5)).toFixed(1);
            drag_sig_chart.yAxis[0].update({
                max: parseFloat(max_y)
            });
        }
        //Added for negative/minimum value autoscale functionality for y axis
        var min_y_value_new = (drag_sig_chart.yAxis[0].getExtremes().dataMin).toFixed(1);
        var min_y = drag_sig_chart.yAxis[0].getExtremes().min;
        if(Math.abs(min_y - min_y_value_new) < parseFloat(10/2) ){
            min_y = parseFloat(parseFloat(min_y) - parseFloat(5)).toFixed(1);
            drag_sig_chart.yAxis[0].update({
                min: min_y
            });
        }
}

function clearPoints(sigbuilder_Graph, graphParameters, pointsHistory){
    sigbuilder_Graph.series[0].setData([]);
    sigbuilder_Graph.series[0].addPoint([0, 0]);
    graphParameters.graphPoints = [];
    graphParameters.mtd = 0;
    pointsHistory = [];
    var pointscount = sigbuilder_Graph.series[0].data.length;
    xmaxtitle = (sigbuilder_Graph.xAxis[0].getExtremes().dataMax).toFixed(6);
    sigbuilder_Graph.setTitle(null, { text: updateSubtitleForSigbuilderGraph(pointscount, graphParameters.mtd, xmaxtitle)});
}

function editandUpdateDataBoundsValue(graph,sigbuilder_Graph){
    // Create basic structure for the form
    var content = document.createElement('div');
    content.setAttribute("id", "editDataBounds");

    // Add Form
    var myform = document.createElement("form");
    myform.method = "post";
    myform.id = "formEditDataBounds";
    myform.style.padding = "10px";

    var titlelabel = document.createElement('span');
    titlelabel.innerHTML = "Enter new bounds";
    myform.appendChild(titlelabel);
    // Line break
    var linebreak = document.createElement('br');
    myform.appendChild(linebreak);
    // Line break
    var linebreak = document.createElement('br');
    myform.appendChild(linebreak);
    var min_x = sigbuilder_Graph.xAxis[0].getExtremes().min;
    var max_x = sigbuilder_Graph.xAxis[0].getExtremes().max;
    var min_y = sigbuilder_Graph.yAxis[0].getExtremes().min;
    var max_y = sigbuilder_Graph.yAxis[0].getExtremes().max;
    var labelArray = ['xmin','xmax','ymin','ymax'];
    var textValueArray = [min_x,max_x,min_y,max_y];
    for(var i = 0; i < labelArray.length; i++){
        // Input Title
        var namelabel = document.createElement('label');
        namelabel.innerHTML = labelArray[i];
        namelabel.style.marginLeft = "30px";
        myform.appendChild(namelabel);

        var value = 0;
        if(((textValueArray[i]).toString()).includes(".")){
            value = (textValueArray[i]).toFixed(6);
        }else{
            value = (textValueArray[i]);
        }
        // Input
        var input = document.createElement("input");
        input.name = "edit_"+labelArray[i].toString();
        input.value = value;
        input.setAttribute("id", "edit_"+labelArray[i].toString());
        input.setAttribute("class", "fieldInput");
        myform.appendChild(input);

        // Line break
        var linebreak = document.createElement('br');
        myform.appendChild(linebreak);

        // Line break
        var linebreak = document.createElement('br');
        myform.appendChild(linebreak);

    }
    // Line break
    var linebreak = document.createElement('br');
    myform.appendChild(linebreak);

    // Button - Cancel
    var cancel_btn = document.createElement("button");
    cancel_btn.style.cssFloat = "right";
    cancel_btn.innerHTML = 'Cancel';
    cancel_btn.type = "button";
    cancel_btn.name = "Cancel";
    myform.appendChild(cancel_btn);

    // Button - OK
    var ok_btn = document.createElement("button");
    ok_btn.style.cssFloat = "right";
    ok_btn.style.marginRight = "20px";
    ok_btn.innerHTML = 'OK';
    ok_btn.type = "button";
    ok_btn.name = "OK";

    myform.appendChild(ok_btn);
    content.appendChild(myform);
    var height = 200;
    var wind = showModalWindow(graph, 'Scilab Multiple Values Request', content, 300, height);

    // Executes when button 'cancel_btn' is clicked
    cancel_btn.onclick = function() {
        document.getElementById("messageLabel").innerHTML = "";
        wind.destroy();
    };
    // Executes when button 'ok_btn' is clicked
    ok_btn.onclick = function() {
        var x_min = parseFloat(document.getElementById("edit_xmin").value);
        var x_max = parseFloat(document.getElementById("edit_xmax").value);
        var y_min = parseFloat(document.getElementById("edit_ymin").value);
        var y_max = parseFloat(document.getElementById("edit_ymax").value);
        if(x_min < 0){
            document.getElementById("messageLabel").innerHTML = "X should be positive";
        }else{
            document.getElementById("messageLabel").innerHTML = "";
        }
        sigbuilder_Graph.xAxis[0].update({
                max: parseFloat(x_max)
            });
        sigbuilder_Graph.yAxis[0].update({
                max: parseFloat(y_max)
            });
        sigbuilder_Graph.yAxis[0].update({
                min: parseFloat(y_min)
            });
        wind.destroy();
    };
}

function loadPointsFromDatFile(graph,sigbuilder_Graph,fileSelector){

    // Create basic structure for the form
    var content = document.createElement('div');
    content.setAttribute("id", "loadFromDatFile");

    // Add Form
    var myform = document.createElement("form");
    myform.method = "post";
    myform.id = "formLoadFromDatFile";
    myform.style.padding = "10px";

    var titlelabel = document.createElement('span');
    titlelabel.innerHTML = "Text data file";
    myform.appendChild(titlelabel);
    // Line break
    var linebreak = document.createElement('br');
    myform.appendChild(linebreak);
    // Line break
    var linebreak = document.createElement('br');
    myform.appendChild(linebreak);

    // Line break
    var linebreak = document.createElement('br');
    myform.appendChild(linebreak);

    var labelArray = ['Filename','Reading [C] format','Abscissa column','Output column'];
    var textValueArray = ["mydatafile.dat","%g %g","1","2"];
    for(var i = 0; i < labelArray.length; i++){
        // Input Title
        var namelabel = document.createElement('label');
        namelabel.innerHTML = labelArray[i];
        namelabel.style.marginLeft = "30px";
        myform.appendChild(namelabel);

        // Input
        var input = document.createElement("input");
        input.name = "edit_"+labelArray[i].toString();
        input.placeholder = textValueArray[i];
        input.setAttribute("id", "fileupload_"+i.toString());
        input.setAttribute("class", "fieldInput");
        myform.appendChild(input);

        // Line break
        var linebreak = document.createElement('br');
        myform.appendChild(linebreak);

        // Line break
        var linebreak = document.createElement('br');
        myform.appendChild(linebreak);

    }
    // Line break
    var linebreak = document.createElement('br');
    myform.appendChild(linebreak);

    // Button - Cancel
    var cancel_btn = document.createElement("button");
    cancel_btn.style.cssFloat = "right";
    cancel_btn.innerHTML = 'Cancel';
    cancel_btn.type = "button";
    cancel_btn.name = "Cancel";
    myform.appendChild(cancel_btn);

    // Button - OK
    var ok_btn = document.createElement("button");
    ok_btn.style.cssFloat = "right";
    ok_btn.style.marginRight = "20px";
    ok_btn.innerHTML = 'OK';
    ok_btn.type = "button";
    ok_btn.name = "OK";

    myform.appendChild(ok_btn);
    content.appendChild(myform);
    var height = 220;
    var wind = showModalWindow(graph, 'Scilab Multiple Values Request', content, 300, height);

    var filename_input = document.getElementById("fileupload_0");
    filename_input.readOnly = true;
    filename_input.onfocus = function(){
        if ("FileReader" in window) {
            fileSelector.click();
        } else {
            alert("Your browser does not support the HTML5 FileReader.");
        }
    }
    // Executes when button 'cancel_btn' is clicked
    cancel_btn.onclick = function() {
        wind.destroy();
    };
    // Executes when button 'ok_btn' is clicked
    ok_btn.onclick = function() {
        wind.destroy();
    };

}

function saveToTextFile(graph,sigbuilder_Graph,fileSelector,graphParameters){

    // Create basic structure for the form
    var content = document.createElement('div');
    content.setAttribute("id", "saveToDatFile");

    // Add Form
    var myform = document.createElement("form");
    myform.method = "post";
    myform.id = "formSaveToDatFile";
    myform.style.padding = "10px";

    var titlelabel = document.createElement('span');
    titlelabel.innerHTML = "Text data file";
    myform.appendChild(titlelabel);
    // Line break
    var linebreak = document.createElement('br');
    myform.appendChild(linebreak);
    // Line break
    var linebreak = document.createElement('br');
    myform.appendChild(linebreak);

    // Line break
    var linebreak = document.createElement('br');
    myform.appendChild(linebreak);

    var labelArray = ['Filename','Writing [C] format'];
    var textValueArray = ["mydatafile.dat","%g %g"];
    for(var i = 0; i < labelArray.length; i++){
        // Input Title
        var namelabel = document.createElement('label');
        namelabel.innerHTML = labelArray[i];
        namelabel.style.marginLeft = "30px";
        myform.appendChild(namelabel);

        // Input
        var input = document.createElement("input");
        input.name = "edit_"+labelArray[i].toString();
        input.value = textValueArray[i];
        input.setAttribute("id", "filesave_"+i.toString());
        input.setAttribute("class", "fieldInput");
        myform.appendChild(input);

        // Line break
        var linebreak = document.createElement('br');
        myform.appendChild(linebreak);

        // Line break
        var linebreak = document.createElement('br');
        myform.appendChild(linebreak);

    }
    // Line break
    var linebreak = document.createElement('br');
    myform.appendChild(linebreak);

    // Button - Cancel
    var cancel_btn = document.createElement("button");
    cancel_btn.style.cssFloat = "right";
    cancel_btn.innerHTML = 'Cancel';
    cancel_btn.type = "button";
    cancel_btn.name = "Cancel";
    myform.appendChild(cancel_btn);

    // Button - OK
    var ok_btn = document.createElement("button");
    ok_btn.style.cssFloat = "right";
    ok_btn.style.marginRight = "20px";
    ok_btn.innerHTML = 'OK';
    ok_btn.type = "button";
    ok_btn.name = "OK";

    myform.appendChild(ok_btn);
    content.appendChild(myform);
    var height = 180;
    var wind = showModalWindow(graph, 'Scilab Multiple Values Request', content, 300, height);

    // Executes when button 'cancel_btn' is clicked
    cancel_btn.onclick = function() {
        document.getElementById("messageLabel").innerHTML = "";
        wind.destroy();
    };
    // Executes when button 'ok_btn' is clicked
    ok_btn.onclick = function() {

        graphParameters.graphPoints= objToArrayList(graphParameters.graphPoints);
        var format = (document.getElementById("filesave_1").value).trim();
        var format_array = (format.replace(/\s\s+/g," ")).split(" ");
        var length_format = ((format.replace(/\s\s+/g," ")).split(" ")).length;
        if((length_format == 2)&&(["%g","%f"].includes(format_array[0]))&&(["%g","%f"].includes(format_array[1]))){
            if ("Blob" in window) {
                var fileName = document.getElementById("filesave_0").value;
                var textToWrite = "";
                var x = 0;
                var y = 0;
                for (var i=0;i<graphParameters.graphPoints.length;i++) {
                    x = parseFloat(graphParameters.graphPoints[i][0]);
                    y = parseFloat(graphParameters.graphPoints[i][1]);
                   /* if(format_array[0] == "%g"){
                        x = parseFloat(graphParameters.graphPoints[i][0]);
                    }else if(format_array[0] == "%f"){
                        x = parseFloat(graphParameters.graphPoints[i][0]).toFixed(6);;
                    }else if(format_array[1] == "%g"){
                        y = parseFloat(graphParameters.graphPoints[i][1]);
                    }else if(format_array[1] == "%f"){
                        y = parseFloat(graphParameters.graphPoints[i][1]).toFixed(6);;
                    }*/
                    textToWrite = textToWrite + x + " " + y + "\r\n";
                }
                var textFileAsBlob = new Blob([textToWrite], { type: "text/plain" });
                if ("msSaveOrOpenBlob" in navigator) {
                    navigator.msSaveOrOpenBlob(textFileAsBlob, fileName);
                }else{
                    var downloadLink = document.createElement("a");
                    downloadLink.download = fileName;
                    downloadLink.innerHTML = "Download File";
                    if ("webkitURL" in window) {
                        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
                    }else{
                        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
                        downloadLink.style.display = "none";
                        document.body.appendChild(downloadLink);
                    }
                    downloadLink.click();
                }
                document.getElementById("messageLabel").innerHTML = "";
            }else{
                alert("Your browser does not support the HTML5 Blob.");
            }
        }else{
            document.getElementById("messageLabel").innerHTML = "Bad format in writing data file";
        }
        wind.destroy();
    };

    function destroyClickedElement(event) {
        document.body.removeChild(event.target);
    }
}

function loadFromExcel(graph,sigbuilder_Graph,fileSelector){

    // Create basic structure for the form
    var content = document.createElement('div');
    content.setAttribute("id", "loadFromExcel");

    // Add Form
    var myform = document.createElement("form");
    myform.method = "post";
    myform.id = "formloadFromExcel";
    myform.style.padding = "10px";

    var titlelabel = document.createElement('span');
    titlelabel.innerHTML = "Excel data file";
    myform.appendChild(titlelabel);
    // Line break
    var linebreak = document.createElement('br');
    myform.appendChild(linebreak);
    // Line break
    var linebreak = document.createElement('br');
    myform.appendChild(linebreak);

    // Line break
    var linebreak = document.createElement('br');
    myform.appendChild(linebreak);

    var labelArray = ['Filename','Sheet #','X[start:stop]','Y[start:stop]'];
    var textValueArray = ["Classeur1.xls","1","C5:C25","D5:D25"];
    for(var i = 0; i < labelArray.length; i++){
        // Input Title
        var namelabel = document.createElement('label');
        namelabel.innerHTML = labelArray[i];
        namelabel.style.marginLeft = "30px";
        myform.appendChild(namelabel);

        // Input
        var input = document.createElement("input");
        input.name = "edit_"+labelArray[i].toString();
        input.placeholder = textValueArray[i];
        input.setAttribute("id", "filesave_"+i.toString());
        input.setAttribute("class", "fieldInput");
        myform.appendChild(input);

        // Line break
        var linebreak = document.createElement('br');
        myform.appendChild(linebreak);

        // Line break
        var linebreak = document.createElement('br');
        myform.appendChild(linebreak);

    }
    // Line break
    var linebreak = document.createElement('br');
    myform.appendChild(linebreak);

    // Button - Cancel
    var cancel_btn = document.createElement("button");
    cancel_btn.style.cssFloat = "right";
    cancel_btn.innerHTML = 'Cancel';
    cancel_btn.type = "button";
    cancel_btn.name = "Cancel";
    myform.appendChild(cancel_btn);

    // Button - OK
    var ok_btn = document.createElement("button");
    ok_btn.style.cssFloat = "right";
    ok_btn.style.marginRight = "20px";
    ok_btn.innerHTML = 'OK';
    ok_btn.type = "button";
    ok_btn.name = "OK";

    myform.appendChild(ok_btn);
    content.appendChild(myform);
    var height = 220;
    var wind = showModalWindow(graph, 'Scilab Multiple Values Request', content, 300, height);

    // Executes when button 'cancel_btn' is clicked
    cancel_btn.onclick = function() {
        wind.destroy();
    };
    // Executes when button 'ok_btn' is clicked
    ok_btn.onclick = function() {
        wind.destroy();
    };


}


function editPointsValue(graphObject,graph,sigbuilder_Graph,graphParameters, pointsHistory, method){

    // Create basic structure for the form
    var content = document.createElement('div');
    content.setAttribute("id", "editCoordinates");

    // Add Form
    var myform = document.createElement("form");
    myform.method = "post";
    myform.id = "formEditCoordinate";
    myform.style.padding = "10px";

    var titlelabel = document.createElement('span');
    titlelabel.innerHTML = "Enter new x and y";
    myform.appendChild(titlelabel);
    // Line break
    var linebreak = document.createElement('br');
    myform.appendChild(linebreak);
    // Line break
    var linebreak = document.createElement('br');
    myform.appendChild(linebreak);

    var keys = Object.keys(graphObject.point.options);
    var len = keys.length;
    for(var i = 0; i < len; i++){
        // Input Title
        var namelabel = document.createElement('label');
        namelabel.innerHTML = keys[i].toString();
        namelabel.style.marginLeft = "30px";
        myform.appendChild(namelabel);

        var value = 0;
        if(((graphObject.point.options[keys[i]]).toString()).includes(".")){
            value = (graphObject.point.options[keys[i]]).toFixed(6);
        }else{
            value = (graphObject.point.options[keys[i]]);
        }
        // Input
        var input = document.createElement("input");
        input.name = "edit_"+keys[i].toString();
        input.value = value;
        input.setAttribute("id", "edit_"+keys[i].toString());
        input.setAttribute("class", "fieldInput");
        myform.appendChild(input);

        // Line break
        var linebreak = document.createElement('br');
        myform.appendChild(linebreak);

        // Line break
        var linebreak = document.createElement('br');
        myform.appendChild(linebreak);

    }
    // Line break
    var linebreak = document.createElement('br');
    myform.appendChild(linebreak);

    // Button - Cancel
    var cancel_btn = document.createElement("button");
    cancel_btn.style.cssFloat = "right";
    cancel_btn.innerHTML = 'Cancel';
    cancel_btn.type = "button";
    cancel_btn.name = "Cancel";
    myform.appendChild(cancel_btn);

    // Button - OK
    var ok_btn = document.createElement("button");
    ok_btn.style.cssFloat = "right";
    ok_btn.style.marginRight = "20px";
    ok_btn.innerHTML = 'OK';
    ok_btn.type = "button";
    ok_btn.name = "OK";

    myform.appendChild(ok_btn);
    content.appendChild(myform);
    var height = 150;
    var wind = showModalWindow(graph, 'Scilab Multiple Values Request', content, 200, height);

    // Executes when button 'cancel_btn' is clicked
    cancel_btn.onclick = function() {
        wind.destroy();
    };
    // Executes when button 'ok_btn' is clicked
    ok_btn.onclick = function() {
        var x_value = parseFloat(document.getElementById("edit_x").value);
        var y_value = parseFloat(document.getElementById("edit_y").value);
        removePointsFromChart(graphObject,sigbuilder_Graph,graphParameters, pointsHistory,method);
        addPointsOnChart(sigbuilder_Graph,graphParameters, pointsHistory,x_value,y_value,method);
        wind.destroy();
    };
}

function removePointsFromChart(graphObject, sigbuilder_Graph, graphParameters, pointsHistory, method){
    var counter = graphObject.point.index;
    sigbuilder_Graph.series[0].data[counter].remove();
    pointsHistory.push(graphParameters.graphPoints.slice());
    var pointscount = sigbuilder_Graph.series[0].data.length;
    xmaxtitle = (sigbuilder_Graph.xAxis[0].getExtremes().dataMax).toFixed(6);
    sigbuilder_Graph.setTitle(null, { text: updateSubtitleForSigbuilderGraph(pointscount, method, xmaxtitle)});
}

function addPointsOnChart(sigbuilder_Graph, graphParameters, pointsHistory, x_value, y_value, method){
    sigbuilder_Graph.series[0].addPoint([x_value, y_value]);
    pointsHistory.push(graphParameters.graphPoints.slice());
    var pointscount = sigbuilder_Graph.series[0].data.length;
    xmaxtitle = (sigbuilder_Graph.xAxis[0].getExtremes().dataMax).toFixed(6);
    sigbuilder_Graph.setTitle(null, { text: updateSubtitleForSigbuilderGraph(pointscount, method, xmaxtitle)});
}