function ENDBLK() {

    ENDBLK.prototype.define = function ENDBLK() {
	this.simulationtime = "1.000E+08";
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
                orig: new ScilabDouble([10.266669999999976, -56.466669999999965]),
                sz: new ScilabDouble([40, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabDouble([this.simulationtime]),
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
                evtin: new ScilabDouble([-1]),
                evtout: new ScilabDouble([-1]),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble(),
                opar: list(),
                blocktype: new ScilabString(["d"]),
                firing: new ScilabDouble([this.simulationtime]),
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
            xx: new ScilabDouble([70.26666999999998], [70.26666999999998], [40.0], [40.0], [70.26666999999998], [70.26666999999998]),
            yy: new ScilabDouble([-60.466669999999965], [-111.13333], [-111.13333], [-40.0], [-40.0], [-12.466669999999965]),
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
            rpar: new ScilabDouble(),
            ipar: scs_m_1,
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
	ENDBLK.prototype.get = function ENDBLK() {
	var options={
	    simulationtime:["Final Simulation Time",this.simulationtime],
	}
	return options
	}
	ENDBLK.prototype.set = function ENDBLK() {
	    this.simulationtime = (arguments[0]["simulationtime"])

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
                orig: new ScilabDouble([10.266669999999976, -56.466669999999965]),
                sz: new ScilabDouble([40, 40]),
                flip: new ScilabBoolean([true]),
                theta: new ScilabDouble([0]),
                exprs: new ScilabDouble([this.simulationtime]),
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
                evtin: new ScilabDouble([-1]),
                evtout: new ScilabDouble([-1]),
                state: new ScilabDouble(),
                dstate: new ScilabDouble(),
                odstate: list(),
                rpar: new ScilabDouble(),
                ipar: new ScilabDouble(),
                opar: list(),
                blocktype: new ScilabString(["d"]),
                firing: new ScilabDouble([this.simulationtime]),
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
            xx: new ScilabDouble([70.26666999999998], [70.26666999999998], [40.0], [40.0], [70.26666999999998], [70.26666999999998]),
            yy: new ScilabDouble([-60.466669999999965], [-111.13333], [-111.13333], [-40.0], [-40.0], [-12.466669999999965]),
            id: new ScilabString(["drawlink"]),
            thick: new ScilabDouble([0, 0]),
            ct: new ScilabDouble([5, -1]),
            from: new ScilabDouble([1, 1, 0]),
            to: new ScilabDouble([1, 1, 1])
        }));

	    //this.x.model.ipar = scs_m_1//new ScilabDouble([sign(this.simulationtime)])
	    //var exprs = new ScilabDouble([this.simulationtime]) //changed from ScilabString
	    //this.x.graphics.exprs=exprs

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
            rpar: new ScilabDouble(),
            ipar: scs_m_1,
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
	    return new BasicBlock(this.x)
	 }
	 ENDBLK.prototype.details = function ENDBLK() {
		return this.x;
	}
        ENDBLK.prototype.get_popup_title = function CLSS() {
        var set_param_popup_title="Set final simulation time";
        return set_param_popup_title
        }
        ENDBLK.prototype.getDimensionForDisplay = function ENDBLK(){
        var dimension = [40,40];
        return dimension
        }
}
