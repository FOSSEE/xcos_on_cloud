function FROMWSB() {

    FROMWSB.prototype.define = function FROMWSB() {
        this.varnam = "V";
        this.Method = 1;
        this.ZC = 1;
        this.OutEnd = 0;
        var scs_m_1 = scicos_diagram({
            version: new ScilabString(["scicos4.2"]),
            props: scicos_params({
                wpar: new ScilabDouble([600, 450, 0, 0, 600, 450]),
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
                exprs: new ScilabString([this.varnam], [this.Method], [this.ZC], [this.OutEnd]),
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
                intyp: new ScilabDouble([1]),
                out: new ScilabDouble([-1]),
                out2: new ScilabDouble([-2]),
                outtyp: new ScilabDouble([-1]),
                evtin: new ScilabDouble([1]),
                evtout: new ScilabDouble([1]),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble([]),
                ipar: new ScilabDouble([this.varnam.length],..._str2code(this.varnam),[this.Method],[this.ZC],[this.OutEnd]),
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

        var model = scicos_model();
        model.sim = new ScilabString(["csuper"]);
        model.in = new ScilabDouble();
        model.in2 = new ScilabDouble();
        model.intyp = new ScilabDouble([1]);
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble([-2]);
        model.outtyp = new ScilabDouble([1]);
        model.evtin = new ScilabDouble();
        model.evtout = new ScilabDouble();
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

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"FROMWSB\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([5, 2]), model, new ScilabDouble(), gr_i);
        return new BasicBlock(this.x);
    }
    FROMWSB.prototype.details = function FROMWSB() {
        return this.x;
    }
    FROMWSB.prototype.get = function FROMWSB(){
        var options = {
            varnam:["Variable name",this.varnam.toString()],
            Method:["Interpolation Method",this.Method],
            ZC:["Enable zero crossing(0:No, 1:Yes)?",this.ZC],
            OutEnd:["Output at end(0:Zero, 1:Hold, 2:Repeat)",this.OutEnd],
        }
        return options
    }
    FROMWSB.prototype.set = function FROMWSB(){
        var varnam1 = arguments[0]["varnam"];
        var Method1 = arguments[0]["Method"];
        var ZC1 = arguments[0]["ZC"];
        var OutEnd1 = arguments[0]["OutEnd"];

        var regex_char = /[a-zA-Z]/g; //check character
        var regex_special_char = /[@%^&*-+]/g; //check character
        var regex_parentheses = /[\])}[{(]/g;
        var regex_semicolon_comma = /[,;]+/;

        var chararray = varnam1.match(regex_char);
        if (chararray != null) {
            if(regex_special_char.test(varnam1)){
                alert("Invalid variable name. \nPlease choose another variable name.");
                throw "incorrect";
            }
            if(regex_parentheses.test(varnam1)){
                alert("Invalid variable name. \nPlease choose another variable name.");
                throw "incorrect";
            }
            if(regex_semicolon_comma.test(varnam1)){
                alert("Invalid variable name. \nPlease choose another variable name.");
                throw "incorrect";
            }
        }else{
            alert("Invalid variable name. \nPlease choose another variable name.");
            throw "incorrect";
        }
        Method1 = parseFloat(Method1);
        if((Method1 != 0) && (Method1 != 1) && (Method1 != 2) && (Method1 != 3)){
            alert("Interpolation method should be chosen in [0,1,2,3]");
            throw "incorrect";
        }
        ZC1 = parseFloat(ZC1);
        if((ZC1 != 0) && (ZC1 != 1)){
            alert("Zero crossing should be either 0 or 1");
            throw "incorrect";
        }
        OutEnd1 = parseFloat(OutEnd1);
        if((OutEnd1 != 0) && (OutEnd1 != 1) && (OutEnd1 != 2)){
            alert("Output at end option should be either 0 or 1 or 2");
            throw "incorrect";
        }
        this.varnam = varnam1;
        this.Method = Method1;
        this.ZC = ZC1;
        this.OutEnd = OutEnd1;
        var block = getRparObjByGui(this.x, 'FROMWS_c');
        block.model.rpar = new ScilabDouble([]);
        block.graphics.exprs = new ScilabString([this.varnam], [this.Method], [this.ZC], [this.OutEnd]);
        block.model.ipar = new ScilabDouble([this.varnam.length],..._str2code(this.varnam),[this.Method],[this.ZC],[this.OutEnd]);
        var io = set_io(block.model,block.graphics,list(),list([-1,-2],-1),1,1);
        return new BasicBlock(this.x);
    }

    FROMWSB.prototype.get_popup_title = function FROMWSB(){
        var set_param_popup_title="Set From_Workspace block parameters <br>";
        return set_param_popup_title
    }
    FROMWSB.prototype.getDimensionForDisplay = function FROMWSB(){
        var dimension = { width: 100, height: 40 };
        return dimension
    }
}
