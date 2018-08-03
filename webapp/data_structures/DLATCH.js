function DLATCH() {

    DLATCH.prototype.define = function DLATCH() {

        var scs_m = scicos_diagram({
            version: new ScilabString(["scicos4.2"]),
            props: scicos_params({
                wpar: new ScilabDouble([600, 450, 0, 0, 600, 450]),
                Title: new ScilabString(["DLATCH"]),
                //tol: new ScilabDouble([0.0001], [0.000001], [1.000E-10], [100001], [0], [0], [0]),
		//tol: new ScilabDouble([0.0001], [0.000001], [Math.pow(10, -10)], [100001], [0], [0], [0]),
		tol: new ScilabDouble([ "1.0E-4"], ["1.0E-6"], ["1.0E-10"], [100001], [0], [0], [0] ),
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
                //orig: new ScilabDouble([109.62561, 263.44465]),
		orig: new ScilabDouble([25.30802, -176.86070999999998]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["int8(0)"]),
                pin: new ScilabDouble(),
                //pout: new ScilabDouble([7]),
		pout: new ScilabDouble([13]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
                gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;CONST_m&quot;,sz(1),sz(2));"]), new ScilabDouble([8])),
		//gr_i: new ScilabDouble(),
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
                //intyp: new ScilabDouble([1]),
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
//Int8Array
		//opar: list(Int8Array.of([0])),
                opar: list(int8([0])),
//var a =int8([0]).toString();
//alert(a);
//var b =Int8Array.of([0]).toString();
//alert(b);
//alert(Int8Array.of([0]));
//alert(int8([0]));

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
                orig: new ScilabDouble([69.05933999999999, -40.0]),
                sz: new ScilabDouble([60, 60]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["0"], ["1"]),
                pin: new ScilabDouble([16]),
                pout: new ScilabDouble(),
                pein: new ScilabDouble(),
                peout: new ScilabDouble([12], [0]),
               // gr_i: list(new ScilabString(["txt=[''If in>0'';'' '';'' then    else''];"],["xstringb(orig(1),orig(2),txt,sz(1),sz(2),''fill'');"]), new ScilabDouble([8])),
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
                //outtyp: new ScilabDouble([1]),
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
                //orig: new ScilabDouble([152.88902, 260.24498]),
		orig: new ScilabDouble([-11.428570000000008, -140.06038]),
                sz: new ScilabDouble([60, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["2"], ["1"], ["5"], ["0"]),
                //pin: new ScilabDouble([13], [7]),
		pin: new ScilabDouble([17], [13]),
                pout: new ScilabDouble([5]),
		pout: new ScilabDouble([11]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
		//gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;[''Logical Op '';OPER];,sz(1),sz(2));"]), new ScilabDouble([8])),
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
                /*rpar: new ScilabDouble(),
                ipar: new ScilabDouble([1], [0]),*/
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
               // orig: new ScilabDouble([233.72156, 260.24498]),
		orig: new ScilabDouble([109.40397000000002, -140.06038]),
                sz: new ScilabDouble([40, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["5"]),
                pin: new ScilabDouble([11]),
                pout: new ScilabDouble([14]),
                pein: new ScilabDouble([12]),
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
                //orig: new ScilabDouble([317.46698, 309.46812]),
		orig: new ScilabDouble([153.14938999999998, -90.83724000000001]),
                sz: new ScilabDouble([60, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1"], ["5"], ["5"], ["0"]),
                pin: new ScilabDouble([15]),
                pout: new ScilabDouble([18]),
                pein: new ScilabDouble(),
                peout: new ScilabDouble(),
		//gr_i: list(new ScilabString(["xstringb(orig(1),orig(2),&quot;[''Logical Op '';OPER];,sz(1),sz(2));"]), new ScilabDouble([8])),
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
	/*scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([282.29299], [305.09603], [305.09603]),
            yy: new ScilabDouble([280.24498], [280.52797], [280.83282]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([4, 1, 0]),
            to: new ScilabDouble([10, 1, 1])

        }));*/
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["SPLIT_f"]),
            graphics: scicos_graphics({
                //orig: new ScilabDouble([305.09603, 280.83282]),
		orig: new ScilabDouble([243.44510665, -188.80587335]),
                sz: new ScilabDouble([7, 7]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabDouble(),
                pin: new ScilabDouble([14]),
                pout: new ScilabDouble([15], [19], [0]),
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
        /*scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([305.09603], [305.09603], [308.89555]),
            yy: new ScilabDouble([280.83282], [329.46812], [329.46812]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([10, 1, 0]),
            to: new ScilabDouble([8, 1, 1])

        }));*/

        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["IN_f"]),
            graphics: scicos_graphics({
                //orig: new ScilabDouble([184.8055, 340.30536]),
		orig: new ScilabDouble([100.48791, -100.0]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["2"]),
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
        /*scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([204.8055], [224.8055]),
            yy: new ScilabDouble([350.30536], [350.30536]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([12, 1, 0]),
            to: new ScilabDouble([2, 1, 1])

        }));*/

        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["IN_f"]),
            graphics: scicos_graphics({
                //orig: new ScilabDouble([104.31759, 276.91165]),
		orig: new ScilabDouble([20.0, -163.39371]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["1"]),
                pin: new ScilabDouble(),
                pout: new ScilabDouble([17]),
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
                //rpar: new ScilabDouble(),
                //ipar: new ScilabDouble([1]),
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
	/*scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([124.31759], [144.31759]),
            yy: new ScilabDouble([286.91165], [286.91165]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([14, 1, 0]),
            to: new ScilabDouble([3, 1, 1])

        }));*/
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["OUT_f"]),
            graphics: scicos_graphics({
               // orig: new ScilabDouble([406.03841, 319.46812]),
		orig: new ScilabDouble([321.72082, -120.83724000000001]),
                sz: new ScilabDouble([20, 20]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabString(["2"]),
                pin: new ScilabDouble([18]),
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
                /*rpar: new ScilabDouble(),
                ipar: new ScilabDouble([2]),*/
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
	/*scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([386.03841], [406.03841]),
            yy: new ScilabDouble([329.46812], [329.46812]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([8, 1, 0]),
            to: new ScilabDouble([16, 1, 1])

        }));*/
        scs_m.objs.push(scicos_block({
            gui: new ScilabString(["OUT_f"]),
            graphics: scicos_graphics({
                //orig: new ScilabDouble([325.09603, 270.83282]),
		orig: new ScilabDouble([240.77844, -169.47253999999998]),
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
                /*rpar: new ScilabDouble(),
                ipar: new ScilabDouble([1]),*/
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
            xx: new ScilabDouble([112.57142999999999], [145.40397000000002]),
            yy: new ScilabDouble([-120.06038000000001], [-120.06038000000001]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([3, 1, 0]),
            to: new ScilabDouble([4, 1, 1])

        }));
        scs_m.objs.push(scicos_link({

            xx: new ScilabDouble([149.05934], [169.40397000000002]),
            yy: new ScilabDouble([-44.0], [-96.06038000000001]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([2, 1, 0]),
            to: new ScilabDouble([4, 1, 1])

        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([69.30802], [44.57142999999999]),
            yy: new ScilabDouble([-166.86070999999998], [-126.72704666666668]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([1, 1, 0]),
            to: new ScilabDouble([3, 2, 1])

        }));
	scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([193.40397000000002], [260.77844], [246.44510665]),
            yy: new ScilabDouble([-120.06038000000001], [-199.77739000000003], [-185.30587335]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([4, 1, 0]),
            to: new ScilabDouble([6, 1, 1])

        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([261.44510665], [260.77844], [209.14938999999998]),
            yy: new ScilabDouble([-183.55587335], [-150.83724], [-70.83724000000001]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([6, 1, 0]),
            to: new ScilabDouble([5, 1, 1])

        }));

        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([144.48791], [125.05933999999999]),
            yy: new ScilabDouble([-90.0], [-10.0]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([7, 1, 0]),
            to: new ScilabDouble([2, 1, 1])

        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([64.0], [44.57142999999999]),
            yy: new ScilabDouble([-153.39371], [-113.39371333333334]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([8, 1, 0]),
            to: new ScilabDouble([3, 1, 1])

        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([277.14939], [337.72082]),
            yy: new ScilabDouble([-70.83724000000001], [-110.83724000000001]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([5, 1, 0]),
            to: new ScilabDouble([9, 1, 1])

        }));
        scs_m.objs.push(scicos_link({
            xx: new ScilabDouble([261.44510665], [256.77844]),
            yy: new ScilabDouble([-185.30587335], [-159.47253999999998]),
            id: new ScilabString(['drawlink']),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([1, 1]),
            from: new ScilabDouble([6, 2, 0]),
            to: new ScilabDouble([10, 1, 1])

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
    DLATCH.prototype.get=function DLATCH()
    {
        alert("parameters can not be changed");
    }

    DLATCH.prototype.get_popup_title = function DLATCH() {
        var set_param_popup_title="Set parameters";
        return set_param_popup_title
    }
}
