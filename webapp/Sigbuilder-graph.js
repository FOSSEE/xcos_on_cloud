var check_call = 1;
var wind = "";
var sigbuilder_Graph = "";
function showGraphWindowSigBlk(graph,graphParameters,cell) {
    // to store all the states of graph points
    var pointsHistory = [];
    // to contain menubar and graphic
    var content = document.createElement('div');
    content.setAttribute('id','graphcontentwind');
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
    var edit = document.createElement('span');
    edit.innerHTML= 'Edit';
    edit.setAttribute('class','menu');
    edit.setAttribute('id','edit_menu');
    menuBar.appendChild(edit);
    //menu ?
    var question = document.createElement('span');
    question.innerHTML= '?';
    question.setAttribute('class','menu');
    question.setAttribute('id','question_menu');
    menuBar.appendChild(question);
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
    var editOptions = ['Select as current figure','Clear figure','Figure properties','Axes properties','Start entity picker',
    'Stop entity picker','Start datatip manager','Stop datatip manager','Start curve data modification','Stop curve data modification'];
    var editMenuOptions=[];
    var editSubMenu = document.createElement('div');
    for (var i = 0; i < editOptions.length; i++) {
        editMenuOptions[i] = document.createElement('li');
        editMenuOptions[i].innerHTML = editOptions[i];
        editMenuOptions[i].setAttribute('class','optionsDropdown');
        editSubMenu.appendChild(editMenuOptions[i]);
    };
    editSubMenu.setAttribute('class','menuDropdown displayNone');
    edit.appendChild(editSubMenu);
    //Submenu for menu question
    var questionOptions = ['Scilab Help','About Scilab'];
    var questionMenuOptions=[];
    var questionSubMenu = document.createElement('div');
    for (var i = 0; i < questionOptions.length; i++) {
        questionMenuOptions[i] = document.createElement('li');
        questionMenuOptions[i].innerHTML = questionOptions[i];
        questionMenuOptions[i].setAttribute('class','optionsDropdown');
        questionSubMenu.appendChild(questionMenuOptions[i]);
    };
    questionSubMenu.setAttribute('class','menuDropdown displayNone');
    question.appendChild(questionSubMenu);
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
    content.appendChild(chart);
    var messageLabel = document.createElement('span');
    messageLabel.innerHTML = "";
    messageLabel.setAttribute('id','messageLabel');
    content.appendChild(messageLabel);
    var graphic_window = showModalWindow(graph, 'Graphic Window', content, 550, 480);
    sigbuilder_Graph = create_draggable_points_chart_sigbuilder(graphParameters, pointsHistory, graphParameters.xmin, graphParameters.xmax, graphParameters.ymin, graphParameters.ymax, graphParameters.chartType, graphParameters.points, graphParameters.mtd, graphParameters.xmaxTitle,graphParameters.step,graphParameters.stepname);
    autoscaleFunctionalityForGraph(sigbuilder_Graph, graphParameters, pointsHistory);
    get_parameters_wind_sigbuilder.hide();
    graphic_window.addListener(mxEvent.DESTROY, function(evt) {
        if(wind != ""){
            wind.destroy();
        }
        get_parameters_wind_sigbuilder.show();
    });
    //For displaying and hiding of submenus
    content.onclick = function() {
        fileSubMenu.style.display = 'none';
        toolsSubMenu.style.display = 'none';
        splineSubMenu.style.display = 'none';
        dataSubMenu.style.display = 'none';
        standardsSubMenu.style.display = 'none';
        exitSubMenu.style.display = 'none';
        editSubMenu.style.display = 'none';
        questionSubMenu.style.display = 'none';
    }
    filemenu.onclick = function(event) {
        event.stopPropagation();
        if (fileSubMenu.style.display == 'none') {
            toolsSubMenu.style.display = 'none';
            splineSubMenu.style.display = 'none';
            dataSubMenu.style.display = 'none';
            standardsSubMenu.style.display = 'none';
            exitSubMenu.style.display = 'none';
            editSubMenu.style.display = 'none';
            questionSubMenu.style.display = 'none';
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
            editSubMenu.style.display = 'none';
            questionSubMenu.style.display = 'none';
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
            editSubMenu.style.display = 'none';
            toolsSubMenu.style.display = 'none';
            questionSubMenu.style.display = 'none';
            splineSubMenu.style.display = 'block';
        }else{
            splineSubMenu.style.display = 'none';
        }
    };
    edit.onclick = function(event) {
        event.stopPropagation();
        if (editSubMenu.style.display == 'none') {
            standardsSubMenu.style.display = 'none';
            exitSubMenu.style.display = 'none';
            fileSubMenu.style.display = 'none';
            toolsSubMenu.style.display = 'none';
            splineSubMenu.style.display = 'none';
            dataSubMenu.style.display = 'none';
            questionSubMenu.style.display = 'none';
            editSubMenu.style.display = 'block';
        }else{
            editSubMenu.style.display = 'none';
        }
    };
    question.onclick = function(event) {
        event.stopPropagation();
        if (questionSubMenu.style.display == 'none') {
            standardsSubMenu.style.display = 'none';
            exitSubMenu.style.display = 'none';
            fileSubMenu.style.display = 'none';
            toolsSubMenu.style.display = 'none';
            splineSubMenu.style.display = 'none';
            dataSubMenu.style.display = 'none';
            editSubMenu.style.display = 'none';
            questionSubMenu.style.display = 'block';
        }else{
            questionSubMenu.style.display = 'none';
        }
    };
    data.onclick = function(event) {
        event.stopPropagation();
        if (dataSubMenu.style.display == 'none') {
            standardsSubMenu.style.display = 'none';
            exitSubMenu.style.display = 'none';
            fileSubMenu.style.display = 'none';
            toolsSubMenu.style.display = 'none';
            editSubMenu.style.display = 'none';
            splineSubMenu.style.display = 'none';
            questionSubMenu.style.display = 'none';
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
            editSubMenu.style.display = 'none';
            questionSubMenu.style.display = 'none';
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
            editSubMenu.style.display = 'none';
            questionSubMenu.style.display = 'none';
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
        autoscaleFunctionalityForGraph(sigbuilder_Graph, graphParameters, pointsHistory);
    };
    // menu Spline -> submenus 'zero order','linear','order 2','not_a_knot','periodic','monotone','fast','clamped'
    splineMenuOptions[0].onclick = function() {
        // zero order
        graphParameters.mtd = 0;
        graphParameters.points = sigbuilder_Graph.series[0].points.length;
        graphParameters.xmaxTitle = sigbuilder_Graph.xAxis[0].getExtremes().dataMax.toFixed(6);
        graphParameters.chartType = "line";
        graphParameters.step = "left";
        graphParameters.stepname = "Left";
        sigbuilder_Graph.setTitle(null, {
            text: updateSubtitleForSigbuilderGraph(graphParameters.points, graphParameters.mtd, graphParameters.xmaxTitle, graphParameters.PeriodicOption)
            });
        sigbuilder_Graph.series[0].update({
                type: "line",
                step: 'left',
                name: 'Left'
        });
    };
    splineMenuOptions[1].onclick = function() {
        // linear
        graphParameters.mtd = 1;
        graphParameters.points = sigbuilder_Graph.series[0].points.length;
        graphParameters.xmaxTitle = sigbuilder_Graph.xAxis[0].getExtremes().dataMax.toFixed(6);
        graphParameters.chartType = "line";
        graphParameters.step = "";
        graphParameters.stepname = "";
        sigbuilder_Graph.setTitle(null, {
            text: updateSubtitleForSigbuilderGraph(graphParameters.points, graphParameters.mtd, graphParameters.xmaxTitle, graphParameters.PeriodicOption)
            });
        sigbuilder_Graph.series[0].update({
                type: "line",
                step: '',
                name: ''
        });
    };
    splineMenuOptions[2].onclick = function() {
        // order 2
        graphParameters.mtd = 2;
        graphParameters.points = sigbuilder_Graph.series[0].points.length;
        graphParameters.xmaxTitle = sigbuilder_Graph.xAxis[0].getExtremes().dataMax.toFixed(6);
        graphParameters.chartType = "spline";
        graphParameters.step = "";
        graphParameters.stepname = "";
        sigbuilder_Graph.setTitle(null, {
            text: updateSubtitleForSigbuilderGraph(graphParameters.points, graphParameters.mtd, graphParameters.xmaxTitle, graphParameters.PeriodicOption)
        });
        sigbuilder_Graph.series[0].update({
            type: "spline"
        });
    };
    splineMenuOptions[3].onclick = function() {
        // not_a_knot
        graphParameters.mtd = 3;
        graphParameters.points = sigbuilder_Graph.series[0].points.length;
        graphParameters.xmaxTitle = sigbuilder_Graph.xAxis[0].getExtremes().dataMax.toFixed(6);
        graphParameters.chartType = "spline";
        graphParameters.step = "";
        graphParameters.stepname = "";
        sigbuilder_Graph.setTitle(null, {
            text: updateSubtitleForSigbuilderGraph(graphParameters.points, graphParameters.mtd, graphParameters.xmaxTitle, graphParameters.PeriodicOption)
            });
        sigbuilder_Graph.series[0].update({
                type: "spline"
        });
    };
    splineMenuOptions[4].onclick = function() {
        // periodic
        graphParameters.mtd = 4;
        graphParameters.points = sigbuilder_Graph.series[0].points.length;
        graphParameters.xmaxTitle = sigbuilder_Graph.xAxis[0].getExtremes().dataMax.toFixed(6);
        graphParameters.chartType = "spline";
        graphParameters.step = "";
        graphParameters.stepname = "";
        sigbuilder_Graph.setTitle(null, {
            text: updateSubtitleForSigbuilderGraph(graphParameters.points, graphParameters.mtd, graphParameters.xmaxTitle, graphParameters.PeriodicOption)
            });
        sigbuilder_Graph.series[0].update({
                type: "spline"
        });
    };
    splineMenuOptions[5].onclick = function() {
        // monotone
        graphParameters.mtd = 5;
        graphParameters.points = sigbuilder_Graph.series[0].points.length;
        graphParameters.xmaxTitle = sigbuilder_Graph.xAxis[0].getExtremes().dataMax.toFixed(6);
        graphParameters.chartType = "spline";
        graphParameters.step = "";
        graphParameters.stepname = "";
        sigbuilder_Graph.setTitle(null, {
            text: updateSubtitleForSigbuilderGraph(graphParameters.points, graphParameters.mtd, graphParameters.xmaxTitle, graphParameters.PeriodicOption)
            });
        sigbuilder_Graph.series[0].update({
                type: "spline"
        });
    };
    splineMenuOptions[6].onclick = function() {
        // fast
        graphParameters.mtd = 6;
        graphParameters.points = sigbuilder_Graph.series[0].points.length;
        graphParameters.xmaxTitle = sigbuilder_Graph.xAxis[0].getExtremes().dataMax.toFixed(6);
        graphParameters.chartType = "spline";
        graphParameters.step = "";
        graphParameters.stepname = "";
        sigbuilder_Graph.setTitle(null, {
            text: updateSubtitleForSigbuilderGraph(graphParameters.points, graphParameters.mtd, graphParameters.xmaxTitle, graphParameters.PeriodicOption)
            });
        sigbuilder_Graph.series[0].update({
                type: "spline"
        });
    };
    splineMenuOptions[7].onclick = function() {
        //clamped
        graphParameters.mtd = 7;
        graphParameters.points = sigbuilder_Graph.series[0].points.length;
        graphParameters.xmaxTitle = sigbuilder_Graph.xAxis[0].getExtremes().dataMax.toFixed(6);
        graphParameters.chartType = "spline";
        graphParameters.step = "";
        graphParameters.stepname = "";
        sigbuilder_Graph.setTitle(null, {
            text: updateSubtitleForSigbuilderGraph(graphParameters.points, graphParameters.mtd, graphParameters.xmaxTitle, graphParameters.PeriodicOption)
            });
        sigbuilder_Graph.series[0].update({
                type: "spline"
        });
    };
    //menu Data - > Clear
    dataMenuOptions[0].onclick = function() {
        clearPoints(sigbuilder_Graph, graphParameters, pointsHistory);
    };
    //menu Data - > Data Bounds
    dataMenuOptions[1].onclick = function() {
        editandUpdateDataBoundsValue(graph_sigbuilder,sigbuilder_Graph);
    };
    //menu Data - > Load from text file
    dataMenuOptions[2].onclick = function() {
        loadPointsFromDatFile(graph_sigbuilder,sigbuilder_Graph, graphParameters, pointsHistory);
    };
    //menu Data - > Save to text file
    dataMenuOptions[3].onclick = function() {
        saveToTextFile(graph_sigbuilder,sigbuilder_Graph,graphParameters);
    };
    //menu Data - > Load from Excel
    dataMenuOptions[4].onclick = function() {
        loadFromExcel(graph_sigbuilder, sigbuilder_Graph, graphParameters, pointsHistory);
    };
    //menu Data - > Periodic signal
    dataMenuOptions[5].onclick = function() {
        openPeriodicSignal(graph_sigbuilder, graphParameters, sigbuilder_Graph);
    };
    //menu Standards - > sine
    standardsMenuOptions[0].onclick = function() {
        open_sine_wind(graph_sigbuilder);
    };
    //menu Standards - > sawtooth1
    standardsMenuOptions[1].onclick = function() {
        open_sawtooth1_wind(graph_sigbuilder);
    };
    //menu Standards - > sawtooth2
    standardsMenuOptions[2].onclick = function() {
        open_sawtooth2_wind(graph_sigbuilder);
    };
    //menu Standards - > pulse
    standardsMenuOptions[3].onclick = function() {
        open_pulse_wind(graph_sigbuilder);
    };
    //menu Standards - > random normal
    standardsMenuOptions[4].onclick = function() {
        open_random_normal_wind(graph_sigbuilder);
    };
    //menu Standards - > random uniform
    standardsMenuOptions[5].onclick = function() {
        open_random_uniform_wind(graph_sigbuilder);
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
        graphic_window.destroy();
        get_parameters_wind_sigbuilder.show();
    };
    // menu Exit -> submenu Save/Exit
    exitMenuOptions[2].onclick = function() {

        var x_arr = "";
        var y_arr = "";
        if(graphParameters.graphPoints!=[] && graphParameters.graphPoints.length!=0){

        //Saving points and sending it to set method of JS
        x_arr = "[";
        y_arr = "[";
        graphParameters.graphPoints = objToArrayList(graphParameters.graphPoints);
        for (var i = 0; i < graphParameters.graphPoints.length; i++){
            var x = graphParameters.graphPoints[i][0];
            var y = graphParameters.graphPoints[i][1];
            if (x.toString().includes(".")){
                var x_check = x.toString().split(".");
                if(x_check[1].length > 7){
                    x = x.toFixed(7);
                }
            }
            if (y.toString().includes(".")) {
                var y_check = y.toString().split(".");
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
        propertiesObject["Method"] = graphParameters.mtd.toString();
        propertiesObject["PeriodicOption"] = graphParameters.PeriodicOption.toString();
        propertiesObject["graf"] = "y";
        graphic_window.destroy();
        get_parameters_wind_sigbuilder.show();
        check_call = 2;
        cell.blockInstance.instance.set(propertiesObject);
    };
    check_call = 1;
}

function autoscaleFunctionalityForGraph(sigbuilder_Graph, graphParameters, pointsHistory){
    //Added for postive/maximum value autoscale functionality
        var max_x_value_new = sigbuilder_Graph.xAxis[0].getExtremes().dataMax; //get max x point's value
        var min_x_value_new = sigbuilder_Graph.xAxis[0].getExtremes().dataMin; //get min x point's value
        var max_y_value_new = sigbuilder_Graph.yAxis[0].getExtremes().dataMax; //get max y point's value
        var min_y_value_new = sigbuilder_Graph.yAxis[0].getExtremes().dataMin; //get min y point's value
        var diff_x = ((Math.abs(max_x_value_new - min_x_value_new))/100)*10;
        var diff_y = ((Math.abs(max_y_value_new - min_y_value_new))/100)*10;
        graphParameters.xmin = min_x_value_new; //set min x axis value
        graphParameters.xmax = max_x_value_new + diff_x; //set max x axis value
        graphParameters.ymin = min_y_value_new - diff_y; //set min y axis value
        graphParameters.ymax = max_y_value_new + diff_y; //set max y axis value
        sigbuilder_Graph = create_draggable_points_chart_sigbuilder(graphParameters, pointsHistory, graphParameters.xmin, graphParameters.xmax, graphParameters.ymin, graphParameters.ymax, graphParameters.chartType, graphParameters.points, graphParameters.mtd, graphParameters.xmaxTitle, graphParameters.step, graphParameters.stepname);
}

function clearPoints(sigbuilder_Graph, graphParameters, pointsHistory){
    sigbuilder_Graph.series[0].setData([]);
    sigbuilder_Graph.series[0].addPoint([0, 0]);
    graphParameters.graphPoints = [];
    graphParameters.mtd = 0;
    pointsHistory = [];
    graphParameters.points = sigbuilder_Graph.series[0].data.length;
    graphParameters.xmaxtitle = sigbuilder_Graph.xAxis[0].getExtremes().dataMax.toFixed(6);
    sigbuilder_Graph.setTitle(null, { text: updateSubtitleForSigbuilderGraph(graphParameters.points, graphParameters.mtd, graphParameters.xmaxTitle, graphParameters.PeriodicOption)});
}

function editandUpdateDataBoundsValue(graph,sigbuilder_Graph){
    //Making graph window inaccessible
    var graph_wind = document.getElementById("graphcontentwind");
    graph_wind.style.pointerEvents = "none";
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
        input.name = "edit_"+labelArray[i];
        input.value = value;
        input.setAttribute("id", "edit_"+labelArray[i]);
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
    wind = showModalWindow(graph, 'Scilab Multiple Values Request', content, 300, height);

    // Executes when button 'cancel_btn' is clicked
    cancel_btn.onclick = function() {
        graph_wind.style.pointerEvents = "auto";
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
                max: x_max
            });
        sigbuilder_Graph.yAxis[0].update({
                max: y_max
            });
        sigbuilder_Graph.yAxis[0].update({
                min: y_min
            });
        graph_wind.style.pointerEvents = "auto";
        wind.destroy();
    };
}

function loadPointsFromDatFile(graph,sigbuilder_Graph, graphParameters, pointsHistory){

    //Making graph window inaccessible
    var graph_wind = document.getElementById("graphcontentwind");
    graph_wind.style.pointerEvents = "none";
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

    var fileSelector = document.createElement("input");
    fileSelector.setAttribute("type","file");
    fileSelector.style.display = 'none';
    fileSelector.setAttribute("accept",".txt, .dat");
    fileSelector.setAttribute("id","inputDatFile");
    myform.appendChild(fileSelector);

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
        input.name = "edit_"+labelArray[i];
        input.value = textValueArray[i];
        input.setAttribute("id", "fileupload_"+i);
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
    wind = showModalWindow(graph, 'Scilab Multiple Values Request', content, 300, height);
    var filename_input = document.getElementById("fileupload_0");
    filename_input.readOnly = true;
    filename_input.onclick = function(){
        fileSelector.click();
    };
    // Executes when button 'cancel_btn' is clicked
    cancel_btn.onclick = function() {
        document.getElementById("messageLabel").innerHTML = "";
        graph_wind.style.pointerEvents = "auto";
        wind.destroy();
    };
    // Executes when button 'ok_btn' is clicked
    ok_btn.onclick = function() {
        if( document.getElementById("inputDatFile").files.length != 0 ){
            sigbuilder_Graph.series[0].setData([]);
            var points_ary = [];
            var format = document.getElementById("fileupload_1").value.trim();
            var count = (format.match(/%/g) || []).length;
            if(count == 2){
                var x = document.getElementById("inputDatFile");
                var file = x.files[0];
                var reader = new FileReader();
                reader.onload = function(progressEvent){
                // By lines
                    var lines = this.result.split('\n');
                    for(var i = 0; i < lines.length; i++){
                        var line = lines[i];
                        if(line.length != 0){
                            points_ary[i] = scan(line.trim(),format);
                            if((points_ary[i][0]!=""||points_ary[i][0]!="undefined")&&
                            (points_ary[i][1]!=""||points_ary[i][1]!="undefined")){
                                sigbuilder_Graph.series[0].addPoint([points_ary[i][0],points_ary[i][1]]);
                            }
                        }
                    }
                    graphParameters.mtd = 1;
                    graphParameters.graphPoints = points_ary.slice();
                    pointsHistory.push(graphParameters.graphPoints.slice());
                    graphParameters.points = sigbuilder_Graph.series[0].data.length;
                    graphParameters.xmaxTitle = sigbuilder_Graph.xAxis[0].getExtremes().dataMax.toFixed(6);
                    sigbuilder_Graph.setTitle(null, { text: updateSubtitleForSigbuilderGraph(graphParameters.points, graphParameters.mtd, graphParameters.xmaxTitle, graphParameters.PeriodicOption)});
                    graphParameters.chartType = "line";
                    graphParameters.step = "";
                    graphParameters.stepname = "";
                    sigbuilder_Graph.series[0].update({
                    type: "line",
                    step: '',
                    name: ''
                    });
                    autoscaleFunctionalityForGraph(sigbuilder_Graph, graphParameters, pointsHistory);
                };
                reader.readAsText(file);
            }else{
                graph_wind.style.pointerEvents = "auto";
                wind.destroy();
                document.getElementById("messageLabel").innerHTML = "Bad Format";
                throw "incorrect";
            }
        }else{
            graph_wind.style.pointerEvents = "auto";
            wind.destroy();
            document.getElementById("messageLabel").innerHTML = "No File Selected, Please select a proper file";
            throw "incorrect";
        }
        graph_wind.style.pointerEvents = "auto";
        wind.destroy();
        document.getElementById("messageLabel").innerHTML = "";
    };

}

function saveToTextFile(graph,sigbuilder_Graph){

    //Making graph window inaccessible
    var graph_wind = document.getElementById("graphcontentwind");
    graph_wind.style.pointerEvents = "none";
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
        input.name = "edit_"+labelArray[i];
        input.value = textValueArray[i];
        input.setAttribute("id", "filesave_"+i);
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
    wind = showModalWindow(graph, 'Scilab Multiple Values Request', content, 300, height);

    // Executes when button 'cancel_btn' is clicked
    cancel_btn.onclick = function() {
        document.getElementById("messageLabel").innerHTML = "";
        graph_wind.style.pointerEvents = "auto";
        wind.destroy();
    };
    // Executes when button 'ok_btn' is clicked
    ok_btn.onclick = function() {
        var pointlength = sigbuilder_Graph.series[0].data.length;
        var format = document.getElementById("filesave_1").value.trim();
        var count = (format.match(/%/g) || []).length;
        if(count == 2){
            var firstchar = format.charAt((format.indexOf("%"))+1);
            var secondchar = format.charAt((format.lastIndexOf("%"))+1);
            var ary = ["%"+firstchar,"%"+secondchar];
            if((firstchar == 'g'||firstchar == 'f')&&(secondchar == 'g'||secondchar == 'f')){
            if ("Blob" in window) {
                var fileName = document.getElementById("filesave_0").value;
                var textToWrite = "";
                var x = 0;
                var y = 0;
                for (var i=0;i<pointlength;i++) {
                    if(ary[0] == "%g"){
                        var varx = sigbuilder_Graph.series[0].data[i].x;
                        if (varx.toString().includes(".")) {
                            x = parseFloat(varx).toFixed(6);
                        }else{
                            x = parseFloat(varx);
                        }
                    }else{
                        x = parseFloat(varx).toFixed(6);
                    }
                    if(ary[1] == "%g"){
                        var vary = sigbuilder_Graph.series[0].data[i].y;
                        if (vary.toString().includes(".")) {
                            y = parseFloat(vary).toFixed(6);
                        }else{
                            y = parseFloat(vary);
                        }
                    }else{
                        y = parseFloat(vary).toFixed(6);
                    }
                    var replace_1 = format.replace(ary[0],x);
                    var replace_2 = replace_1.replace(ary[1],y);
                    textToWrite = textToWrite +replace_2+"\r\n";
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
                graph_wind.style.pointerEvents = "auto";
                wind.destroy();
                document.getElementById("messageLabel").innerHTML = "Bad format in writing data file";
                throw "incorrect";
            }
        }else{
            graph_wind.style.pointerEvents = "auto";
            wind.destroy();
            document.getElementById("messageLabel").innerHTML = "Bad format in writing data file";
            throw "incorrect";
        }
        graph_wind.style.pointerEvents = "auto";
        wind.destroy();
        document.getElementById("messageLabel").innerHTML = "";
    };

    function destroyClickedElement(event) {
        document.body.removeChild(event.target);
    }
}

function convertLetterToNumber(str) {
  var out = 0;
  var len = str.length;
  for (var pos = 0; pos < len; pos++) {
    out += (str.charCodeAt(pos) - 64) * Math.pow(26, len - pos - 1);
  }
  return parseFloat(out);
}

function loadFromExcel(graph, sigbuilder_Graph, graphParameters, pointsHistory){

    //Making graph window inaccessible
    var graph_wind = document.getElementById("graphcontentwind");
    graph_wind.style.pointerEvents = "none";
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

    var fileSelector = document.createElement("input");
    fileSelector.setAttribute("type","file");
    fileSelector.style.display = 'none';
    fileSelector.setAttribute("accept",".xls, .xlsx");
    fileSelector.setAttribute("id","inputExcelFile");
    myform.appendChild(fileSelector);

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
        input.name = "edit_"+labelArray[i];
        input.value = textValueArray[i];
        input.setAttribute("id", "loadfromExcel_"+i);
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
    wind = showModalWindow(graph, 'Scilab Multiple Values Request', content, 300, height);

    var filename_input = document.getElementById("loadfromExcel_0");
    filename_input.readOnly = true;
    filename_input.onclick = function(){
        fileSelector.click();
    };
    // Executes when button 'cancel_btn' is clicked
    cancel_btn.onclick = function() {
        document.getElementById("messageLabel").innerHTML = "";
        graph_wind.style.pointerEvents = "auto";
        wind.destroy();
    };
    // Executes when button 'ok_btn' is clicked
    ok_btn.onclick = function() {
        if( document.getElementById("inputExcelFile").files.length != 0 ){
            sigbuilder_Graph.series[0].setData([]);
            var regex_for_column_name = /^[a-zA-Z]\d+$/;
            var x_range = document.getElementById("loadfromExcel_2").value.trim();
            var x_col = x_range.split(":");
            var y_range = document.getElementById("loadfromExcel_3").value.trim();
            var y_col = y_range.split(":");
            if(x_col.length !=2 && y_col.length !=2){
                document.getElementById("messageLabel").innerHTML = "Cannot read your Excel file, please verify the parameters";
                throw "incorrect";
                wind.destroy();
                graph_wind.style.pointerEvents = "auto";
            }
            if((regex_for_column_name.test(x_col[0]) != true) && (regex_for_column_name.test(x_col[1]) != true)){
                document.getElementById("messageLabel").innerHTML = "Bad Address in X";
                throw "incorrect";
                wind.destroy();
                graph_wind.style.pointerEvents = "auto";
            }
            if((regex_for_column_name.test(y_col[0]) != true) && (regex_for_column_name.test(y_col[1]) != true)){
                document.getElementById("messageLabel").innerHTML = "Bad Address in Y";
                throw "incorrect";
                wind.destroy();
                graph_wind.style.pointerEvents = "auto";
            }
            var x_start_col = x_col[0].substring(0, 1);
            var x_start_col_range = parseFloat(x_col[0].substring(1, x_col[0].length))-1;
            var x_end_col = x_col[1].substring(0, 1);
            var x_end_col_range = parseFloat(x_col[1].substring(1, x_col[1].length))-1;
            if(x_start_col != x_end_col){
                document.getElementById("messageLabel").innerHTML = "Cannot read your Excel file, please verify the parameters";
                throw "incorrect";
                wind.destroy();
                graph_wind.style.pointerEvents = "auto";
            }
            var y_start_col = y_col[0].substring(0, 1);
            var y_start_col_range = parseFloat(y_col[0].substring(1, y_col[0].length))-1;
            var y_end_col = y_col[1].substring(0, 1);
            var y_end_col_range = parseFloat(y_col[1].substring(1, y_col[0].length))-1;
            if(y_start_col != y_end_col){
                document.getElementById("messageLabel").innerHTML = "Cannot read your Excel file, please verify the parameters";
                throw "incorrect";
                wind.destroy();
                graph_wind.style.pointerEvents = "auto";
            }
            var x_col_num = convertLetterToNumber(x_start_col) - 1;
            var y_col_num = convertLetterToNumber(y_start_col) - 1;
            var x = document.getElementById("inputExcelFile");
            var file = x.files[0];
            var reader = new FileReader();
            reader.onload = function(e){
            var data = e.target.result;
            data = new Uint8Array(data);
            /* read the file */
            var workbook = XLSX.read(data, {type: 'array'}); // parse the file
            var sheet = workbook.Sheets[workbook.SheetNames[0]]; // get the first worksheet
            var range = XLSX.utils.decode_range(sheet['!ref']);
            var points_ary = [];
            var k = 0;
            for(var i = x_start_col_range, j = y_start_col_range; i <= x_end_col_range && j <= y_end_col_range; i++, j++){
                var cell_x = sheet[XLSX.utils.encode_cell({r: i, c: x_col_num})];
                var cell_y = sheet[XLSX.utils.encode_cell({r: j, c: y_col_num})];
                var x = parseFloat(cell_x.v);
                var y = parseFloat(cell_y.v);
                points_ary[k] = [x,y];
                sigbuilder_Graph.series[0].addPoint([x,y]);
                k++;
            }
            graphParameters.mtd = 1;
            graphParameters.graphPoints = points_ary.slice();
            pointsHistory.push(graphParameters.graphPoints.slice());
            graphParameters.points = sigbuilder_Graph.series[0].data.length;
            graphParameters.xmaxTitle = sigbuilder_Graph.xAxis[0].getExtremes().dataMax.toFixed(6);
            graphParameters.chartType = "line";
            graphParameters.step = "";
            graphParameters.stepname = "";
            sigbuilder_Graph.setTitle(null, { text: updateSubtitleForSigbuilderGraph(graphParameters.points, graphParameters.mtd, graphParameters.xmaxTitle, graphParameters.PeriodicOption)});
            sigbuilder_Graph.series[0].update({
            type: "line",
            step: '',
            name: ''
            });
            autoscaleFunctionalityForGraph(sigbuilder_Graph, graphParameters, pointsHistory);
        };
        reader.readAsArrayBuffer(file);
        }else{
            graph_wind.style.pointerEvents = "auto";
            wind.destroy();
            document.getElementById("messageLabel").innerHTML = "Please select the proper Excel file";
            throw "incorrect";
        }
        graph_wind.style.pointerEvents = "auto";
        wind.destroy();
        document.getElementById("messageLabel").innerHTML = "";
    };


}

function openPeriodicSignal(graph, graphParameters, sigbuilder_Graph){

    //Making graph window inaccessible
    var graph_wind = document.getElementById("graphcontentwind");
    graph_wind.style.pointerEvents = "none";
    // Create basic structure for the form
    var content = document.createElement('div');
    content.setAttribute("id", "periodicSignal");

    // Add Form
    var myform = document.createElement("form");
    myform.method = "post";
    myform.id = "formPeriodicSignal";
    myform.style.padding = "10px";

    var titlelabel = document.createElement('span');
    titlelabel.innerHTML = "Generating periodic signal";
    myform.appendChild(titlelabel);
    // Line break
    var linebreak = document.createElement('br');
    myform.appendChild(linebreak);

    // Line break
    var linebreak = document.createElement('br');
    myform.appendChild(linebreak);

    // Input Title
    var namelabel = document.createElement('label');
    namelabel.innerHTML = "y/n";
    namelabel.style.marginLeft = "5px";
    myform.appendChild(namelabel);

    // Input
    var input = document.createElement("input");
    input.name = "edit_periodicSignal";
    input.setAttribute("id", "edit_periodicSignal");
    input.setAttribute("class", "fieldInput");
    input.value = graphParameters.PeriodicOption.toString();
    myform.appendChild(input);

    // Line break
    var linebreak = document.createElement('br');
    myform.appendChild(linebreak);

    // Line break
    var linebreak = document.createElement('br');
    myform.appendChild(linebreak);

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
    var height = 120;
    wind = showModalWindow(graph, 'Scilab Multiple Values Request', content, 200, height);

    // Executes when button 'cancel_btn' is clicked
    cancel_btn.onclick = function() {
        document.getElementById("messageLabel").innerHTML = "";
        graph_wind.style.pointerEvents = "auto";
        wind.destroy();
    };
    // Executes when button 'ok_btn' is clicked
    ok_btn.onclick = function() {
        var periodicSignal = document.getElementById("edit_periodicSignal").value.trim();
        if(periodicSignal == "y"||periodicSignal == "Y"){
            graphParameters.PeriodicOption = "y";
        }else{
            graphParameters.PeriodicOption = "n";
        }
        graphParameters.points = sigbuilder_Graph.series[0].data.length;
        graphParameters.xmaxTitle = sigbuilder_Graph.xAxis[0].getExtremes().dataMax.toFixed(6);
        sigbuilder_Graph.setTitle(null, { text: updateSubtitleForSigbuilderGraph(graphParameters.points, graphParameters.mtd, graphParameters.xmaxTitle, graphParameters.PeriodicOption)});
        document.getElementById("messageLabel").innerHTML = "";
        graph_wind.style.pointerEvents = "auto";
        wind.destroy();
    };

}

function open_sine_wind(graph){

    //Making graph window inaccessible
    var graph_wind = document.getElementById("graphcontentwind");
    graph_wind.style.pointerEvents = "none";
    // Create basic structure for the form
    var content = document.createElement('div');
    content.setAttribute("id", "openSineWnd");

    // Add Form
    var myform = document.createElement("form");
    myform.method = "post";
    myform.id = "formOpenSineWnd";
    myform.style.padding = "10px";

    var titlelabel = document.createElement('span');
    titlelabel.innerHTML = "Sine parameters";
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

    var labelArray = ['Amplitude','Frequency(rad/sec)','Phase(rad)','Bias','number of points'];
    for(var i = 0; i < labelArray.length; i++){
        // Input Title
        var namelabel = document.createElement('label');
        namelabel.innerHTML = labelArray[i];
        namelabel.style.marginLeft = "20px";
        myform.appendChild(namelabel);

        // Input
        var input = document.createElement("input");
        input.name = "edit_"+labelArray[i];
        input.setAttribute("id", "edit_sine_"+i);
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
    var height = 240;
    wind = showModalWindow(graph, 'Scilab Multiple Values Request', content, 320, height);
    // Executes when button 'cancel_btn' is clicked
    cancel_btn.onclick = function() {
        document.getElementById("messageLabel").innerHTML = "";
        graph_wind.style.pointerEvents = "auto";
        wind.destroy();
    };
    // Executes when button 'ok_btn' is clicked
    ok_btn.onclick = function() {
        document.getElementById("messageLabel").innerHTML = "";
        graph_wind.style.pointerEvents = "auto";
        wind.destroy();
    };

}

function open_sawtooth1_wind(graph){

    //Making graph window inaccessible
    var graph_wind = document.getElementById("graphcontentwind");
    graph_wind.style.pointerEvents = "none";
    // Create basic structure for the form
    var content = document.createElement('div');
    content.setAttribute("id", "openSawtooth1Wnd");

    // Add Form
    var myform = document.createElement("form");
    myform.method = "post";
    myform.id = "formOpenSawtooth1Wnd";
    myform.style.padding = "10px";

    var titlelabel = document.createElement('span');
    titlelabel.innerHTML = "Sawtooth signal parameters";
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

    var labelArray = ['Amplitude','Period','Delay'];
    for(var i = 0; i < labelArray.length; i++){
        // Input Title
        var namelabel = document.createElement('label');
        namelabel.innerHTML = labelArray[i];
        namelabel.style.marginLeft = "20px";
        myform.appendChild(namelabel);

        // Input
        var input = document.createElement("input");
        input.setAttribute("id", "edit_sawtooth1_"+i);
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
    wind = showModalWindow(graph, 'Scilab Multiple Values Request', content, 250, height);
    // Executes when button 'cancel_btn' is clicked
    cancel_btn.onclick = function() {
        document.getElementById("messageLabel").innerHTML = "";
        graph_wind.style.pointerEvents = "auto";
        wind.destroy();
    };
    // Executes when button 'ok_btn' is clicked
    ok_btn.onclick = function() {
        document.getElementById("messageLabel").innerHTML = "";
        graph_wind.style.pointerEvents = "auto";
        wind.destroy();
    };

}

function open_sawtooth2_wind(graph){

    //Making graph window inaccessible
    var graph_wind = document.getElementById("graphcontentwind");
    graph_wind.style.pointerEvents = "none";
    // Create basic structure for the form
    var content = document.createElement('div');
    content.setAttribute("id", "openSawtooth2Wnd");

    // Add Form
    var myform = document.createElement("form");
    myform.method = "post";
    myform.id = "formOpenSawtooth2Wnd";
    myform.style.padding = "10px";

    var titlelabel = document.createElement('span');
    titlelabel.innerHTML = "Sawtooth signal parameters";
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

    var labelArray = ['Amplitude','Period'];
    for(var i = 0; i < labelArray.length; i++){
        // Input Title
        var namelabel = document.createElement('label');
        namelabel.innerHTML = labelArray[i];
        namelabel.style.marginLeft = "20px";
        myform.appendChild(namelabel);

        // Input
        var input = document.createElement("input");
        input.setAttribute("id", "edit_sawtooth2_"+i);
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
    wind = showModalWindow(graph, 'Scilab Multiple Values Request', content, 250, height);
    // Executes when button 'cancel_btn' is clicked
    cancel_btn.onclick = function() {
        document.getElementById("messageLabel").innerHTML = "";
        graph_wind.style.pointerEvents = "auto";
        wind.destroy();
    };
    // Executes when button 'ok_btn' is clicked
    ok_btn.onclick = function() {
        document.getElementById("messageLabel").innerHTML = "";
        graph_wind.style.pointerEvents = "auto";
        wind.destroy();
    };

}

function open_pulse_wind(graph){

    //Making graph window inaccessible
    var graph_wind = document.getElementById("graphcontentwind");
    graph_wind.style.pointerEvents = "none";
    // Create basic structure for the form
    var content = document.createElement('div');
    content.setAttribute("id", "openPulseWnd");

    // Add Form
    var myform = document.createElement("form");
    myform.method = "post";
    myform.id = "formOpenPulseWnd";
    myform.style.padding = "10px";

    var titlelabel = document.createElement('span');
    titlelabel.innerHTML = "Square wave pulse signal";
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

    var labelArray = ['Amplitude','Period (sec)','Pulse width(% of period)','Phase delay(sec)','Bias'];
    for(var i = 0; i < labelArray.length; i++){
        // Input Title
        var namelabel = document.createElement('label');
        namelabel.innerHTML = labelArray[i];
        namelabel.style.marginLeft = "20px";
        myform.appendChild(namelabel);

        // Input
        var input = document.createElement("input");
        input.setAttribute("id", "edit_pulse_"+i);
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
    var height = 240;
    wind = showModalWindow(graph, 'Scilab Multiple Values Request', content, 300, height);
    // Executes when button 'cancel_btn' is clicked
    cancel_btn.onclick = function() {
        document.getElementById("messageLabel").innerHTML = "";
        graph_wind.style.pointerEvents = "auto";
        wind.destroy();
    };
    // Executes when button 'ok_btn' is clicked
    ok_btn.onclick = function() {
        document.getElementById("messageLabel").innerHTML = "";
        graph_wind.style.pointerEvents = "auto";
        wind.destroy();
    };

}

function open_random_normal_wind(graph){

    //Making graph window inaccessible
    var graph_wind = document.getElementById("graphcontentwind");
    graph_wind.style.pointerEvents = "none";
    // Create basic structure for the form
    var content = document.createElement('div');
    content.setAttribute("id", "openRandomNormalWnd");

    // Add Form
    var myform = document.createElement("form");
    myform.method = "post";
    myform.id = "formRandomNormalWnd";
    myform.style.padding = "10px";

    var titlelabel = document.createElement('span');
    titlelabel.innerHTML = "Normal(Gaussian) random signal";
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

    var labelArray = ['Mean','Variance','Initial seed','Sample time','Number of points'];
    for(var i = 0; i < labelArray.length; i++){
        // Input Title
        var namelabel = document.createElement('label');
        namelabel.innerHTML = labelArray[i];
        namelabel.style.marginLeft = "20px";
        myform.appendChild(namelabel);

        // Input
        var input = document.createElement("input");
        input.setAttribute("id", "edit_Random_Normal_"+i);
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
    var height = 240;
    wind = showModalWindow(graph, 'Scilab Multiple Values Request', content, 300, height);
    // Executes when button 'cancel_btn' is clicked
    cancel_btn.onclick = function() {
        document.getElementById("messageLabel").innerHTML = "";
        graph_wind.style.pointerEvents = "auto";
        wind.destroy();
    };
    // Executes when button 'ok_btn' is clicked
    ok_btn.onclick = function() {
        document.getElementById("messageLabel").innerHTML = "";
        graph_wind.style.pointerEvents = "auto";
        wind.destroy();
    };

}

function open_random_uniform_wind(graph){

    //Making graph window inaccessible
    var graph_wind = document.getElementById("graphcontentwind");
    graph_wind.style.pointerEvents = "none";
    // Create basic structure for the form
    var content = document.createElement('div');
    content.setAttribute("id", "openRandomUniformWnd");

    // Add Form
    var myform = document.createElement("form");
    myform.method = "post";
    myform.id = "formRandomUniformWnd";
    myform.style.padding = "10px";

    var titlelabel = document.createElement('span');
    titlelabel.innerHTML = "Uniform random signal";
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

    var labelArray = ['Minimum','Maximum','Initial seed','Sample time','Number of points'];
    for(var i = 0; i < labelArray.length; i++){
        // Input Title
        var namelabel = document.createElement('label');
        namelabel.innerHTML = labelArray[i];
        namelabel.style.marginLeft = "30px";
        myform.appendChild(namelabel);

        // Input
        var input = document.createElement("input");
        input.setAttribute("id", "edit_Random_Uniform_"+i);
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
    var height = 240;
    wind = showModalWindow(graph, 'Scilab Multiple Values Request', content, 300, height);
    // Executes when button 'cancel_btn' is clicked
    cancel_btn.onclick = function() {
        document.getElementById("messageLabel").innerHTML = "";
        graph_wind.style.pointerEvents = "auto";
        wind.destroy();
    };
    // Executes when button 'ok_btn' is clicked
    ok_btn.onclick = function() {
        document.getElementById("messageLabel").innerHTML = "";
        graph_wind.style.pointerEvents = "auto";
        wind.destroy();
    };

}


function editPointsValue(graphObject,graph,sigbuilder_Graph,graphParameters, pointsHistory, method){

    //Making graph window inaccessible
    var graph_wind = document.getElementById("graphcontentwind");
    graph_wind.style.pointerEvents = "none";
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
        input.name = "edit_"+keys[i];
        input.value = value;
        input.setAttribute("id", "edit_"+keys[i]);
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
    wind = showModalWindow(graph, 'Scilab Multiple Values Request', content, 200, height);

    // Executes when button 'cancel_btn' is clicked
    cancel_btn.onclick = function() {
        document.getElementById("messageLabel").innerHTML = "";
        graph_wind.style.pointerEvents = "auto";
        wind.destroy();
    };
    // Executes when button 'ok_btn' is clicked
    ok_btn.onclick = function() {
        var x_value = parseFloat(document.getElementById("edit_x").value);
        if(x_value < 0){
            x_value = 0;
        }
        var y_value = parseFloat(document.getElementById("edit_y").value);
        removePointsFromChart(graphObject,sigbuilder_Graph,graphParameters, pointsHistory,method);
        addPointsOnChart(sigbuilder_Graph,graphParameters, pointsHistory,x_value,y_value,method);
        autoscaleFunctionalityForGraph(sigbuilder_Graph, graphParameters, pointsHistory);
        graph_wind.style.pointerEvents = "auto";
        document.getElementById("messageLabel").innerHTML = "";
        wind.destroy();
    };
}

function removePointsFromChart(graphObject, sigbuilder_Graph, graphParameters, pointsHistory, method){
    var counter = graphObject.point.index;
    sigbuilder_Graph.series[0].data[counter].remove();
    pointsHistory.push(graphParameters.graphPoints.slice());
    graphParameters.points = sigbuilder_Graph.series[0].data.length;
    graphParameters.mtd = method;
    graphParameters.xmaxTitle = sigbuilder_Graph.xAxis[0].getExtremes().dataMax.toFixed(6);
    sigbuilder_Graph.setTitle(null, { text: updateSubtitleForSigbuilderGraph(graphParameters.points, graphParameters.mtd, graphParameters.xmaxTitle, graphParameters.PeriodicOption)});
}

function addPointsOnChart(sigbuilder_Graph, graphParameters, pointsHistory, x_value, y_value, method){
    sigbuilder_Graph.series[0].addPoint([x_value, y_value]);
    pointsHistory.push(graphParameters.graphPoints.slice());
    graphParameters.points = sigbuilder_Graph.series[0].data.length;
    graphParameters.mtd = method;
    graphParameters.xmaxTitle = sigbuilder_Graph.xAxis[0].getExtremes().dataMax.toFixed(6);
    sigbuilder_Graph.setTitle(null, { text: updateSubtitleForSigbuilderGraph(graphParameters.points, graphParameters.mtd, graphParameters.xmaxTitle, graphParameters.PeriodicOption)});
}
