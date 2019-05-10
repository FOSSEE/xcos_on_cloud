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
    var wind = showModalWindow(graph, 'Graphic Window', content, 550, 450);
    drag_sig_chart = create_draggable_points_chart_sigbuilder(graphParameters.graphPoints, pointsHistory, graphParameters.xmin, graphParameters.xmax, graphParameters.ymin, graphParameters.ymax, graphParameters.chartType, graphParameters.points, graphParameters.mtd, graphParameters.xmaxTitle,graphParameters.xpointInterval,graphParameters.step,graphParameters.stepname,graphParameters.diffxx,
graphParameters.diffyy);
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

        //Called function for autoscaling axis according to new points
        autoscaleFunctionalityForGraph(drag_sig_chart,graphParameters);

        //Saving points and sending it to set method of JS
        var propertiesObject = {
                    id: cell.id
                };
        var x_arr = "[";
        var y_arr = "[";
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
        if(Math.abs(max_x - max_x_value_new) < parseFloat(graphParameters.diffxx/2) ){
            max_x = parseFloat(parseFloat(max_x) + parseFloat(graphParameters.diffxx)).toFixed(1);
            drag_sig_chart.xAxis[0].update({
                max: parseFloat(max_x)
            });
        }
        if(Math.abs(max_y - max_y_value_new) < parseFloat(graphParameters.diffyy/2) ){
            max_y = parseFloat(parseFloat(max_y) + parseFloat(graphParameters.diffyy)).toFixed(1);
            drag_sig_chart.yAxis[0].update({
                max: parseFloat(max_y)
            });
        }
        //Added for negative/minimum value autoscale functionality for y axis
        var min_y_value_new = (drag_sig_chart.yAxis[0].getExtremes().dataMin).toFixed(1);
        var min_y = drag_sig_chart.yAxis[0].getExtremes().min;
        if(Math.abs(min_y - min_y_value_new) < parseFloat(graphParameters.diffyy/2) ){
            min_y = parseFloat(parseFloat(min_y) - parseFloat(graphParameters.diffyy));
            drag_sig_chart.yAxis[0].update({
                min: min_y
            });
        }
}

function editPointsValue(graphObject,graph,sigbuilder_Graph,graphPoints, pointsHistory, method){

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
        removePointsFromChart(graphObject,sigbuilder_Graph,graphPoints, pointsHistory,method);
        addPointsOnChart(sigbuilder_Graph,graphPoints, pointsHistory,x_value,y_value,method);
        wind.destroy();
    };
}

function removePointsFromChart(graphObject, sigbuilder_Graph, graphPoints, pointsHistory, method){
    var counter = graphObject.point.index;
    if (counter > -1) {
        graphPoints.splice(counter, 1);
    }
    sigbuilder_Graph.series[0].data[counter].remove();
    pointsHistory.push(graphPoints.slice());
    var pointscount = sigbuilder_Graph.series[0].data.length;
    xmaxtitle = (sigbuilder_Graph.xAxis[0].getExtremes().dataMax).toFixed(6);
    sigbuilder_Graph.setTitle(null, { text: updateSubtitleForSigbuilderGraph(pointscount, method, xmaxtitle)});
}

function addPointsOnChart(sigbuilder_Graph, graphPoints, pointsHistory, x_value, y_value, method){
    sigbuilder_Graph.series[0].addPoint([x_value, y_value]);
    pointsHistory.push(graphPoints.slice());
    var pointscount = sigbuilder_Graph.series[0].data.length;
    xmaxtitle = (sigbuilder_Graph.xAxis[0].getExtremes().dataMax).toFixed(6);
    sigbuilder_Graph.setTitle(null, { text: updateSubtitleForSigbuilderGraph(pointscount, method, xmaxtitle)});
}
