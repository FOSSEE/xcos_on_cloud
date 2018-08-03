function SRFLIPFLOP() {

    SRFLIPFLOP.prototype.define = function SRFLIPFLOP() {
this.initialvalue="int8(0)";
        var scs_m = scicos_diagram({
            version: new ScilabString(["scicos4.2"]),
            props: scicos_params({
                wpar: new ScilabDouble([600, 450, 0, 0, 600, 450]),
                Title: new ScilabString(["SRFLIPFLOP"]),
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
            gui: new ScilabString(["LOGIC"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([48.57143000000002, -92.80000000000001]),
                sz: new ScilabDouble([40, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["[0 1;1 0;1 0;1 0;0 1;0 1;0 0;0 0]"], ["1"]),
                pin: new ScilabDouble([9], [12], [13]),
                pout: new ScilabDouble([8], [11]),
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
            gui: new ScilabString(["DOLLAR_m"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([49.30475999999999, -40.0]),
                sz: new ScilabDouble([40, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["int8(0)"], ["1"]),
                pin: new ScilabDouble([10]),
                pout: new ScilabDouble([9]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;DOLLAR_m&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabString(["E"]),
                in_style: new ScilabString(["ExplicitInputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=180"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=180"]),
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
                orig: new ScilabDouble([142.77142665000002, -82.00000335000001]),
                sz: new ScilabDouble([7.0, 7.0]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabDouble(),
                pin: new ScilabDouble([8]),
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
                orig: new ScilabDouble([137.14285999999998, -109.46667000000002]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["2"]),
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
                rpar: new ScilabDouble([2]),
                ipar: new ScilabDouble(),
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
                orig: new ScilabDouble([20.0, -102.80000000000001]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1"]),
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
                rpar: new ScilabDouble([1]),
                ipar: new ScilabDouble(),
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
                orig: new ScilabDouble([20.0, -112.80000000000001]),
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
                rpar: new ScilabDouble([2]),
                ipar: new ScilabDouble(),
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
                orig: new ScilabDouble([153.10476, -75.66667000000001	]),
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
                rpar: new ScilabDouble([1]),
                ipar: new ScilabDouble(),
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
            xx: new ScilabDouble([132.57143000000002], [153.10476], [145.77142665000002]),
            yy: new ScilabDouble([-66.13333333333334], [-106.13334], [-75.16667000000001]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([1, 1, 0]),
            to: new ScilabDouble([3, 1, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([85.30475999999999], [62.17142999999999], [62.17142999999999], [84.57143000000002]),
            yy: new ScilabDouble([-20.0], [-60.0], [-102.80000000000001], [-62.80000000000001]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([2, 1, 0]),
            to: new ScilabDouble([1, 1, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([154.10475995000002], [153.10476], [133.30476]),
            yy: new ScilabDouble([-75.08333667500001], [-60.0], [-20.0]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([3, 1, 0]),
            to: new ScilabDouble([2, 1, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([132.57143000000002], [153.14285999999998]),
            yy: new ScilabDouble([-79.46666666666668], [-99.46667000000002]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([1, 2, 0]),
            to: new ScilabDouble([4, 1, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([64.0], [84.57143000000002]),
            yy: new ScilabDouble([-92.80000000000001], [-72.80000000000001]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([5, 1, 0]),
            to: new ScilabDouble([1, 2, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([64.0], [84.57143000000002]),
            yy: new ScilabDouble([-102.80000000000001], [-82.80000000000001]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([6, 1, 0]),
            to: new ScilabDouble([1, 3, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([154.10475995000002], [169.10476]),
            yy: new ScilabDouble([-75.16667000000001], [-65.66667000000001]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([3, 2, 0]),
            to: new ScilabDouble([7, 1, 1])
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
    SRFLIPFLOP.prototype.get = function SRFLIPFLOP() {
        var options={
            initialvalue:["Initial value must be 0 or 1 of type int8",this.initialvalue],
        }
        return options
    }
    SRFLIPFLOP.prototype.set = function SRFLIPFLOP() {
	    this.initialvalue = ((arguments[0]["initialvalue"]))

	      var scs_m = scicos_diagram({
            version: new ScilabString(["scicos4.2"]),
            props: scicos_params({
                wpar: new ScilabDouble([600, 450, 0, 0, 600, 450]),
                Title: new ScilabString(["SRFLIPFLOP"]),
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
            gui: new ScilabString(["LOGIC"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([48.57143000000002, -92.80000000000001]),
                sz: new ScilabDouble([40, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["[0 1;1 0;1 0;1 0;0 1;0 1;0 0;0 0]"], ["1"]),
                pin: new ScilabDouble([9], [12], [13]),
                pout: new ScilabDouble([8], [11]),
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
            gui: new ScilabString(["DOLLAR_m"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([49.30475999999999, -40.0]),
                sz: new ScilabDouble([40, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["int8(0)"], ["1"]),
                pin: new ScilabDouble([10]),
                pout: new ScilabDouble([9]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;DOLLAR_m&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabString(["E"]),
                in_style: new ScilabString(["ExplicitInputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
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
                orig: new ScilabDouble([142.77142665000002, -82.00000335000001]),
                sz: new ScilabDouble([7.0, 7.0]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabDouble(),
                pin: new ScilabDouble([8]),
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
                orig: new ScilabDouble([137.14285999999998, -109.46667000000002]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["2"]),
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
                rpar: new ScilabDouble([2]),
                ipar: new ScilabDouble(),
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
                orig: new ScilabDouble([20.0, -102.80000000000001]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1"]),
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
                rpar: new ScilabDouble([1]),
                ipar: new ScilabDouble(),
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
                orig: new ScilabDouble([20.0, -112.80000000000001]),
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
                rpar: new ScilabDouble([2]),
                ipar: new ScilabDouble(),
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
                orig: new ScilabDouble([153.10476, -75.66667000000001	]),
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
                rpar: new ScilabDouble([1]),
                ipar: new ScilabDouble(),
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
            xx: new ScilabDouble([132.57143000000002], [153.10476], [145.77142665000002]),
            yy: new ScilabDouble([-66.13333333333334], [-106.13334], [-75.16667000000001]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([1, 1, 0]),
            to: new ScilabDouble([3, 1, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([85.30475999999999], [62.17142999999999], [62.17142999999999], [84.57143000000002]),
            yy: new ScilabDouble([-20.0], [-60.0], [-102.80000000000001], [-62.80000000000001]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([2, 1, 0]),
            to: new ScilabDouble([1, 1, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([154.10475995000002], [153.10476], [133.30476]),
            yy: new ScilabDouble([-75.08333667500001], [-60.0], [-20.0]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([3, 1, 0]),
            to: new ScilabDouble([2, 1, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([132.57143000000002], [153.14285999999998]),
            yy: new ScilabDouble([-79.46666666666668], [-99.46667000000002]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([1, 2, 0]),
            to: new ScilabDouble([4, 1, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([64.0], [84.57143000000002]),
            yy: new ScilabDouble([-92.80000000000001], [-72.80000000000001]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([5, 1, 0]),
            to: new ScilabDouble([1, 2, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([64.0], [84.57143000000002]),
            yy: new ScilabDouble([-102.80000000000001], [-82.80000000000001]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([6, 1, 0]),
            to: new ScilabDouble([1, 3, 1])
        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([154.10475995000002], [169.10476]),
            yy: new ScilabDouble([-75.16667000000001], [-65.66667000000001]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([3, 2, 0]),
            to: new ScilabDouble([7, 1, 1])
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

	    this.x.model.ipar = new ScilabDouble([sign(this.initialvalue)])
	    var exprs = new ScilabString([this.initialvalue])
	    this.x.graphics.exprs=exprs
	    return new BasicBlock(this.x)
    }

    SRFLIPFLOP.prototype.details = function SRFLIPFLOP() {
        return this.x;
    }

    SRFLIPFLOP.prototype.get_popup_title = function SRFLIPFLOP() {
        var set_param_popup_title="Set SRFLIPFLOP block parameters <br> SR flip-flop<br> The \"Initial Value\" must be 0 or 1 of type int8 <br> - Negative values are considered as int8(0) <br> - Positive values are considered as int8(1) <br>";
        return set_param_popup_title
    }


}
