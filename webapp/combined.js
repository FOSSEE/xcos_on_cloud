function ABS_VALUE () {

ABS_VALUE.prototype.define = function ABS_VALUE() {
    this.nu = -1;
    var model = scicos_model()
    model.sim = list(new ScilabString(["absolute_value"]), new ScilabDouble([4]))
    model.in = new ScilabDouble([this.nu]);
    model.out = new ScilabDouble([this.nu]);
    model.nzcross = new ScilabDouble([this.nu]);
    model.nmode = new ScilabDouble([this.nu]);
    model.blocktype = new ScilabDouble(["c"]);
    model.dep_ut = new ScilabBoolean(true, false)
    var exprs = new ScilabString([1])
    var gr_i = list(new ScilabString(["xstringb(orig(1),orig(2),\"ABS_VALUE\",sz(1),sz(2));"]), new ScilabDouble([8]));
    this.x = new standard_define(new ScilabDouble([80, 80]),model,exprs,gr_i)
    this.x.graphics.style = new ScilabString(["ABS_VALUE"]);
    return new BasicBlock(this.x);
    }
ABS_VALUE.prototype.get = function ABS_VALUE() {
         var options={
            zcr:["use zero_crossing (1: yes) (0:no)","1"],
        }
        return options
    }
ABS_VALUE.prototype.set = function ABS_VALUE() {
    this.zcr = parseFloat((arguments[0]["zcr"]))
    if(this.zcr!=0){
        this.x.model.nmode = new ScilabDouble([-1]);
        this.x.model.nzcross = new ScilabDouble([-1]);
    }
    else{
        this.x.model.nmode = new ScilabDouble([0]);
        this.x.model.nzcross = new ScilabDouble([0]);
    }
    var exprs = new ScilabString([this.zcr])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
ABS_VALUE.prototype.details = function ABS_VALUE() {
    return this.x
    }
}
function AFFICH_m() {

    AFFICH_m.prototype.define = function AFFICH_m() {
        this.font = 1;
        this.fontsize = 1;
        this.colr = 1;
        this.nt = 5;
        this.nd = 1;
        this.in1 = [1, 1];

        var model = scicos_model();
        model.sim = list(new ScilabString(["affich2"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([this.in1[0]]);
        model.in2 = new ScilabDouble([this.in1[1]]);
        model.evtin = new ScilabDouble([1]);
        model.dstate = new ScilabDouble([-1], [0], [0], [1], [1], [0], ...zeros(this.in1[0] * this.in1[1], 1));
        model.ipar = new ScilabDouble([this.font], [this.fontsize], [this.colr], [1000], [this.nt], [this.nd], [this.in1[0]]);
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, false]);
        model.label = new ScilabString([""]);
        var exprs = new ScilabString([sci2exp([parseFloat(...getData(model.in)), parseFloat(...getData(model.in2))])], [this.font], [this.fontsize], [this.colr], [this.nt], [this.nd], [0]);

    var n = "0";
    this.displayParameter = [n];

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"AFFICH_m\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        this.x.graphics.style = new ScilabString(["AFFICH_m"]);
        return new AfficheBlock(this.x);
    }
    AFFICH_m.prototype.get = function AFFICH_m() {
        if(this.in == undefined || this.in == null){
            this.in = "[1 1]"
        }
        var options={
            in:["Input Size",this.in.toString().replace(/,/g," ")],
            font:["Font number",this.font],
            fontsize:["Font size",this.fontsize],
            colr:["Color",this.colr],
            nt:["Total number of digits",this.nt],
            nd:["Number of rational part digits",this.nd],
            herit:["Block inherits (1) or not (0)",0],
        }
        return options;
    }
    AFFICH_m.prototype.set = function AFFICH_m() {
        this.in = inverse((arguments[0]["in"]))
        this.font = parseFloat((arguments[0]["font"]))
        this.fontsize = parseFloat((arguments[0]["fontsize"]))
        this.colr = parseFloat((arguments[0]["colr"]))
        this.nt = parseFloat((arguments[0]["nt"]))
        this.nd = parseFloat((arguments[0]["nd"]))
        this.herit = parseFloat((arguments[0]["herit"]))
        this.in = colon_operator(this.in)
        this.x.model.ipar = new ScilabDouble([this.font],[this.fontsize],[this.colr],[this.nt],[this.nd],this.in[0])
        this.x.model.dstate = new ScilabDouble([-1],[0],[0],[1],[1],[0],zeros(this.in[0]*this.in[1],1))
        this.x.model.evtin = ones(1-this.herit,1)
        var exprs = new ScilabString([this.in.toString().replace(/,/g," ")], [this.font], [this.fontsize], [this.colr], [this.nt], [this.nd], [0]);
        this.x.graphics.exprs=exprs;
        return new BasicBlock(this.x);
    }
    AFFICH_m.prototype.details = function AFFICH_m() {
        return this.x;
    }
}
function ANDBLK() {
    ANDBLK.prototype.define = function ANDBLK() {
        alert("parameters can not be changed")
    }

    ANDBLK.prototype.define = function ANDBLK() {

        var andlog = new ANDLOG_f().internal();
        andlog.graphics.orig = new ScilabDouble([194, 133]);
        andlog.graphics.sz = new ScilabDouble([60, 60]);
        andlog.graphics.flip = new ScilabBoolean([true]);
        andlog.graphics.pout = new ScilabDouble([9]);
        andlog.graphics.pein = new ScilabDouble([4], [11]);
        andlog.model.uid = new ScilabString([count]);
        andlog.doc = list(new ScilabString([count++]));

        var input_port1 = new CLKIN_f().internal();
        input_port1.graphics.orig = new ScilabDouble([149, 287]);
        input_port1.graphics.sz = new ScilabDouble([20, 20]);
        input_port1.graphics.flip = new ScilabBoolean([true]);
        input_port1.graphics.exprs = new ScilabString(["1"]);
        input_port1.graphics.peout = new ScilabDouble([4]);
        input_port1.model.ipar = new ScilabDouble([1]);
        input_port1.model.uid = new ScilabString([count]);
        input_port1.doc = list(new ScilabString([count++]));

        var output_port = new CLKOUT_f().internal();
        output_port.graphics.orig = new ScilabDouble([450, 83]);
        output_port.graphics.sz = new ScilabDouble([20, 20]);
        output_port.graphics.flip = new ScilabBoolean([true]);
        output_port.graphics.exprs = new ScilabString(["1"]);
        output_port.graphics.pein = new ScilabDouble([8]);
        output_port.model.ipar = new ScilabDouble([1]);
        output_port.model.uid = new ScilabString([count]);
        output_port.doc = list(new ScilabString([count++]));

        var input_port2 = new CLKIN_f().internal();
        input_port2.graphics.orig = new ScilabDouble([141, 330]);
        input_port2.graphics.sz = new ScilabDouble([20, 20]);
        input_port2.graphics.flip = new ScilabBoolean([true]);
        input_port2.graphics.exprs = new ScilabString(["2"]);
        input_port2.graphics.peout = new ScilabDouble([6]);
        input_port2.model.ipar = new ScilabDouble([2]);
        input_port2.model.uid = new ScilabString([count]);
        input_port2.doc = list(new ScilabString([count++]));

        var ifthel = new IFTHEL_f().internal();
        ifthel.graphics.orig = new ScilabDouble([331, 137]);
        ifthel.graphics.sz = new ScilabDouble([60, 60]);
        ifthel.graphics.flip = new ScilabBoolean([true]);
        ifthel.graphics.pin = new ScilabDouble([9]);
        ifthel.graphics.pein = new ScilabDouble([12]);
        ifthel.graphics.peout = new ScilabDouble([8], [0]);
        ifthel.model.uid = new ScilabString([count]);
        ifthel.doc = list(new ScilabString([count++]));


        var split = new CLKSPLIT_f().internal();
        split.graphics.orig = new ScilabDouble([234, 275.78348]);
        split.graphics.pein = new ScilabDouble([6]);
        split.graphics.peout = new ScilabDouble([11], [12]);
        split.model.uid = new ScilabString([count]);
        split.doc = list(new ScilabString([count++]));

        var diagram = scicos_diagram();
        diagram.objs.push(andlog);
        diagram.objs.push(input_port1);
        diagram.objs.push(output_port);
        diagram.objs.push(input_port2);
        diagram.objs.push(ifthel);
        diagram.objs.push(split);
        diagram.objs.push(scicos_link({
            xx: new ScilabDouble([169], [214], [214]),
            yy: new ScilabDouble([297], [297], [198.71]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([2, 1, 0]),
            to: new ScilabDouble([1, 1, 1])
        }));
        diagram.objs.push(scicos_link({
            xx: new ScilabDouble([161], [234], [234]),
            yy: new ScilabDouble([340], [340], [275.78]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([4, 1, 0]),
            to: new ScilabDouble([6, 1, 1])
        }));
        diagram.objs.push(scicos_link({
            xx: new ScilabDouble([351], [351], [450]),
            yy: new ScilabDouble([131.29], [93], [93]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([5, 1, 0]),
            to: new ScilabDouble([3, 1, 1])
        }));
        diagram.objs.push(scicos_link({
            xx: new ScilabDouble([262.57], [322.43]),
            yy: new ScilabDouble([163], [167]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([1, 1, 0]),
            to: new ScilabDouble([5, 1, 1])
        }));
        diagram.objs.push(scicos_link({
            xx: new ScilabDouble([234], [234]),
            yy: new ScilabDouble([275.78], [198.71]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([6, 1, 0]),
            to: new ScilabDouble([1, 2, 1])
        }));
        diagram.objs.push(scicos_link({
            xx: new ScilabDouble([234], [361], [361]),
            yy: new ScilabDouble([275.78], [275.78], [202.71]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([6, 2, 0]),
            to: new ScilabDouble([5, 1, 1])
        }));
        this.x = scicos_block();
        this.x.gui = new ScilabString(["ANDBLK"]);
        this.x.graphics.sz = new ScilabDouble([2, 2]);
        this.x.graphics.gr_i = new ScilabDouble();
        this.x.graphics.pein = new ScilabDouble([0], [0]);
        this.x.graphics.peout = new ScilabDouble([0]);
        this.x.model.sim = new ScilabString(["csuper"]);
        this.x.model.evtin = new ScilabDouble([1], [1]);
        this.x.model.evtout = new ScilabDouble([1]);
        this.x.model.blocktype = new ScilabString(["h"]);
        this.x.model.firing = new ScilabBoolean([false]);
        this.x.model.dep_ut = new ScilabBoolean([false, false]);
        this.x.model.rpar = diagram;
        return new BasicBlock(this.x);
    }
    ANDBLK.prototype.details = function ANDBLK() {
        return this.x;
    }

}
function ANDLOG_f() {

    ANDLOG_f.prototype.internal = function ANDLOG_f() {
        var model = scicos_model();
        model.sim = new ScilabString(["andlog"]);
        model.out = new ScilabDouble([1]);
        model.out2 = new ScilabDouble([1]); // null -> 1
        model.evtin = new ScilabDouble([-1], [-1]); // 1, 1 -> -1, -1
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([false, false]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"ANDLOG_f\",sz(1),sz(2));"]);
        var block = new standard_define(new ScilabDouble([80, 80]), model, new ScilabDouble(), gr_i); // 3 -> 80

        // Style
        block.graphics.out_implicit = new ScilabString(["E"]);
        // changed
        block.graphics.out_label = new ScilabString([""]);
        block.graphics.out_style = new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]);
        block.graphics.style = new ScilabString(["ANDLOG_f"]);
        return block;
    }
    ANDLOG_f.prototype.get = function ANDLOG_f() {
        alert("parameters can not be changed")
    }
    ANDLOG_f.prototype.define = function ANDLOG_f() {
        var model = scicos_model();
        model.sim = new ScilabString(["andlog"]);
        model.out = new ScilabDouble([1]);
        model.out2 = new ScilabDouble([1]); // null -> 1
        model.evtin = new ScilabDouble([-1], [-1]); // 1, 1 -> -1, -1
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([false, false]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"ANDLOG_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([80, 80]), model, new ScilabDouble(), gr_i); // 3 -> 80

        // Style
        this.x.graphics.out_implicit = new ScilabString(["E"]);
        // changed
        this.x.graphics.out_label = new ScilabString([""]);
        this.x.graphics.out_style = new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]);
        this.x.graphics.style = new ScilabString(["ANDLOG_f"]);
        return new BasicBlock(this.x);
    }

    ANDLOG_f.prototype.details = function ANDLOG() {
        return this.x;
    }
}
function AUTOMAT() {

    AUTOMAT.prototype.define = function AUTOMAT() {
        this.NMode = 2;
        this.Minitial = 1;
        this.NX = 1;
        this.X0 = [0.0];
        this.XP = [[1],[1]];
        this.C1 = [2];
        this.C2 = [1];

        var exprs = new ScilabString([this.NMode.toString()], [this.Minitial.toString()], [this.NX.toString()], [sci2exp(this.X0)], [sci2exp(this.XP)], [sci2exp(this.C1)], [sci2exp(this.C2)]);
        var ipar = new ScilabDouble([this.NMode], [this.Minitial], [this.NX], ...this.XP, this.C1, this.C2);
        var rpar = new ScilabDouble(this.X0);

        var model = scicos_model();
        model.sim = list(new ScilabString(["automat"]), new ScilabDouble([10004]));
        model.in = new ScilabDouble([2 * this.NX + 1], [2 * this.NX + 1]);
        model.out = new ScilabDouble([2], [2 * this.NX]);
        model.state = new ScilabDouble(...ones(2 * this.NX, 1));
        model.nzcross = new ScilabDouble([1]);
        model.blocktype = new ScilabString(["c"]);
        model.evtout = new ScilabDouble([1]);
        model.firing = new ScilabDouble([-1]);
        model.dep_ut = new ScilabBoolean([false, true]);
        model.ipar = ipar;
        model.rpar = rpar;

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"AUTOMAT\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([4, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);

    }

    AUTOMAT.prototype.details = function AUTOMAT() {
        return this.x;
    }
}
function Bache() {

    Bache.prototype.define = function Bache() {
        this.in1 = 2;
        this.out = 3;

        var model = scicos_model();
        model.in = new ScilabDouble(math.transpose(math.range(-1, -this.in1, -1, true)));
        model.out = new ScilabDouble(math.transpose(math.range(-1, -this.out, -1, true)));

        this.Patm = 1.013E5;
        this.A = 1;
        this.ze1 = 40;
        this.ze2 = 0;
        this.zs1 = 40;
        this.zs2 = 0;
        this.z0 = 30;
        this.T0 = 290;
        this.p_rho = 0;

        model.rpar = new ScilabDouble([this.Patm], [this.A], [this.ze1], [this.ze2], [this.zs1], [this.zs2], [this.z0], [this.T0], [this.p_rho]);
        model.sim = new ScilabString(["Bache"]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var mo = new modelica_function();
        mo.model = new ScilabString(["Bache"]);
        mo.inputs = new ScilabString(["Ce1", "Ce2"]);
        mo.outputs = new ScilabString(["Cs1", "Cs2", "yNiveau"]);
        mo.parameters = list(new ScilabString(["Patm"], ["A"], ["ze1"], ["ze2"], ["zs1"], ["zs2"], ["z0"], ["T0"], ["p_rho"]), new ScilabDouble([this.Patm], [this.A], [this.ze1], [this.ze2], [this.zs1], [this.zs2], [this.z0], [this.T0], [this.p_rho]));
        model.equations = mo;
        model.in = new ScilabDouble(...ones(size(getData(mo.inputs), '*'), 1));
        model.out = new ScilabDouble(...ones(size(getData(mo.outputs), '*'), 1));

        var exprs = new ScilabString([this.Patm.toString()], [this.A.toString()], [this.ze1.toString()], [this.ze2.toString()], [this.zs1.toString()], [this.zs2.toString()], [this.z0.toString()], [this.T0.toString()], [this.p_rho.toString()]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"Bache\",sz(1),sz(2));"]);
        this.x = new standard_define([2, 2], model, exprs, list(gr_i, 0));
        this.x.graphics.in_implicit = new ScilabString(["I"], ["I"]);
        this.x.graphics.out_implicit = new ScilabString(["I"], ["I"], ["E"]);
        return new BasicBlock(this.x);
    }
    Bache.prototype.details = function Bache() {
        return this.x;
    }
Bache.prototype.get = function Bache() {
        var options={
            Patm:["Pression dans le ciel de la bache : Patm (Pa)",this.Patm.toString().replace(/,/g," ")],
            A:["Section de la bache : A (m2)",this.A.toString().replace(/,/g," ")],
            ze1:["Altitude du piquage d entrée 1: ze1 (m)",this.ze1.toString().replace(/,/g," ")],
            ze2:["Altitude du piquage d entrée 2: ze2 (m)",this.ze2.toString().replace(/,/g," ")],
            zs1:["Altitude du piquage de sortie 1: zs1 (m)",this.zs1.toString().replace(/,/g," ")],
            zs2:["Altitude du piquage de sortie 2: zs2 (m)",this.zs2.toString().replace(/,/g," ")],
            z0:["Altitude initiale du fluide : z0 (m)",this.z0.toString().replace(/,/g," ")],
            T0:["Température initiale du fluide : T0 (K)",this.T0.toString().replace(/,/g," ")],
            p_rho:["Si >0, masse volumique imposée du fluide : p_rho (kg/m3)",this.p_rho.toString().replace(/,/g," ")],
        }
        return options
    }
Bache.prototype.set = function Bache() {
    this.Patm = parseFloat(arguments[0]["Patm"])
    this.A = parseFloat(arguments[0]["A"])
    this.ze1 = parseFloat(arguments[0]["ze1"])
    this.ze2 = parseFloat(arguments[0]["ze2"])
    this.zs1 = parseFloat(arguments[0]["zs1"])
    this.zs2 = parseFloat(arguments[0]["zs2"])
    this.z0 = parseFloat(arguments[0]["z0"])
    this.T0 = parseFloat(arguments[0]["T0"])
    this.p_rho = parseFloat(arguments[0]["p_rho"])
    this.x.model.rpar = new ScilabDouble([this.Patm],[this.A],[this.ze1],[this.ze2],[this.zs1],[this.zs2],[this.z0],[this.T0],[this.p_rho])
    this.x.model.equations.parameters= list(new ScilabString(["Patm"], ["A"], ["ze1"], ["ze2"], ["zs1"], ["zs2"], ["z0"], ["T0"], ["p_rho"]), new ScilabDouble([this.Patm], [this.A], [this.ze1], [this.ze2], [this.zs1], [this.zs2], [this.z0], [this.T0], [this.p_rho]));
    var exprs = new ScilabString([this.Patm.toString().replace(/,/g, " ")],[this.A.toString().replace(/,/g, " ")],[this.ze1.toString().replace(/,/g, " ")],[this.ze2.toString().replace(/,/g, " ")],[this.zs1.toString().replace(/,/g, " ")],[this.zs2.toString().replace(/,/g, " ")],[this.z0.toString().replace(/,/g, " ")],[this.T0.toString().replace(/,/g, " ")],[this.p_rho.toString().replace(/,/g, " ")])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function BACKLASH() {
    BACKLASH.prototype.define = function BACKLASH() {

        var exprs = new ScilabString(["0"], ["1"], ["1"]);
        var model = scicos_model();
        model.sim = list(new ScilabString(["backlash"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.rpar = new ScilabDouble([0], [1]);
        model.nzcross = new ScilabDouble([2]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"BACKLASH\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x)
    }
    BACKLASH.prototype.details = function BACKLASH() {
        return this.x;
    }
    BACKLASH.prototype.get = function BACKLASH() {
         var options={
            ini:["initial output","0"],
            gap:["gap","1"],
            zcr:["use zero-crossing (0:no, 1:yes)","1"],
        }
        return options
    }
    BACKLASH.prototype.set = function BACKLASH() {
        this.ini = parseFloat((arguments[0]["ini"]))
        this.gap = parseFloat((arguments[0]["gap"]))
        this.zcr = parseFloat((arguments[0]["zcr"]))
        var rpar = new ScilabDouble([this.ini],[this.gap])
        if(this.zcr!=0){
            this.x.model.nzcross = new ScilabDouble([2]);
        }
        else{
            this.x.model.nzcross = new ScilabDouble([0]);
        }
        this.x.model.rpar = rpar
        var exprs = new ScilabString([this.ini],[this.gap],[this.zcr])
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)
    }
}
function BARXY() {

    BARXY.prototype.define = function BARXY() {
        var model = scicos_model();
        this.xmin = -15;
        this.xmax = 15;
        this.ymin = -15;
        this.ymax = 15;

        model.sim = list(new ScilabString(["BARXY_sim"]), new ScilabDouble([5]));
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([true, false]);
        model.in = new ScilabDouble([-1], [-1]);
        model.intyp = new ScilabDouble([1]);
        model.out = new ScilabDouble();
        model.evtin = new ScilabDouble([1]);
        model.rpar = new ScilabDouble([this.xmin], [this.xmax], [this.ymin], [this.ymax]);
        model.ipar = new ScilabDouble([1]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, [], []);
        this.x.graphics.in_implicit = new ScilabString(["E", , "E"]);
        this.x.graphics.out_implicit = new ScilabDouble();
        this.x.graphics.exprs = new ScilabString(["-15"], ["15"], ["-15"], ["15"], ["1"]);
        return new BasicBlock(this.x);
    }
    BARXY.prototype.details = function BARXY() {
        return this.x;
    }
    BARXY.prototype.get = function BARXY() {
        this.thickness = getData(this.x.graphics.exprs)[4]
        this.xmin = getData(this.x.graphics.exprs)[0]
        this.xmax = getData(this.x.graphics.exprs)[1]
        this.ymin = getData(this.x.graphics.exprs)[2]
        this.ymax = getData(this.x.graphics.exprs)[3]

        var options={
            xmin:["Xmin" ,this.xmin],
            xmax:[ "Xmax" ,this.xmax],
            ymin:[ "Ymin" ,this.ymin],
            ymax:[ "Ymax",this.ymax],
            thickness:["Segs Thickness",this.thickness],
        }
        return options
    }
    BARXY.prototype.set = function BARXY() {
        this.xmin = parseFloat((arguments[0]["xmin"]))
        this.xmax = parseFloat((arguments[0]["xmax"]))
        this.ymin = parseFloat((arguments[0]["ymin"]))
        this.ymax = parseFloat((arguments[0]["ymax"]))
        this.thickness = parseFloat((arguments[0]["thickness"]))
        this.x.model.rpar = new ScilabDouble([this.xmin],[this.xmax],[this.ymin],[this.ymax])
        this.x.model.ipar = new ScilabDouble([this.thickness]);
        var exprs = new ScilabString([this.xmin],[this.xmax],[this.ymin],[this.ymax],[this.thickness])
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)
    }
}
function BIGSOM_f() {

    BIGSOM_f.prototype.define = function BIGSOM_f() {
        this.sgn = [[1],[1]];

        var model = scicos_model();
        model.sim = list(new ScilabString(["sum"]), new ScilabDouble([2]));
        model.in = new ScilabDouble([-1], [-1]);
        model.out = new ScilabDouble([-1]);
        model.rpar = new ScilabDouble(...this.sgn);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([sci2exp(this.sgn)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"BIGSOM_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 3]), model, exprs, gr_i);
        this.x.graphics.style = new ScilabString(["BIGSOM_f"]);
        return new BigSom(this.x);
    }
    BIGSOM_f.prototype.details = function BIGSOM_f() {
        return this.x;
    }
    BIGSOM_f.prototype.get = function BIGSOM_f() {
         var options={
            sgn:["Inputs ports signs/gain",this.sgn.toString().replace(/,/g," ")],
        }
        return options
    }
    BIGSOM_f.prototype.set = function BIGSOM_f() {
        this.sgn = inverse(arguments[0]["sgn"])
        this.in = ones(size(this.sgn,"*"),1)
        for (var i = this.in.length - 1; i >= 0; i--) {
            this.in[i] = -1*this.in[i]
        }
        model.rpar = new ScilabDouble(...this.sgn)
        var exprs = new ScilabString([sci2exp(this.sgn)])
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)
    }
}
function BITCLEAR() {
    BITCLEAR.prototype.define = function BITCLEAR() {
        var model = scicos_model();
        model.sim = list(new ScilabString(["bit_clear_32"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([1]);
        model.in2 = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.out2 = new ScilabDouble([1]);
        model.intyp = new ScilabDouble([3]);
        model.outtyp = new ScilabDouble([3]);
        model.opar = list(int32([0]));
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([sci2exp(3)], [sci2exp(0)]);
    var n =sci2exp(0).toString();
    this.displayParameter=[n];

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"BITCLEAR\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([4, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    BITCLEAR.prototype.details = function BITCLEAR() {
        return this.x;
    }
}
function BITSET() {

    BITSET.prototype.define = function BITSET() {
        var model = scicos_model();
        model.sim = list(new ScilabString(["bit_set_32"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([1]);
        model.in2 = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.out2 = new ScilabDouble([1]);
        model.intyp = new ScilabDouble([3]);
        model.outtyp = new ScilabDouble([3]);
        model.opar = list(uint32([0]));
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([sci2exp(3)], [sci2exp(0)]);
    var n =sci2exp(0).toString();
    this.displayParameter=[n];
    
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"BITSET\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([4, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    BITSET.prototype.details = function BITSET() {
        return this.x;
    }
}
function BOUNCE() {

    BOUNCE.prototype.define = function BOUNCE() {
        this.n = 2;

        this.k = 0;
        this.ipar = [];

        for (var i = 1; i <= this.n; i++) {
            for (var j = i + 1; j <= this.n; j++) {
                this.ipar[this.k] = [i];
                this.k++;
                this.ipar[this.k] = [j];
                this.k++;
            }
        }

        this.walls = [[0],[5],[0],[5]];
        this.x1 = [[2],[2.5]];
        this.xd = [[0],[0]];
        this.y1 = [[3],[5]];
        this.yd = [[0],[0]];
        this.g = 9.81;
        this.C = 0;
        this.rpar1 = ones(this.n, 1);
        this.rpar2 = this.rpar1;
        this.state = [...math.transpose(this.x1), ...math.transpose(this.xd), ...math.transpose(this.y1), ...math.transpose(this.yd)];

        var model = scicos_model();
        model.sim = list(new ScilabString(["bounce_ball"]), new ScilabDouble([4]));
        model.in = new ScilabDouble();
        model.out = new ScilabDouble([this.n], [this.n]);
        model.state = new ScilabDouble(...colon_operator(this.state));
        model.rpar = new ScilabDouble(...this.rpar1, ...this.rpar2, ...this.walls, [this.g], [this.C]);
        model.ipar = new ScilabDouble(...this.ipar);
        model.nzcross = new ScilabDouble([this.n * (this.n - 1) / 2 + 4 * this.n]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, true]);

        var exprs = new ScilabString([sci2exp(this.rpar1)], [sci2exp(this.rpar2)], [sci2exp(this.walls)], [sci2exp(this.x1)], [sci2exp(this.xd)], [sci2exp(this.y1)], [sci2exp(this.yd)]);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"BOUNCE\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);

        return new BasicBlock(this.x);
    }

    BOUNCE.prototype.details = function BOUNCE() {

        return this.x;
    }
}
function BOUNCEXY() {

    BOUNCEXY.prototype.define = function BOUNCEXY() {
        this.win = -1;
        this.imode = 1;
        this.clrs = [[1],[2]];
        this.siz = [[1],[1]];
        this.xmin = -5;
        this.xmax = 5;
        this.ymin = 0;
        this.ymax = 15;

        var model = scicos_model();
        model.sim = list(new ScilabString(["bouncexy"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([-1], [-1]);
        model.in2 = new ScilabDouble([1], [1]);
        model.intyp = new ScilabDouble([1], [1]);
        model.evtin = new ScilabDouble([1]);


        this.z = [];

        for (var i = 0; i < size(this.clrs, "*"); i++) {
            this.z[6 * (i) + 0] = [0];
            this.z[6 * (i) + 1] = [0];
            this.z[6 * (i) + 2] = [2 * this.siz[i]];
            this.z[6 * (i) + 3] = [2 * this.siz[i]];
            this.z[6 * (i) + 4] = [0.000];
            this.z[6 * (i) + 5] = [64.0 * 360.000];

        }

        model.dstate = new ScilabDouble(...this.z);
        model.rpar = new ScilabDouble([this.xmin], [this.xmax], [this.ymin], [this.ymax]);
        model.ipar = new ScilabDouble([this.win], [this.imode], ...colon_operator(this.clrs));
        model.blocktype = new ScilabString("d");
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([sci2exp(this.clrs)], [sci2exp(this.siz)], [sci2exp(this.win)], [sci2exp(1)], [sci2exp(this.xmin)], [sci2exp(this.xmax)], [sci2exp(this.ymin)], [sci2exp(this.ymax)]);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"BOUNCEXY\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    BOUNCEXY.prototype.details = function BOUNCEXY() {

        return this.x;
    }
BOUNCEXY.prototype.get = function BOUNCEXY() {
         var options={
            clrs:["colors",this.clrs.toString().replace(/,/g," ")],
            siz:["radii",this.siz.toString().replace(/,/g," ")],
            win:["window number (-1 for automatic)",this.win],
            imode:["animation mode (0,1)",this.imode],
            xmin:["Xmin",this.xmin],
            xmax:["Xmax",this.xmax],
            ymin:["Ymin",this.ymin],
            ymax:["Ymax",this.ymax],
        }
        return options
    }
BOUNCEXY.prototype.set = function BOUNCEXY() {
    this.clrs = inverse(arguments[0]["clrs"])
    this.siz = inverse(arguments[0]["siz"])
    this.win = parseFloat((arguments[0]["win"]))
    this.imode = parseFloat((arguments[0]["imode"]))
    this.xmin = parseFloat((arguments[0]["xmin"]))
    this.xmax = parseFloat((arguments[0]["xmax"]))
    this.ymin = parseFloat((arguments[0]["ymin"]))
    this.ymax = parseFloat((arguments[0]["ymax"]))
    this.z = [];
    for (var i = 0; i < size(this.clrs, "*"); i++) {
        this.z[6 * (i) + 0] = [0];
        this.z[6 * (i) + 1] = [0];
        this.z[6 * (i) + 2] = [2 * this.siz[i]];
        this.z[6 * (i) + 3] = [2 * this.siz[i]];
        this.z[6 * (i) + 4] = [0.000];
        this.z[6 * (i) + 5] = [64.0 * 360.000];

    }
    model.dstate = new ScilabDouble(...this.z);
    model.rpar = new ScilabDouble([this.xmin], [this.xmax], [this.ymin], [this.ymax]);
    model.ipar = new ScilabDouble([this.win], [this.imode], ...colon_operator(this.clrs));
    var exprs = new ScilabString([this.clrs.toString().replace(/,/g, " ")],[this.siz.toString().replace(/,/g, " ")],[this.win],[this.imode],[this.xmin],[this.xmax],[this.ymin],[this.ymax])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function BPLATFORM() {

    BPLATFORM.prototype.define = function BPLATFORM() {

        this.plen = 2;
        this.csiz = 2;
        this.phi = 0;
        this.xmin = -5;
        this.xmax = 5;
        this.ymin = 0;
        this.ymax = 15;

        var model = scicos_model();
        model.sim = list(new ScilabString(["bplatform2"]), new ScilabDouble([5]));
        model.in = new ScilabDouble([1], [1]);
        model.evtin = new ScilabDouble([1]);
        model.dstate = new ScilabDouble([0]);
        model.rpar = new ScilabDouble([this.plen], [this.csiz], [this.phi], [this.xmin], [this.xmax], [this.ymin], [this.ymax]);
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([this.plen], [this.csiz], [this.phi], [this.xmin], [this.xmax], [this.ymin], [this.ymax]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"BPLATFORM\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    BPLATFORM.prototype.details = function BPLATFORM() {

        return this.x;
    }
BPLATFORM.prototype.get = function BPLATFORM() {
         var options={
            plen:["pendulum length",this.plen],
            csiz:["cart size (square side)",this.csiz],
            phi:["slope",this.phi],
            xmin:["Xmin",this.xmin],
            xmax:["Xmax",this.xmax],
            ymin:[  "Ymin",this.ymin],
            ymax:[ "Ymax",this.ymax],
        }
        return options
    }
BPLATFORM.prototype.set = function BPLATFORM() {
    this.plen = parseFloat((arguments[0]["plen"]))
    this.csiz = parseFloat((arguments[0]["csiz"]))
    this.phi = parseFloat((arguments[0]["phi"]))
    this.xmin = parseFloat((arguments[0]["xmin"]))
    this.xmax = parseFloat((arguments[0]["xmax"]))
    this.ymin = parseFloat((arguments[0]["ymin"]))
    this.ymax = parseFloat((arguments[0]["ymax"]))
    var rpar = new ScilabDouble([this.plen],[this.csiz],[this.phi],[this.xmin],[this.xmax],[this.ymin],[this.ymax])
    model.rpar = rpar
    var exprs = new ScilabString([this.plen],[this.csiz],[this.phi],[this.xmin],[this.xmax],[this.ymin],[this.ymax])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function CANIMXY() {

    CANIMXY.prototype.define = function CANIMXY() {
        this.win = -1;
        this.clrs = -4;
        this.N = 2;
        this.siz = 1;
        this.wpos = [[-1],[-1]];
        this.wdim = [[-1],[-1]];
        this.xmin = -15;
        this.xmax = 15;
        this.ymin = -15;
        this.ymax = 15;
        this.nbr_curves = 1;

        var model = scicos_model();
        model.sim = list(new ScilabString(["canimxy"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([1], [1]);
        model.in2 = new ScilabDouble([1], [1]);
        model.intyp = new ScilabDouble([1], [1]);
        model.evtin = new ScilabDouble([1]);
        model.rpar = new ScilabDouble([this.xmin], [this.xmax], [this.ymin], [this.ymax]);
        model.ipar = new ScilabDouble([this.win], [1], [this.N], [this.clrs], [this.siz], [0], ...this.wpos, ...this.wdim, [this.nbr_curves]);
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([this.nbr_curves], [this.clrs], [this.siz], [this.win], ["[]"], ["[]"], [this.xmin], [this.xmax], [this.ymin], [this.ymax], [this.N]);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CANIMXY\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    CANIMXY.prototype.details = function CANIMXY() {
        return this.x;
    }
    CANIMXY.prototype.get = function CANIMXY() {

        var options={
            nbr_curves:["Number of Curves",this.nbr_curves],
            clrs:["color (>0) or mark (<0)",this.clrs],
            siz:["line or mark size",this.siz],
            win:["Output window number (-1 for automatic)",this.win],
            wpos:["Output window position","[]"],
            wdim:["Output window sizes","[]"],
            xmin:["Xmin",this.xmin],
            xmax:["Xmax",this.xmax],
            ymin:["Ymin",this.ymin],
            ymax:["Ymax",this.ymax],
            N:["Buffer size",this.N],
        }
        return options
    }
CANIMXY.prototype.set = function CANIMXY() {
    this.nbr_curves = parseFloat((arguments[0]["nbr_curves"]))
    this.clrs = parseFloat((arguments[0]["clrs"]))
    this.siz = parseFloat((arguments[0]["siz"]))
    this.win = parseFloat((arguments[0]["win"]))
    this.wpos = inverse(arguments[0]["wpos"])
    this.wdim = inverse(arguments[0]["wdim"])
    this.xmin = parseFloat((arguments[0]["xmin"]))
    this.xmax = parseFloat((arguments[0]["xmax"]))
    this.ymin = parseFloat((arguments[0]["ymin"]))
    this.ymax = parseFloat((arguments[0]["ymax"]))
    this.N = parseFloat((arguments[0]["N"]))
    this.in = ones(2,1)
    this.in2 = ones(2,1)
    for (var i = this.in.length - 1; i >= 0; i--) {
        this.in[i][0] = this.in[i][0]*this.nbr_curves
    }

    this.x.model.intyp = new ScilabDouble(...ones(2,1))
    var io = set_io(this.x.model,this.x.graphics,[...this.in,...this.in2],[],ones(1,1),[])


    if(this.wpos.length == 0){
        this.wpos = [[-1],[-1]];
    }
    if(this.wdim.length == 0){
        this.wdim = [[-1],[-1]];
    }
    var rpar = new ScilabDouble([this.xmin],[this.xmax],[this.ymin],[this.ymax])
    var ipar = new ScilabDouble([this.win],[1],[this.N],[this.clrs],[this.siz],[0],...this.wpos,...this.wdim,[this.nbr_curves])
    model.rpar = rpar
    model.ipar = ipar
    var exprs = new ScilabString([this.nbr_curves],[this.clrs],[this.siz],[this.win],["[]"],["[]"],[this.xmin],[this.xmax],[this.ymin],[this.ymax],[this.N])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function CANIMXY3D() {

    CANIMXY3D.prototype.define = function CANIMXY3D() {
        this.win = -1;
        this.N = 2;
        this.clrs = [[1],[2],[3],[4],[5],[6],[7],[13]];
        this.siz = [[1],[1],[1],[1],[1],[1],[1],[1]];
        this.wpos = [[-1],[-1]];
        this.wdim = [[-1],[-1]];
        this.param3ds = [[50],[280]];
        this.vec_x = [[-15],[15]];
        this.vec_y = [[-15],[15]];
        this.vec_z = [[-15],[15]];
        this.nbr_curves = 1;

        var model = scicos_model();
        model.sim = list(new ScilabString(["canimxy3d"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([1], [1], [1]);
        model.evtin = new ScilabDouble([1]);
        model.in2 = new ScilabDouble([1], [1], [1]);
        model.intyp = new ScilabDouble([1], [1], [1]);
        model.rpar = new ScilabDouble(...colon_operator(this.vec_x), ...colon_operator(this.vec_y), ...colon_operator(this.vec_z), ...colon_operator(this.param3ds));
        model.ipar = new ScilabDouble([this.win], [8], [this.N], ...colon_operator(this.clrs), ...colon_operator(this.siz), [8], ...colon_operator(this.wpos), ...colon_operator(this.wdim), [this.nbr_curves]);
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([this.nbr_curves], [this.clrs.toString().replace(/,/g, " ")], [this.siz.toString().replace(/,/g, " ")], [this.win], ["[]"], ["[]"], [this.vec_x.toString().replace(/,/g, " ")], [this.vec_y.toString().replace(/,/g, " ")], [this.vec_z.toString().replace(/,/g, " ")], [this.param3ds.toString().replace(/,/g, " ")], [this.N]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CANIMXY3D\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    CANIMXY3D.prototype.details = function CANIMXY3D() {
        return this.x;
    }
CANIMXY3D.prototype.get = function CANIMXY3D() {
 
        var options={
            nbr_curves:["Number of curves",this.nbr_curves],
            clrs:["color (>0) or mark (<0)",this.clrs.toString().replace(/,/g," ")],
            siz:["line or mark size",this.siz.toString().replace(/,/g," ")],
            win:["Output window number (-1 for automatic)",this.win],
            wpos:["Output window position","[]"],
            wdim:["Output window sizes","[]"],
            vec_x:["Xmin and Xmax",this.vec_x.toString().replace(/,/g," ")],
            vec_y:["Ymin and Ymax",this.vec_y.toString().replace(/,/g," ")],
            vec_z:["Zmin and Zmax",this.vec_z.toString().replace(/,/g," ")],
            param3ds:["Alpha and Theta",this.param3ds.toString().replace(/,/g," ")],
            N:["Buffer size",this.N],
        }
        return options
    }
CANIMXY3D.prototype.set = function CANIMXY3D() {
    this.nbr_curves = parseFloat((arguments[0]["nbr_curves"]))
    this.clrs = inverse(arguments[0]["clrs"])
    this.siz = inverse(arguments[0]["siz"])
    this.win = parseFloat((arguments[0]["win"]))
    this.wpos = inverse(arguments[0]["wpos"])
    this.wdim = inverse(arguments[0]["wdim"])
    this.vec_x = inverse(arguments[0]["vec_x"])
    this.vec_y = inverse(arguments[0]["vec_y"])
    this.vec_z = inverse(arguments[0]["vec_z"])
    this.param3ds = inverse(arguments[0]["param3ds"])
    this.N = parseFloat((arguments[0]["N"]))
    this.in = ones(3,1)
    this.in2 = ones(3,1)
    for (var i = this.in.length - 1; i >= 0; i--) {
        this.in[i][0] = this.in[i][0]*this.nbr_curves
    }

    this.x.model.intyp = new ScilabDouble(...ones(3,1))
    var io = set_io(this.x.model,this.x.graphics,[...this.in,...this.in2],[],ones(1,1),[])
    if(this.wpos.length==0){
        this.wpos = [[-1],[-1]];
    }
    if(this.wdim.length==0){
        this.wdim = [[-1],[-1]];
    }
    var rpar = new ScilabDouble(...this.vec_x,...this.vec_y,...this.vec_z,...this.param3ds)
    this.size_siz = size(this.siz,"*")
    var ipar = new ScilabDouble([this.win],[this.size_siz],[this.N],...this.clrs,...this.siz,[1],...this.wpos,...this.wdim,[this.nbr_curves])
    this.x.model.rpar = rpar
    this.x.model.ipar = ipar
    var exprs = new ScilabString([this.nbr_curves],[this.clrs.toString().replace(/,/g, " ")],[this.siz.toString().replace(/,/g, " ")],[this.win],["[]"],["[]"],[this.vec_x.toString().replace(/,/g, " ")],[this.vec_y.toString().replace(/,/g, " ")],[this.vec_z.toString().replace(/,/g, " ")],[this.param3ds.toString().replace(/,/g, " ")],[this.N])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function Capacitor() {

    Capacitor.prototype.define = function Capacitor() {

        var model = scicos_model();
        this.C = 0.01
        this.v = 0;
        model.rpar = new ScilabDouble([this.C],[this.v]);
        model.sim = new ScilabString(["Capacitor"]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var mo = new modelica_function();
        mo.model = new ScilabString(["Capacitor"]);
        mo.inputs = new ScilabString(["p"]);
        mo.outputs = new ScilabString(["n"]);
        mo.parameters = list(new ScilabString(["C", "v"]), list(new ScilabDouble([this.C]), new ScilabDouble([this.v])), new ScilabDouble([0, 1]));
        model.equations = mo;
        model.in = new ScilabDouble(...ones(size(getData(mo.inputs), "*"), 1));
        model.out = new ScilabDouble(...ones(size(getData(mo.outputs), "*"), 1));

        var exprs = new ScilabString([this.C], [this.v]);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"Capacitor\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 1.1]), model, exprs, list(gr_i, new ScilabDouble([0])));
        this.x.graphics.in_implicit = new ScilabString(["I"]);
        this.x.graphics.out_implicit = new ScilabString(["I"]);
        return new BasicBlock(this.x);
    }
    Capacitor.prototype.details = function Capacitor() {
        return this.x;
    }
    Capacitor.prototype.get = function Capacitor() {
        var options={
            C:["C (F)",this.C],
            v:["Initial Voltage",this.v],
        }
        return options
    }
Capacitor.prototype.set = function Capacitor() {
    this.C = parseFloat((arguments[0]["C"]))
    this.v = parseFloat((arguments[0]["v"]))
    this.x.model.rpar = new ScilabDouble([this.C]);
    this.x.model.equations.parameters = list(new ScilabString(["C", "v"]), list(new ScilabDouble([this.C]), new ScilabDouble([this.v])), new ScilabDouble([0, 1]));
    var exprs = new ScilabString([this.C],[this.v])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function CBLOCK() {

    CBLOCK.prototype.define = function CBLOCK() {
        this.in1 = 1;
        this.out = 1;
        this.clkin = [];
        this.clkout = [];
        this.x0 = [];
        this.z0 = [];
        this.typ = "c";
        this.auto = [];
        this.rpar = [];
        this.ipar = [];
        this.funam = "toto";
        this.ng = 0;

        var model = scicos_model();
        model.sim = list(new ScilabString([" "]), new ScilabDouble([2004]));
        model.in = new ScilabDouble([this.in1]);
        model.out = new ScilabDouble([this.out]);
        model.evtin = new ScilabDouble();
        model.evtout = new ScilabDouble();
        model.state = new ScilabDouble();
        model.dstate = new ScilabDouble();
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble();
        model.blocktype = new ScilabString([this.typ]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, false]);
        model.nzcross = new ScilabDouble([this.ng]);

        var label = list(new ScilabString([this.funam], ["n"], [sci2exp(this.in1)], [sci2exp(this.out)], [sci2exp(this.clkin)], [sci2exp(this.clkout)], [sci2exp(this.x0)], [sci2exp(0)], [sci2exp(this.z0)], [sci2exp(this.rpar)], [sci2exp(this.ipar)], [sci2exp(this.auto)], ["y"], ["n"]), new ScilabDouble());

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CBLOCK\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([4, 2]), model, label, gr_i);
        return new BasicBlock(this.x)
    }


    CBLOCK.prototype.details = function CBLOCK() {

        return this.x;
    }
}
function CBLOCK4() {

    CBLOCK4.prototype.define = function CBLOCK4() {

        this.funam = "toto";

        var model = scicos_model();
        model.sim = list(new ScilabString([" "]), new ScilabDouble([2004]));
        model.in = new ScilabDouble([1]);
        model.in2 = new ScilabDouble([1]);
        model.intyp = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.out2 = new ScilabDouble([1]);
        model.outtyp = new ScilabDouble([1]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var label = list(new ScilabString([this.funam], ["n"], [sci2exp([parseFloat(...getData(model.in)), parseFloat(...getData(model.in2))])], [sci2exp(parseFloat(...getData(model.intyp)))], [sci2exp([parseFloat(...getData(model.out)), parseFloat(...getData(model.out2))])], [sci2exp(parseFloat(...getData(model.outtyp)))], [sci2exp(getData(model.evtin))], [sci2exp(getData(model.evtout))], [sci2exp(getData(model.state))], [sci2exp(getData(model.dstate))], [sci2exp(model.odstate)], [sci2exp(getData(model.rpar))], [sci2exp(getData(model.ipar))], [sci2exp(model.opar)], [sci2exp(parseFloat(...getData(model.nmode)))], [sci2exp(parseFloat(...getData(model.nzcross)))], [sci2exp(getData(model.firing))], ["y"], ["n"]), new ScilabDouble());

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CBLOCK4\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([4, 2]), model, label, gr_i);
        return new BasicBlock(this.x);
    }

    CBLOCK4.prototype.details = function CBLOCK4() {
        return this.x;
    }
// CBLOCK4.prototype.get = function CBLOCK4() {
//          var options={
//             function_name:["Simulation function",this.function_name],
//             impli:["Is block implicit? (y,n)","n"],
//             in:["Input ports sizes",sci2exp([this.x.model.in,this.x.model.in2])],
//             it:["Input ports type",sci2exp(this.x.model.intyp)],
//             out:["Output port sizes",sci2exp([this.x.model.out,this.x.model.out2])],
//             ot:["Output ports type",sci2exp(this.x.model.outtyp)],
//             ci:["Input event ports sizes",sci2exp(this.x.model.evtin)],
//             co:["Output events ports sizes",sci2exp(this.x.model.evtout)],
//             xx:["Initial continuous state",sci2exp(this.x.model.state)],
//             z:["Initial discrete state",sci2exp(this.x.model.dstate)],
//             oz:["Initial object state",sci2exp(this.x.model.odstate)],
//             rpar:["Real parameters vector",sci2exp(this.x.model.rpar)],
//             ipar:["Integer parameters vector",sci2exp(this.x.model.ipar)],
//             opar:["Object parameters list",sci2exp(this.x.model.opar)],
//             nmode:["Number of modes",sci2exp(this.x.model.nmode)],
//             nzcr:["Number of zero crossings",sci2exp(this.x.model.nzcross)],
//             auto0:["Initial firing vector (<0 for no firing)",sci2exp(this.x.model.firing)],
//             depu:["Direct feedthrough (y or n)","y"],
//             dept:["Time dependence (y or n)","n"],
//         }
//         return options
//     }
// CBLOCK4.prototype.set = function CBLOCK4() {
//     this.function_name = arguments[0]["function_name"]
//     this.impli = arguments[0]["impli"]
//     this.in = inverse(arguments[0]["in"])
//     this.it = inverse(arguments[0]["it"])
//     this.out = inverse(arguments[0]["out"])
//     this.ot = inverse(arguments[0]["ot"])
//     this.ci = inverse(arguments[0]["ci"])
//     this.co = inverse(arguments[0]["co"])
//     this.xx = inverse(arguments[0]["xx"])
//     this.z = inverse(arguments[0]["z"])
//     this.oz = inverse(arguments[0]["oz"])
//     this.rpar = inverse(arguments[0]["rpar"])
//     this.ipar = inverse(arguments[0]["ipar"])
//     this.opar = inverse(arguments[0]["opar"])
//     this.nmode = parseFloat((arguments[0]["nmode"]))
//     this.nzcr = parseFloat((arguments[0]["nzcr"]))
//     this.auto0 = parseFloat((arguments[0]["auto0"]))
//     this.depu = arguments[0]["depu"]
//     this.dept = arguments[0]["dept"]
//     if(this.impli == "y"){
//         this.funtyp = 12004
//     }
//     else{
//         this.funtyp = 2004
//     }
//     if(this.depu=="y"){
//         this.depu=true;
//     }
//     else{
//         this.depu=false;
//     }
//     if(this.dept=="y"){
//         this.dept=true;
//     }
//     else{
//         this.dept=false;
//     }
//     this.x.model.dep_ut = new ScilabBoolean([this.depu,this.dept])
//     this.x.model.sim = list(new ScilabString(this.function_name), )
//     this.x.model.state = new ScilabDouble(...this.xx);
//     this.x.model.dstate = new ScilabDouble(...this.z);
//     this.x.model.odstate = new ScilabDouble(...this.oz);
//     this.x.model.rpar = new ScilabDouble(...this.rpar);
//     this.x.model.ipar = new ScilabDouble(...this.ipar);
//     this.x.model.opar = new ScilabDouble(...this.opar);
//     this.x.model.firing = new ScilabDouble([this.auto0]);
//     this.x.model.nzcross = new ScilabDouble([this.nzcr]);
//     this.x.model.nmode = new ScilabDouble([this.nmode]);
//     var exprs = new ScilabString([this.function_name],[this.impli],[sci2exp(this.in)],[sci2exp(this.it)],[sci2exp(this.out)],[sci2exp(this.ot)],[sci2exp(this.ci)],[sci2exp(this.co)],[sci2exp(this.xx)],[sci2exp(this.z)],[sci2exp(this.oz)],[sci2exp(this.rpar)],[sci2exp(this.ipar)],[sci2exp(this.opar)],[sci2exp(this.nmode)],[sci2exp(this.nzcr)],[sci2exp(this.auto0)],[this.depu],[this.dept])
//     this.x.graphics.exprs=exprs
//     return new BasicBlock(this.x)
//     }
}
function CCS() {
    CCS.prototype.get = function CCS() {
        alert("parameters can not be changed")
    }

    CCS.prototype.define = function CCS() {
        this.ModelName = "CCS";
        this.PrametersValue = new ScilabDouble();
        this.ParametersName = new ScilabDouble();
        var model = scicos_model();
        this.Typein = [];
        this.Typeout = [];
        this.MI = [];
        this.MO = [];
        this.P = [[2,50,1,0],[70,98,2,0],[70,2,-2,0]];
        this.PortName = [["Iin"],["p"],["n"]];

        for (var i = 0; i < size(this.P, "r"); i++) {
            if (this.P[i][2] == 1) {
                this.Typein.push(["E"]);
                this.MI.push(this.PortName[i]);
            }

            if (this.P[i][2] == 2) {
                this.Typein.push(["I"]);
                this.MI.push(this.PortName[i]);
            }
            if (this.P[i][2] == -1) {
                this.Typeout.push(["E"]);
                this.MO.push(this.PortName[i]);
            }
            if (this.P[i][2] == -2) {
                this.Typeout.push(["I"]);
                this.MO.push(this.PortName[i]);
            }
        }

        var mo = new modelica_function();
        model.sim = new ScilabString([this.ModelName]);
        mo.inputs = new ScilabString(...this.MI);
        mo.outputs = new ScilabString(...this.MO);
        model.rpar = this.PrametersValue;
        mo.parameters = list(this.ParametersName, this.PrametersValue, new ScilabDouble(...zeros(getData(this.ParametersName))));
        var exprs = new ScilabDouble();
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CCS\",sz(1),sz(2));"]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, true]);
        mo.model = new ScilabString([this.ModelName]);
        model.equations = mo;
        model.in = new ScilabDouble(...ones(size(this.MI, "*"), 1));
        model.out = new ScilabDouble(...ones(size(this.MO, "*"), 1));
        this.x = new standard_define(new ScilabDouble([2.1, 3]), model, exprs, list(new ScilabString([gr_i]), new ScilabDouble([0])));
        this.x.graphics.in_implicit = new ScilabDouble(this.Typein);
        this.x.graphics.out_implicit = new ScilabDouble(this.Typeout);
        return new BasicBlock(this.x);
    }

    CCS.prototype.details = function CCS() {
        return this.x;
    }
}
function CEVENTSCOPE() {

    CEVENTSCOPE.prototype.define = function CEVENTSCOPE() {
        this.nclock = 1;
        this.win = -1;
        this.clrs = [[1],[3],[5],[7],[9],[11],[13],[15]];
        this.wdim = [[600],[400]];
        this.wpos = [[-1],[-1]];
        this.per = 30;

        var model = scicos_model();
        model.sim = list(new ScilabString(["cevscpe"]), new ScilabDouble([4]));
        model.evtin = new ScilabDouble([1]);
        model.rpar = new ScilabDouble([this.per]);
        model.ipar = new ScilabDouble([this.win], [1], this.clrs[this.nclock - 1], ...this.wpos, ...this.wdim);
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([sci2exp(this.nclock)], this.clrs[this.nclock - 1], [this.win], [sci2exp([])], [sci2exp(this.wdim)], [this.per]);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CEVENTSCOPE\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    CEVENTSCOPE.prototype.details = function CEVENTSCOPE() {
        return this.x;
    }
}
function CFSCOPE() {

    CFSCOPE.prototype.get = function CFSCOPE() {

        var options={
            clrs:["Color (>0) or mark (<0) vector (8 entries)",this.clrs.toString().replace(/,/g, " ")],
            win:["Output window number (-1 for automatic)",this.win],
            wpos:["Output window position",sci2exp([])],
            wdim:["Output window sizes", this.wdim.toString().replace(/,/g, " ")],
            ymin:["Ymin",this.ymin],
            ymax:["Ymax",this.ymax],
            per:["Refresh Period",this.per],
            N:["Buffer size",this.N],
            wu:["Links to view",1],
        };
        return options;
    }
    
    
    CFSCOPE.prototype.set = function CFSCOPE() {
        this.clrs = inverse(arguments[0]["clrs"]);
        this.win = parseFloat((arguments[0]["win"]));
        this.wpos = inverse((arguments[0]["wpos"]));
        this.wdim = inverse((arguments[0]["wdim"]));
        this.ymin = parseFloat(arguments[0]["ymin"]);
        this.ymax = parseFloat(arguments[0]["ymax"]);
        this.per = parseFloat(arguments[0]["per"]);
        this.N = parseFloat((arguments[0]["N"]));
        this.wu = parseFloat(arguments[0]["wu"]);
        if(this.wpos.length == 0 || this.wpos[0].length == 0){
            this.wpos = [[-1], [-1]]
        }
        var rpar = new ScilabDouble([0], [this.ymin], [this.ymax], [this.per])
        var ipar = new ScilabDouble([this.win], [1], [this.N], ...this.clrs, ...this.wpos, ...this.wdim, [this.wu.length], [this.wu]);
        var exprs = new ScilabString([this.clrs.toString().replace(/,/g, " ")], [this.win], [sci2exp(this.wpos)], [sci2exp(this.wdim)], [this.ymin], [this.ymax], [this.per], [this.N], [1]);
        this.x.model.ipar = ipar;
        this.x.model.rpar = rpar;
        this.x.model.dep_ut = new ScilabBoolean([true, false]);
        this.x.graphics.exprs = exprs;
        return new BasicBlock(this.x);
    };


    CFSCOPE.prototype.define = function CFSCOPE() {
        this.win = -1;
        this.wdim = [[600],[400]];
        this.wpos = [[-1],[-1]];
        this.clrs = [[1],[3],[5],[7],[9],[11],[13],[15]];
        this.N = 2;
        this.ymin = -15;
        this.ymax = 15;
        this.per = 30;

        var model = scicos_model();
        model.sim = list(new ScilabString(["cfscope"]), new ScilabDouble([4]));
        model.evtin = new ScilabDouble([1]);
        model.rpar = new ScilabDouble([0], [this.ymin], [this.ymax], [this.per]);
        model.ipar = new ScilabDouble([this.win], [1], [this.N], ...this.clrs, ...this.wpos, ...this.wdim, [1], [1]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);
        var exprs = new ScilabString([this.clrs.toString().replace(/,/g, " ")], [this.win], [sci2exp([])], [sci2exp(this.wdim)], [this.ymin], [this.ymax], [this.per], [this.N], [1]);
        var gr_i = list(new ScilabString(["xstringb(orig(1),orig(2),\"CFSCOPE\",sz(1),sz(2));"]), new ScilabDouble([8]));
        this.x = new standard_define(new ScilabDouble([80, 80]), model, exprs, gr_i); // 2 -> 80
        this.x.graphics.style = new ScilabString(["CFSCOPE"]);
        return new BasicBlock(this.x);
    }
    CFSCOPE.prototype.details = function CFSCOPE() {
        return this.x;
    }
}

function CLINDUMMY_f() {
    CLINDUMMY_f.prototype.get = function CLINDUMMY_f() {
        alert("parameters can not be changed")
    }

    CLINDUMMY_f.prototype.define = function CLINDUMMY_f() {
        this.x0 = 0;

        var model = scicos_model();
        model.sim = list(new ScilabString(["cdummy"]), new ScilabDouble([4]));
        model.state = new ScilabDouble([this.x0]);
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([false, true]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CLINDUMMY_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, new ScilabDouble(), gr_i);
        return new BasicBlock(this.x);
    }
    CLINDUMMY_f.prototype.details = function CLINDUMMY_f() {
        return this.x;
    }
}
function CLKFROM() {
CLKFROM.prototype.get = function CLKFROM() {
         var options={
            tag:["Tag","A"],
        }
        return options
    }
CLKFROM.prototype.set = function CLKFROM() {
    this.tag = arguments[0]["tag"]
    this.x.model.opar = list(new ScilabString(this.tag))
    this.x.model.evtout = new ScilabDouble([1]);
    this.x.model.firing = new ScilabDouble([-1]);
    var exprs = new ScilabString([this.tag])
    this.displayParameter = [this.tag];
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
    CLKFROM.prototype.define = function CLKFROM() {
        var model = scicos_model();
        model.sim = new ScilabString(["clkfrom"]);
        model.evtout = new ScilabDouble([1]);
        model.opar = list(new ScilabString(["A"]));
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble([-1]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString(["A"]);
    this.displayParameter = ["A"];
        this.x = new standard_define(new ScilabDouble([2, 1]), model, exprs, new ScilabString([" "]));
        this.x.graphics.id = new ScilabString(["From"]);
        return new BasicBlock(this.x);
    }
    CLKFROM.prototype.details = function CLKFROM() {
        return this.x;
    }
}function CLKGOTO() {

    CLKGOTO.prototype.define = function CLKGOTO() {
        var model = scicos_model();
        model.sim = new ScilabString(["clkgoto"]);
        model.evtin = new ScilabDouble([1]);
        model.opar = list(new ScilabString(["A"]));
        model.ipar = new ScilabDouble([1]);
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble([-1]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString(["A"], [sci2exp(1)]);
    this.displayParameter = ["A"];
        this.x = new standard_define(new ScilabDouble([2, 1]), model, exprs, new ScilabString([" "]));
        this.x.graphics.id = new ScilabString(["Goto"]);
        return new BasicBlock(this.x);
    }

    CLKGOTO.prototype.details = function CLKGOTO() {
        return this.x;
    }
CLKGOTO.prototype.get = function CLKGOTO() {
        var options={
            tag:["Tag","A"],
            tagvis:["Tag Visibility (1=Local 2=Scoped 3=Global)",sci2exp(1)],
        }
        return options
    }
CLKGOTO.prototype.set = function CLKGOTO() {
    this.tag = arguments[0]["tag"]
    this.tagvis = parseFloat((arguments[0]["tagvis"]))
    this.x.model.opar = list(new ScilabString(this.tag))
    this.x.model.ipar = new ScilabDouble([this.tagvis]);
    this.x.model.evtin = new ScilabDouble([1]);
    this.x.model.firing = new ScilabDouble([-1]);
    var exprs = new ScilabString([this.tag],[sci2exp(this.tagvis)])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function CLKGotoTagVisibility() {

    CLKGotoTagVisibility.prototype.define = function CLKGotoTagVisibility() {
        var model = scicos_model();
        model.sim = new ScilabString(["clkgototagvisibility"]);
        model.in1 = new ScilabDouble();
        model.in2 = new ScilabDouble();
        model.out = new ScilabDouble();
        model.out2 = new ScilabDouble();
        model.evtin = new ScilabDouble();
        model.intyp = new ScilabDouble([1]);
        model.outtyp = new ScilabDouble([1]);
        model.opar = list(new ScilabString(["A"]));
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabBoolean([false]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString(["A"]);
    this.displayParameter = ["A"];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CLKGotoTagVisibility\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    CLKGotoTagVisibility.prototype.details = function CLKGotoTagVisibility() {
        return this.x;
    }
CLKGotoTagVisibility.prototype.get = function CLKGotoTagVisibility() {
        if(this.tag == undefined || this.tag == null){
            this.tag = "A"
        }
        var options={
            tag:["GotoTag",this.tag],
        }
        return options
    }
CLKGotoTagVisibility.prototype.set = function CLKGotoTagVisibility() {
    this.tag = arguments[0]["tag"]
    this.x.model.opar = list(new ScilabString([this.tag]))
    var exprs = new ScilabString([this.tag])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
 
}
function CLKINV_f() {

    CLKINV_f.prototype.define = function CLKINV_f() {
        this.prt = 1;

        var model = scicos_model();
        model.sim = new ScilabString(["input"]);
        model.evtout = new ScilabDouble([1]);
        model.ipar = new ScilabDouble([this.prt]);
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble([-1]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([this.prt]);
    var n =this.prt.toString();
    this.displayParameter=[n];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CLKINV_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([1, 1]), model, exprs, gr_i);
        return new EventInBlock(this.x);
    }
    CLKINV_f.prototype.internal = function CLKINV_f() {
        this.prt = 1;

        var model = scicos_model();
        model.sim = new ScilabString(["input"]);
        model.evtout = new ScilabDouble([1]);
        model.ipar = new ScilabDouble([this.prt]);
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble([-1]);
        model.dep_ut = new ScilabBoolean([false, false]);
        model.outtyp = new ScilabDouble();

        var exprs = new ScilabString([this.prt]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CLKINV_f\",sz(1),sz(2));"]);
        var block = new standard_define(new ScilabDouble([1, 1]), model, exprs, gr_i);
        block.graphics.style = new ScilabString(["CLKINV_f"]);
        return block;
    }
    CLKINV_f.prototype.details = function CLKINV_f() {
        return this.x;
    }
CLKINV_f.prototype.get = function CLKINV_f() {
        var options={
            prt:["Event input port",this.prt],
        }
        return options
    }
CLKINV_f.prototype.set = function CLKINV_f() {
    this.prt = parseFloat((arguments[0]["prt"]))
    this.x.model.ipar = new ScilabDouble([this.prt]);
    this.x.model.evtout = new ScilabDouble([1]);
    this.x.model.firing = new ScilabDouble([-1]);
    var exprs = new ScilabString([this.prt])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function CLKOUTV_f() {

    CLKOUTV_f.prototype.define = function CLKOUTV_f() {

        this.prt = 1;

        var model = scicos_model();
        model.sim = new ScilabString(["output"]);
        model.evtin = new ScilabDouble([1]);
        model.ipar = new ScilabDouble([this.prt]);
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([this.prt]);
    var n = this.prt.toString();
    this.displayParameter=[n];
        this.x = new standard_define(new ScilabDouble([1, 1]), model, exprs, new ScilabString([" "]));
        return new EventOutBlock(this.x);
    }

    CLKOUTV_f.prototype.internal = function CLKOUTV_f() {

        this.prt = 1;

        var model = scicos_model();
        model.sim = new ScilabString(["output"]);
        model.evtin = new ScilabDouble([1]);
        model.ipar = new ScilabDouble([this.prt]);
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([false, false]);
        model.outtyp = new ScilabDouble();
        var exprs = new ScilabString([this.prt]);
        var block = new standard_define(new ScilabDouble([1, 1]), model, exprs, new ScilabString([" "]));
        block.graphics.gr_i = list(new ScilabString(["xstringb(orig(1),orig(2),&quot;CLKOUTV_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8]));
        block.graphics.style = new ScilabString(["CLKOUTV_f"]);
        return block;
    }

    CLKOUTV_f.prototype.details = function CLKOUTV_f() {
        return this.x;
    }
CLKOUTV_f.prototype.get = function CLKOUTV_f() {
        var options={
            prt:["Port number",this.prt],
        }
        return options
    }
CLKOUTV_f.prototype.set = function CLKOUTV_f() {
    this.prt = parseFloat((arguments[0]["prt"]))
    this.x.model.ipar = new ScilabDouble([this.prt]);
    this.x.model.evtin = new ScilabDouble([1]);
    var exprs = new ScilabString([this.prt])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function CLKSOMV_f() {
    CLKSOMV_f.prototype.get = function CLKSOMV_f() {
        alert("parameters can not be changed")
    }

    CLKSOMV_f.prototype.internal = function CLKSOMV_f() {
        var model = scicos_model();
        model.sim = new ScilabString(["sum"]);
        model.evtin = new ScilabDouble([1], [1], [1]);
        model.evtout = new ScilabDouble([1]);
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble([-1]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CLKSOMV_f\",sz(1),sz(2));"]);
        var block = new standard_define(new ScilabDouble([2, 2]), model, new ScilabDouble(), gr_i);
        return block;
    }

    CLKSOMV_f.prototype.define = function CLKSOMV_f() {
        var model = scicos_model();
        model.sim = new ScilabString(["sum"]);
        model.evtin = new ScilabDouble([1], [1], [1]);
        model.evtout = new ScilabDouble([1]);
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble([-1]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CLKSOMV_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, new ScilabDouble(), gr_i);
        return new RoundBlock(this.x);
    }
    CLKSOMV_f.prototype.details = function CLKSOMV_f() {
        return this.x;
    }
}
function CLKSOM_f() {

    CLKSOM_f.prototype.internal = function CLKSOM_f() {

        var model = scicos_model();
        model.sim = new ScilabString(["sum"]);
        model.evtin = new ScilabDouble([1], [1], [1]);
        model.evtout = new ScilabDouble([1]);
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble([-1]);
        model.dep_ut = new ScilabBoolean([false, false]);
        model.outtyp = new ScilabDouble();

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CLKSOM_f\",sz(1),sz(2));"]);
        var block = standard_define(new ScilabDouble([1, 1]), model, [], gr_i);
        block.graphics.style = new ScilabString(["CLKSOM_f"])
        return block;
    }
}





function DLATCH() {


    DLATCH.prototype.define = function DLATCH() {
        var scs_m = scicos_diagram({
            version: new ScilabString(["scicos4.2"]),
            props: scicos_params({
                wpar: new ScilabDouble([600, 450, 0, 0, 600, 450]),
                Title: new ScilabString(["DLATCH"]),
                tol: new ScilabDouble([0.0001], [0.000001], [1.000E-10], [100001], [0], [0], [0]),
                tf: new ScilabDouble([100000]),
                context: new ScilabString([" "]),
                void1: new ScilabDouble(),
                options: tlist(["scsopt", "3D", "Background", "Link", "ID", "Cmap"], new ScilabString(["scsopt", "3D", "Background", "Link", "ID", "Cmap"]), list(new ScilabBoolean([true]), new ScilabDouble([33])), new ScilabDouble([8, 1]), new ScilabDouble([1, 5]), list(new ScilabDouble([5, 1]), new ScilabDouble([4, 1])), new ScilabDouble([0.8, 0.8, 0.80])),
                void2: new ScilabDouble(),
                void3: new ScilabDouble(),
                doc: list()
            })
        });
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["CONST_m"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([109.62561, 263.44465]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["int8(0)"]),
                pin: new ScilabDouble(),
                pout: new ScilabDouble([7]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;CONST_m&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabDouble(),
                out_implicit: new ScilabString(["E"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_label: new ScilabString([""]),
                style: new ScilabString(["CONST_m"])
            }),
            model: scicos_model({
                sim: list(new ScilabString(["cstblk4_m"]), new ScilabDouble([4])),
                in: new ScilabDouble(),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble(),
                out: new ScilabDouble([1]),
                out2: new ScilabDouble([1]),
                outtyp: new ScilabDouble([5]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble(),
                opar: list(int8([0])),
                blocktype: new ScilabString(["d"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["IFTHEL_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([233.37693, 320.30536]),
                sz: new ScilabDouble([60, 60]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["0"], ["1"]),
                pin: new ScilabDouble([13]),
                pout: new ScilabDouble(),
                pein: new ScilabDouble(),
                peout: new ScilabDouble([6], [0]),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;IFTHEL_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabDouble(),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""]),
                style: new ScilabString(["IFTHEL_f"])
            }),
            model: scicos_model({
                sim: list(new ScilabString(["ifthel"]), new ScilabDouble([-1])),
                in: new ScilabDouble([1]),
                in2: new ScilabDouble([1]),
                intyp: new ScilabDouble([-1]),
                out: new ScilabDouble(),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble(),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble([1], [1]),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble(),
                opar: list(),
                blocktype: new ScilabString(["l"]),
                firing: new ScilabDouble([-1], [-1]),
                dep_ut: new ScilabBoolean([true, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([1]),
                nmode: new ScilabDouble([1]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["LOGICAL_OP"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([152.88902, 260.24498]),
                sz: new ScilabDouble([60, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["2"], ["1"], ["5"], ["0"]),
                pin: new ScilabDouble([15], [7]),
                pout: new ScilabDouble([5]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;LOGICAL_OP&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"], ["E"]),
                out_implicit: new ScilabString(["E"]),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"], ["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""], [""]),
                out_label: new ScilabString([""]),
                style: new ScilabString(["LOGICAL_OP"])
            }),
            model: scicos_model({
                sim: list(new ScilabString(["logicalop_i8"]), new ScilabDouble([4])),
                in: new ScilabDouble([-1], [-1]),
                in2: new ScilabDouble([-2], [-2]),
                intyp: new ScilabDouble([5], [5]),
                out: new ScilabDouble([-1]),
                out2: new ScilabDouble([-2]),
                outtyp: new ScilabDouble([5]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble([1], [0]),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([true, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["SAMPHOLD_m"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([233.72156, 260.24498]),
                sz: new ScilabDouble([40, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["5"]),
                pin: new ScilabDouble([5]),
                pout: new ScilabDouble([9]),
                pein: new ScilabDouble([6]),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;SAMPHOLD_m&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabString(["E"]),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""]),
                out_label: new ScilabString([""]),
                style: new ScilabString(["SAMPHOLD_m"])
            }),
            model: scicos_model({
                sim: list(new ScilabString(["samphold4_m"]), new ScilabDouble([4])),
                in: new ScilabDouble([-1]),
                in2: new ScilabDouble([-2]),
                intyp: new ScilabDouble([5]),
                out: new ScilabDouble([-1]),
                out2: new ScilabDouble([-2]),
                outtyp: new ScilabDouble([5]),
                evtin: new ScilabDouble([1]),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble(),
                opar: list(),
                blocktype: new ScilabString(["d"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([true, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["LOGICAL_OP"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([317.46698, 309.46812]),
                sz: new ScilabDouble([60, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1"], ["5"], ["5"], ["0"]),
                pin: new ScilabDouble([11]),
                pout: new ScilabDouble([17]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;LOGICAL_OP&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabString(["E"]),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""]),
                out_label: new ScilabString([""]),
                style: new ScilabString(["LOGICAL_OP"])
            }),
            model: scicos_model({
                sim: list(new ScilabString(["logicalop_i8"]), new ScilabDouble([4])),
                in: new ScilabDouble([-1]),
                in2: new ScilabDouble([-2]),
                intyp: new ScilabDouble([5]),
                out: new ScilabDouble([-1]),
                out2: new ScilabDouble([-2]),
                outtyp: new ScilabDouble([5]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble([5], [0]),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([true, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["SPLIT_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([305.09603, 280.83282]),
                sz: new ScilabDouble([0.3333333, 0.3333333]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabDouble(),
                pin: new ScilabDouble([9]),
                pout: new ScilabDouble([11], [19], [0]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;SPLIT_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabString(["E"], ["E"], ["E"]),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"], ["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"], ["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""]),
                out_label: new ScilabString([""], [""], [""]),
                style: new ScilabString(["SPLIT_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["lsplit"]),
                in: new ScilabDouble([-1]),
                in2: new ScilabDouble([1]),
                intyp: new ScilabDouble([1]),
                out: new ScilabDouble([-1], [-1], [-1]),
                out2: new ScilabDouble([1], [1], [1]),
                outtyp: new ScilabDouble([1], [1], [1]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble(),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([true, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["IN_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([184.8055, 340.30536]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["2"]),
                pin: new ScilabDouble(),
                pout: new ScilabDouble([13]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;IN_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabDouble(),
                out_implicit: new ScilabString(["E"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_label: new ScilabString([""]),
                style: new ScilabString(["OUT_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["input"]),
                in: new ScilabDouble(),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble(),
                out: new ScilabDouble([-1]),
                out2: new ScilabDouble([1]),
                outtyp: new ScilabDouble([-1]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble([2]),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["IN_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([104.31759, 276.91165]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1"]),
                pin: new ScilabDouble(),
                pout: new ScilabDouble([15]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;IN_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabDouble(),
                out_implicit: new ScilabString(["E"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_label: new ScilabString([""]),
                style: new ScilabString(["IN_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["input"]),
                in: new ScilabDouble(),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble(),
                out: new ScilabDouble([-1]),
                out2: new ScilabDouble([1]),
                outtyp: new ScilabDouble([-1]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble([1]),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["OUT_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([406.03841, 319.46812]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["2"]),
                pin: new ScilabDouble([17]),
                pout: new ScilabDouble(),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;OUT_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabDouble(),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""]),
                style: new ScilabString(["OUT_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["output"]),
                in: new ScilabDouble([-1]),
                in2: new ScilabDouble([1]),
                intyp: new ScilabDouble([-1]),
                out: new ScilabDouble(),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble(),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble([2]),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["OUT_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([325.09603, 270.83282]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1"]),
                pin: new ScilabDouble([19]),
                pout: new ScilabDouble(),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;OUT_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabDouble(),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""]),
                style: new ScilabString(["OUT_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["output"]),
                in: new ScilabDouble([-1]),
                in2: new ScilabDouble([1]),
                intyp: new ScilabDouble([-1]),
                out: new ScilabDouble(),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble(),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble([1]),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));

        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([221.46044], [225.15013]),
            yy: new ScilabDouble([280.24498], [280.24498]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([3, 1, 0]),
            to: new ScilabDouble([4, 1, 1])

        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([253.37693], [253.72156]),
            yy: new ScilabDouble([314.59108], [305.95927]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([2, 1, 0]),
            to: new ScilabDouble([4, 1, 1])

        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([138.19704], [144.31759]),
            yy: new ScilabDouble([273.44465], [273.57832]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([1, 1, 0]),
            to: new ScilabDouble([3, 2, 1])

        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([282.29299], [305.09603], [305.09603]),
            yy: new ScilabDouble([280.24498], [280.52797], [280.83282]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([4, 1, 0]),
            to: new ScilabDouble([10, 1, 1])

        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([305.09603], [305.09603], [308.89555]),
            yy: new ScilabDouble([280.83282], [329.46812], [329.46812]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([10, 1, 0]),
            to: new ScilabDouble([8, 1, 1])

        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([204.8055], [224.8055]),
            yy: new ScilabDouble([350.30536], [350.30536]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([12, 1, 0]),
            to: new ScilabDouble([2, 1, 1])

        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([124.31759], [144.31759]),
            yy: new ScilabDouble([286.91165], [286.91165]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([14, 1, 0]),
            to: new ScilabDouble([3, 1, 1])

        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([386.03841], [406.03841]),
            yy: new ScilabDouble([329.46812], [329.46812]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([8, 1, 0]),
            to: new ScilabDouble([16, 1, 1])

        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([305.09603], [325.09603]),
            yy: new ScilabDouble([280.83282], [280.83282]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([10, 2, 0]),
            to: new ScilabDouble([18, 1, 1])

        }));

        var model = scicos_model();
        model.sim = new ScilabString(["csuper"]);
        model.in = new ScilabDouble([1], [1]);
        model.in2 = new ScilabDouble([1], [1]);
        model.out = new ScilabDouble([1], [1]);
        model.out2 = new ScilabDouble([1], [1]);
        model.intyp = new ScilabDouble([5, -1]);
        model.outtyp = new ScilabDouble([5, 5]);
        model.blocktype = new ScilabString(["h"]);
        model.firing = new ScilabBoolean([false]);
        model.dep_ut = new ScilabBoolean([true, false]);
        model.rpar = scs_m;

        var gr_i = new ScilabDouble();
        this.x = new standard_define(new ScilabDouble([2, 3]), model, new ScilabDouble(), gr_i);
        return new BasicBlock(this.x);
    }
    DLATCH.prototype.details = function DLATCH() {
        return this.x;
    }
}



function CLOCK_c() {

    CLOCK_c.prototype.get = function CLOCK_c() {
        var options = {
            dt: ["Period", getData(this.x.model.rpar.objs[1].model.rpar)[0]],
            t0: ["Initialisation Time", getData(this.x.model.rpar.objs[1].model.firing)],
        };
        return options;
    }

    CLOCK_c.prototype.set = function CLOCK_c() {
        this.x.model.rpar.objs[1].model.firing = new ScilabDouble([arguments[0]["t0"]]);
        this.x.model.rpar.objs[1].model.rpar = new ScilabDouble([arguments[0]["dt"]], [arguments[0]["t0"]]);
        this.x.model.rpar.objs[1].graphics.exprs = new ScilabString([arguments[0]["dt"]], [arguments[0]["t0"]])
        return new BasicBlock(this.x);
    }

    CLOCK_c.prototype.define = function CLOCK_c() {
        var evtdly = new EVTDLY_c().internal();
        evtdly.graphics.orig = new ScilabDouble([320, 232]);
        evtdly.graphics.sz = new ScilabDouble([40, 40]);
        evtdly.graphics.flip = new ScilabBoolean([true]);
        evtdly.graphics.exprs = new ScilabString(["0.1"], ["0.1"]);
        evtdly.graphics.pein = new ScilabDouble([6]);
        evtdly.graphics.peout = new ScilabDouble([3]);
        evtdly.model.rpar = new ScilabDouble([0.1], [0.1]);
        evtdly.model.firing = new ScilabDouble([0.1]);

        evtdly.model.uid = new ScilabString([count]); // changed
        evtdly.doc = list(new ScilabString([count++]));
        evtdly.model.evtin = new ScilabDouble([-1]);
        evtdly.model.evtout = new ScilabDouble([-1]);
        evtdly.graphics.peout = new ScilabDouble([4]);

        var output_port = new CLKOUT_f().internal();
        output_port.graphics.orig = new ScilabDouble([399, 162]);
        output_port.graphics.sz = new ScilabDouble([20, 20]);
        output_port.graphics.flip = new ScilabBoolean([true]);
        output_port.graphics.exprs = new ScilabString(["1"]);
        output_port.graphics.pein = new ScilabDouble([5]);
        output_port.model.ipar = new ScilabDouble([1]);

        output_port.model.uid = new ScilabString([count]); // changed
        output_port.doc = list(new ScilabString([count++]));

        var split = new CLKSPLIT_f().internal();
        split.graphics.orig = new ScilabDouble([380.71066, 172]);
        split.graphics.pein = new ScilabDouble([3]);
        split.graphics.peout = new ScilabDouble([5], [6]);
        split.model.uid = new ScilabString([count]);
        split.doc = list(new ScilabString([count++]));
        split.graphics.pein = new ScilabDouble([4]); // changed

        var diagram = scicos_diagram();
        diagram.objs.push(output_port);
        diagram.objs.push(evtdly);
        diagram.objs.push(split);
        diagram.objs.push(scicos_link({
            xx: new ScilabDouble([340], [340], [380.71]),
            yy: new ScilabDouble([226.29], [172], [172]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([2, 1, 0]),
            to: new ScilabDouble([3, 1, 1])
        }));
        diagram.objs.push(scicos_link({
            xx: new ScilabDouble([380.71], [399]),
            yy: new ScilabDouble([172], [172]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([3, 1, 0]),
            to: new ScilabDouble([1, 1, 1])
        }));
        diagram.objs.push(scicos_link({
            xx: new ScilabDouble([380.71], [380.71], [340], [340]),
            yy: new ScilabDouble([172], [302], [302], [277.71]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([3, 2, 0]),
            to: new ScilabDouble([2, 1, 1])
        }));
        this.x = scicos_block();
        this.x.gui = new ScilabString(["CLOCK_c"]);
        this.x.graphics.sz = new ScilabDouble([2, 2]);
        this.x.graphics.gr_i = new ScilabString([]);
        this.x.graphics.peout = new ScilabDouble([0]);
        this.x.model.sim = new ScilabString(["csuper"]);
        this.x.model.evtout = new ScilabDouble([1]);
        this.x.model.blocktype = new ScilabString(["h"]);
        this.x.model.firing = new ScilabBoolean([false]);
        this.x.model.dep_ut = new ScilabBoolean([false, false]);
        this.x.model.rpar = diagram;
        return new BasicBlock(this.x);
    }
    CLOCK_c.prototype.details = function CLOCK_c() {
        return this.x;
    }
}
function CLR() {

    CLR.prototype.define = function CLR() {
        this.x0 = 0;
        this.A = -1;
        this.B = 1;
        this.C = 1;
        this.D = 0;

        var model = scicos_model();
        model.sim = list(new ScilabString(["csslti4"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.state = new ScilabDouble([this.x0]);
        model.rpar = new ScilabDouble([this.A], [this.B], [this.C], [this.D]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, true]);

        var exprs = new ScilabString(["1"], ["1+s"]);
    this.displayParameter = [["1"], ["1"]];
        var gr_i = [];
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    CLR.prototype.details = function CLR() {
        return this.x;
    }
}
function CLSS () {
    CLSS.prototype.define = function CLSS() {
        this.x0 = 0;
        this.A = -1;
        this.B = 1;
        this.C = 1;
        this.D = 0;
        this.in1 = 1;
        this.out = 1;

        var model = scicos_model();
        model.sim = list(new ScilabString(["csslti4"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([this.in1]);
        model.out = new ScilabDouble([this.out]);
        model.state = new ScilabDouble([this.x0]);
        model.rpar = new ScilabDouble([this.A], [this.B], [this.C], [this.D]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, true]);

        var exprs = new ScilabString([this.A], [this.B], [this.C], [this.D], [this.x0]);


        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CLSS\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([4, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

 
CLSS.prototype.get = function CLSS() {
        var options={
            A:["A matrix",this.A.toString().replace(/,/g," ")],
            B:["B matrix",this.B],
            C:["C matrix",this.C],
            D:["D matrix",this.D],
            x0:["Initial state",this.x0],
        }
        return options
    }
CLSS.prototype.set = function CLSS() {
    this.A = inverse(arguments[0]["A"])
    this.B = inverse((arguments[0]["B"]))
    this.C = inverse((arguments[0]["C"]))
    this.D = inverse((arguments[0]["D"]))
    this.x0 = inverse((arguments[0]["x0"]))
    var rpar = new ScilabDouble(...this.A,...this.B,...this.C,...this.D)
    this.x.model.dep_ut = new ScilabBoolean(false,true)
    this.x.model.rpar = rpar
    this.x.model.state = colon_operator(this.x0)
    var exprs = new ScilabString([this.A.toString().replace(/,/g, " ")],[this.B.toString().replace(/,/g, " ")],[this.C.toString().replace(/,/g, " ")],[this.D.toString().replace(/,/g, " ")])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
CLSS.prototype.details = function CLSS() {
    return this.x
    }
}

function CLSS() {

    CLSS.prototype.define = function CLSS() {
        this.x0 = 0;
        this.A = -1;
        this.B = 1;
        this.C = 1;
        this.D = 0;
        this.in1 = 1;
        this.out = 1;

        var model = scicos_model();
        model.sim = list(new ScilabString(["csslti4"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([this.in1]);
        model.out = new ScilabDouble([this.out]);
        model.state = new ScilabDouble([this.x0]);
        model.rpar = new ScilabDouble([this.A], [this.B], [this.C], [this.D]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, true]);

        var exprs = new ScilabString([this.A], [this.B], [this.C], [this.D], [this.x0]);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CLSS\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([4, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    CLSS.prototype.details = function CLSS() {
        return this.x;
    }
}
function CMAT3D () {

CMAT3D.prototype.define = function CMAT3D() {
    this.cmin = 0;
    this.cmax = 100;
    this.colormap = jetcolormap(25)
    this.size_c = 25;
    this.x = -1;
    this.y = -1;
    this.size_x = 1;
    this.size_y = 1;
    var model = scicos_model()
    model.sim = list(new ScilabString(["cmat3d"]), new ScilabDouble([4]))
    model.in = new ScilabDouble([-1]);
    model.in2 = new ScilabDouble([-2]);
    model.intyp = new ScilabDouble([1]);
    model.evtin = new ScilabDouble([1]);
    model.ipar = new ScilabDouble([this.cmin], [this.cmax], [this.size_c], [this.size_x], [this.size_y])
    model.rpar = new ScilabDouble(...this.colormap, [this.x], [this.y])
    model.blocktype = new ScilabDouble(["c"]);
    model.dep_ut = new ScilabBoolean(true, false)
    var exprs = new ScilabString([this.x.toString().replace(/,/g, " ")], [this.y.toString().replace(/,/g, " ")], [this.size_c], [this.cmin], [this.cmax])
    var gr_i = list(new ScilabString(["xstringb(orig(1),orig(2),\"CMAT3D\",sz(1),sz(2));"]), new ScilabDouble([8]));
    this.x = new standard_define(new ScilabDouble([80, 80]),model,exprs,gr_i)
    return new BasicBlock(this.x);
    }
CMAT3D.prototype.get = function CMAT3D() {
    if(this.vec_x == undefined || this.vec_x == null){
        this.vec_x = "-1"
        this.vec_y = "-1"
    }
        var options={
            vec_x:["Bounds Vector X (-1 for standard)",this.vec_x.toString().replace(/,/g," ")],
            vec_y:["Bounds Vector Y (-1 for standard)",this.vec_y.toString().replace(/,/g," ")],
            colormap:["ColorMap",this.size_c],
            cmin:["Zmin",this.cmin],
            cmax:["Zmax",this.cmax],
        }
        return options
    }
CMAT3D.prototype.set = function CMAT3D() {
    this.vec_x = inverse(arguments[0]["vec_x"])
    this.vec_y = inverse(arguments[0]["vec_y"])
    this.colormap = jetcolormap(parseFloat((arguments[0]["colormap"])))
    this.cmin = parseFloat((arguments[0]["cmin"]))
    this.cmax = parseFloat((arguments[0]["cmax"]))
    this.size_x = size(this.vec_x,"*")
    this.size_c = size(...this.colormap,1)
    var ipar = new ScilabDouble([this.cmin],[this.cmax],[this.size_c],[this.size_x])
    var rpar = new ScilabDouble(...this.colormap,...this.vec_x,...this.vec_y)
    this.x.model.ipar = ipar
    this.x.model.rpar = rpar
    var exprs = new ScilabString([this.vec_x.toString().replace(/,/g, " ")],[this.vec_y.toString().replace(/,/g, " ")],["jetcolormap("+this.size_c+")"],[this.cmin],[this.cmax])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
CMAT3D.prototype.details = function CMAT3D() {
    return this.x
    }
}

function CMATVIEW () {

    CMATVIEW.prototype.define = function CMATVIEW() {
        this.cmin = 0;
        this.cmax = 100;
        this.size_c = 25;
        this.colormap = jetcolormap(this.size_c)
        this.alpha_c = 0.24;
        this.beta_c = 1;
        var model = scicos_model()
        model.sim = list(new ScilabString(["cmatview"]), new ScilabDouble([4]))
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble([1]);
        model.evtin = new ScilabDouble([1]);
        model.ipar = new ScilabDouble([this.cmin], [this.cmax], [this.size_c])
        model.rpar = new ScilabDouble([this.alpha_c], [this.beta_c], ...this.colormap)
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean(true, false)
        var exprs = new ScilabString([this.size_c],[this.cmin],[this.cmax]);
        var gr_i = list(new ScilabString(["xstringb(orig(1),orig(2),\"CMATVIEW\",sz(1),sz(2));"]), new ScilabDouble([8]));
        this.x = new standard_define(new ScilabDouble([80, 80]),model,exprs,gr_i)
        this.x.graphics.style = new ScilabString(["CMATVIEW"]);
        return new BasicBlock(this.x);
    }

    CMATVIEW.prototype.get = function CMATVIEW() {
        var options={
            colormap:["size of ColorMap",[this.size_c]],
            cmin:["Minimum level range",this.cmin],
            cmax:["Maximum level range",this.cmax]
        }
        return options
    }

    CMATVIEW.prototype.set = function CMATVIEW() {
        this.colormap = jetcolormap(parseFloat(arguments[0]["colormap"]));
        this.cmin= parseFloat(arguments[0]["cmin"]);
        this.cmax= parseFloat(arguments[0]["cmax"]);
        this.alpha_c = 0.24;
        this.beta_c = 1;
        var ipar = new ScilabDouble([this.cmax],[this.cmin],[this.size_c])
        var rpar = new ScilabDouble([this.alpha_c],[this.beta_c],...colon_operator(this.colormap))
        this.x.model.ipar = ipar
        this.x.model.rpar = rpar
        var exprs = new ScilabString([this.size_c],[this.cmin],[this.cmax]);
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)
    }
    CMATVIEW.prototype.details = function CMATVIEW() {
        return this.x;
    }   
}


function CMSCOPE() {


    CMSCOPE.prototype.get = function CMSCOPE() {
   
        var options = {
            in1: ["Input ports sizes", this.in1.toString().replace(/,/g, " ")],
            clrs: ["Drawing colors (>0) or mark (<0)", this.clrs.toString().replace(/,/g, " ")],
            win: ["Output window number (-1 for automatic)", this.win],
            wpos: ["Output window position", sci2exp([])],
            wdim: ["Output window sizes", sci2exp([])],
            ymin: ["Ymin vector", this.ymin.toString().replace(/,/g, " ")],
            ymax: ["Ymax vector", this.ymax.toString().replace(/,/g, " ")],
            per: ["Refresh period", this.per.toString().replace(/,/g, " ")],
            N: ["Buffer size", this.N],
            heritance: ["Accept herited events 0/1", 0],
            nom: ["Name of Scope (label&Id)", ""]
        };
        return options;
    }

    CMSCOPE.prototype.set = function CMSCOPE() {
       this.win = parseInt((arguments[0]["win"]));
       this.in1 = inverse(arguments[0]["in1"]);
        this.wdim = [[-1],[-1]];
        this.wpos = [[-1],[-1]];
        this.clrs = inverse(arguments[0]["clrs"]);
        this.N = parseInt((arguments[0]["N"]));
        this.ymin =inverse(arguments[0]["ymin"]);
        this.ymax = inverse(arguments[0]["ymax"]);
        this.per = inverse(arguments[0]["per"]);
        this.yy = [...transpose(this.ymin), ...transpose(this.ymax)];
        this.period = transpose(this.per);

        this.heritance = parseInt((arguments[0]["heritance"]));
        this.nom = arguments[0]["nom"];

        //var model = scicos_model();
        this.x.model.sim = list(new ScilabString(["cmscope"]), new ScilabDouble([4]));
        this.x.model.in = new ScilabDouble(...this.in1);
        this.x.model.in2 = new ScilabDouble([1], [1]);
        this.x.model.intyp = new ScilabDouble([1], [1]);
        this.x.model.evtin = new ScilabDouble([1]);
        this.x.model.rpar = new ScilabDouble([0], ...colon_operator(this.period), ...colon_operator(this.yy));
        this.x.model.ipar = new ScilabDouble([this.win], [this.in1.length], [this.N], ...this.wpos, ...this.wdim, ...this.in1, this.clrs[0], this.clrs[1]);

        this.x.model.blocktype = new ScilabString(["c"]);
        this.x.model.dep_ut = new ScilabBoolean([true, false]);
        var exprs = new ScilabString([this.in1.toString().replace(/,/g, " ")], [this.clrs.toString().replace(/,/g, " ")], [this.win], [sci2exp([])], [sci2exp([])], [this.ymin.toString().replace(/,/g, " ")], [this.ymax.toString().replace(/,/g, " ")], [this.per.toString().replace(/,/g, " ")], [this.N], [0], [""]);
        var gr_i = list(new ScilabString(["xstringb(orig(1),orig(2),\"CMSCOPE\",sz(1),sz(2));"]), new ScilabDouble([8]));
        this.x = new standard_define(new ScilabDouble([80, 80]), this.x.model, exprs, gr_i); // 2 -> 80
        this.x.graphics.style = new ScilabString(["CMSCOPE"]);
        return new BasicBlock(this.x);
    }

    CMSCOPE.prototype.define = function CMSCOPE() {
        this.win = -1;
        this.in1 = [[1],[1]];
        this.wdim = [[-1],[-1]];
        this.wpos = [[-1],[-1]];
        this.clrs = [[1],[3],[5],[7],[9],[11],[13],[15]];
        this.N = 20;
        this.ymin = [[-1],[-5]];
        this.ymax = [[1],[5]];
        this.per = [[30],[30]];
        this.yy = [...transpose(this.ymin), ...transpose(this.ymax)];
        this.period = transpose(this.per);


        var model = scicos_model();
        model.sim = list(new ScilabString(["cmscope"]), new ScilabDouble([4]));
        model.in = new ScilabDouble(...this.in1);
        model.in2 = new ScilabDouble([1], [1]);
        model.intyp = new ScilabDouble([1], [1]);
        model.evtin = new ScilabDouble([1]);
        model.rpar = new ScilabDouble([0], ...colon_operator(this.period), ...colon_operator(this.yy));
        model.ipar = new ScilabDouble([this.win], [this.in1.length], [this.N], ...this.wpos, ...this.wdim, ...this.in1, this.clrs[0], this.clrs[1]);

        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);
        var exprs = new ScilabString([this.in1.toString().replace(/,/g, " ")], [this.clrs.toString().replace(/,/g, " ")], [this.win], [sci2exp([])], [sci2exp([])], [this.ymin.toString().replace(/,/g, " ")], [this.ymax.toString().replace(/,/g, " ")], [this.per.toString().replace(/,/g, " ")], [this.N], [0], [""]);
        var gr_i = list(new ScilabString(["xstringb(orig(1),orig(2),\"CMSCOPE\",sz(1),sz(2));"]), new ScilabDouble([8]));
        this.x = new standard_define(new ScilabDouble([80, 80]), model, exprs, gr_i); // 2 -> 80
        this.x.graphics.style = new ScilabString(["CMSCOPE"]);
        return new BasicBlock(this.x);
    }
    CMSCOPE.prototype.details = function CMSCOPE() {
        return this.x;
    }



}


function CONST() {


    CONST.prototype.define = function CONST() {

        this.C = 1;

        var model = scicos_model();
        model.sim = list(new ScilabString(["cstblk4"]), new ScilabDouble([4]));
        model.in = new ScilabDouble();
        model.out = new ScilabDouble([1]);
        model.rpar = new ScilabDouble([this.C]);
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([sci2exp(this.C)]);
    var n = sci2exp(this.C).toString();
    this.displayParameter = [n]; 
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CONST\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    CONST.prototype.details = function CONST() {
        return this.x;
    }
CONST.prototype.get = function CONST() {
        var options={
            C:["Constant",this.C.toString().replace(/,/g," ")],
        }
        return options
    }
CONST.prototype.set = function CONST() {
    this.C = inverse(arguments[0]["C"])
    this.sz=size(this.C)
    this.nout=size(this.C,"*")
    this.x.model.rpar = new ScilabDouble(...this.C)
    this.x.model.out = new ScilabDouble([this.nout])
    var exprs = new ScilabString([this.C.toString().replace(/,/g, " ")])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function ConstantVoltage() {

    ConstantVoltage.prototype.define = function ConstantVoltage() {
        this.V = 0.01;

        var model = scicos_model();
        model.rpar = new ScilabDouble([this.V]);
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.sim = new ScilabString(["ConstantVoltage"]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var mo = new modelica_function();
        mo.model = new ScilabString(["ConstantVoltage"]);
        mo.inputs = new ScilabString(["p"]);
        mo.outputs = new ScilabString(["n"]);
        mo.parameters = list(new ScilabString(["V"]), list(new ScilabDouble([this.V])));
        model.equations = mo;

        var exprs = new ScilabString([this.V]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"ConstantVoltage\",sz(1),sz(2));"]);
        this.x = standard_define([1.5, 1.1], model, exprs, list(gr_i, new ScilabDouble([0])));
        this.x.graphics.in_implicit = new ScilabString(["I"]);
        this.x.graphics.out_implicit = new ScilabString(["I"]);
        return new BasicBlock(this.x);
    }
    ConstantVoltage.prototype.details = function ConstantVoltage() {
        return this.x;
    }
    ConstantVoltage.prototype.get = function ConstantVoltage() {
        var options={
            V:["V (volt)",this.V],
        }
        return options
    }
ConstantVoltage.prototype.set = function ConstantVoltage() {
    this.V = parseFloat((arguments[0]["V"]))
    this.x.model.rpar = new ScilabDouble([this.V]);
    this.x.model.equations.parameters = list(new ScilabString(["V"]), list(new ScilabDouble([this.V])));
    var exprs = new ScilabString([this.V])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function CONSTRAINT2_c() {

    CONSTRAINT2_c.prototype.define = function CONSTRAINT2_c() {
        this.x0 = 0;
        this.xd0 = 0;
        this.id = 0;

        var model = scicos_model();
        model.sim = list(new ScilabString(["constraint_c"]), new ScilabDouble([10004]));
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1], [1]);
        model.state = new ScilabDouble([this.x0], [this.xd0]);
        model.ipar = new ScilabDouble([this.id]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, true]);

        var exprs = list(new ScilabString([sci2exp(this.x0)]), new ScilabString([sci2exp(this.xd0)]), new ScilabString([sci2exp(this.id)]));

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CONSTRAINT2_c\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    CONSTRAINT2_c.prototype.details = function CONSTRAINT2_c() {
        return this.x;
    }
    CONSTRAINT2_c.prototype.get = function CONSTRAINT2_c() {
        var options={
            x0:["Initial guess values of states x",this.x0],
            xd0:["Initial guess values of derivative x",this.xd0],
            id:["Id(i)=1: if x''(i) is present in the feedback, else Id(i)=0",this.id]
        }
        return options
    }
CONSTRAINT2_c.prototype.set = function CONSTRAINT2_c() {
    this.x0 = inverse(arguments[0]["x0"])
    this.xd0 = inverse(arguments[0]["xd0"])
    this.id = inverse(arguments[0]["id"])
    this.N = size(this.x0,"*")
    this.Nxd = size(this.xd0,"*")
    this.Nid = size(this.id,"*")
    this.x.model.state = new ScilabDouble(...this.x0,...this.xd0)
    this.x.model.out = new ScilabDouble([this.N],[this.N])
    this.x.model.in = new ScilabDouble([this.N])
    this.x.model.ipar = new ScilabDouble(...this.id);
    var exprs = new ScilabString()
   var k = this.x0.toString();
    var n = this.xd0.toString();//Check the correctness of these parametres 
    
    this.displayParameter = [[k],[n]];
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function CONSTRAINT_c() {

    CONSTRAINT_c.prototype.define = function CONSTRAINT_c() {

        this.x0 = [[0],[0]];

        var model = scicos_model();
        model.sim = list(new ScilabString(["constraint_c"]), new ScilabDouble([10004]));
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.ipar = new ScilabDouble([0]);
        model.state = new ScilabDouble(...this.x0);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, true]);

        var exprs = new ScilabString([0]);
    this.displayParameter = ["0"];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CONSTRAINT_c\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    CONSTRAINT_c.prototype.details = function CONSTRAINT_c() {
        return this.x;
    }
CONSTRAINT_c.prototype.get = function CONSTRAINT_c() {
        var options={
            x0:["Initial guess values",this.x0.toString().replace(/,/g," ")],
        }
        return options
    }
CONSTRAINT_c.prototype.set = function CONSTRAINT_c() {
    this.x0 = inverse(arguments[0]["x0"])
    this.x0 = transpose(this.x0)
    this.N = size(this.x0,"*")
    this.x.model.state = new ScilabDouble(...this.x0,...zeros(this.N,1))
    this.x.model.out = new ScilabDouble([this.N])
    this.x.model.in = new ScilabDouble([this.N])
    this.ones = ones(this.N,1)
    for (var i = this.ones.length - 1; i >= 0; i--) {
        this.ones[i] = -1*this.ones[i];
    }
    this.x.model.ipar = new ScilabDouble(...this.ones);
    var exprs = new ScilabString([this.x0.toString().replace(/,/g, " ")])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }

}
function CONST_f() {

    CONST_f.prototype.define = function CONST_f() {
        this.C = 1;

        var model = scicos_model();
        model.sim = list(new ScilabString(["cstblk"]), new ScilabDouble([1]));
        model.in = new ScilabDouble();
        model.out = new ScilabDouble([1]);
        model.rpar = new ScilabDouble([this.C]);
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([sci2exp(this.C)]);
    var n = sci2exp(this.C).toString();
    this.displayParameter = [n];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CONST_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    CONST_f.prototype.details = function CONST_f() {

        return this.x;
    }
CONST_f.prototype.get = function CONST_f() {
        var options={
            C:["Constant",this.C.toString().replace(/,/g," ")],
        }
        return options
    }
CONST_f.prototype.set = function CONST_f() {
    this.C = inverse(arguments[0]["C"])
    this.nout = size(this.C,"*")
    this.x.model.rpar = new ScilabDouble(...this.C)
    this.x.model.out = new ScilabDouble(this.nout)
    var exprs = new ScilabString([this.C.toString().replace(/,/g, " ")])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function CONST_m() {
    CONST_m.prototype.get = function CONST_m() {

        var options = {
            vec: ["Constant Value", this.c.toString()]
        };
        return options;
    }
    CONST_m.prototype.set = function CONST_m() {
        this.c = inverse((arguments[0]["vec"]));
        this.nout = size(this.c)
        this.displayParameter = this.c;
        this.x.model.sim = list(new ScilabString(["cstblk4_m"], new ScilabDouble([4])), new ScilabDouble([4]));
        this.x.model.opar = list(new ScilabDouble(...this.c));
        this.x.model.outtyp = new ScilabDouble([1])

        this.x.model.rpar = new ScilabDouble();
        // var io = set_io(this.x.model,this.x.graphics,[],this.nout,[],[])
        this.x.graphics.exprs = new ScilabString([sci2exp(this.c)]);
        return new BasicBlock(this.x);
    }
    CONST_m.prototype.internal = function CONST_m() {
        this.c = [1];
        var model = new scicos_model();
        model.sim = list(new ScilabString(["cstblk4"]), new ScilabDouble([4]));
        model.in = new ScilabDouble();
        model.out = new ScilabDouble([this.c.length]);
        model.in2 = new ScilabDouble();
        model.out2 = new ScilabDouble([this.c.length]);
        model.rpar = new ScilabDouble(this.c);
        model.opar = list();
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CONST_m\",sz(1),sz(2));"]);
        var exprs = new ScilabString([sci2exp(this.c)]);
        var block = new standard_define(new ScilabDouble([80, 80]), model, exprs, gr_i); // 1 -> 80
        block.graphics.style = new ScilabString(["CONST_m"]);
        return block;
    }
    CONST_m.prototype.define = function CONST_m() {
        this.c = [1];
        var model = new scicos_model();
        model.sim = list(new ScilabString(["cstblk4"]), new ScilabDouble([4]));
        model.in = new ScilabDouble();
        model.out = new ScilabDouble([this.c.length]);
        model.in2 = new ScilabDouble();
        model.out2 = new ScilabDouble([this.c.length]);
        model.rpar = new ScilabDouble(this.c);
        model.opar = list();
        model.blocktype = new ScilabString(["d"]);
        this.displayParameter = [1];
        model.dep_ut = new ScilabBoolean([false, false]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CONST_m\",sz(1),sz(2));"]);
        var exprs = new ScilabString([sci2exp(this.c)]);
        this.x = new standard_define(new ScilabDouble([80, 80]), model, exprs, gr_i); // 1 -> 80
        this.x.graphics.style = new ScilabString(["CONST_m"]);
        return new BasicBlock(this.x);
    }
    CONST_m.prototype.details = function CONST_m() {
        return this.x;

    }
}
function CONVERT() {

    CONVERT.prototype.define = function CONVERT() {
        this.sgn = 2;

        var model = scicos_model();
        model.sim = list(new ScilabString(["convert"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([-1]);
        model.out = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.out2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble([1]);
        model.outtyp = new ScilabDouble([3]);
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble([this.sgn]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([sci2exp(1)], [sci2exp(3)], [sci2exp(0)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CONVERT\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    CONVERT.prototype.details = function CONVERT() {
        return this.x;

    }

}
function COSBLK_f() {
    COSBLK_f.prototype.get = function COSBLK_f() {
        alert("parameters can not be changed")
    }

    COSBLK_f.prototype.define = function COSBLK_f() {
        this.in1 = 1;

        var model = scicos_model();
        model.sim = new ScilabString(["cosblk"]);
        model.in = new ScilabDouble([-1]);
        model.out = new ScilabDouble([-1]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"COSBLK_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, new ScilabDouble(), gr_i);
        return new BasicBlock(this.x);
    }
    COSBLK_f.prototype.details = function COSBLK_f() {
        return this.x;
    }
}function Counter() {

    Counter.prototype.define = function Counter() {
        this.minim = 0;
        this.maxim = 2;
        this.rule = 1;

        var model = scicos_model();
        model.sim = list(new ScilabString(["counter"]), new ScilabDouble([4]));
        model.evtin = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.out2 = new ScilabDouble([1]);
        model.dstate = new ScilabDouble([0]);
        model.ipar = new ScilabDouble([this.rule], [this.maxim], [this.minim]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([this.minim], [this.maxim], [this.rule]);
    var n = this.minim.toString();
    var k = this.maxim.toString();
    this.displayParameter=[[n],[k]];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"Counter\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    Counter.prototype.details = function Counter() {
        return this.x;
    }
    Counter.prototype.get = function Counter() {
        var options={
            minim:["Minimum",this.minim],
            maxim:["MAximum",this.maxim],
            rule:["Rule (1:Increment, 2:Decrement)",this.rule]
        }
        return options
    }
Counter.prototype.set = function Counter() {
    this.minim = parseFloat((arguments[0]["minim"]))
    this.maxim = parseFloat((arguments[0]["maxim"]))
    this.rule = parseFloat((arguments[0]["rule"]))
    this.maxim = Math.floor(this.maxim)
    this.minim = Math.floor(this.minim)
    this.x.model.dstate = new ScilabDouble([0]);
    this.x.model.ipar = new ScilabDouble([this.rule],[this.maxim],[this.minim])
    var exprs = new ScilabString([this.minim],[this.maxim],[this.rule])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function CSCOPE() {

    CSCOPE.prototype.define = function CSCOPE() {
        this.win = -1;
        this.wdim = [[600],[400]];
        this.wpos = [[-1],[-1]];
        this.clrs = [[1],[3],[5],[7],[9],[11],[13],[15]];
        this.N = 20;
        this.ymin = -15;
        this.ymax = 15;
        this.per = 30;

        var model = scicos_model();
        model.sim = list(new ScilabString(["cscope"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([1]);
        model.evtin = new ScilabDouble([1]);
        model.rpar = new ScilabDouble([0], [this.ymin], [this.ymax], [this.per]);
        model.ipar = new ScilabDouble([this.win], [1], [this.N], ...this.clrs, ...this.wpos, ...this.wdim);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([this.clrs.toString().replace(/,/g, " ")], [this.win], [sci2exp([])], [sci2exp(this.wdim)], [this.ymin], [this.ymax], [this.per], [this.N], [0], [""]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CSCOPE\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    CSCOPE.prototype.details = function CSCOPE() {
        return this.x;
    }
    CSCOPE.prototype.get = function CSCOPE() {
    if(this.heritance == undefined || this.heritance == null){
        this.heritance = "0"
    }
    if(this.nom == undefined || this.nom == null){
        this.nom = ""
    }
        var options={
            clrs:["Color (>0) or mark (<0) vector (8 entries)",this.clrs],
            win:["Output window number (-1 for automatic)",this.win],
            wpos:["Output window position",this.wpos.toString().replace(/,/g," ")],
            wdim:["Output window sizes",this.wdim.toString().replace(/,/g," ")],
            ymin:["Ymin",this.ymin],
            ymax:["Ymax",this.ymax],
            per:["Refresh period",this.per],
            N:["Buffer size",this.N],
            heritance:["Accept herited events 0/1",this.heritance],
            nom:["Name of Scope (label&Id)",this.nom]
        }
        return options
    }
CSCOPE.prototype.set = function CSCOPE() {

    this.clrs = inverse((arguments[0]["clrs"]))
    this.win = parseFloat((arguments[0]["win"]))
    this.wpos = inverse(arguments[0]["wpos"])
    this.wdim = inverse(arguments[0]["wdim"])
    this.ymin = parseFloat((arguments[0]["ymin"]))
    this.ymax = parseFloat((arguments[0]["ymax"]))
    this.per = parseFloat((arguments[0]["per"]))
    this.N = parseFloat((arguments[0]["N"]))
    this.heritance = parseFloat((arguments[0]["heritance"]))
    this.nom = arguments[0]["nom"]
    if(this.wpos.length == 0){
        this.wpos = [[-1],[-1]];
    }
    if(this.wdim.length == 0){
        this.wdim = [[-1],[-1]];
    }
    var rpar = new ScilabDouble([0],[this.ymin],[this.ymax],[this.per])
    var ipar = new ScilabDouble([this.win],[1],[this.N],...this.clrs,...this.wpos,...this.wdim)
    this.x.model.rpar = rpar
    this.x.model.ipar = ipar
    this.x.model.evtin = ones(1-this.heritance,1)
    this.x.model.label = this.nom
    this.x.graphics.id = this.nom
    var exprs = new ScilabString([this.clrs.toString().replace(/,/g," ")],[this.win],["[]"],[this.wdim.toString().replace(/,/g, " ")],[this.ymin],[this.ymax],[this.per],[this.N],[this.heritance],[this.nom])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function CSCOPXY() {

    CSCOPXY.prototype.define = function CSCOPXY() {
        this.win = -1;
        this.clrs = 4;
        this.siz = 1;
        this.wdim = [[600], [400]];
        this.wpos = [[-1], [-1]];
        this.N = 2;
        this.xmin = -15;
        this.xmax = 15;
        this.ymin = -15;
        this.ymax = 15;
        this.nbr_curves = 1;

        var model = scicos_model();
        model.sim = list(new ScilabString(["cscopxy"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([1], [1]);
        model.in2 = new ScilabDouble([1], [1]);
        model.intyp = new ScilabDouble([1], [1]);
        model.evtin = new ScilabDouble([1]);
        model.rpar = new ScilabDouble([this.xmin], [this.xmax], [this.ymin], [this.ymax]);
        model.ipar = new ScilabDouble([this.win], [1], [this.N], [this.clrs], [this.siz], [1], ...this.wpos, ...this.wdim, [this.nbr_curves]);
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([this.nbr_curves], [sci2exp(this.clrs)], [sci2exp(this.siz)], [this.win], [sci2exp([])], [sci2exp(this.wdim)], [this.xmin], [this.xmax], [this.ymin], [this.ymax], [this.N]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CSCOPE\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    CSCOPXY.prototype.details = function CSCOPXY() {
        return this.x;
    }
    CSCOPXY.prototype.get = function CSCOPXY() {
 
        var options={
            nbr_curves:["Number of Curves",this.nbr_curves],
            clrs:["color (>0) or mark (<0)",this.clrs.toString().replace(/,/g," ")],
            siz:["line or mark size",this.siz.toString().replace(/,/g," ")],
            win:["Output window number (-1 for automatic)",this.win],
            wpos:["Output window position","[]"],
            wdim:["Output window sizes",this.wdim.toString().replace(/,/g," ")],
            xmin:["Xmin",this.xmin],
            xmax:["Xmax",this.xmax],
            ymin:["Ymin",this.ymin],
            ymax:["Ymax",this.ymax],
            N:["Buffer size",this.N],
        }
        return options
    }
CSCOPXY.prototype.set = function CSCOPXY() {
    this.nbr_curves = parseFloat((arguments[0]["nbr_curves"]))
    this.clrs = parseFloat((arguments[0]["clrs"]))
    this.siz = parseFloat((arguments[0]["siz"]))
    this.win = parseFloat((arguments[0]["win"]))
    this.wpos = inverse(arguments[0]["wpos"])
    this.wdim = inverse(arguments[0]["wdim"])
    this.xmin = parseFloat((arguments[0]["xmin"]))
    this.xmax = parseFloat((arguments[0]["xmax"]))
    this.ymin = parseFloat((arguments[0]["ymin"]))
    this.ymax = parseFloat((arguments[0]["ymax"]))
    this.N = parseFloat((arguments[0]["N"]))
    if(this.wpos.length == 0){
        this.wpos = [[-1],[-1]];
    }
    if(this.wdim.length == 0){
        this.wdim = [[-1],[-1]];
    }
    var rpar = new ScilabDouble([this.xmin],[this.xmax],[this.ymin],[this.ymax])
    var ipar = new ScilabDouble([this.win],[1],[this.N],[this.clrs],[this.siz],[1],...this.wpos,...this.wdim,[this.nbr_curves])
    this.x.model.rpar = rpar
    this.x.model.ipar = ipar
    var exprs = new ScilabString([this.nbr_curves],[sci2exp(this.clrs)],[sci2exp(this.siz)],[this.win],["[]"],[sci2exp(this.wdim)],[this.xmin],[this.xmax],[this.ymin],[this.ymax],[this.N])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function CSCOPXY3D() {

    CSCOPXY3D.prototype.define = function CSCOPXY3D() {
        this.win = -1;
        this.clrs = [[1],[2],[3],[4],[5],[6],[7],[13]];
        this.siz = [[1],[1],[1],[1],[1],[1],[1],[1]];
        this.wdim = [[600],[400]];
        this.wpos = [[-1],[-1]];
        this.N = 2;
        this.param3ds = [[50],[280]];
        this.vec_x = [[-15],[15]];
        this.vec_y = [[-15],[15]];
        this.vec_z = [[-15],[15]];
        this.nbr_curves = 1;

        var model = scicos_model();
        model.sim = list(new ScilabString(["cscopxy3d"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([1], [1], [1]);
        model.in2 = new ScilabDouble([1], [1], [1]);
        model.intyp = new ScilabDouble([1], [1], [1]);
        model.evtin = new ScilabDouble([1]);
        model.rpar = new ScilabDouble(...this.vec_x, ...this.vec_y, ...this.vec_z, ...this.param3ds);
        model.ipar = new ScilabDouble([this.win], [8], [this.N], ...this.clrs, ...this.siz, [8], ...this.wpos, ...this.wdim, [this.nbr_curves]);
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([this.nbr_curves], [this.clrs.toString().replace(/,/g, " ")], [this.siz.toString().replace(/,/g, " ")], [this.win], [sci2exp([])], [sci2exp(this.wdim)], [this.vec_x.toString().replace(/,/g, " ")], [this.vec_y.toString().replace(/,/g, " ")], [this.vec_z.toString().replace(/,/g, " ")], [this.param3ds.toString().replace(/,/g, " ")], [this.N]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CSCOPE\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    CSCOPXY3D.prototype.details = function CSCOPXY3D() {
        return this.x;
    }
    CSCOPXY3D.prototype.get = function CSCOPXY3D() {

        var options={
            nbr_curves:["Number of curves",this.nbr_curves],
            clrs:["color (>0) or mark (<0)",this.clrs.toString().replace(/,/g," ")],
            siz:["Line or Mark Size",this.siz.toString().replace(/,/g," ")],
            win:["Output window number (-1 for automatic)",this.win],
            wpos:["Output window position","[]"],
            wdim:["Output window sizes",this.wdim.toString().replace(/,/g," ")],
            vec_x:["Xmin and Xmax",this.vec_x.toString().replace(/,/g," ")],
            vec_y:["Ymin and Ymax",this.vec_y.toString().replace(/,/g," ")],
            vec_z:["Zmin and Zmax",this.vec_z.toString().replace(/,/g," ")],
            param3ds:["Alpha and Theta",this.param3ds.toString().replace(/,/g," ")],
            N:["Buffer size",this.N],
        }
        return options
    }
    CSCOPXY3D.prototype.set = function CSCOPXY3D() {
        this.nbr_curves = parseFloat((arguments[0]["nbr_curves"]))
        this.clrs = inverse(arguments[0]["clrs"])
        this.siz = inverse(arguments[0]["siz"])
        this.win = parseFloat((arguments[0]["win"]))
        this.wpos = inverse(arguments[0]["wpos"])
        this.wdim = inverse(arguments[0]["wdim"])
        this.vec_x = inverse((arguments[0]["vec_x"]))
        this.vec_y = inverse((arguments[0]["vec_y"]))
        this.vec_z = inverse((arguments[0]["vec_z"]))
        this.param3ds = inverse((arguments[0]["param3ds"]))
        this.N = parseFloat((arguments[0]["N"]))
        
        this.in = ones(3,1)
        for (var i = this.in.length - 1; i >= 0; i--) {
            this.in[i][0] = this.in[i][0]*this.nbr_curves
        }

        this.in2 = ones(3,1)
        this.x.model.intyp = new ScilabDouble(...ones(3,1))
        var io = set_io(this.x.model,this.x.graphics,[...this.in,...this.in2],[],ones(1,1),[])

        if(this.wpos.length == 0){
            this.wpos = [[-1],[-1]];
        }
        if(this.wdim.length == 0){
            this.wdim = [[-1],[-1]];
        }
        this.x.model.rpar = new ScilabDouble(...this.vec_x, ...this.vec_y, ...this.vec_z, ...this.param3ds);
        this.size_siz = size(this.siz,"*")
        var ipar = new ScilabDouble([this.win],[this.size_siz],[this.N],...this.clrs,...this.siz,[1],...this.wpos,...this.wdim,[this.nbr_curves])
        this.x.model.ipar = ipar
        var exprs = new ScilabString([this.nbr_curves],[this.clrs.toString().replace(/,/g, " ")],[this.siz.toString().replace(/,/g, " ")],[this.win],[sci2exp([])],[sci2exp(this.wdim)],[this.vec_x.toString().replace(/,/g," ")],[this.vec_y.toString().replace(/,/g," ")],[this.vec_z.toString().replace(/,/g," ")],[this.param3ds.toString().replace(/,/g," ")],[this.N])
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)
    }
}
function CUMSUM() {

    CUMSUM.prototype.define = function CUMSUM() {
        var model = scicos_model();

        this.function_name = "cumsum_m";
        this.funtyp = 4;

        model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([this.funtyp]));
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble([1]);
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble([-2]);
        model.outtyp = new ScilabDouble([1]);
        model.evtin = new ScilabDouble();
        model.evtout = new ScilabDouble();
        model.state = new ScilabDouble();
        model.dstate = new ScilabDouble();
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble();
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, false]);

        var label = new ScilabString([sci2exp(1)], [sci2exp(0)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CUMSUM\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, label, gr_i);
        return new BasicBlock(this.x);
    }
    CUMSUM.prototype.details = function CUMSUM() {
        return this.x;
    }
    CUMSUM.prototype.get = function CUMSUM() {
    if(this.typ == undefined || this.typ == null){
        this.typ = "1"
    }
    if(this.decomptyp == undefined || this.decomptyp == null){
        this.decomptyp = "0"
    }

        var options={
            typ:["Datatype(1=real double  2=Complex)",this.typ],
            decomptyp:["Sum along (0=the first non singleton dimension  1=Rows  2=Columns)",this.decomptyp],
        }
        return options
    }
CUMSUM.prototype.set = function CUMSUM() {
    this.typ = parseFloat((arguments[0]["typ"]))
    this.decomptyp = parseFloat((arguments[0]["decomptyp"]))
    if(this.typ == 1){
        if(this.decomptyp == 0){
            this.function_name = "cumsum_m"
            this.out = [-1,-2]
        }
        else if(this.decomptyp == 1){
            this.function_name = "cumsum_r"
            this.out = [-1,1]
        }
        else if(this.decomptyp == 2){
            this.function_name = "cumsum_c"
            this.out = [1,-2]
        }
        this.x.model.intyp = new ScilabDouble([1])
        this.x.model.outtyp = new ScilabDouble([1])
    }
    else if(this.typ == 2){
        if(this.decomptyp == 0){
            this.function_name = "cumsumz_m"
            
        }
        else if(this.decomptyp == 1){
            this.function_name = "cumsumz_r"

        }
        else if(this.decomptyp == 2){
            this.function_name = "cumsumz_c"
        }
        this.x.model.intyp = new ScilabDouble([2])
        this.x.model.outtyp = new ScilabDouble([2])

    }
    this.in = [getData(this.x.model.in),getData(this.x.model.in2)]
    this.out = [getData(this.x.model.out),getData(this.x.model.out2)]
    var io = set_io(this.x.model,this.x.graphics,this.in,this.out,[],[])
    this.x.model.sim = list(new ScilabString([this.function_name]),new ScilabDouble([4]))
    var exprs = new ScilabString([this.typ],[this.decomptyp])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function CurrentSensor() {
    CurrentSensor.prototype.get = function CurrentSensor() {
        alert("parameters can not be set")
    }
    CurrentSensor.prototype.define = function CurrentSensor() {
        var model = scicos_model();
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1], [1]);
        model.sim = new ScilabString(["CurrentSensor"]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var mo = new modelica_function();
        mo.model = new ScilabString(["CurrentSensor"]);
        mo.inputs = new ScilabString(["p"]);
        mo.outputs = new ScilabString(["n"], ["i"]);
        model.equations = mo;

        var exprs = new ScilabDouble();

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CurrentSensor\",sz(1),sz(2));"]);
        this.x = standard_define(new ScilabDouble([2, 2]), model, exprs, list(gr_i, new ScilabDouble([0])));
        this.x.graphics.in_implicit = new ScilabString(["I"]);
        this.x.graphics.out_implicit = new ScilabString(["I"], ["E"]);
        return new BasicBlock(this.x);
    }

    CurrentSensor.prototype.details = function CurrentSensor() {
        return this.x;
    }
}
function CURV_f() {

    CURV_f.prototype.define = function CURV_f() {
        this.xx = [[0],[1],[2]];
        this.yy = [[-5],[5],[0]];
        this.rect = [0,-5,2,5];
        this.axisdata = [[2],[10],[2],[10]];
        this.ipar = new ScilabDouble([size(this.xx, 1)], ...this.axisdata);
        this.rpar = new ScilabDouble(...this.xx, ...this.yy, this.rect);

        var model = scicos_model();
        model.sim = new ScilabString(["intplt"]);
        model.in = new ScilabDouble();
        model.out = new ScilabDouble([1]);
        model.rpar = new ScilabDouble(...this.xx, ...this.yy, ...colon_operator([this.rect]));
        model.ipar = new ScilabDouble([size(this.xx, 1)], ...this.axisdata);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, true]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CURV_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, new ScilabDouble(), gr_i);
        return new BasicBlock(this.x);
    }
    CURV_f.prototype.details = function CURV_f() {
        return this.x;
    }
}
function CVS() {
    CVS.prototype.get = function CVS() {
        alert("parameters can not be set")
    }

    CVS.prototype.define = function CVS() {
        this.ModelName = "CVS";
        this.PrametersValue = new ScilabDouble();
        this.ParametersName = new ScilabDouble();
        var model = scicos_model();
        this.Typein = [];
        this.Typeout = [];
        this.MI = [];
        this.MO = [];
        this.P = [[2,50,1,0],[70,98,2,0],[70,2,-2,0]];
        this.PortName = [["vin"],["p"],["n"]];

        for (var i = 0; i < size(this.P, "r"); i++) {
            if (this.P[i][2] == 1) {
                this.Typein.push(["E"]);
                this.MI.push(this.PortName[i]);
            }

            if (this.P[i][2] == 2) {
                this.Typein.push(["I"]);
                this.MI.push(this.PortName[i]);
            }
            if (this.P[i][2] == -1) {
                this.Typeout.push(["E"]);
                this.MO.push(this.PortName[i]);
            }
            if (this.P[i][2] == -2) {
                this.Typeout.push(["I"]);
                this.MO.push(this.PortName[i]);
            }
        }

        var mo = new modelica_function();
        model.sim = new ScilabString([this.ModelName]);
        mo.inputs = new ScilabString(...this.MI);
        mo.outputs = new ScilabString(...this.MO);
        model.rpar = this.PrametersValue;
        mo.parameters = list(this.ParametersName, this.PrametersValue, new ScilabDouble(...zeros(getData(this.ParametersName))));
        var exprs = new ScilabDouble();
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CVS\",sz(1),sz(2));"]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, true]);
        mo.model = new ScilabString([this.ModelName]);
        model.equations = mo;
        model.in = new ScilabDouble(...ones(size(this.MI, "*"), 1));
        model.out = new ScilabDouble(...ones(size(this.MO, "*"), 1));
        this.x = new standard_define(new ScilabDouble([2.1, 3]), model, exprs, list(new ScilabString([gr_i]), new ScilabDouble([0])));
        this.x.graphics.in_implicit = new ScilabDouble(this.Typein);
        this.x.graphics.out_implicit = new ScilabDouble(this.Typeout);
        return new BasicBlock(this.x);
    }

    CVS.prototype.details = function CVS() {
        return this.x;
    }
}
function c_block() {

    c_block.prototype.define = function c_block() {

        this.in1 = 1;
        this.out = 1;
        this.rpar = [];
        this.typ = "c";
        this.funam = "toto";

        var model = scicos_model();
        model.sim = list(new ScilabString([" "]), new ScilabDouble([2001]));
        model.in = new ScilabDouble([this.in1]);
        model.out = new ScilabDouble([this.out]);
        model.evtin = new ScilabDouble();
        model.evtout = new ScilabDouble();
        model.state = new ScilabDouble();
        model.dstate = new ScilabDouble();
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble([0]);
        model.blocktype = new ScilabString([this.typ]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, false]);

        var label = list(new ScilabString([sci2exp(this.in1)], [sci2exp(this.out)], [sci2exp(this.rpar)], [this.funam]), list(new ScilabDouble()));
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"c_block\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, label, gr_i);
        return new BasicBlock(this.x);
    }
    c_block.prototype.details = function c_block() {
        return this.x;
    }
}
function DEADBAND() {

    DEADBAND.prototype.define = function DEADBAND() {
        this.minp = -0.5;
        this.maxp = 0.5;
        this.rpar = new ScilabDouble([this.maxp], [this.minp]);

        var model = scicos_model();
        model.sim = list(new ScilabString(["deadband"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([1]);
        model.nzcross = new ScilabDouble([2]);
        model.nmode = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.rpar = this.rpar;
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([this.maxp], [this.minp], [...getData(model.nmode).toString()]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"DEADBAND\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    DEADBAND.prototype.details = function DEADBAND() {
        return this.x;
    }
DEADBAND.prototype.get = function DEADBAND() {
        var options={
            maxp:["End of dead band",this.maxp],
            minp:["Start of dead band",this.minp],
            zeroc:["zero crossing (0:no, 1:yes)","1"],
        }
        return options
    }
DEADBAND.prototype.set = function DEADBAND() {
    this.maxp = parseFloat((arguments[0]["maxp"]))
    this.minp = parseFloat((arguments[0]["minp"]))
    this.zeroc = parseFloat((arguments[0]["zeroc"]))
    var rpar = new ScilabDouble([this.maxp],[this.minp])
    this.x.model.rpar = new ScilabDouble(this.maxp,this.minp);
    if(this.zeroc != 0){
            this.x.model.nzcross = new ScilabDouble([2]);
        this.x.model.nmode = new ScilabDouble([1]);
    }
    else{
        this.x.model.nzcross = new ScilabDouble([0]);
        this.x.model.nmode = new ScilabDouble([0]);
    }
    var exprs = new ScilabString([this.maxp],[this.minp],[this.zeroc])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function DEBUG() {

    DEBUG.prototype.define = function DEBUG() {
        var model = scicos_model();
        model.sim = list(new ScilabString(["%debug_scicos"]), new ScilabDouble([99]));
        model.blocktype = new ScilabString(["d"]);

        var exprs = list(new ScilabString([""]), new ScilabString(["xcos_debug_gui(flag,block);"]));

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"DEBUG\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([8, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    DEBUG.prototype.details = function DEBUG() {
        return this.x;
    }
}

function DELAYV_f() {

    DELAYV_f.prototype.define = function DELAYV_f() {
        this.nin = 1;
        this.z0 = zeros(11, 1);
        this.zz0 = math.subset(this.z0, math.index(math.range(0, math.size(this.z0)[0] - 1), 0));
        this.T = 1;

        var model = scicos_model();
        model.sim = list(new ScilabString(["delayv"]), new ScilabDouble([1]));
        model.in = new ScilabDouble([this.nin], [1]);
        model.out = new ScilabDouble([this.nin]);
        model.evtin = new ScilabDouble([1]);
        model.evtout = new ScilabDouble([1], [1]);
        model.dstate = new ScilabDouble(...this.z0);
        model.rpar = new ScilabDouble([this.T / (size(this.zz0, "*"))]);
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble([0, -1]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([this.nin], [this.zz0.toString().replace(/,/g, ";")], [this.T]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"DELAYV_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    DELAYV_f.prototype.details = function DELAYV_f() {
        return this.x;
    }
DELAYV_f.prototype.get = function DELAYV_f() {
        var options={
            nin:["Number of inputs",this.nin],
            zz0:["Register initial condition",this.zz0.toString().replace(/,/g," ")],
            T:["Max delay",this.T],
        }
        return options;
    }
DELAYV_f.prototype.set = function DELAYV_f() {
    this.nin = parseFloat((arguments[0]["nin"]))
    this.zz0 = inverse(arguments[0]["zz0"])
    this.T = parseFloat((arguments[0]["T"]))
    this.told = this.z0.slice(-1)
    this.x.model.dstate = new ScilabDouble(...this.zz0,...this.told)
    this.value = this.T/size(this.zz0,"*")
    this.x.model.rpar = new ScilabDouble([this.value])
    var exprs = new ScilabString([this.nin],[this.zz0.toString().replace(/,/g, " ")],[this.T])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }

}

function DELAY_f() {

    DELAY_f.prototype.define = function DELAY_f() {
        var evtdly = new EVTDLY_f().internal();
        evtdly.graphics.orig = new ScilabDouble([243, 296]);
        evtdly.graphics.sz = new ScilabDouble([40, 40]);
        evtdly.graphics.flip = new ScilabBoolean([true]);
        evtdly.graphics.exprs = new ScilabString(["0.1"], ["0"]);
        evtdly.graphics.pein = new ScilabDouble([10]);
        evtdly.graphics.peout = new ScilabDouble([7]);
        evtdly.model.rpar = new ScilabDouble([0.1]);
        evtdly.model.firing = new ScilabDouble([0]);
        evtdly.model.uid = new ScilabString([count]); // changed
        evtdly.doc = list(new ScilabString([count++]));
        evtdly.model.outtyp = new ScilabDouble();

        var register = new REGISTER_f().internal();
        register.graphics.orig = new ScilabDouble([238, 195]);
        register.graphics.sz = new ScilabDouble([50, 50]);
        register.graphics.flip = new ScilabBoolean([true]);
        register.graphics.exprs = new ScilabString(["0;0;0;0;0;0;0;0;0;0"]);
        register.graphics.pin = new ScilabDouble([6]);
        register.graphics.pout = new ScilabDouble([5]);
        register.graphics.pein = new ScilabDouble([9]);
        register.model.uid = new ScilabString([count]); // changed
        register.doc = list(new ScilabString([count++]));
        register.model.in2 = new ScilabDouble([1]);
        register.model.intyp = new ScilabDouble([1]);
        register.model.out2 = new ScilabDouble([1]);

        var input_port = new IN_f().internal();
        input_port.graphics.orig = new ScilabDouble([92, 210]);
        input_port.graphics.sz = new ScilabDouble([20, 20]);
        input_port.graphics.flip = new ScilabBoolean([true]);
        input_port.graphics.exprs = new ScilabString(["1"], ["1"]);
        input_port.graphics.pout = new ScilabDouble([6]);
        input_port.model.ipar = new ScilabDouble([1]);
        input_port.model.uid = new ScilabString([count]); // changed
        input_port.doc = list(new ScilabString([count++]));
        input_port.model.outtyp = new ScilabDouble([-1]);

        var output_port = new OUT_f().internal();
        output_port.graphics.orig = new ScilabDouble([440, 210]);
        output_port.graphics.sz = new ScilabDouble([20, 20]);
        output_port.graphics.flip = new ScilabBoolean([true]);
        output_port.graphics.exprs = new ScilabString(["1"], ["1"]);
        output_port.graphics.pin = new ScilabDouble([5]);
        output_port.model.ipar = new ScilabDouble([1]);
        output_port.model.uid = new ScilabString([count]); // changed
        output_port.doc = list(new ScilabString([count++]));
        output_port.model.outtyp = new ScilabDouble();

        var split = new CLKSPLIT_f().internal();
        split.graphics.orig = new ScilabDouble([263, 271.2]);
        split.graphics.pein = new ScilabDouble([7]);
        split.graphics.peout = new ScilabDouble([9], [10]);
        split.model.uid = new ScilabString([count]); // changed
        split.doc = list(new ScilabString([count++]));

        var diagram = scicos_diagram();
        diagram.objs.push(input_port);
        diagram.objs.push(output_port);
        diagram.objs.push(register);
        diagram.objs.push(evtdly);
        diagram.objs.push(split);
        diagram.objs.push(scicos_link({
            xx: new ScilabDouble([296.6], [440]),
            yy: new ScilabDouble([220], [220]),
            from: new ScilabDouble([3, 1, 0]),
            to: new ScilabDouble([2, 1, 1])
        }));
        diagram.objs.push(scicos_link({
            xx: new ScilabDouble([112], [229.4]),
            yy: new ScilabDouble([220], [220]),
            from: new ScilabDouble([1, 1, 0]),
            to: new ScilabDouble([3, 1, 1])
        }));
        diagram.objs.push(scicos_link({
            xx: new ScilabDouble([263], [263]),
            yy: new ScilabDouble([290.3], [271.2]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([4, 1, 0]),
            to: new ScilabDouble([5, 1, 1])
        }));
        diagram.objs.push(scicos_link({
            xx: new ScilabDouble([263], [263]),
            yy: new ScilabDouble([271.2], [250.7]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([5, 1, 0]),
            to: new ScilabDouble([3, 1, 1])
        }));
        diagram.objs.push(scicos_link({
            xx: new ScilabDouble([263], [308.6], [308.6], [263], [263]),
            yy: new ScilabDouble([271.2], [271.2], [367], [367], [341.7]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([5, 2, 0]),
            to: new ScilabDouble([4, 1, 1])
        }));

        this.x = scicos_block();
        this.x.gui = new ScilabString(["DELAY_f"]);
        this.x.graphics.sz = new ScilabDouble([2, 2]);
        this.x.graphics.gr_i = new ScilabDouble();
        this.x.graphics.pin = new ScilabDouble([0]);
        this.x.graphics.pout = new ScilabDouble([0]);
        this.x.model.sim = new ScilabString(["csuper"]);
        this.x.model.in = new ScilabDouble([1]);
        this.x.model.out = new ScilabDouble([1]);
        this.x.model.blocktype = new ScilabString(["h"]);
        this.x.model.dep_ut = new ScilabBoolean([false, false]);
        this.x.model.rpar = diagram;
        this.x.graphics.in_implicit = new ScilabString(["E"]);
        this.x.graphics.in_style = new ScilabString([""]);
        this.x.graphics.out_implicit = new ScilabString(["E"]);
        this.x.graphics.out_style = new ScilabString([""]);
        return new BasicBlock(this.x);
    }
    DELAY_f.prototype.details = function DELAY_f() {
        return this.x;
    }
}function DEMUX() {

    DEMUX.prototype.define = function DEMUX() {
        this.out = 2;

        var model = scicos_model();
        model.sim = list(new ScilabString(["multiplex"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([0]);

        var arr = [];
        arr.push(math.range(-1, -this.out, -1, true)._data);
        model.out = new ScilabDouble(...math.transpose(arr));
        model.ipar = new ScilabDouble([this.out]);
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([this.out]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"DEMUX\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([.5, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    DEMUX.prototype.details = function DEMUX() {
        return this.x;
    }
}
function DEMUX_f() {

    DEMUX_f.prototype.define = function DEMUX_f() {
        this.out = 2;
        var arr = [];
        arr.push(math.range(-1, -this.out, -1, true)._data);

        var model = scicos_model();
        model.sim = list(new ScilabString(["demux"]), new ScilabDouble([1]));
        model.in = new ScilabDouble([0]);
        model.out = new ScilabDouble(...math.transpose(arr));
        model.ipar = new ScilabDouble([this.out]);
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([this.out]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"DEMUX_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([.5, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    DEMUX_f.prototype.details = function DEMUX_f() {
        return this.x;
    }
}

function DERIV() {
    DERIV.prototype.get = function DERIV() {
        alert("parameters can not be changed")
    }

    DERIV.prototype.define = function DERIV() {
        var model = scicos_model();
        model.sim = list(new ScilabString(["deriv"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([-1]);
        model.out = new ScilabDouble([-1]);
        model.blocktype = new ScilabString(["x"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabDouble();

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"DERIV\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    DERIV.prototype.details = function DERIV() {
        return this.x;
    }
}
function DFLIPFLOP() {
    DFLIPFLOP.prototype.define = function DFLIPFLOP() {
        alert("parameters can not be changed")
    }

    DFLIPFLOP.prototype.define = function DFLIPFLOP() {
        var scs_m = scicos_diagram({
            version: new ScilabString(["scicos4.2"]),
            props: scicos_params({
                wpar: new ScilabDouble([600, 450, 0, 0, 600, 450]),
                Title: new ScilabString(["DFLIPFLOP"]),
                tol: new ScilabDouble([0.0001], [0.000001], [Math.pow(10, -10)], [100001], [0], [0], [0]),
                tf: new ScilabDouble([100000]),
                context: new ScilabString([" "]),
                void1: new ScilabDouble(),
                options: tlist(["scsopt", "3D", "Background", "Link", "ID", "Cmap"], new ScilabString(["scsopt", "3D", "Background", "Link", "ID", "Cmap"]), list(new ScilabBoolean([true]), new ScilabDouble([33])), new ScilabDouble([8, 1]), new ScilabDouble([1, 5]), list(new ScilabDouble([5, 1]), new ScilabDouble([4, 1])), new ScilabDouble([0.8, 0.8, 0.8])),
                void2: new ScilabDouble(),
                void3: new ScilabDouble(),
                doc: list()
            })
        });
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["CONST_m"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([109.62561, 263.44465]),
                sz: new ScilabDouble([20], [20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["int8(0)"]),
                pin: new ScilabDouble(),
                pout: new ScilabDouble([6]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;CONST_m&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabDouble(),
                out_implicit: new ScilabString(["E"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_label: new ScilabString([""]),
                style: new ScilabString(["CONST_m"])
            }),
            model: scicos_model({
                sim: list(new ScilabString(["cstblk4_m"]), new ScilabDouble([4])),
                in: new ScilabDouble(),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble(),
                out: new ScilabDouble([1]),
                out2: new ScilabDouble([1]),
                outtyp: new ScilabDouble([5]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble(),
                opar: list(int8([0])),
                blocktype: new ScilabString(["d"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["IFTHEL_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([239.98293, 378.2166]),
                sz: new ScilabDouble([60, 60]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1"], ["1"]),
                pin: new ScilabDouble([29]),
                pout: new ScilabDouble(),
                pein: new ScilabDouble([22]),
                peout: new ScilabDouble([16], [44]),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;IFTHEL_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabDouble(),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""]),
                style: new ScilabString(["IFTHEL_f"])
            }),
            model: scicos_model({
                sim: list(new ScilabString(["ifthel"]), new ScilabDouble([-1])),
                in: new ScilabDouble([1]),
                in2: new ScilabDouble([1]),
                intyp: new ScilabDouble([-1]),
                out: new ScilabDouble(),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble([1]),
                evtin: new ScilabDouble([1]),
                evtout: new ScilabDouble([1], [1]),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble(),
                opar: list(),
                blocktype: new ScilabString(["l"]),
                firing: new ScilabDouble([-1, -1]),
                dep_ut: new ScilabBoolean([true, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([1]),
                nmode: new ScilabDouble([1]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["LOGICAL_OP"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([152.88902, 260.24498]),
                sz: new ScilabDouble([60, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["2"], ["1"], ["5"], ["0"]),
                pin: new ScilabDouble([11], [39]),
                pout: new ScilabDouble([5]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;LOGICAL_OP&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"], ["E"]),
                out_implicit: new ScilabString(["E"]),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"], ["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""], [""]),
                out_label: new ScilabString([""]),
                style: new ScilabString(["LOGICAL_OP"])
            }),
            model: scicos_model({
                sim: list(new ScilabString(["logicalop_i8"]), new ScilabDouble([4])),
                in: new ScilabDouble([-1], [-1]),
                in2: new ScilabDouble([-2], [-2]),
                intyp: new ScilabDouble([5], [5]),
                out: new ScilabDouble([-1]),
                out2: new ScilabDouble([-2]),
                outtyp: new ScilabDouble([5]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble([1], [0]),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([true, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["SAMPHOLD_m"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([233.72156, 260.24498]),
                sz: new ScilabDouble([40, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["5"]),
                pin: new ScilabDouble([5]),
                pout: new ScilabDouble([33]),
                pein: new ScilabDouble([42]),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;SAMPHOLD_m&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabString(["E"]),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""]),
                out_label: new ScilabString([""]),
                style: new ScilabString(["SAMPHOLD_m"])
            }),
            model: scicos_model({
                sim: list(new ScilabString(["samphold4_m"]), new ScilabDouble([4])),
                in: new ScilabDouble([-1]),
                in2: new ScilabDouble([-2]),
                intyp: new ScilabDouble([5]),
                out: new ScilabDouble([-1]),
                out2: new ScilabDouble([-2]),
                outtyp: new ScilabDouble([5]),
                evtin: new ScilabDouble([1]),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble(),
                opar: list(),
                blocktype: new ScilabString(["d"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([true, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([221.46044], [225.15013]),
            yy: new ScilabDouble([280.24498], [280.24498]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([3, 1, 0]),
            to: new ScilabDouble([4, 1, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([138.19704], [140.34523]),
            yy: new ScilabDouble([273.44465], [273.49157]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([1, 1, 0]),
            to: new ScilabDouble([38, 1, 1])
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["LOGICAL_OP"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([373.24106, 309.46812]),
                sz: new ScilabDouble([60, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1"], ["5"], ["5"], ["0"]),
                pin: new ScilabDouble([36]),
                pout: new ScilabDouble([13]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;LOGICAL_OP&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabString(["E"]),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""]),
                out_label: new ScilabString([""]),
                style: new ScilabString(["LOGICAL_OP"])
            }),
            model: scicos_model({
                sim: list(new ScilabString(["logicalop_i8"]), new ScilabDouble([4])),
                in: new ScilabDouble([-1]),
                in2: new ScilabDouble([-2]),
                intyp: new ScilabDouble([5]),
                out: new ScilabDouble([-1]),
                out2: new ScilabDouble([-2]),
                outtyp: new ScilabDouble([5]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble([5], [0]),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([true, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["IN_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([199.48466, 398.2166]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["3"]),
                pin: new ScilabDouble(),
                pout: new ScilabDouble([9]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;IN_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabDouble(),
                out_implicit: new ScilabString(["E"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_label: new ScilabString([""]),
                style: new ScilabString(["IN_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["input"]),
                in: new ScilabDouble(),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble([1]),
                out: new ScilabDouble([-1]),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble([-1]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble([3]),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([219.48466], [222.54128]),
            yy: new ScilabDouble([408.2166], [408.2166]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([8, 1, 0]),
            to: new ScilabDouble([28, 1, 1])
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["IN_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([104.31759, 276.91165]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1"]),
                pin: new ScilabDouble(),
                pout: new ScilabDouble([11]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;IN_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabDouble(),
                out_implicit: new ScilabString(["E"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_label: new ScilabString([""]),
                style: new ScilabString(["IN_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["input"]),
                in: new ScilabDouble(),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble([1]),
                out: new ScilabDouble([-1]),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble([-1]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble([1]),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([124.31759], [144.31759]),
            yy: new ScilabDouble([286.91165], [286.91165]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([10, 1, 0]),
            to: new ScilabDouble([3, 1, 1])
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["OUT_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([457.40928, 320.20131]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["2"]),
                pin: new ScilabDouble([13]),
                pout: new ScilabDouble(),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;OUT_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabDouble(),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""]),
                style: new ScilabString(["OUT_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["output"]),
                in: new ScilabDouble([-1]),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble([-1]),
                out: new ScilabDouble(),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble([1]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble([2]),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([441.81249], [457.40928]),
            yy: new ScilabDouble([329.46812], [330.20131]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([7, 1, 0]),
            to: new ScilabDouble([12, 1, 1])
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["OUT_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([376.4669, 270.83282]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1"]),
                pin: new ScilabDouble([37]),
                pout: new ScilabDouble(),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;OUT_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabDouble(),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""]),
                style: new ScilabString(["OUT_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["output"]),
                in: new ScilabDouble([-1]),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble([-1]),
                out: new ScilabDouble(),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble([1]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble([1]),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));

        var scs_m_1 = scicos_diagram({
            version: new ScilabString(["scicos4.2"]),
            props: scicos_params({
                wpar: new ScilabDouble([600, 450, 0, 0, 600, 450]),
                Title: new ScilabString(["Untitled"]),
                tol: new ScilabDouble([0.0001], [0.000001], [Math.pow(10, -10)], [100001], [0], [0], [0]),
                tf: new ScilabDouble([100000]),
                context: new ScilabDouble(),
                void1: new ScilabDouble(),
                options: tlist(["scsopt", "3D", "Background", "Link", "ID", "Cmap"], new ScilabString(["scsopt", "3D", "Background", "Link", "ID", "Cmap"]), list(new ScilabBoolean([true]), new ScilabDouble([33])), new ScilabDouble([8, 1]), new ScilabDouble([1, 5]), list(new ScilabDouble([5, 1]), new ScilabDouble([4, 1])), new ScilabDouble([0.8, 0.8, 0.8])),
                void2: new ScilabDouble(),
                void3: new ScilabDouble(),
                doc: list()
            })
        });
        scs_m_1.objs.push(scicos_block({
            gui: new ScilabString(["ANDLOG_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([194, 133]),
                sz: new ScilabDouble([60, 60]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabDouble(),
                pin: new ScilabDouble(),
                pout: new ScilabDouble([9]),
                pein: new ScilabDouble([4], [11]),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;ANDLOG_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabDouble(),
                out_implicit: new ScilabString(["E"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_label: new ScilabString([""]),
                style: new ScilabString(["ANDLOG_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["andlog"]),
                in: new ScilabDouble(),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble([1]),
                out: new ScilabDouble([1]),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble([1]),
                evtin: new ScilabDouble([1], [1]),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble(),
                opar: list(),
                blocktype: new ScilabString(["d"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m_1.objs.push(scicos_block({
            gui: new ScilabString(["CLKIN_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([149, 287]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1"]),
                pin: new ScilabDouble(),
                pout: new ScilabDouble(),
                pein: new ScilabDouble(),
                peout: new ScilabDouble([4]),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;CLKIN_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabDouble(),
                out_implicit: new ScilabDouble(),
                style: new ScilabString(["CLKIN_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["input"]),
                in: new ScilabDouble(),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble([1]),
                out: new ScilabDouble(),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble([1]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble([1]),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble([1]),
                opar: list(),
                blocktype: new ScilabString(["d"]),
                firing: new ScilabDouble([-1]),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m_1.objs.push(scicos_block({
            gui: new ScilabString(["CLKOUT_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([450, 83]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1"]),
                pin: new ScilabDouble(),
                pout: new ScilabDouble(),
                pein: new ScilabDouble([8]),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;CLKOUT_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabDouble(),
                out_implicit: new ScilabDouble(),
                style: new ScilabString(["CLKOUT_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["output"]),
                in: new ScilabDouble(),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble([1]),
                out: new ScilabDouble(),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble([1]),
                evtin: new ScilabDouble([1]),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble([1]),
                opar: list(),
                blocktype: new ScilabString(["d"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m_1.objs.push(scicos_link({
            xx: new ScilabDouble([169], [214], [214]),
            yy: new ScilabDouble([297], [297], [198.71]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([2, 1]),
            to: new ScilabDouble([1, 1])
        }));
        scs_m_1.objs.push(scicos_block({
            gui: new ScilabString(["CLKIN_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([141, 330]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["2"]),
                pin: new ScilabDouble(),
                pout: new ScilabDouble(),
                pein: new ScilabDouble(),
                peout: new ScilabDouble([6]),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;CLKIN_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabDouble(),
                out_implicit: new ScilabDouble(),
                style: new ScilabString(["CLKIN_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["input"]),
                in: new ScilabDouble(),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble([1]),
                out: new ScilabDouble(),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble([1]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble([1]),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble([2]),
                opar: list(),
                blocktype: new ScilabString(["d"]),
                firing: new ScilabDouble([-1]),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m_1.objs.push(scicos_link({
            xx: new ScilabDouble([161], [234], [234]),
            yy: new ScilabDouble([340], [340], [275.78]),
            thick: new ScilabDouble([0, 0]),
            id: new ScilabString(["drawlink"]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([5, 1]),
            to: new ScilabDouble([10, 1])
        }));
        scs_m_1.objs.push(scicos_block({
            gui: new ScilabString(["IFTHEL_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([331, 137]),
                sz: new ScilabDouble([60, 60]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1"], ["1"]),
                pin: new ScilabDouble([9]),
                pout: new ScilabDouble(),
                pein: new ScilabDouble([12]),
                peout: new ScilabDouble([8], [0]),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;IFTHEL_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabDouble(),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""]),
                style: new ScilabString(["IFTHEL_f"])
            }),
            model: scicos_model({
                sim: list(new ScilabString(["ifthel"]), new ScilabDouble([-1])),
                in: new ScilabDouble([1]),
                in2: new ScilabDouble([1]),
                intyp: new ScilabDouble([-1]),
                out: new ScilabDouble(),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble([1]),
                evtin: new ScilabDouble([1]),
                evtout: new ScilabDouble([1], [1]),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble(),
                opar: list(),
                blocktype: new ScilabString(["l"]),
                firing: new ScilabDouble([-1, -1]),
                dep_ut: new ScilabBoolean([true, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([1]),
                nmode: new ScilabDouble([1]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m_1.objs.push(scicos_link({
            xx: new ScilabDouble([351], [351], [450]),
            yy: new ScilabDouble([131.29], [93], [93]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([7, 1]),
            to: new ScilabDouble([3, 1])
        }));
        scs_m_1.objs.push(scicos_link({
            xx: new ScilabDouble([262.57], [322.43]),
            yy: new ScilabDouble([163], [167]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([1, 1]),
            to: new ScilabDouble([7, 1])
        }));
        scs_m_1.objs.push(scicos_block({
            gui: new ScilabString(["CLKSPLIT_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([234], [275.78348]),
                sz: new ScilabDouble([0.3333333, 0.3333333]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabDouble(),
                pin: new ScilabDouble(),
                pout: new ScilabDouble(),
                pein: new ScilabDouble([6]),
                peout: new ScilabDouble([11], [12]),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;CLKSPLIT_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabDouble(),
                out_implicit: new ScilabDouble(),
                style: new ScilabString(["CLKSPLIT_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["split"]),
                in: new ScilabDouble(),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble([1]),
                out: new ScilabDouble(),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble([1]),
                evtin: new ScilabDouble([1]),
                evtout: new ScilabDouble([1], [1]),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble(),
                opar: list(),
                blocktype: new ScilabString(["d"]),
                firing: new ScilabBoolean([false, false, false]),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m_1.objs.push(scicos_link({
            xx: new ScilabDouble([234], [234]),
            yy: new ScilabDouble([275.78], [198.71]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([10, 1]),
            to: new ScilabDouble([1, 2])
        }));
        scs_m_1.objs.push(scicos_link({
            xx: new ScilabDouble([234], [361], [361]),
            yy: new ScilabDouble([275.78], [275.78], [202.71]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([10, 2]),
            to: new ScilabDouble([7, 1])
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["ANDBLK"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([233.73039, 318.74407]),
                sz: new ScilabDouble([40, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabDouble(),
                pin: new ScilabDouble(),
                pout: new ScilabDouble(),
                pein: new ScilabDouble([19], [16]),
                peout: new ScilabDouble([17]),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;ANDBLK&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabDouble(),
                out_implicit: new ScilabDouble(),
                style: new ScilabString(["ANDBLK"])
            }),
            model: scicos_model({
                sim: new ScilabString(["csuper"]),
                in: new ScilabDouble(),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble([1]),
                out: new ScilabDouble(),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble([1]),
                evtin: new ScilabDouble([1], [1]),
                evtout: new ScilabDouble([1]),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: scs_m_1,
                ipar: new ScilabDouble(),
                opar: list(),
                blocktype: new ScilabString(["h"]),
                firing: new ScilabBoolean([false]),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([259.98293], [260.39705]),
            yy: new ScilabDouble([372.50232], [364.45835]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([2, 1, 0]),
            to: new ScilabDouble([15, 2, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([253.73039], [253.72572]),
            yy: new ScilabDouble([313.02978], [309.29537]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([15, 1, 0]),
            to: new ScilabDouble([41, 1, 1])
        }));
        scs_m_1 = scicos_diagram({
            version: new ScilabString(["scicos4.2"]),
            props: scicos_params({
                wpar: new ScilabDouble([600, 450, 0, 0, 600, 450]),
                Title: new ScilabString(["EDGE_TRIGGER", "./"]),
                tol: new ScilabDouble([0.0001], [0.000001], [Math.pow(10, -10)], [100001], [0], [0], [0]),
                tf: new ScilabDouble([30]),
                context: new ScilabString([" "]),
                void1: new ScilabDouble(),
                options: tlist(["scsopt", "3D", "Background", "Link", "ID", "Cmap"], new ScilabString(["scsopt", "3D", "Background", "Link", "ID", "Cmap"]), list(new ScilabBoolean([true]), new ScilabDouble([33])), new ScilabDouble([8, 1]), new ScilabDouble([1, 5]), list(new ScilabDouble([5, 1]), new ScilabDouble([4, 1])), new ScilabDouble([0.8, 0.8, 0.8])),
                void2: new ScilabDouble(),
                void3: new ScilabDouble(),
                doc: list()
            })
        });
        scs_m_1.objs.push(scicos_block({
            gui: new ScilabString(["EDGETRIGGER"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([288.58631, 257.1131]),
                sz: new ScilabDouble([60, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1"]),
                pin: new ScilabDouble([5]),
                pout: new ScilabDouble([3]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;EDGETRIGGER&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabString(["E"]),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""]),
                out_label: new ScilabString([""]),
                style: new ScilabString(["EDGETRIGGER"])
            }),
            model: scicos_model({
                sim: list(new ScilabString(["edgetrig"]), new ScilabDouble([4])),
                in: new ScilabDouble([1]),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble([1]),
                out: new ScilabDouble([1]),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble([1]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble([0]),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble([1]),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([true, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([1]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m_1.objs.push(scicos_block({
            gui: new ScilabString(["IFTHEL_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([388.28869, 247.1131]),
                sz: new ScilabDouble([60, 60]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["0"], ["0"]),
                pin: new ScilabDouble([3]),
                pout: new ScilabDouble(),
                pein: new ScilabDouble(),
                peout: new ScilabDouble([7], [0]),
                gr_i: new ScilabDouble(),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabDouble()
            }),
            model: scicos_model({
                sim: list(new ScilabString(["ifthel"]), new ScilabDouble([-1])),
                in: new ScilabDouble([1]),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble([1]),
                out: new ScilabDouble(),
                out2: new ScilabDouble([1]),
                outtyp: new ScilabDouble(),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble([1], [1]),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble(),
                opar: list(),
                blocktype: new ScilabString(["l"]),
                firing: new ScilabDouble([-1, -1]),
                dep_ut: new ScilabBoolean([true, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m_1.objs.push(scicos_link({
            xx: new ScilabDouble([357.15774], [362.99107], [379.71726]),
            yy: new ScilabDouble([277.1131], [277.1131], [277.1131]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([1, 1, 0]),
            to: new ScilabDouble([2, 1, 1])
        }));
        scs_m_1.objs.push(scicos_block({
            gui: new ScilabString(["IN_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([240.01488, 267.1131]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1"]),
                pin: new ScilabDouble(),
                pout: new ScilabDouble([5]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;IN_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabDouble(),
                out_implicit: new ScilabString(["E"]),
                style: new ScilabString(["IN_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["input"]),
                in: new ScilabDouble(),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble([-1]),
                out: new ScilabDouble([-1]),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble([1]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble([1]),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m_1.objs.push(scicos_link({
            xx: new ScilabDouble([260.01488], [280.01488]),
            yy: new ScilabDouble([277.1131], [277.1131]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([4, 1, 0]),
            to: new ScilabDouble([1, 1, 1])
        }));
        scs_m_1.objs.push(scicos_block({
            gui: new ScilabString(["CLKOUTV_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([398.28869, 181.39881]),
                sz: new ScilabDouble([20, 30]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1"]),
                pin: new ScilabDouble(),
                pout: new ScilabDouble(),
                pein: new ScilabDouble([7]),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;CLKOUTV_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabDouble(),
                out_implicit: new ScilabDouble(),
                style: new ScilabString(["CLKOUTV_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["output"]),
                in: new ScilabDouble(),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble([1]),
                out: new ScilabDouble(),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble([1]),
                evtin: new ScilabDouble([1]),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble([1]),
                opar: list(),
                blocktype: new ScilabString(["d"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m_1.objs.push(scicos_link({
            xx: new ScilabDouble([408.28869], [408.28869]),
            yy: new ScilabDouble([241.39881], [211.39881]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([2, 1, 0]),
            to: new ScilabDouble([6, 1, 1])
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["EDGE_TRIGGER"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([133.90637, 385.342]),
                sz: new ScilabDouble([60, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabDouble(),
                pin: new ScilabDouble([26]),
                pout: new ScilabDouble(),
                pein: new ScilabDouble(),
                peout: new ScilabDouble([19]),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;EDGE_TRIGGER&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabDouble(),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""]),
                style: new ScilabString(["EDGE_TRIGGER"])
            }),
            model: scicos_model({
                sim: new ScilabString(["csuper"]),
                in: new ScilabDouble([-1]),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble([1]),
                out: new ScilabDouble(),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble([1]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble([1]),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: scs_m_1,
                ipar: new ScilabDouble(),
                opar: list(),
                blocktype: new ScilabString(["h"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([163.90637], [163.90637], [247.06372]),
            yy: new ScilabDouble([379.62771], [364.45835], [364.45835]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([18, 1, 0]),
            to: new ScilabDouble([15, 1, 1])
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["IN_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([79.594811, 395.47647]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["2"]),
                pin: new ScilabDouble(),
                pout: new ScilabDouble([23]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;IN_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabDouble(),
                out_implicit: new ScilabString(["E"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_label: new ScilabString([""]),
                style: new ScilabString(["IN_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["input"]),
                in: new ScilabDouble(),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble([1]),
                out: new ScilabDouble([-1]),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble([-1]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble([2]),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));

        scs_m_1 = scicos_diagram({
            version: new ScilabString(["scicos4.2"]),
            props: scicos_params({
                wpar: new ScilabDouble([600, 450, 0, 0, 600, 450]),
                Title: new ScilabString(["EXTRACT_ACTIVATION", "./"]),
                tol: new ScilabDouble([0.0001], [0.000001], [Math.pow(10, -10)], [100001], [0], [0], [0]),
                tf: new ScilabDouble([30]),
                context: new ScilabString([" "]),
                void1: new ScilabDouble(),
                options: tlist(["scsopt", "3D", "Background", "Link", "ID", "Cmap"], new ScilabString(["scsopt", "3D", "Background", "Link", "ID", "Cmap"]), list(new ScilabBoolean([true]), new ScilabDouble([33])), new ScilabDouble([8, 1]), new ScilabDouble([1, 5]), list(new ScilabDouble([5, 1]), new ScilabDouble([4, 1])), new ScilabDouble([0.8, 0.8, 0.8])),
                void2: new ScilabDouble(),
                void3: new ScilabDouble(),
                doc: list()
            })
        });
        scs_m_1.objs.push(scicos_block({
            gui: new ScilabString(["IFTHEL_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([150.65045, 143.82208]),
                sz: new ScilabDouble([60, 60]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["0"], ["0"]),
                pin: new ScilabDouble([6]),
                pout: new ScilabDouble(),
                pein: new ScilabDouble(),
                peout: new ScilabDouble([3], [4]),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;IFTHEL_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabDouble(),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""]),
                style: new ScilabString(["IFTHEL_f"])
            }),
            model: scicos_model({
                sim: list(new ScilabString(["ifthel"]), new ScilabDouble([-1])),
                in: new ScilabDouble([1]),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble([1]),
                out: new ScilabDouble(),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble([1]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble([1], [1]),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble(),
                opar: list(),
                blocktype: new ScilabString(["l"]),
                firing: new ScilabDouble([-1, -1]),
                dep_ut: new ScilabBoolean([true, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m_1.objs.push(scicos_block({
            gui: new ScilabString(["CLKSOMV_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([169.82143, 96.146231]),
                sz: new ScilabDouble([16.666667, 16.666667]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabDouble(),
                pin: new ScilabDouble(),
                pout: new ScilabDouble(),
                pein: new ScilabDouble([3], [4], [0]),
                peout: new ScilabDouble([8]),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;CLKSOMV_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabDouble(),
                out_implicit: new ScilabDouble(),
                style: new ScilabString(["CLKSOMV_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["sum"]),
                in: new ScilabDouble(),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble([1]),
                out: new ScilabDouble(),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble([1]),
                evtin: new ScilabDouble([1], [1], [1]),
                evtout: new ScilabDouble([1]),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble(),
                opar: list(),
                blocktype: new ScilabString(["d"]),
                firing: new ScilabDouble([-1]),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m_1.objs.push(scicos_link({
            xx: new ScilabDouble([170.65045], [170.65045], [150.04302], [150.04302], [169.82143]),
            yy: new ScilabDouble([138.10779], [128.235], [128.235], [104.47956], [104.47956]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([1, 1, 0]),
            to: new ScilabDouble([2, 1, 1])
        }));
        scs_m_1.objs.push(scicos_link({
            xx: new ScilabDouble([190.65045], [190.65045], [178.15476]),
            yy: new ScilabDouble([138.10779], [111.55729], [112.8129]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([1, 2, 0]),
            to: new ScilabDouble([2, 2, 1])
        }));
        scs_m_1.objs.push(scicos_block({
            gui: new ScilabString(["IN_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([102.07902, 163.82208]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1"]),
                pin: new ScilabDouble(),
                pout: new ScilabDouble([6]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;IN_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabDouble(),
                out_implicit: new ScilabString(["E"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_label: new ScilabString([""]),
                style: new ScilabString(["IN_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["input"]),
                in: new ScilabDouble(),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble([-1]),
                out: new ScilabDouble([-1]),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble([1]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble([1]),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m_1.objs.push(scicos_link({
            xx: new ScilabDouble([122.07902], [142.07902]),
            yy: new ScilabDouble([173.82208], [173.82208]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([5, 1, 0]),
            to: new ScilabDouble([1, 1, 1])
        }));
        scs_m_1.objs.push(scicos_block({
            gui: new ScilabString(["CLKOUTV_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([168.15476, 38.527183]),
                sz: new ScilabDouble([20, 30]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1"]),
                pin: new ScilabDouble(),
                pout: new ScilabDouble(),
                pein: new ScilabDouble([8]),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;CLKOUTV_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabDouble(),
                out_implicit: new ScilabDouble(),
                style: new ScilabString(["CLKOUTV_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["output"]),
                in: new ScilabDouble(),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble([1]),
                out: new ScilabDouble(),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble([1]),
                evtin: new ScilabDouble([1]),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble([1]),
                opar: list(),
                blocktype: new ScilabString(["d"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m_1.objs.push(scicos_link({
            xx: new ScilabDouble([178.15476], [178.15476]),
            yy: new ScilabDouble([98.527183], [68.527183]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([2, 1, 0]),
            to: new ScilabDouble([7, 1, 1])
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["Extract_Activation"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([239.82193, 456.57677]),
                sz: new ScilabDouble([60, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabDouble(),
                pin: new ScilabDouble([31]),
                pout: new ScilabDouble(),
                pein: new ScilabDouble(),
                peout: new ScilabDouble([22]),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;Extract_Activation&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabDouble(),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""]),
                style: new ScilabString(["Extract_Activation"])
            }),
            model: scicos_model({
                sim: new ScilabString(["csuper"]),
                in: new ScilabDouble([-1]),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble([1]),
                out: new ScilabDouble(),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble([1]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble([1]),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: scs_m_1,
                ipar: new ScilabDouble(),
                opar: list(),
                blocktype: new ScilabString(["h"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([269.82193], [269.98293]),
            yy: new ScilabDouble([450.86248], [443.93089]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([21, 1, 0]),
            to: new ScilabDouble([2, 1, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([99.594811], [110.25582]),
            yy: new ScilabDouble([405.47647], [405.42077]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([20, 1, 0]),
            to: new ScilabDouble([25, 1, 1])
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["SUM_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([200.5252, 469.13173]),
                sz: new ScilabDouble([16.666667, 16.666667]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabDouble(),
                pin: new ScilabDouble([27], [0], [30]),
                pout: new ScilabDouble([31]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;SUM_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"], ["E"], ["E"]),
                out_implicit: new ScilabString(["E"]),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"], ["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"], ["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""], [""], [""]),
                out_label: new ScilabString([""]),
                style: new ScilabString(["SUM_f"])
            }),
            model: scicos_model({
                sim: list(new ScilabString(["plusblk"]), new ScilabDouble([2])),
                in: new ScilabDouble([-1], [-1], [-1]),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble([1]),
                out: new ScilabDouble([-1]),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble([1]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble(),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([true, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["SPLIT_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([110.25582], [405.42077]),
                sz: new ScilabDouble([0.3333333, 0.3333333]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabDouble(),
                pin: new ScilabDouble([23]),
                pout: new ScilabDouble([26], [27]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;SPLIT_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabString(["E"], ["E"], ["E"]),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"], ["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"], ["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""]),
                out_label: new ScilabString([""], [""], [""]),
                style: new ScilabString(["SPLIT_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["lsplit"]),
                in: new ScilabDouble([-1]),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble([1]),
                out: new ScilabDouble([-1], [-1], [-1]),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble([1]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble(),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([true, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([110.25582], [114.33667], [125.33494]),
            yy: new ScilabDouble([405.42077], [405.39945], [405.342]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([25, 1, 0]),
            to: new ScilabDouble([18, 1, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([110.25582], [110.25582], [208.85853]),
            yy: new ScilabDouble([405.42077], [469.13173], [469.13173]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([25, 2, 0]),
            to: new ScilabDouble([24, 1, 1])
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["SPLIT_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([222.54128], [408.2166]),
                sz: new ScilabDouble([0.3333333, 0.3333333]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabDouble(),
                pin: new ScilabDouble([9]),
                pout: new ScilabDouble([29], [30]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;SPLIT_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabString(["E"], ["E"], ["E"]),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"], ["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"], ["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""]),
                out_label: new ScilabString([""], [""], [""]),
                style: new ScilabString(["SPLIT_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["lsplit"]),
                in: new ScilabDouble([-1]),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble([1]),
                out: new ScilabDouble([-1], [-1], [-1]),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble([1]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble(),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([true, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([222.54128], [231.4115]),
            yy: new ScilabDouble([408.2166], [408.2166]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([28, 1, 0]),
            to: new ScilabDouble([2, 1, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([222.54128], [222.54128], [208.85853], [208.85853]),
            yy: new ScilabDouble([408.2166], [453.0015], [453.0015], [485.7984]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([28, 2, 0]),
            to: new ScilabDouble([24, 3, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([219.57282], [231.2505]),
            yy: new ScilabDouble([477.46506], [476.57677]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([24, 1, 0]),
            to: new ScilabDouble([21, 1, 1])
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["SELECT_m"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([298.86371, 253.57321]),
                sz: new ScilabDouble([40, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["5"], ["2"], ["1"]),
                pin: new ScilabDouble([33], [40]),
                pout: new ScilabDouble([34]),
                pein: new ScilabDouble([43], [44]),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;SELECT_m&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"], ["E"]),
                out_implicit: new ScilabString(["E"]),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"], ["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""], [""]),
                out_label: new ScilabString([""]),
                style: new ScilabString(["SELECT_m"])
            }),
            model: scicos_model({
                sim: list(new ScilabString(["selector_m"]), new ScilabDouble([4])),
                in: new ScilabDouble([-1], [-1]),
                in2: new ScilabDouble([-2], [-2]),
                intyp: new ScilabDouble([5], [5]),
                out: new ScilabDouble([-1]),
                out2: new ScilabDouble([-2]),
                outtyp: new ScilabDouble([5]),
                evtin: new ScilabDouble([1], [1]),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble([1]),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble(),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([true, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([282.29299], [290.29229]),
            yy: new ScilabDouble([280.24498], [280.23987]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([4, 1, 0]),
            to: new ScilabDouble([32, 1, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([347.43514], [357.57328], [357.57328]),
            yy: new ScilabDouble([273.57321], [273.57321], [280.83282]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([32, 1, 0]),
            to: new ScilabDouble([35, 1, 1])
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["SPLIT_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([357.57328, 280.83282]),
                sz: new ScilabDouble([0.3333333, 0.3333333]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabDouble(),
                pin: new ScilabDouble([34]),
                pout: new ScilabDouble([36], [37]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;SPLIT_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabString(["E"], ["E"], ["E"]),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"], ["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"], ["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""]),
                out_label: new ScilabString([""], [""], [""]),
                style: new ScilabString(["SPLIT_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["lsplit"]),
                in: new ScilabDouble([-1]),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble([1]),
                out: new ScilabDouble([-1], [-1], [-1]),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble([1]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble(),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([true, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([357.57328], [357.57328], [364.66964]),
            yy: new ScilabDouble([280.83282], [329.46812], [329.46812]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([35, 1, 0]),
            to: new ScilabDouble([7, 1, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([357.57328], [376.4669]),
            yy: new ScilabDouble([280.83282], [280.83282]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([35, 2, 0]),
            to: new ScilabDouble([14, 1, 1])
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["SPLIT_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([140.34523], [273.49157]),
                sz: new ScilabDouble([0.3333333, 0.3333333]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabDouble(),
                pin: new ScilabDouble([6]),
                pout: new ScilabDouble([39], [40]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;SPLIT_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabString(["E"], ["E"], ["E"]),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"], ["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"], ["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""]),
                out_label: new ScilabString([""], [""], [""]),
                style: new ScilabString(["SPLIT_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["lsplit"]),
                in: new ScilabDouble([-1]),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble([1]),
                out: new ScilabDouble([-1], [-1], [-1]),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble([1]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble(),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([true, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([140.34523], [144.31759]),
            yy: new ScilabDouble([273.49157], [273.57832]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([38, 1, 0]),
            to: new ScilabDouble([3, 2, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([140.34523], [140.34523], [290.29229], [290.29229]),
            yy: new ScilabDouble([273.49157], [247.70767], [247.70767], [266.90654]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([38, 2, 0]),
            to: new ScilabDouble([32, 2, 1])
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["CLKSPLIT_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([253.72572], [309.29537]),
                sz: new ScilabDouble([0.3333333, 0.3333333]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabDouble(),
                pin: new ScilabDouble(),
                pout: new ScilabDouble(),
                pein: new ScilabDouble([17]),
                peout: new ScilabDouble([42], [43]),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;CLKSPLIT_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabDouble(),
                out_implicit: new ScilabDouble(),
                style: new ScilabString(["CLKSPLIT_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["split"]),
                in: new ScilabDouble(),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble([1]),
                out: new ScilabDouble(),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble([1]),
                evtin: new ScilabDouble([1]),
                evtout: new ScilabDouble([1], [1]),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble(),
                opar: list(),
                blocktype: new ScilabString(["d"]),
                firing: new ScilabBoolean([false, false, false]),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([253.72572], [253.72156]),
            yy: new ScilabDouble([309.29537], [305.95927]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([41, 1, 0]),
            to: new ScilabDouble([4, 1, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([253.72572], [312.19705], [312.19705]),
            yy: new ScilabDouble([309.29537], [309.29537], [299.28749]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([41, 2, 0]),
            to: new ScilabDouble([32, 1, 1])

        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([279.98293], [279.98293], [325.53038], [325.53038]),
            yy: new ScilabDouble([372.50232], [315.89455], [315.89455], [299.28749]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([2, 2, 0]),
            to: new ScilabDouble([32, 2, 1])
        }));

        var model = scicos_model();
        model.sim = new ScilabString(["csuper"]);
        model.in = new ScilabDouble([1], [1], [1]);
        model.in2 = new ScilabDouble([1], [1], [1]);
        model.out = new ScilabDouble([1], [1]);
        model.out2 = new ScilabDouble([1], [1]);
        model.intyp = new ScilabDouble([5, 1, 1]);
        model.outtyp = new ScilabDouble([5, 5]);
        model.blocktype = new ScilabString(["h"]);
        model.firing = new ScilabBoolean([false]);
        model.dep_ut = new ScilabBoolean([true, false]);
        model.rpar = scs_m;

        var gr_i = [];
        this.x = new standard_define(new ScilabDouble([2, 3]), model, new ScilabDouble(), gr_i);
        return new BasicBlock(this.x);
    }
    DFLIPFLOP.prototype.details = function DFLIPFLOP() {
        return this.x;
    }
}
function DIFF_f() {

    DIFF_f.prototype.define = function DIFF_f() {
        this.x0 = [[0], [0]];

        var model = scicos_model();
        model.sim = list(new ScilabString(["diffblk"]), new ScilabDouble([10001]));
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.state = new ScilabDouble(...this.x0);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, true]);

        var exprs = new ScilabString([sci2exp(this.x0[0])], [sci2exp(this.x0[1])]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"DIFF_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    DIFF_f.prototype.details = function DIFF_f() {
        return this.x;
    }
    DIFF_f.prototype.get = function DIFF_f() {
    if(this.x0 == undefined || this.x0 == null){
        this.x0 = "1"
    }
    if(this.xd0 == undefined || this.xd0 == null){
        this.xd0 = "1"
    }

        var options={
            x0:["Initial state",this.x0],
            xd0:["Initial Derivative",this.xd0],
        }
        return options
    }
DIFF_f.prototype.set = function DIFF_f() {
    this.x0 = parseFloat((arguments[0]["x0"]))
    this.xd0 = parseFloat((arguments[0]["xd0"]))
    this.x.model.state = new ScilabDouble([this.x0],[this.xd0])
    var exprs = new ScilabString([this.x0],[this.xd0])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function Diode() {

    Diode.prototype.define = function Diode() {

        this.Ids = 1.e-6;
        this.Vt = 0.04;
        this.Maxexp = 15;
        this.R = 1.e8;

        var model = scicos_model();
        model.rpar = new ScilabDouble([this.Ids], [this.Vt], [this.Maxexp], [this.R]);
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.sim = new ScilabString(["Diode"]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var mo = new modelica_function();
        mo.model = new ScilabString(["Diode"]);
        mo.inputs = new ScilabString(["p"]);
        mo.outputs = new ScilabString(["n"]);
        mo.parameters = list(new ScilabString(["Ids", "Vt", "Maxexp", "R"]), list(new ScilabDouble([this.Ids]), new ScilabDouble([this.Vt]), new ScilabDouble([this.Maxexp]), new ScilabDouble([this.R])));
        model.equations = mo;

        var exprs = new ScilabString([this.Ids], [this.Vt], [this.Maxexp], [this.R]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"Diode\",sz(1),sz(2));"]);
        this.x = standard_define(new ScilabDouble([2, 1]), model, exprs, list(gr_i, 0));
        this.x.graphics.in_implicit = new ScilabString(["I"]);
        this.x.graphics.out_implicit = new ScilabString(["I"]);
        return new BasicBlock(this.x);
    }
    Diode.prototype.details = function Diode() {
        return this.x;
    }
    Diode.prototype.get = function Diode() {
        var options={
            Ids:["Saturation cuurent (A)",this.Ids],
            Vt:["Voltage equivalent to temperature (Volt)",this.Vt],
            Maxexp:["Max exponent for linear continuation",this.Maxexp],
            R:["R (ohm)",this.R],
        }
        return options
    }
    Diode.prototype.set = function Diode() {
        this.Ids = parseFloat((arguments[0]["Ids"]))
        this.Vt = parseFloat((arguments[0]["Vt"]))
        this.Maxexp = parseFloat((arguments[0]["Maxexp"]))
        this.R = parseFloat((arguments[0]["R"]))
        this.x.model.rpar = new ScilabDouble([this.Ids],[this.Vt],[this.Maxexp],[this.R])
        this.x.model.equations.parameters = list(new ScilabString(["Ids", "Vt", "Maxexp", "R"]), list(new ScilabDouble([this.Ids]), new ScilabDouble([this.Vt]), new ScilabDouble([this.Maxexp]), new ScilabDouble([this.R])));
        var exprs = new ScilabString([this.Ids],[this.Vt],[this.Maxexp],[this.R])
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)
    }
}
function DLR() {

    DLR.prototype.define = function DLR() {
        this.x0 = 0;
        this.A = -1;
        this.B = 1;
        this.C = 1;
        this.D = 0;

        var model = scicos_model();
        model.sim = list(new ScilabString(["dsslti4"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.evtin = new ScilabDouble([1]);
        model.dstate = new ScilabDouble([this.x0]);
        model.rpar = new ScilabDouble([this.A], [this.B], [this.C], [this.D]);
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString(["1"], ["1+z"]);
    this.displayParameter = [["1"], ["1"]];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"DLR\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    DLR.prototype.details = function DLR() {
        return this.x;
    }
}

function DLRADAPT_f() {

    DLRADAPT_f.prototype.define = function DLRADAPT_f() {
        this.p = [[0], [1]];
        this.rn = [];
        this.rd = [[math.complex(0.2, 0.8), math.complex(0.2, -0.8)], [math.complex(0.3, 0.7), math.complex(0.3, -0.7)]];
        this.g = [[1], [1]];
        this.last_u = [];
        this.last_y = [[0], [0]];

        var model = scicos_model();
        model.sim = new ScilabString(["dlradp"]);
        model.in = new ScilabDouble([1], [1]);
        model.out = new ScilabDouble([1]);
        model.evtin = new ScilabDouble([1]);
        model.dstate = new ScilabDouble(...this.last_y);
        model.rpar = new ScilabDouble(...this.p, ...real(colon_operator(this.rd)), ...math.im(colon_operator(this.rd)), ...this.g);
        model.ipar = new ScilabDouble([0], [2], [2]);
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([sci2exp(this.p)], [sci2exp(this.rn)], [sci2exp(this.rd, 0)], [sci2exp(this.g)], [sci2exp(this.last_u)], [sci2exp(this.last_y)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"DLRADAPT_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    DLRADAPT_f.prototype.details = function DLRADAPT_f() {
        return this.x;
    }
}
function DLSS() {

    DLSS.prototype.define = function DLSS() {
        this.x0 = 0;
        this.A = -1;
        this.B = 1;
        this.C = 1;
        this.D = 0;

        var model = scicos_model();
        model.sim = list(new ScilabString(["dsslti4"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.evtin = new ScilabDouble([1]);
        model.dstate = new ScilabDouble([this.x0]);
        model.rpar = new ScilabDouble([this.A], [this.B], [this.C], [this.D]);
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([sci2exp(this.A)], [sci2exp(this.B)], [sci2exp(this.C)], [sci2exp(this.D)], [sci2exp(this.x0)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"DLSS\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([4, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    DLSS.prototype.details = function DLSS() {
        return this.x;
    }
DLSS.prototype.get = function DLSS() {
        var options={
            A:["A matrix",this.A.toString().replace(/,/g," ")],
            B:["B matrix",this.B.toString().replace(/,/g," ")],
            C:["C matrix",this.C.toString().replace(/,/g," ")],
            D:["D matrix",this.D.toString().replace(/,/g," ")],
            x0:["Initial state",this.x0.toString().replace(/,/g," ")],
        }
        return options
    }
DLSS.prototype.set = function DLSS() {
    this.A = inverse(arguments[0]["A"])
    this.B = inverse((arguments[0]["B"]))
    this.C = inverse((arguments[0]["C"]))
    this.D = inverse((arguments[0]["D"]))
    this.x0 = inverse((arguments[0]["x0"]))
    var rpar = new ScilabDouble(...this.A,...this.B,...this.C,...this.D)
    this.x.model.dep_ut = new ScilabBoolean(false,false)
    this.x.model.rpar = rpar
    this.x.model.dstate = new ScilabDouble(...this.x0)
    var exprs = new ScilabString([this.A.toString().replace(/,/g, " ")], [this.B.toString().replace(/,/g, " ")], [this.C.toString().replace(/,/g, " ")], [this.D.toString().replace(/,/g, " ")], [this.x0.toString().replace(/,/g, " ")])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function DOLLAR() {

    DOLLAR.prototype.define = function DOLLAR() {
        this.z = 0;
        this.inh = 0;
        this.in1 = 1;

        var model = scicos_model();
        model.sim = list(new ScilabString(["dollar4"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([this.in1]);
        model.out = new ScilabDouble([this.in1]);
        model.evtin = new ScilabDouble([1 - this.inh]);
        model.dstate = new ScilabDouble([this.z]);
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([this.z], [this.inh]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"DOLLAR\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    DOLLAR.prototype.details = function DOLLAR() {
        return this.x;
    }
    DOLLAR.prototype.get = function DOLLAR() {
        if(this.a == undefined || this.a == null){
            this.a = "0"
        }
        var options={
            a:["initial condition",this.a.toString().replace(/,/g," ")],
            inh:["Inherit (no:0, yes:1)",this.inh.toString().replace(/,/g," ")],
        }
        return options
    }
    DOLLAR.prototype.set = function DOLLAR() {
        this.a = inverse(arguments[0]["a"])
        this.inh = inverse(arguments[0]["inh"])
        this.out = [[size(this.a,1)],[size(this.a,2)]]
        if(this.out == 0)
            this.out = []
        this.in = this.out
        this.x.model.sim = list(new ScilabString(["dollar4"]), new ScilabDouble([4]))
        this.x.model.odstate = list(new ScilabDouble(...this.a))
        this.x.model.dstate = new ScilabDouble()
        
        //assuming "type ((a)==1)" is True
        this.x.model.intyp = new ScilabDouble([1])
        this.x.model.outtyp = new ScilabDouble([1])
        if(size(this.a,1)==1 || size(this.a,2)==1){
            this.x.model.dstate = new ScilabDouble(...this.a)
            this.x.model.odstate = list()
        }

        var io = set_io(this.x.model,this.x.graphics,this.in,this.out,ones(1-this.inh,1),[])
        var exprs = new ScilabString([this.a.toString().replace(/,/g, " ")],[this.inh.toString().replace(/,/g, " ")])
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)
    }
}

function DOLLAR_f() {

    DOLLAR_f.prototype.define = function DOLLAR_f() {
        this.z = 0;
        this.inh = 0;
        this.in1 = 1;

        var model = scicos_model();
        model.sim = new ScilabString(["dollar"]);
        model.in = new ScilabDouble([this.in1]);
        model.out = new ScilabDouble([this.in1]);
        model.evtin = new ScilabDouble([1 - this.inh]);
        model.dstate = new ScilabDouble([this.z]);
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([this.z], [this.inh]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"DOLLAR_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    DOLLAR_f.prototype.details = function DOLLAR_f() {
        return this.x;
    }
DOLLAR_f.prototype.get = function DOLLAR_f() {
    if(this.a == undefined || this.a == null){
        this.a = "0"
    }
        var options={
            a:["initial condition",this.a.toString().replace(/,/g," ")],
            inh:["Inherit (no:0, yes:1)",this.inh.toString().replace(/,/g," ")],
        }
        return options
    }
DOLLAR_f.prototype.set = function DOLLAR_f() {
    this.a = inverse(arguments[0]["a"])
    this.inh = inverse(arguments[0]["inh"])
    this.out = size(this.a,"*")
    if(this.out == 0){
        this.out = []
        this.x.model.in = new ScilabDouble()
        this.x.model.out = new ScilabDouble()
    }else{
        this.in = this.out
        this.x.model.in = new ScilabDouble([this.in]);
        this.x.model.out = new ScilabDouble([this.out])
    }
    this.x.model.dstate = new ScilabDouble(...this.a);
    var exprs = new ScilabString([this.a.toString().replace(/,/g, " ")],[this.inh.toString().replace(/,/g, " ")])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function DOLLAR_m() {

    DOLLAR_m.prototype.define = function DOLLAR_m() {
        this.z = 0;
        this.inh = 0;
        this.in1 = 1;

        var model = scicos_model();
        model.sim = list(new ScilabString(["dollar4"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([this.in1]);
        model.out = new ScilabDouble([this.in1]);
        model.evtin = new ScilabDouble([1 - this.inh]);
        model.dstate = new ScilabDouble([this.z]);
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([this.z], [this.inh]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"DOLLAR_m\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    DOLLAR_m.prototype.details = function DOLLAR_m() {
        return this.x;
    }
    DOLLAR_m.prototype.get = function DOLLAR_m() {
        if(this.a == undefined || this.a == null){
            this.a = "0"
        }
        var options={
            a:["initial condition",this.a.toString().replace(/,/g," ")],
            inh:["Inherit (no:0, yes:1)",this.inh.toString().replace(/,/g," ")],
        }
        return options
    }
DOLLAR_m.prototype.set = function DOLLAR_m() {
    this.a = inverse(arguments[0]["a"])
    this.inh = inverse(arguments[0]["inh"])
    this.out = [[size(this.a,1)],[size(this.a,2)]]
    if(this.out == 0)
        this.out = []
    this.in = this.out
    this.x.model.sim = list(new ScilabString(["dollar4_m"]), new ScilabDouble([4]))
    this.x.model.odstate = list(new ScilabDouble(...this.a))
    this.x.model.dstate = new ScilabDouble()
    
    //assuming "type ((a)==1)" is True
    this.x.model.intyp = new ScilabDouble([1])
    this.x.model.outtyp = new ScilabDouble([1])
    if(size(this.a,1)==1 || size(this.a,2)==1){
        this.x.model.sim = list(new ScilabString(["dollar4"]), new ScilabDouble([4]))
        this.x.model.dstate = new ScilabDouble(...this.a)
        this.x.model.odstate = list()
    }

    var io = set_io(this.x.model,this.x.graphics,this.in,this.out,ones(1-this.inh,1),[])
    var exprs = new ScilabString([this.a.toString().replace(/,/g, " ")],[this.inh.toString().replace(/,/g, " ")])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function EDGETRIGGER() {

    EDGETRIGGER.prototype.internal = function EDGETRIGGER() {
        this.edge = 1;
        var model = scicos_model();
        model.sim = list(new ScilabString(["edgetrig"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.in2 = new ScilabDouble([1]);
        model.out2 = new ScilabDouble([1]);
        model.intyp = new ScilabDouble([1]);
        model.outtyp = new ScilabDouble([1]);
        model.dstate = new ScilabDouble([0]);
        model.nzcross = new ScilabDouble([1]);
        model.ipar = new ScilabDouble([this.edge]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([this.edge]);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),&quot;EDGETRIGGER&quot;,sz(1),sz(2));"]);
        var block = standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        block.graphics.style = new ScilabString(["EDGETRIGGER"]);
        return block;
    }
EDGETRIGGER.prototype.define = function EDGETRIGGER() {
    this.edge = 1;
    var model = scicos_model()
    model.sim = list(new ScilabString(["edgetrig"]), new ScilabDouble([4]))
    model.in = new ScilabDouble([1]);
    model.out = new ScilabDouble([1]);
    model.dstate = new ScilabDouble([0]);
    model.nzcross = new ScilabDouble([1]);
    model.ipar = new ScilabDouble([sign(this.edge)])
    model.blocktype = new ScilabDouble(["c"]);
    model.dep_ut = new ScilabBoolean(true, false)
    var exprs = new ScilabString([this.edge])
    var gr_i = list(new ScilabString(["xstringb(orig(1),orig(2),\"EDGETRIGGER\",sz(1),sz(2));"]), new ScilabDouble([8]));
    this.x = new standard_define(new ScilabDouble([80, 80]),model,exprs,gr_i)
    return new BasicBlock(this.x);
    }
EDGETRIGGER.prototype.get = function EDGETRIGGER() {
        var options={
            edge:["rising (1), falling (-1), both (0)",this.edge],
        }
        return options
    }
EDGETRIGGER.prototype.set = function EDGETRIGGER() {
    this.edge = parseFloat((arguments[0]["edge"]))
    this.x.model.ipar = new ScilabDouble([sign(this.edge)])
    var exprs = new ScilabString([this.edge])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
EDGETRIGGER.prototype.details = function EDGETRIGGER() {
    return this.x
    }
}
function EDGE_TRIGGER() {

    EDGE_TRIGGER.prototype.define = function EDGE_TRIGGER() {
        var scs_m_1 = scicos_diagram();
        scs_m_1.objs.push(new EDGETRIGGER().internal());
        scs_m_1.objs.push(new IFTHEL_f().internal());
        scs_m_1.objs.push(new IN_f().internal());
        scs_m_1.objs.push(new CLKOUTV_f().internal());
        scs_m_1.objs.push(scicos_link({}));
        scs_m_1.objs.push(scicos_link({}));
        scs_m_1.objs.push(scicos_link({}));

        var blk = scs_m_1.objs[0];
        var graphics = blk.graphics;
        var model = blk.model;
        graphics.orig = new ScilabDouble([60, 0]);
        graphics.sz = new ScilabDouble([60, 40]);
        graphics.exprs = new ScilabString(["0"]);
        graphics.in_implicit = new ScilabString(["E"]);
        graphics.out_implicit = new ScilabString(["E"]);
        graphics.in_style = new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]);
        graphics.out_style = new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]);
        graphics.in_label = new ScilabString([""]);
        graphics.out_label = new ScilabString([""]);
        model.ipar = new ScilabDouble([0]);
        graphics.pin = new ScilabDouble([5]);
        graphics.pout = new ScilabDouble([6]);
        model.uid = new ScilabString([count]);
        blk.doc = list(new ScilabString([count++]));
        blk.graphics = graphics;
        blk.model = model;
        scs_m_1.objs[0] = blk;

        blk = scs_m_1.objs[1];
        graphics = blk.graphics;
        model = blk.model;
        graphics.orig = new ScilabDouble([160, 0]);
        graphics.sz = new ScilabDouble([60, 40]);
        graphics.exprs = new ScilabString(["0"], ["0"]);
        model.evtin = new ScilabDouble();
        model.nzcross = new ScilabDouble([0]);
        model.nmode = new ScilabDouble([0]);
        graphics.pin = new ScilabDouble([6]);
        graphics.peout = new ScilabDouble([7], [0]);
        model.uid = new ScilabString([count]);
        blk.doc = list(new ScilabString([count++]));
        blk.graphics = graphics;
        blk.model = model;
        scs_m_1.objs[1] = blk;

        blk = scs_m_1.objs[2];
        graphics = blk.graphics;
        model = blk.model;
        graphics.orig = new ScilabDouble([0, 10]);
        graphics.sz = new ScilabDouble([20, 20]);
        graphics.exprs = new ScilabString(["1"]);
        model.ipar = new ScilabDouble([1]);
        graphics.pout = new ScilabDouble([5]);
        model.uid = new ScilabString([count]);
        blk.doc = list(new ScilabString([count++]));
        blk.graphics = graphics;
        blk.model = model;
        scs_m_1.objs[2] = blk;

        blk = scs_m_1.objs[3];
        graphics = blk.graphics;
        model = blk.model;
        graphics.orig = new ScilabDouble([170, -60]);
        graphics.sz = new ScilabDouble([20, 20]);
        graphics.exprs = new ScilabString(["1"]);
        model.ipar = new ScilabDouble([1]);
        graphics.pein = new ScilabDouble([7]);
        model.uid = new ScilabString([count]);
        blk.doc = list(new ScilabString([count++]));
        blk.graphics = graphics;
        blk.model = model;
        scs_m_1.objs[3] = blk;

        var lnk = scs_m_1.objs[4];
        lnk.xx = new ScilabDouble([64], [96]);
        lnk.yy = new ScilabDouble([-40], [-20]);
        lnk.from = new ScilabDouble([3, 1, 0]);
        lnk.to = new ScilabDouble([1, 1, 1]);
        scs_m_1.objs[4] = lnk;

        lnk = scs_m_1.objs[5];
        lnk.xx = new ScilabDouble([164], [196]);
        lnk.yy = new ScilabDouble([-20], [-20]);
        lnk.from = new ScilabDouble([1, 1, 0]);
        lnk.to = new ScilabDouble([2, 1, 1]);
        scs_m_1.objs[5] = lnk;

        lnk = scs_m_1.objs[6];
        lnk.xx = new ScilabDouble([220], [220]);
        lnk.yy = new ScilabDouble([-44], [-96]);
        lnk.ct = new ScilabDouble([5, -1]);
        lnk.from = new ScilabDouble([2, 1, 0]);
        lnk.to = new ScilabDouble([4, 1, 1]);
        scs_m_1.objs[6] = lnk;

        model = scicos_model();
        model.sim = new ScilabString(["csuper"]);
        model.in = new ScilabDouble([1]);
        model.evtout = new ScilabDouble([1]);
        model.rpar = scs_m_1;

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),&quot;EDGE_TRIGGER&quot;,sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, new ScilabDouble(), gr_i);
        return new BasicBlock(this.x);
    }
    EDGE_TRIGGER.prototype.details = function EDGE_TRIGGER() {
        return this.x;
    }
}
function ENDBLK() {

    ENDBLK.prototype.define = function ENDBLK() {
        var scs_m_1 = scicos_diagram({
            version: new ScilabString(["scicos4.2"]),
            props: scicos_params({
                wpar: new ScilabDouble([600, 450, 0, 0, 600, 450]),
                Title: new ScilabString(["ENDBLK"]),
                tol: new ScilabDouble([0.0001], [0.000001], [Math.pow(10, -10)], [100001], [0], [0], [0]),
                tf: new ScilabDouble([100000]),
                context: new ScilabString([" "]),
                void1: new ScilabDouble(),
                options: tlist(["scsopt", "3D", "Background", "Link", "ID", "Cmap"], new ScilabString(["scsopt", "3D", "Background", "Link", "ID", "Cmap"]), list(new ScilabBoolean([true]), new ScilabDouble([33])), new ScilabDouble([8, 1]), new ScilabDouble([1, 5]), list(new ScilabDouble([5, 1]), new ScilabDouble([4, 1])), new ScilabDouble([0.8, 0.8, 0.8])),
                void2: new ScilabDouble(),
                void3: new ScilabDouble(),
                doc: list()
            })
        });
        scs_m_1.objs.push(scicos_block({
            gui: new ScilabString(["END_c"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([272.104, 249.11733]),
                sz: new ScilabDouble([40, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1.000E+08"]),
                pin: new ScilabDouble(),
                pout: new ScilabDouble(),
                pein: new ScilabDouble([2]),
                peout: new ScilabDouble([2]),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;END_c&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabDouble(),
                out_implicit: new ScilabDouble(),
                style: new ScilabString(["END_c"])
            }),
            model: scicos_model({
                sim: list(new ScilabString(["scicosexit"]), new ScilabDouble([4])),
                in: new ScilabDouble(),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble(),
                out: new ScilabDouble(),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble(),
                evtin: new ScilabDouble([1]),
                evtout: new ScilabDouble([1]),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble(),
                opar: list(),
                blocktype: new ScilabString(["d"]),
                firing: new ScilabDouble([1.000E+08]),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m_1.objs.push(scicos_link({
            xx: new ScilabDouble([292.104], [292.104], [261.83733], [261.83733], [292.104], [292.104]),
            yy: new ScilabDouble([243.40305], [234.45067], [234.45067], [305.584], [305.584], [294.83162]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([1, 1, 0]),
            to: new ScilabDouble([1, 1, 1])
        }));

        var model = scicos_model({
            sim: new ScilabString(["csuper"]),
            in: new ScilabDouble(),
            in2: new ScilabDouble(),
            intyp: new ScilabDouble([1]),
            out: new ScilabDouble(),
            out2: new ScilabDouble(),
            outtyp: new ScilabDouble([1]),
            evtin: new ScilabDouble(),
            evtout: new ScilabDouble(),
            state: new ScilabDouble(),
            dstate: new ScilabDouble(),
            odstate: list(),
            rpar: scs_m_1,
            ipar: new ScilabDouble(),
            opar: list(),
            blocktype: new ScilabString(["h"]),
            firing: new ScilabDouble(),
            dep_ut: new ScilabBoolean([false, false]),
            label: new ScilabString([""]),
            nzcross: new ScilabDouble([0]),
            nmode: new ScilabDouble([0]),
            equations: list()
        });

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),&quot;ENDBLK&quot;,sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, new ScilabDouble(), gr_i);
        return new BasicBlock(this.x);
    }
    ENDBLK.prototype.details = function ENDBLK() {
        return this.x;
    }
}
function END_c() {

    END_c.prototype.define = function END_c() {
        this.tf = 100000000;

        var model = scicos_model();
        model.sim = list(new ScilabString(["scicosexit"]), new ScilabDouble([4]));
        model.evtin = new ScilabDouble([1]);
        model.evtout = new ScilabDouble([1]);
        model.firing = new ScilabDouble([this.tf]);
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([this.tf]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"END_c\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    END_c.prototype.details = function END_c() {
        return this.x;
    }
END_c.prototype.get = function END_c() {
        var options={
            tf:["Final simulation time",this.tf],
        }
        return options
    }
END_c.prototype.set = function END_c() {
    this.tf = parseFloat((arguments[0]["tf"]))
    this.x.model.firing = new ScilabDouble([this.tf]);
    var exprs = new ScilabString([this.tf])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function ESELECT_f() {

    ESELECT_f.prototype.define = function ESELECT_f() {
        this.out = 2;

        var model = scicos_model();
        model.sim = list(new ScilabString(["eselect"]), new ScilabDouble([-2]));
        model.in = new ScilabDouble([1]);
        model.in2 = new ScilabDouble([1]);
        model.intyp = new ScilabDouble([-1]);
        model.evtin = new ScilabDouble([1]);
        model.evtout = new ScilabDouble(...ones(this.out, 1));
        model.blocktype = new ScilabString(["l"]);
        model.firing = new ScilabDouble(...ones(this.out, 1));
        model.dep_ut = new ScilabBoolean([true, false]);
        model.nmode = new ScilabDouble([0]);
        model.nzcross = new ScilabDouble([0]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"ESELECT_f\",sz(1),sz(2));"]);;

        var exprs = new ScilabString([this.out], [1], [parseFloat(getData(model.nmode))]);
        this.x = new standard_define(new ScilabDouble([4, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    ESELECT_f.prototype.details = function ESELECT_f() {
        return this.x;
    }
    ESELECT_f.prototype.get = function ESELECT_f() {
    if(this.inh == undefined || this.inh == null){
        this.inh = "1"
    }
    if(this.nmod == undefined || this.nmod == null){
        this.nmod = "0"
    }
        var options={
            out:["number of output event ports",this.out],
            inh:["Inherit (1: no, 0: yes)",1],
            nmod:["zero-crossing (0: no, 1: yes)",this.nmod],
        }
        return options
    }
ESELECT_f.prototype.set = function ESELECT_f() {
    this.out = parseFloat((arguments[0]["out"]))
    this.inh = parseFloat((arguments[0]["inh"]))
    this.nmod = parseFloat((arguments[0]["nmod"]))
    if(this.nmod != 0)
        this.nmod = 1
    if(this.inh == 0)
        this.inh = []
    else
        this.inh = 1
    this.out = Math.floor(this.out)
    this.x.model.evtout = new ScilabDouble(...ones(this.out,1))
    this.value = ones(this.out,1)
    for (var i = this.value.length - 1; i >= 0; i--) {
        this.value[i] = -1*this.value[i]
    }
    this.x.model.firing = new ScilabDouble(...this.value)
    this.x.model.nmode = new ScilabDouble([this.nmod]);
    this.x.model.nzcross = new ScilabDouble([this.nmod]);
    var exprs = new ScilabString([this.out],[this.inh],[this.nmod])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function EVTDLY_c() {

    EVTDLY_c.prototype.internal = function EVTDLY_c() {
        var dt = 0.1;
        var ff = 0.0;
        var model = scicos_model();
        model.sim = list(new ScilabString(["evtdly4"]), new ScilabDouble([4]));
        model.evtin = new ScilabDouble([1]);
        model.evtout = new ScilabDouble([1]);
        model.rpar = new ScilabDouble([dt], [ff]);
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble([ff]);
        model.dep_ut = new ScilabBoolean([false, false]);
        // changed
        model.outtyp = new ScilabDouble();
        var exprs = new ScilabString([dt], [ff]);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"EVTDLY_c\",sz(1),sz(2));"]);
        var block = new standard_define(new ScilabDouble([80, 80]), model, exprs, gr_i); // 3,2 -> 80
        block.graphics.style = new ScilabString(["EVTDLY_c"]);
        return block;

    }

    EVTDLY_c.prototype.define = function EVTDLY_c() {
        this.dt = 0.1;
        this.ff = 0.0;
        var model = scicos_model();
        model.sim = list(new ScilabString(["evtdly4"]), new ScilabDouble([4]));
        model.evtin = new ScilabDouble([1]);
        model.evtout = new ScilabDouble([1]);
        model.rpar = new ScilabDouble([this.dt], [this.ff]);
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble([this.ff]);
        model.dep_ut = new ScilabBoolean([false, false]);
        // changed
        model.outtyp = new ScilabDouble();
        var exprs = new ScilabString([this.dt], [this.ff]);
    var n = this.dt.toString();
    this.displayParameter=[n];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"EVTDLY_c\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([80, 80]), model, exprs, gr_i); // 3,2 -> 80
        this.x.graphics.style = new ScilabString(["EVTDLY_c"]);
        return new BasicBlock(this.x);

    }

    EVTDLY_c.prototype.details = function EVTDLY_c() {

        return this.x;
    }
    EVTDLY_c.prototype.get = function EVTDLY_c() {
        var options={
            dt:["Delay",this.dt],
            ff:["Date of initial output event",sci2exp(this.ff)],
        }
        return options
    }
EVTDLY_c.prototype.set = function EVTDLY_c() {
    this.dt = parseFloat((arguments[0]["dt"]))
    this.ff = parseFloat((arguments[0]["ff"]))
    this.x.model.rpar = new ScilabDouble([this.dt],[this.ff])
    this.x.model.firing = new ScilabDouble([this.ff]);
    var exprs = new ScilabString([this.dt],[sci2exp(this.ff)])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function EVTDLY_f() {

    EVTDLY_f.prototype.internal = function EVTDLY_f() {
        this.dt = 0.1;
        this.ff = this.dt;

        var model = scicos_model();
        model.sim = new ScilabString(["evtdly"]);
        model.evtin = new ScilabDouble([1]);
        model.evtout = new ScilabDouble([1]);
        model.rpar = new ScilabDouble([this.dt]);
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble([this.ff]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([this.dt], [sci2exp(this.ff)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"EVTDLY_f\",sz(1),sz(2));"]);
        var block = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        block.graphics.style = new ScilabString(["EVTDLY_f"]);
        return block;
    }
}function EVTGEN_f() {

    EVTGEN_f.prototype.define = function EVTGEN_f() {
        this.tt = 0;

        var model = scicos_model();
        model.sim = new ScilabString(["trash"]);
        model.evtout = new ScilabDouble([1]);
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble([this.tt]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([this.tt]);
    var n = this.tt.toString();
    this.displayParameter=[n];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"EVTGEN_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    EVTGEN_f.prototype.details = function EVTGEN_f() {
        return this.x;
    }
    EVTGEN_f.prototype.get = function EVTGEN_f() {
        var options={
            tt:["Event Time",this.tt],
        }
        return options
    }
EVTGEN_f.prototype.set = function EVTGEN_f() {
    this.tt = parseFloat((arguments[0]["tt"]))
    this.x.model.firing = new ScilabDouble([this.tt])
    var exprs = new ScilabString([this.tt])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function EVTVARDLY() {

    EVTVARDLY.prototype.define = function EVTVARDLY() {

        var model = scicos_model();
        model.sim = list(new ScilabString(["evtvardly"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([1]);
        model.evtin = new ScilabDouble([1]);
        model.evtout = new ScilabDouble([1]);
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble([-1]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([parseFloat(getData(model.firing), 10)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"EVTVARDLY\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    EVTVARDLY.prototype.details = function EVTVARDLY() {
        return this.x;
    }
    EVTVARDLY.prototype.get = function EVTVARDLY() {
    if(this.fir == undefined || this.fir == null)
        this.fir = -1
        var options={
            fir:["Initial event firing time (<0 if absent)",this.fir],
        }
        return options
    }
EVTVARDLY.prototype.set = function EVTVARDLY() {
    this.fir = parseFloat((arguments[0]["fir"]))
    this.x.model.firing = new ScilabDouble([this.fir]);
    var exprs = new ScilabString([this.fir])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function EXPBLK_m() {

    EXPBLK_m.prototype.define = function EXPBLK_m() {
        this.in1 = 1;
        this.a = math.E;

        var model = scicos_model();
        model.sim = list(new ScilabString(["expblk_m"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble([1]);
        model.outtyp = new ScilabDouble([1]);
        model.rpar = new ScilabDouble([this.a]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString(["%e"]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"EXPBLK_m\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    EXPBLK_m.prototype.details = function EXPBLK_m() {
        return this.x;
    }
EXPBLK_m.prototype.get = function EXPBLK_m() {
    if(this.a == undefined || this.a == null){
        this.a = Math.E
    }
        var options={
            a:["a (>0)",this.a],
        }
        return options
    }
EXPBLK_m.prototype.set = function EXPBLK_m() {
    this.a = parseFloat((arguments[0]["a"]))
    this.x.model.rpar = new ScilabDouble([this.a]);
    var exprs = new ScilabString([this.a])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function EXTRACT() {

    EXTRACT.prototype.define = function EXTRACT() {
        this.function_name = "extract";
        this.funtyp = 4;

        var model = scicos_model();
        model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([this.funtyp]));
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.out2 = new ScilabDouble([1]);
        model.outtyp = new ScilabDouble([1]);
        model.evtin = new ScilabDouble();
        model.evtout = new ScilabDouble();
        model.state = new ScilabDouble();
        model.dstate = new ScilabDouble();
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble([1, 1, 1, 1]);
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, false]);

        var label = new ScilabString([sci2exp(1)], [sci2exp([1])], [sci2exp([1])]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"EXTRACT\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, label, gr_i);
        return new BasicBlock(this.x);
    }
    EXTRACT.prototype.details = function EXTRACT() {
        return this.x;
    }
    EXTRACT.prototype.get = function EXTRACT() {
        if(this.typ == undefined || this.typ == null)
            this.typ = "1"
        if(this.a == undefined || this.a == null){
            this.a = "1"
        }
        if(this.b == undefined || this.b == null){
            this.b = "1"
        }
        var options={
            typ:["Datatype (1=real double  2=Complex)",this.typ],
            a:["Lines to extract",this.a.toString().replace(/,/g," ")],
            b:["Columns to extract",this.b.toString().replace(/,/g," ")],
        }
        return options
    }
    EXTRACT.prototype.set = function EXTRACT() {
        this.typ = parseFloat((arguments[0]["typ"]))
        this.a = inverse(arguments[0]["a"])
        this.b = inverse(arguments[0]["b"])
        if(this.typ == 1){
            this.function_name = "extract"
            this.x.model.intyp = new ScilabDouble([1])
            this.x.model.outtyp = new ScilabDouble([1])
        }
        else if(this.typ == 2){
            this.function_name = "extractz"
            this.x.model.intyp = new ScilabDouble([2])
            this.x.model.outtyp = new ScilabDouble([2])
        }
        this.ma = size(this.a,1)
        this.mb = size(this.b,1)
        this.x.model.ipar = new ScilabDouble(...this.a,...this.b,[this.ma],[this.mb])
        this.in = [...this.x.model.in,...this.x.model.in2]
        this.out = [[this.ma],[this.mb]]
        var io = set_io(this.x.model,this.x.graphics,this.in,this.out,[],[])
        model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([4]));
        this.x.graphics.exprs = label
        var exprs = new ScilabString([this.typ],[this.a.toString().replace(/,/g, " ")],[this.b.toString().replace(/,/g, " ")])
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)
    }
}




function JKFLIPFLOP() {

    JKFLIPFLOP.prototype.define = function JKFLIPFLOP() {
        var scs_m = scicos_diagram({
            version: new ScilabString(["scicos4.2"]),
            props: scicos_params({
                wpar: new ScilabDouble([600, 450, 0, 0, 600, 450]),
                Title: new ScilabString(["JKFLIPFLOP"]),
                tol: new ScilabDouble([0.0001], [0.000001], [Math.pow(10, -10)], [100001], [0], [0], [0]),
                tf: new ScilabDouble([60]),
                context: new ScilabString([" "]),
                void1: new ScilabDouble(),
                options: tlist(["scsopt", "3D", "Background", "Link", "ID", "Cmap"], new ScilabString(["scsopt", "3D", "Background", "Link", "ID", "Cmap"]), list(new ScilabBoolean([true]), new ScilabDouble([33])), new ScilabDouble([8, 1]), new ScilabDouble([1, 5]), list(new ScilabDouble([5, 1]), new ScilabDouble([4, 1])), new ScilabDouble([0.8, 0.8, 0.8])),
                void2: new ScilabDouble(),
                void3: new ScilabDouble(),
                doc: list()
            })
        });
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["DOLLAR_m"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([299.96961, 261.584]),
                sz: new ScilabDouble([40, 40]),
                flip: new ScilabBoolean([false]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["int8(0)"], ["1"]),
                pin: new ScilabDouble([7]),
                pout: new ScilabDouble([5]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;DOLLAR_m&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabString(["E"]),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""]),
                out_label: new ScilabString([""]),
                style: new ScilabString(["DOLLAR_m"])
            }),
            model: scicos_model({
                sim: list(new ScilabString(["dollar4_m"]), new ScilabDouble([4])),
                in: new ScilabDouble([1]),
                in2: new ScilabDouble([1]),
                intyp: new ScilabDouble([5]),
                out: new ScilabDouble([1]),
                out2: new ScilabDouble([1]),
                outtyp: new ScilabDouble([5]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(int8([0])),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble(),
                opar: list(),
                blocktype: new ScilabString(["d"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));

        var scs_m_1 = scicos_diagram({
            version: new ScilabString(["scicos4.2"]),
            props: scicos_params({
                wpar: new ScilabDouble([600, 450, 0, 0, 600, 450]),
                Title: new ScilabString(["EDGE_TRIGGER"]),
                tol: new ScilabDouble([0.0001], [0.000001], [Math.pow(10, -10)], [100001], [0], [0], [0]),
                tf: new ScilabDouble([30]),
                context: new ScilabString([" "]),
                void1: new ScilabDouble(),
                options: tlist(["scsopt", "3D", "Background", "Link", "ID", "Cmap"], new ScilabString(["scsopt", "3D", "Background", "Link", "ID", "Cmap"]), list(new ScilabBoolean([true]), new ScilabDouble([33])), new ScilabDouble([8, 1]), new ScilabDouble([1, 5]), list(new ScilabDouble([5, 1]), new ScilabDouble([4, 1])), new ScilabDouble([0.8, 0.8, 0.8])),
                void2: new ScilabDouble(),
                void3: new ScilabDouble(),
                doc: list()
            })
        });
        scs_m_1.objs.push(scicos_block({
            gui: new ScilabString(["EDGETRIGGER"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([288.58631, 257.1131]),
                sz: new ScilabDouble([60, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["-1"]),
                pin: new ScilabDouble([5]),
                pout: new ScilabDouble([3]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;EDGETRIGGER&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabString(["E"]),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""]),
                out_label: new ScilabString([""]),
                style: new ScilabString(["EDGETRIGGER"])
            }),
            model: scicos_model({
                sim: list(new ScilabString(["edgetrig"]), new ScilabDouble([4])),
                in: new ScilabDouble([1]),
                in2: new ScilabDouble([1]),
                intyp: new ScilabDouble([1]),
                out: new ScilabDouble([1]),
                out2: new ScilabDouble([1]),
                outtyp: new ScilabDouble([1]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble([0]),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble([-1]),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([true, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([1]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m_1.objs.push(scicos_block({
            gui: new ScilabString(["IFTHEL_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([388.28869, 247.1131]),
                sz: new ScilabDouble([60, 60]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["0"], ["0"]),
                pin: new ScilabDouble([3]),
                pout: new ScilabDouble(),
                pein: new ScilabDouble(),
                peout: new ScilabDouble([7], [0]),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;IFTHEL_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabDouble(),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""]),
                style: new ScilabString(["IFTHEL_f"])
            }),
            model: scicos_model({
                sim: list(new ScilabString(["ifthel"]), new ScilabDouble([-1])),
                in: new ScilabDouble([1]),
                in2: new ScilabDouble([1]),
                intyp: new ScilabDouble([1]),
                out: new ScilabDouble(),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble(),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble([1], [1]),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble(),
                opar: list(),
                blocktype: new ScilabString(["l"]),
                firing: new ScilabDouble([-1], [-1]),
                dep_ut: new ScilabBoolean([true, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m_1.objs.push(scicos_block({
            gui: new ScilabString(["IN_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([240.01488, 267.1131]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1"]),
                pin: new ScilabDouble(),
                pout: new ScilabDouble([5]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;IN_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabDouble(),
                out_implicit: new ScilabString(["E"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_label: new ScilabString([""]),
                style: new ScilabString(["IN_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["input"]),
                in: new ScilabDouble(),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble(),
                out: new ScilabDouble([-1]),
                out2: new ScilabDouble([1]),
                outtyp: new ScilabDouble([1]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble([1]),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m_1.objs.push(scicos_block({
            gui: new ScilabString(["CLKOUTV_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([398.28869, 181.39881]),
                sz: new ScilabDouble([20, 30]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1"]),
                pin: new ScilabDouble(),
                pout: new ScilabDouble(),
                pein: new ScilabDouble([7]),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;CLKOUTV_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabDouble(),
                out_implicit: new ScilabDouble(),
                style: new ScilabString(["CLKOUTV_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["output"]),
                in1: new ScilabDouble(),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble(),
                out: new ScilabDouble(),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble(),
                evtin: new ScilabDouble([1]),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble([1]),
                opar: list(),
                blocktype: new ScilabString(["d"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["EDGE_TRIGGER"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([292.52452, 323.54888]),
                sz: new ScilabDouble([60, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabDouble(),
                pin: new ScilabDouble([14]),
                pout: new ScilabDouble(),
                pein: new ScilabDouble(),
                peout: new ScilabDouble([8]),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;EDGE_TRIGGER&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabDouble(),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""]),
                style: new ScilabString(["EDGE_TRIGGER"])
            }),
            model: scicos_model({
                sim: new ScilabString(["csuper"]),
                in: new ScilabDouble([-1]),
                in2: new ScilabDouble([1]),
                intyp: new ScilabDouble([1]),
                out: new ScilabDouble(),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble(),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble([1]),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: scs_m_1,
                ipar: new ScilabDouble(),
                opar: list(),
                blocktype: new ScilabString(["h"]),
                firing: new ScilabDouble([-1]),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["LOGIC"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([302.79613, 202.52782]),
                sz: new ScilabDouble([40, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["[0;1;1;1;0;0;1;0]"], ["0"]),
                pin: new ScilabDouble([5], [16], [18]),
                pout: new ScilabDouble([4]),
                pein: new ScilabDouble([8]),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;LOGIC&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"], ["E"], ["E"]),
                out_implicit: new ScilabString(["E"]),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"], ["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"], ["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""], [""], [""]),
                out_label: new ScilabString([""]),
                style: new ScilabString(["LOGIC"])
            }),
            model: scicos_model({
                sim: list(new ScilabString(["logic"]), new ScilabDouble([4])),
                in: new ScilabDouble([1], [1], [1]),
                in2: new ScilabDouble([1], [1], [1]),
                intyp: new ScilabDouble([5], [5], [5]),
                out: new ScilabDouble([1]),
                out2: new ScilabDouble([1]),
                outtyp: new ScilabDouble([5]),
                evtin: new ScilabDouble([1]),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble(),
                opar: list(int8([0], [1], [1], [1], [0], [0], [1], [0])),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabBoolean(),
                dep_ut: new ScilabBoolean([true, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["SPLIT_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([368.82793, 243.45067]),
                sz: new ScilabDouble([0.3333333, 0.3333333]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabDouble(),
                pin: new ScilabDouble([11]),
                pout: new ScilabDouble([7], [20], [0]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;SPLIT_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabString(["E"], ["E"], ["E"]),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"], ["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"], ["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""]),
                out_label: new ScilabString([""], [""], [""]),
                style: new ScilabString(["SPLIT_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["lsplit"]),
                in: new ScilabDouble([-1]),
                in2: new ScilabDouble([1]),
                intyp: new ScilabDouble([1]),
                out: new ScilabDouble([-1], [-1], [-1]),
                out2: new ScilabDouble([1], [1], [1]),
                outtyp: new ScilabDouble([1], [1], [1]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble(),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([true, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["LOGICAL_OP"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([377.63217, 159.25363]),
                sz: new ScilabDouble([60, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1"], ["5"], ["5"], ["0"]),
                pin: new ScilabDouble([12]),
                pout: new ScilabDouble([22]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;LOGICAL_OP&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabString(["E"]),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""]),
                out_label: new ScilabString([""]),
                style: new ScilabString(["LOGICAL_OP"])
            }),
            model: scicos_model({
                sim: list(new ScilabString(["logicalop_i8"]), new ScilabDouble([4])),
                in: new ScilabDouble([-1]),
                in2: new ScilabDouble([-2]),
                intyp: new ScilabDouble([5]),
                out: new ScilabDouble([-1]),
                out2: new ScilabDouble([-2]),
                outtyp: new ScilabDouble([5]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble([5], [0]),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([true, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["SPLIT_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([368.82793, 223.06473]),
                sz: new ScilabDouble([0.3333333, 0.3333333]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabDouble(),
                pin: new ScilabDouble([4]),
                pout: new ScilabDouble([11], [12], [0]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;SPLIT_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabString(["E"], ["E"], ["E"]),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"], ["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"], ["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""]),
                out_label: new ScilabString([""], [""], [""]),
                style: new ScilabString(["SPLIT_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["lsplit"]),
                in: new ScilabDouble([-1]),
                in2: new ScilabDouble([1]),
                intyp: new ScilabDouble([1]),
                out: new ScilabDouble([-1], [-1], [-1]),
                out2: new ScilabDouble([1], [1], [1]),
                outtyp: new ScilabDouble([1], [1], [1]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble(),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([true, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["IN_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([243.95309, 333.54888]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["2"]),
                pin: new ScilabDouble(),
                pout: new ScilabDouble([14]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;IN_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabDouble(),
                out_implicit: new ScilabString(["E"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_label: new ScilabString([""]),
                style: new ScilabString(["IN_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["input"]),
                in: new ScilabDouble(),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble(),
                out: new ScilabDouble([-1]),
                out2: new ScilabDouble([1]),
                outtyp: new ScilabDouble([-1]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble([2]),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["IN_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([254.2247, 212.52782]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1"]),
                pin: new ScilabDouble(),
                pout: new ScilabDouble([16]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;IN_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabDouble(),
                out_implicit: new ScilabString(["E"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_label: new ScilabString([""]),
                style: new ScilabString(["IN_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["input"]),
                in: new ScilabDouble(),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble(),
                out: new ScilabDouble([-1]),
                out2: new ScilabDouble([1]),
                outtyp: new ScilabDouble([-1]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble([1]),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["IN_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([254.2247, 202.52782]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["3"]),
                pin: new ScilabDouble(),
                pout: new ScilabDouble([18]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;IN_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabDouble(),
                out_implicit: new ScilabString(["E"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_label: new ScilabString([""]),
                style: new ScilabString(["IN_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["input"]),
                in: new ScilabDouble(),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble(),
                out: new ScilabDouble([-1]),
                out2: new ScilabDouble([1]),
                outtyp: new ScilabDouble([-1]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble([3]),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["OUT_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([388.82793, 233.45067]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1"]),
                pin: new ScilabDouble([20]),
                pout: new ScilabDouble(),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;OUT_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabDouble(),
                in_style: new ScilabString(["ExplicitInputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""]),
                style: new ScilabString(["OUT_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["output"]),
                in: new ScilabDouble([-1]),
                in2: new ScilabDouble([1]),
                intyp: new ScilabDouble([-1]),
                out: new ScilabDouble(),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble(),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble([1]),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["OUT_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([466.2036, 169.25363]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["2"]),
                pin: new ScilabDouble([22]),
                pout: new ScilabDouble(),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;OUT_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabDouble(),
                in_style: new ScilabString(["ExplicitInputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""]),
                style: new ScilabString(["OUT_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["output"]),
                in: new ScilabDouble([-1]),
                in2: new ScilabDouble([1]),
                intyp: new ScilabDouble([-1]),
                out: new ScilabDouble(),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble(),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble([2]),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m_1.objs.push(scicos_link({
            xx: new ScilabDouble([357.15774], [362.99107], [379.71726]),
            yy: new ScilabDouble([277.1131], [277.1131], [277.1131]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([1, 1, 0]),
            to: new ScilabDouble([2, 1, 1])
        }));
        scs_m_1.objs.push(scicos_link({
            xx: new ScilabDouble([260.01488], [280.01488]),
            yy: new ScilabDouble([277.1131], [277.1131]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([4, 1, 0]),
            to: new ScilabDouble([1, 1, 1])
        }));
        scs_m_1.objs.push(scicos_link({
            xx: new ScilabDouble([408.28869], [408.28869]),
            yy: new ScilabDouble([241.39881], [211.39881]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([2, 1, 0]),
            to: new ScilabDouble([6, 1, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([351.36756], [368.82793], [368.82793]),
            yy: new ScilabDouble([222.52782], [222.52782], [223.06473]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([3, 1, 0]),
            to: new ScilabDouble([10, 1, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([291.39818], [274.18235], [274.18235], [294.2247]),
            yy: new ScilabDouble([281.584], [281.584], [232.52782], [232.52782]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([1, 1, 0]),
            to: new ScilabDouble([3, 1, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([368.82793], [368.82793], [345.68389]),
            yy: new ScilabDouble([243.45067], [281.584], [281.584]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([6, 1, 0]),
            to: new ScilabDouble([1, 1, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([322.52452], [374.69743], [374.69743], [322.79613]),
            yy: new ScilabDouble([317.8346], [317.8346], [248.24211], [248.24211]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([2, 1, 0]),
            to: new ScilabDouble([3, 1, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([368.82793], [368.82793]),
            yy: new ScilabDouble([223.06473], [243.45067]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([10, 1, 0]),
            to: new ScilabDouble([6, 1, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([368.82793], [368.82793], [369.06074]),
            yy: new ScilabDouble([223.06473], [177.7867], [179.25363]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([10, 2, 0]),
            to: new ScilabDouble([9, 1, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([263.95309], [283.95309]),
            yy: new ScilabDouble([343.54888], [343.54888]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([13, 1, 0]),
            to: new ScilabDouble([2, 1, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([274.2247], [294.2247]),
            yy: new ScilabDouble([222.52782], [222.52782]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([15, 1, 0]),
            to: new ScilabDouble([3, 2, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([274.2247], [294.2247]),
            yy: new ScilabDouble([212.52782], [212.52782]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([17, 1, 0]),
            to: new ScilabDouble([3, 3, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([368.82793], [388.82793]),
            yy: new ScilabDouble([243.45067], [243.45067]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([6, 2, 0]),
            to: new ScilabDouble([19, 1, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([446.2036], [466.2036]),
            yy: new ScilabDouble([179.25363], [179.25363]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([9, 1, 0]),
            to: new ScilabDouble([21, 1, 1])
        }));

        var model = scicos_model();
        model.sim = new ScilabString(["csuper"]);
        model.in = new ScilabDouble([1], [1], [1]);
        model.in2 = new ScilabDouble([1], [1], [1]);
        model.out = new ScilabDouble([1], [1]);
        model.out2 = new ScilabDouble([1], [1]);
        model.intyp = new ScilabDouble([5, 1, 5]);
        model.outtyp = new ScilabDouble([5, 5]);
        model.blocktype = new ScilabString(["h"]);
        model.firing = new ScilabBoolean([false]);
        model.dep_ut = new ScilabBoolean([true, false]);
        model.rpar = scs_m;

        var gr_i = new ScilabDouble();
        this.x = new standard_define(new ScilabDouble([2, 3]), model, new ScilabDouble(), gr_i);
        return new BasicBlock(this.x);
    }
    JKFLIPFLOP.prototype.details = function JKFLIPFLOP() {
        return this.x;
    }
}



function EXTRACTBITS() {

    EXTRACTBITS.prototype.define = function EXTRACTBITS() {
        this.numb = [];

        var model = scicos_model();
        model.sim = list(new ScilabString(["extract_bit_32_UH0"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([1]);
        model.in2 = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.out2 = new ScilabDouble([1]);
        model.intyp = new ScilabDouble([3]);
        model.outtyp = new ScilabDouble([3]);
        model.ipar = new ScilabDouble([0, ...this.numb]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([sci2exp(3)], [sci2exp(1)], [sci2exp(0)], [sci2exp(0)]);
    this.displayParameter = ["1"];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"EXTRACTBITS\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([4, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    EXTRACTBITS.prototype.details = function EXTRACTBITS() {
        return this.x;
    }
}
function EXTRACTOR() {

    EXTRACTOR.prototype.define = function EXTRACTOR() {
        this.ind = 1;

        var model = scicos_model();
        model.sim = list(new ScilabString(["extractor"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([-1]);
        model.out = new ScilabDouble([1]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);
        model.ipar = new ScilabDouble([this.ind]);

        var exprs = new ScilabString([sci2exp(this.ind)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"EXTRACTOR\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    EXTRACTOR.prototype.details = function EXTRACTOR() {
        return this.x;
    }
    EXTRACTOR.prototype.get = function EXTRACTOR() {
        var options={
            ind:["indices to extract",this.ind.toString().replace(/,/g," ")],
        }
        return options
    }
EXTRACTOR.prototype.set = function EXTRACTOR() {
    this.ind = inverse(arguments[0]["ind"])
    for (var i =this.ind.length - 1; i >= 0; i--) {
        this.ind[i] = Math.floor(this.ind[i])
    }
    this.x.model.ipar = new ScilabDouble(...this.ind);
    var exprs = new ScilabString([sci2exp(this.ind)])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function Extract_Activation() {
    Extract_Activation.prototype.get = function Extract_Activation() {
        alert("parameters can not be changed")
    }

    Extract_Activation.prototype.define = function Extract_Activation() {
        var scs_m_1 = scicos_diagram();
        scs_m_1.objs.push(new IFTHEL_f().internal());
        scs_m_1.objs.push(new CLKSOMV_f().internal());
        scs_m_1.objs.push(new IN_f().internal());
        scs_m_1.objs.push(new CLKOUTV_f().internal());
        scs_m_1.objs.push(scicos_link({}));
        scs_m_1.objs.push(scicos_link({}));
        scs_m_1.objs.push(scicos_link({}));
        scs_m_1.objs.push(scicos_link({}));

        var blk = scs_m_1.objs[0];
        var graphics = blk.graphics;

        var model = blk.model;
        graphics.orig = new ScilabDouble([80, 0]);
        graphics.sz = new ScilabDouble([60, 40]);
        graphics.flip = new ScilabBoolean([true]);
        graphics.exprs = new ScilabString(["0"], ["0"]);
        model.evtin = new ScilabDouble();
        model.nzcross = new ScilabDouble([0]);
        model.nmode = new ScilabDouble([0]);
        graphics.pin = new ScilabDouble([7]);
        graphics.peout = new ScilabDouble([5], [6]);
        model.uid = new ScilabString([count]);
        blk.doc = list(new ScilabString([count++]));
        blk.graphics = graphics;
        blk.model = model;
        scs_m_1.objs[0] = blk;

        blk = scs_m_1.objs[1];
        graphics = blk.graphics;
        model = blk.model;
        model.outtyp = new ScilabDouble();
        model.evtin = new ScilabDouble([-1], [-1], [-1]);
        model.evtout = new ScilabDouble([-1]);
        graphics.orig = new ScilabDouble([80, -80]);
        graphics.sz = new ScilabDouble([80, 40]);
        graphics.flip = new ScilabBoolean([true]);
        graphics.pein = new ScilabDouble([5], [6], [0]);
        graphics.peout = new ScilabDouble([8]);
        graphics.style = new ScilabString(["CLKSOMV_f"]);
        model.uid = new ScilabString([count]);
        blk.doc = list(new ScilabString([count++]));
        blk.graphics = graphics;
        blk.model = model;
        scs_m_1.objs[1] = blk;

        blk = scs_m_1.objs[2];
        graphics = blk.graphics;
        model = blk.model;
        graphics.orig = new ScilabDouble([0, 10]);
        graphics.sz = new ScilabDouble([20, 20]);
        graphics.flip = new ScilabBoolean([true]);
        graphics.exprs = new ScilabString(["1"]);
        model.ipar = new ScilabDouble([1]);
        graphics.pout = new ScilabDouble([7]);
        model.uid = new ScilabString([count]);
        blk.doc = list(new ScilabString([count++]));
        blk.graphics = graphics;
        blk.model = model;
        scs_m_1.objs[2] = blk;

        blk = scs_m_1.objs[3];
        graphics = blk.graphics;
        model = blk.model;
        model.outtyp = new ScilabDouble();
        graphics.style = new ScilabString(["CLKOUTV_f"]);
        graphics.orig = new ScilabDouble([110, -140]);
        graphics.sz = new ScilabDouble([20, 20]);
        graphics.flip = new ScilabBoolean([true]);
        graphics.exprs = new ScilabString(["1"]);
        graphics.gr_i = list(new ScilabString(["xstringb(orig(1),orig(2),\"CLKOUTV_f\",sz(1),sz(2));"]), new ScilabDouble([8]));
        model.ipar = new ScilabDouble([1]);
        graphics.pein = new ScilabDouble([8]);
        model.uid = new ScilabString([count]);
        blk.doc = list(new ScilabString([count++]));
        blk.graphics = graphics;
        blk.model = model;
        scs_m_1.objs[3] = blk;

        var lnk = scs_m_1.objs[4];
        lnk.xx = new ScilabDouble([140], [140]);
        lnk.yy = new ScilabDouble([-44], [-76]);
        lnk.ct = new ScilabDouble([5, -1]);
        lnk.from = new ScilabDouble([1, 1, 0]);
        lnk.to = new ScilabDouble([2, 1, 1]);
        scs_m_1.objs[4] = lnk;

        lnk = scs_m_1.objs[5];
        lnk.xx = new ScilabDouble([160], [160]);
        lnk.yy = new ScilabDouble([-44], [-76]);
        lnk.ct = new ScilabDouble([5, -1]);
        lnk.from = new ScilabDouble([1, 2, 0]);
        lnk.to = new ScilabDouble([2, 2, 1]);
        scs_m_1.objs[5] = lnk;

        lnk = scs_m_1.objs[6];
        lnk.xx = new ScilabDouble([64], [116]);
        lnk.yy = new ScilabDouble([-40], [-20]);
        lnk.from = new ScilabDouble([3, 1, 0]);
        lnk.to = new ScilabDouble([1, 1, 1]);
        scs_m_1.objs[6] = lnk;

        lnk = scs_m_1.objs[7];
        lnk.xx = new ScilabDouble([160], [160]);
        lnk.yy = new ScilabDouble([-124], [-176]);
        lnk.ct = new ScilabDouble([5, -1]);
        lnk.from = new ScilabDouble([2, 1, 0]);
        lnk.to = new ScilabDouble([4, 1, 1]);
        scs_m_1.objs[7] = lnk;

        model = scicos_model();
        model.sim = new ScilabString(["csuper"]);
        model.in = new ScilabDouble([1]);
        model.evtout = new ScilabDouble([1]);
        model.rpar = scs_m_1;

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"Extract_Activation\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, new ScilabDouble(), gr_i);
        return new BasicBlock(this.x);
    }

    Extract_Activation.prototype.details = function Extract_Activation() {
        return this.x;
    }
}
function EXTTRI() {

    EXTTRI.prototype.define = function EXTTRI() {
        this.function_name = "extrilz";
        this.funtyp = 4;

        var model = scicos_model();
        model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([this.funtyp]));
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble([1]);
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble([-2]);
        model.outtyp = new ScilabDouble([1]);
        model.evtin = new ScilabDouble();
        model.evtout = new ScilabDouble();
        model.state = new ScilabDouble();
        model.dstate = new ScilabDouble();
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble();
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, false]);

        var label = new ScilabString([sci2exp(1)], [sci2exp(1)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"EXTTRI\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, label, gr_i);
        return new BasicBlock(this.x);
    }
    EXTTRI.prototype.details = function EXTTRI() {
        return this.x;
    }
    EXTTRI.prototype.get = function EXTTRI() {
    if(this.typ == undefined || this.typ == null){
        this.typ = "1"
    }
    if(this.decomptyp == undefined || this.decomptyp == null){
        this.decomptyp = "1"
    }
        var options={
            typ:["Datatype(1=real double  2=Complex)",this.typ],
            decomptyp:["extraction type (1=lower  2=upper  3=diagonal)",this.decomptyp],
        }
        return options
    }
EXTTRI.prototype.set = function EXTTRI() {
    this.typ = parseFloat((arguments[0]["typ"]))
    this.decomptyp = parseFloat((arguments[0]["decomptyp"]))
    if(this.typ == 1){
        if(this.decomptyp == 1){
            this.function_name = "exttril"
        }
        else if(this.decomptyp == 2){
            this.function_name = "exttriu"

        }
        else if(this.decomptyp == 3){
            this.function_name = "extdiag"
        }
    }
    else if(this.typ == 2){
        if(this.decomptyp == 1){
            this.function_name = "exttrilz"
        }
        else if(this.decomptyp == 2){
            this.function_name = "exttriuz"

        }
        else if(this.decomptyp == 3){
            this.function_name = "extdiagz"
        }
    }
    model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([4]));
    this.x.graphics.exprs = label
    var exprs = new ScilabString([this.typ],[this.decomptyp])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function Flowmeter() {

    Flowmeter.prototype.define = function Flowmeter() {
        this.ModelName = "Flowmeter";
        this.PrametersValue = 1;
        this.ParametersName = "Qini";

        var model = scicos_model();

        this.Typein = [];
        this.Typeout = [];

        this.MI = [];
        this.MO = [];
        this.P = [[50,105,-1,90],[0,10,2,0],[101,10,-2,0]];
        this.PortName = [["Mesure"],["C1"],["C2"]];

        for (var i = 0; i < size(this.P, "r"); i++) {
            if (this.P[i][2] == 1) {
                this.Typein.push(["E"]);
                this.MI.push(this.PortName[i]);
            }

            if (this.P[i][2] == 2) {
                this.Typein.push(["I"]);
                this.MI.push(this.PortName[i]);
            }
            if (this.P[i][2] == -1) {
                this.Typeout.push(["E"]);
                this.MO.push(this.PortName[i]);
            }
            if (this.P[i][2] == -2) {
                this.Typeout.push(["I"]);
                this.MO.push(this.PortName[i]);
            }
        }

        var mo = new modelica_function();
        model.sim = new ScilabString([this.ModelName]);
        mo.inputs = new ScilabString(...this.MI);
        mo.outputs = new ScilabString(...this.MO);
        model.rpar = new ScilabDouble([this.PrametersValue]);
        mo.parameters = list(new ScilabString([this.ParametersName]), new ScilabDouble([this.PrametersValue]), new ScilabDouble(zeros([this.ParametersName])));
        var exprs = new ScilabString(["1"]);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"Flowmeter\",sz(1),sz(2));"]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, true]);
        mo.model = new ScilabString([this.ModelName]);
        model.equations = mo;
        model.in = new ScilabDouble(...ones(size(this.MI, "*"), 1));
        model.out = new ScilabDouble(...ones(size(this.MO, "*"), 1));
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, list(new ScilabString([gr_i]), new ScilabDouble([0])));
        this.x.graphics.in_implicit = new ScilabDouble(this.Typein);
        this.x.graphics.out_implicit = new ScilabDouble(this.Typeout);
        return new BasicBlock(this.x);
    }

    Flowmeter.prototype.details = function Flowmeter() {
        return this.x;
    }
    Flowmeter.prototype.get = function Flowmeter() {
        if(this.Qini == undefined || this.Qini == null){
            this.Qini = "1"
        }
        var options={
            Qini:["Qini",this.Qini]
        }
        return options
    }
Flowmeter.prototype.set = function Flowmeter() {
    this.Qini = parseFloat((arguments[0]["Qini"]))
    this.x.model.equations.parameters = list(new ScilabString("Qini"), new ScilabDouble([this.Qini]), new ScilabDouble(zeros(this.Qini)));
    var exprs = new ScilabString([this.Qini])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function fortran_block() {

    fortran_block.prototype.define = function fortran_block() {
        var model = scicos_model();
        model.sim = list(new ScilabString([" "]), new ScilabDouble([1001]));
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.evtin = new ScilabDouble();
        model.evtout = new ScilabDouble();
        model.state = new ScilabDouble();
        model.dstate = new ScilabDouble();
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble([0]);
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, false]);

        this.funam = "forty";

        var label = list(new ScilabString([sci2exp(parseFloat(getData(model.in)))], [sci2exp(parseFloat(getData(model.out)))], [sci2exp(getData(model.rpar))], [this.funam]), list(new ScilabDouble()));

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"fortran_block\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([4, 2]), model, label, gr_i);
        return new BasicBlock(this.x);
    }
    fortran_block.prototype.details = function fortran_block() {
        return this.x;
    }
}
function freq_div() {

    freq_div.prototype.define = function freq_div() {
        var scs_m_1 = scicos_diagram();
        scs_m_1.objs.push(new Modulo_Count().internal());
        scs_m_1.objs.push(new CLKINV_f().internal());
        scs_m_1.objs.push(new CLKOUTV_f().internal());
        scs_m_1.objs.push(new IFTHEL_f().internal());
        scs_m_1.objs.push(new CLKSPLIT_f().internal());
        scs_m_1.objs.push(scicos_link({}));
        scs_m_1.objs.push(scicos_link({}));
        scs_m_1.objs.push(scicos_link({}));
        scs_m_1.objs.push(scicos_link({}));
        scs_m_1.objs.push(scicos_link({}));

        var blk = scs_m_1.objs[0];
        var graphics = blk.graphics;
        var model = blk.model;
        graphics.orig = new ScilabDouble([0, -100]);
        graphics.sz = new ScilabDouble([60, 40]);
        graphics.exprs = new ScilabString(["0"], ["3"]);
        model.dstate = new ScilabDouble([3]);
        model.ipar = new ScilabDouble([3]);
        graphics.pout = new ScilabDouble([7]);
        graphics.pein = new ScilabDouble([10]);
        graphics.out_implicit = new ScilabString(["E"]);
        graphics.out_style = new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]);
        graphics.out_label = new ScilabString([""]);
        model.uid = new ScilabString([count]);
        blk.doc = list(new ScilabString([count++]));
        blk.graphics = graphics;
        blk.model = model;
        scs_m_1.objs[0] = blk;

        blk = scs_m_1.objs[1];
        graphics = blk.graphics;
        model = blk.model;
        graphics.orig = new ScilabDouble([120, 0]);
        graphics.sz = new ScilabDouble([20, 20]);
        graphics.exprs = new ScilabString(["1"]);
        model.ipar = new ScilabDouble([1]);
        graphics.peout = new ScilabDouble([6]);
        model.uid = new ScilabString([count]);
        blk.doc = list(new ScilabString([count++]));
        blk.graphics = graphics;
        blk.model = model;
        scs_m_1.objs[1] = blk;

        blk = scs_m_1.objs[2];
        graphics = blk.graphics;
        model = blk.model;
        graphics.orig = new ScilabDouble([130, -160]);
        graphics.sz = new ScilabDouble([20, 20]);
        graphics.exprs = new ScilabString(["1"]);
        model.ipar = new ScilabDouble([1]);
        graphics.pein = new ScilabDouble([8]);
        model.uid = new ScilabString([count]);
        blk.doc = list(new ScilabString([count++]));
        blk.graphics = graphics;
        blk.model = model;
        scs_m_1.objs[2] = blk;

        blk = scs_m_1.objs[3];
        graphics = blk.graphics;
        model = blk.model;
        graphics.orig = new ScilabDouble([100, -100]);
        graphics.sz = new ScilabDouble([60, 40]);
        graphics.exprs = new ScilabString(["1"], ["0"]);
        model.ipar = new ScilabDouble([1]);
        graphics.pin = new ScilabDouble([7]);
        graphics.pein = new ScilabDouble([9]);
        graphics.peout = new ScilabDouble([0], [8]);
        model.uid = new ScilabString([count]);
        blk.doc = list(new ScilabString([count++]));
        blk.graphics = graphics;
        blk.model = model;
        scs_m_1.objs[3] = blk;

        blk = scs_m_1.objs[4];
        graphics = blk.graphics;
        model = blk.model;
        graphics.orig = new ScilabDouble([127, -33]);
        graphics.sz = new ScilabDouble([7, 7]);
        graphics.pein = new ScilabDouble([6]);
        graphics.peout = new ScilabDouble([9], [10]);
        model.uid = new ScilabString([count]);
        blk.doc = list(new ScilabString([count++]));
        blk.graphics = graphics;
        blk.model = model;
        scs_m_1.objs[4] = blk;

        var lnk = scs_m_1.objs[5];
        lnk.xx = new ScilabDouble([170], [170.5]);
        lnk.yy = new ScilabDouble([-44], [-75]);
        lnk.ct = new ScilabDouble([5, -1]);
        lnk.from = new ScilabDouble([2, 1, 0]);
        lnk.to = new ScilabDouble([5, 1, 1]);
        scs_m_1.objs[5] = lnk;

        lnk = scs_m_1.objs[6];
        lnk.xx = new ScilabDouble([104], [136]);
        lnk.yy = new ScilabDouble([-100], [-100]);
        lnk.from = new ScilabDouble([1, 1, 0]);
        lnk.to = new ScilabDouble([4, 1, 1]);
        scs_m_1.objs[6] = lnk;

        lnk = scs_m_1.objs[7];
        lnk.xx = new ScilabDouble([180], [180]);
        lnk.yy = new ScilabDouble([-124], [-176]);
        lnk.ct = new ScilabDouble([5, -1]);
        lnk.from = new ScilabDouble([4, 2, 0]);
        lnk.to = new ScilabDouble([3, 1, 1]);
        scs_m_1.objs[7] = lnk;

        lnk = scs_m_1.objs[8];
        lnk.xx = new ScilabDouble([170], [170.5]);
        lnk.yy = new ScilabDouble([-44], [-75]);
        lnk.ct = new ScilabDouble([5, -1]);
        lnk.from = new ScilabDouble([5, 1, 0]);
        lnk.to = new ScilabDouble([4, 1, 1]);
        scs_m_1.objs[8] = lnk;

        lnk = scs_m_1.objs[9];
        lnk.xx = new ScilabDouble([169], [170]);
        lnk.yy = new ScilabDouble([-90], [-76]);
        lnk.xx = new ScilabDouble([0, 30, 1]);
        lnk.yy = new ScilabDouble([0, -30, 1]);
        lnk.ct = new ScilabDouble([5, -1]);
        lnk.from = new ScilabDouble([5, 2, 0]);
        lnk.to = new ScilabDouble([1, 1, 1]);
        scs_m_1.objs[9] = lnk;

        model = scicos_model();
        model.sim = new ScilabString(["csuper"]);
        model.evtin = new ScilabDouble([1]);
        model.evtout = new ScilabDouble([1]);
        model.rpar = scs_m_1;

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),&quot;freq_div&quot;,sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, new ScilabDouble(), gr_i);
        return new BasicBlock(this.x);
    }
    freq_div.prototype.details = function freq_div() {
        return this.x;
    }
}
function FROM() {

    FROM.prototype.define = function FROM() {

        var model = scicos_model();
        model.sim = new ScilabString(["from"]);
        model.in = new ScilabDouble();
        model.in2 = new ScilabDouble();
        model.intyp = new ScilabDouble([1]);
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble([-2]);
        model.outtyp = new ScilabDouble([-1]);
        model.ipar = new ScilabDouble();
        model.opar = list(new ScilabString(["A"]));
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString(["A"]);
    this.displayParameter = ["A"];  
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"FROM\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 1]), model, exprs, gr_i);
        this.x.graphics.id = new ScilabString(["From"]);
        return new BasicBlock(this.x);
    }
    FROM.prototype.details = function FROM() {
        return this.x;
    }
    FROM.prototype.get = function FROM() {
    if(this.tag == undefined || this.tag == null){
        this.tag = "A"
    }
        var options={
            tag:["Tag",this.tag],
        }
        return options
    }
FROM.prototype.set = function FROM() {
    this.tag = arguments[0]["tag"]
    this.x.model.opar = list(new ScilabString([this.tag]))
    var exprs = new ScilabString([this.tag])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function FROMMO() {

    FROMMO.prototype.define = function FROMMO() {

        var model = scicos_model();
        model.sim = new ScilabString(["frommo"]);
        model.in = new ScilabDouble();
        model.in2 = new ScilabDouble();
        model.intyp = new ScilabDouble([1]);
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble([-2]);
        model.outtyp = new ScilabDouble([-1]);
        model.ipar = new ScilabDouble();
        model.opar = list(new ScilabString(["A"]));
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var mo = new modelica_function();
        mo.model = new ScilabString(["frommo"]);
        mo.outputs = new ScilabString(["n"]);

        var exprs = new ScilabString(["A"]);
    this.displayParameter = ["A"];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"FROMMO\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 1]), model, exprs, gr_i);
        this.x.graphics.out_implicit = new ScilabString(["I"]);
        return new BasicBlock(this.x);
    }
    FROMMO.prototype.details = function FROMMO() {
        return this.x;
    }
    FROMMO.prototype.get = function FROMMO() {
    if(this.tag == undefined || this.tag == null){
        this.tag = "A"
    }
        var options={
            tag:["Tag",this.tag],
        }
        return options
    }
FROMMO.prototype.set = function FROMMO() {
    this.tag = arguments[0]["tag"]
    this.x.model.opar = list(new ScilabString([this.tag]))
    var exprs = new ScilabString([this.tag])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function FROMWSB() {

    FROMWSB.prototype.define = function FROMWSB() {
        var scs_m_1 = scicos_diagram({
            version: new ScilabString(["scicos4.2"]),
            props: scicos_params({
                wpar: new ScilabDouble([600, 450, 0, 0, 450, 600]),
                Title: new ScilabString(["FROMWSB"]),
                tol: new ScilabDouble([0.0001], [0.000001], [Math.pow(10, -10)], [100001], [0], [0], [0]),
                tf: new ScilabDouble([100000]),
                context: new ScilabString([" "]),
                void1: new ScilabDouble(),
                options: tlist(["scsopt", "3D", "Background", "Link", "ID", "Cmap"], new ScilabString(["scsopt", "3D", "Background", "Link", "ID", "Cmap"]), list(new ScilabBoolean([true]), new ScilabDouble([33])), new ScilabDouble([8, 1]), new ScilabDouble([1, 5]), list(new ScilabDouble([5, 1]), new ScilabDouble([4, 1])), new ScilabDouble([0.8, 0.8, 0.8])),
                void2: new ScilabDouble(),
                void3: new ScilabDouble(),
                doc: list()
            })
        });
        scs_m_1.objs.push(scicos_block({
            gui: new ScilabString(["FROMWS_c"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([260.37067, 261.584]),
                sz: new ScilabDouble([70, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["V"], ["1"], ["1"], ["0"]),
                pin: new ScilabDouble(),
                pout: new ScilabDouble([4]),
                pein: new ScilabDouble([2]),
                peout: new ScilabDouble([2]),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;FROMWS_c&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabDouble(),
                out_implicit: new ScilabString(["E"]),
                out_style: new ScilabString(["ExplicitOutputPort"]),
                out_label: new ScilabString([""]),
                style: new ScilabString(["FROMWS_c"])
            }),
            model: scicos_model({
                sim: list(new ScilabString(["fromws_c"]), new ScilabDouble([4])),
                in: new ScilabDouble(),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble(),
                out: new ScilabDouble([-1]),
                out2: new ScilabDouble([-2]),
                outtyp: new ScilabDouble([-1]),
                evtin: new ScilabDouble([1]),
                evtout: new ScilabDouble([1]),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble([1], [-31], [1], [1], [0]),
                opar: list(),
                blocktype: new ScilabString(["d"]),
                firing: new ScilabDouble([0]),
                dep_ut: new ScilabBoolean([false, true]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m_1.objs.push(scicos_block({
            gui: new ScilabString(["OUT_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([358.9421, 271.584]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1"]),
                pin: new ScilabDouble([4]),
                pout: new ScilabDouble(),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;OUT_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabDouble(),
                in_style: new ScilabString(["ExplicitInputPort"]),
                in_label: new ScilabString([""]),
                style: new ScilabString(["OUT_f"])

            }),
            model: scicos_model({
                sim: new ScilabString(["output"]),
                in: new ScilabDouble([-1]),
                in2: new ScilabDouble([-2]),
                intyp: new ScilabDouble([-1]),
                out: new ScilabDouble(),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble(),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble([1]),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m_1.objs.push(scicos_link({
            xx: new ScilabDouble([295.37067], [295.37067], [233.23733], [233.23733], [295.37067], [295.37067]),
            yy: new ScilabDouble([255.86971], [223.45067], [223.45067], [337.85067], [337.85067], [307.29829]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([1, 1, 0]),
            to: new ScilabDouble([1, 1, 1])
        }));
        scs_m_1.objs.push(scicos_link({
            xx: new ScilabDouble([338.9421], [358.9421]),
            yy: new ScilabDouble([281.584], [281.584]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([1, 1, 0]),
            to: new ScilabDouble([3, 1, 1])
        }));

        var model = scicos_model({
            sim: new ScilabString(["csuper"]),
            in: new ScilabDouble(),
            in2: new ScilabDouble(),
            intyp: new ScilabDouble([1]),
            out: new ScilabDouble([-1]),
            out2: new ScilabDouble([-2]),
            outtyp: new ScilabDouble([1]),
            evtin: new ScilabDouble(),
            evtout: new ScilabDouble(),
            state: new ScilabDouble(),
            dstate: new ScilabDouble(),
            odstate: list(),
            rpar: scs_m_1,
            ipar: new ScilabDouble(),
            opar: list(),
            blocktype: new ScilabString(["h"]),
            firing: new ScilabDouble(),
            dep_ut: new ScilabBoolean([false, false]),
            label: new ScilabString([""]),
            nzcross: new ScilabDouble([0]),
            nmode: new ScilabDouble([0]),
            equations: list()
        });
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"FROMWSB\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([5, 2]), model, new ScilabDouble(), gr_i);
        return new BasicBlock(this.x);
    }
    FROMWSB.prototype.details = function FROMWSB() {
        return this.x;
    }
}

function GAINBLK() {

    GAINBLK.prototype.define = function GAINBLK() {
        this.gain = 1;
        this.in1 = -1;
        this.out = -1;
        this.in2 = -2;
        this.out2 = -2;

        var model = scicos_model();
        model.sim = list(new ScilabString(["gainblk"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([this.in1]);
        model.out = new ScilabDouble([this.out]);
        model.in2 = new ScilabDouble([this.in2]);
        model.out2 = new ScilabDouble([this.out2]);
        model.rpar = new ScilabDouble([this.gain]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([sci2exp(this.gain)]);
    var n=this.gain.toString();
    this.displayParameter=[n];

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"GAINBLK\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    GAINBLK.prototype.details = function GAINBLK() {
        return this.x;
    }
    GAINBLK.prototype.get = function GAINBLK() {
    if(this.over == undefined || this.over == null)
        this.over = 0
        var options={
            gain:["Gain",this.gain.toString().replace(/,/g," ")],
            over:["Do On Overflow(0=Nothing 1=Saturate 2=Error)",this.over],
        }
        return options
    }
GAINBLK.prototype.set = function GAINBLK() {
    this.gain = inverse(arguments[0]["gain"])
    this.over = parseFloat((arguments[0]["over"]))
    if(this.gain.length == 1 && this.gain[0].length == 1){
        this.x.model.intyp = new ScilabDouble([1])
        this.x.model.outtyp = new ScilabDouble([1])
        this.x.model.sim = list(new ScilabString(["gainblk"]), new ScilabDouble([4]));
        this.x.model.rpar = new ScilabDouble(...this.gain)
        this.x.model.opar = list()
    }
    //code for non-constant value of gain not implemented
    else{
        alert("only constant value of gain is supported")
    }
    this.out = size(this.gain,1)
    this.in = size(this.gain,2)
    if(this.out*this.in != 1){
        var io = set_io(this.x.model,this.x.graphics,[[-1],[-2]],[[-1],[-2]],[],[])
    }
    else{
        var io = set_io(this.x.model,this.x.graphics,[[this.in],[-1]],[[this.out],[-1]],[],[])
    }
    var exprs = new ScilabString([this.gain.toString().replace(/,/g, " ")],[this.over])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }

}

function GAINBLK_f() {

    GAINBLK_f.prototype.define = function GAINBLK_f() {
        this.gain = 1;
        this.in1 = 1;
        this.out = 1;

        var model = scicos_model();
        model.sim = new ScilabString(["gain"]);
        model.in = new ScilabDouble([this.in1]);
        model.out = new ScilabDouble([this.out]);
        model.rpar = new ScilabDouble([this.gain]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([sci2exp(this.gain)]);
    var n = sci2exp(this.gain).toString();
    this.displayParameter=[n];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"GAINBLK_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    GAINBLK_f.prototype.details = function GAINBLK_f() {
        return this.x;
    }
GAINBLK_f.prototype.get = function GAINBLK_f() {
        var options={
            gain:["Gain",this.gain.toString().replace(/,/g," ")],
        }
        return options
    }
GAINBLK_f.prototype.set = function GAINBLK_f() {
    this.gain = inverse(arguments[0]["gain"])
    this.x.model.rpar = new ScilabDouble(...this.gain)
    var exprs = new ScilabString([sci2exp(this.gain)])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function GAIN_f() {

    GAIN_f.prototype.define = function GAIN_f() {
        this.gain = 1;
        this.in1 = 1;
        this.out = 1;

        var model = scicos_model();
        model.sim = new ScilabString(["gain"]);
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.rpar = new ScilabDouble([this.gain]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([sci2exp(this.gain)], [sci2exp(this.in1)], [sci2exp(this.out)]);
    var n = sci2exp(this.gain).toString();//TEMPORARILY IAM CONSIDERING GAIN TO BE DISPLAYED
    this.displayParameter=[n];


        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"GAIN_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    GAIN_f.prototype.details = function GAIN_f() {
        return this.x;
    }
    GAIN_f.prototype.get = function GAIN_f() {
        var options={
            gain:["Gain",this.gain.toString().replace(/,/g," ")],
        }
        return options
    }
    GAIN_f.prototype.set = function GAIN_f() {
        this.gain = inverse(arguments[0]["gain"])
        var exprs = new ScilabString([sci2exp(this.gain)])
        this.x.model.rpar = new ScilabDouble(...this.gain)
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)
    }
}

function GENERAL_f() {

    GENERAL_f.prototype.define = function GENERAL_f() {
        var rpar = [[0],[0],[0],[0]];

        this.in1 = 1;
        this.out = 1;

        var model = scicos_model();
        model.sim = list(new ScilabString(["zcross"]), new ScilabDouble([1]));
        model.nzcross = new ScilabDouble([this.in1]);
        model.in = new ScilabDouble([this.in1]);
        model.evtout = new ScilabDouble(...ones(this.out, 1));
        model.rpar = new ScilabDouble([0], [0], [0], [0]);
        model.blocktype = new ScilabString(["z"]);
        model.firing = -new ScilabDouble(...ones(this.out, 1));
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([sci2exp(this.in1)], [sci2exp(this.out)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"GENERAL_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    GENERAL_f.prototype.details = function GENERAL_f() {
        return this.x;
    }
}
function generic_block3() {

    generic_block3.prototype.define = function generic_block3() {
        var model = scicos_model();
        this.function_name = "sinblk";
        this.funtyp = 4;
        model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([this.funtyp]));
        model.in = new ScilabDouble([1]);
        model.in2 = new ScilabDouble([1]);
        model.intyp = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.out2 = new ScilabDouble([1]);
        model.outtyp = new ScilabDouble([1]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var label = new ScilabString([this.function_name], [sci2exp(this.funtyp)], [sci2exp([parseFloat(getData(model.in)[0]), parseFloat(getData(model.in2)[0])])], [sci2exp(parseFloat(getData(model.intyp)[0]))], [sci2exp([parseFloat(getData(model.out)[0]), parseFloat(getData(model.out2)[0])])], [sci2exp(parseFloat(getData(model.outtyp)[0]))], [sci2exp(getData(model.evtin))], [sci2exp(getData(model.evtout))], [sci2exp(getData(model.state))], [sci2exp(getData(model.dstate))], [sci2exp(model.odstate)], [sci2exp(getData(model.rpar))], [sci2exp(getData(model.ipar))], [sci2exp(model.opar)], [sci2exp(parseFloat(getData(model.nmode)[0]))], [sci2exp(parseFloat(getData(model.nzcross)[0]))], [sci2exp(getData(model.firing))], ["y"], ["n"]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"generic_block3\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([4, 2]), model, label, gr_i);
        return new BasicBlock(this.x);
    }
    generic_block3.prototype.details = function generic_block3() {
        return this.x;
    }
}
function GENSIN_f() {

    GENSIN_f.prototype.define = function GENSIN_f() {
        this.rpar = [[1], [1], [0]];

        var model = scicos_model();
        model.sim = new ScilabString(["gensin"]);
        model.in = new ScilabDouble();
        model.out = new ScilabDouble([1]);
        model.out2 = new ScilabDouble([1]);
        model.outtyp = new ScilabDouble([1]);
        model.rpar = new ScilabDouble([1], [1], [0]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, true]);

        var exprs = new ScilabString(this.rpar[0], this.rpar[1], this.rpar[2]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"GENSIN_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    GENSIN_f.prototype.details = function GENSIN_f() {
        return this.x;
    }
    GENSIN_f.prototype.get = function GENSIN_f() {
    if(this.M == undefined || this.M ==null){
        this.M = "1"
    }
    if(this.F == undefined || this.F ==null){
        this.F = "1"
    }
    if(this.P == undefined || this.P ==null){
        this.P = "0"
    }

        var options={
            M:["Magnitude",this.M],
            F:["Frequency (rad/s)",this.F],
            P:["Phase(rad)",this.P]
        }
        return options
    }
GENSIN_f.prototype.set = function GENSIN_f() {
    this.M = parseFloat((arguments[0]["M"]))
    this.F = parseFloat((arguments[0]["F"]))
    this.P = parseFloat((arguments[0]["P"]))
    var io = check_io(this.x.model,this.x.graphics,[],[[1]],[],[])
    this.x.model.rpar = new ScilabDouble([this.M],[this.F],[this.P])
    this.x.model.out2 = new ScilabDouble([1]);
    this.x.model.outtyp = new ScilabDouble([1]);
    var exprs = new ScilabString([this.M],[this.F],[this.P])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function GENSQR_f () {

    GENSQR_f.prototype.define = function GENSQR_f() {
        this.Amplitude = 1;

        var model = scicos_model();
        model.sim = new ScilabString(["gensqr"]);
        model.out = new ScilabDouble([1]);
        model.out2 = new ScilabDouble([1]);
        model.outtyp = new ScilabDouble([1]);
        model.evtin = new ScilabDouble([1]);
        model.dstate = new ScilabDouble([this.Amplitude]);
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([this.Amplitude]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"GENSQR_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

GENSQR_f.prototype.get = function GENSQR_f() {

    var options={
        Amplitude:["Amplitude",this.Amplitude.toString().replace(/,/g, " ")],
    };
    return options;
    }

GENSQR_f.prototype.set = function GENSQR_f() {

    this.Amplitude = parseFloat(arguments[0]["Amplitude"]);
    var exprs = new ScilabString([this.Amplitude]);
    this.x.model.out2=1;
    this.x.model.dstate=new ScilabDouble([this.Amplitude]);
    this.x.model.outtyp=1;
    this.x.graphics.exprs = exprs;
    return new BasicBlock(this.x);  
    }
    GENSQR_f.prototype.details = function GENSQR_f() {
        return this.x;
    }
}
 
function GOTO() {

    GOTO.prototype.define = function GOTO() {
        var model = scicos_model();
        model.sim = new ScilabString(["goto"]);
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble([-1]);
        model.out = new ScilabDouble();
        model.out2 = new ScilabDouble();
        model.outtyp = new ScilabDouble([1]);
        model.ipar = new ScilabDouble([1]);
        model.opar = list(new ScilabString(["A"]));
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString(["A"], [sci2exp(1)]);
    this.displayParameter = ["A"];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"GOTO\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 1]), model, exprs, gr_i);
        this.x.graphics.id = new ScilabString(["Goto"]);
        return new BasicBlock(this.x)
    }
    
    GOTO.prototype.details = function GOTO() {
        return this.x;
    }
    GOTO.prototype.get = function GOTO() {
        if(this.tag == undefined || this.tag == null){
            this.tag = "A"
        }
        if(this.tagvis == undefined || this.tagvis == null){
            this.tagvis = "1"
        }
        var options={
            tag:["Tag",this.tag],
            tagvis:["Tag Visibility(1=Local 2=scoped 3= global)",this.tagvis],
        }
        return options
    }
    GOTO.prototype.set = function GOTO() {
        this.tag = arguments[0]["tag"]
        this.tagvis = parseFloat((arguments[0]["tagvis"]))
        this.x.model.opar = list(new ScilabString([this.tag]))
        this.x.model.ipar = new ScilabDouble([this.tagvis]);
        var exprs = new ScilabString([this.tag],[sci2exp(this.tagvis)])
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)
    }
}
function GOTOMO() {

    GOTOMO.prototype.define = function GOTOMO() {

        var model = scicos_model();
        model.sim = new ScilabString(["gotomo"]);
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble();
        model.out = new ScilabDouble();
        model.out2 = new ScilabDouble();
        model.outtyp = new ScilabDouble([1]);
        model.ipar = new ScilabDouble([1]);
        model.opar = list(new ScilabString(["A"]));
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var mo = new modelica_function();
        mo.model = new ScilabString(["gotomo"]);
        mo.inputs = new ScilabString(["p"]);

        var exprs = new ScilabString(["A"], [sci2exp(1)]);
    this.displayParameter = ["A"];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"GOTOMO\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 1]), model, exprs, gr_i);
        this.x.graphics.in_implicit = new ScilabString(["I"]);
        return new BasicBlock(this.x);
    }
    GOTOMO.prototype.details = function GOTOMO() {
        return this.x;
    }
    GOTOMO.prototype.get = function GOTOMO() {
        if(this.tag == undefined || this.tag == null){
            this.tag = "A"
        }
        if(this.tagvis == undefined || this.tagvis == null){
            this.tagvis = "1"
        }
        var options={
            tag:["Tag",this.tag],
            tagvis:["Tag Visibility(1=Local 2=scoped 3= global)",this.tagvis],
        }
        return options
    }
GOTOMO.prototype.set = function GOTOMO() {
    this.tag = arguments[0]["tag"]
    this.tagvis = parseFloat((arguments[0]["tagvis"]))
    this.x.model.opar = list(new ScilabString([this.tag]))
    this.x.model.ipar = new ScilabDouble([this.tagvis]);
    var exprs = new ScilabString([this.tag],[sci2exp(this.tagvis)])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function GotoTagVisibility() {

    GotoTagVisibility.prototype.define = function GotoTagVisibility() {

        var model = scicos_model();
        model.sim = new ScilabString(["gototagvisibility"]);
        model.in1 = new ScilabDouble();
        model.in2 = new ScilabDouble();
        model.out = new ScilabDouble();
        model.out2 = new ScilabDouble();
        model.evtin = new ScilabDouble();
        model.intyp = new ScilabDouble([1]);
        model.outtyp = new ScilabDouble([1]);
        model.opar = list(new ScilabString(["A"]));
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabBoolean([false]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString(["A"]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"GotoTagVisibility\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    GotoTagVisibility.prototype.details = function GotoTagVisibility() {

        return this.x;
    }
    GotoTagVisibility.prototype.get = function GotoTagVisibility() {
        if(this.tag == undefined || this.tag == null){
            this.tag = "A"
        }
        var options={
            tag:["GotoTag",this.tag],
        }
        return options
    }
GotoTagVisibility.prototype.set = function GotoTagVisibility() {
    this.tag = arguments[0]["tag"]
    this.x.model.opar = list(new ScilabString([this.tag]))
    var exprs = new ScilabString([this.tag])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function GotoTagVisibilityMO() {

    GotoTagVisibilityMO.prototype.define = function GotoTagVisibilityMO() {

        var model = scicos_model();
        model.sim = new ScilabString(["gototagvisibilitymo"]);
        model.in = new ScilabDouble();
        model.in2 = new ScilabDouble();
        model.out = new ScilabDouble();
        model.out2 = new ScilabDouble();
        model.evtin = new ScilabDouble();
        model.intyp = new ScilabDouble([1]);
        model.outtyp = new ScilabDouble([1]);
        model.opar = list(new ScilabString(["A"]));
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabBoolean([false]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString(["A"]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"GotoTagVisibilityMO\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    GotoTagVisibilityMO.prototype.details = function GotoTagVisibilityMO() {
        return this.x;
    }
        GotoTagVisibilityMO.prototype.get = function GotoTagVisibilityMO() {
        if(this.tag == undefined || this.tag == null){
            this.tag = "A"
        }
        var options={
            tag:["GotoTag",this.tag],
        }
        return options
    }
GotoTagVisibilityMO.prototype.set = function GotoTagVisibilityMO() {
    this.tag = arguments[0]["tag"]
    this.x.model.opar = list(new ScilabString([this.tag]))
    var exprs = new ScilabString([this.tag])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function Ground() {
    Ground.prototype.define = function Ground() {
        alert("Parameters can not be changed")
    }

    Ground.prototype.define = function Ground() {

        var model = scicos_model();
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble();
        model.sim = new ScilabString(["Ground"]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var mo = new modelica_function();
        mo.model = new ScilabString(["Ground"]);
        mo.inputs = new ScilabString(["p"]);
        mo.outputs = new ScilabDouble();
        model.equations = mo;

        var exprs = new ScilabString([""]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"Ground\",sz(1),sz(2));"]);
        this.x = standard_define(new ScilabDouble([1, 1]), model, exprs, list(gr_i, new ScilabDouble([0])));
        this.x.graphics.in_implicit = new ScilabString(["I"]);
        this.x.graphics.out_implicit = new ScilabString(["I"]);
        return new GroundBlock(this.x);
    }
    
    Ground.prototype.details = function Ground() {
        return this.x;
    }
}
function Gyrator() {

    Gyrator.prototype.define = function Gyrator() {
        this.ModelName = "Gyrator";
        this.PrametersValue = [[1],[1]];
        this.ParametersName = [["G1"],["G2"]];
        this.model = scicos_model();
        this.Typein = [];
        this.Typeout = [];
        this.MI = [];
        this.MO = [];
        this.P = [[2.5, 90, 2, 0],[2.5, 10, 2, 0],[97.5, 90, -2, 0],[97.5, 10, -2, 0]];
        this.PortName = [["p1"],["n1"],["p2"],["n2"]];

        for (var i = 0; i < size(this.P, "r"); i++) {
            if (this.P[i][2] == 1) {
                this.Typein.push(["E"]);
                this.MI.push(this.PortName[i]);
            }
            if (this.P[i][2] == 2) {
                this.Typein.push(["I"]);
                this.MI.push(this.PortName[i]);
            }
            if (this.P[i][2] == -1) {
                this.Typeout.push(["E"]);
                this.MO.push(this.PortName[i]);
            }
            if (this.P[i][2] == -2) {
                this.Typeout.push(["I"]);
                this.MO.push(this.PortName[i]);
            }
        }
        var model = scicos_model();
        var mo = new modelica_function();
        model.sim = new ScilabString([this.ModelName]);
        mo.inputs = new ScilabString(...this.MI);
        mo.outputs = new ScilabString(...this.MO);
        console.log(this.MI);
        model.rpar = new ScilabDouble(...this.PrametersValue);
        mo.parameters = list(new ScilabString(...this.ParametersName), new ScilabDouble(...this.PrametersValue), new ScilabDouble(...zeros(this.ParametersName)));
        var exprs = new ScilabString(["1"], ["1"]);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),&quot;Gyrator&quot;,sz(1),sz(2));"]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, true]);
        mo.model = new ScilabString([this.ModelName]);
        model.equations = mo;
        model.in = new ScilabDouble(...ones(size(this.MI, "*"), 1));
        model.out = new ScilabDouble(...ones(size(this.MO, "*"), 1));
        this.x = standard_define([2, 2], model, exprs, list(gr_i, new ScilabDouble([0])));
        this.x.graphics.in_implicit = new ScilabString(...this.Typein);
        this.x.graphics.out_implicit = new ScilabString(...this.Typeout);
        return new BasicBlock(this.x);
    }
    Gyrator.prototype.details = function Gyrator() {
        return this.x;
    }
    Gyrator.prototype.get = function Gyrator() {
        if(this.G1 == undefined)
            this.G1 = 1
        if(this.G2 == undefined)
            this.G2 = 1

        var options={
            G1:["G1",this.G1],
            G2:["G2",this.G2],
        }
        return options
    }
Gyrator.prototype.set = function Gyrator() {
    this.G1 = parseFloat((arguments[0]["G1"]))
    this.G2 = parseFloat((arguments[0]["G2"]))
    this.x.model.equations.parameters = list(new ScilabString(["G1"],["G2"]), new ScilabDouble([this.G1],[this.G2]));
    var exprs = new ScilabString([this.G1],[this.G2])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function HALT_f() {

    HALT_f.prototype.define = function HALT_f() {
        this.n = 0;

        var model = scicos_model();
        model.sim = new ScilabString(["hltblk"]);
        model.evtin = new ScilabDouble([1]);
        model.dstate = new ScilabDouble([0]);
        model.ipar = new ScilabDouble([0]);
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([this.n]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"HALT_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    HALT_f.prototype.details = function HALT_f() {
        return this.x;
    }
HALT_f.prototype.get = function HALT_f() {
        var options={
            n:["State on halt",this.n],
        }
        return options
    }
HALT_f.prototype.set = function HALT_f() {
    this.n = parseFloat((arguments[0]["n"]))
    this.x.model.ipar = new ScilabDouble([this.n]);
    var exprs = new ScilabString([this.n])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function HYSTHERESIS() {

    HYSTHERESIS.prototype.define = function HYSTHERESIS() {
        this.in1 = 1;
        this.ipar = 0;
        this.nzz = 2;
        this.rpar = [[1], [0], [1], [0]];

        var model = scicos_model();
        model.sim = list(new ScilabString(["hystheresis"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([this.in1]);
        model.out = new ScilabDouble([1]);
        model.rpar = new ScilabDouble(...this.rpar);
        model.nzcross = new ScilabDouble([this.nzz]);
        model.nmode = new ScilabDouble([1]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString(...this.rpar, [Math.sign(this.nzz)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"HYSTHERESIS\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    HYSTHERESIS.prototype.details = function HYSTHERESIS() {
        return this.x;
    }
HYSTHERESIS.prototype.get = function HYSTHERESIS() {
        var options={
            high_lim:["switch on at","1"],
            low_lim:["switch off at","0"],
            out_high:["output when on","1"],
            out_low:["output when off","0"],
            nzz:["use zero crossing: yes (1), no (0)",this.nzz],
        }
        return options
    }
HYSTHERESIS.prototype.set = function HYSTHERESIS() {
    this.high_lim = parseFloat((arguments[0]["high_lim"]))
    this.low_lim = parseFloat((arguments[0]["low_lim"]))
    this.out_high = parseFloat((arguments[0]["out_high"]))
    this.out_low = parseFloat((arguments[0]["out_low"]))
    this.nzz = parseFloat((arguments[0]["nzz"]))
    this.x.model.rpar = new ScilabDouble([this.high_lim],[this.low_lim],[this.out_high],[this.out_low])
    this.nzz = 2;
    this.x.model.nzcross = new ScilabDouble([this.nzz]);
    var exprs = new ScilabString([this.high_lim],[this.low_lim],[this.out_high],[this.out_low],[this.nzz])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function IdealTransformer() {

    IdealTransformer.prototype.define = function IdealTransformer() {
        this.ModelName = "IdealTransformer";
        this.PrametersValue = [1];
        this.ParametersName = ["N"];

        var model = scicos_model();

        this.Typein = [];
        this.Typeout = [];
        this.MI = [];
        this.MO = [];
        this.P = [[2.5,90,2,0],[2.5,10,2,0],[97.5,90,-2,0],[97.5,10,-2,0]];
        this.PortName = [["p1"],["n1"],["p2"],["n2"]];

        for (var i = 0; i < size(this.P, "r"); i++) {
            if (this.P[i][2] == 1) {
                this.Typein.push(["E"]);
                this.MI.push(this.PortName[i]);
            }

            if (this.P[i][2] == 2) {
                this.Typein.push(["I"]);
                this.MI.push(this.PortName[i]);
            }
            if (this.P[i][2] == -1) {
                this.Typeout.push(["E"]);
                this.MO.push(this.PortName[i]);
            }
            if (this.P[i][2] == -2) {
                this.Typeout.push(["I"]);
                this.MO.push(this.PortName[i]);
            }
        }
        var mo = new modelica_function();
        model.sim = new ScilabString([this.ModelName]);
        mo.inputs = new ScilabString(...this.MI);
        mo.outputs = new ScilabString(...this.MO);
        model.rpar = new ScilabDouble(this.PrametersValue);
        mo.parameters = list(new ScilabString(this.ParametersName), new ScilabDouble(this.PrametersValue), new ScilabDouble(zeros(getData(this.ParametersName))));
        var exprs = new ScilabString(["1"]);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"IdealTransformer\",sz(1),sz(2));"]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, true]);
        mo.model = new ScilabString([this.ModelName]);
        model.equations = mo;
        model.in = new ScilabDouble(...ones(size(this.MI, "*"), 1));
        model.out = new ScilabDouble(...ones(size(this.MO, "*"), 1));
        this.x = new standard_define(new ScilabDouble([2,2]), model, exprs, list(gr_i), new ScilabDouble([0]));
        this.x.graphics.in_implicit = new ScilabDouble(this.Typein);
        this.x.graphics.out_implicit = new ScilabDouble(this.Typeout);
        return new BasicBlock(this.x);
    }

    IdealTransformer.prototype.details = function IdealTransformer() {
        return this.x;
    }
    IdealTransformer.prototype.get = function IdealTransformer() {
        if(this.N == undefined)
            this.N = 1
        var options={
            N:["N",this.N],
        }
        return options
    }
IdealTransformer.prototype.set = function IdealTransformer() {
    this.N = parseFloat((arguments[0]["N"]))
    this.x.model.equations.parameters = list(new ScilabString(["N"]), new ScilabDouble([this.N]));
    var exprs = new ScilabString([this.N])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }

}
function IFTHEL_f() {

    IFTHEL_f.prototype.internal = function IFTHEL_f() {
        var model = scicos_model();
        model.sim = list(new ScilabString(["ifthel"]), new ScilabDouble([-1]));
        model.in = new ScilabDouble([1]);
        model.in2 = new ScilabDouble([1]);
        model.intyp = new ScilabDouble([-1]);
        model.evtin = new ScilabDouble([-1]);
        model.outtyp = new ScilabDouble(); // changed
        model.evtout = new ScilabDouble([-1], [-1]) // 1, 1 -> -1, -1 inverse
        model.blocktype = new ScilabString(["l"]);
        model.firing = new ScilabDouble([-1], [-1]); // inverse
        model.dep_ut = new ScilabBoolean([true, false]);
        model.nmode = new ScilabDouble([1]);
        model.nzcross = new ScilabDouble([1]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"IFTHEL_f\",sz(1),sz(2));"]);
        var exprs = new ScilabString(["1"], ["1"]); // value model.in, model.nmode inverse

        var block = new standard_define(new ScilabDouble([80, 80]), model, exprs, gr_i); // 3 -> 80
        block.graphics.in_implicit = new ScilabString(["E"]);
        // changed
        block.graphics.in_label = new ScilabString([""]);
        block.graphics.in_style = new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]);
        block.graphics.style = new ScilabString(["IFTHEL_f"]);
        return block;
    }

    IFTHEL_f.prototype.define = function IFTHEL_f() {
        var model = scicos_model();
        model.sim = list(new ScilabString(["ifthel"]), new ScilabDouble([-1]));
        model.in = new ScilabDouble([1]);
        model.in2 = new ScilabDouble([1]);
        model.intyp = new ScilabDouble([-1]);
        model.evtin = new ScilabDouble([-1]);
        model.outtyp = new ScilabDouble(); // changed
        model.evtout = new ScilabDouble([-1], [-1]) // 1, 1 -> -1, -1 inverse
        model.blocktype = new ScilabString(["l"]);
        model.firing = new ScilabDouble([-1], [-1]); // inverse
        model.dep_ut = new ScilabBoolean([true, false]);
        model.nmode = new ScilabDouble([1]);
        model.nzcross = new ScilabDouble([1]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"IFTHEL_f\",sz(1),sz(2));"]);
        var exprs = new ScilabString(["1"], ["1"]); // value model.in, model.nmode inverse

        this.x = new standard_define(new ScilabDouble([80, 80]), model, exprs, gr_i); // 3 -> 80
        this.x.graphics.in_implicit = new ScilabString(["E"]);
        // changed
        this.x.graphics.in_label = new ScilabString([""]);
        this.x.graphics.in_style = new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]);
        this.x.graphics.style = new ScilabString(["IFTHEL_f"]);
        return new BasicBlock(this.x);
    }

    IFTHEL_f.prototype.details = function IFTHEL_f() {
        return this.x;
    }
    IFTHEL_f.prototype.get = function IFTHEL_f() {
    if(this.inh == undefined || this.inh == null)
        this.inh = "1"
    if(this.nmod == undefined || this.nmod == null)
        this.nmod = "1"
        var options={
            inh:["Inherit (1: no, 0: yes)",this.inh],
            nmod:["zero-crossing (0: no, 1: yes)",this.nmod],
        }
        return options
    }
IFTHEL_f.prototype.set = function IFTHEL_f() {
    this.inh = parseFloat((arguments[0]["inh"]))
    this.nmod = parseFloat((arguments[0]["nmod"]))
    if(this.nmod != 0)
        this.nmod = 1
    if(this.inh != 1)
        this.inh = []
    this.x.model.evtin = new ScilabDouble([this.inh]);
    this.x.model.sim = list(new ScilabString(["ifthel"]), new ScilabDouble([-1]));
    this.x.model.nmode = new ScilabDouble([this.nmod]);
    this.x.model.nzcross = new ScilabDouble([this.nmod]);
    var exprs = new ScilabString([this.inh],[this.nmod])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function Inductor() {

    Inductor.prototype.define = function Inductor() {
        this.L = 1.0E-5;

        var model = scicos_model();
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.rpar = new ScilabDouble([this.L.toExponential(1)]);
        model.sim = new ScilabString(["Inductor"]);

        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var mo = new modelica_function();
        mo.model = new ScilabString(["Inductor"]);
        mo.inputs = new ScilabString(["p"]);
        mo.outputs = new ScilabString(["n"]);
        mo.parameters = list(new ScilabString(["L"]), list(new ScilabDouble([this.L.toExponential(1)])));
        model.equations = mo;

        var exprs = new ScilabString([this.L]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"Inductor\",sz(1),sz(2));"]);
        this.x = standard_define([2, 0.9], model, exprs, list(gr_i, 0));
        this.x.graphics.in_implicit = new ScilabString(["I"]);
        this.x.graphics.out_implicit = new ScilabString(["I"]);
        return new BasicBlock(this.x);
    }
    Inductor.prototype.details = function Inductor() {
        return this.x;
    }
    Inductor.prototype.get = function Inductor() {
        var options={
            L:["L (H)",this.L],
        }
        return options
    }
Inductor.prototype.set = function Inductor() {
    this.L = parseFloat((arguments[0]["L"]))
    this.x.model.rpar = new ScilabDouble([this.L]);
    this.x.model.equations.parameters = list(new ScilabString(["L"]), list(new ScilabDouble([this.L])));
    var exprs = new ScilabString([this.L])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function INIMPL_f() {

    INIMPL_f.prototype.define = function INIMPL_f() {
        var model = scicos_model();
        model.sim = new ScilabString(["inimpl"]);
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble([1]);
        model.ipar = new ScilabDouble([1]);
        model.dep_ut = new ScilabBoolean([false, false]);
        model.blocktype = new ScilabString(["c"]);

        var mo = new modelica_function();
        mo.model = new ScilabString(["PORT"]);
        mo.outputs = new ScilabString(["n"]);
        mo.inputs = new ScilabDouble();
        model.equations = mo;

        var exprs = new ScilabString(["1"]);
    var n ="1";
    this.displayParameter=[n];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),&quot;INIMPL_f&quot;,sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([1, 1]), model, exprs, gr_i);
        this.x.graphics.out_implicit = new ScilabString(["I"]);

        this.implicitInBlock = new ImplicitInBlock(this.x);
        this.displayParameter = [this.implicitInBlock.ordering];
        return this.implicitInBlock;
    }
    INIMPL_f.prototype.details = function INIMPL_f() {
        return this.x;
    }
    INIMPL_f.prototype.get = function INIMPL_f() {
        if(this.prt == undefined || this.prt == null)
            this.prt = "1"
        var options={
            prt:["Port Number",this.prt],
        }
        return options
    }
INIMPL_f.prototype.set = function INIMPL_f() {
    this.prt = parseFloat((arguments[0]["prt"]))
    this.prt = Math.floor(this.prt)
    this.x.model.ipar = new ScilabDouble([this.prt]);
    var exprs = new ScilabString([this.prt])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function INTEGRAL_f() {

    INTEGRAL_f.prototype.define = function INTEGRAL_f() {
        this.x0 = 0;

        var model = scicos_model();
        model.sim = new ScilabString(["integr"]);
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.state = new ScilabDouble([this.x0]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, true]);

        var exprs = new ScilabString([sci2exp(this.x0)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"INTEGRAL_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    INTEGRAL_f.prototype.details = function INTEGRAL_f() {
        return this.x;
    }
     
    INTEGRAL_f.prototype.get = function INTEGRAL_f() {
        var options={
            x0:["Initial state",this.x0],
        }
        return options
    }
    INTEGRAL_f.prototype.set = function INTEGRAL_f() {
        this.x0 = parseFloat((arguments[0]["x0"]))
        this.x.model.state = new ScilabDouble([this.x0]);
        var exprs = new ScilabString([sci2exp(this.x0)])
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)
    }
}

function INTEGRAL_m() {

    INTEGRAL_m.prototype.define = function INTEGRAL_m() {
        this.maxp = 1;
        this.minp = -1;
        this.rpar = [];

        var model = scicos_model();
        model.state = new ScilabDouble([0]);
        model.sim = list(new ScilabString(["integral_func"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.in2 = new ScilabDouble([1]);
        model.out2 = new ScilabDouble([1]);
        model.rpar = new ScilabDouble();
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, true]);

        var exprs = new ScilabString([0], [0], [0], [this.maxp], [this.minp]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"INTEGRAL_m\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    INTEGRAL_m.prototype.get = function INTEGRAL_m() {
        if(this.x0 == undefined || this.x0 == null)
            this.x0 = 0
        if(this.reinit == undefined || this.reinit == null)
            this.reinit = 0
        if(this.satur == undefined || this.satur == null)
            this.satur = 0

        var options={
            x0:["Initial Condition",this.x0],
            reinit:["With re-initialization (1:yes, 0:no)",this.reinit],
            satur:["With saturation (1:yes, 0:no)",this.satur],
            maxp:["Upper limit",this.maxp.toString().replace(/,/g," ")],
            lowp:["Lower limit",this.minp.toString().replace(/,/g," ")],
        }
        return options
    }
    INTEGRAL_m.prototype.set = function INTEGRAL_m() {
        this.x0 = inverse(arguments[0]["x0"])
        this.reinit = parseFloat((arguments[0]["reinit"]))
        this.satur = parseFloat((arguments[0]["satur"]))
        this.maxp = inverse(arguments[0]["maxp"])
        this.lowp = inverse(arguments[0]["lowp"])
    
        this.Datatype = 1 // assuming x0 is real
        if(this.reinit != 0)
            this.reint = 1

        if(this.satur != 0){
            this.satur = 1
        }
        if(size(this.maxp,"*") == 1){
            var n = this.maxp[0]
            this.maxp = ones(parseInt(this.x0[0]),1)
            for (var i = this.maxp.length - 1; i >= 0; i--) {
                this.maxp[i] = n*this.maxp[i]
            }
        }
        if(size(this.lowp,"*") == 1){
            var n = this.lowp[0]
            this.lowp = ones(parseInt(this.x0[0]),1)
            for (var i = this.lowp.length - 1; i >= 0; i--) {
                this.lowp[i] = n*this.lowp[i]
            }
        }

        
        this.x.model.rpar = new ScilabDouble(...this.maxp,...this.lowp)
        this.x.model.nzcross = new ScilabDouble([size(this.x0,"*")])
        this.x.model.nmode = new ScilabDouble([size(this.x0,"*")])
        this.x.model.state = new ScilabDouble(...this.x0)
        this.x.model.sim = list(new ScilabString(["integral_func"]), new ScilabDouble([4]))
        this.x.model.intyp = new ScilabDouble([1],...ones(this.reinit,1))
        this.x.model.outtyp = new ScilabDouble([1])
        var inp1 = [[1],...ones(this.reinit,1)]
        for (var i = inp1.length - 1; i >= 0; i--) {
            inp1[i] = inp1[i]*size(this.x0,1)
        }
        var inp2 = [[1],...ones(this.reinit,1)]
        for (var i = inp2.length - 1; i >= 0; i--) {
            inp2[i] = inp2[i]*size(this.x0,2)
        }
        this.in = [inp1,inp2]
        this.out = size(this.x0)
        var io = set_io(this.x.model,this.x.graphics,this.in,this.out,ones(this.reinit,1),[])

        var exprs = new ScilabString([this.x0.toString().replace(/,/g, " ")],[this.reinit],[this.satur],[this.maxp.toString().replace(/,/g, " ")],[this.lowp.toString().replace(/,/g, " ")])
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)
    }
    INTEGRAL_m.prototype.details = function INTEGRAL_m() {
        return this.x;
    }
}

function INTMUL() {

    INTMUL.prototype.define = function INTMUL() {
        this.sgn = 0;

        var model = scicos_model();
        model.sim = list(new ScilabString(["matmul_i32"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([-1], [-2]);
        model.out = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2], [-3]);
        model.out2 = new ScilabDouble([-3]);
        model.intyp = new ScilabDouble([3, 3]);
        model.outtyp = new ScilabDouble([3]);
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble([this.sgn]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([sci2exp(3)], [sci2exp(0)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"INTMUL\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    INTMUL.prototype.details = function INTMUL() {
        return this.x;
    }
    INTMUL.prototype.get = function INTMUL() {
        if(this.Datatype == undefined)
            this.Datatype = 3
        if(this.np == undefined)
            this.np = 0
        var options={
            Datatype:["Data Type (3:int32, 4:int16, 5:int8, ...)",this.Datatype],
            np:["Do on Overflow (0:Nothing, 1:Saturate, 2:Error)",this.np]
        }
        return options
    }
INTMUL.prototype.set = function INTMUL() {
    this.Datatype = parseFloat((arguments[0]["Datatype"]))
    this.np = parseFloat((arguments[0]["np"]))
    this.it = ones(2,1)
    for (var i = this.it.length - 1; i >= 0; i--){
        this.it[i] = this.it[i]*this.Datatype
    }
    this.ot = this.Datatype
    this.x.model.outtyp = new ScilabDouble([this.ot])
    this.x.model.intyp = new ScilabDouble(...this.it)
    if(this.Datatype == 3){
        if(this.np == 0)
            model.sim = list(new ScilabString(["matmul_i32n"]), new ScilabDouble([4]))
        else if(this.np == 1)
            model.sim = list(new ScilabString(["matmul_i32s"]), new ScilabDouble([4]))
        else
            model.sim = list(new ScilabString(["matmul_i32e"]), new ScilabDouble([4]))

    }
    if(this.Datatype == 4){
        if(this.np == 0)
            model.sim = list(new ScilabString(["matmul_i16n"]), new ScilabDouble([4]))
        else if(this.np == 1)
            model.sim = list(new ScilabString(["matmul_i16s"]), new ScilabDouble([4]))
        else
            model.sim = list(new ScilabString(["matmul_i16e"]), new ScilabDouble([4]))

    }
    if(this.Datatype == 5){
        if(this.np == 0)
            model.sim = list(new ScilabString(["matmul_i8n"]), new ScilabDouble([4]))
        else if(this.np == 1)
            model.sim = list(new ScilabString(["matmul_i8s"]), new ScilabDouble([4]))
        else
            model.sim = list(new ScilabString(["matmul_i8e"]), new ScilabDouble([4]))

    }
    if(this.Datatype == 6){
        if(this.np == 0)
            model.sim = list(new ScilabString(["matmul_ui32n"]), new ScilabDouble([4]))
        else if(this.np == 1)
            model.sim = list(new ScilabString(["matmul_ui32s"]), new ScilabDouble([4]))
        else
            model.sim = list(new ScilabString(["matmul_ui32e"]), new ScilabDouble([4]))

    }
    if(this.Datatype == 7){
        if(this.np == 0)
            model.sim = list(new ScilabString(["matmul_ui16n"]), new ScilabDouble([4]))
        else if(this.np == 1)
            model.sim = list(new ScilabString(["matmul_ui16s"]), new ScilabDouble([4]))
        else
            model.sim = list(new ScilabString(["matmul_i32e"]), new ScilabDouble([4]))

    }
    if(this.Datatype == 8){
        if(this.np == 0)
            model.sim = list(new ScilabString(["matmul_ui8n"]), new ScilabDouble([4]))
        else if(this.np == 1)
            model.sim = list(new ScilabString(["matmul_ui8s"]), new ScilabDouble([4]))
        else
            model.sim = list(new ScilabString(["matmul_ui8e"]), new ScilabDouble([4]))

    }
    this.in = [this.x.model.in,this.x.model.in2]
    this.out = [this.x.model.out,this.x.model.out2]
    var io = set_io(this.x.model,this.x.graphics,this.in,this.out,[],[])
    this.x.model.ipar = new ScilabDouble([this.np]);
    var exprs = new ScilabString([sci2exp(this.Datatype)],[sci2exp(this.np)])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function INTRP2BLK_f() {

    INTRP2BLK_f.prototype.define = function INTRP2BLK_f() {
        this.a = [[0],[1]];
        this.b = [[0],[1]];
        this.c = [[0,1],[1,2]];

        var model = scicos_model();
        model.sim = list(new ScilabString(["intrp2"]), new ScilabDouble([1]));
        model.in = new ScilabDouble([1], [1]);
        model.out = new ScilabDouble([1]);
        model.rpar = new ScilabDouble(...this.a,...this.b,...colon_operator(this.c));
        model.ipar = new ScilabDouble([2], [2]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);
        
        var exprs = new ScilabString([sci2exp(this.a)],[sci2exp(this.b)],[sci2exp(this.c)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"INTRP2BLK_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    INTRP2BLK_f.prototype.details = function INTRP2BLK_f() {
        return this.x;
    }
INTRP2BLK_f.prototype.get = function INTRP2BLK_f() {
        var options={
            a:["X coord.",this.a.toString().replace(/,/g," ")],
            b:["Y coord.",this.b.toString().replace(/,/g," ")],
            c:["Z values",this.c.toString().replace(/,/g," ")],
        }
        return options
    }
INTRP2BLK_f.prototype.set = function INTRP2BLK_f() {
    this.a = inverse(arguments[0]["a"])
    this.b = inverse(arguments[0]["b"])
    this.c = inverse(arguments[0]["c"])
    this.x.model.rpar = new ScilabDouble(...this.a,...this.b,...this.c)
    this.x.model.ipar = new ScilabDouble([this.a.length],[this.b.length])
    var exprs = new ScilabString([this.a.toString().replace(/,/g, " ")],[this.b.toString().replace(/,/g, " ")],[this.c.toString().replace(/,/g, " ")])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function INTRPLBLK_f() {

    INTRPLBLK_f.prototype.define = function INTRPLBLK_f() {
        this.a = [[0],[1]];

        this.b = [[0],[1]];

        var model = scicos_model();
        model.sim = new ScilabString(["intrpl"]);
        model.in = new ScilabDouble(1);
        model.out = new ScilabDouble(1);
        model.rpar = new ScilabDouble(...this.a, ...this.b);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true,false]);

        var exprs = new ScilabString([sci2exp(this.a)], [sci2exp(this.b)]);

        var gr_i = ["xstringb(orig(1),orig(2),\"INTRPLBLK_f\",sz(1),sz(2));"];
        this.x = new standard_define(new ScilabDouble([2,2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    INTRPLBLK_f.prototype.details = function INTRPLBLK_f() {
        return this.x;
    }
INTRPLBLK_f.prototype.get = function INTRPLBLK_f() {
        var options={
            a:["X coord.",this.a.toString().replace(/,/g," ")],
            b:["Y coord.",this.b.toString().replace(/,/g," ")],
        }
        return options
    }
INTRPLBLK_f.prototype.set = function INTRPLBLK_f() {
    this.a = inverse(arguments[0]["a"])
    this.b = inverse(arguments[0]["b"])
    this.x.model.rpar = new ScilabDouble(...this.a,...this.b)
    var exprs = new ScilabString([this.a.toString().replace(/,/g, " ")],[this.b.toString().replace(/,/g, " ")])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function INVBLK() {

    INVBLK.prototype.define = function INVBLK() {
        this.in1 = -1;

        var model = scicos_model();
        model.sim = list(new ScilabString(["invblk4"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([this.in1]);
        model.out = new ScilabDouble([this.in1]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([" "]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"INVBLK\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    INVBLK.prototype.details = function INVBLK() {
        return this.x;
    }
    INVBLK.prototype.get = function INVBLK() {
        alert("parameters can not be changed")
    }
}

function IN_f () {

    IN_f.prototype.internal = function IN_f() {
        this.prt = 1;
    
        var model = scicos_model();
        model.sim = new ScilabString(["input"]);
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble([-2]);
        model.outtyp = new ScilabDouble([-1]);
        model.ipar=new ScilabDouble([this.prt]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false,false]);
    
        var exprs = new ScilabString([sci2exp(this.prt)]);
    
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"IN_f\",sz(1),sz(2));"]);
        var block = new standard_define(new ScilabDouble([1,1]),model,exprs,gr_i);
        block.graphics.style = new ScilabString(["IN_f"]); // changed
        block.graphics.out_implicit = new ScilabString(["E"]);
        block.graphics.out_style = new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]);
        block.graphics.out_label = new ScilabString([""]);
        return block;
    }
    
    IN_f.prototype.define = function IN_f() {
        this.prt = 1;
    
        var model = scicos_model();
        model.sim = new ScilabString(["input"]);
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble([-2]);
        model.outtyp = new ScilabDouble([-1]);
        model.ipar = new ScilabDouble([this.prt]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false,false]);
    
        var exprs = new ScilabString([sci2exp(this.prt)]);
    
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"IN_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([1,1]),model,exprs,gr_i);

        this.explicitInBlock = new ExplicitInBlock(this.x);
        this.displayParameter = [this.explicitInBlock.ordering];
        return this.explicitInBlock;
        
    }
    
    IN_f.prototype.details = function IN_f() {
        return this.x;
    }
    IN_f.prototype.get = function IN_f() {
        if(this.prt == undefined || this.prt == null){
            this.prt = "1"
        }
        if(this.otsz == undefined || this.otsz == null){
            this.otsz = "[-1 -2]"
        }
        if(this.ot == undefined || this.ot == null){
            this.ot = "-1"
        }

        var options={
            prt:["Port number",this.prt],
            otsz:["Outport size ([-1 -2] for inherit)",this.otsz],
            ot:["Outport Type (-1 for inherit)",this.ot]
        }
        return options
    }
IN_f.prototype.set = function IN_f() {
    this.prt = parseFloat((arguments[0]["prt"]))
    this.otsz = inverse(arguments[0]["otsz"])
    this.ot = parseFloat((arguments[0]["ot"])) 
    this.x.model.ipar = new ScilabDouble([this.prt]);
    this.x.model.firing = new ScilabDouble()
    this.x.model.out = this.otsz[0]
    this.x.model.out2 = this.otsz[1]
    this.x.model.outtyp = this.ot
    var exprs = new ScilabString()
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function ISELECT_m() {

    ISELECT_m.prototype.define = function ISELECT_m() {
        this.z0 = 1;
        this.nout = 2;

        var model = scicos_model();
        model.sim = list(new ScilabString(["selector_m"]), new ScilabDouble([4]));
        model.out = new ScilabDouble([-1], [-1]);
        model.out2 = new ScilabDouble([-2], [-2]);
        model.outtyp = new ScilabDouble([1]);
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble([1]);
        model.evtout = new ScilabDouble();
        model.state = new ScilabDouble();
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble();
        model.firing = new ScilabDouble();
        model.evtin = new ScilabDouble(...ones(this.nout, 1));
        model.dstate = new ScilabDouble([this.z0]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([sci2exp(1)], [sci2exp(this.nout)], [sci2exp(this.z0)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"ISELECT_m\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    ISELECT_m.prototype.details = function ISELECT_m() {
        return this.x;
    }
    ISELECT_m.prototype.get = function ISELECT_m() {
        if(this.typ == undefined || this.typ == null){
            this.typ = "1"
        }
        var options={
            typ:["Datatype(1= real double  2=Complex 3=int32 ...)",this.typ],
            nout:["number of outputs",sci2exp(this.nout)],
            z0:["initial connected output",sci2exp(this.z0)],
        }
        return options
    }
    ISELECT_m.prototype.set = function ISELECT_m() {
        this.typ = parseFloat((arguments[0]["typ"]))
        this.nout = parseFloat((arguments[0]["nout"]))
        this.z0 = parseFloat((arguments[0]["z0"]))
        this.x.model.dstate = new ScilabDouble([this.zo])
        var exprs = new ScilabString([sci2exp(this.typ)],[sci2exp(this.nout)],[sci2exp(this.z0)])
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)
    }
}

function LOGBLK_f() {

    LOGBLK_f.prototype.define = function LOGBLK_f() {
        this.in1 = 1;
        this.a = Math.E;

        var model = scicos_model();
        model.sim = new ScilabString(["logblk"]);
        model.in = new ScilabDouble([-1]);
        model.out = new ScilabDouble([-1]);
        model.rpar = new ScilabDouble([this.a]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString(["%e"]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"LOGBLK_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    LOGBLK_f.prototype.details = function LOGBLK_f() {
        return this.x;
    }
    LOGBLK_f.prototype.get = function LOGBLK_f() {
        if(this.a == undefined || this.a == null){
            this.a = Math.E
        }
        var options={
            a:["Basis (>1)",this.a],
        }
        return options
    }
LOGBLK_f.prototype.set = function LOGBLK_f() {
    this.a = parseFloat((arguments[0]["a"]))
    this.x.model.rpar = new ScilabDouble([this.a]);
    var exprs = new ScilabString([this.a])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function LOGIC() {

    LOGIC.prototype.define = function LOGIC() {
        this.mat = [[0],[0],[0],[1]];

        var model = scicos_model();
        model.sim = list(new ScilabString(["logic"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([1], [1]);
        model.in2 = new ScilabDouble([1], [1]);
        model.out = new ScilabDouble([1]);
        model.out2 = new ScilabDouble([1]);
        model.evtin = new ScilabDouble([1]);
        model.intyp = new ScilabDouble([5, 5]);
        model.outtyp = new ScilabDouble([5]);
        model.opar = list(int8(...this.mat));
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabBoolean([false]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([sci2exp(this.mat)], [sci2exp(0)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"LOGIC\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    
    LOGIC.prototype.details = function LOGIC() {
        return this.x;
    }
    LOGIC.prototype.get = function LOGIC() {
    if(this.herit == undefined || this.herit == null)
        this.herit = 0
        var options={
            mat:["Truth Table (matrix of outputs)",this.mat.toString().replace(/,/g," ")],
            herit:["Accepts Inherited Events (0:No, 1:Yes)",sci2exp(this.herit)],
        }
        return options
    }
LOGIC.prototype.set = function LOGIC() {
    this.mat = inverse(arguments[0]["mat"])
    this.herit = parseFloat((arguments[0]["herit"]))

    this.nout = Math.log(size(this.mat,1))/Math.log(2)
    this.nin = Math.floor(this.nout)

    this.in = [...ones(this.nin,1),...ones(this.nin,1)]
    this.out = [...ones(this.nout,1),...ones(this.nout,1)]
    this.it = ones(this.nin,1)
    for (var i = this.it.length - 1; i >= 0; i--) {
        this.it[i] = 5*this.it[i]
    }
    this.x.model.intyp = new ScilabDouble(...this.it)
    this.out = ones(this.nout,1)
    for (var i = this.out.length - 1; i >= 0; i--) {
        this.out[i] = 5*this.out[i]
    }
    this.x.model.outtyp = new ScilabDouble(...this.out)
    var io = set_io(this.x.model,this.x.graphics,this.in,this.out,ones(1-this.herit,1),[])
    this.x.model.opar = list(int8(...this.mat));
    var exprs = new ScilabString([sci2exp(this.mat)],[sci2exp(this.herit)])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function LOGICAL_OP() {

    LOGICAL_OP.prototype.define = function LOGICAL_OP() {
        this.in1 = [[-1], [-1]];
        this.ipar = 0;
        this.nin = 2;

        var model = scicos_model();
        model.sim = list(new ScilabString(["logicalop"]), new ScilabDouble([4]));
        model.in = new ScilabDouble(...this.in1);
        model.out = new ScilabDouble([-1]);
        model.ipar = new ScilabDouble([this.ipar]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([this.nin], [this.ipar]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"LOGICAL_OP\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    LOGICAL_OP.prototype.details = function LOGICAL_OP() {
        return this.x;
    }
}

function LOOKUP_f() {

    LOOKUP_f.prototype.define = function LOOKUP_f() {

        var model = scicos_model();
        model.sim = new ScilabString(["lookup"]);
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.rpar = new ScilabDouble([-2], [-1], [1], [2], [-1], [1], [-1], [1]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"LOOKUP_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, [], gr_i);
        return new BasicBlock(this.x);
    }
    LOOKUP_f.prototype.details = function LOOKUP_f() {
        return this.x;
    }
}

function MATBKSL() {

    MATBKSL.prototype.define = function MATBKSL() {
        this.function_name = "mat_bksl";
        this.funtyp = 4;

        var model = scicos_model();
        model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([this.funtyp]));
        model.in = new ScilabDouble([-1], [-1]);
        model.in2 = new ScilabDouble([-2], [-3]);
        model.intyp = new ScilabDouble([1, 1]);
        model.out = new ScilabDouble([-2]);
        model.out2 = new ScilabDouble([-3]);
        model.outtyp = new ScilabDouble([1]);
        model.evtin = new ScilabDouble();
        model.evtout = new ScilabDouble();
        model.state = new ScilabDouble();
        model.dstate = new ScilabDouble();
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble();
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, false]);

        var label = new ScilabString([sci2exp(1)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MATBKSL\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, label, gr_i);
        return new BasicBlock(this.x);
    }
    MATBKSL.prototype.details = function MATBKSL() {
        return this.x;
    }
    MATBKSL.prototype.get = function MATBKSL() {
        if(this.typ == undefined || this.typ == null){
            this.typ = "1"
        }
        var options={
            typ:["Datatype (1=real double  2=Complex)",this.typ],
        }
        return options
    }
    MATBKSL.prototype.set = function MATBKSL() {
        this.typ = parseFloat((arguments[0]["typ"]))
        if(this.typ == 1){
            this.function_name = "mat_bksl"
        }
        else if(this.typ == 2){
            this.function_name = "matz_bksl"
        }
        model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([4]));
        var exprs = new ScilabString([this.typ])
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)
    }
}

function MATCATH() {

    MATCATH.prototype.define = function MATCATH() {
        this.funtyp = 4;
        this.function_name = "mat_cath";

        var model = scicos_model();
        model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([this.funtyp]));
        model.in = new ScilabDouble([-1], [-1]);
        model.in2 = new ScilabDouble([-2], [-3]);
        model.intyp = new ScilabDouble([1, 1]);
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble([0]);
        model.outtyp = new ScilabDouble([-1]);
        model.evtin = new ScilabDouble();
        model.evtout = new ScilabDouble();
        model.state = new ScilabDouble();
        model.dstate = new ScilabDouble();
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble();
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, false]);

        var label = new ScilabString([sci2exp(2)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MATCATH\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 3]), model, label, gr_i);
        return new BasicBlock(this.x);
    }
    MATCATH.prototype.details = function MATCATH() {
        return this.x;
    }
    MATCATH.prototype.get = function MATCATH() {
        if(this.nin == undefined || this.nin == null){
            this.nin = "2"
        }
        var options={
            nin:["Number of input",this.nin],
        }
        return options
    }
    MATCATH.prototype.set = function MATCATH() {
        this.nin = parseFloat((arguments[0]["nin"]))
        this.x.model.sim = list(new ScilabString(["mat_cath"]), new ScilabDouble([4]))
        var exprs = new ScilabString([this.nin])
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)
    }
}

function MATCATV() {

    MATCATV.prototype.define = function MATCATV() {
        this.l1 = [[2], [2]];
        this.function_name = "mat_catv";
        this.funtyp = 4;

        var model = scicos_model();
        model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([this.funtyp]));
        model.in2 = new ScilabDouble([-1], [-1]);
        model.in = new ScilabDouble([-2], [-3]);
        model.intyp = new ScilabDouble([-1, -1]);
        model.out = new ScilabDouble([0]);
        model.out2 = new ScilabDouble([-1]);
        model.outtyp = new ScilabDouble([-1]);
        model.evtin = new ScilabDouble();
        model.evtout = new ScilabDouble();
        model.state = new ScilabDouble();
        model.dstate = new ScilabDouble();
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble();
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, false]);

        var label = new ScilabString([sci2exp(2)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MATCATV\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 3]), model, label, gr_i);
        return new BasicBlock(this.x);
    }
    MATCATV.prototype.details = function MATCATV() {
        return this.x;
    }
    MATCATV.prototype.get = function MATCATV() {
        if(this.nin == undefined || this.nin == null){
            this.nin = "2"
        }
        var options={
            nin:["Number od inputs",this.nin],
        }
        return options
    }
    MATCATV.prototype.set = function MATCATV() {
        this.nin = parseFloat((arguments[0]["nin"]))
        this.x.model.sim = list(new ScilabString(["mat_catv"]), new ScilabDouble([4]))
        var exprs = new ScilabString([this.nin])
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)
    }
}

function MATDET() {

    MATDET.prototype.define = function MATDET() {
        var model = scicos_model();

        this.function_name = "mat_det";
        this.funtyp = 4;

        model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([this.funtyp]));
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-1]);
        model.intyp = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.out2 = new ScilabDouble([1]);
        model.outtyp = new ScilabDouble([1]);
        model.evtin = new ScilabDouble();
        model.evtout = new ScilabDouble();
        model.state = new ScilabDouble();
        model.dstate = new ScilabDouble();
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble();
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, false]);

        var label = new ScilabString([sci2exp(1)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MATDET\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, label, gr_i);
        return new BasicBlock(this.x);
    }

    MATDET.prototype.details = function MATDET() {
        return this.x;
    }
    MATDET.prototype.get = function MATDET() {
        if(this.typ == undefined || this.typ == null)
            this.typ = "1"
        var options={
            typ:["Datatype(1=real double  2=Complex)",this.typ],
        }
        return options
    }
MATDET.prototype.set = function MATDET() {
    this.typ = parseFloat((arguments[0]["typ"]))
    if(this.typ == 1){
        this.function_name = "mat_det"
    }
    else if(this.typ == 2){
        this.function_name = "matz_det"
    }
    this.x.model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([4]));
    var exprs = new ScilabString([this.typ])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function MATDIAG() {

    MATDIAG.prototype.define = function MATDIAG() {
        this.function_name = "mat_diag";
        this.funtyp = 4;

        var model = scicos_model();
        model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([this.funtyp]));
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([1]);
        model.intyp = new ScilabDouble([1]);
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble([-1]);
        model.outtyp = new ScilabDouble([1]);
        model.evtin = new ScilabDouble();
        model.evtout = new ScilabDouble();
        model.state = new ScilabDouble();
        model.dstate = new ScilabDouble();
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble();
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, false]);

        var label = new ScilabString([sci2exp(1)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MATDIAG\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, label, gr_i);
        return new BasicBlock(this.x);
    }
    MATDIAG.prototype.details = function MATDIAG() {
        return this.x;
    }
    MATDIAG.prototype.get = function MATDIAG() {
        if(this.typ == undefined || this.typ == null){
             this.typ = "1"
         }
        var options={
            typ:["Datatype (1=real double  2=Complex)",this.typ],
        }
        return options
    }
    MATDIAG.prototype.set = function MATDIAG() {
        this.typ = parseFloat((arguments[0]["typ"]))
        if(this.typ == 1){
            this.function_name = "mat_diag"
        }
        else if(this.typ == 2){
            this.function_name = "matz_diag"
        }
        this.x.model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([4]));
        this.x.graphics.exprs = label
        var exprs = new ScilabString([this.typ])
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)
    }
}

function MATDIV() {

    MATDIV.prototype.define = function MATDIV() {
        var model = scicos_model();

        this.function_name = "mat_div";
        this.funtyp = 4;

        model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([this.funtyp]));
        model.in = new ScilabDouble([-1], [-2]);
        model.in2 = new ScilabDouble([-3], [-3]);
        model.intyp = new ScilabDouble([1, 1]);
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble([-2]);
        model.outtyp = new ScilabDouble([1]);
        model.evtin = new ScilabDouble();
        model.evtout = new ScilabDouble();
        model.state = new ScilabDouble();
        model.dstate = new ScilabDouble();
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble();
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, false]);

        var label = new ScilabString([sci2exp(1)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MATDIV\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, label, gr_i);
        return new BasicBlock(this.x);
    }

    MATDIV.prototype.details = function MATDIV() {
        return this.x;
    }

    MATDIV.prototype.get = function MATDIV() {
       if(this.typ == undefined || this.typ == null){
            this.typ = "1"
        }
        var options={
            typ:["Datatype(1=real double  2=Complex)",this.typ],
        }
        return options
    }
    MATDIV.prototype.set = function MATDIV() {
        this.typ = parseFloat((arguments[0]["typ"]))
        if(this.typ == 1){
            this.function_name = "mat_div"
        }
        else if(this.typ == 2){
            this.function_name = "matz_div"
        }
        this.x.model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([4]));
        var exprs = new ScilabString([this.typ])
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)
    }

}
function MATEIG() {

    MATEIG.prototype.define = function MATEIG() {
        this.function_name = "mat_vps";
        this.funtyp = 4;

        var model = scicos_model();
        model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([this.funtyp]));
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-1]);
        model.intyp = new ScilabDouble([1]);
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble([1]);
        model.outtyp = new ScilabDouble([2]);
        model.evtin = new ScilabDouble();
        model.evtout = new ScilabDouble();
        model.state = new ScilabDouble();
        model.dstate = new ScilabDouble();
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble();
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, false]);

        var label = new ScilabString([sci2exp(1)], [sci2exp(1)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MATEIG\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, label, gr_i);
        return new BasicBlock(this.x);
    }
    MATEIG.prototype.details = function MATEIG() {
        return this.x;
    }
    MATEIG.prototype.get = function MATEIG() {
        if(this.typ == undefined || this.typ == null){
            this.typ = "1"
            this.decomptyp = "1"
        }
        var options={
            typ:["Datatype(1=real double  2=Complex)",this.typ],
            decomptyp:["decomposition type (1=eig values  2=eig values+eig vectors",this.decomptyp],
        }
        return options
    }
MATEIG.prototype.set = function MATEIG() {
    this.typ = parseFloat((arguments[0]["typ"]))
    this.decomptyp = parseFloat((arguments[0]["decomptyp"]))
    if(this.typ == 1){

        if(this.decomptyp == 1){
            this.function_name = "mat_vps"

        }
        else if(this.decomptyp == 2){
            this.function_name = "mat_vpv"
        }
    }
    else if(this.typ == 2){
        if(this.decomptyp == 1){
            this.function_name = "matz_vps"

        }
        else if(this.decomptyp == 2){
            this.function_name = "matz_vpv"
        }
    }
    this.x.model.sim = list(new ScilabString([this.function_name]),new ScilabDouble([4]))
    var exprs = new ScilabString([this.typ],[this.decomptyp])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function MATEXPM() {

    MATEXPM.prototype.define = function MATEXPM() {
        this.function_name = "mat_expm";
        this.funtyp = 4;
        var model = scicos_model();
        model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([this.funtyp]));
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-1]);
        model.intyp = new ScilabDouble([1]);
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble([-1]);
        model.outtyp = new ScilabDouble([1]);
        model.evtin = new ScilabDouble();
        model.evtout = new ScilabDouble();
        model.state = new ScilabDouble();
        model.dstate = new ScilabDouble();
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble();
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, false]);

        var label = new ScilabString([sci2exp(1)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MATEXPM\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, label, gr_i);
        return new BasicBlock(this.x);
    }
    MATEXPM.prototype.details = function MATEXPM() {
        return this.x;
    }
    MATEXPM.prototype.get = function MATEXPM() {
    if(this.typ == undefined || this.typ == null){
        this.typ = "1"
    }
        var options={
            typ:["Datatype(1=real double  2=Complex)",this.typ],
        }
        return options
    }
MATEXPM.prototype.set = function MATEXPM() {
    this.typ = parseFloat((arguments[0]["typ"]))
    if(this.typ == 1){
        this.function_name = "mat_expm"
    }
    else if(this.typ == 2){
        this.function_name = "matz_expm"
    }
    this.x.model.sim = list(new ScilabString([this.function_name]),new ScilabDouble([4]))
    var exprs = new ScilabString([this.typ])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function MATINV() {

    MATINV.prototype.define = function MATINV() {
        this.function_name = "mat_inv";
        this.funtyp = 4;

        var model = scicos_model();
        model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([this.funtyp]));
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-1]);
        model.intyp = new ScilabDouble([1]);
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble([-1]);
        model.outtyp = new ScilabDouble([1]);
        model.evtin = new ScilabDouble();
        model.evtout = new ScilabDouble();
        model.state = new ScilabDouble();
        model.dstate = new ScilabDouble();
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble();
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, false]);

        var label = new ScilabString([sci2exp(1)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MATINV\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, label, gr_i);
        return new BasicBlock(this.x);
    }
    MATINV.prototype.details = function MATINV() {
        return this.x;
    }
    MATINV.prototype.get = function MATINV() {
        if(this.typ == undefined || this.typ == null){
        this.typ = "1"
    }
        var options={
            typ:["Datatype(1=real double  2=Complex)",this.typ],
        }
        return options
    }
MATINV.prototype.set = function MATINV() {
    this.typ = parseFloat((arguments[0]["typ"]))
    if(this.typ == 1){
        this.function_name = "mat_inv"
    }
    else if(this.typ == 2){
        this.function_name = "matz_inv"
    }
    this.x.model.sim = list(new ScilabString([this.function_name]),new ScilabDouble([4]))
    var exprs = new ScilabString([this.typ])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function MATLU() {

    MATLU.prototype.define = function MATLU() {
        this.function_name = "mat_lu";
        this.funtyp = 4;

        var model = scicos_model();
        model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([this.funtyp]));
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-1]);
        model.intyp = new ScilabDouble([1]);
        model.out = new ScilabDouble([-1], [-1]);
        model.out2 = new ScilabDouble([-1], [-1]);
        model.outtyp = new ScilabDouble([1, 1]);
        model.evtin = new ScilabDouble();
        model.evtout = new ScilabDouble();
        model.state = new ScilabDouble();
        model.dstate = new ScilabDouble();
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble();
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, false]);

        var label = new ScilabString([sci2exp(1)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MATLU\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, label, gr_i);
        return new BasicBlock(this.x);
    }
    MATLU.prototype.details = function CSCOPE() {
        return this.x;
    }
}

function MATMAGPHI() {

    MATMAGPHI.prototype.define = function MATMAGPHI() {
        this.function_name = "matz_abs";
        this.funtyp = 4;

        var model = scicos_model();
        model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([this.funtyp]));
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble([2]);
        model.out = new ScilabDouble([-1], [-1]);
        model.out2 = new ScilabDouble([-2], [-2]);
        model.outtyp = new ScilabDouble([1, 1]);
        model.evtin = new ScilabDouble();
        model.evtout = new ScilabDouble();
        model.state = new ScilabDouble();
        model.dstate = new ScilabDouble();
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble();
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, false]);

        var label = new ScilabString([sci2exp(1)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MATMAGPHI\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, label, gr_i);
        return new BasicBlock(this.x);
    }
    MATMAGPHI.prototype.details = function MATMAGPHI() {
        return this.x;
    }
    MATMAGPHI.prototype.get = function MATMAGPHI() {
    if(this.decomptyp == undefined || this.decomptyp == null){
        this.decomptyp = "1"
    }
        var options={
            decomptyp:["decomposition type (1=Complex2Real&Imag 2=Real&Imag2Complex)",this.decomptyp],
        }
        return options
    }
MATMAGPHI.prototype.set = function MATMAGPHI() {
    this.decomptyp = parseFloat((arguments[0]["decomptyp"]))
    if(this.decomptyp == 1){
        this.function_name = "matz_abs"
        this.in = [[-1],[-2]]
        this.x.model.intyp = new ScilabDouble([2])
        this.x.model.outtyp = new ScilabDouble([1],[1])
        this.out = [[-1],[-1],[-2],[-2]]
    }
    else if(this.decomptyp == 2){
        this.function_name = "matz_absc"
        this.in = [[-1],[-1],[-2],[-2]]
        this.x.model.intyp = new ScilabDouble([2])
        this.x.model.outtyp = new ScilabDouble([1],[1])
        this.out = [[-1],[-2]]
    }
    var io = set_io(this.x.model,this.x.graphics,this.in,this.out,[],[])
    this.x.model.sim = list(new ScilabString([this.function_name]),new ScilabDouble([4]))
    var exprs = new ScilabString([this.decomptyp])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function MATMUL() {

    MATMUL.prototype.define = function MATMUL() {

        var model = scicos_model();
        model.sim = list(new ScilabString(["matmul_m"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([-1], [-2]);
        model.in2 = new ScilabDouble([-2], [-3]);
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble([-3]);
        model.dep_ut = new ScilabBoolean([true, false]);
        model.ipar = new ScilabDouble([1]);

        var label = new ScilabString([sci2exp(parseFloat(getData(model.ipar)))]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MATMUL\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, label, gr_i);
        return new BasicBlock(this.x);
    }
    MATMUL.prototype.details = function MATMUL() {
        return this.x;
    }
}

function MATPINV() {

    MATPINV.prototype.define = function MATPINV() {
        this.function_name = "mat_pinv";
        this.funtyp = 4;

        var model = scicos_model();
        model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([this.funtyp]));
        model.in = new ScilabDouble([-1]);
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble([1]);
        model.out = new ScilabDouble([-2]);
        model.out2 = new ScilabDouble([-1]);
        model.outtyp = new ScilabDouble([1]);
        model.evtin = new ScilabDouble();
        model.evtout = new ScilabDouble();
        model.state = new ScilabDouble();
        model.dstate = new ScilabDouble();
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble();
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, false]);

        var label = new ScilabString([sci2exp(1)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MATPINV\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, label, gr_i);
        return new BasicBlock(this.x);
    }
    MATPINV.prototype.details = function MATPINV() {
        return this.x;
    }
    MATPINV.prototype.get = function MATPINV() {
    if(this.typ == undefined || this.typ == null){
        this.typ = "1"
    }
        var options={
            typ:["Datatype(1=real double  2=Complex)",this.typ],
        }
        return options
    }
MATPINV.prototype.set = function MATPINV() {
    this.typ = parseFloat((arguments[0]["typ"]))
    if(this.typ == 1){
        this.function_name = "mat_pinv"
    }
    else if(this.typ == 2){
        this.function_name = "matz_pinv"
    }
    this.x.model.sim = list(new ScilabString([this.function_name]),new ScilabDouble([4]))
    this.x.graphics.exprs = label
    var exprs = new ScilabString([this.typ])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function MATRESH() {

    MATRESH.prototype.define = function MATRESH() {
        this.function_name = "mat_reshape";
        this.funtyp = 4;

        var model = scicos_model();
        model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([this.funtyp]));
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble([1]);
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble([-2]);
        model.outtyp = new ScilabDouble([1]);
        model.evtin = new ScilabDouble();
        model.evtout = new ScilabDouble();
        model.state = new ScilabDouble();
        model.dstate = new ScilabDouble();
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble();
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, false]);

        var label = new ScilabString([sci2exp(1)], [sci2exp([1, 1])], [sci2exp([1, 1])]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MATRESH\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, label, gr_i);
        return new BasicBlock(this.x);
    }
    MATRESH.prototype.details = function MATRESH() {
        return this.x;
    }
    MATRESH.prototype.get = function MATRESH() {
    if(this.typ == undefined || this.typ == null){
        this.typ = "1"
        this.l1 = "[1,1]"
        this.out = "[1,1]"
    }
        var options={
            typ:["Datatype(1=real double  2=Complex)",this.typ.toString().replace(/,/g," ")],
            l1:["input size",this.l1.toString().replace(/,/g," ")],
            out:["output size desire",this.out.toString().replace(/,/g," ")]
        }
        return options
    }
MATRESH.prototype.set = function MATRESH() {
    this.typ = inverse(arguments[0]["typ"])
    this.l1 = inverse(arguments[0]["l1"])
    this.out = inverse(arguments[0]["out"])
    if(this.typ == 1){
        this.function_name = "mat_reshape"
    }
    else if(this.typ == 2){
        this.function_name = "matz_reshape"
    }
    this.x.model.sim = list(new ScilabString([this.function_name]),new ScilabDouble([4]))
    var exprs = new ScilabString([this.typ.toString().replace(/,/g, " ")],[this.l1.toString().replace(/,/g, " ")],[this.out.toString().replace(/,/g, " ")])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function MATSING() {

    MATSING.prototype.define = function MATSING() {
        var model = scicos_model();

        this.function_name = "mat_sing";
        this.funtyp = 4;

        model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([this.funtyp]));
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble([1]);
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble([1]);
        model.outtyp = new ScilabDouble([1]);
        model.evtin = new ScilabDouble();
        model.evtout = new ScilabDouble();
        model.state = new ScilabDouble();
        model.dstate = new ScilabDouble();
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble();
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, false]);

        var label = new ScilabString([sci2exp(1)], [sci2exp(1)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MATSING\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, label, gr_i);
        return new BasicBlock(this.x);
    }

    MATSING.prototype.details = function MATSING() {
        return this.x;
    }
    MATSING.prototype.get = function MATSING() {
        if(this.typ == undefined || this.typ == null){
        this.typ = "1"
        this.decomptyp = "1"
    }
        var options={
            typ:["Datatype(1=real double  2=Complex)",this.typ],
            decomptyp:["decomposition type (1=singular values  2=sing values+matrix U & V)",this.decomptyp],
        }
        return options
    }
MATSING.prototype.set = function MATSING() {
    this.typ = parseFloat((arguments[0]["typ"]))
    this.decomptyp = parseFloat((arguments[0]["decomptyp"]))
    if(this.typ == 1){

        if(this.decomptyp == 1){
            this.function_name = "mat_sing"

        }
        else if(this.decomptyp == 2){
            this.function_name = "mat_svd"
        }
    }
    else if(this.typ == 2){

        if(this.decomptyp == 1){
            this.function_name = "matz_sing"

        }
        else if(this.decomptyp == 2){
            this.function_name = "matz_svd"
        }
    }
    this.x.model.sim = list(new ScilabString([this.function_name]),new ScilabDouble([4]))
    var exprs = new ScilabString([this.typ],[this.decomptyp])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function MATSUM() {

    MATSUM.prototype.define = function MATSUM() {
        this.function_name = "mat_sum";
        this.funtyp = 4;

        var model = scicos_model();
        model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([this.funtyp]));
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.out2 = new ScilabDouble([1]);
        model.outtyp = new ScilabDouble([1]);
        model.evtin = new ScilabDouble();
        model.evtout = new ScilabDouble();
        model.state = new ScilabDouble();
        model.dstate = new ScilabDouble();
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble();
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, false]);

        var label = new ScilabString([sci2exp(1)], [sci2exp(0)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MATSUM\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, label, gr_i);
        return new BasicBlock(this.x);
    }
    MATSUM.prototype.details = function MATSUM() {
        return this.x;
    }
    MATSUM.prototype.get = function MATSUM() {
    if(this.typ == undefined || this.typ == null){
        this.typ = "1"
        this.decomptyp = "0"
    }
        var options={
            typ:["Datatype(1=real double  2=Complex)",this.typ],
            decomptyp:["Sum along (0=all 1=lines  2=Columns)",this.decomptyp],
        }
        return options
    }
MATSUM.prototype.set = function MATSUM() {
    this.typ = parseFloat((arguments[0]["typ"]))
    this.decomptyp = parseFloat((arguments[0]["decomptyp"]))
    if(this.typ == 1){
        if(this.decomptyp == 0){
            this.function_name = "mat_sum"
        }
        else if(this.decomptyp == 1){
            this.function_name = "mat_sumc"

        }
        else if(this.decomptyp == 2){
            this.function_name = "mat_suml"
        }
    }
    else if(this.typ == 2){
        if(this.decomptyp == 0){
            this.function_name = "matz_sum"
        }
        else if(this.decomptyp == 1){
            this.function_name = "matz_sumc"

        }
        else if(this.decomptyp == 2){
            this.function_name = "matz_suml"
        }
    }
    this.x.model.sim = list(new ScilabString([this.function_name]),new ScilabDouble([4]))
    this.x.graphics.exprs = label
    var exprs = new ScilabString([this.typ],[this.decomptyp])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function MATTRAN() {

    MATTRAN.prototype.define = function MATTRAN() {

        var model = scicos_model();
        model.sim = list(new ScilabString(["mattran_m"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.out = new ScilabDouble([-2]);
        model.out2 = new ScilabDouble([-1]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var label = new ScilabString([sci2exp(1)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MATTRAN\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, label, gr_i);
        return new BasicBlock(this.x);
    }
    MATTRAN.prototype.details = function MATTRAN() {
        return this.x;
    }
    MATTRAN.prototype.get = function MATTRAN() {
    if(this.typ == undefined || this.typ == null){
        this.typ = "1"
        this.rule = "1"
    }
        var options={
            typ:["Datatype(1=real double 2=Complex)",this.typ],
            rule:["rule (1=.'' 2='')",this.rule],
        }
        return options
    }
MATTRAN.prototype.set = function MATTRAN() {

    this.typ = parseFloat((arguments[0]["typ"]))
    this.rule = parseFloat((arguments[0]["rule"]))
    if(this.typ == 1){
        this.function_name = "mattran_m"
    }
    else if(this.typ == 2){
        if(this.rule==1)
            this.function_name = "matztran_m"
        else
            this.function_name = "mathermit_m"
    }
    this.x.model.sim = list(new ScilabString([this.function_name]),new ScilabDouble([4]))
    this.x.graphics.exprs = label
    var exprs = new ScilabString([this.typ],[this.rule])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function MATZCONJ() {
    MATZCONJ.prototype.get = function MATZCONJ(){
        alert("no get for this block")
    }

    MATZCONJ.prototype.define = function MATZCONJ() {
        this.function_name = "matz_conj";
        this.funtyp = 4;

        var model = scicos_model();
        model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([this.funtyp]));
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble([2]);
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble([-2]);
        model.outtyp = new ScilabDouble([2]);
        model.evtin = new ScilabDouble();
        model.evtout = new ScilabDouble();
        model.state = new ScilabDouble();
        model.dstate = new ScilabDouble();
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble();
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, false]);

        var label = new ScilabDouble();

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MATZCONJ\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, label, gr_i);
        return new BasicBlock(this.x);
    }
    MATZCONJ.prototype.details = function MATZCONJ() {
        return this.x;
    }
}

function MATZREIM() {
    MATZREIM.prototype.define = function MATZREIM() {
        var model = scicos_model();
        
        this.function_name = "matz_reim";
        this.funtyp = new ScilabDouble([4]);
        model.sim = list(this.function_name, this.funtyp);
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble([2]);
        model.out = new ScilabDouble(-1, -1);
        model.out2 = new ScilabDouble(-2, -2);
        model.outtyp = new ScilabDouble([1,1]);
        model.evtin = new ScilabDouble();
        model.evtout = new ScilabDouble();
        model.state = new ScilabDouble();
        model.dstate = new ScilabDouble();
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble();
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true,false]);

        this.label = sci2exp(new ScilabDouble(1));

        var gr_i = ["xstringb(orig(1),orig(2),\"MATZREIM\",sz(1),sz(2));"];
        this.x = new standard_define(new ScilabDouble([3,2]), model, this.label, gr_i);
        return new BasicBlock(this.x);
    }

    MATZREIM.prototype.details = function MATZREIM() {
        return this.x;
    }
    MATZREIM.prototype.get = function MATZREIM() {
    if(this.decomptyp == undefined || this.decomptyp == null){
        this.decomptyp = "1"
    }
        var options={
            decomptyp:["decomposition type (1=Complex2Real&Imag 2=Real&Imag2Complex)",this.decomptyp],
        }
        return options
    }
MATZREIM.prototype.set = function MATZREIM() {
    this.decomptyp = parseFloat((arguments[0]["decomptyp"]))
    if(this.decomptyp == 1){
        this.function_name = "matz_reim"
        this.in = [[-1],[-2]]
        this.x.model.intyp = new ScilabDouble([2])
        this.x.model.outtyp = new ScilabDouble([1],[1])
        this.out = [[-1],[-1],[-2],[-2]]
    }
    else if(this.decomptyp == 2){
        this.function_name = "matz_reimc"
        this.in = [[-1],[-1],[-2],[-2]]
        this.x.model.intyp = new ScilabDouble([2])
        this.x.model.outtyp = new ScilabDouble([1],[1])
        this.out = [[-1],[-2]]
    }
    var io = set_io(this.x.model,this.x.graphics,this.in,this.out,[],[])
    this.x.model.sim = list(new ScilabString([this.function_name]),new ScilabDouble([4]))
    var exprs = new ScilabString([this.decomptyp])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function MAXMIN() {

    MAXMIN.prototype.define = function MAXMIN() {
        var model = scicos_model();
        model.sim = list(new ScilabString(["minmax"]), new ScilabDouble([4]));
        model.out = new ScilabDouble([1]);
        model.in = new ScilabDouble([-1]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);
        model.ipar = new ScilabDouble([0]);

        var exprs = new ScilabString(...math.transpose([[2, 1, 1]]));

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MAXMIN\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        this.x.graphics.style = new ScilabString(["MAXMIN;displayedLabel=MAX"]);
        return new BasicBlock(this.x);
    }

    MAXMIN.prototype.details = function MAXMIN() {
        return this.x;
    }
MAXMIN.prototype.get = function MAXMIN() {
    if(this.mm == undefined || this.mm == null){
        this.mm = "2"
        this.nin = "1"
        this.zcr = "1"
    }
        var options={
            mm:["Min (1) or Max (2) ",this.mm],
            nin:["Number of input vectors (1 or 2)",1],
            zcr:["zero-crossing (1: yes, 0",this.zcr],
        }
        return options
    }
MAXMIN.prototype.set = function MAXMIN() {
    this.mm = parseFloat((arguments[0]["mm"]))
    this.nin = parseFloat((arguments[0]["nin"]))
    this.zcr = parseFloat((arguments[0]["zcr"]))
    if(this.zcr != 0){
        this.zcr = -1
    }
    if(this.mm != 1){
        this.mm = 2
    }

    this.x.model.nzcross = new ScilabDouble([this.zcr]);
    if(this.nin == 1){
        this.x.model.nmode = new ScilabDouble([abs(this.zcr)]);
    }
    else{
        this.x.model.nmode = new ScilabDouble([this.zcr]);
    }
    this.x.model.ipar = new ScilabDouble([this.mm]);
    if(this.mm=1){
        this.x.graphics.style = new ScilabDouble(["MAXMIN;displayedLabel=" + "MIN"]);
    }
    else{
        this.x.graphics.style = new ScilabDouble(["MAXMIN;displayedLabel=" + "MAX"]);
    }
    var exprs = new ScilabString([this.mm],[this.nin],[this.zcr])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function MAX_f() {
    
    MAX_f.prototype.get = function MAX_f() {
        alert("parameters could not be set")
    }    

    MAX_f.prototype.define = function MAX_f() {
        this.in = new ScilabDouble([-1]);

        var model = scicos_model();
        model.sim = new ScilabString(["maxblk"]);
        model.in = this.in;
        model.out = new ScilabDouble(1);
        model.dstate = new ScilabDouble([0], [0]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([" "]);

        var gr_i = ["xstringb(orig(1),orig(2),\"MAX_f\",sz(1),sz(2));"];
        this.x = new standard_define(new ScilabDouble([2,2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    
    MAX_f.prototype.details = function MAX_f() {
        return this.x;
    }
}
function MBLOCK() {

    MBLOCK.prototype.define = function MBLOCK() {
        this.in1 = ["u1"];
        this.intype = ["I"];
        this.out = [["y1"],["y2"]];
        this.outtype = [["I"],["E"]];
        this.param = [["R"],["L"]];
        this.paramv = list(new ScilabDouble([0.1]), new ScilabDouble([0.0001]));
        this.pprop = [[0],[0]];
        this.nameF = "generic";

        var exprs = tlist(["MBLOCK", "in", "intype", "out", "outtype", "param", "paramv", "pprop", "nameF", "funtxt"], new ScilabString(["MBLOCK", "in", "intype", "out", "outtype", "param", "paramv", "pprop", "nameF", "funtxt"]), new ScilabString([sci2exp(this.in1)]), new ScilabString([sci2exp(this.intype)]), new ScilabString([sci2exp(this.out)]), new ScilabString([sci2exp(this.outtype)]), new ScilabString([sci2exp(this.param)]), list(new ScilabString([0.1]), new ScilabString([0.0001])), new ScilabString([sci2exp(this.pprop)]), new ScilabString([this.nameF]), new ScilabDouble());

        var model = scicos_model();
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, true]);
        model.rpar = [];

        for (var i = 0; i < this.paramv.length; i++) {
            model.rpar.push(getData(this.paramv[i]));
        }

        model.rpar = new ScilabDouble(...model.rpar);
        var mo = new modelica_function();
        mo.model = new ScilabString([this.nameF]);
        mo.parameters = list(new ScilabString(...this.param), this.paramv);
        model.sim = list(mo.model, new ScilabDouble([30004]));
        mo.inputs = new ScilabString(this.in1);
        mo.outputs = new ScilabString(...this.out);
        model.in = new ScilabDouble(...ones(size(getData(mo.inputs), "r"), 1));
        model.out = new ScilabDouble(...ones(size(getData(mo.outputs), "r"), 1));
        model.equations = mo;
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MBLOCK\",sz(1),sz(2));"]);

        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        this.x.graphics.in_implicit = new ScilabString(this.intype);
        this.x.graphics.out_implicit = new ScilabString(...this.outtype);
        return new BasicBlock(this.x);
    }

    MBLOCK.prototype.details = function MBLOCK() {
        return this.x;
    }
}
function MCLOCK_f() {

    MCLOCK_f.prototype.define = function MCLOCK_f() {
        this.nn = 2;
        this.dt = 0.1;
        var exprs = new ScilabString([this.dt], [this.nn]);

        var mfclck = new MFCLCK_f().internal();
        mfclck.graphics.orig = new ScilabDouble([334, 199]);
        mfclck.graphics.sz = new ScilabDouble([40, 40]);
        mfclck.graphics.flip = new ScilabBoolean([true]);
        mfclck.graphics.exprs = exprs;
        mfclck.graphics.pein = new ScilabDouble([12]);
        mfclck.graphics.peout = new ScilabDouble([4], [3]);
        mfclck.model.rpar = new ScilabDouble([0.1]);
        mfclck.model.ipar = new ScilabDouble([this.nn]);
        mfclck.model.firing = new ScilabDouble([-1, 0]);
        mfclck.model.uid = new ScilabString([count]);
        mfclck.doc = list(new ScilabString([count++]));

        var clksom = new CLKSOM_f().internal();
        clksom.graphics.orig = new ScilabDouble([457, 161]);
        clksom.graphics.sz = new ScilabDouble([16.666667, 16.666667]);
        clksom.graphics.flip = new ScilabBoolean([true]);
        clksom.graphics.exprs = new ScilabString(["0.1"], ["0.1"]);
        clksom.graphics.pein = new ScilabDouble([4], [9], [0]);
        clksom.graphics.peout = new ScilabDouble([5]);
        clksom.model.uid = new ScilabString([count]);
        clksom.doc = list(new ScilabString([count++]));

        var output_port1 = new CLKOUT_f().internal();
        output_port1.graphics.orig = new ScilabDouble([509, 261]);
        output_port1.graphics.sz = new ScilabDouble([20, 20]);
        output_port1.graphics.flip = new ScilabBoolean([true]);
        output_port1.graphics.exprs = new ScilabString(["1"]);
        output_port1.graphics.pein = new ScilabDouble([10]);
        output_port1.model.ipar = new ScilabDouble([1]);
        output_port1.model.uid = new ScilabString([count]);
        output_port1.doc = list(new ScilabString([count++]));

        var output_port2 = new CLKOUT_f().internal();
        output_port2.graphics.orig = new ScilabDouble([509, 142]);
        output_port2.graphics.sz = new ScilabDouble([20, 20]);
        output_port2.graphics.flip = new ScilabBoolean([true]);
        output_port2.graphics.exprs = new ScilabString(["2"]);
        output_port2.graphics.pein = new ScilabDouble([13]);
        output_port2.model.ipar = new ScilabDouble([2]);
        output_port2.model.uid = new ScilabString([count]);
        output_port2.doc = list(new ScilabString([count++]));

        var split1 = new CLKSPLIT_f().internal();
        split1.graphics.orig = new ScilabDouble([411.92504, 169.33333]);
        split1.graphics.pein = new ScilabDouble([3]);
        split1.graphics.peout = new ScilabDouble([9], [10]);
        split1.model.uid = new ScilabString([count]);
        split1.doc = list(new ScilabString([count++]));

        var split2 = new CLKSPLIT_f().internal();
        split2.graphics.orig = new ScilabDouble([482.45315, 169.33333]);
        split2.graphics.pein = new ScilabDouble([5]);
        split2.graphics.peout = new ScilabDouble([12], [13]);
        split2.model.uid = new ScilabString([count]);
        split2.doc = list(new ScilabString([count++]));

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),&quot;MCLOCK_f&quot;,sz(1),sz(2));"]);

        var diagram = scicos_diagram();
        diagram.objs.push(mfclck);
        diagram.objs.push(clksom);
        diagram.objs.push(output_port1);
        diagram.objs.push(output_port2);
        diagram.objs.push(split1);
        diagram.objs.push(split2);

        diagram.objs.push(scicos_link({
            xx: new ScilabDouble([360.7], [360.7], [411.9]),
            yy: new ScilabDouble([193.3], [169.3], [169.3]),
            ct: new ScilabDouble([10, -1]),
            from: new ScilabDouble([1, 2, 0]),
            to: new ScilabDouble([5, 1, 1])
        }));
        diagram.objs.push(scicos_link({
            xx: new ScilabDouble([347.3], [347.3], [461.8], [461.8]),
            yy: new ScilabDouble([193.3], [155.5], [155.5], [161]),
            ct: new ScilabDouble([10, -1]),
            from: new ScilabDouble([1, 1, 0]),
            to: new ScilabDouble([2, 1, 1])
        }));
        diagram.objs.push(scicos_link({
            xx: new ScilabDouble([468.9], [482.5]),
            yy: new ScilabDouble([169.3], [169.3]),
            ct: new ScilabDouble([10, -1]),
            from: new ScilabDouble([2, 1, 0]),
            to: new ScilabDouble([6, 1, 1])
        }));
        diagram.objs.push(scicos_link({
            xx: new ScilabDouble([411.9], [457]),
            yy: new ScilabDouble([169.3], [169.3]),
            ct: new ScilabDouble([10, -1]),
            from: new ScilabDouble([5, 1, 0]),
            to: new ScilabDouble([2, 2, 1])
        }));
        diagram.objs.push(scicos_link({
            xx: new ScilabDouble([411.9], [411.9], [509]),
            yy: new ScilabDouble([169.3], [271], [271]),
            ct: new ScilabDouble([10, -1]),
            from: new ScilabDouble([5, 2, 0]),
            to: new ScilabDouble([3, 1, 1])
        }));
        diagram.objs.push(scicos_link({
            xx: new ScilabDouble([482.5], [489.6], [489.6], [354], [354]),
            yy: new ScilabDouble([169.3], [169.3], [338.3], [338.3], [244.7]),
            ct: new ScilabDouble([10, -1]),
            from: new ScilabDouble([6, 1, 0]),
            to: new ScilabDouble([1, 1, 1])
        }));
        diagram.objs.push(scicos_link({
            xx: new ScilabDouble([482.4], [482.4], [509]),
            yy: new ScilabDouble([169.3], [152], [152]),
            ct: new ScilabDouble([10, -1]),
            from: new ScilabDouble([6, 2, 0]),
            to: new ScilabDouble([4, 1, 1])
        }));

        this.x = scicos_block();
        this.x.gui = new ScilabString(["MCLOCK_f"]);
        this.x.graphics.sz = new ScilabDouble([3, 2]);
        this.x.graphics.gr_i = gr_i;
        this.x.model.sim = new ScilabString(["csuper"]);
        this.x.model.evtout = new ScilabDouble([1], [1]);
        this.x.model.blocktype = new ScilabString(["h"]);
        this.x.model.rpar = diagram;
        this.x.graphics.peout = new ScilabDouble([0], [0]);
        return new BasicBlock(this.x);
    }
    MCLOCK_f.prototype.details = function MCLOCK_f() {
        return this.x;
    }
}
function MFCLCK_f() {

    MFCLCK_f.prototype.define = function MFCLCK_f() {
        this.nn = 2;
        this.dt = 0.1;

        var model = scicos_model();
        model.sim = new ScilabString(["mfclck"]);
        model.evtin = new ScilabDouble([1]);
        model.evtout = new ScilabDouble([1], [1]);
        model.dstate = new ScilabDouble([0]);
        model.rpar = new ScilabDouble([this.dt]);
        model.ipar = new ScilabDouble([this.nn]);
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble([-1], [0]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([this.dt], [this.nn]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MFCLCK_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    MFCLCK_f.prototype.internal = function MFCLCK_f() {
        this.nn = 2;
        this.dt = 0.1;

        var model = scicos_model();
        model.sim = new ScilabString(["mfclck"]);
        model.evtin = new ScilabDouble([1]);
        model.evtout = new ScilabDouble([1], [1]);
        model.dstate = new ScilabDouble([0]);
        model.rpar = new ScilabDouble([this.dt]);
        model.ipar = new ScilabDouble([this.nn]);
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble([-1], [0]);
        model.dep_ut = new ScilabBoolean([false, false]);
        model.outtyp = new ScilabDouble();

        var exprs = new ScilabString([this.dt], [this.nn]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MFCLCK_f\",sz(1),sz(2));"]);
        var block = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        block.graphics.style = new ScilabString(["MFCLCK_f"]);
        return block;
    }
    MFCLCK_f.prototype.details = function MFCLCK_f() {
        return this.x;
    }
}
function MIN_f() {
    MIN_f.prototype.get = function MIN_f() {
        alert("parameters could not be set")
    }
    MIN_f.prototype.define = function MIN_f() {
        this.in1 = -1;

        var model = scicos_model();
        model.sim = new ScilabString(["minblk"]);
        model.in = new ScilabDouble([this.in1]);
        model.out = new ScilabDouble([1]);
        model.dstate = new ScilabDouble([0], [0]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([sci2exp(this.in1)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MIN_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    MIN_f.prototype.details = function MIN_f() {
        return this.x;
    }
}

function Modulo_Count() {

    Modulo_Count.prototype.define = function Modulo_Count() {
        this.ini_c = 0;
        this.base = 3;

        var model = scicos_model();
        model.sim = list(new ScilabString(["modulo_count"]), new ScilabDouble([4]));
        model.evtin = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.dstate = new ScilabDouble([this.ini_c]);
        model.ipar = new ScilabDouble([this.base]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([this.ini_c], [this.base]);
    var n= this.base.toString();    
    this.displayParameter =[n];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"Modulo_Count\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    Modulo_Count.prototype.internal = function Modulo_Count() {
        this.ini_c = 0;
        this.base = 3;

        var model = scicos_model();
        model.sim = list(new ScilabString(["modulo_count"]), new ScilabDouble([4]));
        model.evtin = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.out2 = new ScilabDouble([1]);
        model.dstate = new ScilabDouble([this.ini_c]);
        model.ipar = new ScilabDouble([this.base]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([this.ini_c], [this.base]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"Modulo_Count\",sz(1),sz(2));"]);
        var block = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        block.graphics.style = new ScilabString(["Modulo_Count"]);
        return block;
    }
    Modulo_Count.prototype.details = function Modulo_Count() {
        return this.x;
    }
    Modulo_Count.prototype.get = function Modulo_Count() {
        var options={
            ini_c:["Initial State (zero or positive number)",this.ini_c],
            base:["Upper Limit (positive number)",this.base]    
        }
        return options
    }
Modulo_Count.prototype.set = function Modulo_Count() {
    this.ini_c = parseFloat((arguments[0]["ini_c"]))
    this.base = parseFloat((arguments[0]["base"]))
    this.ini_c = Math.floor(this.ini_c)
    this.x.model.ipar = new ScilabDouble([this.base]);
    this.x.model.dstate = new ScilabDouble([this.ini_c]);
    var exprs = new ScilabString([this.ini_c],[this.base])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function MUX() {

    MUX.prototype.define = function MUX() {
        this.in = 2;
        var arr = [];
        arr.push(math.range(-1, -this.in, -1, true)._data);

        var model = scicos_model();
        model.sim = list(new ScilabString(["multiplex"]), new ScilabDouble([4]));
        model.in = new ScilabDouble(...math.transpose(arr));
        model.out = new ScilabDouble([0]);
        model.ipar = new ScilabDouble([this.in]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([this.in]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MUX\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([.5, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    MUX.prototype.details = function MUX() {
        return this.x;
    }
    MUX.prototype.get = function MUX() {
        var options={
            in:["number of input ports or vector of sizes",this.in.toString()]
        }
        return options
    }
MUX.prototype.set = function MUX() {
    this.in = inverse(arguments[0]["in"])
    if(size(this.in,"*") == 1){
        var n = this.in[0]
        this.inp = []
        for (var i = 1; i <= n; i++ ) {
            this.inp.push([-1*i])
        }
        var io = check_io(this.x.model,this.x.graphics,this.inp,[[0]],[],[])
    }
    else{
        this.nout = sum(this.in)
        var io = check_io(this.x.model,this.x.graphics,this.in,this.nout,[],[])
    }
    this.x.model.ipar = new ScilabDouble(...this.in)
    var exprs = new ScilabString(this.in.toString())
    this.x.graphics.exprs = exprs
    return new BasicBlock(this.x)
}
}

function MUX_f() {

    MUX_f.prototype.define = function MUX_f() {
        this.in1 = 2;
        var arr = [];
        arr.push(math.range(-1, -this.in1, -1, true)._data);

        var model = scicos_model();
        model.sim = list(new ScilabString(["mux"]), new ScilabDouble([1]));
        model.in = new ScilabDouble(...math.transpose(arr));
        model.out = new ScilabDouble([0]);
        model.ipar = new ScilabDouble([this.in1]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([this.in1]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MUX_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([0.5, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    MUX_f.prototype.details = function MUX_f() {
        return this.x;
    }
}

function M_freq() {

    M_freq.prototype.define = function M_freq() {
        var model = scicos_model();
        model.sim = list(new ScilabString(["m_frequ"]), new ScilabDouble([4]));
        model.evtout = new ScilabDouble([1], [1], [1]);
        model.evtin = new ScilabDouble([1]);
        model.rpar = new ScilabDouble();
        model.opar = list(new ScilabDouble([1, 1, 0], [1, 1, 1], [1, 3, 2]), new ScilabDouble([1]), new ScilabDouble([0]), new ScilabDouble([0]));
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble([0, -1, -1]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([sci2exp([[1], [2]])], [sci2exp([[0], [0]])]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"M_freq\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    M_freq.prototype.details = function M_freq() {
        return this.x;
    }
}
function M_SWITCH() {

    M_SWITCH.prototype.define = function M_SWITCH() {
        this.in1 = [[1], [-1], [-1]];
        this.ipar = [[1], [3]];
        this.nin = 2;

        var model = scicos_model();
        model.sim = list(new ScilabString(["mswitch"]), new ScilabDouble([4]));
        model.in = new ScilabDouble(...this.in1);
        model.out = new ScilabDouble([-1]);
        model.ipar = new ScilabDouble(...this.ipar);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([this.nin], ...this.ipar);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"M_SWITCH\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2.5, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    M_SWITCH.prototype.details = function M_SWITCH() {
        return this.x;
    }
    M_SWITCH.prototype.get = function M_SWITCH() {
        if(this.base == undefined || this.base == null){
            this.base = "1"
        }
        if(this.rule == undefined || this.rule == null){
            this.rule = "3"
        }
        var options={
            nin:["number of inputs",this.nin],
            base:["zero base indexing (0), otherwise 1",this.base],
            rule:["rounding rule: int (0), round (1), ceil (2), floor (3)",this.rule],
        }
        return options
    }
M_SWITCH.prototype.set = function M_SWITCH() {
    this.nin = parseFloat((arguments[0]["nin"]))
    this.base = parseFloat((arguments[0]["base"]))
    this.rule = parseFloat((arguments[0]["rule"]))
    this.nin = Math.floor(this.nin)
    this.base = Math.floor(this.base)
    this.x.model.ipar = new ScilabDouble([this.base],[this.rule])
    var exprs = new ScilabString([this.nin],[this.base],[this.rule])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function NEGTOPOS_f() {

    NEGTOPOS_f.prototype.define = function NEGTOPOS_f() {
        var model = scicos_model();
        model.sim = list(new ScilabString(["zcross"]), new ScilabDouble([1]));
        model.nzcross = new ScilabDouble([1]);
        model.in = new ScilabDouble([1]);
        model.evtout = new ScilabDouble([1]);
        model.rpar = new ScilabDouble([-1], [-1], [0], [-1]);
        model.blocktype = new ScilabString(["z"]);
        model.firing = new ScilabDouble([-1]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"NEGTOPOS_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, new ScilabDouble(), gr_i);
        return new BasicBlock(this.x);
    }

    NEGTOPOS_f.prototype.details = function NEGTOPOS_f() {
        return this.x;
    }
}
function NMOS() {

    NMOS.prototype.define = function NMOS() {
        this.W = 20.e-6;
        this.L = 6.e-6;
        this.Beta = 0.041e-3;
        this.Vt = 0.8;
        this.K2 = 1.144;
        this.K5 = 0.7311;
        this.dW = -2.5e-6;
        this.dL = -1.5e-6;
        this.RDS = 1.e+7;

        var model = scicos_model();
        model.sim = new ScilabString(["NMOS"]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var mo = new modelica_function();
        mo.model = new ScilabString(["NMOS"]);
        mo.outputs = new ScilabString(["D"], ["B"], ["S"]);
        mo.inputs = new ScilabString(["G"]);
        mo.parameters = list(new ScilabString(["W"], ["L"], ["Beta"], ["Vt"], ["K2"], ["K5"], ["dW"], ["dL"], ["RDS"]), new ScilabDouble([this.W], [this.L], [this.Beta], [this.Vt], [this.K2], [this.K5], [this.dW], [this.dL], [this.RDS]));
        model.equations = mo;
        model.in = new ScilabDouble(...ones(size(getData(mo.inputs), "*"), 1));
        model.out = new ScilabDouble(...ones(size(getData(mo.outputs), "*"), 1));

        var exprs = new ScilabString([this.W], [this.L], [this.Beta], [this.Vt], [this.K2], [this.K5], [this.dW], [this.dL], [this.RDS]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"NMOS\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        this.x.graphics.in_implicit = new ScilabString(["I"]);
        this.x.graphics.out_implicit = new ScilabString(["I"], ["I"], ["I"]);
        return new BasicBlock(this.x);
    }
    NMOS.prototype.details = function NMOS() {
        return this.x;
    }
    NMOS.prototype.get = function NMOS() {
        var options={
            W:["Width [m]",this.W.toString().replace(/,/g," ")],
            L:["Length [m]",this.L.toString().replace(/,/g," ")],
            Beta:["Transconductance parameter [A/(V*V)]",this.Beta.toString().replace(/,/g," ")],
            Vt:["Zero bias threshold voltage [V]",this.Vt.toString().replace(/,/g," ")],
            K2:["Bulk threshold parameter",this.K2.toString().replace(/,/g," ")],
            K5:["Reduction of pinch-off region",this.K5.toString().replace(/,/g," ")],
            dW:["Narrowing of channel [m]",this.dW.toString().replace(/,/g," ")],
            dL:["Shortening of channel [m]",this.dL.toString().replace(/,/g," ")],
            RDS:["Drain-Source-Resistance [Ohm]",this.RDS.toString().replace(/,/g," ")],
        }
        return options
    }
NMOS.prototype.set = function NMOS() {
    this.W = inverse(arguments[0]["W"])
    this.L = inverse(arguments[0]["L"])
    this.Beta = inverse(arguments[0]["Beta"])
    this.Vt = inverse(arguments[0]["Vt"])
    this.K2 = inverse(arguments[0]["K2"])
    this.K5 = inverse(arguments[0]["K5"])
    this.dW = inverse(arguments[0]["dW"])
    this.dL = inverse(arguments[0]["dL"])
    this.RDS = inverse(arguments[0]["RDS"])
    thi.x.model.equations.parameters = list(new ScilabString(["W"], ["L"], ["Beta"], ["Vt"], ["K2"], ["K5"], ["dW"], ["dL"], ["RDS"]), new ScilabDouble([this.W], [this.L], [this.Beta], [this.Vt], [this.K2], [this.K5], [this.dW], [this.dL], [this.RDS]));
    var exprs = new ScilabString([this.W.toString().replace(/,/g, " ")],[this.L.toString().replace(/,/g, " ")],[this.Beta.toString().replace(/,/g, " ")],[this.Vt.toString().replace(/,/g, " ")],[this.K2.toString().replace(/,/g, " ")],[this.K5.toString().replace(/,/g, " ")],[this.dW.toString().replace(/,/g, " ")],[this.dL.toString().replace(/,/g, " ")],[this.RDS.toString().replace(/,/g, " ")])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function NPN() {

    NPN.prototype.define = function NPN() {
        this.ModelName = "NPN";
        this.PrametersValue = [[50], [0.1], [0], [0.02], [1.200e-10], [5.000e-09], [1.000e-12], [4.000e-13], [5.000e-13], [0.8], [0.4], [0.8], [0.333], [1.000e-15], [1.000e-15], [0.02585], [40]];
        this.ParametersName = [["Bf"], ["Br"], ["Is"], ["Vak"], ["Tauf"], ["Taur"], ["Ccs"], ["Cje"], ["Cjc"], ["Phie"], ["Me"], ["Phic"], ["Mc"], ["Gbc"], ["Gbe"], ["Vt"], ["EMinMax"]];
        this.model = scicos_model();
        this.Typein = [];
        this.Typeout = [];
        this.MI = [];
        this.MO = [];
        this.P = [[100, 90, -2, 0], [0, 50, 2, 0], [100, 10, -2, 0]];
        this.PortName = [["C"], ["B"], ["E"]];

        for (var i = 0; i < size(this.P, "r"); i++) {
            if (this.P[i][2] == 1) {
                this.Typein.push(["E"]);
                this.MI.push(this.PortName[i]);
            }
            if (this.P[i][2] == 2) {
                this.Typein.push(["I"]);
                this.MI.push(this.PortName[i]);
            }
            if (this.P[i][2] == -1) {
                this.Typeout.push(["E"]);
                this.MO.push(this.PortName[i]);
            }
            if (this.P[i][2] == -2) {
                this.Typeout.push(["I"]);
                this.MO.push(this.PortName[i]);
            }
        }
        var model = scicos_model();
        var mo = new modelica_function();
        model.sim = new ScilabString([this.ModelName]);
        mo.inputs = new ScilabString(...this.MI);
        mo.outputs = new ScilabString(...this.MO);
        model.rpar = new ScilabDouble(...this.PrametersValue);
        mo.parameters = list(new ScilabString(...this.ParametersName), new ScilabDouble(...this.PrametersValue), new ScilabDouble(...zeros(this.ParametersName)));
        var exprs = new ScilabString(["50"], ["0.1"], ["1.e-16"], ["0.02"], ["0.12e-9"], ["5e-9"], ["1e-12"], ["0.4e-12"], ["0.5e-12"], ["0.8"], ["0.4"], ["0.8"], ["0.333"], ["1e-15"], ["1e-15"], ["0.02585"], ["40"]);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),&quot;NPN&quot;,sz(1),sz(2));"]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, true]);
        mo.model = new ScilabString([this.ModelName]);
        model.equations = mo;
        model.in = new ScilabDouble(...ones(size(this.MI, "*"), 1));
        model.out = new ScilabDouble(...ones(size(this.MO, "*"), 1));
        this.x = standard_define([2, 2], model, exprs, list(gr_i, new ScilabDouble([0])));
        this.x.graphics.in_implicit = new ScilabString(...this.Typein);
        this.x.graphics.out_implicit = new ScilabString(...this.Typeout);
        return new BasicBlock(this.x);
    }
    NPN.prototype.details = function NPN() {
        return this.x;
    }
    NPN.prototype.get = function NPN() {
        var options={
            Bf:["Bf  : Forward beta","50"],
            Br:["Br  : Reverse beta","0.1"],
            Is:["Is  : Transport saturation current","1.e-16"],
            Vak:["Vak : Early voltage (inverse), 1/Volt","0.02"],
            Tauf:["Tauf: Ideal forward transit time","0.12e-9"],
            Taur:["Taur: Ideal reverse transit time","5e-9"],
            Ccs:["Ccs : Collector-substrat(ground) cap.","1e-12"],
            Cje:["Cje : Base-emitter zero bias depletion cap.","0.4e-12"],
            Cjc:["Cjc : Base-coll. zero bias depletion cap.","0.5e-12"],
            Phie:["Phie: Base-emitter diffusion voltage","0.8"],
            Me:["Me  : Base-emitter gradation exponent","0.4"],
            Phic:["Phic: Base-collector diffusion voltage","0.8"],
            Mc:["Mc  : Base-collector gradation exponent","0.333"],
            Gbc:["Gbc : Base-collector conductance","1e-15"],
            Gbe:["Gbe : Base-emitter conductance","1e-15"],
            Vt:["Vt  : Voltage equivalent of temperature","0.02585"],
            EMinMax:["EMinmax: if x > EMinMax, the exp(x) is linearized","40"],
        }
        return options
    }
NPN.prototype.set = function NPN() {
    this.Bf = parseFloat((arguments[0]["Bf"]))
    this.Br = parseFloat((arguments[0]["Br"]))
    this.Is = parseFloat((arguments[0]["Is"]))
    this.Vak = parseFloat((arguments[0]["Vak"]))
    this.Tauf = parseFloat((arguments[0]["Tauf"]))
    this.Taur = parseFloat((arguments[0]["Taur"]))
    this.Ccs = parseFloat((arguments[0]["Ccs"]))
    this.Cje = parseFloat((arguments[0]["Cje"]))
    this.Cjc = parseFloat((arguments[0]["Cjc"]))
    this.Phie = parseFloat((arguments[0]["Phie"]))
    this.Me = parseFloat((arguments[0]["Me"]))
    this.Phic = parseFloat((arguments[0]["Phic"]))
    this.Mc = parseFloat((arguments[0]["Mc"]))
    this.Gbc = parseFloat((arguments[0]["Gbc"]))
    this.Gbe = parseFloat((arguments[0]["Gbe"]))
    this.Vt = parseFloat((arguments[0]["Vt"]))
    this.EMinMax = parseFloat((arguments[0]["EMinMax"]))
    this.ParametersName = [["Bf"], ["Br"], ["Is"], ["Vak"], ["Tauf"], ["Taur"], ["Ccs"], ["Cje"], ["Cjc"], ["Phie"], ["Me"], ["Phic"], ["Mc"], ["Gbc"], ["Gbe"], ["Vt"], ["EMinMax"]];
    this.ParametersValue = new ScilabDouble([this.Bf],[this.Br],[this.Is],[this.Vak],[this.Tauf],[this.Taur],[this.Ccs],[this.Cje],[this.Cjc],[this.Phie],[this.Me],[this.Phic],[this.Mc],[this.Gbc],[this.Gbe],[this.Vt],[this.EMinMax])
    this.x.model.equations.parameters = list(new ScilabString(...this.ParametersName), new ScilabDouble(...this.PrametersValue), new ScilabDouble(...this.PrametersValue), new ScilabDouble(...zeros(this.ParametersName)))
    var exprs = new ScilabString([this.Bf],[this.Br],[this.Is],[this.Vak],[this.Tauf],[this.Taur],[this.Ccs],[this.Cje],[this.Cjc],[this.Phie],[this.Me],[this.Phic],[this.Mc],[this.Gbc],[this.Gbe],[this.Vt],[this.EMinMax])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function NRMSOM_f() {

    NRMSOM_f.prototype.define = function NRMSOM_f() {
        this.in1 = [[-1], [-1]];
        this.nin = 2;

        var model = scicos_model();
        model.sim = new ScilabString(["junk"]);
        model.in = new ScilabDouble(...this.in1);
        model.out = new ScilabDouble([-1]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([this.nin]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"NRMSOM_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([.2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    NRMSOM_f.prototype.details = function NRMSOM_f() {
        return this.x;
    }
    NRMSOM_f.prototype.get = function NRMSOM_f() {
        var options={
            nin:["number of inputs",this.nin],
        }
        return options
    }
NRMSOM_f.prototype.set = function NRMSOM_f() {
    this.nin = parseFloat((arguments[0]["nin"]))
    var exprs = new ScilabString([this.nin])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function OpAmp() {

    OpAmp.prototype.define = function OpAmp() {
        this.S = [];
        this.Z = [];

        var model = scicos_model();
        model.sim = new ScilabString(["OpAmp"]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var mo = new modelica_function();
        mo.model = model.sim;
        mo.inputs = new ScilabString(["in_p"], ["in_n"]);
        mo.outputs = new ScilabString(["out"]);
        mo.parameters = list(new ScilabDouble(), new ScilabDouble());
        model.equations = mo;
        model.in = new ScilabDouble(...ones(size(getData(mo.inputs), "*"), 1));
        model.out = new ScilabDouble(...ones(size(getData(mo.outputs), "*"), 1));
        model.rpar = new ScilabDouble();

        var exprs = new ScilabString();

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"OpAmp\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 5]), model, exprs, gr_i);
        this.x.graphics.in_implicit = new ScilabString(["I"], ["I"]);
        this.x.graphics.out_implicit = new ScilabString(["I"]);
        return new BasicBlock(this.x);
    }
    OpAmp.prototype.details = function OpAmp() {
        return this.x;
    }
    OpAmp.prototype.get = function OpAmp() {
        if(this.OLGain == undefined){
            this.OLGain = ""
            this.Sath = ""
            this.Satl = ""
        }
        var options={
            OLGain:["Open Loop Gain",this.OLGain],
            Sath:["positive saturation voltage",this.Sath],
            Satl:["Negative saturation voltage",this.Satl],
        }
        return options
    }
OpAmp.prototype.set = function OpAmp() {
    this.OLGain = parseFloat((arguments[0]["OLGain"]))
    this.Sath = parseFloat((arguments[0]["Sath"]))
    this.Satl = parseFloat((arguments[0]["Satl"]))

    this.x.model.equations.parameters = list(new ScilabDouble(), new ScilabDouble([this.OLGain],[this.Sath],[this.Satl]));
    var exprs = new ScilabString([this.OLGain],[this.Sath],[this.Satl])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function OUTIMPL_f() {

    OUTIMPL_f.prototype.define = function OUTIMPL_f() {
        var model = scicos_model();
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([1]);

        this.prt = 1;
        model.sim = new ScilabString(["outimpl"]);
        model.ipar = new ScilabDouble([1]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var mo = new modelica_function();
        mo.model = new ScilabString(["PORT"]);
        mo.inputs = new ScilabString(["n"]);
        mo.outputs = new ScilabDouble();
        model.equations = mo;

        var exprs = new ScilabString(["1"]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),&quot;OUTIMPL_f&quot;,sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([1, 1]), model, exprs, gr_i);
        this.x.graphics.in_implicit = new ScilabString(["I"]);
        
        this.implicitOutBlock = new ImplicitOutBlock(this.x);
        this.displayParameter = [this.implicitOutBlock.ordering];
        return this.implicitOutBlock;
    }
    OUTIMPL_f.prototype.details = function OUTIMPL_f() {
        return this.x;
    }
    OUTIMPL_f.prototype.get = function OUTIMPL_f() {
    if(this.prt == undefined || this.prt == null){
        this.prt = "1"
    }
        var options={
            prt:["Port number",this.prt],
        }
        return options
    }
OUTIMPL_f.prototype.set = function OUTIMPL_f() {
    this.prt = parseFloat((arguments[0]["prt"]))
    this.x.model.ipar = new ScilabDouble([this.prt]);
    var exprs = new ScilabString([this.prt])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function OUT_f () {

    OUT_f.prototype.internal = function OUT_f() {
        this.n = -1;
        this.prt = 1;
    
        var model = scicos_model();
        model.sim = new ScilabString(["output"]);
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble([-1]);
        model.ipar = new ScilabDouble([this.prt]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false,false]);
        var exprs = new ScilabString([sci2exp(this.prt)]);
        var n =(this.prt).toString();
    this.displayParameter=[n];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"OUT_f\",sz(1),sz(2));"]);
        var block=new standard_define(new ScilabDouble([1,1]),model,exprs,gr_i);
        block.graphics.style = new ScilabString(["OUT_f"]);  // changed
        block.graphics.in_style = new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]);
        block.graphics.in_label = new ScilabString([""]);
        block.graphics.in_implicit = new ScilabString(["E"]);
        return block;
    }
    
    OUT_f.prototype.define = function OUT_f() {
        this.n = -1;
        this.prt = 1;
    
        var model = scicos_model();
        model.sim = new ScilabString(["output"]);
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble([-1]);
        model.ipar=new ScilabDouble([this.prt]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false,false]);
    
        var exprs = new ScilabString([sci2exp(this.prt)]);
        
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"OUT_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([1,1]),model,exprs,gr_i);
        this.x.graphics.style = new ScilabString(["OUT_f"]);

        this.explicitOutBlock = new ExplicitOutBlock(this.x);
        this.displayParameter = [this.explicitOutBlock.ordering];
        return this.explicitOutBlock;
    }
    
    OUT_f.prototype.details = function OUT_f() {
        return this.x;
    }
    OUT_f.prototype.get = function OUT_f() {
        var options={
            prt:["Port number",this.prt],
        }
        return options
    }
OUT_f.prototype.set = function OUT_f() {
    this.prt = parseFloat((arguments[0]["prt"]))
    this.x.model.ipar = new ScilabDouble([this.prt]);
    var exprs = new ScilabString([this.prt])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function PDE() {

    PDE.prototype.define = function PDE() {
        this.params_pde = tlist(["paramspde", "a", "b", "txt_exp", "check_op1", "a1", "b1", "check_op2", "a2", "b2", "check_op3", "a3", "b3", "check_op4", "a4", "b4", "check_op5", "a5", "b5", "check_op6", "a6", "b6", "check_op7", "a7", "b7", "discr_cst", "discr_non_cst", "signe", "rad_automatique", "rad_manuel", "methode", "ord1", "ord2", "ord3", "degre", "nnode", "txt_pas", "CI", "dCI", "CLa", "CLa_exp", "CLb", "CLb_exp", "points"], new ScilabString(["paramspde"], ["a"], ["b"], ["txt_exp"], ["check_op1"], ["a1"], ["b1"], ["check_op2"], ["a2"], ["b2"], ["check_op3"], ["a3"], ["b3"], ["check_op4"], ["a4"], ["b4"], ["check_op5"], ["a5"], ["b5"], ["check_op6"], ["a6"], ["b6"], ["check_op7"], ["a7"], ["b7"], ["discr_cst"], ["discr_non_cst"], ["signe"], ["rad_automatique"], ["rad_manuel"], ["methode"], ["ord1"], ["ord2"], ["ord3"], ["degre"], ["nnode"], ["txt_pas"], ["CI"], ["dCI"], ["CLa"], ["CLa_exp"], ["CLb"], ["CLb_exp"], ["points"]), new ScilabString([""]), new ScilabString([""]), new ScilabString([""]), new ScilabString(["0"]), new ScilabString([""]), new ScilabString(["IN_EDP1(t)"]), new ScilabString(["0"]), new ScilabString([""]), new ScilabString(["IN_EDP2(t)"]), new ScilabString(["0"]), new ScilabString([""]), new ScilabString(["IN_EDP3(t)"]), new ScilabString(["0"]), new ScilabString([""]), new ScilabString(["IN_EDP4(t)"]), new ScilabString(["0"]), new ScilabString([""]), new ScilabString(["IN_EDP5(t)"]), new ScilabString(["0"]), new ScilabString([""]), new ScilabString(["IN_EDP6(t)"]), new ScilabString(["0"]), new ScilabString([""]), new ScilabString(["IN_EDP7(t)"]), new ScilabString(["0"]), new ScilabString(["0"]), new ScilabString(["0"]), new ScilabString(["0"]), new ScilabString(["0"]), new ScilabString(["0"]), new ScilabString([""]), new ScilabString([""]), new ScilabString([""]), new ScilabString([""]), new ScilabString([""]), new ScilabString([""]), new ScilabString([""]), new ScilabString([""]), new ScilabString(["0"]), new ScilabString(["IN_CL1(t)"]), new ScilabString(["0"]), new ScilabString(["IN_CL2(t)"]), new ScilabString([""]));

        var model = scicos_model();
        model.state = new ScilabDouble(...zeros(10, 1));
        model.sim = list(new ScilabString(["PDE"]), new ScilabDouble([0]));
        model.in = new ScilabDouble([1], [1], [1], [1], [1]);
        model.out = new ScilabDouble([10], [0]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, true]);

        var label = list(this.params_pde, new ScilabDouble(), new ScilabString([""]));

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"PDE\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 3]), model, label, gr_i);
        return new BasicBlock(this.x);
    }
    PDE.prototype.details = function PDE() {
        return this.x;
    }
}

function PerteDP() {

    PerteDP.prototype.define = function PerteDP() {
        this.L = 10;
        this.D = 0.2;
        this.lambda = 0.03;
        this.z1 = 0;
        this.z2 = 0;
        this.p_rho = 0;

        var model = scicos_model();
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.rpar = new ScilabDouble([this.L], [this.D], [this.lambda], [this.z1], [this.z2], [this.p_rho]);
        model.sim = new ScilabString(["PerteDP"]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var mo = new modelica_function();
        mo.model = new ScilabString(["PerteDP"]);
        mo.inputs = new ScilabString(["C1"]);
        mo.outputs = new ScilabString(["C2"]);
        mo.parameters = list(new ScilabString(["L"], ["D"], ["lambda"], ["z1"], ["z2"], ["p_rho"]), new ScilabDouble([this.L], [this.D], [this.lambda], [this.z1], [this.z2], [this.p_rho]));
        model.equations = mo;
        model.in = new ScilabDouble(...ones(size(getData(mo.inputs), "*"), 1));
        model.out = new ScilabDouble(...ones(size(getData(mo.outputs), "*"), 1));

        var exprs = new ScilabString([this.L], [this.D], [this.lambda], [this.z1], [this.z2], [this.p_rho]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"PerteDP\",sz(1),sz(2));"]);
        this.x = standard_define([2, 1], model, exprs, list(gr_i, 0));
        this.x.graphics.in_implicit = new ScilabString(["I"]);
        this.x.graphics.out_implicit = new ScilabString(["I"]);
        return new BasicBlock(this.x);
    }
    PerteDP.prototype.details = function PerteDP() {
        return this.x;
    }
    PerteDP.prototype.get = function PerteDP() {
        var options={
            L:["Longueur du tube : L (m)",this.L.toString().replace(/,/g," ")],
            D:["Diamètre interne du tube : D (m)",this.D.toString().replace(/,/g," ")],
            lambda:["Coefficient de perte de charge-frottement(S.U) : lambda",this.lambda.toString().replace(/,/g," ")],
            z1:["Altitude entrée tuyauterie : z1 (m)",this.z1.toString().replace(/,/g," ")],
            z2:["Altitude sortie tuyauterie : z2 (m)",this.z2.toString().replace(/,/g," ")],
            p_rho:["Si >0, masse volumique imposée fu fluide : p_rho (kg/m3)",this.p_rho.toString().replace(/,/g," ")],
        }
        return options
    }
PerteDP.prototype.set = function PerteDP() {
    this.L = inverse(arguments[0]["L"])
    this.D = inverse(arguments[0]["D"])
    this.lambda = inverse(arguments[0]["lambda"])
    this.z1 = inverse(arguments[0]["z1"])
    this.z2 = inverse(arguments[0]["z2"])
    this.p_rho = inverse(arguments[0]["p_rho"])
    this.x.model.rpar = new ScilabDouble(...this.L,...this.D,...this.lambda,...this.z1,...this.z2,...this.p_rho)
    this.x.model.equations.parameters = list(new ScilabString(["L"], ["D"], ["lambda"], ["z1"], ["z2"], ["p_rho"]), new ScilabDouble(...this.L,...this.D,...this.lambda,...this.z1,...this.z2,...this.p_rho));
    var exprs = new ScilabString([this.L.toString().replace(/,/g, " ")],[this.D.toString().replace(/,/g, " ")],[this.lambda.toString().replace(/,/g, " ")],[this.z1.toString().replace(/,/g, " ")],[this.z2.toString().replace(/,/g, " ")],[this.p_rho.toString().replace(/,/g, " ")])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }

}

function PID() {

    PID.prototype.define = function PID() {
        var scs_m = scicos_diagram({
            version: new ScilabString(["scicos4.2"]),
            props: scicos_params({
                wpar: new ScilabDouble([600, 450, 0, 0, 600, 450]),
                Title: new ScilabString(["PID"]),
                tol: new ScilabDouble([0.0001], [0.000001], [1.000E-10], [100001], [0], [0], [0]),
                tf: new ScilabDouble([100000]),
                context: new ScilabString([" "]),
                void1: new ScilabDouble(),
                options: tlist(["scsopt", "3D", "Background", "Link", "ID", "Cmap"], new ScilabString(["scsopt", "3D", "Background", "Link", "ID", "Cmap"]), list(new ScilabBoolean([true]), new ScilabDouble([33])), new ScilabDouble([8, 1]), new ScilabDouble([1, 5]), list(new ScilabDouble([5, 1]), new ScilabDouble([4, 1])), new ScilabDouble([0.8, 0.8, 0.8])),
                void2: new ScilabDouble(),
                void3: new ScilabDouble(),
                doc: list()
            })
        });
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["INTEGRAL_m"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([318.304, 183.11733]),
                sz: new ScilabDouble([40, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["0"], ["0"], ["0"], ["1"], ["-1"]),
                pin: new ScilabDouble([7]),
                pout: new ScilabDouble([9]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;INTEGRAL_m&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString(["1/s"]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabString(["E"]),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""]),
                out_label: new ScilabString([""]),
                style: new ScilabString(["INTEGRAL_m"])
            }),
            model: scicos_model({
                sim: list(new ScilabString(["integral_func"]), new ScilabDouble([4])),
                in: new ScilabDouble([1]),
                in2: new ScilabDouble([1]),
                intyp: new ScilabDouble([1]),
                out: new ScilabDouble([1]),
                out2: new ScilabDouble([1]),
                outtyp: new ScilabDouble([1]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble([0]),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble(),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([false, true]),
                label: new ScilabString(["1/s"]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["SUMMATION"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([387.97067, 172.85067]),
                sz: new ScilabDouble([40, 60]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1"], ["[1;1;1]"]),
                pin: new ScilabDouble([10], [9], [11]),
                pout: new ScilabDouble([19]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;SUMMATION&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"], ["E"], ["E"]),
                out_implicit: new ScilabString(["E"]),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"], ["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"], ["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""], [""], [""]),
                out_label: new ScilabString([""]),
                style: new ScilabString(["SUMMATION"])
            }),
            model: scicos_model({
                sim: list(new ScilabString(["summation"]), new ScilabDouble([4])),
                in: new ScilabDouble([-1], [-1], [-1]),
                in2: new ScilabDouble([-2], [-2], [-2]),
                intyp: new ScilabDouble([1], [1], [1]),
                out: new ScilabDouble([-1]),
                out2: new ScilabDouble([-2]),
                outtyp: new ScilabDouble([1]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble([1], [1], [1]),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([true, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["GAINBLK"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([321.23733, 235.91733]),
                sz: new ScilabDouble([40, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1"]),
                pin: new ScilabDouble([17]),
                pout: new ScilabDouble([10]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;GAINBLK&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabString(["E"]),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""]),
                out_label: new ScilabString([""]),
                style: new ScilabString(["GAINBLK"])
            }),
            model: scicos_model({
                sim: list(new ScilabString(["gainblk"]), new ScilabDouble([4])),
                in: new ScilabDouble([-1]),
                in2: new ScilabDouble([-2]),
                intyp: new ScilabDouble([1]),
                out: new ScilabDouble([-1]),
                out2: new ScilabDouble([-2]),
                outtyp: new ScilabDouble([1]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble([1]),
                ipar: new ScilabDouble(),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([true, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["DERIV"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([319.03733, 135.45067]),
                sz: new ScilabDouble([40, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabDouble(),
                pin: new ScilabDouble([8]),
                pout: new ScilabDouble([11]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;DERIV&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString(["s"]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabString(["E"]),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""]),
                out_label: new ScilabString([""]),
                style: new ScilabString(["DERIV"])
            }),
            model: scicos_model({
                sim: list(new ScilabString(["deriv"]), new ScilabDouble([4])),
                in: new ScilabDouble([-1]),
                in2: new ScilabDouble([-2]),
                intyp: new ScilabDouble([1]),
                out: new ScilabDouble([-1]),
                out2: new ScilabDouble([-2]),
                outtyp: new ScilabDouble([1]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble(),
                opar: list(),
                blocktype: new ScilabString(["x"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([true, false]),
                label: new ScilabString(["s"]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["GAINBLK"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([255.23733, 183.11733]),
                sz: new ScilabDouble([40, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1"]),
                pin: new ScilabDouble([13]),
                pout: new ScilabDouble([7]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;GAINBLK&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabString(["E"]),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""]),
                out_label: new ScilabString([""]),
                style: new ScilabString(["GAINBLK"])
            }),
            model: scicos_model({
                sim: list(new ScilabString(["gainblk"]), new ScilabDouble([4])),
                in: new ScilabDouble([-1]),
                in2: new ScilabDouble([-2]),
                intyp: new ScilabDouble([1]),
                out: new ScilabDouble([-1]),
                out2: new ScilabDouble([-2]),
                outtyp: new ScilabDouble([1]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble([1]),
                ipar: new ScilabDouble(),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([true, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["GAINBLK"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([255.23733, 135.45067]),
                sz: new ScilabDouble([40, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1"]),
                pin: new ScilabDouble([14]),
                pout: new ScilabDouble([8]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;GAINBLK&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabString(["E"]),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""]),
                out_label: new ScilabString([""]),
                style: new ScilabString(["GAINBLK"])
            }),
            model: scicos_model({
                sim: list(new ScilabString(["gainblk"]), new ScilabDouble([4])),
                in: new ScilabDouble([-1]),
                in2: new ScilabDouble([-2]),
                intyp: new ScilabDouble([1]),
                out: new ScilabDouble([-1]),
                out2: new ScilabDouble([-2]),
                outtyp: new ScilabDouble([1]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble([1]),
                ipar: new ScilabDouble(),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([true, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["SPLIT_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([234.704, 203.11733]),
                sz: new ScilabDouble([0.3333333, 0.3333333]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabDouble(),
                pin: new ScilabDouble([16]),
                pout: new ScilabDouble([16], [17], [0]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;SPLIT_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabString(["E"], ["E"], ["E"]),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"], ["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"], ["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""]),
                out_label: new ScilabString([""], [""], [""]),
                style: new ScilabString(["SPLIT_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["lsplit"]),
                in: new ScilabDouble([-1]),
                in2: new ScilabDouble([1]),
                intyp: new ScilabDouble([1]),
                out: new ScilabDouble([-1], [-1], [-1]),
                out2: new ScilabDouble([1], [1], [1]),
                outtyp: new ScilabDouble([1], [1], [1]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble(),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([true, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["SPLIT_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([233.97067, 203.11733]),
                sz: new ScilabDouble([0.3333333, 0.3333333]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabDouble(),
                pin: new ScilabDouble([21]),
                pout: new ScilabDouble([18], [19], [0]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;SPLIT_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabString(["E"], ["E"], ["E"]),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"], ["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"], ["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""]),
                out_label: new ScilabString([""], [""], [""]),
                style: new ScilabString(["SPLIT_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["lsplit"]),
                in: new ScilabDouble([-1]),
                in2: new ScilabDouble([1]),
                intyp: new ScilabDouble([1]),
                out: new ScilabDouble([-1], [-1], [-1]),
                out2: new ScilabDouble([1], [1], [1]),
                outtyp: new ScilabDouble([1], [1], [1]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble(),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([true, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["OUT_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([456.5421, 192.85067]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1"]),
                pin: new ScilabDouble([19]),
                pout: new ScilabDouble(),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;OUT_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabDouble(),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""]),
                style: new ScilabString(["OUT_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["output"]),
                in: new ScilabDouble([-1]),
                in2: new ScilabDouble([1]),
                intyp: new ScilabDouble([-1]),
                out: new ScilabDouble(),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble(),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble([1]),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["IN_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([193.97067, 193.11733]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1"]),
                pin: new ScilabDouble(),
                pout: new ScilabDouble([21]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;IN_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabDouble(),
                out_implicit: new ScilabString(["E"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_label: new ScilabString([""]),
                style: new ScilabString(["IN_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["input"]),
                in: new ScilabDouble(),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble(),
                out: new ScilabDouble([-1]),
                out2: new ScilabDouble([1]),
                outtyp: new ScilabDouble([-1]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble([1]),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));

        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([303.80876], [309.73257]),
            yy: new ScilabDouble([203.11733], [203.11733]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([5, 1, 0]),
            to: new ScilabDouble([1, 1, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([303.80876], [310.4659]),
            yy: new ScilabDouble([155.45067], [155.45067]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([6, 1, 0]),
            to: new ScilabDouble([4, 1, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([366.87543], [379.39924]),
            yy: new ScilabDouble([203.11733], [202.85067]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([1, 1, 0]),
            to: new ScilabDouble([2, 2, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([369.80876], [379.39924], [379.39924]),
            yy: new ScilabDouble([255.91733], [255.91733], [217.85067]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([3, 1, 0]),
            to: new ScilabDouble([2, 1, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([367.60876], [379.39924], [379.39924]),
            yy: new ScilabDouble([155.45067], [155.45067], [187.85067]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([4, 1, 0]),
            to: new ScilabDouble([2, 3, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([234.704], [246.6659]),
            yy: new ScilabDouble([203.11733], [203.11733]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([12, 1, 0]),
            to: new ScilabDouble([5, 1, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([234.704], [234.704], [246.6659]),
            yy: new ScilabDouble([203.11733], [155.45067], [155.45067]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([12, 2, 0]),
            to: new ScilabDouble([6, 1, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([233.97067], [234.704]),
            yy: new ScilabDouble([203.11733], [203.11733]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([15, 1, 0]),
            to: new ScilabDouble([12, 1, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([233.97067], [233.97067], [312.6659]),
            yy: new ScilabDouble([203.11733], [255.91733], [255.91733]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([15, 2, 0]),
            to: new ScilabDouble([3, 1, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([436.5421], [456.5421]),
            yy: new ScilabDouble([202.85067], [202.85067]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([2, 1, 0]),
            to: new ScilabDouble([18, 1, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([213.97067], [233.97067]),
            yy: new ScilabDouble([203.11733], [203.11733]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([20, 1, 0]),
            to: new ScilabDouble([15, 1, 1])
        }));

        var model = scicos_model();
        model.sim = new ScilabString(["csuper"]);
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble([1]);
        model.outtyp = new ScilabDouble([1]);
        model.blocktype = new ScilabString(["h"]);
        model.firing = new ScilabBoolean([false]);
        model.dep_ut = new ScilabBoolean([false, false]);
        model.rpar = scs_m;

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"PID\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, new ScilabDouble(), gr_i);
        return new BasicBlock(this.x);
    }
    PID.prototype.details = function PID() {
        return this.x;
    }
}
function PNP() {
    
    PNP.prototype.define = function PNP() {
        this.ModelName = "PNP";
        this.PrametersValue = [[50],[0.1],[0],[0.02],[1.200e-10],[5.000e-09],[1.000e-12],[4.000e-13],[5.000e-13],[0.8],[0.4],[0.8],[0.333],[1.000e-15],[1.000e-15],[0.02585],[40]];
        this.ParametersName = [["Bf"],["Br"],["Is"],["Vak"],["Tauf"],["Taur"],["Ccs"],["Cje"],["Cjc"],["Phie"],["Me"],["Phic"],["Mc"],["Gbc"],["Gbe"],["Vt"],["EMinMax"]];

        var model = scicos_model();
        this.Typein = [];
        this.Typeout = [];
        this.MI = [];
        this.MO = [];
        this.P = [[100, 90, -2, 0], [0, 50, 2, 0], [100, 10, -2, 0]];
        this.PortName = [["C"], ["B"], ["E"]];

        for (var i = 0; i < size(this.P, "r"); i++) {
            if (this.P[i][2] == 1) {
                this.Typein.push(["E"]);
                this.MI.push(this.PortName[i]);
            }

            if (this.P[i][2] == 2) {
                this.Typein.push(["I"]);
                this.MI.push(this.PortName[i]);
            }
            if (this.P[i][2] == -1) {
                this.Typeout.push(["E"]);
                this.MO.push(this.PortName[i]);
            }
            if (this.P[i][2] == -2) {
                this.Typeout.push(["I"]);
                this.MO.push(this.PortName[i]);
            }
        }

        var mo = new modelica_function();
        model.sim = new ScilabString([this.ModelName]);
        mo.inputs = new ScilabString(...this.MI);
        mo.outputs = new ScilabString(...this.MO);
        model.rpar = new ScilabDouble(...this.PrametersValue);
        
        var arr = [];
        arr.push(zeros(getData(this.ParametersName)));
        mo.parameters = list(new ScilabString(...this.ParametersName), new ScilabDouble(...this.PrametersValue), new ScilabDouble(...math.transpose(arr)));
        var exprs = new ScilabString(["50"], ["0.1"], ["1.e-16"], ["0.02"], ["0.12e-9"], ["5e-9"], ["1e-12"], ["0.4e-12"], ["0.5e-12"], ["0.8"], ["0.4"], ["0.8"], ["0.333"], ["1e-15"], ["1e-15"], ["0.02585"], ["40"]);
        var gr_i = "xstringb(orig(1),orig(2),\"PNP\",sz(1),sz(2));"
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, true]);
        mo.model = new ScilabString([this.ModelName]);
        model.equations = mo;
        model.in = new ScilabDouble(...ones(size(this.MI, "*"), 1));
        model.out = new ScilabDouble(...ones(size(this.MO, "*"), 1));
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, list(new ScilabString([gr_i]), new ScilabDouble([0])));
        this.x.graphics.in_implicit = new ScilabDouble(...this.Typein);
        this.x.graphics.out_implicit = new ScilabDouble(...this.Typeout);

        return new BasicBlock(this.x);
    }

    PNP.prototype.details = function PNP() {
        return this.x;
    }
    PNP.prototype.get = function PNP() {
        var options={
            Bf:["Bf  : Forward beta","50"],
            Br:["Br  : Reverse beta","0.1"],
            Is:["Is  : Transport saturation current","1.e-16"],
            Vak:["Vak : Early voltage (inverse), 1/Volt","0.02"],
            Tauf:["Tauf: Ideal forward transit time","0.12e-9"],
            Taur:["Taur: Ideal reverse transit time","5e-9"],
            Ccs:["Ccs : Collector-substrat(ground) cap.","1e-12"],
            Cje:["Cje : Base-emitter zero bias depletion cap.","0.4e-12"],
            Cjc:["Cjc : Base-coll. zero bias depletion cap.","0.5e-12"],
            Phie:["Phie: Base-emitter diffusion voltage","0.8"],
            Me:["Me  : Base-emitter gradation exponent","0.4"],
            Phic:["Phic: Base-collector diffusion voltage","0.8"],
            Mc:["Mc  : Base-collector gradation exponent","0.333"],
            Gbc:["Gbc : Base-collector conductance","1e-15"],
            Gbe:["Gbe : Base-emitter conductance","1e-15"],
            Vt:["Vt  : Voltage equivalent of temperature","0.02585"],
            EMinMax:["EMinMax: if x > EMinMax, the exp(x) function is linearized","40"],
        }
        return options
    }
PNP.prototype.set = function PNP() {
    this.Bf = parseFloat((arguments[0]["Bf"]))
    this.Br = parseFloat((arguments[0]["Br"]))
    this.Is = parseFloat((arguments[0]["Is"]))
    this.Vak = parseFloat((arguments[0]["Vak"]))
    this.Tauf = parseFloat((arguments[0]["Tauf"]))
    this.Taur = parseFloat((arguments[0]["Taur"]))
    this.Ccs = parseFloat((arguments[0]["Ccs"]))
    this.Cje = parseFloat((arguments[0]["Cje"]))
    this.Cjc = parseFloat((arguments[0]["Cjc"]))
    this.Phie = parseFloat((arguments[0]["Phie"]))
    this.Me = parseFloat((arguments[0]["Me"]))
    this.Phic = parseFloat((arguments[0]["Phic"]))
    this.Mc = parseFloat((arguments[0]["Mc"]))
    this.Gbc = parseFloat((arguments[0]["Gbc"]))
    this.Gbe = parseFloat((arguments[0]["Gbe"]))
    this.Vt = parseFloat((arguments[0]["Vt"]))
    this.EMinMax = parseFloat((arguments[0]["EMinMax"]))
    this.ParametersName = [["Bf"],["Br"],["Is"],["Vak"],["Tauf"],["Taur"],["Ccs"],["Cje"],["Cjc"],["Phie"],["Me"],["Phic"],["Mc"],["Gbc"],["Gbe"],["Vt"],["EMinMax"]];
    this.ParametersValue = new ScilabDouble([this.Bf],[this.Br],[this.Is],[this.Vak],[this.Tauf],[this.Taur],[this.Ccs],[this.Cje],[this.Cjc],[this.Phie],[this.Me],[this.Phic],[this.Mc],[this.Gbc],[this.Gbe],[this.Vt],[this.EMinMax])
    var arr = [];
    arr.push(zeros(getData(this.ParametersName)));
    this.x.model.equations.parameters = list(new ScilabString(...this.ParametersName), new ScilabDouble(...this.PrametersValue), new ScilabDouble(...math.transpose(arr)));
    var exprs = new ScilabString([this.Bf],[this.Br],[this.Is],[this.Vak],[this.Tauf],[this.Taur],[this.Ccs],[this.Cje],[this.Cjc],[this.Phie],[this.Me],[this.Phic],[this.Mc],[this.Gbc],[this.Gbe],[this.Vt],[this.EMinMax])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function POSTONEG_f() {

    POSTONEG_f.prototype.define = function POSTONEG_f() {
        this.rpar = [[-1], [-1], [-1], [0]];

        var model = scicos_model();
        model.sim = list(new ScilabString(["zcross"]), new ScilabDouble([1]));
        model.nzcross = new ScilabDouble([1]);
        model.in = new ScilabDouble([1]);
        model.evtout = new ScilabDouble([1]);
        model.rpar = new ScilabDouble([-1], [-1], [-1], [0]);
        model.blocktype = new ScilabString(["z"]);
        model.dep_ut = new ScilabBoolean([true, false]);
        model.firing = new ScilabDouble([-1]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"POSTONEG_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, [], gr_i);
        return new BasicBlock(this.x);
    }
    POSTONEG_f.prototype.details = function POSTONEG_f() {
        return this.x;
    }
}

function PotentialSensor() {
    PotentialSensor.prototype.get = function PotentialSensor() {
        alert("parameters can not be changed")
    }

    PotentialSensor.prototype.define = function PotentialSensor() {

        var model = scicos_model();
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.rpar = new ScilabDouble();
        model.sim = new ScilabString(["PotentialSensor"]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var mo = new modelica_function();
        mo.model = new ScilabString(["PotentialSensor"]);
        mo.inputs = new ScilabString(["p"]);
        mo.outputs = new ScilabString(["v"]);
        model.equations = mo;

        var exprs = new ScilabString([""]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"PotentialSensor\",sz(1),sz(2));"]);
        this.x = standard_define([2, 2], model, exprs, list(gr_i, 0));
        this.x.graphics.in_implicit = new ScilabString(["I"]);
        this.x.graphics.out_implicit = new ScilabString(["E"]);
        return new BasicBlock(this.x);
    }
    PotentialSensor.prototype.details = function PotentialSensor() {
        return this.x;
    }
}

function POWBLK_f() {

    POWBLK_f.prototype.define = function POWBLK_f() {
        this.in = 1;
        this.a = 1.5;

        var model = scicos_model();
        model.sim = new ScilabString(["powblk"]);
        model.in = new ScilabDouble([-1]);
        model.out = new ScilabDouble([-1]);
        model.rpar = new ScilabDouble([this.a]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([this.a]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"POWBLK_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    POWBLK_f.prototype.details = function POWBLK_f() {
        return this.x;
    }
    POWBLK_f.prototype.get = function POWBLK_f() {
    if(this.a == undefined || this.a == null){
        this.a = "1.5"
    }
        var options={
            a:["to the power of",this.a],
        }
        return options
    }
POWBLK_f.prototype.set = function POWBLK_f() {
    this.a = parseFloat((arguments[0]["a"]))
    if(Number.isInteger(this.a)){
        this.x.model.ipar = new ScilabDouble([this.a])
        this.x.model.rpar = new ScilabDouble()
    }
    else{
        this.x.model.rpar = new ScilabDouble([this.a])
        this.x.model.ipar = new ScilabDouble()
    }   
    this.x.model.firing = new ScilabDouble()
    var exprs = new ScilabString([this.a])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function PRODUCT() {

    PRODUCT.prototype.define = function PRODUCT() {
        this.sgn = [[1],[-1]];

        var model = scicos_model();
        model.sim = list(new ScilabString(["product"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([-1], [-1]);
        model.out = new ScilabDouble([-1]);
        model.ipar = new ScilabDouble(...this.sgn);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([sci2exp(this.sgn)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),&quot;PRODUCT&quot;,sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 3]), model, exprs, gr_i);
        return new Product(this.x);
    }
    PRODUCT.prototype.details = function PRODUCT() {
        return this.x;
    }
    PRODUCT.prototype.get = function PRODUCT() {
        var options={
            sgn:["Number of inputs or sign vector",this.sgn.toString().replace(/,/g," ")],
        }
        return options
    }
PRODUCT.prototype.set = function PRODUCT() {
    this.sgn = inverse(arguments[0]["sgn"])
    if(size(this.sgn,1) == 1){
        if(this.sgn[0] == 1){
            this.in = -1
            this.sgn = []
            this.nout = 1
        }else{
            this.in = ones(this.sgn[0],1)
            for (var i = this.in.length - 1; i >= 0; i--) {
                this.in[i] = -1*this.in[i]
            }
            this.sgn = ones(this.sgn[0],1)
            this.nout = -1
        }
    }
    
    this.x.model.ipar = new ScilabDouble(...this.sgn);
    var exprs = new ScilabString([sci2exp(this.sgn)],[this.divideByZero])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function PROD_f() {

    PROD_f.prototype.get = function PROD_f() {
        alert("parameters could not be set")
    return new RoundBlock(this.x);
    }

    PROD_f.prototype.define = function PROD_f() {

        var model = scicos_model();
        model.sim = list(new ScilabString(["prod"]), new ScilabDouble([2]));
        model.in = new ScilabDouble([-1], [-1]);
        model.out = new ScilabDouble([-1]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        this.x = new standard_define(new ScilabDouble([1, 1]), model, new ScilabDouble(), new ScilabString());
        return new RoundBlock(this.x);
    }
    PROD_f.prototype.details = function PROD_f() {
        return this.x;
    }
}

function PuitsP() {

    PuitsP.prototype.define = function PuitsP() {
        this.P0 = 100000;
        this.T0 = 290;
        this.H0 = 100000;
        this.option_temperature = 1;

        var model = scicos_model();
        model.rpar = new ScilabDouble([this.P0], [this.T0], [this.H0], [this.option_temperature]);
        model.sim = new ScilabString(["Puits"]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var mo = new modelica_function();
        mo.model = new ScilabString(["Puits"]);
        mo.inputs = new ScilabString(["C"]);
        mo.outputs = new ScilabDouble();
        mo.parameters = list(new ScilabString(["P0"], ["T0"], ["H0"], ["option_temperature"]), new ScilabDouble([this.P0], [this.T0], [this.H0], [this.option_temperature]));
        model.equations = mo;
        model.in = new ScilabDouble(...ones(size(getData(mo.inputs), "*"), 1));

        var exprs = new ScilabString([this.P0], [this.T0], [this.H0], [this.option_temperature]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"PuitsP\",sz(1),sz(2));"]);
        this.x = standard_define([2.5, 2], model, exprs, list(gr_i, new ScilabDouble(0)));
        this.x.graphics.in_implicit = new ScilabString(["I"]);
        return new BasicBlock(this.x);
    }
    PuitsP.prototype.details = function PuitsP() {
        return this.x;
    }
PuitsP.prototype.get = function PuitsP() {
        var options={
            P0:["Pression de la source : P0 (Pa)",this.P0.toString().replace(/,/g," ")],
            T0:["Temperature de la source : T0 (K)",this.T0.toString().replace(/,/g," ")],
            H0:["Enthalpie spécifique de la source : H0 (J/kg)",this.H0.toString().replace(/,/g," ")],
            option_temperature:["1:température fixée - 2:enthalpie fixée : option_temperature",this.option_temperature.toString().replace(/,/g," ")],
        }
        return options
    }
PuitsP.prototype.set = function PuitsP() {
    this.P0 = inverse(arguments[0]["P0"])
    this.T0 = inverse(arguments[0]["T0"])
    this.H0 = inverse(arguments[0]["H0"])
    this.option_temperature = inverse(arguments[0]["option_temperature"])
    this.x.model.rpar = new ScilabDouble(...this.P0,...this.T0,...this.H0,...this.option_temperature)
    this.x.model.equations.parameters = list(new ScilabString(["P0"], ["T0"], ["H0"], ["option_temperature"]), new ScilabDouble(...this.P0,...this.T0,...this.H0,...this.option_temperature));
    var exprs = new ScilabString([this.P0.toString().replace(/,/g, " ")],[this.T0.toString().replace(/,/g, " ")],[this.H0.toString().replace(/,/g, " ")],[this.option_temperature.toString().replace(/,/g, " ")])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function PULSE_SC() {

    PULSE_SC.prototype.define = function PULSE_SC() {
        var scs_m_1 = scicos_diagram({
            version: new ScilabString(["scicos4.2"]),
            props: scicos_params({
                wpar: new ScilabDouble([600, 450, 0, 0, 600, 450]),
                Title: new ScilabString(["SuperBlock"]),
                tol: new ScilabDouble([0.0001], [0.000001], [Math.pow(10, -10)], [100001], [0], [0], [0]),
                tf: new ScilabDouble([10]),
                context: new ScilabString(["E2=E+W/100*F"], ["if (W<0 | W>100) then error(''Width must be between 0 and 100'');end"], ["if (E2 >= F) then error (''Offset must be lower than (frequency*(1-Width/100))''); end"]),
                void1: new ScilabDouble(),
                options: tlist(["scsopt", "3D", "Background", "Link", "ID", "Cmap"], new ScilabString(["scsopt", "3D", "Background", "Link", "ID", "Cmap"]), list(new ScilabBoolean([true]), new ScilabDouble([33])), new ScilabDouble([8, 1]), new ScilabDouble([1, 5]), list(new ScilabDouble([5, 1]), new ScilabDouble([4, 1])), new ScilabDouble([0.8, 0.8, 0.8])),
                void2: new ScilabDouble(),
                void3: new ScilabDouble(),
                doc: list()
            })
        });
        scs_m_1.objs.push(scicos_block({
            gui: new ScilabString(["CONST_m"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([30.801202, 158.91733]),
                sz: new ScilabDouble([40, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["A"]),
                pin: new ScilabDouble(),
                pout: new ScilabDouble([5]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;CONST_m&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabDouble(),
                out_implicit: new ScilabString(["E"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_label: new ScilabString([""]),
                style: new ScilabString(["CONST_m"])
            }),
            model: scicos_model({
                sim: list(new ScilabString(["cstblk4_m"]), new ScilabDouble([4])),
                in: new ScilabDouble(),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble(),
                out: new ScilabDouble([1]),
                out2: new ScilabDouble([1]),
                outtyp: new ScilabDouble([1]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble(),
                opar: list(new ScilabDouble([1])),
                blocktype: new ScilabString(["d"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m_1.objs.push(scicos_block({
            gui: new ScilabString(["Ground_g"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([31.534535, 215.384]),
                sz: new ScilabDouble([40, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabDouble(),
                pin: new ScilabDouble(),
                pout: new ScilabDouble([4]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;Ground_g&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabDouble(),
                out_implicit: new ScilabString(["E"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_label: new ScilabString([""]),
                style: new ScilabString(["Ground_g"])
            }),
            model: scicos_model({
                sim: list(new ScilabString(["cstblk4_m"]), new ScilabDouble([4])),
                in: new ScilabDouble(),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble(),
                out: new ScilabDouble([1]),
                out2: new ScilabDouble([1]),
                outtyp: new ScilabDouble([-1]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble(),
                opar: list(new ScilabDouble([0])),
                blocktype: new ScilabString(["d"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m_1.objs.push(scicos_block({
            gui: new ScilabString(["SELECT_m"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([106.00652, 186.09381]),
                sz: new ScilabDouble([40, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["-1"], ["2"], ["1"]),
                pin: new ScilabDouble([4], [5]),
                pout: new ScilabDouble([11]),
                pein: new ScilabDouble([9], [8]),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;SELECT_m&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"], ["E"]),
                out_implicit: new ScilabString(["E"]),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"], ["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""], [""]),
                out_label: new ScilabString([""]),
                style: new ScilabString(["SELECT_m"])
            }),
            model: scicos_model({
                sim: list(new ScilabString(["selector_m"]), new ScilabDouble([4])),
                in: new ScilabDouble([-1], [-1]),
                in2: new ScilabDouble([-2], [-2]),
                intyp: new ScilabDouble([-1], [-1]),
                out: new ScilabDouble([-1]),
                out2: new ScilabDouble([-2]),
                outtyp: new ScilabDouble([-1]),
                evtin: new ScilabDouble([1], [1]),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble([1]),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble(),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([true, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m_1.objs.push(scicos_block({
            gui: new ScilabString(["SampleCLK"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([82.349744, 274.21741]),
                sz: new ScilabDouble([60, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["F"], ["E2"]),
                pin: new ScilabDouble(),
                pout: new ScilabDouble(),
                pein: new ScilabDouble(),
                peout: new ScilabDouble([9]),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;SampleCLK&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabDouble(),
                out_implicit: new ScilabDouble(),
                style: new ScilabString(["SampleCLK"])
            }),
            model: scicos_model({
                sim: new ScilabString(["sampleclk"]),
                in: new ScilabDouble(),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble(),
                out: new ScilabDouble(),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble(),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble([1]),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble([1], [0.4]),
                ipar: new ScilabDouble(),
                opar: list(),
                blocktype: new ScilabString(["d"]),
                firing: new ScilabDouble([-1]),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m_1.objs.push(scicos_block({
            gui: new ScilabString(["SampleCLK"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([160.48879, 274.21741]),
                sz: new ScilabDouble([60, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["F"], ["E"]),
                pin: new ScilabDouble(),
                pout: new ScilabDouble(),
                pein: new ScilabDouble(),
                peout: new ScilabDouble([8]),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;SampleCLK&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabDouble(),
                out_implicit: new ScilabDouble(),
                style: new ScilabString(["SampleCLK"])
            }),
            model: scicos_model({
                sim: new ScilabString(["sampleclk"]),
                in: new ScilabDouble(),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble(),
                out: new ScilabDouble(),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble(),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble([1]),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble([1], [0.1]),
                ipar: new ScilabDouble(),
                opar: list(),
                blocktype: new ScilabString(["d"]),
                firing: new ScilabDouble([-1]),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m_1.objs.push(scicos_block({
            gui: new ScilabString(["OUT_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([174.57795, 196.09381]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1"]),
                pin: new ScilabDouble([11]),
                pout: new ScilabDouble(),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;OUT_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabDouble(),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""]),
                style: new ScilabString(["OUT_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["output"]),
                in: new ScilabDouble([-1]),
                in2: new ScilabDouble([-2]),
                intyp: new ScilabDouble([-1]),
                out: new ScilabDouble(),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble(),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble([1]),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m_1.objs.push(scicos_link({
            xx: new ScilabDouble([80.105964], [97.43509], [97.43509]),
            yy: new ScilabDouble([235.384], [235.384], [212.76048]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([2, 1, 0]),
            to: new ScilabDouble([3, 1, 1])
        }));
        scs_m_1.objs.push(scicos_link({
            xx: new ScilabDouble([79.372631], [97.43509], [97.43509]),
            yy: new ScilabDouble([178.91733], [178.91733], [199.42714]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([1, 1, 0]),
            to: new ScilabDouble([3, 2, 1])
        }));
        scs_m_1.objs.push(scicos_link({
            xx: new ScilabDouble([190.48879], [190.48879], [132.67318], [132.67318]),
            yy: new ScilabDouble([274.21741], [240.99048], [240.99048], [231.80809]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([7, 1, 0]),
            to: new ScilabDouble([3, 2, 1])
        }));
        scs_m_1.objs.push(scicos_link({
            xx: new ScilabDouble([112.34974], [112.34974], [119.33985], [119.33985]),
            yy: new ScilabDouble([274.21741], [248.21372], [248.21372], [231.80809]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([6, 1, 0]),
            to: new ScilabDouble([3, 1, 1])
        }));
        scs_m_1.objs.push(scicos_link({
            xx: new ScilabDouble([154.57795], [174.57795]),
            yy: new ScilabDouble([206.09381], [206.09381]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([3, 1, 0]),
            to: new ScilabDouble([10, 1, 1])
        }));

        var model = scicos_model();
        model.sim = new ScilabString(["csuper"]);
        model.in = new ScilabDouble();
        model.in2 = new ScilabDouble();
        model.intyp = new ScilabDouble([1]);
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble([-2]);
        model.outtyp = new ScilabDouble([-1]);
        model.evtin = new ScilabDouble();
        model.evtout = new ScilabDouble();
        model.state = new ScilabDouble();
        model.dstate = new ScilabDouble();
        model.odstate = list();
        model.rpar = scs_m_1;
        model.ipar = new ScilabDouble([1]);
        model.opar = list();
        model.blocktype = new ScilabString(["h"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([false, false]);
        model.label = new ScilabString([""]);
        model.nzcross = new ScilabDouble([0]);
        model.nmode = new ScilabDouble([0]);
        model.equations = list();
        this.E = 0.1;
        this.W = 30;
        this.F = 1;
        this.A = 1;
        var exprs = new ScilabString([sci2exp(this.E)], [sci2exp(this.W)], [sci2exp(this.F)], [sci2exp(this.A)]);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"PULSE_SC\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 3]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    PULSE_SC.prototype.details = function PULSE_SC() {
        return this.x;
    }
}





function QUANT_f() {

    QUANT_f.prototype.define = function QUANT_f() {
        this.pas = 0.1;
        this.meth = 1;

        var model = scicos_model();
        model.sim = new ScilabString(["qzrnd"]);
        model.in = new ScilabDouble([-1]);
        model.out = new ScilabDouble([-1]);
        model.rpar = new ScilabDouble([this.pas]);
        model.ipar = new ScilabDouble([this.meth]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([this.pas], [this.meth]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"QUANT_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    QUANT_f.prototype.details = function QUANT_f() {
        return this.x;
    }
    QUANT_f.prototype.get = function QUANT_f() {
        var options={
            pas:["Step",this.pas],
            meth:["Quantization Type (1-4)",this.meth],
        }
        return options
    }
    QUANT_f.prototype.set = function QUANT_f() {
        this.pas = parseFloat((arguments[0]["pas"]))
        this.meth = parseFloat((arguments[0]["meth"]))
        this.x.model.rpar = new ScilabDouble([this.pas])
        this.x.model.ipar = new ScilabDouble([this.meth]);
        switch(this.meth){
            case 1:
                this.x.model.sim = new ScilabDouble(["qzrnd"])
                break;
            case 2:
                this.x.model.sim = new ScilabDouble(["qztrn"])
                break;
            case 3:
                this.x.model.sim = new ScilabDouble(["qzflr"])
                break;
            case 4:
                this.x.model.sim = new ScilabDouble(["qzcel"])
                break;
        }
        var exprs = new ScilabString([this.pas], [this.meth])
        this.x.graphics.exprs = exprs
        return new BasicBlock(this.x)
    }
}

function RAMP() {

    RAMP.prototype.define = function RAMP() {
        this.slope = 0;
        this.iout = 0;
        this.stt = 0;
        this.rpar = [[this.slope], [this.stt], [this.iout]];

        var model = scicos_model();
        model.sim = list(new ScilabString(["ramp"]), new ScilabDouble([4]));
        model.in = new ScilabDouble();
        model.out = new ScilabDouble([1]);
        model.rpar = new ScilabDouble(...this.rpar);
        model.blocktype = new ScilabString(["c"]);
        model.nmode = new ScilabDouble([1]);
        model.nzcross = new ScilabDouble([1]);
        model.dep_ut = new ScilabBoolean([false, true]);

        var exprs = new ScilabString(...this.rpar);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"RAMP\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    RAMP.prototype.details = function RAMP() {
        return this.x;
    }
    RAMP.prototype.get = function RAMP() {
        var options={
            slope:["Slope",this.slope],
            stt:["Start Time",this.stt],
            iout:["Initial Value",this.iout]
        }
        return options
    }
RAMP.prototype.set = function RAMP() {
    this.slope = parseFloat((arguments[0]["slope"]))
    this.stt = parseFloat((arguments[0]["stt"]))
    this.iout = parseFloat((arguments[0]["iout"]))
    this.x.model.rpar = new ScilabDouble([this.slope],[this.stt],[this.iout])
    var exprs = new ScilabString([this.slope],[this.stt],[this.iout])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function RAND_m() {

    RAND_m.prototype.define = function RAND_m() {
        this.a = 0;
        this.b = 1;
        this.dt = 0;
        this.flag = 0;
        this.function_name = "rndblk_m";
        this.funtyp = 4;

        var model = scicos_model();
        model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([this.funtyp]));
        model.in = new ScilabDouble();
        model.in2 = new ScilabDouble();
        model.intyp = new ScilabDouble();
        model.out = new ScilabDouble([1]);
        model.out2 = new ScilabDouble([1]);
        model.outtyp = new ScilabDouble([1]);
        model.evtin = new ScilabDouble([1]);
        model.evtout = new ScilabDouble();
        model.state = new ScilabDouble();
        model.dstate = new ScilabDouble([parseFloat(Math.random() * (10000000-1))], [0 * this.a]);
        model.rpar = new ScilabDouble([this.a, this.b]);
        model.ipar = new ScilabDouble([this.flag]);
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([sci2exp(1)], [this.flag], [sci2exp([this.a])], [sci2exp([this.b])], [sci2exp([parseFloat(getData(model.dstate)[0]), parseFloat(Math.random() * 10000000)])]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"RAND_m\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    RAND_m.prototype.details = function RAND_m() {
        return this.x;
    }
    RAND_m.prototype.get = function RAND_m() {
        if(this.typ == undefined || this.typ == null){
            this.typ = "1"
        }
        if(this.seed_c == undefined || this.seed_c == null){
            this.seed_c = "["+parseFloat(Math.random() * (10000000-1)).toString()+" "+parseFloat(Math.random() * (10000000-1)).toString()+  "]"
        }
        var options={
            typ:["Datatype(1=real double  2=complex)",this.typ],
            flag:["flag",this.flag],
            a:["A",this.a.toString().replace(/,/g," ")],
            b:["B",this.b.toString().replace(/,/g," ") ],
            seed_c:["SEED", this.seed_c.toString().replace(/,/g," ")],
        }
        return options
    }
RAND_m.prototype.set = function RAND_m() {
    this.typ = parseFloat((arguments[0]["typ"]))
    this.flag = parseFloat((arguments[0]["flag"]))
    this.a = inverse(arguments[0]["a"])
    this.b = inverse(arguments[0]["b"])
    this.seed_c = inverse(arguments[0]["seed_c"])
    if(this.typ == 1){
        this.function_name = "rndblk_m"
        this.x.model.rpar = new ScilabDouble(...this.a,...this.b)
    }
    else if(this.typ == 2){
        alert("complex numbers not supported")
    }
    this.x.model.sim = list(new ScilabString([this.function_name]),new ScilabDouble([4]))
    this.x.model.ipar = new ScilabDouble([this.flag]);
    var exprs = new ScilabString([sci2exp(this.typ)],[this.flag],[sci2exp(this.a)],[sci2exp(this.b)],[sci2exp(this.seed_c)])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function RATELIMITER() {

    RATELIMITER.prototype.define = function RATELIMITER() {
        this.minp = -1;
        this.maxp = 1;
        this.rpar = [[this.maxp], [this.minp]];

        var model = scicos_model();
        model.sim = list(new ScilabString(["ratelimiter"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.rpar = new ScilabDouble(...this.rpar);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([this.maxp], [this.minp]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"RATELIMITER\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3.5, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    RATELIMITER.prototype.details = function RATELIMITER() {
        return this.x;
    }
RATELIMITER.prototype.get = function RATELIMITER() {
        var options={
            maxp:["max slope",this.maxp],
            minp:["min slope",this.minp],
        }
        return options
    }
RATELIMITER.prototype.set = function RATELIMITER() {
    this.maxp = parseFloat((arguments[0]["maxp"]))
    this.minp = parseFloat((arguments[0]["minp"]))
    var rpar = new ScilabDouble([this.maxp],[this.minp])
    this.x.model.rpar = new ScilabDouble(...this.rpar);
    var exprs = new ScilabString([this.maxp],[this.minp])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function READAU_f() {

    READAU_f.prototype.define = function READAU_f() {
        this.frmt = "uc ";
        this.fname = "test.au";
        this.lunit = 0;
        this.N = 20;
        this.M = 1;
        this.tmask = [];
        this.swap = 0;
        this.offset = 1;
        this.outmask = 1;
        this.ievt = 0;
        this.nout = size(this.outmask, "*");
        var model = scicos_model();
        model.sim = list(new ScilabString(["readau"]), new ScilabDouble([2]));
        model.out = new ScilabDouble([this.nout]);
        model.evtin = new ScilabDouble([1]);
        model.dstate = new ScilabDouble([1], [1], [this.lunit], ...zeros(this.N * this.M, 1));
        model.ipar = new ScilabDouble([this.fname.length], ..._str2code(this.frmt), [this.ievt], [this.N], [this.M], [this.swap], [this.offset], ..._str2code(this.fname), [this.outmask]);
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([this.fname], [this.N], [this.swap]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"READAU_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([5, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    READAU_f.prototype.details = function READAU_f() {
        return this.x;
    }
}
function READC_f() {

    READC_f.prototype.define = function READC_f() {
        this.frmt = "d  ";
        this.fname = "foo";
        this.lunit = 0;
        this.N = 20;
        this.M = 1;
        this.rpar = [];
        this.tmask = 0;
        this.swap = 0;
        this.offset = 1;
        this.outmask = 1;
        this.ievt = 0;
        this.nout = size(this.outmask, "*");

        var ipar = new ScilabDouble([this.fname.length], ..._str2code(this.frmt), [this.ievt], [this.N], [this.M], [this.swap], [this.offset], ..._str2code(this.fname), [this.tmask], [this.outmask]);

        var model = scicos_model();
        model.sim = list(new ScilabString(["readc"]), new ScilabDouble([2]));
        model.out = new ScilabDouble([this.nout]);
        model.evtin = new ScilabDouble([1]);
        model.evtout = new ScilabDouble();
        model.dstate = new ScilabDouble([1], [1], [this.lunit], ...zeros(this.N * this.M, 1));
        model.ipar = ipar;
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble([-1]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString(["[]"], [this.outmask], [this.fname], [this.frmt], [this.M], [this.N], [this.offset], [this.swap]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"READC_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([4, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    READC_f.prototype.details = function READC_f() {
        return this.x;
    }
}
function REGISTER() {

    REGISTER.prototype.define = function REGISTER() {
        this.z0 = new ScilabDouble(...zeros(10, 1));

        var model = scicos_model();
        model.sim = list(new ScilabString(["delay4"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.evtin = new ScilabDouble([1]);
        model.dstate = this.z0;
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString(this.z0);

        var gr_i = ["xstringb(orig(1),orig(2),\"REGISTER\",sz(1),sz(2));"];
        this.x = new standard_define(new ScilabDouble([3,2]), model, exprs, gr_i);
        return new BasicBlock(this.x);

    }

    REGISTER.prototype.details = function REGISTER() {
        return this.x;
    }
}
function REGISTER_f () {

    REGISTER_f.prototype.internal = function REGISTER_f() {
        this.z0 = zeros(10,1);
    
        var model = scicos_model();
        model.sim = new ScilabString(["delay"]);
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.evtin = new ScilabDouble([1]);
        model.dstate= new ScilabDouble(...this.z0);
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([false,false]);
    
        var exprs = new ScilabString([this.z0.toString().replace(/,/g, ";")]);
    
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"REGISTER_f\",sz(1),sz(2));"]);
        var block=new standard_define(new ScilabDouble([2.5,2.5]),model,exprs,gr_i);
        block.graphics.style = new ScilabString(["REGISTER_f"]);
        block.graphics.in_implicit = new ScilabString(["E"]);  // changed
        block.graphics.out_implicit = new ScilabString(["E"]);
        block.graphics.in_style = new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]);
        block.graphics.out_style = new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]);
        block.graphics.in_label = new ScilabString([""]);
        block.graphics.out_label = new ScilabString([""]);
        return block;
    }
}
function RELATIONALOP() {

    RELATIONALOP.prototype.define = function RELATIONALOP() {
        this.ipar = 2;
        this.label = "&lt";

        var model = scicos_model();
        model.sim = list(new ScilabString(["relationalop"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([1], [1]);
        model.out = new ScilabDouble([1]);
        model.ipar = new ScilabDouble([this.ipar]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([this.ipar], [0]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"RELATIONALOP\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        this.x.graphics.style = new ScilabString(["fontSize=13;fontStyle=1;displayedLabel=" + label]);
        return new BasicBlock(this.x);
    }
    RELATIONALOP.prototype.details = function RELATIONALOP() {
        return this.x;
    }
}

function RELAY_f() {

    RELAY_f.prototype.define = function RELAY_f() {
        this.i0 = 0;
        this.in1 = [[-1], [-1]];
        this.nin = 2;

        var model = scicos_model();
        model.sim = list(new ScilabString(["relay"]), new ScilabDouble([2]));
        model.in = new ScilabDouble(...this.in1);
        model.out = new ScilabDouble([-1]);
        model.evtin = new ScilabDouble(...ones(this.in1));
        model.dstate = new ScilabDouble([this.i0]);
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, true]);

        var exprs = new ScilabString([this.nin], [this.i0 + 1]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"RELAY_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    RELAY_f.prototype.details = function RELAY_f() {
        return this.x;
    }
    RELAY_f.prototype.get = function RELAY_f() {
        if(this.z0 == undefined || this.z0 == null)
            this.z0 = "1"
        var options={
            nin:["number of inputs",this.nin],
            z0:["initial connected input",this.z0],
        }
        return options
    }
RELAY_f.prototype.set = function RELAY_f() {
    this.nin = parseFloat((arguments[0]["nin"]))
    this.z0 = parseFloat((arguments[0]["z0"]))
    this.x.model.dstate = new ScilabDouble([this.z0-1])
    var exprs = new ScilabString([this.nin],[this.z0])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function Resistor() {

    Resistor.prototype.define = function Resistor() {
        this.R = 0.01;

        var model = scicos_model();
        model.rpar = new ScilabDouble([this.R]);
        model.sim = new ScilabString(["resistor"]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var mo = new modelica_function();
        mo.model = new ScilabString(["Resistor"]);
        mo.inputs = new ScilabString(["p"]);
        mo.outputs = new ScilabString(["n"]);
        mo.parameters = list(new ScilabString(["R"]), list(new ScilabDouble([this.R])));
        model.equations = mo;
        model.in = new ScilabDouble(...ones(size(getData(mo.inputs), "*"), 1));
        model.out = new ScilabDouble(...ones(size(getData(mo.outputs), "*"), 1));

        var exprs = new ScilabString([this.R]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"Resistor\",sz(1),sz(2));"]);
        this.x = standard_define([2, 1], model, exprs, list(gr_i, 0));
        this.x.graphics.in_implicit = new ScilabString(["I"]);
        this.x.graphics.out_implicit = new ScilabString(["I"]);
        return new BasicBlock(this.x);
    }
    Resistor.prototype.details = function Resistor() {
        return this.x;
    }
    Resistor.prototype.get = function Resistor() {
        var options={
            R:["R (ohm)",this.R],
        }
        return options
    }
Resistor.prototype.set = function Resistor() {
    this.R = parseFloat((arguments[0]["R"]))
    this.x.model.rpar = new ScilabDouble([this.R]);
    this.x.model.equations.parameters = list(new ScilabString(["R"]), list(new ScilabDouble([this.R])));
    var exprs = new ScilabString([this.R])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function RFILE_f() {

    RFILE_f.prototype.define = function RFILE_f() {
        this.out = 1;
        this.nout = this.out;
        this.frmt = "(7(e10.3,1x))";
        this.fname = "foo";
        this.lunit = 0;
        this.N = 2;
        this.rpar = [];
        this.tmask = 0;
        this.outmask = 1;

        var ipar = new ScilabDouble([this.fname.length], [this.frmt.length], [0], [this.N], ..._str2code(this.fname), ..._str2code(this.frmt), [this.tmask], [this.outmask]);

        var dstate = new ScilabDouble([1], [1], [this.lunit], ...zeros((this.nout) * this.N, 1));

        var model = scicos_model();
        model.sim = new ScilabString(["readf"]);
        model.out = new ScilabDouble([this.nout]);
        model.evtin = new ScilabDouble([1]);
        model.dstate = dstate;
        model.ipar = ipar;
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([sci2exp([])], [sci2exp(this.outmask)], [this.fname], [this.frmt], [this.N], [this.out]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"RFILE_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    RFILE_f.prototype.details = function RFILE_f() {
        return this.x;
    }
}
function RICC() {

    RICC.prototype.define = function RICC() {
        this.function_name = "ricc_m";
        this.funtyp = 4;

        var model = scicos_model();
        model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([this.funtyp]));
        model.in = new ScilabDouble([-1], [-1], [-1]);
        model.in2 = new ScilabDouble([-1], [-1], [-1]);
        model.intyp = new ScilabDouble([1, 1, 1]);
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble([-1]);
        model.outtyp = new ScilabDouble([1]);
        model.evtin = new ScilabDouble();
        model.evtout = new ScilabDouble();
        model.state = new ScilabDouble();
        model.dstate = new ScilabDouble();
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble([1], [1]);
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, false]);

        var label = new ScilabString([sci2exp(1)], [sci2exp(1)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"RICC\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, label, gr_i);
        return new BasicBlock(this.x);
    }
    RICC.prototype.details = function RICC() {
        return this.x;
    }
    RICC.prototype.get = function RICC() {
    if(this.tpe == undefined || this.tpe == null){
        this.tpe = "1"
        this.mod = "1"
    }
    var options={
        tpe:["Type (1=Cont  2=Disc)",this.tpe],
        mod:["Model(1=Schr  2=sign(cont) inv(disc))",this.mod],
    }
    return options
    }
RICC.prototype.set = function RICC() {
    this.tpe = parseFloat((arguments[0]["tpe"]))
    this.mod = parseFloat((arguments[0]["mod"]))
    this.x.model.ipar = new ScilabDouble([this.tpe],[this.mod])
    var exprs = new ScilabString([this.tpe],[this.mod])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }

}

function ROOTCOEF() {

    ROOTCOEF.prototype.define = function ROOTCOEF() {
        this.function_name = "root_coef";
        this.funtyp = 4;

        var model = scicos_model();
        model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([this.funtyp]));
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([1]);
        model.intyp = new ScilabDouble([1]);
        model.out = new ScilabDouble([-2]);
        model.out2 = new ScilabDouble([1]);
        model.outtyp = new ScilabDouble([1]);
        model.evtin = new ScilabDouble();
        model.evtout = new ScilabDouble();
        model.state = new ScilabDouble();
        model.dstate = new ScilabDouble();
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble();
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, false]);

        var label = new ScilabString([sci2exp(1)], [sci2exp(1)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"ROOTCOEF\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, label, gr_i);
        return new BasicBlock(this.x);
    }
    ROOTCOEF.prototype.details = function ROOTCOEF() {
        return this.x;
    }
    ROOTCOEF.prototype.get = function ROOTCOEF() {
    if(this.typ == undefined || this.typ == null){
        this.typ = "1"
        this.inp = "1"
    }
        var options={
            typ:["Datatype(1=real double  2=Complex)",this.typ],
            inp:["input row size",this.inp],
        }
        return options
    }
ROOTCOEF.prototype.set = function ROOTCOEF() {
    this.typ = parseFloat((arguments[0]["typ"]))
    this.inp = parseFloat((arguments[0]["inp"]))
    if(this.typ == 1){
        this.function_name = "root_coef"
    }else if(this.typ == 2){
        this.function_name = "rootz_coef"
    }
    this.x.model.sim = list(new ScilabString([this.function_name]),new ScilabDouble([4]))
    var exprs = new ScilabString([this.typ],[this.inp])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function SAMPHOLD_m() {

    SAMPHOLD_m.prototype.define = function SAMPHOLD_m() {
        var model = scicos_model();
        model.sim = list(new ScilabString(["samphold4_m"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble([1]);
        model.outtyp = new ScilabDouble([1]);
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble([-2]);
        model.evtin = new ScilabDouble([1]);
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var label = [sci2exp(1)];

        var gr_i = ["xstringb(orig(1),orig(2),\"SAMPHOLD_m\",sz(1),sz(2));"];
        this.x = new standard_define(new ScilabDouble([2, 2]), model, label, gr_i);
        return new BasicBlock(this.x);

    }

    SAMPHOLD_m.prototype.details = function SAMPHOLD_m() {
        return this.x;
    }
SAMPHOLD_m.prototype.get = function SAMPHOLD_m() {
    if(this.it == 'undefined' || this.it == null){
        this.it = "1";
    }
    var options={
        it:["Datatype(1=real double 2=Complex 3=int32 ...)",this.it],
    }
    return options
    }
SAMPHOLD_m.prototype.set = function SAMPHOLD_m() {
    this.it = parseFloat((arguments[0]["it"]))
    this.x.model.intyp = new ScilabDouble([this.it])
    this.x.model.outtyp = new ScilabDouble([this.it])
    this.in = [getData(this.x.model.in),getData(this.x.model.in2)]
    var io = set_io(this.x.model,this.x.graphics,this.in,this.in,[1],[])
    var exprs = new ScilabString([this.it])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function SampleCLK() {

    SampleCLK.prototype.define = function SampleCLK() {

        var model = scicos_model();
        model.sim = new ScilabString(["sampleclk"]);
        model.evtout = new ScilabDouble([1]);
        model.rpar = new ScilabDouble([1, 0]);
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble([-1]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([sci2exp(1)], [sci2exp(0)]);

        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, ["xstringb(orig(1),orig(2),\"SampleCLK\",sz(1),sz(2));"]);
        return new BasicBlock(this.x);
    }
    SampleCLK.prototype.details = function SampleCLK() {
        return this.x;
    }
SampleCLK.prototype.get = function SampleCLK() {
    if(this.frequ == 'undefined' || this.frequ == null){
        this.frequ = 1
    }
    if(this.offset == 'undefined' || this.offset == null){
        this.offset = 0
    }
    var options={
        frequ:["Sample time",this.frequ],
        offset:["Offset",this.offset],
    }
    return options
    }
SampleCLK.prototype.set = function SampleCLK() {
    this.frequ = parseFloat((arguments[0]["frequ"]))
    this.offset = parseFloat((arguments[0]["offset"]))
    this.x.model.rpar = new ScilabDouble([this.frequ],[this.offset])
    this.x.model.evtout = new ScilabDouble([1]);
    this.x.model.firing = new ScilabDouble([-1]);
    var exprs = new ScilabString([this.frequ],[this.offset])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function SATURATION() {

    SATURATION.prototype.define = function SATURATION() {
        this.minp = -1;
        this.maxp = 1;
        this.rpar = [[this.maxp], [this.minp]];

        var model = scicos_model();
        model.sim = list(new ScilabString(["satur"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([1]);
        model.nzcross = new ScilabDouble([2]);
        model.nmode = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.rpar = new ScilabDouble(...this.rpar);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);
        this.zeroc = parseFloat(getData(model.nmode)[0])
        var exprs = new ScilabString([this.maxp], [this.minp], [parseFloat(getData(model.nmode)[0])]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"SATURATION\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    SATURATION.prototype.details = function SATURATION() {
        return this.x;
    }
SATURATION.prototype.get = function SATURATION() {
        var options={
            maxp:["Upper limit",this.maxp],
            minp:["Lower limit",this.minp],
            zeroc:["zero crossing (0:no, 1:yes)",this.zeroc],
        }
        return options
    }
SATURATION.prototype.set = function SATURATION() {
    this.maxp = parseFloat((arguments[0]["maxp"]))
    this.minp = parseFloat((arguments[0]["minp"]))
    this.zeroc = parseFloat((arguments[0]["zeroc"]))
    var rpar = new ScilabDouble([this.maxp],[this.minp])
    this.x.model.rpar =  rpar;
    if(this.zeroc != 0){
        this.x.model.nzcross = new ScilabDouble([2]);
        this.x.model.nmode = new ScilabDouble([1]);
    }
    else{
        this.x.model.nzcross = new ScilabDouble([0]);
        this.x.model.nmode = new ScilabDouble([0]);
    }
    var exprs = new ScilabString([this.maxp],[this.minp],parseFloat(getData(model.nmode)[0]))
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function SAWTOOTH_f() {
    SAWTOOTH_f.prototype.get = function SAWTOOTH_f() {
        alert("parameters can not be set")
    }

    SAWTOOTH_f.prototype.define = function SAWTOOTH_f() {

        var model = scicos_model();
        model.sim = new ScilabString(["sawtth"]);
        model.out = new ScilabDouble([1]);
        model.evtin = new ScilabDouble([1]);
        model.dstate = new ScilabDouble([0]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, true]);

        var exprs = new ScilabString([" "]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"SAWTOOTH_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    SAWTOOTH_f.prototype.details = function SAWTOOTH_f() {
        return this.x;
    }
}
function SCALAR2VECTOR() {

    SCALAR2VECTOR.prototype.define = function SCALAR2VECTOR() {
        this.nout = -1;

        var model = scicos_model();
        model.sim = list(new ScilabString(["scalar2vector"]), new ScilabDouble([4]));
        model.out = new ScilabDouble([this.nout]);
        model.in = new ScilabDouble([1]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([this.nout]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"SCALAR2VECTOR\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    SCALAR2VECTOR.prototype.details = function SCALAR2VECTOR() {
        return this.x;
    }
    SCALAR2VECTOR.prototype.get = function SCALAR2VECTOR() {
        var options={
            nout:["size of output (-1: if don''t know)",this.nout],
        }
        return options
    }
SCALAR2VECTOR.prototype.set = function SCALAR2VECTOR() {
    this.nout = parseFloat((arguments[0]["nout"]))
    this.nout = Math.floor(this.nout)
    var exprs = new ScilabString([this.nout])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function scifunc_block_m() {

    scifunc_block_m.prototype.define = function scifunc_block_m() {
        this.in1 = 1;
        this.out = 1;
        this.clkin = [];
        this.clkout = [];
        this.x0 = [];
        this.z0 = [];
        this.typ = "c";
        this.auto = [];
        this.rpar = [];
        this.it = 1;

        var model = scicos_model();
        model.sim = list(new ScilabString(["scifunc"]), new ScilabDouble([3]));
        model.in = new ScilabDouble([this.in1]);
        model.in2 = new ScilabDouble([this.in1]);
        model.intyp = new ScilabDouble([this.it]);
        model.out = new ScilabDouble([this.out]);
        model.out2 = new ScilabDouble([this.out]);
        model.outtyp = new ScilabDouble([this.it]);
        model.evtin = new ScilabDouble();
        model.evtout = new ScilabDouble();
        model.state = new ScilabDouble();
        model.dstate = new ScilabDouble();
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble([0]);
        model.opar = list();
        model.blocktype = new ScilabString([this.typ]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = list(new ScilabString([sci2exp([this.in1, this.in1])], [sci2exp([this.out, this.out])], [sci2exp(this.clkin)], [sci2exp(this.clkout)], [sci2exp(this.x0)], [sci2exp(this.z0)], [sci2exp(this.rpar)], [sci2exp(this.auto)], [sci2exp(0)]), list(new ScilabString(["y1=sin(u1)"]), new ScilabString([" "]), new ScilabString([" "]), new ScilabString(["y1=sin(u1)"]), new ScilabString([" "]), new ScilabString([" "]), new ScilabString([" "])));

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"scifunc_block_m\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([4, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    scifunc_block_m.prototype.details = function scifunc_block_m() {
        return this.x;
    }
}
function SELECT_m() {

    SELECT_m.prototype.define = function SELECT_m() {
        this.z0 = 1;
        this.nin = 2;

        var model = scicos_model();
        model.sim = list(new ScilabString(["selector_m"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([-1], [-1]);
        model.in2 = new ScilabDouble([-2], [-2]);
        model.intyp = new ScilabDouble([1]);
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble([-2]);
        model.outtyp = new ScilabDouble([1]);
        model.evtout = new ScilabDouble();
        model.state = new ScilabDouble();
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble();
        model.firing = new ScilabDouble();
        model.evtin = new ScilabDouble(...ones(this.nin, 1));
        model.dstate = new ScilabDouble([this.z0]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([sci2exp(1)], [sci2exp([this.nin])], [sci2exp([this.z0])]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"SELECT_m\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    SELECT_m.prototype.details = function SELECT_m() {
        return this.x;
    }
    SELECT_m.prototype.get = function SELECT_m() {
        if(this.typ == undefined || this.typ == null )
            this.typ = "1"
        var options={
            typ:["Datatype(1= real double  2=Complex 3=int32 ..)",this.typ],
            nin:["number of inputs",sci2exp(this.nin)],
            z0:["initial connected input",sci2exp(this.z0)],
        }
        return options
    }
SELECT_m.prototype.set = function SELECT_m() {
    this.typ = parseFloat((arguments[0]["typ"]))
    this.nin = parseFloat((arguments[0]["nin"]))
    this.z0 = parseFloat((arguments[0]["z0"]))
    this.x.model.dstate = new ScilabDouble([this.z0])
    var exprs = new ScilabString([sci2exp(this.typ)],[sci2exp(this.nin)],[sci2exp(this.z0)])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function SELF_SWITCH() {

    SELF_SWITCH.prototype.define = function SELF_SWITCH() {
        this.stateOpen = true;

        this.x = scicos_block();
        this.x.gui = new ScilabString(["SELF_SWITCH"]);
        this.x.graphics.sz = new ScilabDouble([2, 2]);
        this.x.graphics.gr_i = new ScilabDouble();
        this.x.graphics.pin = new ScilabDouble([0]);
        this.x.graphics.pout = new ScilabDouble([0]);
        this.x.model.sim = new ScilabString(["csuper"]);
        this.x.model.in = new ScilabDouble([1]);
        this.x.model.out = new ScilabDouble([1]);
        this.x.model.blocktype = new ScilabString(["h"]);
        this.x.model.dep_ut = new ScilabBoolean([false, false]);
        this.x.model.rpar = genSwitchInnerDiagram(this.stateOpen);
        this.x.model.opar = list(new ScilabBoolean([this.stateOpen]));
        this.x.graphics.in_implicit = new ScilabString(["E"]);
        this.x.graphics.in_style = new ScilabString([""]);
        this.x.graphics.out_implicit = new ScilabString(["E"]);
        this.x.graphics.out_style = new ScilabString([""]);
        this.x.graphics.style = new ScilabString(["SELF_SWITCH"]);
        return new BasicBlock(this.x);
    }

    SELF_SWITCH.prototype.details = function SELF_SWITCH() {
        return this.x;
    }
}
function SHIFT() {

    SHIFT.prototype.define = function SHIFT() {
        this.sgn = [[0],[0]];
        this.OPER = 0;

        var model = scicos_model();
        model.sim = list(new ScilabString(["shift_32_LA"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([-1]);
        model.out = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.out2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble([3]);
        model.outtyp = new ScilabDouble([3]);
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble(...this.sgn);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([sci2exp(3)], [sci2exp(0)], [sci2exp(0)]);
    var n =sci2exp(0).toString();
    this.displayParameter=[n];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"SHIFT\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    
    SHIFT.prototype.details = function SHIFT() {
        return this.x;
    }
}
function Sigbuilder() {

    Sigbuilder.prototype.define = function Sigbuilder() {
        var scs_m_1 = scicos_diagram({
            version: new ScilabString(["scicos4.2"]),
            props: scicos_params({
                wpar: new ScilabDouble([600, 450, 0, 0, 450, 600]),
                Title: new ScilabString(["Sigbuilder"]),
                tol: new ScilabDouble([0.0001], [0.000001], [Math.pow(10, -10)], [100001], [0], [0], [0]),
                tf: new ScilabDouble([100]),
                context: new ScilabString([" "]),
                void1: new ScilabDouble(),
                options: tlist(["scsopt", "3D", "Background", "Link", "ID", "Cmap"], new ScilabString(["scsopt", "3D", "Background", "Link", "ID", "Cmap"]), list(new ScilabBoolean([true]), new ScilabDouble([33])), new ScilabDouble([8, 1]), new ScilabDouble([1, 5]), list(new ScilabDouble([5, 1]), new ScilabDouble([4, 1])), new ScilabDouble([0.8, 0.8, 0.8])),
                void2: new ScilabDouble(),
                void3: new ScilabDouble(),
                doc: list()
            })
        });
        scs_m_1.objs.push(scicos_block({
            gui: new ScilabString(["CURVE_c"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([329.63473, 606.18517]),
                sz: new ScilabDouble([40, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["3"], ["[0,1,2]"], ["[10,20,-30]"], ["y"], ["n"]),
                pin: new ScilabDouble(),
                pout: new ScilabDouble([6]),
                pein: new ScilabDouble([4]),
                peout: new ScilabDouble([2]),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;CURVE_c&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabDouble(),
                out_implicit: new ScilabString(["E"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_label: new ScilabString([""]),
                style: new ScilabString(["CURVE_c"])
            }),
            model: scicos_model({
                sim: list(new ScilabString(["curve_c"]), new ScilabDouble([4])),
                in: new ScilabDouble(),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble(),
                out: new ScilabDouble([1]),
                out2: new ScilabDouble([1]),
                outtyp: new ScilabDouble([1]),
                evtin: new ScilabDouble([1]),
                evtout: new ScilabDouble([1]),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble([0], [1], [2], [10], [20], [-30]),
                ipar: new ScilabDouble([3], [3], [1]),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble([0]),
                dep_ut: new ScilabBoolean([false, true]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m_1.objs.push(scicos_block({
            gui: new ScilabString(["CLKSPLIT_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([349.49528, 565.10704]),
                sz: new ScilabDouble([0.3333333, 0.3333333]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabDouble(),
                pin: new ScilabDouble(),
                pout: new ScilabDouble(),
                pein: new ScilabDouble([2]),
                peout: new ScilabDouble([8], [4]),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;CLKSPLIT_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabDouble(),
                out_implicit: new ScilabDouble(),
                style: new ScilabString(["CLKSPLIT_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["split"]),
                in: new ScilabDouble(),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble(),
                out: new ScilabDouble(),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble(),
                evtin: new ScilabDouble([1]),
                evtout: new ScilabDouble([1], [1]),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble(),
                opar: list(),
                blocktype: new ScilabString(["d"]),
                firing: new ScilabBoolean([-1], [-1]),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m_1.objs.push(scicos_block({
            gui: new ScilabString(["OUT_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([398.20616, 616.18517]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1"]),
                pin: new ScilabDouble([6]),
                pout: new ScilabDouble(),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;OUT_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabDouble(),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""]),
                style: new ScilabString(["OUT_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["output"]),
                in: new ScilabDouble([-1]),
                in2: new ScilabDouble([-2]),
                intyp: new ScilabDouble([-1]),
                out: new ScilabDouble(),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble(),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble([1]),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m_1.objs.push(scicos_block({
            gui: new ScilabString(["CLKOUTV_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([339.49528, 505.10704]),
                sz: new ScilabDouble([20, 30]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1"]),
                pin: new ScilabDouble(),
                pout: new ScilabDouble(),
                pein: new ScilabDouble([8]),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;CLKOUTV_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabDouble(),
                out_implicit: new ScilabDouble(),
                style: new ScilabString(["CLKOUTV_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["output"]),
                in: new ScilabDouble(),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble(),
                out: new ScilabDouble(),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble(),
                evtin: new ScilabDouble([1]),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble([1]),
                opar: list(),
                blocktype: new ScilabString(["d"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m_1.objs.push(scicos_link({
            xx: new ScilabDouble([349.63473], [349.49528]),
            yy: new ScilabDouble([600.47089], [565.10704]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([1, 1, 0]),
            to: new ScilabDouble([3, 1, 1])
        }));
        scs_m_1.objs.push(scicos_link({
            xx: new ScilabDouble([349.49528], [266.69602], [266.69602], [270.35525], [342.80795], [342.80795], [349.63473]),
            yy: new ScilabDouble([565.10704], [565.10704], [680.99483], [680.99483], [680.99483], [651.89946], [651.89946]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([3, 2, 0]),
            to: new ScilabDouble([1, 1, 1])
        }));
        scs_m_1.objs.push(scicos_link({
            xx: new ScilabDouble([378.20616], [398.20616]),
            yy: new ScilabDouble([626.18517], [626.18517]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([1, 1, 0]),
            to: new ScilabDouble([5, 1, 1])
        }));
        scs_m_1.objs.push(scicos_link({
            xx: new ScilabDouble([349.49528], [349.49528]),
            yy: new ScilabDouble([565.10704], [535.10704]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([3, 1, 0]),
            to: new ScilabDouble([7, 1, 1])
        }));

        var model = scicos_model({
            sim: new ScilabString(["csuper"]),
            in: new ScilabDouble(),
            in2: new ScilabDouble(),
            intyp: new ScilabDouble(),
            out: new ScilabDouble([-1]),
            out2: new ScilabDouble([1]),
            outtyp: new ScilabDouble([1]),
            evtin: new ScilabDouble(),
            evtout: new ScilabDouble([1]),
            state: new ScilabDouble(),
            dstate: new ScilabDouble(),
            odstate: list(),
            rpar: scs_m_1,
            ipar: new ScilabDouble(),
            opar: list(),
            blocktype: new ScilabString(["h"]),
            firing: new ScilabDouble(),
            dep_ut: new ScilabBoolean([false, false]),
            label: new ScilabString([""]),
            nzcross: new ScilabDouble([0]),
            nmode: new ScilabDouble([0]),
            equations: list()
        });

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"Sigbuilder\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, new ScilabDouble(), gr_i);
        return new BasicBlock(this.x);
    }
    Sigbuilder.prototype.details = function Sigbuilder() {
        return this.x;
    }
}
function SIGNUM() {

    SIGNUM.prototype.define = function SIGNUM() {
        this.nu = -1;

        var model = scicos_model();
        model.sim = list(new ScilabString(["signum"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([this.nu]);
        model.out = new ScilabDouble([this.nu]);
        model.nzcross = new ScilabDouble([this.nu]);
        model.nmode = new ScilabDouble([this.nu]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([1]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"SIGNUM\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    SIGNUM.prototype.details = function SIGNUM() {
        return this.x;
    }
    SIGNUM.prototype.get = function SIGNUM() {
    if(this.zcr == undefined || this.zcr == null){
        this.zcr = "1"
    }
        var options={
            zcr:["use zero_crossing (1: yes) (0:no)",this.zcr],
        }
        return options
    }
SIGNUM.prototype.set = function SIGNUM() {
    this.zcr = parseFloat((arguments[0]["zcr"]))
    if(this.zcr != 0){
        this.x.model.nmode = new ScilabDouble([-1]);
        this.x.model.nzcross = new ScilabDouble([-1]);
    }
    else{
        this.x.model.nmode = new ScilabDouble([0]);
        this.x.model.nzcross = new ScilabDouble([0]);
    }
    var exprs = new ScilabString([this.zcr])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function SINBLK_f() {
    SINBLK_f.prototype.get = function SINBLK_f() {
        alert("parameters can not be set")
    }

    SINBLK_f.prototype.define = function SINBLK_f() {

        var model = scicos_model();
        model.sim = new ScilabString(["sinblk"]);
        model.in = new ScilabDouble([-1]);
        model.out = new ScilabDouble([-1]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([" "]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"SINBLK_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    SINBLK_f.prototype.details = function SINBLK_f() {
        return this.x;
    }
}

function SineVoltage() {

    SineVoltage.prototype.define = function SineVoltage() {
        var model = scicos_model();
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);

        this.V = 1;
        this.ph = 0;
        this.frq = 1;
        this.offset = 0;
        this.start = 0;

        model.rpar = new ScilabDouble([this.V], [this.ph], [this.frq], [this.offset], [this.start]);
        model.sim = new ScilabString(["SineVoltage"]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var mo = new modelica_function();
        mo.model = new ScilabString(["SineVoltage"]);
        mo.inputs = new ScilabString(["p"]);
        mo.outputs = new ScilabString(["n"]);
        mo.parameters = list(new ScilabString(["V"], ["phase"], ["freqHz"], ["offset"], ["startTime"]), list(new ScilabDouble([this.V]), new ScilabDouble([this.ph]), new ScilabDouble([this.frq]), new ScilabDouble([this.offset]), new ScilabDouble([this.start])));
        model.equations = mo;

        var exprs = new ScilabString([this.V], [this.ph], [this.frq], [this.offset], [this.start]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"SineVoltage\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        this.x.graphics.in_implicit = new ScilabString(["I"]);
        this.x.graphics.out_implicit = new ScilabString(["I"]);
        return new BasicBlock(this.x);
    }

    SineVoltage.prototype.details = function SineVoltage() {
        return this.x;
    }
    SineVoltage.prototype.get = function SineVoltage() {
        var options={
            V:["Amplitude (Volt)",this.V],
            ph:["phase (rad)",this.ph],
            frq:["Frequency (Hz)",this.frq],
            offset:["Voltageoffset (V)",this.offset],
            start:["Timeoffset (s)",this.start],
        }
        return options
    }
SineVoltage.prototype.set = function SineVoltage() {
    this.V = parseFloat((arguments[0]["V"]))
    this.ph = parseFloat((arguments[0]["ph"]))
    this.frq = parseFloat((arguments[0]["frq"]))
    this.offset = parseFloat((arguments[0]["offset"]))
    this.start = parseFloat((arguments[0]["start"]))
    this.x.model.rpar = new ScilabDouble([this.V],[this.ph],[this.frq],[this.offset],[this.start])
    this.x.model.equations.parameters = list(new ScilabString(["V"], ["phase"], ["freqHz"], ["offset"], ["startTime"]), list(new ScilabDouble([this.V]), new ScilabDouble([this.ph]), new ScilabDouble([this.frq]), new ScilabDouble([this.offset]), new ScilabDouble([this.start])));
    var exprs = new ScilabString([this.V],[this.ph],[this.frq],[this.offset],[this.start])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function SOM_f() {
    SOM_f.prototype.get = function SOM_f() {
        alert("This sum block is obsolete, parameters can not be modified")
    }

    SOM_f.prototype.define = function SOM_f() {
        this.sgn = [[1], [1], [1]];

        var model = scicos_model();
        model.sim = list(new ScilabString(["sum"]), new ScilabDouble([2]));
        model.in = new ScilabDouble([-1], [-1], [-1]);
        model.out = new ScilabDouble([-1]);
        model.rpar = new ScilabDouble(...this.sgn);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([sci2exp(1)], [sci2exp(this.sgn)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"SOM_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2,2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    SINBLK_f.prototype.details = function SINBLK_f() {
        return this.x;
    }
}
function SourceP() {

    SourceP.prototype.define = function SourceP() {
        var model = scicos_model();

        this.P0 = 300000;
        this.T0 = 290;
        this.H0 = 100000;
        this.option_temperature = 1;

        model.rpar = new ScilabDouble([this.P0], [this.T0], [this.H0], [this.option_temperature]);
        model.sim = new ScilabString(["Source"]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var mo = new modelica_function();
        mo.model = new ScilabString(["Source"]);
        mo.inputs = new ScilabDouble();
        mo.outputs = new ScilabString(["C"]);
        mo.parameters = list(new ScilabString(["P0"], ["T0"], ["H0"], ["option_temperature"]), new ScilabDouble([this.P0], [this.T0], [this.H0], [this.option_temperature]));
        model.equations = mo;
        model.in = new ScilabDouble(...ones(size(getData(mo.inputs), "*"), 1));
        model.out = new ScilabDouble(...ones(size(getData(mo.outputs), "*"), 1));

        var exprs = new ScilabString([this.P0], [this.T0], [this.H0], [this.option_temperature]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"SourceP\",sz(1),sz(2));"]);
        this.x = new standard_define([2.5, 2], model, exprs, list(gr_i, new ScilabDouble([0])));
        this.x.graphics.out_implicit = new ScilabString(["I"]);
        return new BasicBlock(this.x);
    }

    SourceP.prototype.details = function SourceP() {
        return this.x;
    }
    SourceP.prototype.get = function SourceP() {
        var options={
            P0:["Pression de la source : P0 (Pa)",this.P0.toString().replace(/,/g," ")],
            T0:["Temperature de la source : T0 (K)",this.T0.toString().replace(/,/g," ")],
            H0:["Enthalpie spécifique de la source : H0 (J/kg)",this.H0.toString().replace(/,/g," ")],
            option_temperature:["1:température fixée - 2:enthalpie fixée : option_temperature",this.option_temperature.toString().replace(/,/g," ")],
        }
        return options
    }
SourceP.prototype.set = function SourceP() {
    this.P0 = inverse(arguments[0]["P0"])
    this.T0 = inverse(arguments[0]["T0"])
    this.H0 = inverse(arguments[0]["H0"])
    this.option_temperature = inverse(arguments[0]["option_temperature"])
    this.x.model.rpar = new ScilabDouble(...this.P0,...this.T0,...this.H0,...this.option_temperature)
    this.x.model.equations.parameters = list(new ScilabString(["P0"], ["T0"], ["H0"], ["option_temperature"]), new ScilabDouble(...this.P0,...this.T0,...this.H0,...this.option_temperature));
    var exprs = new ScilabString([this.P0.toString().replace(/,/g, " ")],[this.T0.toString().replace(/,/g, " ")],[this.H0.toString().replace(/,/g, " ")],[this.option_temperature.toString().replace(/,/g, " ")])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function SQRT() {

    SQRT.prototype.define = function SQRT() {
        var model = scicos_model();
        model.sim = list(new ScilabString(["mat_sqrt"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble([1]);
        model.outtyp = new ScilabDouble([1]);
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble([-2]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var label = new ScilabString([sci2exp(1)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"SQRT\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, label, gr_i);
        return new BasicBlock(this.x);
    }

    SQRT.prototype.details = function SQRT() {
        return this.x;
    }
    SQRT.prototype.get = function SQRT() {
    if(this.typ == undefined || this.typ == null){
        this.typ = "1"
    }
        var options={
            typ:["Datatype(1=real double  2=Complex)",this.typ],
        }
        return options
    }
SQRT.prototype.set = function SQRT() {
    this.typ = parseFloat((arguments[0]["typ"]))
    if(this.typ == 1){
        this.function_name = "mat_sqrt"
    }else if(this.typ == 2){
        this.function_name = "matz_sqrt"
    }
    this.x.model.intyp = new ScilabDouble([this.typ])
    this.x.model.outyp = new ScilabDouble([this.typ])
    this.in = [getData(this.x.model.in),getData(this.x.model.in2)]
    this.out = [getData(this.x.model.out),getData(this.x.model.out2)]
    var io = set_io(this.x.model,this.x.graphics,this.in,this.out,[],[])
    this.x.model.sim = list(new ScilabString([this.function_name]),new ScilabDouble([4]))
    var exprs = new ScilabString([this.typ])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function SRFLIPFLOP() {

    SRFLIPFLOP.prototype.define = function SRFLIPFLOP() {
        var scs_m = scicos_diagram({
            version: new ScilabString(["scicos4.2"]),
            props: scicos_params({
                wpar: new ScilabDouble([600, 450, 0, 0, 450, 600]),
                Title: new ScilabString(["SRFLIPFLOP"]),
                tol: new ScilabDouble([0.0001], [0.000001], [Math.pow(10, -10)], [100001], [0], [0], [0]),
                tf: new ScilabDouble([100000]),
                context: new ScilabString([" "]),
                void1: new ScilabDouble(),
                options: tlist(["scsopt", "3D", "Background", "Link", "ID", "Cmap"], new ScilabString(["scsopt", "3D", "Background", "Link", "ID", "Cmap"]), list(new ScilabBoolean([true]), new ScilabDouble([33])), new ScilabDouble([8, 1]), new ScilabDouble([1, 5]), list(new ScilabDouble([5, 1]), new ScilabDouble([4, 1])), new ScilabDouble([0.8, 0.8, 0.8])),
                void2: new ScilabDouble(),
                void3: new ScilabDouble(),
                doc: list()
            })
        });
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["LOGIC"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([298.504, 201.45067]),
                sz: new ScilabDouble([40, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["[0 1;1 0;1 0;1 0;0 1;0 1;0 0;0 0]"], ["1"]),
                pin: new ScilabDouble([4], [10], [12]),
                pout: new ScilabDouble([3], [8]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;LOGIC&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"], ["E"], ["E"]),
                out_implicit: new ScilabString(["E"], ["E"]),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"], ["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"], ["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"], ["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""], [""], [""]),
                out_label: new ScilabString([""], [""]),
                style: new ScilabString(["LOGIC"])
            }),
            model: scicos_model({
                sim: list(new ScilabString(["logic"]), new ScilabDouble([4])),
                in: new ScilabDouble([1], [1], [1]),
                in2: new ScilabDouble([1], [1], [1]),
                intyp: new ScilabDouble([5], [5], [5]),
                out: new ScilabDouble([1], [1]),
                out2: new ScilabDouble([1], [1]),
                outtyp: new ScilabDouble([5], [5]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble(),
                opar: list(int8([0, 1], [1, 0], [1, 0], [1, 0], [0, 1], [0, 1], [0, 0], [0, 0])),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabBoolean([false]),
                dep_ut: new ScilabBoolean([true, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["DOLLAR_m"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([299.23733, 254.25067]),
                sz: new ScilabDouble([40, 40]),
                flip: new ScilabBoolean([false]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["int8(0)"], ["1"]),
                pin: new ScilabDouble([6]),
                pout: new ScilabDouble([4]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;DOLLAR_m&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabString(["E"]),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""]),
                out_label: new ScilabString([""]),
                style: new ScilabString(["DOLLAR_m"])
            }),
            model: scicos_model({
                sim: list(new ScilabString(["dollar4_m"]), new ScilabDouble([4])),
                in: new ScilabDouble([1]),
                in2: new ScilabDouble([1]),
                intyp: new ScilabDouble([5]),
                out: new ScilabDouble([1]),
                out2: new ScilabDouble([1]),
                outtyp: new ScilabDouble([5]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(int8([0])),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble(),
                opar: list(),
                blocktype: new ScilabString(["d"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["SPLIT_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([363.03733, 248.584]),
                sz: new ScilabDouble([0.3333333, 0.3333333]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabDouble(),
                pin: new ScilabDouble([3]),
                pout: new ScilabDouble([10], [14], [0]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;SPLIT_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabString(["E"], ["E"], ["E"]),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"], ["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"], ["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""]),
                out_label: new ScilabString([""], [""], [""]),
                style: new ScilabString(["SPLIT_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["lsplit"]),
                in: new ScilabDouble([-1]),
                in2: new ScilabDouble([1]),
                intyp: new ScilabDouble([1]),
                out: new ScilabDouble([-1], [-1], [-1]),
                out2: new ScilabDouble([1], [1], [1]),
                outtyp: new ScilabDouble([1], [1], [1]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble(),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([true, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["OUT_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([367.07543, 204.784]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["2"]),
                pin: new ScilabDouble([8]),
                pout: new ScilabDouble(),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;OUT_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabDouble(),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""]),
                style: new ScilabString(["OUT_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["output"]),
                in: new ScilabDouble([-1]),
                in2: new ScilabDouble([1]),
                intyp: new ScilabDouble([-1]),
                out: new ScilabDouble(),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble(),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble([2]),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["IN_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([249.93257, 211.45067]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1"]),
                pin: new ScilabDouble(),
                pout: new ScilabDouble([10]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;IN_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabDouble(),
                out_implicit: new ScilabString(["E"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_label: new ScilabString([""]),
                style: new ScilabString(["IN_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["input"]),
                in: new ScilabDouble(),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble(),
                out: new ScilabDouble([-1]),
                out2: new ScilabDouble([1]),
                outtyp: new ScilabDouble([-1]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble([1]),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["IN_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([249.93257, 201.45067]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["2"]),
                pin: new ScilabDouble(),
                pout: new ScilabDouble([12]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;IN_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabDouble(),
                out_implicit: new ScilabString(["E"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_label: new ScilabString([""]),
                style: new ScilabString(["IN_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["input"]),
                in: new ScilabDouble(),
                in2: new ScilabDouble(),
                intyp: new ScilabDouble(),
                out: new ScilabDouble([-1]),
                out2: new ScilabDouble([1]),
                outtyp: new ScilabDouble([-1]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble([2]),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["OUT_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([383.03733, 238.584]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1"]),
                pin: new ScilabDouble([14]),
                pout: new ScilabDouble(),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;OUT_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabDouble(),
                in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""]),
                style: new ScilabString(["OUT_f"])
            }),
            model: scicos_model({
                sim: new ScilabString(["output"]),
                in: new ScilabDouble([-1]),
                in2: new ScilabDouble([1]),
                intyp: new ScilabDouble([-1]),
                out: new ScilabDouble(),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble(),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble([1]),
                opar: list(),
                blocktype: new ScilabString(["c"]),
                firing: new ScilabDouble(),
                dep_ut: new ScilabBoolean([false, false]),
                label: new ScilabString([""]),
                nzcross: new ScilabDouble([0]),
                nmode: new ScilabDouble([0]),
                equations: list(),
                uid: new ScilabString([count])
            }),
            doc: list(new ScilabString([count++]))
        }));

        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([347.07543], [363.03733], [363.03733]),
            yy: new ScilabDouble([228.11733], [228.11733], [248.584]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([1, 1, 0]),
            to: new ScilabDouble([5, 1, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([290.6659], [272.104], [272.104], [289.93257]),
            yy: new ScilabDouble([274.25067], [274.25067], [231.45067], [231.45067]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([2, 1, 0]),
            to: new ScilabDouble([1, 1, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([363.03733], [363.03733], [344.95162]),
            yy: new ScilabDouble([248.584], [274.25067], [274.25067]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([5, 1, 0]),
            to: new ScilabDouble([2, 1, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([347.07543], [367.07543]),
            yy: new ScilabDouble([214.784], [214.784]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([1, 2, 0]),
            to: new ScilabDouble([7, 1, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([269.93257], [289.93257]),
            yy: new ScilabDouble([221.45067], [221.45067]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([9, 1, 0]),
            to: new ScilabDouble([1, 2, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([269.93257], [289.93257]),
            yy: new ScilabDouble([211.45067], [221.45067]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([11, 1, 0]),
            to: new ScilabDouble([1, 3, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([363.03733], [383.03733]),
            yy: new ScilabDouble([248.584], [248.584]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([5, 2, 0]),
            to: new ScilabDouble([13, 1, 1])
        }));

        var model = scicos_model();
        model.sim = new ScilabString(["csuper"]);
        model.in = new ScilabDouble([1], [1]);
        model.in2 = new ScilabDouble([1], [1]);
        model.out = new ScilabDouble([1], [1]);
        model.out2 = new ScilabDouble([1], [1]);
        model.intyp = new ScilabDouble([5, 5]);
        model.outtyp = new ScilabDouble([5, 5]);
        model.blocktype = new ScilabString(["h"]);
        model.firing = new ScilabBoolean([false]);
        model.dep_ut = new ScilabBoolean([true, false]);
        model.rpar = scs_m;

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"SRFLIPFLOP\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 3]), model, new ScilabDouble(), gr_i);
        return new BasicBlock(this.x);
    }
    SRFLIPFLOP.prototype.details = function SRFLIPFLOP() {
        return this.x;
    }
}
function STEP_FUNCTION() {

    STEP_FUNCTION.prototype.define = function STEP_FUNCTION() {
        var scs_m_1 = scicos_diagram();
        scs_m_1.objs.push(new STEP().internal());
        scs_m_1.objs.push(new OUT_f().internal());
        scs_m_1.objs.push(scicos_link({}));
        scs_m_1.objs.push(scicos_link({}));

        var blk = scs_m_1.objs[0];
        var graphics = blk.graphics;

        var model = blk.model;
        graphics.orig = new ScilabDouble([0, 0]);
        graphics.sz = new ScilabDouble([40, 40]);
        graphics.flip = new ScilabBoolean([true]);
        graphics.pein = new ScilabDouble([4]);
        graphics.peout = new ScilabDouble([4]);
        graphics.pout = new ScilabDouble([3]);
        graphics.out_implicit = new ScilabString(["E"]);
        graphics.in_style = new ScilabDouble();
        graphics.out_style = new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]);
        graphics.in_label = new ScilabDouble();
        graphics.out_label = new ScilabString([""]);
        model.evtin = new ScilabDouble([-1]);
        model.evtout = new ScilabDouble([-1]);
        model.uid = new ScilabString([count]);
        blk.graphics = graphics;
        blk.model = model;
        blk.doc = list(new ScilabString([count++]));
        scs_m_1.objs[0] = blk;

        blk = scs_m_1.objs[1];
        graphics = blk.graphics;
        model = blk.model;
        graphics.orig = new ScilabDouble([80, 10]);
        graphics.sz = new ScilabDouble([20, 20]);
        graphics.flip = new ScilabBoolean([true]);
        graphics.exprs = new ScilabString(["1"]);
        model.ipar = new ScilabDouble([1]);
        graphics.pin = new ScilabDouble([3]);
        model.outtyp = new ScilabDouble();
        model.uid = new ScilabString([count]);
        blk.doc = list(new ScilabString([count++]));
        blk.graphics = graphics;
        blk.model = model;
        scs_m_1.objs[1] = blk;

        var lnk = scs_m_1.objs[2];
        lnk.xx = new ScilabDouble([104], [136]);
        lnk.yy = new ScilabDouble([-40], [-60]);
        lnk.from = new ScilabDouble([1, 1, 0]);
        lnk.to = new ScilabDouble([2, 1, 1]);
        scs_m_1.objs[2] = lnk;

        lnk = scs_m_1.objs[3];
        lnk.xx = new ScilabDouble([0], [20], [-20], [-20], [20], [1]);
        lnk.yy = new ScilabDouble([0], [-20], [-20], [60], [60], [1]);
        lnk.ct = new ScilabDouble([5, -1]);
        lnk.from = new ScilabDouble([1, 1, 0]);
        lnk.to = new ScilabDouble([1, 1, 1]);
        scs_m_1.objs[3] = lnk;

        model = scicos_model();
        model.sim = new ScilabString(["csuper"]);
        model.out = new ScilabDouble([1]);
        model.out2 = new ScilabDouble([1]);
        model.outtyp = new ScilabDouble([1]);
        model.rpar = scs_m_1;

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"STEP_FUNCTION\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, new ScilabString(), gr_i);
        return new BasicBlock(this.x);
    }

    STEP_FUNCTION.prototype.details = function STEP_FUNCTION() {
        return this.x;
    }
}
function SUBMAT() {

    SUBMAT.prototype.define = function SUBMAT() {
        var model = scicos_model();

        this.function_name = new ScilabString(["submat"]);

        this.funtyp = new ScilabDouble([4]);
        model.sim = list(this.function_name, this.funtyp);
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble([1]);
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble([-2]);
        model.outtyp = new ScilabDouble([1]);
        model.evtin = new ScilabDouble();
        model.evtout = new ScilabDouble();
        model.state = new ScilabDouble();
        model.dstate = new ScilabDouble();
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble([1], [1], [1], [1]);
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, false]);

        this.label = new ScilabString([sci2exp(1)], [sci2exp(1)], [sci2exp(1)], [sci2exp(1)], [sci2exp(1)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"SUBMAT\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2.5, 2]), model, this.label, gr_i);
        
        return new BasicBlock(this.x);
      
    }
    SUBMAT.prototype.details = function SUBMAT() {
        return this.x;
      
    }
    SUBMAT.prototype.get = function SUBMAT() {
    if(this.typ == undefined || this.typ == null){
        this.typ="1";
        this.a="1";
        this.b="1";
        this.c="1";
        this.d="1";
        this.inp="[1 1]";
    }
        var options={
            typ:["Datatype (1=real double  2=Complex)",this.typ],
            a:["Starting Row Index",this.a],
            b:["Ending Row Index",this.b],
            c:["Starting Column Index",this.c],
            d:["Ending Column Index",this.d],
            inp:["Input Dimensions",this.inp.toString().replace(/,/g, " ")],
        }
        return options
    }
SUBMAT.prototype.set = function SUBMAT() {
    this.typ = parseFloat((arguments[0]["typ"]))
    this.a = parseFloat((arguments[0]["a"]))
    this.b = parseFloat((arguments[0]["b"]))
    this.c = parseFloat((arguments[0]["c"]))
    this.d = parseFloat((arguments[0]["d"]))
    this.inp = inverse((arguments[0]["inp"]))
    if(this.typ == 1){
        this.function_name = "submat"
        this.ot = 1
        this.it = 1
    }
    else if(this.typ == 2){
        this.function_name = "submatz"
        this.ot = 2
        this.it = 2
    }
    this.x.model.ipar = new ScilabDouble([this.a],[this.b],[this.c],[this.d])
    this.x.model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([4]))
    this.x.graphics.exprs = label
    var exprs = new ScilabString([this.typ],[this.a],[this.b],[this.c],[this.d],...this.inp)
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function SUMMATION() {
    SUMMATION.prototype.define = function SUMMATION() {
        this.sgn = [[1],[-1]];

        var model = scicos_model();
        model.sim = list(new ScilabString(["summation"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([-1], [-1]);
        model.out = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2], [-2]);
        model.out2 = new ScilabDouble([-2]);
        model.ipar = new ScilabDouble(...this.sgn);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([sci2exp(this.sgn)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"SUMMATION\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 3]), model, exprs, gr_i);
        return new Summation(this.x);
    }

    SUMMATION.prototype.details = function SUMMATION() {
        return this.x;
    }
    SUMMATION.prototype.get = function SUMMATION() {
    if(this.Datatype == undefined || this.Datatype == null){
        this.Datatype = "1"
    }
    if(this.sgn == undefined || this.sgn == null){
        this.sgn = "[1;-1]"
    }
    if(this.satur == undefined || this.satur == null){
        this.satur = "0"
    }
        var options={
            Datatype:["Datatype (1=real double  2=complex 3=int32 ...)",this.Datatype],
            sgn:["Number of inputs or sign vector (of +1, -1)",this.sgn.toString().replace(/,/g," ")],
            satur:["Do on Overflow(0=Nothing 1=Saturate 2=Error)",this.satur],
        }
        return options
    }
SUMMATION.prototype.set = function SUMMATION() {
    this.Datatype = parseInt((arguments[0]["Datatype"]))
    this.sgn = inverse(arguments[0]["sgn"])
    this.satur = parseInt((arguments[0]["satur"]))
    this.x.model.rpar = new ScilabDouble([this.satur]);
    this.x.model.ipar = new ScilabDouble(...this.sgn);
    var exprs = new ScilabString([sci2exp(this.Datatype)],[this.sgn.toString().replace(/,/g, " ")],[this.satur])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function SUM_f() {
    SUM_f.prototype.get = function SUM_f() {
        alert("parameters can not be modified")
    //return new RoundBlock(this.x);
    }   

    SUM_f.prototype.define = function SUM_f() {
        var model = scicos_model();
        
        model.sim = list(new ScilabString(["plusblk"]), new ScilabDouble([2]));
        model.in = new ScilabDouble([-1], [-1], [-1]);
        model.out = new ScilabDouble([-1]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"SUM_f\",sz(1),sz(2));"]);
        var exprs = new ScilabString();
        
        this.x = new standard_define(new ScilabDouble([1, 1]), model, exprs, gr_i);
        
        return new RoundBlock(this.x);
        
    }

    SUM_f.prototype.details = function SUM_f() {
        return this.x;
        
    }
}
function SUPER_f() {
    SUPER_f.prototype.define = function SUPER_f() {
        alert("parameters can not be changed ")
    }

    SUPER_f.prototype.define = function SUPER_f() {
        var scs = scicos_diagram();
        scs.props.title = new ScilabString(["Super_Block"]);

        var in1 = new IN_f().internal();
        in1.graphics.orig = new ScilabDouble([40, 40]);
        in1.graphics.sz = new ScilabDouble([20, 20]);
        in1.graphics.flip = new ScilabBoolean([true]);
        in1.graphics.pout = new ScilabDouble([0]);
        in1.model.uid = new ScilabString([count]);
        in1.doc = list(new ScilabString([count++]));

        var out = new OUT_f().internal();
        out.graphics.orig = new ScilabDouble([240, 40]);
        out.graphics.sz = new ScilabDouble([20, 20]);
        out.graphics.flip = new ScilabBoolean([true]);
        out.graphics.pin = new ScilabDouble([0]);
        out.model.outtyp = new ScilabDouble();
        out.model.uid = new ScilabString([count]);
        out.doc = list(new ScilabString([count++]));
        scs.objs.push(in1);
        scs.objs.push(out);

        var model = scicos_model();
        model.sim = new ScilabString(["super"]);
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.rpar = scs;
        model.blocktype = new ScilabString(["h"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var gr_i = ["xstringb(orig(1),orig(2),\"SUPER_f\",sz(1),sz(2));"];
        this.x = new standard_define(new ScilabDouble([2, 2]), model, new ScilabDouble(), gr_i);
        return new SuperBlock(this.x);
    }

    SUPER_f.prototype.details = function SUPER_f() {
        return this.x;
    }
}
function Switch() {
    
    Switch.prototype.define = function Switch() {
        var model = scicos_model();

        this.Ron = 0.01;
        this.Roff = 1e5;
        this.S = [["Ron"], ["Roff"]];

        var scope = {
            Ron: 0.01,
            Roff: 1e5
        }
        this.Z = math.eval('[ Ron ; Roff ]', scope)._data;

        model.sim = new ScilabString(["Switch"]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var mo = new modelica_function();
        mo.model = model.sim;
        mo.inputs = new ScilabString(["p"], ["inp"]);
        mo.outputs = new ScilabString(["n"]);
        mo.parameters = list(new ScilabString(...this.S), new ScilabDouble(...this.Z));
        model.equations = mo;
        model.in = new ScilabDouble(...ones(size(getData(mo.inputs), "*"), 1));
        model.out = new ScilabDouble(...ones(size(getData(mo.outputs), "*"), 1));
        model.rpar = new ScilabDouble(...this.Z);

        var exprs = new ScilabString(...this.Z);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"Switch\",sz(1),sz(2));"]);
        this.x = standard_define(new ScilabDouble([2, 2]), model, exprs, list(gr_i, new ScilabDouble(0)));
        this.x.graphics.in_implicit = new ScilabString([["I"], ["E"]]);
        this.x.graphics.out_implicit = new ScilabString(["I"]);
        return new BasicBlock(this.x);
    }

    Switch.prototype.details = function Switch() {
        this.x;
    }
    Switch.prototype.get = function Switch() {
        var options={
            Ron:["Resistance in On state (Ohm)",this.Ron],
            Roff:["Resistance in Off state (Ohm)",this.Roff],
        }
        return options
    }
Switch.prototype.set = function Switch() {
    this.Ron = parseFloat((arguments[0]["Ron"]))
    this.Roff = parseFloat((arguments[0]["Roff"]))
    this.x.model.equations.parameters = list(new ScilabString(...this.S), new ScilabDouble([this.Ron],[this.Roff]));
    var exprs = new ScilabString([this.Ron],[this.Roff])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function SWITCH2_m() {

    SWITCH2_m.prototype.define = function SWITCH2_m() {
        this.ipar = [0];
        this.nzz = 1;
        this.rpar = 0;

        var model = scicos_model();
        model.sim = list(new ScilabString(["switch2_m"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([-1], [1], [-1]);
        model.in2 = new ScilabDouble([-2], [1], [-2]);
        model.intyp = new ScilabDouble([1]);
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble([-2]);
        model.outtyp = new ScilabDouble([1]);
        model.ipar = new ScilabDouble(this.ipar);
        model.rpar = new ScilabDouble([this.rpar]);
        model.nzcross = new ScilabDouble([this.nzz]);
        model.nmode = new ScilabDouble([1]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([1], this.ipar, [this.rpar], [this.nzz]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"SWITCH2_m\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    SWITCH2_m.prototype.details = function SWITCH2_m() {
        return this.x;
    }
    SWITCH2_m.prototype.get = function SWITCH2_m() {
    if(this.ot == undefined || this.ot == null){
        this.ot = "1"
    }
    if(this.rule == undefined || this.rule == null){
        this.rule = "0"
    }
    if(this.thra == undefined || this.thra == null){
        this.thra = "0"
    }

        var options={
            ot:["Datatype (1=real double  2=complex 3=int32 ...)",sci2exp(1)],
            rule:["pass first input if: u2>=a (0), u2>a (1), u2~=a (2)",this.rule],
            thra:["threshold a",this.thra],
            nzz:["use zero crossing: yes (1), no (0)",this.nzz],
        }
        return options
    }
SWITCH2_m.prototype.set = function SWITCH2_m() {
    this.ot = parseFloat((arguments[0]["ot"]))
    this.rule = parseFloat((arguments[0]["rule"]))
    this.thra = parseFloat((arguments[0]["thra"]))
    this.nzz = parseFloat((arguments[0]["nzz"]))
    this.rule = Math.floor(this.rule)
    if(this.rule < 0)
        this.rule = 0
    else if(this.rule > 2)
        this.rule = 2
    this.x.model.ipar = new ScilabDouble([this.rule])
    this.x.model.rpar = new ScilabDouble([this.thra])
    if(this.nzz != 0){
        this.x.model.nmode = 1
        this.x.model.nzcross = 1
    }
    else{
        this.x.model.nmode = 0
        this.x.model.nzcross = 0
    }
    var exprs = new ScilabString(sci2exp(this.ot),[this.rule],[this.thra],[this.nzz])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function SWITCH_f() {

    SWITCH_f.prototype.define = function SWITCH_f() {
        this.i0 = 0;
        this.in1 = [[-1], [-1]];
        this.nin = 2;

        var model = scicos_model();
        model.sim = list(new ScilabString(["switchn"]), new ScilabDouble([2]));
        model.in = new ScilabDouble(...this.in1);
        model.out = new ScilabDouble([-1]);
        model.ipar = new ScilabDouble([this.i0]);
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, true]);

        var exprs = new ScilabString([this.nin], [this.i0 + 1]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"SWITCH_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    
    SWITCH_f.prototype.internal = function SWITCH_f() {
        this.i0 = 0;
        this.in1 = [[-1],[-1]];
        this.nin = 2;
    
        var model = scicos_model();
        model.sim=list(new ScilabString(["switchn"]),new ScilabDouble([2]));
        model.in=new ScilabDouble(...this.in1);
        model.out = new ScilabDouble([-1]);
        model.ipar=new ScilabDouble([this.i0]);
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true,true]);
    
        var exprs = new ScilabString([this.nin],[this.i0+1]);
    
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"SWITCH_f\",sz(1),sz(2));"]);
        var block=new standard_define(new ScilabDouble([2,2]),model,exprs,gr_i);
        return block;
    }

    SWITCH_f.prototype.details = function SWITCH_f() {
        return this.x;
    }
    SWITCH_f.prototype.get = function SWITCH_f() {
        if(this.z0 == undefined || this.z0 == null){
            this.z0 = "1"
        }
        var options={
            nin:["number of inputs",this.nin],
            z0:["connected input",this.z0],
        }
        return options
    }
SWITCH_f.prototype.set = function SWITCH_f() {
    this.nin = parseFloat((arguments[0]["nin"]))
    this.z0 = parseFloat((arguments[0]["z0"]))
    this.x.model.ipar = new ScilabDouble([this.z0]-1)
    var exprs = new ScilabString([this.nin],[this.z0])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function TANBLK_f() {
    TANBLK_f.prototype.get = function TANBLK_f() {
        alert("not get for this block")
    }

    TANBLK_f.prototype.define = function TANBLK_f() {
        this.in1 = -1;
        var model = scicos_model();
        model.sim = new ScilabString(["tanblk"]);
        model.in = new ScilabDouble([this.in1]);
        model.out = new ScilabDouble([this.in1]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([sci2exp(this.in1)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"TANBLK_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    TANBLK_f.prototype.details = function TANBLK_f() {
        return this.x;
    }
}
function TCLSS() {

    TCLSS.prototype.define = function TCLSS() {
        this.x0 = 0;
        this.A = 0;
        this.B = 1;
        this.C = 1;
        this.D = 0;
        this.in1 = 1;
        this.nx = size(this.x0, "*");
        this.out = 1;

        var model = scicos_model();
        model.sim = list(new ScilabString(["tcslti4"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([this.in1], [this.nx]);
        model.out = new ScilabDouble([this.out]);
        model.evtin = new ScilabDouble([1]);
        model.state = new ScilabDouble([this.x0]);
        model.rpar = new ScilabDouble([this.A], [this.B], [this.C], [this.D]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, true]);

        var exprs = new ScilabString([sci2exp(this.A)], [sci2exp(this.B)], [sci2exp(this.C)], [sci2exp(this.D)], [sci2exp(this.x0)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"TCLSS\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }


    TCLSS.prototype.details = function TCLSS() {
        return this.x;
    }
}
function TEXT_f() {

    TEXT_f.prototype.define = function TEXT_f() {
        this.font = 2;
        this.siz = 1;

        var model = scicos_model();
        model.sim = new ScilabString(["text"]);
        model.rpar = new ScilabString(["Text"]);
        model.ipar = new ScilabDouble([this.font], [this.siz]);

        var exprs = ["Text", this.font, this.siz];

        var graphics = scicos_graphics();
        graphics.orig = new ScilabDouble([0, 0]);
        graphics.sz = new ScilabDouble([2, 1]);
        graphics.exprs = new ScilabString(exprs);
        this.x = mlist(["Text", "graphics", "model", "void", "gui"], new ScilabString(["Text", "graphics", "model", "void", "gui"]), graphics, model, new ScilabString([" "]), new ScilabString(["TEXT_f"]));
        return new TextBlock(this.x);
    }

    TEXT_f.prototype.details = function TEXT_f() {
        return this.x;
    }
}
function TIME_DELAY() {

    TIME_DELAY.prototype.define = function TIME_DELAY() {
        this.nin = 1;
        this.T = 1;
        this.init = 0;
        this.N = 1024;

        var model = scicos_model();
        model.sim = list(new ScilabString(["time_delay"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([this.nin]);
        model.out = new ScilabDouble([this.nin]);
        model.rpar = new ScilabDouble([this.T, this.init]);
        model.ipar = new ScilabDouble([this.N]);
        model.blocktype = new ScilabString(["x"]);
        model.dep_ut = new ScilabBoolean([false, true]);

        var exprs = new ScilabString([this.T], [this.init], [this.N]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"TIME_DELAY\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3.5, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    TIME_DELAY.prototype.details = function TIME_DELAY() {
        return this.x;
    }
}
function TIME_f() {
    TIME_f.prototype.get = function TIME_f() {
        alert("You can not set parameters")
    }

    TIME_f.prototype.define = function TIME_f() {
        var model = scicos_model();
        model.sim = new ScilabString(["timblk"]);
        model.out = new ScilabDouble([1]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, true]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"TIME_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, new ScilabDouble(), gr_i);
        return new BasicBlock(this.x);
    }

    TIME_f.prototype.details = function TIME_f() {
        return this.x;
    }
}
function TKSCALE() {

    TKSCALE.prototype.define = function TKSCALE() {
        this.a = -10;
        this.b = 10;
        this.f = 1;

        var model = scicos_model();
        model.sim = list(new ScilabString(["tkscaleblk"]), new ScilabDouble([5]));
        model.out = new ScilabDouble([1]);
        model.evtin = new ScilabDouble([1]);
        model.rpar = new ScilabDouble([this.a], [this.b], [this.f]);
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([sci2exp(this.a)], [sci2exp(this.b)], [sci2exp(this.f)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"TKSCALE\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    TKSCALE.prototype.details = function TKSCALE() {
        return this.x;
    }
    TKSCALE.prototype.get = function TKSCALE() {
        var options={
            a:["Min Value",this.a],
            b:["Max Value",this.b],
            f:["Normalisation",this.f]
        }
        return options
    }
TKSCALE.prototype.set = function TKSCALE() {
    this.a = parseFloat((arguments[0]["a"]))
    this.b = parseFloat((arguments[0]["b"]))
    this.f = parseFloat((arguments[0]["f"]))
    this.x.model.rpar = new ScilabDouble([this.a],[this.b],[this.f])
    var exprs = new ScilabString([sci2exp(this.a)], [sci2exp(this.b)], [sci2exp(this.f)])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function TOWS_c() {

    TOWS_c.prototype.define = function TOWS_c() {
        this.nu = -1;
        this.nz = 128;
        this.varnam = "A";
        this.herit = 0;

        var model = scicos_model();
        model.sim = list(new ScilabString(["tows_c"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([this.nu]);
        model.in2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble([-1]);
        model.out = new ScilabDouble();
        model.evtin = new ScilabDouble([1]);
        model.evtout = new ScilabDouble();
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble([this.nz], [this.varnam.length], ascii(this.varnam));
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([false, false]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"TOWS_c\",sz(1),sz(2));"]);;

        var exprs = new ScilabString([this.nz], [this.varnam], [this.herit]);
    var n = this.nz.toString();
    this.displayParameter = [[this.varnam],[n]];
        this.x = new standard_define(new ScilabDouble([4, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    TOWS_c.prototype.details = function TOWS_c() {
        return this.x;
    }
    TOWS_c.prototype.get = function TOWS_c() {
        var options={
            nz:["Size of buffer",this.nz],
            varnam:["Scilab variable name",this.varnam],
            herit:["Inherit (no:0, yes:1)",this.herit],
        }
        return options
    }
TOWS_c.prototype.set = function TOWS_c() {
    this. nz = parseFloat((arguments[0][" nz"]))
    this. varnam = arguments[0][" varnam"]
    this. herit = parseFloat((arguments[0][" herit"]))
    if(this.herit == 1){
        this.x.model.blocktype = new ScilabDouble(["x"]);
    }
    else{
        this.x.model.blocktype = new ScilabDouble(["d"]);
    }
    this.x.model.ipar = new ScilabDouble([this.nz],[this.varnam.length],[ascii(this.varnam)])
    var exprs = new ScilabString([this. nz],[this. varnam],[this. herit])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}

function TRASH_f() {

    TRASH_f.prototype.get = function TRASH_f() {
        alert("no get for this block")
    }

    TRASH_f.prototype.define = function TRASH_f() {
        this.in1 = -1;

        var model = scicos_model();
        model.sim = new ScilabString(["trash"]);
        model.in = new ScilabDouble([this.in1]);
        model.evtin = new ScilabDouble([1]);
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([" "]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"TRASH_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    TRASH_f.prototype.details = function TRASH_f() {
        return this.x;
    }
}
function TrigFun() {

    TrigFun.prototype.define = function TrigFun() {
        var model = scicos_model();
        model.sim = list(new ScilabString(["sin_blk"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([-1]);
        model.out = new ScilabDouble([-1]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString(["sin"]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"TrigFun\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([4, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    TrigFun.prototype.details = function TrigFun() {
        return this.x;
    }
    TrigFun.prototype.get = function TrigFun() {
        if(this.fun == undefined || this.fun == null){
            this.fun = "sin"
        }
        var options={
            fun:["Function",this.fun],
        }
        return options
    }
TrigFun.prototype.set = function TrigFun() {
    this.fun = arguments[0]["fun"]
    model.sim = list(new ScilabString([this.fun+"_blk"]), new ScilabDouble([4]));
    var exprs = new ScilabString([this.fun])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function VanneReglante() {

    VanneReglante.prototype.define = function VanneReglante() {
        var model = scicos_model();
        model.in = new ScilabDouble([1], [1]);
        model.out = new ScilabDouble([1]);

        this.Cvmax = 8005.42;
        this.p_rho = 0;

        model.rpar = new ScilabDouble([this.Cvmax], [this.p_rho]);
        model.sim = new ScilabString(["VanneReglante"]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var mo = new modelica_function();
        mo.model = new ScilabString(["VanneReglante"]);
        mo.inputs = new ScilabString(["C1", "Ouv"]);
        mo.outputs = new ScilabString(["C2"]);
        mo.parameters = list(new ScilabString(["Cvmax"], ["p_rho"]), new ScilabDouble([this.Cvmax], [this.p_rho]));
        model.equations = mo;
        model.in = new ScilabDouble(...ones(size(getData(mo.inputs), "*"), 1));
        model.out = new ScilabDouble(...ones(size(getData(mo.outputs), "*"), 1));

        var exprs = new ScilabString([this.Cvmax], [this.p_rho]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"VanneReglante\",sz(1),sz(2));"]);
        this.x = standard_define([2, 2], model, exprs, list(gr_i, new ScilabDouble([0])));
        this.x.graphics.in_implicit = new ScilabString(["I"], ["E"]);
        this.x.graphics.out_implicit = new ScilabString(["I"]);
        return new BasicBlock(this.x);
    }

    VanneReglante.prototype.details = function VanneReglante() {
        return this.x;
    }
    VanneReglante.prototype.get = function VanneReglante() {
        var options={
            Cvmax:["Cvmax",this.Cvmax.toString().replace(/,/g," ")],
            p_rho:["p_rho",this.p_rho.toString().replace(/,/g," ")],
        }
        return options
    }
VanneReglante.prototype.set = function VanneReglante() {
    this.Cvmax = inverse(arguments[0]["Cvmax"])
    this.p_rho = inverse(arguments[0]["p_rho"])
    this.x.model.rpar = new ScilabDouble(...this.Cvmax,...this.p_rho)
    this.x.model.equations.parameters = list(new ScilabString(["Cvmax"], ["p_rho"]),new ScilabDouble(...this.Cvmax,...this.p_rho));
    var exprs = new ScilabString([this.Cvmax.toString().replace(/,/g, " ")],[this.p_rho.toString().replace(/,/g, " ")])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function VariableResistor() {

    VariableResistor.prototype.define = function VariableResistor() {
        var model = scicos_model();
        model.sim = new ScilabString(["VariableResistor"]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var mo = new modelica_function();
        mo.model = new ScilabString(["VariableResistor"]);
        mo.inputs = new ScilabString(["p", "R"]);
        mo.outputs = new ScilabString(["n"]);
        model.equations = mo;
        model.in = new ScilabDouble(...ones(size(getData(mo.inputs), "*"), 1));
        model.out = new ScilabDouble(...ones(size(getData(mo.outputs), "*"), 1));

        var exprs = new ScilabDouble();

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"VariableResistor\",sz(1),sz(2));"]);;
        this.x = standard_define([2, 2], model, exprs, list(gr_i, 0));
        this.x.graphics.in_implicit = new ScilabString(["I", "E"]);
        this.x.graphics.out_implicit = new ScilabString(["I"]);
        return new BasicBlock(this.x);
    }

    VariableResistor.prototype.details = function VariableResistor() {
        return this.x;
    }
}
function VARIABLE_DELAY() {

    VARIABLE_DELAY.prototype.define = function VARIABLE_DELAY() {
        this.nin = 1;
        this.T = 1;
        this.init = 0;
        this.N = 1024;

        var model = scicos_model();
        model.sim = list(new ScilabString(["variable_delay"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([this.nin], [1]);
        model.out = new ScilabDouble([this.nin]);
        model.rpar = new ScilabDouble([this.T, this.init]);
        model.ipar = new ScilabDouble([this.N]);
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([this.T], [this.init], [this.N]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"VARIABLE_DELAY\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    VARIABLE_DELAY.prototype.details = function VARIABLE_DELAY() {
        return this.x;
    }
    VARIABLE_DELAY.prototype.get = function VARIABLE_DELAY() {
        var options={
            T:["Max delay",this.T],
            init:["initial input",this.init],
            N:["Buffer size",this.N],
        }
        return options
    }
    VARIABLE_DELAY.prototype.set = function VARIABLE_DELAY() {
        this.T = parseFloat((arguments[0]["T"]))
        this.init = parseFloat((arguments[0]["init"]))
        this.N = parseFloat((arguments[0]["N"]))
        this.x.model.rpar = new ScilabDouble([this.T],[this.init])
        this.x.model.ipar = new ScilabDouble([this.N]);
        var exprs = new ScilabString([this.T],[this.init],[this.N])
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)
    }
}
function VirtualCLK0() {
    VirtualCLK0.prototype.get = function VirtualCLK0() {
        alert("parameters can not be set")
    }

    VirtualCLK0.prototype.define = function VirtualCLK0() {
        var model = scicos_model();
        model.sim = new ScilabString(["vrtclk0"]);
        model.evtin = new ScilabDouble([1]);
        model.opar = list();
        model.ipar = new ScilabDouble();
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble([-1]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabDouble();
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, new ScilabString([" "]));
        return new BasicBlock(this.x);
    }

    VirtualCLK0.prototype.details = function VirtualCLK0() {
        return this.x;
    }

}
function VoltageSensor() {
    VoltageSensor.prototype.define = function VoltageSensor() {
        alert("parameters can not be changed")
    }

    VoltageSensor.prototype.define = function VoltageSensor() {
        var model = scicos_model();
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1], [, 1]);
        model.sim = new ScilabString(["VoltageSensor"]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var mo = new modelica_function();
        mo.model = new ScilabString(["VoltageSensor"]);
        mo.inputs = new ScilabString(["p"]);
        mo.outputs = new ScilabString(["n"], ["v"]);
        model.equations = mo;

        var exprs = new ScilabDouble();

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"VoltageSensor\",sz(1),sz(2));"]);;
        this.x = standard_define([2, 2], model, exprs, list(gr_i, new ScilabDouble([0])));
        this.x.graphics.in_implicit = new ScilabString(["I"]);
        this.x.graphics.out_implicit = new ScilabString(["I"], ["E"]);
        return new VoltageSensorBlock(this.x);
    }

    VoltageSensor.prototype.details = function VoltageSensor() {
        return this.x;
    }
}
function VsourceAC() {
    
    VsourceAC.prototype.define = function VsourceAC() {
        var model = scicos_model();
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);

        this.VA = 220;

        this.FR = 50;
        model.rpar = new ScilabDouble([this.VA], [this.FR]);
        model.sim = new ScilabString(["VsourceAC"]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var mo = modelica_function();
        mo.model = new ScilabString(["VsourceAC"]);
        mo.inputs = new ScilabString(["p"]);
        mo.outputs = new ScilabString(["n"]);
        mo.parameters = list(new ScilabString(["VA"], ["f"]), list(new ScilabDouble([this.VA]), new ScilabDouble([this.FR])));
        model.equations = mo;

        var exprs = new ScilabString([this.VA], [this.FR]);
    var n =this.VA.toString();
    var k= this.FR.toString();
    this.displayParameter=[[n],[k]];


        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"VsourceAC\",sz(1),sz(2));"]);
        
        this.x = standard_define([2, 2], model, exprs, list(gr_i, 0));
        this.x.graphics.in_implicit = new ScilabString(["I"]);
        this.x.graphics.out_implicit = new ScilabString(["I"]);
        
        return new BasicBlock(this.x);
    }

    VsourceAC.prototype.details = function VsourceAC() {
        return this.x;
    }
    VsourceAC.prototype.get = function VsourceAC() {
        var options={
            VA:["Amplitude (Volt)",this.VA.toString().replace(/,/g," ")],
            FR:["Frequency (Hz)",this.FR.toString().replace(/,/g," ")],
        }
        return options
    }
VsourceAC.prototype.set = function VsourceAC() {
    this.VA = inverse(arguments[0]["VA"])
    this.FR = inverse(arguments[0]["FR"])
    this.x.model.rpar = new ScilabDouble([this.VA],[this.FR])
    this.x.model.equations.parameters = list(new ScilabString(["VA"], ["f"]), list(new ScilabDouble(...this.VA), new ScilabDouble(...this.FR)));
    var exprs = new ScilabString([this.VA.toString().replace(/,/g, " ")],[this.FR.toString().replace(/,/g, " ")])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
function VVsourceAC() {
    
    VVsourceAC.prototype.define = function VVsourceAC() {
        var model = scicos_model();
        
        model.in = new ScilabDouble([1], [1]);
        model.out = new ScilabDouble([1]);

        this.VA = 220;
        this.FR = 50;
        
        model.rpar = new ScilabDouble([this.FR]);
        model.sim = new ScilabString(["VVsourceAC"]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var mo = modelica_function();
        mo.model = new ScilabString(["VVsourceAC"]);
        mo.inputs = new ScilabString(["p", "VA"]);
        mo.outputs = new ScilabString(["n"]);
        mo.parameters = list(new ScilabString(["f"]), list(new ScilabDouble([this.FR])));
        model.equations = mo;

        var exprs = new ScilabString([this.FR]);
    var n =this.FR.toString();
    this.displayParameter=[n];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"VVsourceAC\",sz(1),sz(2));"]);
        
        
        this.x = standard_define([2, 2], model, exprs, list(gr_i, 0));
        this.x.graphics.in_implicit = new ScilabString(["I", "E"]);
        this.x.graphics.out_implicit = new ScilabString(["I"]);
        
        return new BasicBlock(this.x);
    }

    VVsourceAC.prototype.details = function VVsourceAC() {
        return this.x;
    }
}
//updated on 8/6/17 --ritveeka
function WRITEAU_f() {

    WRITEAU_f.prototype.define = function WRITEAU_f() {
        this.in1 = 1;
        this.nin = math.sum(this.in1);
        this.frmt = "uc ";
        this.fname = "/dev/audio";
        this.swap = 0;
        this.lunit = 0;
        this.N = 2;

        var model = scicos_model();
        model.sim = list(new ScilabString(["writeau"]), new ScilabDouble([2]));
        model.in = new ScilabDouble([this.in1]);
        model.evtin = new ScilabDouble([1]);
        model.dstate = new ScilabDouble([-1], [this.lunit], ...zeros((this.nin + 1) * this.N, 1));
        model.ipar = new ScilabDouble([this.fname.length], ..._str2code(this.frmt), [this.N], [this.swap], ..._str2code(this.fname));
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([this.N], [this.swap]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"WRITEAU_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([4, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    WRITEAU_f.prototype.details = function WRITEAU_f() {
        return this.x;
    }
    WRITEAU_f.prototype.get = function WRITEAU_f() {
        var options={
            N:["Buffer Size",this.N],
            swap:["Swap Mode (0:No, 1:Yes)",this.swap],
        }
        return options;
    } 

    WRITEAU_f.prototype.set = function WRITEAU_f() {
        
        this.N= parseFloat((arguments[0]["N"]));
        this.swap= parseFloat((arguments[0]["swap"]));
        this.x.model.sim = list(new ScilabString(["writeau"]), new ScilabDouble([2]));
        this.x.model.in = new ScilabDouble([this.in1]);
        this.x.model.dstate = new ScilabDouble([-1], [this.lunit], ...zeros((this.nin + 1) * this.N, 1));
        this.x.model.ipar = new ScilabDouble([this.fname.length], ..._str2code(this.frmt), [this.N], [this.swap], ..._str2code(this.fname));
        this.x.graphics.exprs = new ScilabString([this.N], [this.swap]);
        return new BasicBlock(this.x);               
    }
}
 
//updated on 8/6/17 --ritveeka
function WRITEC_f () {
    
    WRITEC_f.prototype.define = function WRITEC_f() {
        this.in = 1;
        this.nin = math.sum(this.in);
        this.frmt = "c  ";
        this.fname = "foo";
        this.swap = 0;
        this.lunit = 0;
        this.N = 2;

        var model = scicos_model();
        model.sim = list(new ScilabString(["writec"]), new ScilabDouble([2]));
        model.in = new ScilabDouble([this.in]);
        model.evtin = new ScilabDouble([1]);
        model.dstate = new ScilabDouble([-1], [this.lunit], ...zeros((this.nin + 1) * this.N, 1));
        model.ipar = new ScilabDouble([this.fname.length], ..._str2code(this.frmt), [this.N], [this.swap], ..._str2code(this.fname));
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([sci2exp(this.in)], [this.fname], [this.frmt], [this.N], [this.swap]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"WRITEC_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([4, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    WRITEC_f.prototype.details = function WRITEC_f() {
        return this.x;
    }
    WRITEC_f.prototype.get = function WRITEC_f() {


        var options={
            in:["Write to C binary file",this.in],
            fname1:["Output File Name",this.fname],
            frmt1:["Output Format",this.frmt],
            N:["Buffer Size",this.N],
            swap:["Swap Mode (0:No, 1:Yes)",this.swap],

        };
        return options;
    }
    WRITEC_f.prototype.set = function WRITEC_f() {
        this.in = parseFloat((arguments[0]["in"]));
        this.fname = (arguments[0]["fname1"]);
        this.frmt = (arguments[0]["frmt1"]);
        this.N = parseFloat((arguments[0]["N"]));
        this.swap = parseFloat((arguments[0]["swap"]));
        this.nin=this.in;
        this.x.model.ipar = new ScilabDouble([this.fname.length], ..._str2code(this.frmt), [this.N], [this.swap], ..._str2code(this.fname));
        this.x.model.in = new ScilabDouble([this.in]);
        var exprs = new ScilabString([sci2exp(this.in)], [this.fname], [this.frmt], [this.N], [this.swap]);
        this.x.graphics.exprs = exprs;
        return new BasicBlock(this.x);
    }
}

 
function ZCROSS_f() {
    
    ZCROSS_f.prototype.define = function ZCROSS_f() {
        this.rpar = [[-1], [-1], [0], [0]];

        this.in = 1;

        var model = scicos_model();
        model.sim = list(new ScilabString(["zcross"]), new ScilabDouble([1]));
        model.in = new ScilabDouble([this.in]);
        model.nzcross = new ScilabDouble([this.in]);
        model.evtout = new ScilabDouble([1]);
        model.rpar = new ScilabDouble([-1], [-1], [0], [0]);
        model.blocktype = new ScilabString(["z"]);
        model.firing = new ScilabDouble([-1]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([sci2exp(this.in)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"ZCROSS_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        
        return new BasicBlock(this.x);
    }
    
    ZCROSS_f.prototype.details = function ZCROSS_f() {
        return this.x;
    }
    ZCROSS_f.prototype.get = function ZCROSS_f() {
        var options={
            in:["Input size",this.in],
        }
        return options
    }
ZCROSS_f.prototype.set = function ZCROSS_f() {
    this.in = parseFloat((arguments[0]["in"]))
    this.kk=0
    for (var jj = 1; jj <= this.in; jj++) {
        this.kk = this.kk + Math.pow(2,this.in+jj-1)
    }
    this.value = ones(this.kk,1)
    for (var i = this.value.length - 1; i >= 0; i--) {
        this.value[i][0] = -1*this.value[i][0]
    }
    this.x.model.rpar = new ScilabDouble(...this.value,...zeros(Math.pow(2,2*this.in),1))
    this.x.model.in = new ScilabDouble([this.in]);
    this.x.model.nzcross = new ScilabDouble([this.in]);
    this.x.model.firing = new ScilabDouble([-1]);
    var exprs = new ScilabString([this.in])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
}
