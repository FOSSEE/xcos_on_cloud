function Sigbuilder() {

    Sigbuilder.prototype.define = function Sigbuilder() {
	    this.xx = [0,1,2];
	    this.yy = [10,20,-30];
	    this.N = 3;
	    this.Method = 3;
	    this.PeriodicOption = "y";
	    this.graf = "n";
        var scs_m_1 = scicos_diagram({
                version: new ScilabString(["scicos4.2"]),
                props: scicos_params({
                wpar: new ScilabDouble([600, 450, 0, 0, 600, 450]),
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
                exprs: new ScilabString([this.Method],[sci2exp(this.xx)],[sci2exp(this.yy)], [this.PeriodicOption], [this.graf]),
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
                intyp: new ScilabDouble([1]),
                out: new ScilabDouble([1]),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble([1]),
                evtin: new ScilabDouble([1]),
                evtout: new ScilabDouble([1]),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble([...this.xx,...this.yy]),
                ipar: new ScilabDouble([this.N,this.Method,1]),
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

        var model = scicos_model();
        model.sim = new ScilabString(["csuper"]);
        model.in = new ScilabDouble();
        model.in2 = new ScilabDouble();
        model.intyp = new ScilabDouble([1]);
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble();
        model.outtyp = new ScilabDouble([1]);
        model.evtin = new ScilabDouble();
        model.evtout = new ScilabDouble([1]);
        model.state = new ScilabDouble();
        model.dstate = new ScilabDouble();
        model.odstate = list();
        model.rpar = scs_m_1;
        model.ipar = new ScilabDouble();
        model.opar = list();
        model.blocktype = new ScilabString(["h"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([false, false]);
        model.label = new ScilabString([""]);
        model.nzcross = new ScilabDouble([0]);
        model.nmode = new ScilabDouble([0]);
        model.equations = list();

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"Sigbuilder\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, new ScilabDouble(), gr_i);
        return new BasicBlock(this.x);
    }
    Sigbuilder.prototype.get = function Sigbuilder() {
        var options = {
            Method:["Spline Method(0..7)",this.Method],
            xx:["x",sci2exp(this.xx)],
            yy:["y",sci2exp(this.yy)],
            PeriodicOption:["Periodic signal(y/n)?",this.PeriodicOption],
	     graf:["Launch graphic window(y/n)?",this.graf],
         }
        return options


    }
    Sigbuilder.prototype.set = function Sigbuilder() {
        var Ask_again = false;
        var SaveExit = false;
        var Method1 = arguments[0]["Method"];
        var xx1 = arguments[0]["xx"];
        var yy1 = arguments[0]["yy"];
        var PeriodicOption1 = arguments[0]["PeriodicOption"];
        var graf1 = arguments[0]["graf"];

        var regex_char = /[a-zA-Z]/g; //check character
        var regex_special_char = /[!@#$%&_=]/g; //check character
        var regex_math_char = /[^*-+]/g; //check character
        var regex_semicolon_comma = /[,;]+/; //check semicolon and comma
        var regex_parentheses = /[\])}[{(]/g; // check for brackets
        var regex_num = /^\d+$/; //check number only
        var regex_special_withmath_char = /[@%^&*-+=]/g; //check character

        var semi_comma_array = Method1.match(regex_semicolon_comma);
        if(semi_comma_array != null){
            alert("Answer given for Spline Method (0..7)\nhas invalid dimension:\nwaiting for dimension 1.");
            throw "incorrect";
        }
        var lastchar = Method1.slice(-1);
        var exist_last_char = regex_math_char.test(lastchar);
        if(!exist_last_char){
            alert("Answer given for Spline Method (0..7)\nis incorrect: Invalid factor..");
            throw "incorrect";
        }
        var chararray = Method1.match(regex_char);
        if (chararray != null) {
            alert("Answer given for Spline Method (0..7)\nis incorrect: Undefined variable:"+Method1);
            throw "incorrect";
        }
        Method1 = Method1.replace(regex_parentheses, '');
        var mtd = getValueOfImaginaryInput(Method1);
        if(mtd != null){
            mtd = Math.floor(parseInt(mtd));
        }
        if (mtd < 0){
            mtd = 0;
        }
        if (mtd > 7){
            mtd = 7;
        }
        var METHOD = getmethod(mtd);
        PeriodicOption1 = PeriodicOption1.trim();
        var PO = 0;
        if (PeriodicOption1 == "y" || PeriodicOption1 == "Y"){
            PO = 1;
        }else{
            PeriodicOption1 = "n";
            PO = 0;
        }
        var xx_arry = [];
        var yy_arry = [];
        var xx2 = xx1.replace(regex_parentheses, '');
        var yy2 = yy1.replace(regex_parentheses, '');
        xx2 = (xx2.trim().replace(/\s\s+/g," ")).replace(/\s+/g,",");
        yy2 = (yy2.trim().replace(/\s\s+/g," ")).replace(/\s+/g,",");
        if(xx2.includes(";") == true){
            var x = xx2.split(/[;]+/);
            for(var i = 0;i<x.length;i++){
                xx_arry[i] = parseFloat(x[i]);
            }
        }else{
            if((xx2.includes(",") == true)){
                var x_size = xx2.split(/[,]+/);
                for(var i = 0;i<x_size.length;i++){
                    xx_arry[i] = parseFloat(x_size[i]);
                }
            }else{
                xx_arry[0] = parseFloat(0);
            }
        }
        if(yy2.includes(";") == true){
            var y = yy2.split(/[;]+/);
            for(var i = 0;i<y.length;i++){
                yy_arry[i] = parseFloat(y[i]);
            }
        }else{
            if((yy2.includes(",") == true)){
                var y_size = yy2.split(/[,]+/);
                for(var i = 0;i<y_size.length;i++){
                    yy_arry[i] = parseFloat(y_size[i]);
                }
            }else{
                yy_arry[0] = parseFloat(0);
            }
        }

        if(!Ask_again){
            var x_size = xx_arry.length;
            var y_size = yy_arry.length;
            if(x_size != y_size){
                alert("Incompatible size of [x] and [y]");
                throw "incorrect";
                Ask_again = true;
            }
        }
        graf1 = graf1.trim();
        var Xdummy = [];
        var Ydummy = [];
        var orpar = [];
        var oipar = [];
        if(!Ask_again){
            var xy = "";
            for(var i = 0;i<xx_arry.length;i++){
                if(i != (xx_arry.length-1)){
                    xy += xx_arry[i]+","+yy_arry[i]+";";
                }else{
                    xy += xx_arry[i]+","+yy_arry[i];
                }
            }
            xy = JSON.parse(cleandata(xy.toString()));
            console.log(xy);
            var N = xy.length;
            if (graf1 == "y" || graf1 == "Y"){  //Opening graphics window
                var ipar = [N,mtd,PO];
                var rpar = [];

                var graphPoints = [];
                var entered_X_Points = [];
                var entered_Y_Points = [];
                for(var i = 0;i < xy.length;i++){
                    entered_X_Points[i] = xx_arry[i];
                    entered_Y_Points[i] = yy_arry[i];
                    var arry = [];
                    arry[0] =  xy[i][0];
                    arry[1] = xy[i][1];
                    graphPoints[i] = arry;
                }
                var xmin = parseFloat(Math.min(...xx_arry));
                if(xmin < 0){
                    xmin = 0;
                }
                var xmax = parseFloat(Math.max(...xx_arry));
                var ymin = parseFloat(Math.min(...yy_arry));
                var ymax = parseFloat(Math.max(...yy_arry));
                var charttype = getcharttype(mtd);
                var xpointinterval = parseFloat(0.5);
                var xmaxTitle = xmax;
                if(xmax <= 2){
                    xpointinterval = parseFloat(0.2);
                    xmax = parseFloat(xmax + xpointinterval);
                }else{
                    var diff_x = parseFloat((((Math.abs(xmax - xmin))/100)*10).toFixed(1));
                    xmax = parseFloat(xmax + diff_x).toFixed(1);
                    xpointinterval = diff_x;
                }
                var step = "";
                var stepname = "";
                if(mtd == 0){
                    step = "left";
                    stepname = "Left";
                }
                ymax = parseFloat(ymax + 1);
                ymin = parseFloat(ymin - 1);
                var points = xx_arry.length;
                var graphParameters = {
                    original_X_Points: entered_X_Points,
                    original_Y_Points: entered_Y_Points,
                    graphPoints: graphPoints,
                    xmin: xmin,
                    xmax: xmax,
                    ymin: ymin,
                    ymax: ymax,
                    chartType: charttype,
                    points: points,
                    mtd: mtd,
                    PeriodicOption: PeriodicOption1,
                    graf: graf1,
                    xmaxTitle: xmaxTitle,
                    xpointInterval: xpointinterval,
                    step: step,
                    name: stepname
                };
                if(check_call != 2){
                    showGraphWindowSigBlk(graph_sigbuilder,graphParameters,cell_sigbuilder);
                }else{
                    check_call = 1 ;
                }
                graf1 = "n";
                document.getElementById("Method").value = Method1;
                document.getElementById("xx").value = xx1;
                document.getElementById("yy").value = yy1;
                document.getElementById("PeriodicOption").value = PeriodicOption1;
                document.getElementById("graf").value = graf1;
                //code comes from save/exit part for graph window
                if(N == 1){
                    mtd = 0;
                }
                var xy_1 = [];
                for(var i = 0;i < xy.length;i++){
                    xy_1[i] = xy[i][0];
                }
                var xy_2 = [];
                for(var i = 0;i < xy.length;i++){
                    xy_2[i] = xy[i][1];
                }
                var do_spline_values = Do_Spline(N,mtd,xy_1.toString(),xy_2.toString());
                Xdummy = JSON.parse(do_spline_values.Xdummy.replace(" ",","));
                Ydummy = JSON.parse(do_spline_values.Ydummy.replace(" ",","));
                orpar = JSON.parse(do_spline_values.orpar.replace(" ",","));

                var NOrder = ipar[1];
                var PeridicOption = ipar[2];

                METHOD = getmethod(NOrder);
                if (METHOD == "periodic") {// periodic spline
                    xy[N-1][1] = xy[0][1];
                }
                var xy_1_1 = [];
                for(var i = 0;i < xy.length;i++){
                    xy_1_1[i] = xy[i][0];
                }
                var xy_2_2 = [];
                for(var i = 0;i < xy.length;i++){
                    xy_2_2[i] = xy[i][1];
                }

                if (METHOD=="order 2" || METHOD=="not_a_knot"||METHOD=="periodic" || METHOD=="monotone"|| METHOD=="fast" ||METHOD=="clamped"){
                    orpar = [xy_1_1,xy_2_2,orpar];
                }else{
                    if (METHOD=="zero order"||METHOD=="linear"){
                        orpar = [xy_1_1,xy_2_2];
                    }
                }
                oipar = [N,mtd,PO];
                SaveExit = true;
                throw "incorrect";
            }else{

                graf1 = "n";
                var xy_1 = [];
                for(var i = 0;i < xy.length;i++){
                    xy_1[i] = xy[i][0];
                }
                var xy_2 = [];
                for(var i = 0;i < xy.length;i++){
                    xy_2[i] = xy[i][1];
                }
                var do_spline_values = Do_Spline(N,mtd,xy_1.toString(),xy_2.toString());
                Xdummy = JSON.parse(do_spline_values.Xdummy.replace(" ",","));
                Ydummy = JSON.parse(do_spline_values.Ydummy.replace(" ",","));
                orpar = JSON.parse(do_spline_values.orpar.replace(" ",","));
                if (METHOD == "periodic") {
                    xy[N-1][1] = xy[0][1];
                }
                var xy_1_1 = [];
                for(var i = 0;i < xy.length;i++){
                    xy_1_1[i] = xy[i][0];
                }
                var xy_2_2 = [];
                for(var i = 0;i < xy.length;i++){
                    xy_2_2[i] = xy[i][1];
                }
                if (METHOD == "order 2" || METHOD == "not_a_knot" || METHOD == "periodic"
                || METHOD == "monotone"|| METHOD == "fast" || METHOD == "clamped") {
                    orpar = [xy_1_1,xy_2_2,orpar];
                }else{
                    if (METHOD == "zero order"||METHOD == "linear"){
                        orpar = [xy_1_1,xy_2_2];
                    }
                }
                oipar = [N,mtd,PO];
                SaveExit = true;
            }
        }
        if(SaveExit){
            var xp = [];
            var len = oipar[0]-1;
            if(orpar[0][1] != undefined){
                for(var i = 0; i < orpar.length; i++){
                    for(var j = 0; j <= len; j++){
                        if (orpar[i][j]>=0){
                            xp[j] = j;
                        }
                    }
                }
            }else{
                for(var i = 0; i <= len; i++){
                    if (orpar[i]>=0){
                        xp[i] = i;
                    }
                }
            }
            var firing = 0;
            if (xp != []){
                if(orpar[0][1] != undefined){
                    firing = orpar[0][xp[0]];
                }else{
                    firing = orpar[xp[0]];
                }

            }else{
                firing = -1;
            }
            this.Method = mtd;
            this.xx = xx1;
            this.yy = yy1;
            this.PeriodicOption = PeriodicOption1;
            this.graf = graf1;
            var block = getRparObjByGui(this.x, 'CURVE_c');
            block.model.firing = new ScilabDouble([firing]);
            block.model.rpar = new ScilabDouble(...orpar);
            block.model.ipar = new ScilabDouble(...oipar);
            block.graphics.exprs = new ScilabString([this.Method],[sci2exp(this.xx)],[sci2exp(this.yy)], 
            [this.PeriodicOption],[this.graf]);
        }
        return new BasicBlock(this.x);
    }

    Sigbuilder.prototype.details = function Sigbuilder() {
        return this.x;
    }

    Sigbuilder.prototype.get_popup_title = function Sigbuilder() {
        var set_param_popup_title="Spline data";
        return set_param_popup_title
    }
    Sigbuilder.prototype.getDimensionForDisplay = function Sigbuilder(){
        var dimension = { width: 60, height: 40 };
        return dimension
    }

}

