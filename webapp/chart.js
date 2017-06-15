var chart_id_list = [];
var points_list = [];
var series_list = [];
var block_list = []; // modified_shank
var INTERVAL = 10;
//var RANGE = 30;
var RANGE = [];
var eventSource;
var clientID;
var interval;
var isDone = false;



var create_new_chart = function(id, no_of_graph,ymin,ymax,xmin,xmax,type_chart,title_text){
	// Function to create a new chart
	xmin = parseFloat(xmin);
	xmax = parseFloat(xmax);
	ymin = parseFloat(ymin);
	ymax = parseFloat(ymax);
	
	$('#charts').append("<div id='chart-"+id.toString()+"' style = 'height:200px'></div>");

        if(no_of_graph == 1)
        $('#chart-'+id.toString()).css('height','300px');    // modified_shank 

	$('#chart-'+id.toString()).highcharts({
		chart: {
			type: type_chart,// modified_shank
			animation: false
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
				 width: 1,
				 color: '#808080'
			  }]
		   },
		   plotOptions : {
				marker: {
					enabled: false
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
		   exporting : {
			  enabled: false
		   },
		   series : []
	});
	chart_id_list.push(id);
	points_list.push(new Queue());
	series_list.push([]);
}
    
// modified_shank
var create_new_chart_3d = function(id, no_of_graph,xmin,xmax,ymin,ymax,zmin,zmax,type_chart,title_text){
	// Function to create a new chart
	xmin = parseFloat(xmin);
	xmax = parseFloat(xmax);
	ymin = parseFloat(ymin);
	ymax = parseFloat(ymax);
	zmin = parseFloat(zmin);
	zmax = parseFloat(zmax);
	
	$('#charts').append("<div id='chart-"+id.toString()+"' style = 'height:200px'></div>");

        if(no_of_graph == 1)
        $('#chart-'+id.toString()).css('height','300px');    // modified_shank 

	$('#chart-'+id.toString()).highcharts({
        chart: {

            type: 'scatter',
            options3d: {
				enabled: true,
                alpha: 20,
                beta: 30,
                depth: 200,
                frame: {
                    bottom: {
                        size: 1,
                        color: '#FFFFFF'
                    }
                }
            }
        },
        title: {
            text: title_text
        },
        yAxis: {
            min: zmin,
            max: zmax
        },
        xAxis: {
            min: xmin,
            max: xmax,
            gridLineWidth: 1
        },
        zAxis: {
            min: ymin,
            max: ymax
        },
         tooltip: {
        pointFormat: "x: {point.x} \ny:{point.z} \nz:{point.y} "
  		  },
        plotOptions : {
				marker: {
					enabled: false
				},
                 scatter: {
            marker: {
                radius: 2,
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
//


function chart_init(wnd){
	// Start listening to server
	chart_reset();
    var block;
	eventSource = new EventSource("/SendLog?id="+clientID);
    eventSource.addEventListener("block", function(event){
        block=parseInt(event.data);
        console.log(block);
        },false); 
	eventSource.addEventListener("log", function(event){

       var data = event.data.split(' ');
       block = parseInt(data[0]);
       if(block<5)
       {
		
		var figure_id = parseInt(data[5]),
			line_id = parseInt(data[7]),
			x  = parseFloat(data[9]),
			y  = parseFloat(data[10]),
			z  = parseFloat(data[11]);
		if(chart_id_list.indexOf(figure_id)<0)
		{
			var c_type = 'line';

             if(block == 4)
             {
             		c_type = 'scatter';// modified_shank
             		create_new_chart(figure_id,data[12],data[15],data[16],data[13],data[14],c_type,data[17]+'-'+data[3]);
             }
			 else{
			 	    
			        create_new_chart(figure_id,data[12],data[13],data[14],0,data[15],c_type,data[16]+'-'+data[3]); // modified_shank : added parameters : earlier : figure_id only
			 }
			 
            RANGE[chart_id_list.indexOf(figure_id)]=parseFloat(data[15]);
		}       
                var index = chart_id_list.indexOf(figure_id);
				points_list[index].enqueue([line_id,x,y]);
				block_list[index] = block; // modified_shank

               }

// modified_shank

           else if(block == 5){

			var figure_id = parseInt(data[5]),
			line_id = parseInt(data[7]),
			x  = parseFloat(data[9]),
			z  = parseFloat(data[10]), // y-z interchanged for 3d
			y  = parseFloat(data[11]);
		   if(chart_id_list.indexOf(figure_id)<0)
			{
			           
             	c_type = 'scatter';
             	create_new_chart_3d(figure_id,data[12],data[13],data[14],data[15],data[16],data[17],data[18],data[19]+'-'+data[3]);		 
            	
			}       
                var index = chart_id_list.indexOf(figure_id);
				points_list[index].enqueue([line_id,x,y,z]);
				block_list[index] = block; // modified_shank

               }


//


	}, false);
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

                 //setTimeout(function(){window.open("imgshow.html","ResultDisplay","location=no, menubar=no, toolbar=no, width=640, height=540, scrollbars=no"); }, 1000); // modified_shank : made imgshow.html file
		isDone = true;
	}, false);
	
	interval = setInterval(function(){
		
		 for(var i=0;i<chart_id_list.length;i++){
			// For each chart
			// Get id and points queue
			var figure_id = chart_id_list[i],
				points = points_list[i];
            var index= chart_id_list.indexOf(figure_id);  // modified_shank 
            var block=block_list[index];
			// Get chart container	
			var chart = $('#chart-'+figure_id.toString()).highcharts();
			// Add points
			for(var j=0;j<20 && !points.isEmpty();j++){
				var point = points.dequeue();
				var line_id = point[0];
					x = point[1],
					y = point[2];
					if( block == 5)
						z = point[3];
				// If there is no line with line_id
				// add new line with line_id
				if(series_list[i].indexOf(line_id)<0){
					series_list[i].push(line_id);
					chart.addSeries({
						id : line_id.toString(),
						data: []
					});
				}
				var index = series_list[i].indexOf(line_id); // modified_shank
				// Get chart data
				var series = chart.get(line_id.toString());
				// If there are more points
				// Remove old points
				if(x>1.5*RANGE[index])
					series.removePoint(0, false);
				if(block == 5)
				    series.addPoint([x,y,z], false);
				else
					series.addPoint([x,y], false);
			}
			// Shift chart axis to display new values
			if(block < 4)
			{
			 if(x>(RANGE[index]-1.0)) chart.xAxis[0].setExtremes(Math.floor(x-(RANGE[index]-1.0)),Math.floor(x+1.0)); // modified_shank : for proper x-axis in chart
			}
			// Draw the chart
			if(!points.isEmpty())
			   chart.redraw();
		}
	
	
	}, INTERVAL);
}

function chart_reset(){
	clearInterval(interval);
	chart_id_list = [];
	points_list = [];
	series_list = [];
	block_list = [];
}
