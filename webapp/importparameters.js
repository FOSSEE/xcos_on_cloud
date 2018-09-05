function importBlock(currentNode, cell, details_instance) {
    details_instance.define();
    var model = details_instance.x.model;
    var graphics = details_instance.x.graphics;

    var dependsOnU = (cell.dependsOnU !== undefined && cell.dependsOnU == 1);
    var dependsOnT = (cell.dependsOnT !== undefined && cell.dependsOnT == 1);
    model.dep_ut = new ScilabBoolean([dependsOnU, dependsOnT]);
    var functionName = null;
    if (cell.simulationFunctionName) {
        functionName = cell.simulationFunctionName;
    }
    var functionType = null;
    switch (cell.simulationFunctionType) {
        case 'ESELECT':                functionType =    -2.0;  break;
        case 'IFTHENELSE':             functionType =    -1.0;  break;
        case 'TYPE_1':                 functionType =     1.0;  break;
        case 'TYPE_2':                 functionType =     2.0;  break;
        case 'TYPE_3':                 functionType =     3.0;  break;
        case 'C_OR_FORTRAN':           functionType =     4.0;  break;
        case 'SCILAB':                 functionType =     5.0;  break;
        case 'DEBUG':                  functionType =    99.0;  break;
        case 'DYNAMIC_FORTRAN_1':      functionType =  1001.0;  break;
        case 'DYNAMIC_C_1':            functionType =  2001.0;  break;
        case 'DYNAMIC_EXPLICIT_4':     functionType =  2004.0;  break;
        case 'OLDBLOCKS':              functionType = 10001.0;  break;
        case 'IMPLICIT_C_OR_FORTRAN':  functionType = 10004.0;  break;
        case 'MODELICA':               functionType = 30004.0;  break;
    }
    if (functionName != null) {
        if (functionType != null) {
            model.sim = list(new ScilabString([functionName]), new ScilabDouble([functionType]));
        } else {
            model.sim = new ScilabString([functionName]);
        }
    }
    if (cell.exprs) {
        graphics.exprs = cell.exprs;
    }
    if (cell.realParameters !== undefined) {
        model.rpar = cell.realParameters;
    }
    if (cell.integerParameters !== undefined) {
        model.ipar = cell.integerParameters;
    }
    if (cell.objectsParameters !== undefined) {
        model.opar = cell.objectsParameters;
    }
    if (cell.nbZerosCrossing !== undefined) {
        model.nzcross = cell.nbZerosCrossing;
    }
    if (cell.nmode !== undefined) {
        model.nmode = cell.nmode;
    }
    if (cell.state !== undefined) {
        model.state = cell.state;
    }
    if (cell.dState !== undefined) {
        model.dstate = cell.dState;
    }
    if (cell.oDState !== undefined) {
        model.odstate = cell.oDState;
    }
    if (cell.equations !== undefined) {
        model.equations = cell.equations;
    }

    var f = details_instance.importset;
    if (typeof f === 'function') {
        /* set the remaining parameters */
        details_instance.importset();
    }

    return details_instance.getContainer();
}

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

ABS_VALUE.prototype.importset = function ABS_VALUE() {
    /* TODO */
}
AFFICH_m.prototype.importset = function AFFICH_m() {
    /* TODO */
}
ANDBLK.prototype.importset = function ANDBLK() {
    /* TODO */
}
ANDLOG_f.prototype.importset = function ANDLOG_f() {
    /* TODO */
}
AUTOMAT.prototype.importset = function AUTOMAT() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.NMode = ary[0];
	this.Minitial = ary[1];
	this.NX = ary[2];
	this.X0 = ary[3];
	this.XP = ary[4];
	this.C1 = ary[5];
	this.C2 = ary[6];
}
Bache.prototype.importset = function Bache() {
    /* TODO */
}
BACKLASH.prototype.importset = function BACKLASH() {	
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.ini = ary[0];
	this.gap = ary[1];
	this.zcr = ary[2];
}
BARXY.prototype.importset = function BARXY() {
    /* TODO */
}
BIGSOM_f.prototype.importset = function BIGSOM_f() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.sgn = ary
}
BITCLEAR.prototype.importset = function BITCLEAR() {
    /* TODO */
}
BITSET.prototype.importset = function BITSET() {
    /* TODO */
}
BOUNCE.prototype.importset = function BOUNCE() {
    /* TODO */
}
BOUNCEXY.prototype.importset = function BOUNCEXY() {
    /* TODO */
}
BPLATFORM.prototype.importset = function BPLATFORM() {
    /* TODO */
}
CANIMXY3D.prototype.importset = function CANIMXY3D() {
    /* TODO */
}
CANIMXY.prototype.importset = function CANIMXY() {
    /* TODO */
}
Capacitor.prototype.importset = function Capacitor() {
    /* TODO */
}
CBLOCK4.prototype.importset = function CBLOCK4() {
    /* TODO */
}
c_block.prototype.importset = function c_block() {
    /* TODO */
}
CBLOCK.prototype.importset = function CBLOCK() {
    /* TODO */
}
CCS.prototype.importset = function CCS() {
    /* TODO */
}
CEVENTSCOPE.prototype.importset = function CEVENTSCOPE() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.nclock = ary[0];
	this.clrs = ary[1];
	this.win = ary[2];
	this.wdim = ary[3];
	this.per = ary[4];
	var model = this.x.model;
	var par = getData(model.ipar);
	this.wpos = par;
}
CFSCOPE.prototype.importset = function CFSCOPE() {
    /* TODO */
}
CLINDUMMY_f.prototype.importset = function CLINDUMMY_f() {
    /* TODO */
}
CLKFROM.prototype.importset = function CLKFROM() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.tag = ary;
	this.displayParameter = [this.tag];
}
CLKGOTO.prototype.importset = function CLKGOTO() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.tag = ary[0];
	this.tagvis = ary[1];
	this.displayParameter = [this.tag];
}
CLKGotoTagVisibility.prototype.importset = function CLKGotoTagVisibility() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.tag = ary;
	this.displayParameter = [this.tag];
}
CLKINV_f.prototype.importset = function CLKINV_f() {
    /* TODO */
}
CLKOUTV_f.prototype.importset = function CLKOUTV_f() {

	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.prt = ary;
	this.displayParameter = [this.prt];
}
CLKSOM_f.prototype.importset = function CLKSOM_f() {
    /* TODO */
}
CLKSOMV_f.prototype.importset = function CLKSOMV_f() {
    /* TODO */
}
CLOCK_c.prototype.importset = function CLOCK_c() {
/*	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.dt = ary[0];
	this.t0 = ary[1];
*/
}
CLR.prototype.importset = function CLR() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.num = ary[0];
	this.den = ary[1];
	this.displayParameter = [[this.num], [this.den]];
}
CLSS.prototype.importset = function CLSS() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.A = ary[0];
	this.B = ary[1];
	this.C = ary[2];
	this.D = ary[3];
	this.x0 = ary[4];
}
CMAT3D.prototype.importset = function CMAT3D() {
    /* TODO */
}
CMATVIEW.prototype.importset = function CMATVIEW() {
    /* TODO */
}
CMSCOPE.prototype.importset = function CMSCOPE() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.ini1 = ary[0];	
	this.clrs = ary[1];
	this.win = ary[2];
	this.wpos = ary[3];
	this.wdim = ary[4];
	this.ymin = ary[5];
	this.ymax = ary[6];
	this.per = ary[7];
	this.N = ary[8];
	this.heritance = ary[9];
	this.nom = ary[10];	
}
ConstantVoltage.prototype.importset = function ConstantVoltage() {
    /* TODO */
}
CONST_f.prototype.importset = function CONST_f() {
    /* TODO */
}
CONST.prototype.importset = function CONST() {
    /* TODO */
}
CONST_m.prototype.importset = function CONST_m() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.c = ary
	this.displayParameter = this.c;
}
CONSTRAINT2_c.prototype.importset = function CONSTRAINT2_c() {
    /* TODO */
}
CONSTRAINT_c.prototype.importset = function CONSTRAINT_c() {
    /* TODO */
}
CONVERT.prototype.importset = function CONVERT() {
    	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.it = ary[0];
	this.ot = ary[1];
	this.np = ary[2];
}
COSBLK_f.prototype.importset = function COSBLK_f() {
    /* TODO */
}
Counter.prototype.importset = function Counter() {
    /* TODO */
}
CSCOPE.prototype.importset = function CSCOPE() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.clrs = ary[0];
	this.win = ary[1];
	this.wpos = ary[2];
	this.wdim = ary[3];
	this.ymin = ary[4];
	this.ymax = ary[5];
	this.per = ary[6];
	this.N = ary[7];
	this.heritance = ary[8];
	this.nom = ary[9];
}
CSCOPXY3D.prototype.importset = function CSCOPXY3D() {
    /* TODO */
}
CSCOPXY.prototype.importset = function CSCOPXY() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.nbr_curves = ary[0];
	this.clrs = ary[1];
	this.siz = ary[2];
	this.win = ary[3];
	this.wpos = ary[4];
	this.wdim = ary[5];
	this.xmin = ary[6];
	this.xmax = ary[7];
	this.ymin = ary[8];
	this.ymax = ary[9];
	this.N = ary[10];
	
}
CUMSUM.prototype.importset = function CUMSUM() {
    /* TODO */
}
CurrentSensor.prototype.importset = function CurrentSensor() {
    /* TODO */
}
CURV_f.prototype.importset = function CURV_f() {
    /* TODO */
}
CVS.prototype.importset = function CVS() {
    /* TODO */
}
DEADBAND.prototype.importset = function DEADBAND() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.maxp = ary[0];
	this.minp = ary[1];
	this.zeroc = ary[2];
}
DEBUG.prototype.importset = function DEBUG() {
    /* TODO */
}
DELAY_f.prototype.importset = function DELAY_f() {
/*	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.zz0 = ary;
	var model = this.x.model;
	var par = getData(model.rpar);
	this.dt = par;
*/
}
DELAYV_f.prototype.importset = function DELAYV_f() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.nin = ary[0];
	this.zz0 = ary[1];
	this.T = ary[2];
}
DEMUX_f.prototype.importset = function DEMUX_f() {
    /* TODO */
}
DEMUX.prototype.importset = function DEMUX() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.out = ary
}
DERIV.prototype.importset = function DERIV() {
    /* TODO */
}
DFLIPFLOP.prototype.importset = function DFLIPFLOP() {
    /* TODO */
}
DIFF_f.prototype.importset = function DIFF_f() {
    /* TODO */
}
Diode.prototype.importset = function Diode() {
    /* TODO */
}
DLATCH.prototype.importset = function DLATCH() {
    /* TODO */
}
DLRADAPT_f.prototype.importset = function DLRADAPT_f() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.p = ary[0];
	this.rn = ary[1];
	this.rd = ary[2];
	this.g = ary[3];
	this.last_u = ary[4];
	this.last_y = ary[5];
}
DLR.prototype.importset = function DLR() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.num = ary[0];
	this.den = ary[1];
	this.displayParameter = [[this.num], [this.den]];
}
DLSS.prototype.importset = function DLSS() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.A = ary[0];
	this.B = ary[1];
	this.C = ary[2];
	this.D = ary[3];
	this.x0 = ary[4];
}
DOLLAR_f.prototype.importset = function DOLLAR_f() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.a = ary[0];
	this.inh = ary[1];
}
DOLLAR.prototype.importset = function DOLLAR() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.a = ary[0];
	this.inh = ary[1];
}
DOLLAR_m.prototype.importset = function DOLLAR_m() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.a = ary[0];
	this.inh = ary[1];
}
EDGE_TRIGGER.prototype.importset = function EDGE_TRIGGER() {
/*	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.edge = ary;
*/
}
EDGETRIGGER.prototype.importset = function EDGETRIGGER() {
    /* TODO */
}
ENDBLK.prototype.importset = function ENDBLK() {
/*	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.simulationtime = ary;
*/
}
END_c.prototype.importset = function END_c() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.tf = ary;
}
ESELECT_f.prototype.importset = function ESELECT_f() {
   	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.out = ary[0];
	this.inh = ary[1];
	this.nmod = ary[2];
}
EVTDLY_c.prototype.importset = function EVTDLY_c() {
   	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.dt = ary[0];
	this.ff	 = ary[1];
	this.displayParameter = this.dt;
}
EVTDLY_f.prototype.importset = function EVTDLY_f() {
    /* TODO */
}
EVTGEN_f.prototype.importset = function EVTGEN_f() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.tt = ary;
	this.displayParameter = this.tt;
}
EVTVARDLY.prototype.importset = function EVTVARDLY() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.fir = ary;
}
EXPBLK_m.prototype.importset = function EXPBLK_m() {
    /* TODO */
}
Extract_Activation.prototype.importset = function Extract_Activation() {
    /* TODO */
}
EXTRACTBITS.prototype.importset = function EXTRACTBITS() {
    /* TODO */
}
EXTRACT.prototype.importset = function EXTRACT() {
    /* TODO */
}
EXTRACTOR.prototype.importset = function EXTRACTOR() {
    /* TODO */
}
EXTTRI.prototype.importset = function EXTTRI() {
    /* TODO */
}
Flowmeter.prototype.importset = function Flowmeter() {
    /* TODO */
}
fortran_block.prototype.importset = function fortran_block() {
    /* TODO */
}
freq_div.prototype.importset = function freq_div() {
    /* TODO */
}
FROM.prototype.importset = function FROM() {
    /* TODO */
}
FROMMO.prototype.importset = function FROMMO() {
    /* TODO */
}
FROMWSB.prototype.importset = function FROMWSB() {
    /* TODO */
}
GAINBLK_f.prototype.importset = function GAINBLK_f() {
    /* TODO */
}
GAINBLK.prototype.importset = function GAINBLK() {
    /* TODO */
}
GAIN_f.prototype.importset = function GAIN_f() {
    /* TODO */
}
GENERAL_f.prototype.importset = function GENERAL_f() {
    /* TODO */
}
generic_block3.prototype.importset = function generic_block3() {
    /* TODO */
}
GENSIN_f.prototype.importset = function GENSIN_f() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.M = ary[0];
	this.F = ary[1];
	this.P = ary[2];
}
GENSQR_f.prototype.importset = function GENSQR_f() {
    /* TODO */
}
GOTO.prototype.importset = function GOTO() {
    /* TODO */
}
GOTOMO.prototype.importset = function GOTOMO() {
    /* TODO */
}
GotoTagVisibility.prototype.importset = function GotoTagVisibility() {
    /* TODO */
}
GotoTagVisibilityMO.prototype.importset = function GotoTagVisibilityMO() {
    /* TODO */
}
Ground.prototype.importset = function Ground() {
    /* TODO */
}
Gyrator.prototype.importset = function Gyrator() {
    /* TODO */
}
HALT_f.prototype.importset = function HALT_f() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.n = ary;
}
HYSTHERESIS.prototype.importset = function HYSTHERESIS() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.high_lim = ary[0];
	this.low_lim = ary[1];
	this.out_high = ary[2];
	this.out_low = ary[3];
	this.nzz = ary[4];
}
IdealTransformer.prototype.importset = function IdealTransformer() {
    /* TODO */
}
IFTHEL_f.prototype.importset = function IFTHEL_f() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.inh = ary[0];
	this.nmod = ary[1];
}
Inductor.prototype.importset = function Inductor() {
    /* TODO */
}
IN_f.prototype.importset = function IN_f() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.prt = ary[0];
	this.otsz = ary[1];
	this.ot = ary[2];
}
INIMPL_f.prototype.importset = function INIMPL_f() {
    /* TODO */
}
INTEGRAL_f.prototype.importset = function INTEGRAL_f() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.x0 = ary;
}
INTEGRAL_m.prototype.importset = function INTEGRAL_m() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.x0 = ary[0];
	this.reinit = ary[1];
	this.satur = ary[2];
	this.maxp = ary[3];
	this.lowp = ary[4];
	this.minp = ary[4];
}
INTMUL.prototype.importset = function INTMUL() {
    /* TODO */
}
INTRP2BLK_f.prototype.importset = function INTRP2BLK_f() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.a = ary[0];
	this.b = ary[1];
	this.c = ary[2];
}
INTRPLBLK_f.prototype.importset = function INTRPLBLK_f() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.a = ary[0];
	this.b = ary[1];

}
INVBLK.prototype.importset = function INVBLK() {
    /* TODO */
}
ISELECT_m.prototype.importset = function ISELECT_m() {
    /* TODO */
}
JKFLIPFLOP.prototype.importset = function JKFLIPFLOP() {
/* 	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.initialvalue = ary
*/
}
LOGBLK_f.prototype.importset = function LOGBLK_f() {
    /* TODO */
}
LOGICAL_OP.prototype.importset = function LOGICAL_OP() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.nin = ary[0];
	this.oprt = ary[1];
	this.data = ary[2];
	this.bit = ary[3];
	this.displayParameter = [this.label];
}
LOGIC.prototype.importset = function LOGIC() {
    /* TODO */
}
LOOKUP_f.prototype.importset = function LOOKUP_f() {
	var model = this.x.model;
	var par = getData(model.rpar);
	this.graphpoints = par;
}
MATBKSL.prototype.importset = function MATBKSL() {
    /* TODO */
}
MATCATH.prototype.importset = function MATCATH() {
    /* TODO */
}
MATCATV.prototype.importset = function MATCATV() {
    /* TODO */
}
MATDET.prototype.importset = function MATDET() {
    /* TODO */
}
MATDIAG.prototype.importset = function MATDIAG() {
    /* TODO */
}
MATDIV.prototype.importset = function MATDIV() {
    /* TODO */
}
MATEIG.prototype.importset = function MATEIG() {
    /* TODO */
}
MATEXPM.prototype.importset = function MATEXPM() {
    /* TODO */
}
MATINV.prototype.importset = function MATINV() {
    /* TODO */
}
MATLU.prototype.importset = function MATLU() {
    /* TODO */
}
MATMAGPHI.prototype.importset = function MATMAGPHI() {
    /* TODO */
}
MATMUL.prototype.importset = function MATMUL() {
    /* TODO */
}
MATPINV.prototype.importset = function MATPINV() {
    /* TODO */
}
MATRESH.prototype.importset = function MATRESH() {
    /* TODO */
}
MATSING.prototype.importset = function MATSING() {
    /* TODO */
}
MATSUM.prototype.importset = function MATSUM() {
    /* TODO */
}
MATTRAN.prototype.importset = function MATTRAN() {
    /* TODO */
}
MATZCONJ.prototype.importset = function MATZCONJ() {
    /* TODO */
}
MATZREIM.prototype.importset = function MATZREIM() {
    /* TODO */
}
MAX_f.prototype.importset = function MAX_f() {
    /* TODO */
}
MAXMIN.prototype.importset = function MAXMIN() {
    /* TODO */
}
MBLOCK.prototype.importset = function MBLOCK() {
    /* TODO */
}
MCLOCK_f.prototype.importset = function MCLOCK_f() {
/*	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.dt = ary[0];
	this.nn = ary[1];
*/
}
MFCLCK_f.prototype.importset = function MFCLCK_f() {
    /* TODO */
}
M_freq.prototype.importset = function M_freq() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.frequ = ary[0];
	this.offset = ary[1];
}
MIN_f.prototype.importset = function MIN_f() {
    /* TODO */
}
Modulo_Count.prototype.importset = function Modulo_Count() {
    /* TODO */
}
M_SWITCH.prototype.importset = function M_SWITCH() {
    /* TODO */
}
MUX_f.prototype.importset = function MUX_f() {
    /* TODO */
}
MUX.prototype.importset = function MUX() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.in = ary;
}
NEGTOPOS_f.prototype.importset = function NEGTOPOS_f() {
    /* TODO */
}
NMOS.prototype.importset = function NMOS() {
    /* TODO */
}
NPN.prototype.importset = function NPN() {
    /* TODO */
}
NRMSOM_f.prototype.importset = function NRMSOM_f() {
   	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.nin = ary;
}
OpAmp.prototype.importset = function OpAmp() {
    /* TODO */
}
OUT_f.prototype.importset = function OUT_f() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.prt = ary;
	this.displayParameter = this.prt;
}
OUTIMPL_f.prototype.importset = function OUTIMPL_f() {
    /* TODO */
}
PDE.prototype.importset = function PDE() {
    /* TODO */
}
PerteDP.prototype.importset = function PerteDP() {
    /* TODO */
}
PID.prototype.importset = function PID() {
    /* TODO */
}
PMOS.prototype.importset = function PMOS() {
    /* TODO */
}
PNP.prototype.importset = function PNP() {
    /* TODO */
}
POSTONEG_f.prototype.importset = function POSTONEG_f() {
    /* TODO */
}
PotentialSensor.prototype.importset = function PotentialSensor() {
    /* TODO */
}
POWBLK_f.prototype.importset = function POWBLK_f() {
    /* TODO */
}
PROD_f.prototype.importset = function PROD_f() {
    /* TODO */
}
PRODUCT.prototype.importset = function PRODUCT() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.sgn = ary;
}
PuitsP.prototype.importset = function PuitsP() {
    /* TODO */
}
PULSE_SC.prototype.importset = function PULSE_SC() {
    /* TODO */
}
QUANT_f.prototype.importset = function QUANT_f() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.pas = ary[0];
	this.meth = ary[1];
}
RAMP.prototype.importset = function RAMP() {
    /* TODO */
}
RAND_m.prototype.importset = function RAND_m() {
    /* TODO */
}
RATELIMITER.prototype.importset = function RATELIMITER() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.maxp = ary[0];
	this.minp = ary[1];
}
READAU_f.prototype.importset = function READAU_f() {
    /* TODO */
}
READC_f.prototype.importset = function READC_f() {
    /* TODO */
}
REGISTER_f.prototype.importset = function REGISTER_f() {
    /* TODO */
}
REGISTER.prototype.importset = function REGISTER() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.z0 = ary[0];
	this.it = ary[1];
}
RELATIONALOP.prototype.importset = function RELATIONALOP() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.oprt = ary[0];
	this.zcr = ary[1];
	this.data = ary[2];
}
RELAY_f.prototype.importset = function RELAY_f() {
    /* TODO */
}
Resistor.prototype.importset = function Resistor() {
    /* TODO */
}
RFILE_f.prototype.importset = function RFILE_f() {
    /* TODO */
}
RICC.prototype.importset = function RICC() {
    /* TODO */
}
ROOTCOEF.prototype.importset = function ROOTCOEF() {
    /* TODO */
}
SAMPHOLD_m.prototype.importset = function SAMPHOLD_m() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.it = ary;
}
SampleCLK.prototype.importset = function SampleCLK() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.frequ = ary[0];
	this.offset = ary[1];
}
SATURATION.prototype.importset = function SATURATION() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.maxp = ary[0];
	this.minp = ary[1];
	this.zeroc = ary[2]
}
SAWTOOTH_f.prototype.importset = function SAWTOOTH_f() {
    /* TODO */
}
SCALAR2VECTOR.prototype.importset = function SCALAR2VECTOR() {
    /* TODO */
}
scifunc_block_m.prototype.importset = function scifunc_block_m() {
    /* TODO */
}
SELECT_m.prototype.importset = function SELECT_m() {
    /* TODO */
}
SELF_SWITCH.prototype.importset = function SELF_SWITCH() {
    /* TODO */
}
SHIFT.prototype.importset = function SHIFT() {
    /* TODO */
}
Sigbuilder.prototype.importset = function Sigbuilder() {
    /* TODO */
}
SIGNUM.prototype.importset = function SIGNUM() {
    /* TODO */
}
SINBLK_f.prototype.importset = function SINBLK_f() {
    /* TODO */
}
SineVoltage.prototype.importset = function SineVoltage() {
    /* TODO */
}
SOM_f.prototype.importset = function SOM_f() {
    /* TODO */
}
SourceP.prototype.importset = function SourceP() {
    /* TODO */
}
SQRT.prototype.importset = function SQRT() {
    /* TODO */
}
SRFLIPFLOP.prototype.importset = function SRFLIPFLOP() {
    /* TODO */
}
STEP_FUNCTION.prototype.importset = function STEP_FUNCTION() {
    /* TODO */
}
SUBMAT.prototype.importset = function SUBMAT() {
    /* TODO */
}
SUM_f.prototype.importset = function SUM_f() {
    /* TODO */
}
SUMMATION.prototype.importset = function SUMMATION() {
    /* TODO */
}
SUPER_f.prototype.importset = function SUPER_f() {
    /* TODO */
}
SWITCH2_m.prototype.importset = function SWITCH2_m() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.ot = ary[0];
	this.rule = ary[1];
	this.thra = ary[2];
	this.nzz = ary[3]
}
SWITCH_f.prototype.importset = function SWITCH_f() {
    /* TODO */
}
Switch.prototype.importset = function Switch() {
    /* TODO */
}
TANBLK_f.prototype.importset = function TANBLK_f() {
    /* TODO */
}
TCLSS.prototype.importset = function TCLSS() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.A = ary[0];
	this.B = ary[1];
	this.C = ary[2];
	this.D = ary[3];
	this.x0 = ary[4];
}
TEXT_f.prototype.importset = function TEXT_f() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.tag = ary[0];
	this.displayParameter=[this.tag];
}
TIME_DELAY.prototype.importset = function TIME_DELAY() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.T = ary[0];
	this.init = ary[1];
	this.N = ary[2];
}
TIME_f.prototype.importset = function TIME_f() {
    /* TODO */
}
TKSCALE.prototype.importset = function TKSCALE() {
    /* TODO */
}
TOWS_c.prototype.importset = function TOWS_c() {
    /* TODO */
}
TRASH_f.prototype.importset = function TRASH_f() {
    /* TODO */
}
TrigFun.prototype.importset = function TrigFun() {
    /* TODO */
}
VanneReglante.prototype.importset = function VanneReglante() {
    /* TODO */
}
VARIABLE_DELAY.prototype.importset = function VARIABLE_DELAY() {
	var graphics = this.x.graphics;
	var ary = getData(graphics.exprs);
	this.T = ary[0];
	this.init = ary[1];
	this.N = ary[2];
}
VariableResistor.prototype.importset = function VariableResistor() {
    /* TODO */
}
VirtualCLK0.prototype.importset = function VirtualCLK0() {
    /* TODO */
}
VoltageSensor.prototype.importset = function VoltageSensor() {
    /* TODO */
}
VsourceAC.prototype.importset = function VsourceAC() {
    /* TODO */
}
VVsourceAC.prototype.importset = function VVsourceAC() {
    /* TODO */
}
WRITEAU_f.prototype.importset = function WRITEAU_f() {
    /* TODO */
}
WRITEC_f.prototype.importset = function WRITEC_f() {
    /* TODO */
}
ZCROSS_f.prototype.importset = function ZCROSS_f() {
    /* TODO */
}

/* Below code is autogenerated. Do not edit. */
ABS_VALUE.prototype.getContainer = function ABS_VALUE() { return new BasicBlock(this.x); }
AFFICH_m.prototype.getContainer = function AFFICH_m() { return new AfficheBlock(this.x); }
ANDBLK.prototype.getContainer = function ANDBLK() { return new BasicBlock(this.x); }
ANDLOG_f.prototype.getContainer = function ANDLOG_f() { return new BasicBlock(this.x); }
AUTOMAT.prototype.getContainer = function AUTOMAT() { return new BasicBlock(this.x); }
Bache.prototype.getContainer = function Bache() { return new BasicBlock(this.x); }
BACKLASH.prototype.getContainer = function BACKLASH() { return new BasicBlock(this.x); }
BARXY.prototype.getContainer = function BARXY() { return new BasicBlock(this.x); }
BIGSOM_f.prototype.getContainer = function BIGSOM_f() { return new BigSom(this.x); }
BITCLEAR.prototype.getContainer = function BITCLEAR() { return new BasicBlock(this.x); }
BITSET.prototype.getContainer = function BITSET() { return new BasicBlock(this.x); }
BOUNCE.prototype.getContainer = function BOUNCE() { return new BasicBlock(this.x); }
BOUNCEXY.prototype.getContainer = function BOUNCEXY() { return new BasicBlock(this.x); }
BPLATFORM.prototype.getContainer = function BPLATFORM() { return new BasicBlock(this.x); }
CANIMXY3D.prototype.getContainer = function CANIMXY3D() { return new BasicBlock(this.x); }
CANIMXY.prototype.getContainer = function CANIMXY() { return new BasicBlock(this.x); }
Capacitor.prototype.getContainer = function Capacitor() { return new BasicBlock(this.x); }
CBLOCK4.prototype.getContainer = function CBLOCK4() { return new BasicBlock(this.x); }
c_block.prototype.getContainer = function c_block() { return new BasicBlock(this.x); }
CBLOCK.prototype.getContainer = function CBLOCK() { return new BasicBlock(this.x); }
CCS.prototype.getContainer = function CCS() { return new BasicBlock(this.x); }
CEVENTSCOPE.prototype.getContainer = function CEVENTSCOPE() { return new BasicBlock(this.x); }
CFSCOPE.prototype.getContainer = function CFSCOPE() { return new BasicBlock(this.x); }
CLINDUMMY_f.prototype.getContainer = function CLINDUMMY_f() { return new BasicBlock(this.x); }
CLKFROM.prototype.getContainer = function CLKFROM() { return new BasicBlock(this.x); }
CLKGOTO.prototype.getContainer = function CLKGOTO() { return new BasicBlock(this.x); }
CLKGotoTagVisibility.prototype.getContainer = function CLKGotoTagVisibility() { return new BasicBlock(this.x); }
CLKINV_f.prototype.getContainer = function CLKINV_f() { return new EventInBlock(this.x); }
CLKOUTV_f.prototype.getContainer = function CLKOUTV_f() { return new EventOutBlock(this.x); }
CLKSOM_f.prototype.getContainer = function CLKSOM_f() { return new BasicBlock(this.x); }
CLKSOMV_f.prototype.getContainer = function CLKSOMV_f() { return new RoundBlock(this.x); }
CLOCK_c.prototype.getContainer = function CLOCK_c() { return new BasicBlock(this.x); }
CLR.prototype.getContainer = function CLR() { return new BasicBlock(this.x); }
CLSS.prototype.getContainer = function CLSS() { return new BasicBlock(this.x); }
CMAT3D.prototype.getContainer = function CMAT3D() { return new BasicBlock(this.x); }
CMATVIEW.prototype.getContainer = function CMATVIEW() { return new BasicBlock(this.x); }
CMSCOPE.prototype.getContainer = function CMSCOPE() { return new BasicBlock(this.x); }
ConstantVoltage.prototype.getContainer = function ConstantVoltage() { return new BasicBlock(this.x); }
CONST_f.prototype.getContainer = function CONST_f() { return new BasicBlock(this.x); }
CONST.prototype.getContainer = function CONST() { return new BasicBlock(this.x); }
CONST_m.prototype.getContainer = function CONST_m() { return new BasicBlock(this.x); }
CONSTRAINT2_c.prototype.getContainer = function CONSTRAINT2_c() { return new BasicBlock(this.x); }
CONSTRAINT_c.prototype.getContainer = function CONSTRAINT_c() { return new BasicBlock(this.x); }
CONVERT.prototype.getContainer = function CONVERT() { return new BasicBlock(this.x); }
COSBLK_f.prototype.getContainer = function COSBLK_f() { return new BasicBlock(this.x); }
Counter.prototype.getContainer = function Counter() { return new BasicBlock(this.x); }
CSCOPE.prototype.getContainer = function CSCOPE() { return new BasicBlock(this.x); }
CSCOPXY3D.prototype.getContainer = function CSCOPXY3D() { return new BasicBlock(this.x); }
CSCOPXY.prototype.getContainer = function CSCOPXY() { return new BasicBlock(this.x); }
CUMSUM.prototype.getContainer = function CUMSUM() { return new BasicBlock(this.x); }
CurrentSensor.prototype.getContainer = function CurrentSensor() { return new BasicBlock(this.x); }
CURV_f.prototype.getContainer = function CURV_f() { return new BasicBlock(this.x); }
CVS.prototype.getContainer = function CVS() { return new BasicBlock(this.x); }
DEADBAND.prototype.getContainer = function DEADBAND() { return new BasicBlock(this.x); }
DEBUG.prototype.getContainer = function DEBUG() { return new BasicBlock(this.x); }
DELAY_f.prototype.getContainer = function DELAY_f() { return new BasicBlock(this.x); }
DELAYV_f.prototype.getContainer = function DELAYV_f() { return new BasicBlock(this.x); }
DEMUX_f.prototype.getContainer = function DEMUX_f() { return new BasicBlock(this.x); }
DEMUX.prototype.getContainer = function DEMUX() { return new BasicBlock(this.x); }
DERIV.prototype.getContainer = function DERIV() { return new BasicBlock(this.x); }
DFLIPFLOP.prototype.getContainer = function DFLIPFLOP() { return new BasicBlock(this.x); }
DIFF_f.prototype.getContainer = function DIFF_f() { return new BasicBlock(this.x); }
Diode.prototype.getContainer = function Diode() { return new BasicBlock(this.x); }
DLATCH.prototype.getContainer = function DLATCH() { return new BasicBlock(this.x); }
DLRADAPT_f.prototype.getContainer = function DLRADAPT_f() { return new BasicBlock(this.x); }
DLR.prototype.getContainer = function DLR() { return new BasicBlock(this.x); }
DLSS.prototype.getContainer = function DLSS() { return new BasicBlock(this.x); }
DOLLAR_f.prototype.getContainer = function DOLLAR_f() { return new BasicBlock(this.x); }
DOLLAR.prototype.getContainer = function DOLLAR() { return new BasicBlock(this.x); }
DOLLAR_m.prototype.getContainer = function DOLLAR_m() { return new BasicBlock(this.x); }
EDGE_TRIGGER.prototype.getContainer = function EDGE_TRIGGER() { return new BasicBlock(this.x); }
EDGETRIGGER.prototype.getContainer = function EDGETRIGGER() { return new BasicBlock(this.x); }
ENDBLK.prototype.getContainer = function ENDBLK() { return new BasicBlock(this.x); }
END_c.prototype.getContainer = function END_c() { return new BasicBlock(this.x); }
ESELECT_f.prototype.getContainer = function ESELECT_f() { return new BasicBlock(this.x); }
EVTDLY_c.prototype.getContainer = function EVTDLY_c() { return new BasicBlock(this.x); }
EVTDLY_f.prototype.getContainer = function EVTDLY_f() { return new BasicBlock(this.x); }
EVTGEN_f.prototype.getContainer = function EVTGEN_f() { return new BasicBlock(this.x); }
EVTVARDLY.prototype.getContainer = function EVTVARDLY() { return new BasicBlock(this.x); }
EXPBLK_m.prototype.getContainer = function EXPBLK_m() { return new BasicBlock(this.x); }
Extract_Activation.prototype.getContainer = function Extract_Activation() { return new BasicBlock(this.x); }
EXTRACTBITS.prototype.getContainer = function EXTRACTBITS() { return new BasicBlock(this.x); }
EXTRACT.prototype.getContainer = function EXTRACT() { return new BasicBlock(this.x); }
EXTRACTOR.prototype.getContainer = function EXTRACTOR() { return new BasicBlock(this.x); }
EXTTRI.prototype.getContainer = function EXTTRI() { return new BasicBlock(this.x); }
Flowmeter.prototype.getContainer = function Flowmeter() { return new BasicBlock(this.x); }
fortran_block.prototype.getContainer = function fortran_block() { return new BasicBlock(this.x); }
freq_div.prototype.getContainer = function freq_div() { return new BasicBlock(this.x); }
FROM.prototype.getContainer = function FROM() { return new BasicBlock(this.x); }
FROMMO.prototype.getContainer = function FROMMO() { return new BasicBlock(this.x); }
FROMWSB.prototype.getContainer = function FROMWSB() { return new BasicBlock(this.x); }
GAINBLK_f.prototype.getContainer = function GAINBLK_f() { return new BasicBlock(this.x); }
GAINBLK.prototype.getContainer = function GAINBLK() { return new BasicBlock(this.x); }
GAIN_f.prototype.getContainer = function GAIN_f() { return new BasicBlock(this.x); }
GENERAL_f.prototype.getContainer = function GENERAL_f() { return new BasicBlock(this.x); }
generic_block3.prototype.getContainer = function generic_block3() { return new BasicBlock(this.x); }
GENSIN_f.prototype.getContainer = function GENSIN_f() { return new BasicBlock(this.x); }
GENSQR_f.prototype.getContainer = function GENSQR_f() { return new BasicBlock(this.x); }
GOTO.prototype.getContainer = function GOTO() { return new BasicBlock(this.x); }
GOTOMO.prototype.getContainer = function GOTOMO() { return new BasicBlock(this.x); }
GotoTagVisibility.prototype.getContainer = function GotoTagVisibility() { return new BasicBlock(this.x); }
GotoTagVisibilityMO.prototype.getContainer = function GotoTagVisibilityMO() { return new BasicBlock(this.x); }
Ground.prototype.getContainer = function Ground() { return new GroundBlock(this.x); }
Gyrator.prototype.getContainer = function Gyrator() { return new BasicBlock(this.x); }
HALT_f.prototype.getContainer = function HALT_f() { return new BasicBlock(this.x); }
HYSTHERESIS.prototype.getContainer = function HYSTHERESIS() { return new BasicBlock(this.x); }
IdealTransformer.prototype.getContainer = function IdealTransformer() { return new BasicBlock(this.x); }
IFTHEL_f.prototype.getContainer = function IFTHEL_f() { return new BasicBlock(this.x); }
Inductor.prototype.getContainer = function Inductor() { return new BasicBlock(this.x); }
IN_f.prototype.getContainer = function IN_f() { return new ExplicitInBlock(this.x); }
INIMPL_f.prototype.getContainer = function INIMPL_f() { return new ImplicitInBlock(this.x); }
INTEGRAL_f.prototype.getContainer = function INTEGRAL_f() { return new BasicBlock(this.x); }
INTEGRAL_m.prototype.getContainer = function INTEGRAL_m() { return new BasicBlock(this.x); }
INTMUL.prototype.getContainer = function INTMUL() { return new BasicBlock(this.x); }
INTRP2BLK_f.prototype.getContainer = function INTRP2BLK_f() { return new BasicBlock(this.x); }
INTRPLBLK_f.prototype.getContainer = function INTRPLBLK_f() { return new BasicBlock(this.x); }
INVBLK.prototype.getContainer = function INVBLK() { return new BasicBlock(this.x); }
ISELECT_m.prototype.getContainer = function ISELECT_m() { return new BasicBlock(this.x); }
JKFLIPFLOP.prototype.getContainer = function JKFLIPFLOP() { return new BasicBlock(this.x); }
LOGBLK_f.prototype.getContainer = function LOGBLK_f() { return new BasicBlock(this.x); }
LOGICAL_OP.prototype.getContainer = function LOGICAL_OP() { return new BasicBlock(this.x); }
LOGIC.prototype.getContainer = function LOGIC() { return new BasicBlock(this.x); }
LOOKUP_f.prototype.getContainer = function LOOKUP_f() { return new BasicBlock(this.x); }
MATBKSL.prototype.getContainer = function MATBKSL() { return new BasicBlock(this.x); }
MATCATH.prototype.getContainer = function MATCATH() { return new BasicBlock(this.x); }
MATCATV.prototype.getContainer = function MATCATV() { return new BasicBlock(this.x); }
MATDET.prototype.getContainer = function MATDET() { return new BasicBlock(this.x); }
MATDIAG.prototype.getContainer = function MATDIAG() { return new BasicBlock(this.x); }
MATDIV.prototype.getContainer = function MATDIV() { return new BasicBlock(this.x); }
MATEIG.prototype.getContainer = function MATEIG() { return new BasicBlock(this.x); }
MATEXPM.prototype.getContainer = function MATEXPM() { return new BasicBlock(this.x); }
MATINV.prototype.getContainer = function MATINV() { return new BasicBlock(this.x); }
MATLU.prototype.getContainer = function MATLU() { return new BasicBlock(this.x); }
MATMAGPHI.prototype.getContainer = function MATMAGPHI() { return new BasicBlock(this.x); }
MATMUL.prototype.getContainer = function MATMUL() { return new BasicBlock(this.x); }
MATPINV.prototype.getContainer = function MATPINV() { return new BasicBlock(this.x); }
MATRESH.prototype.getContainer = function MATRESH() { return new BasicBlock(this.x); }
MATSING.prototype.getContainer = function MATSING() { return new BasicBlock(this.x); }
MATSUM.prototype.getContainer = function MATSUM() { return new BasicBlock(this.x); }
MATTRAN.prototype.getContainer = function MATTRAN() { return new BasicBlock(this.x); }
MATZCONJ.prototype.getContainer = function MATZCONJ() { return new BasicBlock(this.x); }
MATZREIM.prototype.getContainer = function MATZREIM() { return new BasicBlock(this.x); }
MAX_f.prototype.getContainer = function MAX_f() { return new BasicBlock(this.x); }
MAXMIN.prototype.getContainer = function MAXMIN() { return new BasicBlock(this.x); }
MBLOCK.prototype.getContainer = function MBLOCK() { return new BasicBlock(this.x); }
MCLOCK_f.prototype.getContainer = function MCLOCK_f() { return new BasicBlock(this.x); }
MFCLCK_f.prototype.getContainer = function MFCLCK_f() { return new BasicBlock(this.x); }
M_freq.prototype.getContainer = function M_freq() { return new BasicBlock(this.x); }
MIN_f.prototype.getContainer = function MIN_f() { return new BasicBlock(this.x); }
Modulo_Count.prototype.getContainer = function Modulo_Count() { return new BasicBlock(this.x); }
M_SWITCH.prototype.getContainer = function M_SWITCH() { return new BasicBlock(this.x); }
MUX_f.prototype.getContainer = function MUX_f() { return new BasicBlock(this.x); }
MUX.prototype.getContainer = function MUX() { return new BasicBlock(this.x); }
NEGTOPOS_f.prototype.getContainer = function NEGTOPOS_f() { return new BasicBlock(this.x); }
NMOS.prototype.getContainer = function NMOS() { return new BasicBlock(this.x); }
NPN.prototype.getContainer = function NPN() { return new BasicBlock(this.x); }
NRMSOM_f.prototype.getContainer = function NRMSOM_f() { return new BasicBlock(this.x); }
OpAmp.prototype.getContainer = function OpAmp() { return new BasicBlock(this.x); }
OUT_f.prototype.getContainer = function OUT_f() { return new ExplicitOutBlock(this.x); }
OUTIMPL_f.prototype.getContainer = function OUTIMPL_f() { return new ImplicitOutBlock(this.x); }
PDE.prototype.getContainer = function PDE() { return new BasicBlock(this.x); }
PerteDP.prototype.getContainer = function PerteDP() { return new BasicBlock(this.x); }
PID.prototype.getContainer = function PID() { return new BasicBlock(this.x); }
PMOS.prototype.getContainer = function PMOS() { return new BasicBlock(this.x); }
PNP.prototype.getContainer = function PNP() { return new BasicBlock(this.x); }
POSTONEG_f.prototype.getContainer = function POSTONEG_f() { return new BasicBlock(this.x); }
PotentialSensor.prototype.getContainer = function PotentialSensor() { return new BasicBlock(this.x); }
POWBLK_f.prototype.getContainer = function POWBLK_f() { return new BasicBlock(this.x); }
PROD_f.prototype.getContainer = function PROD_f() { return new RoundBlock(this.x); }
PRODUCT.prototype.getContainer = function PRODUCT() { return new Product(this.x); }
PuitsP.prototype.getContainer = function PuitsP() { return new BasicBlock(this.x); }
PULSE_SC.prototype.getContainer = function PULSE_SC() { return new BasicBlock(this.x); }
QUANT_f.prototype.getContainer = function QUANT_f() { return new BasicBlock(this.x); }
RAMP.prototype.getContainer = function RAMP() { return new BasicBlock(this.x); }
RAND_m.prototype.getContainer = function RAND_m() { return new BasicBlock(this.x); }
RATELIMITER.prototype.getContainer = function RATELIMITER() { return new BasicBlock(this.x); }
READAU_f.prototype.getContainer = function READAU_f() { return new BasicBlock(this.x); }
READC_f.prototype.getContainer = function READC_f() { return new BasicBlock(this.x); }
REGISTER_f.prototype.getContainer = function REGISTER_f() { return new BasicBlock(this.x); }
REGISTER.prototype.getContainer = function REGISTER() { return new BasicBlock(this.x); }
RELATIONALOP.prototype.getContainer = function RELATIONALOP() { return new BasicBlock(this.x); }
RELAY_f.prototype.getContainer = function RELAY_f() { return new BasicBlock(this.x); }
Resistor.prototype.getContainer = function Resistor() { return new BasicBlock(this.x); }
RFILE_f.prototype.getContainer = function RFILE_f() { return new BasicBlock(this.x); }
RICC.prototype.getContainer = function RICC() { return new BasicBlock(this.x); }
ROOTCOEF.prototype.getContainer = function ROOTCOEF() { return new BasicBlock(this.x); }
SAMPHOLD_m.prototype.getContainer = function SAMPHOLD_m() { return new BasicBlock(this.x); }
SampleCLK.prototype.getContainer = function SampleCLK() { return new BasicBlock(this.x); }
SATURATION.prototype.getContainer = function SATURATION() { return new BasicBlock(this.x); }
SAWTOOTH_f.prototype.getContainer = function SAWTOOTH_f() { return new BasicBlock(this.x); }
SCALAR2VECTOR.prototype.getContainer = function SCALAR2VECTOR() { return new BasicBlock(this.x); }
scifunc_block_m.prototype.getContainer = function scifunc_block_m() { return new BasicBlock(this.x); }
SELECT_m.prototype.getContainer = function SELECT_m() { return new BasicBlock(this.x); }
SELF_SWITCH.prototype.getContainer = function SELF_SWITCH() { return new BasicBlock(this.x); }
SHIFT.prototype.getContainer = function SHIFT() { return new BasicBlock(this.x); }
Sigbuilder.prototype.getContainer = function Sigbuilder() { return new BasicBlock(this.x); }
SIGNUM.prototype.getContainer = function SIGNUM() { return new BasicBlock(this.x); }
SINBLK_f.prototype.getContainer = function SINBLK_f() { return new BasicBlock(this.x); }
SineVoltage.prototype.getContainer = function SineVoltage() { return new BasicBlock(this.x); }
SOM_f.prototype.getContainer = function SOM_f() { return new BasicBlock(this.x); }
SourceP.prototype.getContainer = function SourceP() { return new BasicBlock(this.x); }
SQRT.prototype.getContainer = function SQRT() { return new BasicBlock(this.x); }
SRFLIPFLOP.prototype.getContainer = function SRFLIPFLOP() { return new BasicBlock(this.x); }
STEP_FUNCTION.prototype.getContainer = function STEP_FUNCTION() { return new BasicBlock(this.x); }
SUBMAT.prototype.getContainer = function SUBMAT() { return new BasicBlock(this.x); }
SUM_f.prototype.getContainer = function SUM_f() { return new RoundBlock(this.x); }
SUMMATION.prototype.getContainer = function SUMMATION() { return new Summation(this.x); }
SUPER_f.prototype.getContainer = function SUPER_f() { return new SuperBlock(this.x); }
SWITCH2_m.prototype.getContainer = function SWITCH2_m() { return new BasicBlock(this.x); }
SWITCH_f.prototype.getContainer = function SWITCH_f() { return new BasicBlock(this.x); }
Switch.prototype.getContainer = function Switch() { return new BasicBlock(this.x); }
TANBLK_f.prototype.getContainer = function TANBLK_f() { return new BasicBlock(this.x); }
TCLSS.prototype.getContainer = function TCLSS() { return new BasicBlock(this.x); }
TEXT_f.prototype.getContainer = function TEXT_f() { return new TextBlock(this.x); }
TIME_DELAY.prototype.getContainer = function TIME_DELAY() { return new BasicBlock(this.x); }
TIME_f.prototype.getContainer = function TIME_f() { return new BasicBlock(this.x); }
TKSCALE.prototype.getContainer = function TKSCALE() { return new BasicBlock(this.x); }
TOWS_c.prototype.getContainer = function TOWS_c() { return new BasicBlock(this.x); }
TRASH_f.prototype.getContainer = function TRASH_f() { return new BasicBlock(this.x); }
TrigFun.prototype.getContainer = function TrigFun() { return new BasicBlock(this.x); }
VanneReglante.prototype.getContainer = function VanneReglante() { return new BasicBlock(this.x); }
VARIABLE_DELAY.prototype.getContainer = function VARIABLE_DELAY() { return new BasicBlock(this.x); }
VariableResistor.prototype.getContainer = function VariableResistor() { return new BasicBlock(this.x); }
VirtualCLK0.prototype.getContainer = function VirtualCLK0() { return new BasicBlock(this.x); }
VoltageSensor.prototype.getContainer = function VoltageSensor() { return new VoltageSensorBlock(this.x); }
VsourceAC.prototype.getContainer = function VsourceAC() { return new BasicBlock(this.x); }
VVsourceAC.prototype.getContainer = function VVsourceAC() { return new BasicBlock(this.x); }
WRITEAU_f.prototype.getContainer = function WRITEAU_f() { return new BasicBlock(this.x); }
WRITEC_f.prototype.getContainer = function WRITEC_f() { return new BasicBlock(this.x); }
ZCROSS_f.prototype.getContainer = function ZCROSS_f() { return new BasicBlock(this.x); }
