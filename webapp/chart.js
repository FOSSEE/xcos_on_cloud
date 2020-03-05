var chart_id_list = [];
var points_list = [];
var series_list = [];
// Keep track of block number for each graph(chart)
var block_list = [];
var INTERVAL = 10;
// Keep track of RANGE of each graph(chart)
var RANGE = [];
var eventSource;
var clientID;
var interval;
var interval2;
var isDone = false;
var firstPointAdded = false;
// define variables for block event
// fig_id - figure_id  of blocks,
// pnts - Points list of the blocks
var fig_id, pnts = [];

/*
 * Function to display values of all affich blocks
 * displayParameter : Contains the data which is display as data of affich
 * block
 * blockId : is used to get needed div according to affichm id
 */
var create_affich_displaytext = function(displayParameter, blockId) {
    $('#img_loader').html(""); // remove loading image once data is received
    // updating html data of div html for each time change according to each
    // affich
    $('#affichdata-'+blockId).html(displayParameter);
};

// Function to create a new chart
var create_new_chart = function(id, no_of_graph, ymin, ymax, xmin, xmax, type_chart, title_text) {
    /*
     * id - container id for graph(chart),
     * no_of_graph - number of graphs in output of a block,
     * ymin - minimum y-axis value,
     * ymax - maximum y-axis value,
     * xmin - minimum x-axis value,
     * xmax - maximum x-axis value,
     * type_chart - type of chart to be drawn,
     * title_text - title to be given to the chart
     */

    // convert String values to desired datatype
    xmin = parseFloat(xmin);
    xmax = parseFloat(xmax);
    ymin = parseFloat(ymin);
    ymax = parseFloat(ymax);

    // default value of pointpadding added for ceventscope
    pointWidthvalue=0.1;
    pointplacementvalue=0;
    pointRangevalue = null;

    var thickness = 2, chart_animation = false;
    if (title_text.substring(0, 5) == "BARXY") {
        // chart_animation = true;
        thickness = no_of_graph;
        no_of_graph = 1;
    } else if (title_text.substring(0, 7) == "CSCOPXY") {
        // disable line by putting thickness as 0
        thickness = 0
    } else if (title_text.substring(0, 7) == "CANIMXY") {
        // disable line by putting thickness as 0
        thickness = 0
    } else if (title_text.substring(0, 7) == "CEVSCPE") {
        // To manipulate the graph width of ceventscope
        pointWidthvalue = 2;
        pointplacementvalue = 0;
        pointRangevalue = 0.05;
    }

    $('#charts').append("<div id='chart-"+id.toString()+"' style = 'height:200px;width:100%'></div>");

    // change graph height if block has only 1 output graph
    if (no_of_graph == 1)
        $('#chart-'+id.toString()).css('height', '300px');
    if (title_text.substring(0, 5) == "BARXY")
        $('#chart-'+id.toString()).css('height', '400px');

    $('#chart-'+id.toString()).highcharts({
        chart: {
            type: type_chart,
            animation: chart_animation,
            zoomType: 'xy'
        },
        title: {
            text: title_text
        },
        xAxis: {
            title: {
                text: 'x'
            },
            tickInterval: 2,
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true,
            min: xmin,
            max: xmax
        },
        yAxis: {
            title: {
                text: 'y'
            },
            min: ymin,
            max: ymax,
            plotLines: [{
                width: 2,
                color: '#808080'
            }]
        },
        plotOptions: {
            marker: {
                enabled: false
            },
            column: {
                pointPlacement: pointplacementvalue,
                pointRange: pointRangevalue
            },
            series: {
                lineWidth: thickness,
                pointWidth: pointWidthvalue,
                enableMouseTracking: false,
                states: {
                    hover: {
                        lineWidth: thickness
                    }
                }
            },
            scatter: {
                marker: {
                    radius: 1,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                }
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            enabled: false
        },
        series: []
    });

    if (title_text.substring(0, 5) != "BARXY") {
        chart_id_list.push(id);
        points_list.push(new Queue());
        series_list.push([]);
    }
};

//To create coloraxis array which will be passed to cmatview chart for heatmap creation
function get_color_axis_for_points(block_uid){
    var color_axis_array = [];
    var get_hex_color_array = name_values_colormap.get(block_uid);
    for(var i = 0; i < get_hex_color_array.length; i++){
        var color_values = {};
        var temp = i;
        color_values["from"] = temp + 1;
        color_values["to"] = temp + 2;
        color_values["color"] = get_hex_color_array[i];
        color_axis_array.push(color_values);
    }
    return color_axis_array;
}

//Gets data (array with x , y and coloraxis values) to be passed to chart points
function get_points_for_data(data, m, n){
    var array_data = [];
    var i = 12;
    for (var x = (m-2) ; x >= 0; x--){
        for (var y = 0 ; y < (n-1) ; y++){
            var data_values = [];
            data_values[0] = x;
            data_values[1] = y;
            data_values[2] = parseInt(data[i]);
            array_data.push(data_values);
            i++;
        }
    }
    return array_data;
}

//Chart function for cmatview which has less than 10*10 matrix size
var create_chart_for_cmatview = function(id, m, n, title_text, color_axis) {
    xmin = 0;
    xmax = m;
    ymin = 0;
    ymax = n;
    $('#charts').append("<div id='chart-"+id+"' style = 'height:100%;width:100%'></div>");
    $('#chart-'+id).highcharts({
        tooltip: {
            enabled: false
        },
        chart: {
            type: 'heatmap'
        },
        title: {
            text: title_text
        },
        xAxis: {
            min: xmin,
            max: xmax
        },
        yAxis: {
            min: ymin,
            max: ymax,
        },
        plotOptions: {
            marker: {
                enabled: false
            },
            series: {
                enableMouseTracking: false
            }
        },
        colorAxis: {
            dataClasses: color_axis
        },
        legend: {
            enabled: false
        },
        series: []
    });

    chart_id_list.push(id);
    points_list.push(new Queue());
    series_list.push([]);
};

//Chart function for cmatview large data ie matrix more than 10*10 size
var create_chart_for_large_data_cmatview = function(id, m, n, title_text, color_axis) {
    xmin = 0;
    xmax = m;
    ymin = 0;
    ymax = n;
    $('#charts').append("<div id='chart-"+id+"' style = 'height:100%;width:100%'></div>");
    $('#chart-'+id).highcharts({
        tooltip: {
            enabled: false
        },
        chart: {
            type: 'heatmap'
        },
        boost: {
            useGPUTranslations: true,
            usePreallocated: true
        },
        title: {
            text: title_text
        },
        xAxis: {
            min: 0,
            max: xmax
        },
        yAxis: {
            min: 0,
            max: ymax
        },
        plotOptions: {
           series: {
                animation:false,
                boostThreshold : 400000,
                turboThreshold : 0,
                stickyTracking: false,
                shadow: false
            },
            marker: {
                enabled: false
            },
             heatmap: {
                shadow: false,
                animation: false
            }
        },
        legend: {
            enabled: false
        },
        colorAxis: {
            dataClasses: color_axis
        },
        series: [{
            seriesThreshold: 2
        }]
    });

    chart_id_list.push(id);
    points_list.push(new Queue());
    series_list.push([]);
};


// Function to create a new 3d-chart
var create_new_chart_3d = function(id, no_of_graph, xmin, xmax, ymin, ymax, zmin, zmax, type_chart, title_text, alpha, theta) {
    /*
     * id - container id for graph(chart),
     * no_of_graph - number of graphs in output of a block,
     * ymin - minimum y-axis value,
     * ymax - maximum y-axis value,
     * xmin - minimum x-axis value,
     * xmax - maximum x-axis value,
     * zmin - minimum z-axis value,
     * zmax - maximum z-axis value,
     * type_chart - type of chart to be drawn,
     * title_text - title to be given to the chart,
     * alpha - Angle of rotation for graph for 3D chart
     * theta - Angle of rotation for graph for 3D chart
     */

    // convert String values to desired datatype
    xmin = parseFloat(xmin);
    xmax = parseFloat(xmax);
    ymin = parseFloat(ymin);
    ymax = parseFloat(ymax);
    zmin = parseFloat(zmin);
    zmax = parseFloat(zmax);
    // Assigning angle theta of 3D block to beta angle of highchart ( Can be
    // modified later)
    beta = theta;
    var thickness = 1;
    var radiusvalue = 1;
    if (title_text.substring(0, 9) == "CANIMXY3D") {
        thickness = 0;
        radiusvalue = 3;
    }
    $('#charts').append("<div id='chart-"+id.toString()+"' style = 'height:200px'></div>");

    // change graph height if block has only 1 output graph
    if (no_of_graph == 1)
        $('#chart-'+id.toString()).css('height', '400px');

    $('#chart-'+id.toString()).highcharts({
        chart: {
            type: type_chart,
            zoomtype: 'xy',
            options3d: {
                enabled: true,
                alpha: alpha,
                beta: beta,
                depth: 100,
                viewDistance: 100,
                frame: {
                    bottom: {
                        size: 0,
                        color: '#FFFFFF'
                    },
                    back: {
                        size: 0,
                        color: '#FFFFFF'
                    },
                    side: {
                        size: 0,
                        color: '#FFFFFF'
                    }
                }
            }
        },
        title: {
            text: title_text
        },
        tooltip: {
            enabled: false
        },
        yAxis: {
            // Manipulation for showing z axis vertically instead of Y axis
            // (only for 3D graph).
            min: zmin,
            max: zmax,
            gridLineWidth: 1,
            tickInterval: 1,
            title: {
                rotation: 0,
                style: {
                    fontWeight: 'bold',
                    fontSize: '15px'
                },
                text: 'z'
            }
        },
        xAxis: {
            min: xmin,
            max: xmax,
            tickInterval: 1,
            gridLineWidth: 1,
            title: {
                style: {
                    fontWeight: 'bold',
                    fontSize: '15px'
                },
                text: 'x' // title for X for differentiating axis
            }
        },
        zAxis: {
            // Manipulation for showing y axis values in place of z axis (only
            // for 3D graph).
            min: ymin,
            max: ymax,
            tickInterval: 1,
            gridLineWidth: 1,
            title: {
                rotation: 300,
                margin: -30,
                style: {
                    fontWeight: 'bold',
                    fontSize: '15px'
                },
                text: 'y'
            }
        },
        plotOptions: {
            marker: {
                enabled: false
            },
            series: {
                lineWidth: thickness,
                states: {
                    hover: {
                        lineWidth: thickness
                    }
                }
            },
            scatter: {
                marker: {
                    radius: radiusvalue,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                }
            }
        },
        series: []
    });

    chart_id_list.push(id);
    points_list.push(new Queue());
    series_list.push([]);
};

// Function to create a chart with responsive points
var create_draggable_points_chart = function(graphPoints, pointsHistory, xmin, xmax, ymin, ymax) {
    // convert String values to desired datatype
    xmin = parseFloat(xmin);
    xmax = parseFloat(xmax);
    ymin = parseFloat(ymin);
    ymax = parseFloat(ymax);

    pointsHistory.push(graphPoints.slice());

    myGraph = Highcharts.chart('drag_chart', {
        chart: {
            animation: false,
            events: {
                click: function (e) {
                    this.series[0].addPoint([e.xAxis[0].value, e.yAxis[0].value]);
                    pointsHistory.push(graphPoints.slice());
                }
            }
        },

        title: {
            text: ''
        },

        yAxis: {
            title: {
                text: ''
            },
            min: ymin,
            max: ymax,
            gridLineWidth: 1,
            gridLineDashStyle: 'dash'
        },

        xAxis: {
            min: xmin,
            max: xmax,
            gridLineWidth: 1,
            gridLineDashStyle: 'dash'
        },

        plotOptions: {
            series: {
                point: {
                    events: {
                        drag: function (e) {
                            if (e.y >= ymax) {
                                this.y = ymax;
                                return false;
                            }
                            if (e.y <= ymin) {
                                this.y = ymin;
                                return false;
                            }
                            if (e.x >= xmax) {
                                this.x = xmax;
                                return false;
                            }
                            if (e.x <= xmin) {
                                this.x = xmin;
                                return false;
                            }
                        },
                        drop: function (e) {
                            pointsHistory.push(graphPoints.slice());
                        }
                    },
                    stickyTracking: false
                },
                column: {
                    stacking: 'normal'
                }
            }
        },

        tooltip: {
            enabled: false
        },

        series: [{
            showInLegend: false,
            pointStart: -2.5,
            pointInterval: 0.5,
            data: graphPoints,
            draggableX: true,
            draggableY: true
        }]
    });
};

// Function to create a chart with responsive points for Sigbuilder
var create_draggable_points_chart_sigbuilder = function(graphParameters, pointsHistory, xmin, xmax, ymin, ymax, chart_type, points, method, xmaxtitle,step,stepname) {
    graphParameters.mtd = method;
    var subtitle = updateSubtitleForSigbuilderGraph(points, graphParameters.mtd, xmaxtitle,graphParameters.PeriodicOption);
    pointsHistory.push(graphParameters.graphPoints.slice());

    sigbuilder_Graph = Highcharts.chart('drag_sig_chart', {
        chart: {
            type: chart_type,
            animation: false,
            events: {
                click: function (e) {
                    var x_value = e.xAxis[0].value;
                    var y_value = e.yAxis[0].value;
                    addPointsOnChart(sigbuilder_Graph, graphParameters, pointsHistory, x_value, y_value);
                }
            }
        },
        tooltip: {
            enabled: false
        },
        title: {
            text: ""
        },
        subtitle: {
            text: subtitle
        },

        yAxis: {
            title: {
                text: 'Output'
            },
            min: parseFloat(ymin),
            max: parseFloat(ymax),
            gridLineWidth: 1,
            gridLineDashStyle: 'dash'
        },

        xAxis: {
            title: {
                text: 'time'
            },
            min: parseFloat(xmin),
            max: parseFloat(xmax),
            gridLineWidth: 1,
            gridLineDashStyle: 'dash'
        },

        plotOptions: {
            series: {
                point: {
                    events: {
                        drag: function (e) {
                            if (e.y >= ymax) {
                                this.y = ymax;
                                return false;
                            }
                            if (e.y <= ymin) {
                                this.y = ymin;
                                return false;
                            }
                            if (e.x >= xmax) {
                                this.x = xmax;
                                return false;
                            }
                            if (e.x <= xmin) {
                                this.x = xmin;
                                return false;
                            }
                        },
                        drop: function (e) {
                            pointsHistory.push(graphParameters.graphPoints.slice());
                        },
                        dblclick: function (e) {
                            var graphObject = e;
                            editPointsValue(graphObject, graph_sigbuilder, sigbuilder_Graph, graphParameters, pointsHistory);
                        },
                        contextmenu: function (e) {
                            var graphObject = e;
                            removePointsFromChart(graphObject, sigbuilder_Graph, graphParameters, pointsHistory);
                        }
                    },
                    stickyTracking: false
                },
                column: {
                    stacking: 'normal'
                },
                marker: {
                    enabled: true,
                    symbol: 'url(../images/plus-icon.png)'
                }
            }
        },
        series: [{
            draggableX: true,
            draggableY: true,
            showInLegend: false,
            data: graphParameters.graphPoints,
            step: step,
            name: stepname
        }]
    });
    return sigbuilder_Graph;
};

function updateSubtitleForSigbuilderGraph(points, method, xmaxtitle, periodicFlag){

    var subTitle = "";
    if(periodicFlag == "y"){
        subTitle = "<b>"+points+" points, Method: "+getmethod(method)+", periodic, T = "+xmaxtitle+"</b>";
    }else{
        subTitle = "<b>"+points+" points, Method: "+getmethod(method)+", aperiodic</b>";
    }
    return subTitle;
}

function chart_init(graph, wnd, affichwnd, with_interval, with_interval2, show_image) {
    var block;
    // define buffer for CANIMXY3D
    var buffer;
    // buffer for CANIMXY
    var buffer_canimxy;
    // Initialise variable for entry condition of creating chart for BARXY and
    // AFFICH_m
    var block_entry_BARXY = 1;

    // Start listening to server
    eventSource = new EventSource("/SendLog?id="+clientID, { withCredentials: true });

    eventSource.addEventListener("log", function(event) {
        var data = event.data.split(' ');

        // store block info. from the data line
        block = parseInt(data[0]);

        // For BARXY
        if (block == 11) {
            var x1 = parseFloat(data[4]);
            var y1 = parseFloat(data[5]);
            var x2 = parseFloat(data[6]);
            var y2 = parseFloat(data[7]);

            if (block_entry_BARXY == 1) {
                fig_id = data[2];

                create_new_chart(fig_id, data[12], data[10], data[11], data[8], data[9], 'line', data[13]+'-'+fig_id);
                block_entry_BARXY = block_entry_BARXY + 1;
                var chart = $('#chart-'+fig_id).highcharts();
                chart.addSeries({
                    id: fig_id,
                    data: []
                });
            }

            pnts.push([x1, y1]);
            pnts.push([x2, y2]);

            // Ending condition for blocks not having a dataline for 'Ending'
            if (pnts.length == (this.finalIntegrationTime*10-1)) {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", "/endBlock/"+fig_id, true);
                xhr.send();
            }

        } else if (block == 21 || block == 22) {
            // handle writec_f and writeau_f
            // create a form and add the filename to it
            var form = new FormData()
            form.append('path', data[4]);
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            // sending form to get file for download
            xhr.open("POST", "/downloadfile", true);
            xhr.onload = function() {
                if (this.status == 200) {
                    // blob data type to receive the file
                    var blob = this.response;
                    var url = window.URL.createObjectURL(blob);
                    // popup for download option of the file
                    var anchor = document.createElement("a");
                    document.body.appendChild(anchor);
                    anchor.style = "display: none";
                    anchor.href = url;
                    if (block == 21) {
                        anchor.download = "writec-" + clientID + ".datas";
                    } else {
                        anchor.download = "audio-" + clientID + ".au";
                    }
                    anchor.click();
                    document.body.removeChild(anchor);
                    window.URL.revokeObjectURL(url);
                }
            };
            xhr.send(form);
            var xhr2 = new XMLHttpRequest();
            xhr2.open("POST", "/deletefile");
            xhr2.onload = function() {
                if (this.status == 200) {
                    // blob data type to receive the file
                    var x=this.response;
                }
            };
            xhr2.send(form);
        } else if (block < 5 ||block == 9 ||block == 23 ||block == 12) {
            // added new condition for ceventscope
            // process data for 2D-SCOPE blocks
            var figure_id = 0 ;
            if(block == 2){ //For cmscope block
                figure_id = data[4];
            }else{
                figure_id = data[2];
            }
            var line_id = parseInt(data[6]);
            var x = parseFloat(data[8]);
            var y = parseFloat(data[9]);
            if (chart_id_list.indexOf(figure_id) < 0) {
                // set default chart type
                var chart_type = 'line';

                // if sink block is CSCOPXY or CANIMXY
                if (block == 4 || block == 9) {
                    chart_type = 'scatter';
                    if(block == 4){
                        create_new_chart(figure_id, data[10], data[13], data[14], data[11], data[12], chart_type, data[15]+'-'+data[2]);
                    }else{
                        create_new_chart(figure_id, data[10], data[13], data[14], data[11], data[12], chart_type, data[16]+'-'+data[2]);
                        buffer_canimxy = data[15];
                    }
                    RANGE[chart_id_list.indexOf(figure_id)] = parseFloat(data[12]);
                } else {
                    // Event Handling block is ceventscope
                    if (block == 23) {
                        chart_type = 'column';
                        create_new_chart(figure_id, data[10], 0, 1, 0, data[11], chart_type, data[12]+'-'+data[2]);
                        RANGE[chart_id_list.indexOf(figure_id)] = parseFloat(data[11]);
                    } else if (block == 12) {
                        // process data for CMATVIEW blocks
                        var m = data[8];
                        var n = data[10];
                        var chart_type = 'heatmap';
                        var title_text = "CMATVIEW-" + figure_id;
                        var color_axis = get_color_axis_for_points(figure_id);
                         if (m*n <= 100) {
                            create_chart_for_cmatview(figure_id, m, n, data[data.length-1]+'-'+figure_id, color_axis);
                        }else{
                            create_chart_for_large_data_cmatview(figure_id, m, n, data[data.length-1]+'-'+figure_id, color_axis);
                        }
                        RANGE[chart_id_list.indexOf(figure_id)] = parseFloat(30);
                    } else {
                        // sink block is not CSCOPXY
                        create_new_chart(figure_id, data[10], data[11], data[12], 0, data[13], chart_type, data[14]+'-'+data[2]);
                        RANGE[chart_id_list.indexOf(figure_id)] = parseFloat(data[13]);
                    }
                }
            }
            var index = chart_id_list.indexOf(figure_id);
            // store 2d-data
            if(block != 12){
                points_list[index].enqueue([line_id, x, y]);
            }else{
                var values = get_points_for_data(data, data[8], data[10]);
                points_list[index].enqueue([line_id, values]);
            }
            // store block number for chart creation
            block_list[index] = block;
        } else if (block == 5 || block == 10) {
            // process data for 3D-SCOPE blocks

            var figure_id = data[2];
            var line_id = parseInt(data[6]);
            var x = parseFloat(data[8]);
            var y = parseFloat(data[9]);
            var z = parseFloat(data[10]);
            if (chart_id_list.indexOf(figure_id) < 0) {
                chart_type = 'scatter';
                if(block == 10){
                    create_new_chart_3d(figure_id, data[11], data[12], data[13], data[14], data[15], data[16], data[17], chart_type, data[21]+'-'+data[2], data[18], data[19]);
                    // Set buffer size for CANIMXY3D
                    buffer = data[20];
                }else{
                    create_new_chart_3d(figure_id, data[11], data[12], data[13], data[14], data[15], data[16], data[17], chart_type, data[20]+'-'+data[2], data[18], data[19]);
                }
            }
            var index = chart_id_list.indexOf(figure_id);
            // store 3d-data
            points_list[index].enqueue([line_id, x, y, z]);
            // store block number for chart creation
            block_list[index] = block;
        } else if(block == 13){
            // process data for CMAT3D blocks
            var block_uid = data[2];
            var m = data[8];
            var n = data[10];
            var xmin = data[12];
            var xmax = data[14];
            var ymin = data[16];
            var ymax = data[18];
            var zmin = data[20];
            var zmax = data[22];
            var alpha = data[24];
            var theta = data[26];
            //Chart function need to be written

        } else if (block == 20) {
            // Process data for Affich_m block

            // store length of data for each line
            var length_of_data = data.length;
            var block_id = data[2]; // to store block id of affichm block
            var rows = data[4]; // gets row of matrix
            var columns = data[5]; // gets column of matrix

            // below code creates a html code which is table with data in that
            // (To display it as matrix)
            var p = "<b>Value of Block : " + data[length_of_data-1] + "-" + block_id + "</b> (Refer to label on block)<br><br><table style='width:100%'><tr>";
            var count = 1;
            for (var k = 6; k < (length_of_data-1); k++) {
                if(data[k].length != 0){
                    p += "<td>";
                    p += data[k];
                    if ((count % columns) == 0) {
                        // to break into new column of table
                        p += "</td></tr><tr>";
                    } else {
                        p += "</td>";
                    }
                    count++;
                }
            }
            p += "</table>";
            // to send data to display result
            create_affich_displaytext(p, block_id);
        }
    }, false);

    // increase chart size on maximizing of mxWindow
    wnd.addListener(mxEvent.MAXIMIZE, function() {
        chart_id_list.forEach(function(item, index) {
            $('#chart-'+item.toString()).highcharts().setSize(wnd.div.clientWidth, $('#chart-'+item.toString()).height());
        });
    });

    // decrease chart size on normalizing of mxWindow
    wnd.addListener(mxEvent.NORMALIZE, function() {
        chart_id_list.forEach(function(item, index) {
            $('#chart-'+item.toString()).highcharts().setSize(wnd.div.clientWidth, $('#chart-'+item.toString()).height());
        });
    });

    // stop scilab process on closing of window
    wnd.addListener(mxEvent.CLOSE, function() {
        stopSimulation();
        stopSimulationWindows();
    });
    // stop scilab process on closing of window
    affichwnd.addListener(mxEvent.CLOSE, function() {
        stopSimulation();
        stopSimulationWindows();
    });

    // Error
    eventSource.addEventListener("ERROR", function(event) {
        setSimulationFlags(false);
        stopSimulation();
        stopSimulationWindows();
        if (event.data == "Empty diagram")
            alert(event.data);
        else
            alert("Error occurred! "+event.data);
        isDone = true;
    }, false);
    // MESSAGE FOR Only TOWS_c block
    eventSource.addEventListener("MESSAGE", function(event) {
        setSimulationFlags(false);
        stopSimulation();
        stopSimulationWindows();
        if (event.data != "")
            alert(event.data);
        isDone = true;
    }, false);
    // Stop listening

    eventSource.addEventListener("DONE", function(event) {
        setSimulationFlags(false);
        stopSimulation();
        $('#loader').hide();
        $('#img_loader').html("");
        isDone = true;

        if (show_image) {
            stopSimulationWindows();
            $.ajax({
                type: "GET",
                url: "/requestfilename?id=" + clientID,
                async: true,
                cache: false,
                processData: false,
                contentType: false,
                success: function(name) {
                    var content = document.createElement('div');
                    var img_disp = document.createElement('img');
                    img_disp.src = name;
                    content.appendChild(img_disp);
                    showModalWindow(graph, "Output", content, 610, 480);
                },
                error: function(name) {
                    alert("An error occurred!!");
                    return false;
                }
            });
        }
    }, false);

    if (with_interval) {
        interval = setInterval(function() {
            var chart_count = 0;
            for (var i = 0; i < chart_id_list.length; i++) {
                // For each chart
                // Get id and points queue
                var figure_id = chart_id_list[i];
                var points = points_list[i];
                if (figure_id == -1)
                    continue;
                chart_count++;
                // get index of the chart
                var index = chart_id_list.indexOf(figure_id);
                var block = block_list[index];
                var pointAdded = false;
                var pointsAdded = 0;

                if (block != 10 && block !=9 && block != 12) {
                    // Get chart container
                    var chart = $('#chart-'+figure_id).highcharts();
                    // Add points
                    while (!points.isEmpty() && pointsAdded++ < 100) {
                        var point = points.dequeue();
                        var line_id = point[0];
                        var x = point[1];
                        var y = point[2];
                        // for 3d-blocks, use depth value also, i.e., "z" value
                        if (block == 5)
                            z = point[3];
                        // If there is no line with line_id
                        // add new line with line_id
                        if (series_list[i].indexOf(line_id) < 0) {
                            series_list[i].push(line_id);

                            // for CSCOPXY-3D chart, add line to the scatter
                            // points
                            if (block == 5) {
                                chart.addSeries({
                                    id: line_id.toString(),
                                    lineWidth: 2,
                                    colorByPoint: false,
                                    data: []
                                });
                            } else {
                                // for other charts, no extra line parameter is
                                // required
                                chart.addSeries({
                                    id: line_id.toString(),
                                    data: []
                                });
                            }
                        }
                        // Get chart data
                        var series = chart.get(line_id.toString());

                        if (block != 5) {
                            // If there are more points, remove old points
                            if (x > 1.5*RANGE[index])
                                series.removePoint(0, false);
                        }

                        // for 3d-charts, add 3d-points (xzy-coordinates)
                        if (block == 5)
                            series.addPoint([x, z, y], false);
                        // for 2d-charts, add 2d-points (xy-coordinates)
                        else
                            series.addPoint([x, y], false);

                        if (block < 4||block == 23) {
                            // Shift chart axis to display new values(only for
                            // blocks requiring shift, i.e, blocks 1-3)
                            if (x > (RANGE[index]))
                                chart.xAxis[0].setExtremes(Math.floor(x-(RANGE[index]-1.0)), Math.floor(x+1.0));
                        }

                        // do not redraw blocks >= 4 after plotting all points
                        if (block < 4)
                            chart.redraw();
                        else
                            pointAdded = true;
                    }

                    if (pointAdded)
                        chart.redraw();
                } else if (block == 10) {
                    // Process CANIMXY3D

                    // Get chart container
                    var chart = $('#chart-'+figure_id).highcharts();

                    if (!points.isEmpty()) {
                        var point = points.dequeue();
                        var line_id = point[0];
                        x = point[1];
                        y = point[2];
                        z = point[3];
                        if (series_list[i].indexOf(line_id) < 0) {
                            series_list[i].push(line_id);
                            chart.addSeries({
                                id: line_id.toString(),
                                data: []
                            });
                        }
                        // Get chart data
                        var series = chart.get(line_id.toString());
                        // for 3d-charts, add 3d-points (xzy-coordinates)
                        series.addPoint([x, z, y], false);
                        if (series.xData.length > buffer)
                            series.removePoint(0, false);

                        chart.redraw();
                    }
                } else if (block == 9) {
                    // Process CANIMXY

                    // Get chart container
                    var chart = $('#chart-'+figure_id).highcharts();

                    while (!points.isEmpty() && pointsAdded++ < 100) {
                        var point = points.dequeue();
                        var line_id = point[0];
                        x = point[1];
                        y = point[2];

                        if (series_list[i].indexOf(line_id) < 0) {
                            series_list[i].push(line_id);
                            chart.addSeries({
                                id: line_id.toString(),
                                data: []
                            });
                        }
                        // Get chart data
                        var series = chart.get(line_id.toString());
                        series.addPoint([x, y], false);
                        if (series.xData.length > buffer_canimxy)
                            series.removePoint(0, false);

                        chart.redraw();
                    }
                }else if (block == 12){
                    //Process for CMATVIEW

                    // Get chart container
                    var chart = $('#chart-'+figure_id).highcharts();
                    // Add points
                    while (!points.isEmpty() && pointsAdded++ < 100) {
                        var point = points.dequeue();
                        var line_id = point[0];
                        var points_array = point[1];
                        // If there is no line with line_id
                        // add new line with line_id
                        if (series_list[i].indexOf(line_id) < 0) {
                            series_list[i].push(line_id);

                            chart.addSeries({
                                id: line_id.toString(),
                                data: []
                            });
                        }
                        // Get chart data
                        var series = chart.get(line_id.toString());
                        series.update({
                            data: points_array
                            });
                        chart.redraw();

                    }
                }
                if (points.isEmpty() && isDone) {
                    chart_id_list[i] = -1;
                    chart_count--;
                }
            }

            if (chart_count == 0 && isDone) {
                clearInterval(interval);
                interval = null;
            }
        }, INTERVAL);
    }

    if (with_interval2) {
        // Processing 'block' events
        firstPointAdded = false;
        interval2 = setInterval(function() {
            // display the points for BARXY block
            if (pnts.length > 0) {
                var chart = $('#chart-'+fig_id).highcharts();
                // Get chart data
                var series = chart.get(fig_id)
                // dequeue the points and add them
                series.addPoint(pnts.shift(), false);
                series.addPoint(pnts.shift(), false);
                chart.redraw(false);
                // Keep last 2 points in Graph
                if (firstPointAdded) {
                    series.removePoint(0, false);
                    series.removePoint(0, false);
                } else {
                    firstPointAdded = true;
                }
            }

            if (pnts.length == 0 && isDone) {
                clearInterval(interval2);
                interval2 = null;
            }
        }, 5);
    }
}

/*
 * chart_reset(): call when the simulation is to be stopped when any one of
 * these happens:
 *
 * - user clicks on stop or simulate
 * - user closes the simulation window
 * - user loads a new diagram
 *
 * Do not call this when the DONE event is received.
 */
function chart_reset() {
    if (interval != null) {
        clearInterval(interval);
        interval = null;
    }
    if (interval2 != null) {
        clearInterval(interval2);
        interval2 = null;
    }
    chart_id_list = [];
    points_list = [];
    series_list = [];
    block_list = [];
    RANGE = [];
    pnts = [];
    block_list = [];
    isDone = false;
}


