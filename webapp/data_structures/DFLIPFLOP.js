function DFLIPFLOP() {
    DFLIPFLOP.prototype.get = function DFLIPFLOP() {
            alert("parameters can not be changed");
        }

    DFLIPFLOP.prototype.define = function DFLIPFLOP() {
        var scs_m = scicos_diagram({
            version: new ScilabString(["scicos4.2"]),
            props: scicos_params({
                wpar: new ScilabDouble([600, 450, 0, 0, 600, 450]),
                Title: new ScilabString(["DFLIPFLOP"]),
                tol: new ScilabDouble(["1.0E-4"], ["1.0E-6"], ["1.0E-10"], [100001], [0], [0], [0]),
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
                orig: new ScilabDouble([50.03079899999999, -253.13212]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["int8(0)"]),
                pin: new ScilabDouble(),
                pout: new ScilabDouble([22]),
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
                orig: new ScilabDouble([140.38811900000002, -98.36016999999998]),
                sz: new ScilabDouble([60, 60]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1"], ["1"]),
                pin: new ScilabDouble([33]),
                pout: new ScilabDouble(),
                pein: new ScilabDouble([29]),
                peout: new ScilabDouble([26], [44]),
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
                evtin: new ScilabDouble([-1]),
                evtout: new ScilabDouble([-1], [-1]),
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
                orig: new ScilabDouble([53.29420899999998, -236.33179]),
                sz: new ScilabDouble([60, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["2"], ["1"], ["5"], ["0"]),
                pin: new ScilabDouble([24], [40]),
                pout: new ScilabDouble([21]),
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
                rpar: new ScilabDouble([1], [0]),
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
            gui: new ScilabString(["SAMPHOLD_m"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([154.12674900000002, -236.33179]),
                sz: new ScilabDouble([40, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["5"]),
                pin: new ScilabDouble([21]),
                pout: new ScilabDouble([36]),
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
                evtin: new ScilabDouble([-1]),
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
                orig: new ScilabDouble([273.646249, -187.10865]),
                sz: new ScilabDouble([60, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1"], ["5"], ["5"], ["0"]),
                pin: new ScilabDouble([38]),
                pout: new ScilabDouble([25]),
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
                rpar: new ScilabDouble([5], [0]),
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
                orig: new ScilabDouble([139.88984899999997, -118.36016999999998]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["3"]),
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
                intyp: new ScilabDouble(),
                out: new ScilabDouble([-1]),
                out2: new ScilabDouble([1]),
                outtyp: new ScilabDouble([-1]),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble([3]),
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
                orig: new ScilabDouble([44.72277899999999, -239.66512]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1"]),
                pin: new ScilabDouble(),
                pout: new ScilabDouble([24]),
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
            gui: new ScilabString(["OUT_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([397.81446900000003, -196.37546000000003]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["2"]),
                pin: new ScilabDouble([25]),
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
            gui: new ScilabString(["OUT_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([316.872089, -245.74394999999998]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1"]),
                pin: new ScilabDouble([39]),
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

        var scs_m_1 = scicos_diagram({
            version: new ScilabString(["scicos4.2"]),
            props: scicos_params({
                wpar: new ScilabDouble([600, 450, 0, 0, 600, 450]),
                Title: new ScilabString(["Untitled"]),
                tol: new ScilabDouble(["1.0E-4"], ["1.0E-6"], ["1.0E-10"], [100001], [0], [0], [0]),
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
            gui: new ScilabString(["ANDLOG_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([33.0, -197.0]),
                sz: new ScilabDouble([60, 60]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabDouble(),
                pin: new ScilabDouble(),
                pout: new ScilabDouble([10]),
                pein: new ScilabDouble([7], [11]),
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
                intyp: new ScilabDouble(),
                out: new ScilabDouble([1]),
                out2: new ScilabDouble([1]),
                outtyp: new ScilabDouble([1]),
                evtin: new ScilabDouble([-1], [-1]),
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
                orig: new ScilabDouble([28.0, -83.0]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1"]),
                pin: new ScilabDouble(),
                pout: new ScilabDouble(),
                pein: new ScilabDouble(),
                peout: new ScilabDouble([7]),
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
                intyp: new ScilabDouble(),
                out: new ScilabDouble(),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble(),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble([-1]),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble([1]),
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
            gui: new ScilabString(["CLKOUT_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([329.0, -287.0]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1"]),
                pin: new ScilabDouble(),
                pout: new ScilabDouble(),
                pein: new ScilabDouble([9]),
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
                intyp: new ScilabDouble(),
                out: new ScilabDouble(),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble(),
                evtin: new ScilabDouble([-1]),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble([1]),
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
                orig: new ScilabDouble([20.0, -40.0]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["2"]),
                pin: new ScilabDouble(),
                pout: new ScilabDouble(),
                pein: new ScilabDouble(),
                peout: new ScilabDouble([8]),
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
                intyp: new ScilabDouble(),
                out: new ScilabDouble(),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble(),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble([-1]),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble([2]),
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
            gui: new ScilabString(["IFTHEL_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([170.0, -193.0]),
                sz: new ScilabDouble([60, 60]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1"], ["1"]),
                pin: new ScilabDouble([10]),
                pout: new ScilabDouble(),
                pein: new ScilabDouble([12]),
                peout: new ScilabDouble([9], [0]),
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
                evtin: new ScilabDouble([-1]),
                evtout: new ScilabDouble([-1], [-1]),
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

        scs_m_1.objs.push(scicos_block({
            gui: new ScilabString(["CLKSPLIT_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([122.66666665, -110.54985335000003]),
                sz: new ScilabDouble([7, 7]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabDouble(),
                pin: new ScilabDouble(),
                pout: new ScilabDouble(),
                pein: new ScilabDouble([8]),
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
                intyp: new ScilabDouble(),
                out: new ScilabDouble(),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble(),
                evtin: new ScilabDouble([-1]),
                evtout: new ScilabDouble([-1], [-1]),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble(),
                opar: list(),
                blocktype: new ScilabString(["d"]),
                firing: new ScilabDouble([-1], [-1]),
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
            xx: new ScilabDouble([58.0], [113.0], [113.0]),
            yy: new ScilabDouble([-87.0], [-93.0], [-133.0]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([2.0, 1.0, 0.0]),
            to: new ScilabDouble([1.0, 1.0, 1.0])
        }));
        scs_m_1.objs.push(scicos_link({
            xx: new ScilabDouble([50.0], [133.0], [129.8333333]),
            yy: new ScilabDouble([-44.0], [-50.0], [-99.54985335000003]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([4.0, 1.0, 0.0]),
            to: new ScilabDouble([6.0, 1.0, 1.0])
        }));
    scs_m_1.objs.push(scicos_link({
            xx: new ScilabDouble([250.0], [250.0], [359.0]),
            yy: new ScilabDouble([-197.0], [-297.0], [-263.0]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([5, 1, 0]),
            to: new ScilabDouble([3, 1, 1])
        }));
    scs_m_1.objs.push(scicos_link({
            xx: new ScilabDouble([157.0], [226.0]),
            yy: new ScilabDouble([-167.0], [-163.0]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([1, 1, 0]),
            to: new ScilabDouble([5, 1, 1])
        }));
    scs_m_1.objs.push(scicos_link({
            xx: new ScilabDouble([129.77777774999998], [133.0]),
            yy: new ScilabDouble([-107.88318665000003], [-133.0]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([6, 1, 0]),
            to: new ScilabDouble([1, 2, 1])
        }));
    scs_m_1.objs.push(scicos_link({
            xx: new ScilabDouble([129.88888885], [260.0], [260.0]),
            yy: new ScilabDouble([-107.88318665000003], [-114.22000000000003], [-129.0]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([6, 2, 0]),
            to: new ScilabDouble([5, 1, 1])
        }));

	scs_m.objs.push(scicos_block({
            gui: new ScilabString(["ANDBLK"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([154.135579, -177.8327]),
                sz: new ScilabDouble([40, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabDouble(),
                pin: new ScilabDouble(),
                pout: new ScilabDouble(),
                pein: new ScilabDouble([28], [26]),
                peout: new ScilabDouble([27]),
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
                intyp: new ScilabDouble(),
                out: new ScilabDouble(),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble(),
                evtin: new ScilabDouble([-1], [-1]),
                evtout: new ScilabDouble([-1]),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: scs_m_1,
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

        scs_m_1 = scicos_diagram({
            version: new ScilabString(["scicos4.2"]),
            props: scicos_params({
                wpar: new ScilabDouble([600, 450, 0, 0, 600, 450]),
                Title: new ScilabString(["EDGE_TRIGGER"]),
                tol: new ScilabDouble(["1.0E-4"], ["1.0E-6"], ["1.0E-10"], [100001], [0], [0], [0]),
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
                orig: new ScilabDouble([28.57143000000002, -50.00000000000006]),
                sz: new ScilabDouble([60, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1"]),
                pin: new ScilabDouble([6]),
                pout: new ScilabDouble([5]),
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
                rpar: new ScilabDouble([1]),
                ipar: new ScilabDouble(),
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
                orig: new ScilabDouble([128.27380999999997, -40.0]),
                sz: new ScilabDouble([60, 60]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["0"], ["0"]),
                pin: new ScilabDouble([5]),
                pout: new ScilabDouble(),
                pein: new ScilabDouble(),
                peout: new ScilabDouble([7], [0]),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;IFTHEL_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"]),
                out_implicit: new ScilabDouble(),
        in_style: new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]),
                out_style: new ScilabDouble(),
                in_label: new ScilabString([""]),
                out_label: new ScilabDouble(),
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
                evtout: new ScilabDouble([-1], [-1]),
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
                orig: new ScilabDouble([20.0, -60.00000000000006]),
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

        in_style: new ScilabDouble(),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabDouble(),
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

        scs_m_1.objs.push(scicos_block({
            gui: new ScilabString(["CLKOUTV_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([178.27380999999997, -135.71429000000003]),
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
                intyp: new ScilabDouble(),
                out: new ScilabDouble(),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble(),
                evtin: new ScilabDouble([-1]),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble([1]),
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

    scs_m_1.objs.push(scicos_link({
            xx: new ScilabDouble([152.57143000000002], [162.97618999999997],[184.27380999999997]),
            yy: new ScilabDouble([-30.000000000000057], [-70.00000000000006], [-10.0]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([1, 1, 0]),
            to: new ScilabDouble([2, 1, 1])
        }));
    scs_m_1.objs.push(scicos_link({
            xx: new ScilabDouble([64.0], [84.57143000000002]),
            yy: new ScilabDouble([-50.00000000000006], [-30.000000000000057]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([3, 1, 0]),
            to: new ScilabDouble([1, 1, 1])
        }));

        scs_m_1.objs.push(scicos_link({
            xx: new ScilabDouble([208.27380999999997], [208.27380999999997]),
            yy: new ScilabDouble([-44.0], [-101.71429000000003]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([2, 1, 0]),
            to: new ScilabDouble([4, 1, 1])
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["EDGE_TRIGGER"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([34.311559, -111.23477000000003]),
                sz: new ScilabDouble([60, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabDouble(),
                pin: new ScilabDouble([31]),
                pout: new ScilabDouble(),
                pein: new ScilabDouble(),
                peout: new ScilabDouble([28]),
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
                evtout: new ScilabDouble([-1]),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: scs_m_1,
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
            gui: new ScilabString(["IN_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([20.0, -121.1003]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["2"]),
                pin: new ScilabDouble(),
                pout: new ScilabDouble([30]),
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

        scs_m_1 = scicos_diagram({
            version: new ScilabString(["scicos4.2"]),
            props: scicos_params({
                wpar: new ScilabDouble([600, 450, 0, 0, 600, 450]),
                Title: new ScilabString(["Extract_Activation", ]),
                tol: new ScilabDouble(["1.0E-4"], ["1.0E-6"], ["1.0E-10"], [100001], [0], [0], [0]),
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
                orig: new ScilabDouble([28.571430000000007, -40.0]),
                sz: new ScilabDouble([60, 60]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["0"], ["0"]),
                pin: new ScilabDouble([7]),
                pout: new ScilabDouble(),
                pein: new ScilabDouble(),
                peout: new ScilabDouble([5], [6]),
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
                evtout: new ScilabDouble([-1], [-1]),
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
            gui: new ScilabString(["CLKSOMV_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([91.07574299999999, -131.009182]),
                sz: new ScilabDouble([16.666667, 16.666667]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabDouble(),
                pin: new ScilabDouble(),
                pout: new ScilabDouble(),
                pein: new ScilabDouble([5], [6], [0]),
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
                intyp: new ScilabDouble(),
                out: new ScilabDouble(),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble(),
                evtin: new ScilabDouble([-1], [-1], [-1]),
                evtout: new ScilabDouble([-1]),
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

        scs_m_1.objs.push(scicos_block({
            gui: new ScilabString(["IN_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([20.0, -60.0]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1"]),
                pin: new ScilabDouble(),
                pout: new ScilabDouble([7]),
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

        scs_m_1.objs.push(scicos_block({
            gui: new ScilabString(["CLKOUTV_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([86.07574000000001, -175.294897]),
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
                evtin: new ScilabDouble([-1]),
                evtout: new ScilabDouble(),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble([1]),
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

    scs_m_1.objs.push(scicos_link({
            xx: new ScilabDouble([108.57143], [108.57143], [87.96400000000001], [87.96400000000001], [111.90907675]),
            yy: new ScilabDouble([-44.0], [-115.58707999999999], [-115.58707999999999], [-139.34251999999998], [-110.342515]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([1, 1, 0]),
            to: new ScilabDouble([2, 1, 1])
        }));
    scs_m_1.objs.push(scicos_link({
            xx: new ScilabDouble([128.57143000000002], [128.57143000000002], [116.07574349999999]),
            yy: new ScilabDouble([-44.0], [-132.26479], [-110.342515]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([1, 2, 0]),
            to: new ScilabDouble([2, 2, 1])
        }));
    scs_m_1.objs.push(scicos_link({
            xx: new ScilabDouble([64.0], [84.57143]),
            yy: new ScilabDouble([-50.0], [-10.0]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([3, 1, 0]),
            to: new ScilabDouble([1, 1, 1])
        }));
    scs_m_1.objs.push(scicos_link({
            xx: new ScilabDouble([116.07574349999999], [116.07574000000001]),
            yy: new ScilabDouble([-135.009182], [-141.294897]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([2, 1, 0]),
            to: new ScilabDouble([4, 1, 1])
        }));
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["Extract_Activation"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([140.22711900000002, -40.0]),
                sz: new ScilabDouble([60, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabDouble(),
                pin: new ScilabDouble([35]),
                pout: new ScilabDouble(),
                pein: new ScilabDouble(),
                peout: new ScilabDouble([29]),
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
                in2: new ScilabDouble([1]),
                intyp: new ScilabDouble([1]),
                out: new ScilabDouble(),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble(),
                evtin: new ScilabDouble(),
                evtout: new ScilabDouble([-1]),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: scs_m_1,
                opar: list(),
                blocktype: new ScilabString(["h"]),
                firing: new ScilabDouble([-1]),//()
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
            gui: new ScilabString(["SUM_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([144.263722, -50.77837299999999]),
                sz: new ScilabDouble([16.666667, 16.666667]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabDouble(),
                pin: new ScilabDouble([32.0], [0], [34.0]),
                pout: new ScilabDouble([35.0]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;SUM_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
                id: new ScilabString([""]),
                in_implicit: new ScilabString(["E"], ["E"], ["E"]),
                out_implicit: new ScilabString(["E"]),
                in_style: new ScilabString(["ExplicitInputPort;align=center;verticalAlign=bottom;spacing=10.0;rotation=270"], ["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"], ["ExplicitInputPort;align=center;verticalAlign=top;spacing=10.0;rotation=90"]),
                out_style: new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]),
                in_label: new ScilabString([""], [""], [""]),
                out_label: new ScilabString([""]),
                style: new ScilabString(["SUM_f"])
            }),
            model: scicos_model({
                sim: list(new ScilabString(["plusblk"]), new ScilabDouble([2])),
                in: new ScilabDouble([-1], [-1], [-1]),
                in2: new ScilabDouble([1], [1], [1]),
                intyp: new ScilabDouble([1], [1], [1]),
                out: new ScilabDouble([-1]),
                out2: new ScilabDouble([1]),
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
                orig: new ScilabDouble([60.32767564999999, -127.48933335000004]),
                sz: new ScilabDouble([7.0, 7.0]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabDouble(),
                pin: new ScilabDouble([30]),
                pout: new ScilabDouble([31], [32], [0]),
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
                orig: new ScilabDouble([172.61313565, -124.69350335000001]),
                sz: new ScilabDouble([7, 7]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabDouble(),
                pin: new ScilabDouble([23]),
                pout: new ScilabDouble([33], [34], [0]),
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
            gui: new ScilabString(["SELECT_m"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([219.26889900000003, -243.00356]),
                sz: new ScilabDouble([40, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["5"], ["2"], ["1"]),
                pin: new ScilabDouble([36], [41]),
                pout: new ScilabDouble([37]),
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
                evtin: new ScilabDouble([-1], [-1]),
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

        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["SPLIT_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([307.64513565000004, -252.07728335000002]),
                sz: new ScilabDouble([7, 7]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabDouble(),
                pin: new ScilabDouble([37]),
                pout: new ScilabDouble([38], [39], [0]),
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
                orig: new ScilabDouble([90.41708564999998, -259.41853335]),
                sz: new ScilabDouble([7, 7]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabDouble(),
                pin: new ScilabDouble([22]),
                pout: new ScilabDouble([40], [41], [0]),
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
            gui: new ScilabString(["CLKSPLIT_f"]),
            graphics: scicos_graphics({
                orig: new ScilabDouble([203.79757565, -223.61473335000005]),
                sz: new ScilabDouble([7, 7]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabDouble(),
                pin: new ScilabDouble(),
                pout: new ScilabDouble(),
                pein: new ScilabDouble([27]),
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
                intyp: new ScilabDouble(),
                out: new ScilabDouble(),
                out2: new ScilabDouble(),
                outtyp: new ScilabDouble(),
                evtin: new ScilabDouble([-1]),
                evtout: new ScilabDouble([-1], [-1]),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble(),
                opar: list(),
                blocktype: new ScilabString(["d"]),
                firing: new ScilabDouble([-1], [-1]),
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
            xx: new ScilabDouble([177.29420899999997], [190.12674900000002]),
            yy: new ScilabDouble([-216.33179], [-216.33179]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([3, 1, 0]),
            to: new ScilabDouble([4, 1, 1])
        }));
    scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([94.03079899999999], [93.41708564999998]),
            yy: new ScilabDouble([-243.13212], [-252.58520000000001]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([1, 1, 0]),
            to: new ScilabDouble([19, 1, 1])
        }));
    scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([183.88984899999997], [175.61313565]),
            yy: new ScilabDouble([-108.36016999999998], [-117.86017000000001]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([6, 1, 0]),
            to: new ScilabDouble([16, 1, 1])
        }));
    scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([88.72277899999999], [109.29420899999998]),
            yy: new ScilabDouble([-229.66512], [-209.66512333333336]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([7, 1, 0]),
            to: new ScilabDouble([3, 1, 1])
        }));
    scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([397.646249], [413.81446900000003]),
            yy: new ScilabDouble([-167.10865], [-186.37546000000003]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([5, 1, 0]),
            to: new ScilabDouble([8, 1, 1])
        }));
    scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([220.38811900000002], [220.80224566666666]),
            yy: new ScilabDouble([-102.36016999999998], [-133.8327]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([2, 1, 0]),
            to: new ScilabDouble([10, 2, 1])
        }));
    scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([214.135579], [210.9642423]),
            yy: new ScilabDouble([-181.8327], [-212.61473335000005]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([10, 1, 0]),
            to: new ScilabDouble([20, 1, 1])
        }));
    scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([124.311559], [124.311559], [207.46891233333335]),
            yy: new ScilabDouble([-115.23477000000003], [-172.11842000000001], [-133.8327]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([11, 1, 0]),
            to: new ScilabDouble([10, 1, 1])
        }));
    scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([230.22711900000002], [230.38811900000002]),
            yy: new ScilabDouble([-44.0], [-34.36016999999998]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([13, 1, 0]),
            to: new ScilabDouble([2, 1, 1])
        }));
    scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([64.0], [63.32767564999999]),
            yy: new ScilabDouble([-111.1003], [-120.65600000000003]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([12, 1, 0]),
            to: new ScilabDouble([15, 1, 1])
        }));
    scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([71.66100895], [74.74185899999999], [90.311559]),
            yy: new ScilabDouble([-120.57266667500004], [-131.17732], [-91.23477000000003]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([15, 1, 0]),
            to: new ScilabDouble([11, 1, 1])
        }));
    scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([71.66100895], [70.66100899999999], [169.2637225]),
            yy: new ScilabDouble([-120.65600000000003], [-67.44504], [-54.77837299999999]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([15, 2, 0]),
            to: new ScilabDouble([14, 1, 1])
        }));
    scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([183.94646895], [196.38811900000002]),
            yy: new ScilabDouble([-117.77683667500001], [-68.36016999999998]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([16, 1, 0]),
            to: new ScilabDouble([2, 1, 1])
        }));
    scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([183.94646895], [182.94646899999998], [169.26371899999998], [169.2637225]),
            yy: new ScilabDouble([-117.86017000000001], [-83.57526999999999], [-83.57526999999999], [-30.111705999999984]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([16, 2, 0]),
            to: new ScilabDouble([14, 3, 1])
        }));
    scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([181.59705599999998], [196.22711900000002]),
            yy: new ScilabDouble([-42.445039499999986], [-20.0]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([14, 1, 0]),
            to: new ScilabDouble([13, 1, 1])
        }));
    scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([238.12674900000002], [255.26889900000003]),
            yy: new ScilabDouble([-216.33179], [-216.33689333333334]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([4, 1, 0]),
            to: new ScilabDouble([17, 1, 1])
        }));
    scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([303.26889900000003], [317.978469], [310.64513565000004]),
            yy: new ScilabDouble([-223.00356], [-263.00356], [-245.24395]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([17, 1, 0]),
            to: new ScilabDouble([18, 1, 1])
        }));
    scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([318.97846895000004], [317.978469], [329.646249]),
            yy: new ScilabDouble([-245.16061667500003], [-207.10865], [-167.10865]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([18, 1, 0]),
            to: new ScilabDouble([5, 1, 1])
        }));
    scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([318.97846895000004], [332.872089]),
            yy: new ScilabDouble([-245.24395], [-235.74394999999998]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([18, 2, 0]),
            to: new ScilabDouble([9, 1, 1])
        }));
    scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([101.75041894999998], [109.29420899999998]),
            yy: new ScilabDouble([-252.50186667500003], [-222.99845666666667]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([19, 1, 0]),
            to: new ScilabDouble([3, 2, 1])
        }));
    scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([101.75041894999998], [100.75041899999998], [250.697479], [255.26889900000003]),
            yy: new ScilabDouble([-252.58520000000001], [-288.8691], [-288.8691], [-229.67022666666665]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([19, 2, 0]),
            to: new ScilabDouble([17, 2, 1])
        }));
    scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([210.90868675], [214.12674900000002]),
            yy: new ScilabDouble([-220.94806665000004], [-192.33179]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([20, 1, 0]),
            to: new ScilabDouble([4, 1, 1])
        }));
    scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([211.01979785], [272.602239], [272.60223233333335]),
            yy: new ScilabDouble([-220.94806665000004], [-227.28140000000002], [-199.00356]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([20, 2, 0]),
            to: new ScilabDouble([17, 1, 1])
        }));
    scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([240.38811900000002], [240.38811900000002], [285.935569], [285.9355656666667]),
            yy: new ScilabDouble([-102.36016999999998], [-220.68222000000003], [-220.68222000000003], [-199.00356]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([2, 2, 0]),
            to: new ScilabDouble([17, 2, 1])
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
    DFLIPFLOP.prototype.get_popup_title = function DFLIPFLOP() {
        var set_param_popup_title="Set parameters";
        return set_param_popup_title
    }
    DFLIPFLOP.prototype.getDimensionForDisplay = function DFLIPFLOP(){
        var dimension = { width: 40, height: 60 };
        return dimension
    }
}
