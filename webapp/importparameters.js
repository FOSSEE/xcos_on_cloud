function importBlock(currentNode, cell, details_instance) {
    details_instance.define();
    var model = details_instance.x.model;
    console.log("model=", model);
    var graphics = details_instance.x.graphics;
    console.log("graphics=", graphics);

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
            model.sim = list(new ScilabString([functionName]), new ScilabDouble([functionType]))
        } else {
            model.sim = list(new ScilabString([functionName]))
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
    if (cell.objectParameters !== undefined) {
        model.opar = cell.objectParameters;
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
CLKSOMV_f.prototype.getContainer = function CLKSOMV_f() { return new BasicBlock(this.x); }
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
PROD_f.prototype.getContainer = function PROD_f() { return new BasicBlock(this.x); }
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
SUM_f.prototype.getContainer = function SUM_f() { return new BasicBlock(this.x); }
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
