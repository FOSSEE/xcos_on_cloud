/*
	This function is used to extract the values of the properties of a block from the XML.
	The values are either present under the "exprs" node or are scattered over different nodes.
*/
function importParameters ( blockName, codec, currentNode ) {

	var importProperties = {};
	if(blockName.startsWith('LOOKUP_f')) {
	    var points = [];
	    var currentNodeCopy = currentNode;
	    currentNodeCopy = currentNodeCopy.firstChild;
	    currentNodeCopy = currentNodeCopy.nextSibling;
	    currentNodeCopy = currentNodeCopy.firstChild;
	    while(currentNodeCopy != null) {
	        var cellCopy = codec.decode(currentNodeCopy);
	        points.push(cellCopy.realPart);
	        currentNodeCopy = currentNodeCopy.nextSibling;
	    }
	    var xPoints = [];
	    var yPoints = [];
	    var graphPoints = [];
	    for( var i=0 ; i < (points.length/2); i++) {
	        xPoints.push(points[i]);
	        yPoints.push(points[i+(points.length/2)]);
	        graphPoints.push([points[i],points[i+(points.length/2)]]);
	    }
	    var xmin, xmax, ymin, ymax;
	    if(Math.min(...xPoints) < -2.5)
	        xmin = Math.min(...xPoints) - 1;
	    else 
	        xmin = -2.5;
	    if(Math.max(...xPoints) > 2.5)
	        xmax = Math.max(...xPoints) + 1;
	    else
	        xmax = 2.5;
	    if(Math.min(...yPoints) < -1.2)
	        ymin = Math.min(...yPoints) - 1;
	    else
	        ymin = -1.2;
	    if(Math.max(...yPoints) > 1.2)
	        ymax = Math.max(...yPoints) + 1;
	    else
	        ymax = 1.2;
	    importProperties = {graphPoints, xmin, xmax, ymin, ymax };
	}
	if(blockName.startsWith('CSCOPE')) {
	    var currentNodeCopy = currentNode;
	    currentNodeCopy = currentNodeCopy.firstChild;
	    currentNodeCopy = currentNodeCopy.firstChild;
	    var clrs, win, wpos, wdim, ymin, ymax, per, N, heritance, nom;
	    clrs = codec.decode(currentNodeCopy).value.toString();
	    win = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString();
	    wpos = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString().slice(1,-1);
	    if(wpos == "")
	        wpos ="-1 -1";
	    wdim = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString().replace(/;/g," ").slice(1,-1);
	    ymin = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString();
	    ymax = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString();
	    per = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString();
	    N = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString();
	    heritance = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString();
	    nom = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString();
	    
	    importProperties = {clrs, win, wpos, wdim, ymin, ymax, per, N, heritance, nom};
	}
	if(blockName.startsWith('GENSIN_f')) {
	    var currentNodeCopy = currentNode;
	    currentNodeCopy = currentNodeCopy.firstChild;
	    currentNodeCopy = currentNodeCopy.firstChild;
	    var M, F, P;
	    M = codec.decode(currentNodeCopy).value.toString();
	    F = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString();
	    P = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString();
	    importProperties = {M, F, P};
	}
	if(blockName.startsWith('CLOCK_c')) {
	    var dt, d0;
	    var currentNodeCopy = currentNode;
	    currentNodeCopy = currentNodeCopy.firstChild;
	    currentNodeCopy = currentNodeCopy.nextSibling;
	    currentNodeCopy = currentNodeCopy.firstChild;
	    currentNodeCopy = currentNodeCopy.nextSibling;
	    currentNodeCopy = currentNodeCopy.nextSibling;
	    currentNodeCopy = currentNodeCopy.firstChild;
	    currentNodeCopy = currentNodeCopy.nextSibling;
	    currentNodeCopy = currentNodeCopy.firstChild;
	    currentNodeCopy = currentNodeCopy.nextSibling;
	    currentNodeCopy = currentNodeCopy.firstChild;
	    currentNodeCopy = currentNodeCopy.nextSibling;
	    currentNodeCopy = currentNodeCopy.nextSibling;
	    currentNodeCopy = currentNodeCopy.nextSibling;
	    currentNodeCopy = currentNodeCopy.nextSibling;
	    currentNodeCopy = currentNodeCopy.nextSibling;
	    
	    dt = codec.decode(currentNodeCopy = currentNodeCopy.firstChild).value.toString();
	    t0 = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString();
	    importProperties = {dt, t0};
	}
	if(blockName.startsWith('JKFLIPFLOP')) {
	    var initialvalue;
	    var currentNodeCopy = currentNode;
	    currentNodeCopy = currentNodeCopy.firstChild;
	    currentNodeCopy = currentNodeCopy.nextSibling;
	    currentNodeCopy = currentNodeCopy.firstChild;
	    currentNodeCopy = currentNodeCopy.nextSibling;
	    currentNodeCopy = currentNodeCopy.nextSibling;
	    currentNodeCopy = currentNodeCopy.firstChild;
	    currentNodeCopy = currentNodeCopy.firstChild;
	    currentNodeCopy = currentNodeCopy.nextSibling;
	    currentNodeCopy = currentNodeCopy.firstChild;
	    currentNodeCopy = currentNodeCopy.nextSibling;
	    currentNodeCopy = currentNodeCopy.nextSibling;
	    currentNodeCopy = currentNodeCopy.nextSibling;
	    currentNodeCopy = currentNodeCopy.nextSibling;
	    currentNodeCopy = currentNodeCopy.nextSibling;
	    
	    initialvalue = codec.decode(currentNodeCopy = currentNodeCopy.firstChild).value;
	    importProperties = {initialvalue};
	}
	if(blockName.startsWith('BIGSOM_f')) {
	    var sgn;
	    var currentNodeCopy = currentNode;
	    currentNodeCopy = currentNodeCopy.firstChild;
	    sgn = codec.decode(currentNodeCopy = currentNodeCopy.firstChild).value.toString().replace(/;/g," ").slice(1,-1);
	    importProperties = {sgn};
	}
	if( blockName.startsWith('CMSCOPE') ) {
	    var in1, clrs, win, wpos, wdim, ymin, ymax, per, N, heritance, nom;
	    var currentNodeCopy = currentNode;
	    currentNodeCopy = currentNodeCopy.firstChild;
	    currentNodeCopy = currentNodeCopy.firstChild;

	    in1 = codec.decode(currentNodeCopy).value.toString();
	    clrs = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString();
	    win = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString();
	    wpos = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString();
	    wdim = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString();
	    ymin = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString();
	    ymax = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString();
	    per = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString();
	    N =codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString();
	    heritance = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString();
	    nom = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString();

	    importProperties = {in1, clrs, win, wpos, wdim, ymin, ymax, per, N, heritance, nom};
	}
	if( blockName.startsWith('CONST_m') ) {
		var currentNodeCopy = currentNode;
	    currentNodeCopy = currentNodeCopy.firstChild;
	    currentNodeCopy = currentNodeCopy.firstChild;

	    var vec = codec.decode(currentNodeCopy).value.toString();
	    importProperties = { vec };
	}
	if( blockName.startsWith('CONVERT') ) {
		var it, ot ,np;
		var currentNodeCopy = currentNode;
	    currentNodeCopy = currentNodeCopy.firstChild;
	    currentNodeCopy = currentNodeCopy.firstChild;

	    it = codec.decode(currentNodeCopy).value.toString();
	    ot = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString();
	    np = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString();
	   	
	   	importProperties = { it, ot, np};
	}
	if( blockName.startsWith('CSCOPXY') ) {

		var nbr_curves, clrs, siz, win, wpos, wdim, xmin, xmax, ymin, ymax, N;
		var currentNodeCopy = currentNode;
	    currentNodeCopy = currentNodeCopy.firstChild;
	    currentNodeCopy = currentNodeCopy.firstChild;
	    nbr_curves = codec.decode(currentNodeCopy).value.toString();
	    clrs = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString();
	    siz = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString();
	    win = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString();
	    wpos = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString();
	    wdim = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString().replace(/;/g," ").slice(1,-1);
	    xmin = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString();
	    xmax = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString();
	    ymin = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString();
	    ymax = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString();
	    N = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString();

	    importProperties = { nbr_curves, clrs, siz, win, wpos, wdim, xmin, xmax, ymin ,ymax, N};
	}
	if( blockName.startsWith('DEMUX') ) {

		var currentNodeCopy = currentNode;
	    currentNodeCopy = currentNodeCopy.firstChild;
	    currentNodeCopy = currentNodeCopy.firstChild;
	    
	    var out = codec.decode(currentNodeCopy).value.toString();
	    importProperties = { out };
	}
	if( blockName.startsWith('DOLLAR_f') ) {

		var currentNodeCopy = currentNode;
	    currentNodeCopy = currentNodeCopy.firstChild;
	    currentNodeCopy = currentNodeCopy.firstChild;
	    
	    var a = codec.decode(currentNodeCopy).value.toString();
	    var inh = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString();
	    importProperties = { a, inh };
	}
	if( blockName.startsWith('INTEGRAL') ) {

		var currentNodeCopy = currentNode;
	    currentNodeCopy = currentNodeCopy.firstChild;
	    currentNodeCopy = currentNodeCopy.firstChild;
	    
	    var x0 = codec.decode(currentNodeCopy).value.toString();
	    importProperties = { x0 };
	}
	// if( blockName.startsWith('IN_f') ) {

	// 	var prt, otsz, ot;
	// 	var currentNodeCopy = currentNode;
	//     currentNodeCopy = currentNodeCopy.firstChild;
	//     currentNodeCopy = currentNodeCopy.firstChild;
	    
	//     prt = codec.decode(currentNodeCopy).value.toString();
	//     otsz = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString();
	//     ot = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString();
	//     importProperties = { prt, otsz, ot };
	//     console.log(importProperties);
	// }
	if( blockName.startsWith('LOGICAL_OP') ) {

			var nin, oprt, bit, data;
			var currentNodeCopy = currentNode;
		    currentNodeCopy = currentNodeCopy.firstChild;
		    currentNodeCopy = currentNodeCopy.firstChild;
		    
		    nin = codec.decode(currentNodeCopy).value.toString();
		    oprt = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString();
		    data = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString();
		    bit = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString();
		    importProperties = { nin, oprt, data, bit};
	}
	if( blockName.startsWith('MUX') ) {

		var inp;
		var currentNodeCopy = currentNode;
	    currentNodeCopy = currentNodeCopy.firstChild;
	    currentNodeCopy = currentNodeCopy.firstChild;
	    
	    inp = codec.decode(currentNodeCopy).value.toString();
	    importProperties = { inp };
	}
	if( blockName.startsWith('NRMSOM_f') ) {

		var nin;
		var currentNodeCopy = currentNode;
	    currentNodeCopy = currentNodeCopy.firstChild;
	    currentNodeCopy = currentNodeCopy.firstChild;
	    
	    nin = codec.decode(currentNodeCopy).value.toString();
	    importProperties = { nin };
	}
	// if( blockName.startsWith('OUT_f') ) {

	// 	var prt;
	// 	var currentNodeCopy = currentNode;
	//     currentNodeCopy = currentNodeCopy.firstChild;
	//     currentNodeCopy = currentNodeCopy.firstChild;
	    
	//     prt = codec.decode(currentNodeCopy).value.toString();
	//     importProperties = { prt };
	// }
	if( blockName.startsWith('PRODUCT') ) {

		var sgn;
		var currentNodeCopy = currentNode;
	    currentNodeCopy = currentNodeCopy.firstChild;
	    currentNodeCopy = currentNodeCopy.firstChild;
	    
	    sgn = codec.decode(currentNodeCopy).value.toString().replace(/;/g," ").slice(1,-1);
	    importProperties = { sgn };
	}
	if( blockName.startsWith('RELATIONALOP') ) {

		var oprt, zcr, data;
		var currentNodeCopy = currentNode;
	    currentNodeCopy = currentNodeCopy.firstChild;
	    currentNodeCopy = currentNodeCopy.firstChild;
	    
	    oprt = codec.decode(currentNodeCopy).value.toString();
	    zcr = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString();
	    data = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString();
	    
	    importProperties = { oprt, zcr, data };
	}
	if( blockName.startsWith('SATURATION') ) {

		var maxp, minp, zeroc;
		var currentNodeCopy = currentNode;
	    currentNodeCopy = currentNodeCopy.firstChild;
	    currentNodeCopy = currentNodeCopy.firstChild;
	    
	    maxp = codec.decode(currentNodeCopy).value.toString();
	    minp = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString();
	    zeroc = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString();
	    
	    importProperties = { maxp, minp, zeroc};
	}
	if( blockName.startsWith('SWITCH2_m') ) {

		var ot, rule, thra, nzz;
		var currentNodeCopy = currentNode;
	    currentNodeCopy = currentNodeCopy.firstChild;
	    currentNodeCopy = currentNodeCopy.firstChild;
	    
	    ot = codec.decode(currentNodeCopy).value.toString();
	    rule = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString();
	    thra = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString();
	    nzz = codec.decode(currentNodeCopy = currentNodeCopy.nextSibling).value.toString();
	    
	    importProperties = { ot, rule, thra, nzz};
	}
	// if( blockName.startsWith('TEXT_f') ) {

	// 	var tag
	// 	var currentNodeCopy = currentNode;
	//     currentNodeCopy = currentNodeCopy.firstChild;
	//     currentNodeCopy = currentNodeCopy.firstChild;
	    
	//     tag = codec.decode(currentNodeCopy).value.toString();
	//     importProperties = { tag };
	// }
	return importProperties;
}
