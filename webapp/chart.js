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
var isDone = false;
// define variables for block event
// fig_id, l_id - figure_id and line_id of blocks,   
// pnts - Points list of the blocks
var fig_id, l_id, pnts = [];

// Function to create a new chart
var create_new_chart = function(id, no_of_graph,ymin,ymax,xmin,xmax,type_chart,title_text){
	/* id - container id for graph(chart), no_of_graph - number of graphs in output of a block,
	   ymin - minimum y-axis value, ymax - maximum y-axis value,
	   xmin - minimum x-axis value, xmax - maximum x-axis value,
	   type_chart - type of chart to be drawn, title_text - title to be given to the chart
	*/

	// convert String values to desired datatype
	xmin = parseFloat(xmin);
	xmax = parseFloat(xmax);
	ymin = parseFloat(ymin);
	ymax = parseFloat(ymax);

	var thickness = 2, chart_animation = false; 
	if(title_text.substring(0,5)=="BARXY"){
		//chart_animation = true;
		thickness = no_of_graph;
		no_of_graph = 1;
	}
	else if(title_text.substring(0,7)=="CSCOPXY"){
		// disable line by putting thickness as 0
		thickness = 0
	}
        else if(title_text.substring(0,7)=="CANIMXY"){
                 //disable line by putting thickness as 0
                 console.log("check");
                 thickness= 0

        }
	
	$('#charts').append("<div id='chart-"+id.toString()+"' style = 'height:200px;width:100%'></div>");

	// change graph height if block has only 1 output graph
	if(no_of_graph == 1)
		$('#chart-'+id.toString()).css('height','300px');
	if(title_text.substring(0,5)=="BARXY")
		$('#chart-'+id.toString()).css('height','400px');


	$('#chart-'+id.toString()).highcharts({
		chart: {
			type: type_chart,
			animation: chart_animation,
			zoomType : 'xy'
		},
		title : {
			text: title_text
		},
		xAxis : {
			title: {
				text: 'x'
			},
			tickInterval: 2,
			startOnTick: true,
			endOnTick: true,
			showLastLabel: true,
			min:xmin,
			max:xmax

		},
		yAxis : {
			title: {
				text: 'y'
			},
			min : ymin,
			max : ymax,
			plotLines: [{
				width: 2,
				color: '#808080'
			}]
		},
		plotOptions : {
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
		legend : {
			enabled: false
		},
		series : []
	});

	if(title_text.substring(0,5)!="BARXY"){
		chart_id_list.push(id);
		points_list.push(new Queue());
		series_list.push([]);
	}
}

// Function to create a new 3d-chart
var create_new_chart_3d = function(id, no_of_graph,xmin,xmax,ymin,ymax,zmin,zmax,type_chart,title_text, alpha, beta){
	/* id - container id for graph(chart), no_of_graph - number of graphs in output of a block,
	   ymin - minimum y-axis value, ymax - maximum y-axis value,
	   xmin - minimum x-axis value, xmax - maximum x-axis value,
	   zmin - minimum z-axis value, zmax - maximum z-axis value,
	   type_chart - type of chart to be drawn, title_text - title to be given to the chart
	   */

	// convert String values to desired datatype
	xmin = parseFloat(xmin);
	xmax = parseFloat(xmax);
	ymin = parseFloat(ymin);
	ymax = parseFloat(ymax);
	zmin = parseFloat(zmin);
	zmax = parseFloat(zmax);

	var thickness = 1;
	if(title_text.substring(0,9)=="CANIMXY3D")
		thickness = 0;
	
	$('#charts').append("<div id='chart-"+id.toString()+"' style = 'height:200px'></div>");

	// change graph height if block has only 1 output graph
	if(no_of_graph == 1)
		$('#chart-'+id.toString()).css('height','400px'); 

	$('#chart-'+id.toString()).highcharts({
		chart: {

			type: 'scatter',
			zoomtype: 'xy',
			options3d: {
				enabled: true,
				
				alpha: alpha,
				beta: beta,
				depth: 200,
				viewDistance: 5,
				frame: {
					bottom: {
						size: 0,
						color: '#FFFFFF'
					}
				}
			}
		},
		title: {
			text: title_text
		},
		yAxis: {
			min: ymin,
			max: ymax
		},
		xAxis: {
			min: xmin,
			max: xmax,
			gridLineWidth: 1
		},
		zAxis: {
			min: zmin,
			max: zmax
		},
		plotOptions : {
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
		series: []
	});


	chart_id_list.push(id);
	points_list.push(new Queue());
	series_list.push([]);
}



function chart_init(wnd){

	var block;
	// define buffer for CANIMXY3D
	var buffer;
        // buffer for CANIMXY
        var buffer_canimxy;
	// Initialise variable for entry condition of creating chart for BARXY and AFFICH_m
	var block_entry_BARXY = 1, block_entry_AFFICH = 1;

	// Start listening to server
	chart_reset();
	eventSource = new EventSource("/SendLog?id="+clientID);
        
	eventSource.addEventListener("block", function(event){
		var data = event.data.split(' ');
		block = parseInt(data[4]);

		// For BARXY 
		if(block == 11){

			x1  = parseFloat(data[5]),
			y1  = parseFloat(data[6]),
			x2  = parseFloat(data[8]);
			y2  = parseFloat(data[9]);

			if(block_entry_BARXY == 1){

				fig_id = block;
				l_id = fig_id + 1;

		        create_new_chart(fig_id, data[16], data[12], data[13], data[10], data[11], 'line', data[14]+'-'+fig_id);
		        block_entry_BARXY = block_entry_BARXY + 1;
		        var chart = $('#chart-'+fig_id.toString()).highcharts();
		        chart.addSeries({
							id : l_id.toString(),
							data: []
						});
 
			}       


			pnts.push([x1, y1]);
			pnts.push([x2, y2]);

			// Ending condition for blocks not having a dataline for 'Ending'
			if(pnts.length == (this.finalIntegrationTime*10-1)){
				var xhr = new XMLHttpRequest();
			    xhr.open("GET", "/endBlock/"+str(fig_id), true);
			 	xhr.send();
			}



		}


	},false); 




	eventSource.addEventListener("log", function(event){

		var data = event.data.split(' ');
		// store block info. from the data line
		block = parseInt(data[0]);

		// handle writec_f and writeau_f
		if(block==21||block==22){

			console.log(data[5]);
                        //create a form and add the filename to it
			var form = new FormData()
			form.append('path',data[5]);
			var xhr = new XMLHttpRequest();
			xhr.responseType = 'blob';
                        //sending form to get file for download
			xhr.open("POST", "/downloadfile", true);
			xhr.onload = function() {
				if(this.status==200){
                                        //blob data type to receive the file
					var blob=this.response;
					console.log("check");
					var url  = window.URL.createObjectURL(blob);
                                        //popup for download option of the file
					window.open(url);
				}
			};
			xhr.send(form);
			var xhr2= new XMLHttpRequest();
                        xhr2.open("POST","/deletefile");
                        xhr2.onload = function() {
				if(this.status==200){
                                        //blob data type to receive the file
					var x=this.response;
					console.log("File Deleted");
				}
                               };
                        xhr2.send(form);
		}


		if(block < 5 ||block ==9){
			// process data for 2D-SCOPE blocks

			var figure_id = parseInt(data[5]),
			line_id = parseInt(data[7]),
			x  = parseFloat(data[9]),
			y  = parseFloat(data[10]),
			z  = parseFloat(data[11]);
			if(chart_id_list.indexOf(figure_id)<0){

				// set default chart type
				var chart_type = 'line';

				// if sink block is CSCOPXY or CANIMXY
				if(block == 4||block== 9)
				{
             		chart_type = 'scatter';
             		create_new_chart(figure_id,data[12],data[15],data[16],data[13],data[14],chart_type,data[17]+'-'+data[3]);
                        // Set buffer size for CANIMXY
		         if(block == 9)
			     buffer_canimxy = data[18];
             		RANGE[chart_id_list.indexOf(figure_id)]=parseFloat(data[14]);
             	       }
             	// sink block is not CSCOPXY
             	  else{

			        create_new_chart(figure_id,data[12],data[13],data[14],0,data[15],chart_type,data[16]+'-'+data[3]);
			        RANGE[chart_id_list.indexOf(figure_id)]=parseFloat(data[15]);
			    }


			}       
			var index = chart_id_list.indexOf(figure_id);
			// store 2d-data
			points_list[index].enqueue([line_id,x,y]);
			// store block number for chart creation
			block_list[index] = block; 


		}else if(block == 5 || block == 10){
			// process data for 3D-SCOPE blocks

			var figure_id = parseInt(data[5]),
			line_id = parseInt(data[7]),
			x = parseFloat(data[9]),
			y = parseFloat(data[10]), 
			z = parseFloat(data[11]);
			if(chart_id_list.indexOf(figure_id)<0)
			{

				c_type = 'scatter';
				create_new_chart_3d(figure_id,data[12],data[13],data[14],data[15],data[16],data[17],data[18], chart_type, data[19]+'-'+data[3], data[20], data[21]);	
				// Set buffer size for CANIMXY3D
				if(block == 10)
					buffer = data[22];	 

			}       
			var index = chart_id_list.indexOf(figure_id);
			// store 3d-data
			points_list[index].enqueue([line_id,x,y,z]);
			// store block number for chart creation
			block_list[index] = block; 

		}


	}, false);


 	// increase chart size on maximizing of mxWindow
	wnd.addListener(mxEvent.MAXIMIZE,function()
 	{
 		chart_id_list.forEach(function(item,index){

 			$('#chart-'+item.toString()).highcharts().setSize(wnd.div.clientWidth,$('#chart-'+item.toString()).height());
                        
        });

 	});

 	// decrease chart size on normalizing of mxWindow
 	wnd.addListener(mxEvent.NORMALIZE,function()
 	{
 		chart_id_list.forEach(function(item,index){
 			
 			$('#chart-'+item.toString()).highcharts().setSize(wnd.div.clientWidth,$('#chart-'+item.toString()).height());
                        
        });

 	});  

 	// stop scilab process on closing of window
	wnd.addListener(mxEvent.CLOSE,function()
	{
	    var xhr = new XMLHttpRequest();
	    xhr.open("GET", "/stop", true);
	 	chart_reset();
	 	xhr.send();
	});  


	// Error	
	eventSource.addEventListener("ERROR", function(event){
		eventSource.close(); 	// Close connection
		console.log("Error: "+event.data);
		chart_reset();
		if(event.data=="Empty diagram") alert(event.data);
		else alert("Some Error occured!");
		wnd.destroy();
		isDone = true;
	}, false);
	// Stop listening


	eventSource.addEventListener("DONE", function(event){
		eventSource.close(); 	// Close connection

		console.log("Done");
		isDone = true;
	}, false);
	


	interval = setInterval(function(){


		for(var i=0;i<chart_id_list.length;i++){
			// For each chart
			// Get id and points queue
			var figure_id = chart_id_list[i],
			points = points_list[i];
			// get index of the chart
            var index= chart_id_list.indexOf(figure_id);
            var block=block_list[index];
			
			if(block != 10 && block!=9){

				// Get chart container	
				var chart = $('#chart-'+figure_id.toString()).highcharts();
				// Add points
				for(var j=0;j<20 && !points.isEmpty();j++){
					var point = points.dequeue();
					var line_id = point[0];
					x = point[1],
					y = point[2];
					// for 3d-blocks, use depth value also, i.e., "z" value
					if( block == 5 )
						z = point[3];
					// If there is no line with line_id
					// add new line with line_id
					if(series_list[i].indexOf(line_id)<0){
						series_list[i].push(line_id);

						// for CSCOPXY-3D chart, add line to the scatter points
						if(block == 5){

							chart.addSeries({
								id : line_id.toString(),
								lineWidth: 2,
								colorByPoint: false,
								data: []
							});

						}else{
							// for other charts, no extra line parameter is required
							chart.addSeries({
								id : line_id.toString(),
								data: []
							});

						}
					}
					// Get chart data
					var series = chart.get(line_id.toString());

					if(block!=5){
						// If there are more points, remove old points
						if(x>1.5*RANGE[index])
							series.removePoint(0, false);
					}

					// for 3d-charts, add 3d-points (xyz-coordinates)
					if(block == 5)
						series.addPoint([x,y,z], false);
					// for 2d-charts, add 2d-points (xy-coordinates)
					else
						series.addPoint([x,y], false);
				}

			


				if(block < 4){
					// Shift chart axis to display new values(only for blocks requiring shift, i.e, blocks 1-3)
					if(x>(RANGE[index])) 
				 	  chart.xAxis[0].setExtremes(Math.floor(x-(RANGE[index]-1.0)),Math.floor(x+1.0));
			   	}

			   	// do not redraw blocks >= 4 after plotting all points 
				if(!points.isEmpty() || block < 4)
				 	chart.redraw();


			}else if(block==10){
				// Process CANIMXY3D

				// Get chart container	
				var chart = $('#chart-'+figure_id.toString()).highcharts();

				if(!points.isEmpty()){
					var point = points.dequeue();
					var line_id = point[0];
					x = point[1];
					y = point[2];
					z = point[3];
					if(series_list[i].indexOf(line_id)<0){
						series_list[i].push(line_id);
						chart.addSeries({
							id : line_id.toString(),
							data: []
						});
					}
					// Get chart data
					var series = chart.get(line_id.toString());
					series.addPoint([x,y,z], false);
					if(series.xData.length>buffer)
						series.removePoint(0, false);

					chart.redraw();

				}

                           }
                           else if(block==9){
				// Process CANIMXY

				// Get chart container	
				var chart = $('#chart-'+figure_id.toString()).highcharts();

				if(!points.isEmpty()){
					var point = points.dequeue();
					var line_id = point[0];
					x = point[1];
					y = point[2];

					if(series_list[i].indexOf(line_id)<0){
						series_list[i].push(line_id);
						chart.addSeries({
							id : line_id.toString(),
							data: []
						});
					}
					// Get chart data
					var series = chart.get(line_id.toString());
					series.addPoint([x,y], false);
					if(series.xData.length>buffer_canimxy)
						series.removePoint(0, false);

					chart.redraw();

				}


			}


		}


	}, INTERVAL);


	// Processing 'block' events
	setInterval(function(){
		// display the points for BARXY block
		if(pnts.length>0){

			var chart = $('#chart-'+fig_id.toString()).highcharts();
			// Get chart data
			var series = chart.get(l_id.toString())
			// dequeue the points and add them
			series.addPoint(pnts.shift(), false);
			series.addPoint(pnts.shift(), false);
			chart.redraw(false);
			// Keep last 2 points in Graph
			if((pnts.length)>0){
				series.removePoint(0, false);
				series.removePoint(0, false);
			}
		}
	},5);


}


function chart_reset(){

	clearInterval(interval);
	chart_id_list = [];
	points_list = [];
	series_list = [];
	block_list = [];
	RANGE = [];
	pnts = [];
	block_list = [];

}
