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
// fig_id, l_id - figure_id and line_id of blocks,
// pnts - Points list of the blocks
var fig_id, l_id, pnts = [];

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
    if (title_text.substring(0, 5)=="BARXY") {
        // chart_animation = true;
        thickness = no_of_graph;
        no_of_graph = 1;
    } else if (title_text.substring(0, 7)=="CSCOPXY") {
        // disable line by putting thickness as 0
        thickness = 0
    } else if (title_text.substring(0, 7)=="CANIMXY") {
        // disable line by putting thickness as 0
        thickness= 0
    } else if (title_text.substring(0, 7)=="CEVSCPE") {
        // To manipulate the graph width of ceventscope
        pointWidthvalue=2;
        pointplacementvalue=0;
        pointRangevalue = 0.05;
    }

    $('#charts').append("<div id='chart-"+id.toString()+"' style = 'height:200px;width:100%'></div>");

    // change graph height if block has only 1 output graph
    if (no_of_graph == 1)
        $('#chart-'+id.toString()).css('height', '300px');
    if (title_text.substring(0, 5)=="BARXY")
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
        series: []
    });

    if (title_text.substring(0, 5)!="BARXY") {
        chart_id_list.push(id);
        points_list.push(new Queue());
        series_list.push([]);
    }
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
    if (title_text.substring(0, 9)=="CANIMXY3D") {
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
        // Manipulation for showing tooltip according to axis change for 3D
        // chart
        tooltip: {
            pointFormatter: function() {
                var point = this;
                return 'X : <b>' + point.x + '</b><br/>'+'Y : <b>' + point.z + '</b><br/>'+'Z : <b>' + point.y + '</b><br/>';
            }
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
            enabled: true
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
var create_draggable_points_chart_sigbuilder = function(graphPoints, pointsHistory, xmin, xmax, ymin, ymax, chart_type, points, method, xmaxtitle,xpointinterval,step,stepname) {

    var subtitle = updateSubtitleForSigbuilderGraph(points, method, xmaxtitle);
    pointsHistory.push(graphPoints.slice());

    sigbuilder_Graph = Highcharts.chart('drag_sig_chart', {
        chart: {
            type: chart_type,
            animation: false,
            events: {
                click: function (e) {
                    this.series[0].addPoint([e.xAxis[0].value, e.yAxis[0].value]);
                    pointsHistory.push(graphPoints.slice());
                    var pointscount = (pointsHistory[pointsHistory.length-1].length);
                    xmaxtitle = (sigbuilder_Graph.xAxis[0].getExtremes().dataMax).toFixed(6);
                    this.setTitle(null, { text: updateSubtitleForSigbuilderGraph(pointscount, method, xmaxtitle)});
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
            tickInterval: xpointinterval,
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
                        },
                        dblclick: function (e) {
                            //Have to work on double click functionality
                            console.log(e.point.x);
                            console.log(e.point.y);
                        },
                        contextmenu: function (e) {
                            var counter = e.point.index;
                            if (counter > -1) {
                                graphPoints.splice(counter, 1);
                            }
                            sigbuilder_Graph.series[0].data[counter].remove();
                            pointsHistory.push(graphPoints.slice());
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
            data: graphPoints,
            step: step,
            name: stepname
        }]
    });
    return sigbuilder_Graph;
};

function updateSubtitleForSigbuilderGraph(points, method, xmaxtitle){
    var subTitle = "<b>"+points+" points, Method: "+getmethod(method)+", periodic, T = "+xmaxtitle+"</b>";
    return subTitle;
}

function chart_init(wnd, affichwnd, with_interval, with_interval2) {
    var block;
    // define buffer for CANIMXY3D
    var buffer;
    // buffer for CANIMXY
    var buffer_canimxy;
    // Initialise variable for entry condition of creating chart for BARXY and
    // AFFICH_m
    var block_entry_BARXY = 1, block_entry_AFFICH = 1;

    // Start listening to server
    eventSource = new EventSource("/SendLog?id="+clientID, { withCredentials: true });

    eventSource.addEventListener("block", function(event) {
        var data = event.data.split(' ');
        block = parseInt(data[4]);
        // For BARXY
        if (block == 11) {
            var x1 = parseFloat(data[5]);
            var y1 = parseFloat(data[6]);
            var x2 = parseFloat(data[7]);
            var y2 = parseFloat(data[8]);

            if (block_entry_BARXY == 1) {
                fig_id = block;
                l_id = fig_id + 1;

                create_new_chart(fig_id, data[14], data[11], data[12], data[9], data[10], 'line', data[13]+'-'+fig_id);
                block_entry_BARXY = block_entry_BARXY + 1;
                var chart = $('#chart-'+fig_id.toString()).highcharts();
                chart.addSeries({
                    id: l_id.toString(),
                    data: []
                });
            }

            pnts.push([x1, y1]);
            pnts.push([x2, y2]);

            // Ending condition for blocks not having a dataline for 'Ending'
            if (pnts.length == (this.finalIntegrationTime*10-1)) {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", "/endBlock/"+str(fig_id), true);
                xhr.send();
            }
        }
    }, false);

    eventSource.addEventListener("log", function(event) {
        var data = event.data.split(' ');

        // store block info. from the data line
        block = parseInt(data[0]);

        // handle writec_f and writeau_f
        if (block==21||block==22) {
            // create a form and add the filename to it
            var form = new FormData()
            form.append('path', data[5]);
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            // sending form to get file for download
            xhr.open("POST", "/downloadfile", true);
            xhr.onload = function() {
                if (this.status==200) {
                    // blob data type to receive the file
                    var blob=this.response;
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
            var xhr2= new XMLHttpRequest();
            xhr2.open("POST", "/deletefile");
            xhr2.onload = function() {
                if (this.status==200) {
                    // blob data type to receive the file
                    var x=this.response;
                }
            };
            xhr2.send(form);
        } else if (block < 5 ||block ==9 ||block ==23) {
            // added new condition for ceventscope
            // process data for 2D-SCOPE blocks

            var figure_id = parseInt(data[5]);
            var line_id = parseInt(data[7]);
            var x = parseFloat(data[9]);
            var y = parseFloat(data[10]);
            var z = parseFloat(data[11]);
            if (chart_id_list.indexOf(figure_id)<0) {
                // set default chart type
                var chart_type = 'line';

                // if sink block is CSCOPXY or CANIMXY
                if (block == 4||block== 9) {
                    chart_type = 'scatter';
                    create_new_chart(figure_id, data[12], data[15], data[16], data[13], data[14], chart_type, data[17]+'-'+data[3]);
                    // Set buffer size for CANIMXY
                    if (block == 9)
                        buffer_canimxy = data[18];
                    RANGE[chart_id_list.indexOf(figure_id)]=parseFloat(data[14]);
                } else {
                    // Event Handling block is ceventscope
                    if (block ==23) {
                        chart_type = 'column';
                        create_new_chart(figure_id, data[12], 0, 1, 0, data[13], chart_type, data[14]+'-'+data[3]);
                        RANGE[chart_id_list.indexOf(figure_id)]=parseFloat(data[13]);
                    } else {
                        // sink block is not CSCOPXY
                        create_new_chart(figure_id, data[12], data[13], data[14], 0, data[15], chart_type, data[16]+'-'+data[3]);
                        RANGE[chart_id_list.indexOf(figure_id)]=parseFloat(data[15]);
                    }
                }
            }
            var index = chart_id_list.indexOf(figure_id);
            // store 2d-data
            points_list[index].enqueue([line_id, x, y]);
            // store block number for chart creation
            block_list[index] = block;
        } else if (block == 5 || block == 10) {
            // process data for 3D-SCOPE blocks

            var figure_id = parseInt(data[5]);
            var line_id = parseInt(data[7]);
            var x = parseFloat(data[9]);
            var y = parseFloat(data[10]);
            var z = parseFloat(data[11]);
            if (chart_id_list.indexOf(figure_id)<0) {
                chart_type = 'scatter';
                create_new_chart_3d(figure_id, data[12], data[13], data[14], data[15], data[16], data[17], data[18], chart_type, data[19]+'-'+data[3], data[20], data[21]);
                // Set buffer size for CANIMXY3D
                if (block == 10)
                    buffer = data[22];
            }
            var index = chart_id_list.indexOf(figure_id);
            // store 3d-data
            points_list[index].enqueue([line_id, x, y, z]);
            // store block number for chart creation
            block_list[index] = block;
        } else if (block == 20) {
            // Process data for Affich_m block

            // store length of data for each line
            var length_of_data = data.length;
            var block_id = data[3]; // to store block id of affichm block
            var rows = data[10]; // gets row of matrix
            var columns = data[11]; // gets column of matrix

            // below code creates a html code which is table with data in that
            // (To display it as matrix)
            var p="<b>Value of Block : AFFICH_m-"+block_id+"</b> (Refer to label on block)<br><br><table style='width:100%'><tr>";
            var count=1;
            for (var k=12; k<(length_of_data-1); k++) {
                p+="<td>";
                p+=data[k];
                if ((count % columns)==0) {
                    // to break into new column of table
                    p+="</td></tr><tr>";
                } else {
                    p+="</td>";
                }
                count++;
            }
            p+="</table>";
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
        if (event.data=="Empty diagram")
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
        if (event.data!="")
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
    }, false);

    if (with_interval) {
        interval = setInterval(function() {
            var chart_count = 0;
            for (var i=0;i<chart_id_list.length;i++) {
                // For each chart
                // Get id and points queue
                var figure_id = chart_id_list[i];
                var points = points_list[i];
                if (figure_id == -1)
                    continue;
                chart_count++;
                // get index of the chart
                var index= chart_id_list.indexOf(figure_id);
                var block=block_list[index];
                var pointAdded = false;
                var pointsAdded = 0;

                if (block != 10 && block!=9) {
                    // Get chart container
                    var chart = $('#chart-'+figure_id.toString()).highcharts();
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
                        if (series_list[i].indexOf(line_id)<0) {
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

                        if (block!=5) {
                            // If there are more points, remove old points
                            if (x>1.5*RANGE[index])
                                series.removePoint(0, false);
                        }

                        // for 3d-charts, add 3d-points (xzy-coordinates)
                        if (block == 5)
                            series.addPoint([x, z, y], false);
                        // for 2d-charts, add 2d-points (xy-coordinates)
                        else
                            series.addPoint([x, y], false);

                        if (block < 4||block==23) {
                            // Shift chart axis to display new values(only for
                            // blocks requiring shift, i.e, blocks 1-3)
                            if (x>(RANGE[index]))
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
                } else if (block==10) {
                    // Process CANIMXY3D

                    // Get chart container
                    var chart = $('#chart-'+figure_id.toString()).highcharts();

                    if (!points.isEmpty()) {
                        var point = points.dequeue();
                        var line_id = point[0];
                        x = point[1];
                        y = point[2];
                        z = point[3];
                        if (series_list[i].indexOf(line_id)<0) {
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
                        if (series.xData.length>buffer)
                            series.removePoint(0, false);

                        chart.redraw();
                    }
                } else if (block==9) {
                    // Process CANIMXY

                    // Get chart container
                    var chart = $('#chart-'+figure_id.toString()).highcharts();

                    while (!points.isEmpty() && pointsAdded++ < 100) {
                        var point = points.dequeue();
                        var line_id = point[0];
                        x = point[1];
                        y = point[2];

                        if (series_list[i].indexOf(line_id)<0) {
                            series_list[i].push(line_id);
                            chart.addSeries({
                                id: line_id.toString(),
                                data: []
                            });
                        }
                        // Get chart data
                        var series = chart.get(line_id.toString());
                        series.addPoint([x, y], false);
                        if (series.xData.length>buffer_canimxy)
                            series.removePoint(0, false);

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
                var chart = $('#chart-'+fig_id.toString()).highcharts();
                // Get chart data
                var series = chart.get(l_id.toString())
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
