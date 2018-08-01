// All arrays - separated by ',' or ';' or ' ' are taken to be 1 Dimensional
// Only during printing, their nomenclature will change
// Good read: http://javascript.info/tutorial/arguments#keyword-arguments
/*
Authors: Adhitya, Nimish, Chhavi, Saarang
*/
var script = document.createElement("script");
script.src = "dependencies.js";
document.head.appendChild(script);
var count = 1;

function scicos_block() {
    var options = arguments[0] || new Object();
    var block_type = ["Block", "graphics", "model", "gui", "doc"];
    this.Block = new ScilabString(block_type);
    this.graphics = options.graphics || new scicos_graphics();
    this.model = options.model || new scicos_model();
    this.gui = options.gui || new ScilabString();
    this.doc = options.doc || list();

    return mlist(block_type, this.Block, this.graphics, this.model, this.gui, this.doc);
}

function standard_define() {
    var sz = arguments[0];
    var model = arguments[1];
    var label = arguments[2];
    var gr_i = arguments[3] || new ScilabString();

    var pin = new ScilabDouble();
    var pout = new ScilabDouble();
    var pein = new ScilabDouble();
    var peout = new ScilabDouble();

    var nin = model.in.height;
    if (nin > 0) {
        pin = new ScilabDouble(...zeros(nin,1));
    }
    var nout = model.out.height;
    if (nout > 0) {
        pout = new ScilabDouble(...zeros(nout,1));
    }
    var ncin = model.evtin.height;
    if (ncin > 0) {
        pein = new ScilabDouble(...zeros(ncin,1));
    }
    var ncout = model.evtout.height;
    if (ncout > 0) {
        peout = new ScilabDouble(...zeros(ncout,1));
    }

    gr_i = list(gr_i, new ScilabDouble([8]));

    if (gr_i[1] == []) {
        gr_i[1] = new ScilabDouble([8]);
    }
    if (gr_i[1] == 0) {
        gr_i[1] = new ScilabDouble();
    }

    var graphics_options = {
        sz: sz,
        pin: pin,
        pout: pout,
        pein: pein,
        peout: peout,
        gr_i: gr_i,
        exprs: label
    };
    var graphics = new scicos_graphics(graphics_options);
    var block_options = {
        graphics: graphics,
        model: model,
        gui: new ScilabString([arguments.callee.caller.name])
    };
    return new scicos_block(block_options);
}

function scicos_graphics() {
    var options = arguments[0] || new Object();
    var graphics_type = ["graphics", "orig", "sz", "flip", "theta", "exprs", "pin", "pout", "pein", "peout", "gr_i", "id", "in_implicit", "out_implicit", "in_style", "out_style", "in_label", "out_label", "style"];
    this.graphics = new ScilabString(graphics_type);
    this.orig = options.orig || new ScilabDouble([0, 0]);
    this.sz = options.sz || new ScilabDouble([80, 80]); // Space and comma works the same!
    this.flip = options.flip || new ScilabBoolean([false]);
    this.theta = options.theta || new ScilabDouble([0]);
    this.exprs = options.exprs || new ScilabDouble();
    this.pin = options.pin || new ScilabDouble();
    this.pout = options.pout || new ScilabDouble();
    this.pein = options.pein || new ScilabDouble();
    this.peout = options.peout || new ScilabDouble();
    this.gr_i = options.gr_i || new ScilabString();
    this.id = options.id || new ScilabString([""]);
    this.in_implicit = options.in_implicit || new ScilabDouble();
    this.out_implicit = options.out_implicit || new ScilabDouble(); // There is only one!
    this.in_style = options.in_style || new ScilabDouble();
    this.out_style = options.out_style || new ScilabDouble();
    this.in_label = options.in_label || new ScilabDouble();
    this.out_label = options.out_label || new ScilabDouble();
    this.style = options.style || new ScilabString();

    return mlist(graphics_type, this.graphics, this.orig, this.sz, this.flip, this.theta, this.exprs, this.pin, this.pout, this.pein, this.peout, this.gr_i, this.id, this.in_implicit, this.out_implicit, this.in_style, this.out_style, this.in_label, this.out_label, this.style);
}

function scicos_model() {
    var options = arguments[0] || new Object();
    var model_type = ["model", "sim", "in", "in2", "intyp", "out", "out2", "outtyp", "evtin", "evtout", "state", "dstate", "odstate", "rpar", "ipar", "opar", "blocktype", "firing", "dep_ut", "label", "nzcross", "nmode", "equations", "uid"];
    this.model = new ScilabString(model_type);
    this.sim = options.sim || new ScilabString();
    this.in = options.in || new ScilabDouble();
    this.in2 = options.in2 || new ScilabDouble();
    this.intyp = options.intyp || new ScilabDouble(); // [1]
    this.out = options.out || new ScilabDouble();
    this.out2 = options.out2 || new ScilabDouble();
    this.outtyp = options.outtyp || new ScilabDouble([1]);
    this.evtin = options.evtin || new ScilabDouble();
    this.evtout = options.evtout || new ScilabDouble();
    this.state = options.state || new ScilabDouble();
    this.dstate = options.dstate || new ScilabDouble();
    this.odstate = options.odstate || list();
    this.ipar = options.ipar || new ScilabDouble();
    this.rpar = options.rpar || new ScilabDouble();
    this.opar = options.opar || list(); // new ScilabDouble();
    this.blocktype = options.blocktype || new ScilabString(["c"]);
    this.firing = options.firing || new ScilabDouble();
    this.dep_ut = options.dep_ut || new ScilabBoolean([false, false]);
    this.label = options.label || new ScilabString([""]); // If label not available, use image
    this.nzcross = options.nzcross || new ScilabDouble([0]);
    this.nmode = options.nmode || new ScilabDouble([0]);;
    this.equations = options.equations || list();
    this.uid = options.uid || new ScilabString();

    return mlist(model_type, this.model, this.sim, this.in, this.in2, this.intyp, this.out, this.out2, this.outtyp, this.evtin, this.evtout, this.state, this.dstate, this.odstate, this.ipar, this.rpar, this.opar, this.blocktype, this.firing, this.dep_ut, this.label, this.nzcross, this.nmode, this.equations, this.uid);
}



function scicos_diagram() {
    var options = arguments[0] || new Object();
    var diagram_type = ["diagram", "props", "objs", "version", "contrib"];
    this.diagram = new ScilabString(diagram_type);
    this.props = options.props || scicos_params();
    this.objs = options.objs || list();
    this.version = options.version || new ScilabString([""]);
    this.contrib = options.contrib || list();

    return mlist(diagram_type, this.diagram, this.props, this.objs, this.version, this.contrib);
}


function scicos_params() {
    var options = arguments[0] || new Object();
    var params_type = ["params", "wpar", "title", "tol", "tf", "context", "void1", "options", "void2", "void3", "doc"];
    this.params = new ScilabString(params_type);
    this.wpar = options.wpar || new ScilabDouble([600, 450, 0, 0, 600, 450]);
    this.title = options.title || options.Title || new ScilabString(["Untitled"]);
    this.tf = options.tf || new ScilabDouble([100000]);
    this.tol = options.tol || new ScilabDouble([Math.pow(10, -6)], [Math.pow(10, -6)], [Math.pow(10, -10)], [100001], [0], [1], [0]);
    this.context = options.context || new ScilabString([""]);
    this.void1 = new ScilabDouble();
    this.options = options.options || new default_options();
    this.void2 = new ScilabDouble();
    this.void3 = new ScilabDouble();
    this.doc = options.doc || list();

    return tlist(params_type, this.params, this.wpar, this.title, this.tol, this.tf, this.context, this.void1, this.options, this.void2, this.void3, this.doc);
}

function default_options() {
    var options_type = ["scsopt", "3D", "Background", "Link", "ID", "Cmap"];
    this.scsopt = new ScilabString(options_type);
    this.D3 = list(new ScilabBoolean([true]), new ScilabDouble([33]));
    this.Background = new ScilabDouble([8, 1]);
    this.Link = new ScilabDouble([1, 5]);
    this.ID = list(new ScilabDouble([5, 1]), new ScilabDouble([4, 1]));
    this.Cmap = new ScilabDouble([0.8, 0.8, 0.8]);

    return tlist(options_type, this.scsopt, this.D3, this.Background, this.Link, this.ID, this.Cmap);
}


function scicos_link() {
    var options = arguments[0];
    var link_type = ["Link", "xx", "yy", "id", "thick", "ct", "from", "to"];
    this.Link = new ScilabString(link_type);
    this.xx = options.xx || new ScilabDouble(); //inverse array
    this.yy = options.yy || new ScilabDouble(); //inverse array
    this.id = options.id || new ScilabString(["drawlink"]); // changed
    this.thick = options.thick || new ScilabDouble([0, 0]);
    this.ct = options.ct || new ScilabDouble([1, 1]);
    this.from = options.from || new ScilabDouble();
    this.to = options.to || new ScilabDouble();

    return mlist(link_type, this.Link, this.xx, this.yy, this.id, this.thick, this.ct, this.from, this.to);
}


function list() {
    this.ScilabList = [];
    for (var i = 0; i < arguments.length; i++) {
        this.ScilabList.push(arguments[i]);
    }
    this.ScilabList.scilabClass = "ScilabList";

    return this.ScilabList;
}

function mlist() {
    this.ScilabMList = {};
    for (var i = 1, j = 0; i < arguments.length; i++, j++) {
        this.ScilabMList[arguments[0][j]] = arguments[i];
    }
    this.ScilabMList.varName = "";
    this.ScilabMList.scilabClass = "ScilabMList";

    return this.ScilabMList;
}

function tlist() {
    this.ScilabTList = {};
    for (var i = 1, j = 0; i < arguments.length; i++, j++) {
        this.ScilabTList[arguments[0][j]] = arguments[i];
    }
    this.ScilabTList.scilabClass = "ScilabTList";

    return this.ScilabTList;
}


function ScilabString() {
    var i = 0,
        j = 0;
    if (arguments.length) {
        var array = arguments;
        this.height = array.length;
        this.width = array[0].length;
        for (i = 0; i < this.height; i++) {
            for (j = 0; j < this.width; j++) {
                this["data" + i + j] = new data();
                this["data" + i + j].value = array[i][j];
                this["data" + i + j].line = i;
                this["data" + i + j].column = j;
            }
        }
    }
}

ScilabString.prototype.push = function() {
    var e = arguments[0];
    var i = e.line || 0;
    var j = e.column || 0;
    this["data" + i + j] = e;
}

function ScilabBoolean() {
    var i = 0,
        j = 0;
    if (arguments.length) {
        var array = arguments;
        this.height = array.length;
        this.width = array[0].length;
        for (i = 0; i < this.height; i++) {
            for (j = 0; j < this.width; j++) {
                this["data" + i + j] = new data();
                this["data" + i + j].value = array[i][j].toString();
                this["data" + i + j].line = i;
                this["data" + i + j].column = j;
            }
        }
    }
}

ScilabBoolean.prototype.push = function() {
    var e = arguments[0];
    var i = e.line || 0;
    var j = e.column || 0;
    this["data" + i + j] = e;
}

function ScilabDouble() {
    var i = 0,
        j = 0;
    if (arguments.length) {
        var array = arguments;
        this.height = array.length;
        this.width = array[0].length;
        for (i = 0; i < this.height; i++) {
            for (j = 0; j < this.width; j++) {
                this["data" + i + j] = new data();
                if(array[i][j] % 1 == 0) {
                    this["data" + i + j].realPart = parseFloat(array[i][j]).toFixed(1);
                }
                else {
                    this["data" + i + j].realPart = array[i][j];
                }
                this["data" + i + j].line = i;
                this["data" + i + j].column = j;
            }
        }
    }
}

ScilabDouble.prototype.push = function() {
    var e = arguments[0];
    if (typeof e.realPart === 'number' && e.realPart % 1 == 0) {
        e.realPart = e.realPart.toFixed(1);
    }
    var i = e.line || 0;
    var j = e.column || 0;
    this["data" + i + j] = e;
}

function ScilabInteger() {
    var i = 0,
        j = 0;
    if (arguments.length) {
        var array = arguments;
        this.height = array.length;
        this.width = array[0].length;
        for (i = 0; i < this.height; i++) {
            for (j = 0; j < this.width; j++) {
                this["data" + i + j] = new data();
                this["data" + i + j].value = array[i][j];
                this["data" + i + j].line = i;
                this["data" + i + j].column = j;
            }
        }
    }
}

ScilabInteger.prototype.push = function() {
    var e = arguments[0];
    var i = e.line || 0;
    var j = e.column || 0;
    this["data" + i + j] = e;
}

function int32() {
    var args = Array.prototype.slice.call(arguments);
    var int = new ScilabInteger(...args);
    int.intPrecision = "sci_int32";
    return int;
}

function int16() {
    var args = Array.prototype.slice.call(arguments);
    var int = new ScilabInteger(...args);
    int.intPrecision = "sci_int16";
    return int;
}

function int8() {
    var args = Array.prototype.slice.call(arguments);
    var int = new ScilabInteger(...args);
    int.intPrecision = "sci_int8";
    return int;
}

function uint32() {
    var args = Array.prototype.slice.call(arguments);
    var int = new ScilabInteger(...args);
    int.intPrecision = "sci_uint32";
    return int;
}

function uint16() {
    var args = Array.prototype.slice.call(arguments);
    var int = new ScilabInteger(...args);
    int.intPrecision = "sci_uint16";
    return int;
}

function uint8() {
    var args = Array.prototype.slice.call(arguments);
    var int = new ScilabInteger(...args);
    int.intPrecision = "sci_uint8";
    return int;
}


function data() {
    this.line;
    this.column;
    this.realPart;
    this.value;
}

function getData() {
    var dataObject = arguments[0];
    var key;
    var dataArray = [];
    for (key in dataObject) {
        if (/^data/.test(key)) {
            if (typeof dataObject[key].value === "undefined") {
                dataArray.push(dataObject[key].realPart);
            } else {
                dataArray.push(dataObject[key].value);
            }
        }
    }
    return dataArray;
}

function isEmpty() {
    return !getData(arguments[0]).length;
}

function modelica_function() {
    var modelica_type = ["modelica", "model", "inputs", "outputs", "parameters"];
    this.modelica = new ScilabString(modelica_type);
    this.model = [];
    this.inputs = [];
    this.outputs = [];
   // this.parameters = list([], list());
   this.parameters = list(new ScilabDouble(), list());
    var mo = tlist(modelica_type, this.modelica, this.model, this.inputs, this.outputs, this.parameters);
    return mo;
}

//28 june 2017
//Ritveeka vashistha
function set_io(){
    var model = arguments[0]
    var graphics = arguments[1]
    var inp = arguments[2]
    var out = arguments[3]
    var clkin = arguments[4]
    var clkout = arguments[5]
    if(arguments.length <= 6 ){
        var in_implicit = []
        var out_implicit = []
    }

    if(inp.length != 0 && inp[0] != undefined)
        inp = array_matrix(inp)
    if(out.length != 0 && out[0] != undefined)
        out = array_matrix(out)
    if(clkout.length != 0 && clkout[0] != undefined)
        clkout = array_matrix(clkout)
    if(clkin.length != 0 && clkin[0] != undefined)
        clkin = array_matrix(clkin)


    for (var i = clkin.length - 1; i >= 0; i--) {
        clkin[i] = [Math.floor(clkin[i])]
    }
    var nclkin = size(clkin,1)

    for (var i = clkout.length - 1; i >= 0; i--) {
        clkout[i] = [Math.floor(clkout[i])]
    }
    var nclkout = size(clkout,1)

    var ip1 = getData(graphics.pin)
    for (var i = ip1.length - 1; i >= 0; i--) {
        ip1[i] = [parseFloat(ip1[i])]
    }
    var op1 = getData(graphics.pout)
    for (var i = op1.length - 1; i >= 0; i--) {
        op1[i] = [parseFloat(op1[i])]
    }

    var cip1 = getData(graphics.pein)
    for (var i = cip1.length - 1; i >= 0; i--) {
        cip1[i] = [parseFloat(cip1[i])]
    }

    var cop1 = getData(graphics.peout)
    for (var i = cop1.length - 1; i >= 0; i--) {
        cop1[i] = [parseFloat(cop1[i])]
    }

    var in1 = getData(model.in)
    for (var i = in1.length - 1; i >= 0; i--) {
        in1[i] = [parseFloat(in1[i])]
    }

    var out1 = getData(model.out)
    for (var i = out1.length - 1; i >= 0; i--) {
        out1[i] = [parseFloat(out1[i])]
    }

    var clkin1 = getData(model.evtin)
    for (var i = clkin1.length - 1; i >= 0; i--) {
        clkin1[i] = [parseFloat(clkin1[i])]
    }

    var clkout1 = getData(model.evtout)
    for (var i = clkout1.length - 1; i >= 0; i--) {
        clkout1[i] = [parseFloat(clkout1[i])]
    }

    this.n1 = size(in1,1)
    this.n = inp.length/2
    if(this.n1 > this.n){
        ip1 = ip1.slice(0,n)
    }
    else{
        for (var i = 0; i < this.n-this.n1; i++) {
            ip1.push([0])
        }
    }

    this.n1 = size(out1,1)
    this.n = out.length/2
    if(this.n1 > this.n){
        op1 = op1.slice(0,n)
    }
    else{
        for (var i = 0; i < this.n-this.n1; i++) {
            op1.push([0])
        }
    }
    this.n1 = size(clkin1,"*")
    this.n = size(clkin,"*")
    if(this.n1 > this.n){
        cip1 = cip1.slice(0,n)
    }
    else{
        for (var i = 0; i < this.n-this.n1; i++) {
            cip1.push([0])
        }
    }
    this.n1 = size(clkout1,"*")
    this.n = size(clkout,"*")
    if(this.n1 > this.n){
        cop1 = cop1.slice(0,n)
    }
    else{
        for (var i = 0; i < this.n-this.n1; i++) {
            cop1.push([0])
        }
    }
    var I = "E"
    if(ip1.length != 0){
        var in_impl = ones(ip1.length,1)
        for (var i = in_impl.length - 1; i >= 0; i--) {
            in_impl[i][0] = "E"
        }
    }
    else{
        var in_impl = []
    }
    if(op1.length != 0){
        var out_impl = ones(op1.length,1)
        for (var i = out_impl.length - 1; i >= 0; i--) {
            out_impl[i][0] = "E"
        }
    }
    else{
        var out_impl = []
    }

    graphics.pin = new ScilabDouble(...ip1)
    graphics.pout = new ScilabDouble(...op1)
    graphics.pein = new ScilabDouble(...cip1)
    graphics.peout = new ScilabDouble(...cop1)
    graphics.in_implicit = new ScilabDouble(...in_impl)
    graphics.out_implicit = new ScilabDouble(...out_impl)
    this.in = []
    this.in2 = []
    this.out = []
    this.out2 = []
    for (var i = 0; i <= inp.length - 1; i++) {
        if(i<inp.length/2)
            this.in.push(inp[i])
        else
            this.in2.push(inp[i])
    }

    for (var i = 0; i <= out.length - 1; i++) {
        if(i<out.length/2)
            this.out.push(out[i])
        else
            this.out2.push(out[i])
    }
    model.in = new ScilabDouble(...this.in)
    model.in2 = new ScilabDouble(...this.in2)
    model.out = new ScilabDouble(...this.out)
    model.out2 = new ScilabDouble(...this.out2)

    if(clkin.length == undefined)
        model.evtin = new ScilabDouble([clkin])
    else
        model.evtin = new ScilabDouble(...clkin)
    if(clkout.length == undefined)
        model.evtout = new ScilabDouble([clkout])
    else
        model.evtout = new ScilabDouble(...clkout)

    return [model,graphics]
}

//28 june 2017
//Ritveeka vashistha
function check_io(){
    var model = arguments[0]
    var graphics = arguments[1]
    var inp = arguments[2]
    var out = arguments[3]
    var clkin = arguments[4]
    var clkout = arguments[5]
    if(arguments.length <= 6 ){
        var in_implicit = []
        var out_implicit = []
    }
    if(inp.length != 0 && inp[0] != undefined)
        inp = array_matrix(inp)
    this.nin = size(inp,1)

    if(out.length != 0 && out[0] != undefined)
        out = array_matrix(out)
    this.nout = size(out,1)

    if(clkin.length != 0 && clkin[0] != undefined)
        clkin = array_matrix(clkin)
    for (var i = clkin.length - 1; i >= 0; i--) {
        clkin[i][0] = Math.floor(clkin[i][0])
    }
    this.nclkin = size(clkin,1)

    for (var i = clkout.length - 1; i >= 0; i--) {
        clkout[i] = [Math.floor(clkout[i])]
    }
    this.nclkout = size(clkout,1)

    var ip1 = getData(graphics.pin)
    for (var i = ip1.length - 1; i >= 0; i--) {
        ip1[i] = [parseFloat(ip1[i])]
    }
    var op1 = getData(graphics.pout)
    for (var i = op1.length - 1; i >= 0; i--) {
        op1[i] = [parseFloat(op1[i])]
    }

    var cip1 = getData(graphics.pein)
    for (var i = cip1.length - 1; i >= 0; i--) {
        cip1[i] = [parseFloat(cip1[i])]
    }

    var cop1 = getData(graphics.peout)
    for (var i = cop1.length - 1; i >= 0; i--) {
        cop1[i] = [parseFloat(cop1[i])]
    }

    var in1 = getData(model.in)
    for (var i = in1.length - 1; i >= 0; i--) {
        in1[i] = [parseFloat(in1[i])]
    }

    var out1 = getData(model.out)
    for (var i = out1.length - 1; i >= 0; i--) {
        out1[i] = [parseFloat(out1[i])]
    }

    var clkin1 = getData(model.evtin)
    for (var i = clkin1.length - 1; i >= 0; i--) {
        clkin1[i] = [parseFloat(clkin1[i])]
    }

    var clkout1 = getData(model.evtout)
    for (var i = clkout1.length - 1; i >= 0; i--) {
        clkout1[i] = [parseFloat(clkout1[i])]
    }

    this.n1 = size(in1,1)
    this.n = size(inp,"*")
    if(this.n1 > this.n){
        ip1 = ip1.slice(0,n)
    }
    else{
        for (var i = 0; i < this.n-this.n1; i++) {
            ip1.push([0])
        }
    }

    this.n1 = size(out1,"*")
    this.n = size(out,"*")
    if(this.n1 > this.n){
        op1 = op1.slice(0,n)
    }
    else{
        for (var i = 0; i < this.n-this.n1; i++) {
            op1.push([0])
        }
    }
    this.n1 = size(clkin1,"*")
    this.n = size(clkin,"*")
    if(this.n1 > this.n){
        cip1 = cip1.slice(0,n)
    }
    else{
        for (var i = 0; i < this.n-this.n1; i++) {
            cip1.push([0])
        }
    }
    this.n1 = size(clkout1,"*")
    this.n = size(clkout,"*")
    if(this.n1 > this.n){
        cop1 = cop1.slice(0,n)
    }
    else{
        for (var i = 0; i < this.n-this.n1; i++) {
            cop1.push([0])
        }
    }
    var I = "E"
    if(ip1.length != 0){
        var in_impl = ones(ip1.length,1)
        for (var i = in_impl.length - 1; i >= 0; i--) {
            in_impl[i][0] = I
        }
    }
    else{
        var in_impl = []
    }
    if(op1.length != 0){
        var out_impl = ones(op1.length,1)
        for (var i = out_impl.length - 1; i >= 0; i--) {
            out_impl[i][0] = I
        }
    }
    else{
        var out_impl = []
    }

    graphics.pin = new ScilabDouble(...ip1)
    graphics.pout = new ScilabDouble(...op1)
    graphics.pein = new ScilabDouble(...cip1)
    graphics.peout = new ScilabDouble(...cop1)
    graphics.in_implicit = new ScilabDouble(...in_impl)
    graphics.out_implicit = new ScilabDouble(...out_impl)
    this.in = []
    this.out = []
    for (var i = 0; i <= inp.length - 1; i++) {
            this.in.push([parseInt(inp[i][0])])
    }

    for (var i = 0; i <= out.length - 1; i++) {
        this.out.push([parseInt(out[i][0])])
    }
    model.in = new ScilabDouble(...this.in)
    model.out = new ScilabDouble(...this.out)

    if(clkin.length == undefined)
        model.evtin = new ScilabDouble([clkin])
    else
        model.evtin = new ScilabDouble(...clkin)
    if(clkout.length == undefined)
        model.evtout = new ScilabDouble([clkout])
    else
        model.evtout = new ScilabDouble(...clkout)

    return [model,graphics]
}

// To add Block name under the instance tag in xml.
function instance() {
    this.instance = arguments[0];
}

function createInstanceTag() {
    return new instance(arguments[0]);
}


function CLKIN_f() {

    CLKIN_f.prototype.internal = function CLKIN_f() {
        var model = scicos_model();
        var port = 1;

        model.sim = new ScilabString(["input"]);
        model.outtyp = new ScilabDouble(); //changed
        model.evtout = new ScilabDouble([-1]); // 1, 1 -> -1, -1
        model.ipar = new ScilabDouble([port]);
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble([-1]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([port]);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CLKIN_f\",sz(1),sz(2));"]);
        var block = new standard_define(new ScilabDouble([80, 80]), model, exprs, gr_i); // 1 -> 80

        block.graphics.style = new ScilabString(["CLKIN_f"]);
        return block;
    }
}

function CLKOUT_f() {

    CLKOUT_f.prototype.internal = function CLKOUT_f() {
        var model = scicos_model();
        var port = 1;

        model.sim = new ScilabString(["output"]);
        model.outtyp = new ScilabDouble();
        model.evtin = new ScilabDouble([-1]); // 1, 1 -> -1, -1
        model.ipar = new ScilabDouble([port]);
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = ScilabString(["" + port]);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CLKOUT_f\",sz(1),sz(2));"]);
        var block = new standard_define(new ScilabDouble([80, 80]), model, exprs, gr_i); // 1 -> 80

        block.graphics.style = new ScilabString(["CLKOUT_f"]);
        return block;
    }
}

function CLKSPLIT_f() {

    CLKSPLIT_f.prototype.internal = function CLKSPLIT_f() {
        var model = scicos_model();
        model.sim = new ScilabString(["split"]);
        model.evtin = new ScilabDouble([-1]);
        model.outtyp = new ScilabDouble(); // changed
        model.evtout = new ScilabDouble([-1], [-1]) // 1, 1 -> -1, -1 inverse
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble([-1], [-1]); // inverse
        model.dep_ut = new ScilabBoolean([false, false]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CLKSPLIT_f\",sz(1),sz(2));"]);

        var block = new standard_define(new ScilabDouble([80, 80]), model, new ScilabDouble(), gr_i); // 1 -> 80
        block.graphics.style = new ScilabString(["CLKSPLIT_f"]);
        return block;
    }
}

function STEP(){
    STEP.prototype.internal = function STEP(arg1,arg2,arg3){	
	this.a = arg1	
	this.b = arg2;
	this.c = arg3;		
	this.rpar = [[this.b],[this.c]];

	var model = scicos_model();
        model.sim = list(new ScilabString(["step_func"]),new ScilabDouble([4]));
        model.evtin = new ScilabDouble([1]);
        model.evtout = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.out2 = new ScilabDouble([1]);
	model.outtyp = new ScilabDouble([1]);
	model.firing = new ScilabDouble([1]);
	model.rpar = new ScilabDouble(...convertarray(convertarray(this.rpar)).map( x => [x]));
	model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([this.a],...this.rpar);
	var gr_i = new ScilabString(["xs	tringb(orig(1),orig(2),\"STEP\",sz(1),sz(2));"]);
        var block=new standard_define(new ScilabDouble([2,2]),model,exprs,gr_i);

	block.graphics.style = new ScilabString(["STEP"]);       
	block.graphics.in_style = new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]);
        block.graphics.in_label = new ScilabString([""]);
        return block;
    }
}

/*function STEP() {

    STEP.prototype.internal = function STEP() {
        this.rpar=[[0],[1]];
        var model = scicos_model();
        model.sim = list(new ScilabString(["step_func"]),new ScilabDouble([4]));
        model.evtin = new ScilabDouble([1]);
        model.evtout = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.out2 = new ScilabDouble([1]);
        model.outtyp = new ScilabDouble([1]);
        model.firing = new ScilabDouble([1]);
        model.rpar = new ScilabDouble(...this.rpar);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([1],...this.rpar);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"STEP\",sz(1),sz(2));"]);

        var block = new standard_define(new ScilabDouble([80, 80]), model,exprs, gr_i); // 1 -> 80
        block.graphics.style = new ScilabString(["STEP"]);
        return block;
    }
}*/


function BasicBlock() {
    if (arguments.length > 0) {
        var options = arguments[0];
        this.angle = options.angle; // Not Known
        this.blockType = getData(options.model.blocktype)[0];
        this.connectable = options.connectable; // Not Known
        var dep_ut = getData(options.model.dep_ut);
        if (dep_ut[0] == "true")
            this.dependsOnU = "1";
        if (dep_ut[1] == "true")
            this.dependsOnT = "1";
        this.id = options.id;
        this.interfaceFunctionName = arguments.callee.caller.name;
        this.ordering = options.ordering;
        this.parent = "1"; // modified_shank : earlier : this.parent = options.parent;
        if (options.model.sim instanceof Array) {
            this.simulationFunctionName = getData(options.model.sim[0])[0];
            var func_type;
            switch (getData(options.model.sim[1])[0].toString()) {
                case "-2.0":
                    func_type = "ESELECT";
                    break;
                case "-1.0":
                    func_type = "IFTHENELSE";
                    break;
                case "1.0":
                    func_type = "TYPE_1";
                    break;
                case "2.0":
                    func_type = "TYPE_2";
                    break;
                case "3.0":
                    func_type = "TYPE_3";
                    break;
                case "4.0":
                    func_type = "C_OR_FORTRAN";
                    break;
                case "5.0":
                    func_type = "SCILAB";
                    break;
                case "99.0":
                    func_type = "DEBUG";
                    break;
                case "1001.0":
                    func_type = "DYNAMIC_FORTRAN_1";
                    break;
                case "2001.0":
                    func_type = "DYNAMIC_C_1";
                    break;
                case "2004.0":
                    func_type = "DYNAMIC_EXPLICIT_4";
                    break;
                case "10001.0":
                    func_type = "OLDBLOCKS";
                    break;
                case "10004.0":
                    func_type = "IMPLICIT_C_OR_FORTRAN";
                    break;
                case "30004.0":
                    func_type = "MODELICA";
                    break;
            }
            this.simulationFunctionType = func_type;
        } else {
            this.simulationFunctionName = getData(options.model.sim)[0];
            this.simulationFunctionType = "DEFAULT";
        }
        this.style = arguments.callee.caller.name;
        this.value = options.value; // Not Known
        this.vertex = options.vertex; // Not Known
        this.visible = options.visible; // Not Known
        this.exprs = options.graphics.exprs;
        this.realParameters = options.model.rpar;
        this.integerParameters = options.model.ipar;
        this.objectsParameters = options.model.opar;
        this.nbZerosCrossing = options.model.nzcross;
        this.nmode = options.model.nmode;
        if(!isEmpty(options.model.state)) {
            this.state = options.model.state;
        }
        if(!isEmpty(options.model.dstate)) {
            this.dState = options.model.dstate;
        }
        this.oDState = options.model.odstate;
        this.equations = options.model.equations;
        this.blockName = "BasicBlock";
        this.blockElementName = arguments.callee.caller.name;
    }
}

function sci2exp(c) {
    if (c.scilabClass == "ScilabList") {
        c = Object.create(c);
        c.scilabClass = "";
        if (c.length) {
            return "list(" + sci2exp(c) + ")";
        } else {
            return "list()";
        }
    } else if (typeof c.length === "undefined") {
        return _check(c);
    } else if (c.length == 0) {
        return "[]";
    } else if (c.length == 1) {
        return _check(c[0]);
    } else {
        var result = "[";
        for (var i = 0; i < c.length; i++) {
            if (typeof c[i].length === 'undefined') {
                result += _check(c[i]) + ",";
            } else {
                for (var j = 0; j < c[i].length - 1; j++) {
                    result += _check(c[i][j]) + ",";
                }
                result += _check(c[i][c[i].length - 1]) + ";";
            }
        }
        result = result.substring(0, result.length - 1);
        result += "]";
        return result;
    }
}

function transpose(a) {
    return a[0].map(function(_, c) {
        return a.map(function(r) {
            return r[c];
        });
    });
}

function array_matrix(){
    var array = arguments[0]
    var newArray = []
    for (var i = array.length - 1; i >= 0; i--) {
        if(array[i].length == undefined)
            newArray[i] = [array[i]]
        else{
            newArray[i] = array[i]
        }
    }
    return newArray
}

function colon_operator() {
    var array = arguments[0];
    var new_arr = [];
    var i, j;
    if(array[0].length == undefined){
        for (j = 0; j < array.length; j++) {
            new_arr.push([array[j]]);
        }
    }
    else{
        for (i = 0; i < array[0].length; i++) {
            for (j = 0; j < array.length; j++) {
                new_arr.push([array[j][i]]);
            }
        }
    }
    return new_arr;
}

// Returns ScilabDouble which contains a list with size = n and all values = 0
/*function zeros(n) {
    var arg = new Array(n + 1).join("0").split("").map(parseFloat);
    var port = new ScilabDouble();
    var i = 0;

    for (i = 0; i < arg[0].length; i++)
        port.list.push(arg[0][i]);

    return port;
}*/

/*
date - 16 june 2017
author - Ritveeka Vashistha
edited - Mit Katwala (To make it more generalised and scalable)
*/
function linspace(){
    var a = parseFloat(arguments[0]);
    var b = parseFloat(arguments[1]);
    var n = parseFloat(arguments[2]);
    var d = (b-a)/(n-1);
    var result = [];
    result[0] = a;
    result[n-1] = b;
    for (var i = 1; i < n-1; i++) {
        result[i] = result[i-1] + d;
    }
    return result;
}
/*
date - 16 june 2017
author - Ritveeka Vashistha
*/
function interpolation(){
    var x = arguments[0];
    var color = arguments[1];
    var y = new Array(x.length);
    for( i=0;i<x.length;i++){
        if(x[i] >= 0.000 && x[i] <= 0.125){
            switch(color){
                case 'r':
                    y[i] = 0.000;
                    break;
                case 'g':
                    y[i] = 0.000;
                    break;
                case 'b':
                    y[i] = 4.000*x[i];
                    break;

            }
        }
        else if(x[i] <= 0.375){
            switch(color){
                case 'r':
                    y[i] = 0.000;
                    break;
                case 'g':
                    y[i] = (x[i]-0.125)*4.000;
                    break;
                case 'b':
                    y[i] = 1.000;
                    break;

            }
        }
        else if(x[i] <= 0.625){
            switch(color){
                case 'r':
                    y[i] = (x[i]-0.375)*4.000;
                    break;
                case 'g':
                    y[i] = 1.000;
                    break;
                case 'b':
                    y[i] = 4.000*(0.625-x[i]);
                    break;

            }
        }
        else if(x[i] <= 0.875){
            switch(color){
                case 'r':
                    y[i] = 1.000;
                    break;
                case 'g':
                    y[i] = 4.000*(0.875-x[i]);
                    break;
                case 'b':
                    y[i] = 0.000;
                    break;

            }
        }
        else{
            switch(color){
                case 'r':
                    y[i] = 0.400*(1.000-x[i])+0.500;
                    break;
                case 'g':
                    y[i] = 0.000;
                    break;
                case 'b':
                    y[i] = 0.000;
                    break;

            }
        }
    }
    return y;
}
/*
date - 16 june 2017
author - Ritveeka Vashistha
*/
function jetcolormap(){
    if(arguments.length != 1)
        alert('enter one integer argument');
    else{
        if(arguments.length != 0 || arguments.length == undefined)
            var n = parseInt(arguments[0]);
            if(n==0){
                return new Array(0);
            }
            else{
                var d = 0.5/Math.max(n,1);
                var x = linspace(d,1.000-d,n);
                var y = new Array(3);
                y[0] = interpolation(x,'r');
                y[1] = interpolation(x,'g');
                y[2] = interpolation(x,'b');
            }
    }
    return y;
}

function multiply(a, b) {
  var aNumRows = a.length, aNumCols = a[0].length,
      bNumRows = b.length, bNumCols = b[0].length,
      m = new Array(aNumRows);  // initialize array of rows
  for (var r = 0; r < aNumRows; ++r) {
    m[r] = new Array(bNumCols); // initialize the current row
    for (var c = 0; c < bNumCols; ++c) {
      m[r][c] = 0;             // initialize the current cell
      for (var i = 0; i < aNumCols; ++i) {
        m[r][c] += a[r][i] * b[i][c];
      }
    }
  }
  return m;
}

/*
date - 26 june 2017
author - Ritveeka Vashistha
*/
function sign(){
    var value  = arguments[0]
    if(value > 0){
        return 1
    }
    else if(value < 0){
        return -1
    }
    else{
        return 0
    }
}

/*
 * date : 26 November 2017
 * Author - Dipti G
 * This function is used in const_m and const block for passing string function value like parameters and return actual
 * compute value
 */
  function getValueOfImaginaryInput(inputvalue){
         var actualDoubleValue=null;
         if(inputvalue.includes("pi")){
		 inputvalue=inputvalue.replace("%pi", Math.PI);
		 actualDoubleValue=math.eval(inputvalue);
         }else if(inputvalue.includes("e")){
                 inputvalue=inputvalue.replace("%e", Math.E);
		 actualDoubleValue=math.eval(inputvalue);
         }else{
		 actualDoubleValue=math.eval(inputvalue);
	 }
         return actualDoubleValue;
 }

// To convert graph points to array which have been converted
// to objects because of dragging the points
function objToArrayList(graphPoints) {
    var tempPoints=[];
    for (var i=0;i< graphPoints.length; i++)
    {
        if(graphPoints[i].x) {
                tempPoints.push([graphPoints[i].x,graphPoints[i].y]);
            }
        else    {
            tempPoints.push(graphPoints[i]);
        }
    }
    return tempPoints;
}
