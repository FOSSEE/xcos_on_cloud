// Added to handle ordering for a few blocks.

window.inBitMap='0';
window.outBitMap='0';

String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}

/*
 * Maverick, Adhitya
 * ImplicitInBlock, ImplicitOutBlock, ExplicitInBlock, ExplicitOutBlock
 * These blocks need their orderings to be handled.
 * We are using a bitmap to do the same.
 */
function handleOrdering(inOrOut) {
    var bitmap;
    if (inOrOut=='in') {
        bitmap=window.inBitMap;
    } else {
        bitmap=window.outBitMap;
    }
    var index = bitmap.indexOf('0');
    if (index == -1) {
        bitmap += '0';
        index = bitmap.indexOf('0');
    }
    bitmap = bitmap.replaceAt(index, '1');
    if (inOrOut=='in') {
        window.inBitMap=bitmap;
    } else {
        window.outBitMap=bitmap;
    }
    var position = 1+index;

    return position;
}

function AfficheBlock() {
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
        this.parent = options.parent;
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
        this.dState = options.model.dstate;
        this.oDState = list();
        this.equations = list(); // Not Known
        this.blockName = "AfficheBlock";
        this.blockElementName = arguments.callee.caller.name;
    }
}

function BigSom() {
    if (arguments.length > 0) {
        var options = arguments[0];

        var dep_ut = getData(options.model.dep_ut);
        if (dep_ut[0] == "true")
            this.dependsOnU = "1";

        this.id = options.id;
        this.interfaceFunctionName = arguments.callee.caller.name;
        this.ordering = options.ordering;
        this.parent = options.parent;
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
        this.value = "+"; // Not Known
        this.exprs = options.graphics.exprs;
        this.realParameters = options.model.rpar;
        this.integerParameters = options.model.ipar;
        this.objectsParameters = options.model.opar;
        this.nbZerosCrossing = options.model.nzcross;
        this.nmode = options.model.nmode;
        this.oDState = list();
        this.equations = list(); // Not Known
        this.blockName = "BigSom";
        this.blockElementName = arguments.callee.caller.name;
    }
}

function EventInBlock() {
    if (arguments.length > 0) {
        var options = arguments[0];
        this.blockType = getData(options.model.blocktype)[0];
        this.connectable = options.connectable; // Not Known
        this.id = options.id;
        this.interfaceFunctionName = arguments.callee.caller.name;
        this.ordering = options.ordering;
        this.parent = options.parent;
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
        this.integerParameters = options.model.ipar;
        this.objectsParameters = options.model.opar;
        this.equations = list(); // Not Known
        this.blockName = "EventInBlock";
        this.blockElementName = arguments.callee.caller.name;
    }
}

function EventOutBlock() {
    if (arguments.length > 0) {
        var options = arguments[0];
        this.blockType = getData(options.model.blocktype)[0];
        this.connectable = options.connectable; // Not Known
        this.id = options.id;
        this.interfaceFunctionName = arguments.callee.caller.name;
        this.ordering = options.ordering;
        this.parent = options.parent;
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
        this.integerParameters = options.model.ipar;
        this.objectsParameters = options.model.opar;
        this.equations = list(); // Not Known
        this.blockName = "EventOutBlock";
        this.blockElementName = arguments.callee.caller.name;
    }
}

function RoundBlock() {
    if (arguments.length > 0) {
        var options = arguments[0];
        this.angle = options.angle; // Not Known
        this.blockType = getData(options.model.blocktype)[0];
        var dep_ut = getData(options.model.dep_ut);
        if (dep_ut[0] == "true")
            this.dependsOnU = "1";
        this.id = options.id;
        this.interfaceFunctionName = arguments.callee.caller.name;
        this.ordering = options.ordering;
        this.parent = options.parent;
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
        this.exprs = options.graphics.exprs;
        this.realParameters = options.model.rpar;
        this.integerParameters = options.model.ipar;
        this.objectsParameters = options.model.opar;
        this.nbZerosCrossing = options.model.nzcross;
        this.nmode = options.model.nmode;
        this.oDState = list();
        this.equations = list(); // Not Known
        this.blockName = "RoundBlock";
        this.blockElementName = arguments.callee.caller.name;
    }
}

function GroundBlock() {
    if (arguments.length > 0) {
        var options = arguments[0];
        this.angle = options.angle; // Not Known
        this.blockType = getData(options.model.blocktype)[0];
        var dep_ut = getData(options.model.dep_ut);
        if (dep_ut[0] == "true")
            this.dependsOnU = "1";
        this.id = options.id;
        this.interfaceFunctionName = arguments.callee.caller.name;
        this.ordering = options.ordering;
        this.parent = options.parent;
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
        this.exprs = options.graphics.exprs;
        this.realParameters = options.model.rpar;
        this.integerParameters = options.model.ipar;
        this.objectsParameters = options.model.opar;
        this.nbZerosCrossing = options.model.nzcross;
        this.nmode = options.model.nmode;
        this.oDState = list();
        this.equations = options.model.equations; // Not Known
        this.blockName = "GroundBlock";
        this.blockElementName = arguments.callee.caller.name;
    }
}

function TextBlock() {
    if (arguments.length > 0) {
        var options = arguments[0];
        this.angle = options.angle; // Not Known
        this.blockType = getData(options["model"].blocktype)[0];
        this.connectable = options.connectable; // Not Known
        this.id = options.id;
        this.interfaceFunctionName = arguments.callee.caller.name;
        this.ordering = options.ordering;
        this.parent = options.parent;
        if (options.model.sim instanceof Array) {
            this.simulationFunctionName = getData(options["model"].sim[0])[0];
            var func_type;
            switch (getData(options[model].sim[1])[0].toString()) {
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
            this.simulationFunctionName = getData(options["model"].sim)[0];
            this.simulationFunctionType = "DEFAULT";
        }
        this.style = arguments.callee.caller.name;
        this.value = options.value; // Not Known
        this.vertex = options.vertex; // Not Known
        this.visible = options.visible; // Not Known
        this.exprs = options["graphics"].exprs;
        this.realParameters = options["model"].rpar;
        this.objectsParameters = options["model"].opar;
        this.nbZerosCrossing = options["model"].nzcross;
        this.nmode = options["model"].nmode;
        this.oDState = list();
        this.equations = list(); // Not Known
        this.blockName = "TextBlock";
        this.blockElementName = arguments.callee.caller.name;
    }
}

function Product() {
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
        this.parent = options.parent;
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
        if(!isEmpty(options.graphics.style)) {
            this.style = getData(options.graphics.style)[0];
        }
        else {
            this.style = arguments.callee.caller.name;
        }
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
        this.blockName = "Product";
        this.blockElementName = arguments.callee.caller.name;
    }
}

function ImplicitOutBlock() {
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
        this.ordering = handleOrdering('out');
        this.parent = options.parent;
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
        this.value = options.value; // Not Known
        this.vertex = options.vertex; // Not Known
        this.visible = options.visible; // Not Known
        this.exprs = options.graphics.exprs;
        this.integerParameters = options.model.ipar;
        this.objectsParameters = options.model.opar;
        if(!isEmpty(options.model.state)) {
            this.state = options.model.state;
        }
        if(!isEmpty(options.model.dstate)) {
            this.dState = options.model.dstate;
        }
        this.equations = options.model.equations;
        this.blockName = "ImplicitOutBlock";
        this.blockElementName = arguments.callee.caller.name;
    }
}

function ImplicitInBlock() {
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
        this.ordering = handleOrdering('in');
        this.parent = options.parent;
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
        this.value = options.value; // Not Known
        this.vertex = options.vertex; // Not Known
        this.visible = options.visible; // Not Known
        this.exprs = options.graphics.exprs;
        this.integerParameters = options.model.ipar;
        this.objectsParameters = options.model.opar;
        if(!isEmpty(options.model.state)) {
            this.state = options.model.state;
        }
        if(!isEmpty(options.model.dstate)) {
            this.dState = options.model.dstate;
        }
        this.equations = options.model.equations;
        this.blockName = "ImplicitInBlock";
        this.blockElementName = arguments.callee.caller.name;
    }
}

function ExplicitInBlock() {
    if (arguments.length > 0) {
        var options = arguments[0];
        this.angle = options.angle; // Not Known
        this.blockType = getData(options.model.blocktype)[0];
        this.connectable = options.connectable; // Not Known
        this.id = options.id;
        this.interfaceFunctionName = arguments.callee.caller.name;
        this.ordering = handleOrdering('in');
        this.parent = options.parent;
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
        this.value = options.value; // Not Known
        this.vertex = options.vertex; // Not Known
        this.visible = options.visible; // Not Known
        this.exprs = options.graphics.exprs;
        this.integerParameters = options.model.ipar;
        this.objectsParameters = options.model.opar;
        if(!isEmpty(options.model.state)) {
            this.state = options.model.state;
        }
        if(!isEmpty(options.model.dstate)) {
            this.dState = options.model.dstate;
        }
        this.equations = options.model.equations;
        this.blockName = "ExplicitInBlock";
        this.blockElementName = arguments.callee.caller.name;
    }
}

function ExplicitOutBlock() {
    if (arguments.length > 0) {
        var options = arguments[0];
        this.angle = options.angle; // Not Known
        this.blockType = getData(options.model.blocktype)[0];
        this.connectable = options.connectable; // Not Known
        this.id = options.id;
        this.interfaceFunctionName = arguments.callee.caller.name;
        this.ordering = handleOrdering('out');
        this.parent = options.parent;
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
        this.value = options.value; // Not Known
        this.vertex = options.vertex; // Not Known
        this.visible = options.visible; // Not Known
        this.exprs = options.graphics.exprs;
        this.integerParameters = options.model.ipar;
        this.objectsParameters = options.model.opar;
        if(!isEmpty(options.model.state)) {
            this.state = options.model.state;
        }
        if(!isEmpty(options.model.dstate)) {
            this.dState = options.model.dstate;
        }
        this.equations = options.model.equations;
        this.blockName = "ExplicitOutBlock";
        this.blockElementName = arguments.callee.caller.name;
    }
}

function VoltageSensorBlock() {
    if (arguments.length > 0) {
        var options = arguments[0];
        this.angle = options.angle; // Not Known
        this.blockType = getData(options.model.blocktype)[0];
        this.connectable = options.connectable; // Not Known
        var dep_ut = getData(options.model.dep_ut);
        if (dep_ut[0] == "true")
            this.dependsOnU = "1";
        this.id = options.id;
        this.interfaceFunctionName = arguments.callee.caller.name;
        this.ordering = options.ordering;
        this.parent = options.parent;
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
        this.exprs = options.graphics.exprs;
        this.realParameters = options.model.rpar;
        this.integerParameters = options.model.ipar;
        this.objectsParameters = options.model.opar;
        this.nbZerosCrossing = options.model.nzcross;
        this.nmode = options.model.nmode;
        this.oDState = list();
        this.equations = options.model.equations; // Not Known
        this.blockName = "VoltageSensorBlock";
        this.blockElementName = arguments.callee.caller.name;
    }
}

function Summation() {
    if (arguments.length > 0) {
        var options = arguments[0];
        this.angle = options.angle; // Not Known
        this.blockType = getData(options.model.blocktype)[0];
        this.connectable = options.connectable; // Not Known
        var dep_ut = getData(options.model.dep_ut);
        if (dep_ut[0] == "true")
            this.dependsOnU = "1";
        this.id = options.id;
        this.interfaceFunctionName = arguments.callee.caller.name;
        this.ordering = options.ordering;
        this.parent = options.parent;
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
        this.exprs = options.graphics.exprs;
        this.realParameters = options.model.rpar;
        this.integerParameters = options.model.ipar;
        this.objectsParameters = options.model.opar;
        this.nbZerosCrossing = options.model.nzcross;
        this.nmode = options.model.nmode;
        this.oDState = list();
        this.equations = list(); // Not Known
        this.blockName = "Summation";
        this.blockElementName = arguments.callee.caller.name;
    }
}

function SuperBlock() {
    if (arguments.length > 0) {
        var options = arguments[0];
        this.angle = options.angle; // Not Known
        this.blockType = getData(options.model.blocktype)[0];
        this.connectable = options.connectable; // Not Known
        var dep_ut = getData(options.model.dep_ut);
        if (dep_ut[0] == "true") {
            this.dependsOnU = "1";
        }
        if (dep_ut[1] == "true") {
            this.dependsOnT = "1";
        }
        this.id = options.id;
        this.interfaceFunctionName = arguments.callee.caller.name;
        this.ordering = options.ordering;
        this.parent = options.parent;
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
        this.realParameters = options.model.rpar;
        this.oDState = list();
        this.equations = list(); // Not Known
        this.blockName = "SuperBlock";
        this.blockElementName = arguments.callee.caller.name;
    }
}

function zeros() {
    if (arguments.length == 0) {
        return [0];
    } else if (arguments.length == 1) {
        var a = arguments[0];
        if (typeof a.length === 'undefined') {
            return [0];
        } else {
            return math.zeros(math.size(a));
        }
    } else {
        var args = Array.prototype.slice.call(arguments);
        return math.zeros(args);
    }
}

function ones() {
    if (arguments.length == 0) {
        return [1];
    } else if (arguments.length == 1) {
        var a = arguments[0];
        if (typeof a.length === 'undefined') {
            return [1];
        } else {
            return math.ones(math.size(a));
        }
    } else {
        var args = Array.prototype.slice.call(arguments);
        return math.ones(args);
    }
}

// oness function added for summation block only
function oness() {
    if (arguments.length == 0) {
        return [1];
    } else if (arguments.length == 1) {
        var a = arguments[0];
        if (typeof a.length === 'undefined') {
            return [1];
        } else {
            return math.ones(math.size(a));
        }
    } else {
        return [1];
    }
}

function size() {
    if (arguments.length == 1) {
        var res = math.size(arguments[0]);
        if (arguments[0].length == undefined)
            res.push(1)
        return res;
    }
    else {
        var res = math.size(arguments[0]);
        if(arguments[0].length == undefined)
            res = [1]

        if (res.length == 1) {
            var a = res[0];
            res[0] = 1;
            res.push(a);
        }

        switch (arguments[1]) {
            case 'r': return res[0];
            case 1:
                return res[0];
            case 'c': return res[1];
            case 2:
                return res[1];
            case '*':
                return res[0] * res[1];
            default:
                return res[arguments[1]];
        }
    }
}

function Min() {
    var array = arguments[0];
    var min = array[0];
    for (var i = array.length - 1; i >= 0; i--) {
        if(array[i]<min)
            min=array[i];
    }
    return min;
}

function sum() {
    var sum = 0;
    var matrix = arguments[0]
    for (var i = 0; i < matrix.length; i++) {
        sum+=parseInt(matrix[i]);
    }
    return sum;
}

function Or() {
    var array = arguments[0];
    var value = false;
    for (var i = array.length - 1; i >= 0; i--) {
        value = value || (array[i] == 'true');
    }
    return value;
}

function Not() {
    var array = arguments[0];
    var result=[];
    for (var i = array.length - 1; i >= 0; i--) {
        result[i] = !array[i];
    }
    return result;
}

// will return an array of boolean values "compares if array1>array2"
function compare() {
    var array1=arguments[0];
    var array2=arguments[1];
    var operation = arguments[2];
    var result=[];
    switch (operation) {
        case 1:
            for (var i = array1.length - 1; i >= 0; i--) {
                result[i] = array1[i]>array2[i];
            }
            break;
        case 2:
            for (var i = array1.length - 1; i >= 0; i--) {
                result[i] = array1[i]<array2[i];
            }
            break;
        case 3:
            for (var i = array1.length - 1; i >= 0; i--) {
                result[i] = array1[i]==array2[i];
            }
            break;
    }
    return result;
}

// converts [1,1;1,2] => [[1,1],[1,2]]
// and [1,1,1] => [1,1,1]
// and 1 => [0]
function MatrixInverse() {
    var str = "["
    var arg = arguments[0];
    if (arg.indexOf(';') == -1) {
        if (arg.indexOf(',') == -1) {
            str += arg + ']';
            var array = JSON.parse(str);
        } else
            var array = JSON.parse(arg);
    } else {
        if (arg != "[]") {
            arg = arg.replace(/;/g, "],[");
            str += arg + "]";
        } else {
            str = "[]"
        }
        var array = JSON.parse(str);
    }
    return array;
}

function inverse() {
    var str = "[["
    var arg = arguments[0];
    if (typeof arg == 'number') {
        str += arg + "]]";
    } else if (arg != "[]") {
        arg = arg.replace(/int8\(([^)]*)\)/, "$1");
        arg = arg.replace(/[\[\]; ]+/g, " ").trim();
        arg = arg.replace(/ /g, "],[");
        str += arg + "]]";
    } else {
        str = "[]"
    }
    var array = JSON.parse(str);
    return array;
}

// replaces ',' by " " and ];[ by ;
// e.g.
// [[-1,-1];[-2,-2]] => '-1 -1;-1 -1'
function matrix_js_scilab() {
    var arg = arguments[0];
    str = ""
    if (arg.length == undefined) {
        return arg.toString();
    } else if (arg[0].length == undefined) {
        return arg.toString().replace(/,/g, " ");
    } else {
        for (var i = 0; i < arg.length; i++) {
            str += ";"+arg[i].join(" ");
        }
        str = str.substring(1, str.length);
        return str;
    }
}

// function to return code for char string
function _str2code() {
    var conversion = "0123456789abcdefghijklmnopqrstuvwxyz_#!$ ();:+-*/\\=.,'[]%|&<>~^";
    var conversion2 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ00?0 00000000$000\"{}000`0@0r";
    var str = arguments[0];
    var code = [];
    for (var i = 0; i < str.length; i++) {
        code[i] = [conversion.indexOf(str[i])];
        if (code[i] == -1){
            code[i] = [conversion2.indexOf(str[i]) * -1];
        }
    }
    return code;
}

function real() {
    var matrix = arguments[0];
    var sz = math.size(matrix);
    var res = [];
    for (var i = 0; i < sz[0]; i++) {
        for (var j = 0; j < sz[1]; j++) {
            res.push([math.re(matrix[i][j])]);
        }
    }
    return res;
}

function imag() {
    var matrix = arguments[0];
    var sz = math.size(matrix);
    var res = [];
    for (var i = 0; i < sz[0]; i++) {
        for (var j = 0; j < sz[1]; j++) {
            res.push([math.im(matrix[i][j])]);
        }
    }
    return res;
}

function _check() {
    var param = arguments[0];
    if(typeof param == "object") {
        var str = param.toString();
        str = str.substring(1, str.length - 1);
        str = str.replace(/\B\+/, "+%i*");
        str = str.replace(/\B-/, "-%i*");
        str = param.toString().substring(0, 1) + str;
        str = str.replace(/ /g, '');
        return str;
    }
    else if(typeof param == "string") {
        return '&quot;'+param+'&quot;';
    }
    else {
        return param;
    }
}

// Converts String to Array of ASCII values
function ascii() {
    var str = arguments[0];
    var convertAscii = [];
    for (var i = 0; i < str.length; i++) {
        convertAscii[i] = [str.charCodeAt(i)];
    }
    return convertAscii;
}

function genSwitchInnerDiagram(stateOpen) {
    diagram = scicos_diagram();
    // Input forward
    diagram.objs.push(new IN_f().internal());
    diagram.objs[0].graphics.pout = new ScilabDouble([5]);
    diagram.objs[0].graphics.flip = new ScilabBoolean([true]);
    diagram.objs[0].model.uid = new ScilabString([count]);
    diagram.objs[0].doc = list(new ScilabString([count++]));

    // Output's forward
    diagram.objs.push(new OUT_f().internal());
    diagram.objs[1].graphics.pin = new ScilabDouble([7]);
    diagram.objs[1].graphics.flip = new ScilabBoolean([true]);
    diagram.objs[1].model.outtyp = new ScilabDouble();
    diagram.objs[1].model.uid = new ScilabString([count]);
    diagram.objs[1].doc = list(new ScilabString([count++]));

    diagram.objs.push(new CONST_m().internal());
    diagram.objs[2].graphics.pout = new ScilabDouble([6]);
    diagram.objs[2].graphics.flip = new ScilabBoolean([true]);
    diagram.objs[2].graphics.exprs = new ScilabString(["0"]);
    diagram.objs[2].graphics.out_implicit = new ScilabString(["E"]);
    diagram.objs[2].graphics.out_style = new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]);
    diagram.objs[2].graphics.out_label = new ScilabString([""]);
    diagram.objs[2].model.rpar = new ScilabDouble([0]);
    diagram.objs[2].model.uid = new ScilabString([count]);
    diagram.objs[2].doc = list(new ScilabString([count++]));

    diagram.objs.push(new SWITCH_f().internal());
    diagram.objs[3].graphics.pin = new ScilabDouble([5], [6]);
    diagram.objs[3].graphics.flip = new ScilabBoolean([true]);
    diagram.objs[3].graphics.pout = new ScilabDouble([7]);
    diagram.objs[3].graphics.in_implicit = new ScilabString(["E"], ["E"]);
    diagram.objs[3].graphics.in_style = new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"], ["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]);
    diagram.objs[3].graphics.in_label = new ScilabString([""], [""]);
    diagram.objs[3].graphics.out_implicit = new ScilabString(["E"]);
    diagram.objs[3].graphics.out_style = new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]);
    diagram.objs[3].graphics.out_label = new ScilabString([""]);
    diagram.objs[3].graphics.style = new ScilabString(["SWITCH_f"]);
    diagram.objs[3].model.in2 = new ScilabDouble([1], [1]);
    diagram.objs[3].model.intyp = new ScilabDouble([1], [1]);
    diagram.objs[3].model.out2 = new ScilabDouble([1]);
    diagram.objs[3].model.uid = new ScilabString([count]);
    diagram.objs[3].doc = list(new ScilabString([count++]));

    if (stateOpen == true) {
        diagram.objs[3].model.ipar = new ScilabDouble([1]);
        diagram.objs[3].graphics.exprs = new ScilabString(["2"], ["2"]);
    } else {
        diagram.objs[3].model.ipar = new ScilabDouble([0]);
        diagram.objs[3].graphics.exprs = new ScilabString(["2"], ["1"]);
    }

    // IN_f <-> SWITCH_f
    diagram.objs[4] = scicos_link({
        xx: new ScilabDouble([0], [0]),
        yy: new ScilabDouble([0], [0]),
        from: new ScilabDouble([1, 1, 0]),
        to: new ScilabDouble([4, 1, 1])
    });
    // CONST_m <-> SWITCH_f
    diagram.objs[5] = scicos_link({
        xx: new ScilabDouble([0], [0]),
        yy: new ScilabDouble([0], [0]),
        from: new ScilabDouble([3, 1, 0]),
        to: new ScilabDouble([4, 2, 1])
    });
    // SWITCH_f <-> OUT_f
    diagram.objs[6] = scicos_link({
        xx: new ScilabDouble([0], [0]),
        yy: new ScilabDouble([0], [0]),
        from: new ScilabDouble([4, 1, 0]),
        to: new ScilabDouble([2, 1, 1])
    });

    return diagram;
}

// M_FREQ Block
function mfrequ_clk(frequ, offset) {
    var m = [];
    var den = [];
    var off = [];
    var count = [];
    var m1 = [];
    var fir = [];
    var v = frequ.concat(offset);
    v = transpose([removeElementsWithValue(convertarray(v), 0)]);
    // here we convert the matrix to array and remove elements with zero values
    // working prototype
    // https://repl.it/@RinkiNag24/DependentMiserablePtarmigan
    var min_v = Math.min.apply(null, v);
    var max_v = Math.max.apply(null, v);
    if (max_v / min_v > 100000) {
        alert('The difference between the frequencies is very large, the clocks could not be synchronized');
        return v;
    }
    var fixed = fixedpointgcd(v);
    var value = fixed[0];
    den = parseFloat(fixed[1]);
    var result = uni(frequ, offset);
    k = result[1];
    m1 = result[0];
    var frd1 = matmultiplication(frequ, den);
    var clone = frd1.slice(0);
    var ppcm = lcm_more_than_two_numbers(clone);
    if (frequ.length > 1) {
        var mat1 = [];
        for (var j = 0; j <= frequ.length - 1; j++) {
            var matind1 = offset[j][0] * den;
            var matind2 = frd1[j][0];
            var matind3 = parseFloat(ppcm);
            mat1[j] = matindices(matind1, matind2, matind3);
        }
        re = convertarray(mat1);
        var mat2 = [];
        for (var k = 0; k <= frequ.length - 1; k++) {
            mat2[k] = convertarray(
                matmultiplication(ones(mat1[k].length, 1), Math.pow(2, k))
            );
        }
        re1 = convertarray(mat2);
        mat =conmat(re, re1)
        var items = mat; // here we are transfering mat values to items var.
        // this function will return two values n which is sorted matrix and k
        // with index matched with its previous position before sort
        var gsortre = gsort(items);
        var newmat = transpose(gsortre[0]).concat([transpose(items)[1]]);
        var indearr = transpose(gsortre[1]);
        mat = transpose([newmat[0]].concat(matincrease([newmat[1]], indearr)));
        // mat=mat(k,:);
        // implemented in matincrease function
        // https://repl.it/@RinkiNag24/HarmfulFlippantAntelopegroundsquirrel
        // it arranges the matrix in order passed by k mat of gsort as we get
        // [n,k] from gsort function.
        if (mat[1].length > 10000) {
            confirm('Warning: Your system is too hard to synchronize it will take some time\nAnd the stacksize has to be increase\nA scilab crash may occur\nDo You want me to continue?');
        }

        // cloned the matrix to prevent iteration and saving for further use
        const matclone = mat.map(a => ({ ...a }));
        var mat22 = listiteration(mat, 1, mat.length - 1, 0);
        var mat32 = listiteration(mat, 0, mat.length - 2, 0);
        var vv = sub(mat22, mat32);
        var arrele = [1];
        vv = transpose([arrele.concat(transpose(vv)[0], arrele)]);
        var kkk = findzero(vv);
        var kk = findnzero(vv);
        for (var i = 0; i <= kk.length - 2; i++) {
            var kki = kk[i];
            var kk1i = (kk[i+1])-1;
            var mu = listiteration(mat, kki, kk1i, 1);
            mat[kk[i]][1] = sum(convertarray(mu));
        }
        // mat(kkk(:),:)=[];
        // https://repl.it/@RinkiNag24/HarmfulFlippantAntelopegroundsquirrel
        mat = deletemulrows(mat, kkk);
        // it will delete the rows listed in kkk array.
        var last = mat.length - 1;
        // m=[mat(1,1);mat(2:$,1)-mat(1:$-1,1)];
        // constructing the first element of opar
        mat22 = listiteration(mat, 1, mat.length - 1, 0);
        mat32 = listiteration(mat, 0, mat.length - 2, 0);
        // contains the first element of the chain and the delay.
        m = transpose([[mat[0][0]].concat(transpose(sub(mat22, mat32))[0])]);
        // finding the last delay.
        var last_delay = parseFloat(ppcm) - mat[last][0] + mat[0][0];
        if (last_delay != 0) {
            var last1 = mat.length;
            var l_t = last1;
            m[l_t] = last_delay; // we add the last delay to m.
            m = m.concat(
                [listiteration(mat, 0, mat.length - 1, 1), [mat[0][1]]],
                [parseFloat(ppcm) + mat[0][0]].concat(
                    listiteration(mat, 0, mat.length - 1, 0)
                )
            );
            // the event output for the last element
            // incredibeleto
            // will be equal to the first one.
            // the time will be the lcm+the delay of the first element
            // m=[m,[mat(:,2);mat(1,2)],[mat(:,1);double(ppcm)+mat(1,1)]]
        } else {
            m = transpose([
                transpose(m)[0],
                transpose(listiteration(mat, 0, mat.length - 1, 1))[0],
                transpose(listiteration(mat, 0, mat.length - 1, 0))[0],
            ]);
        }

        count = mat[0][0];
        // we put the first element of the matrix in a variable that will
        // initialise the counter
        m.splice(0, 1); // deleting first row frm m matrix
        var mn = Math.pow(2, m1.length)-1; // find the number of event output.
        // put all the element of the firing to -1
        fir = matmultiplication(ones(1, mn), -1)[0];
        // var fir=-ones(1,mn);as ones not working will work in combinedjs
        var prog = matclone[0][1] - 1;
        // programming the corresponding event output by the first element of
        // the matrix mat.(first delay).
        fir[prog] = mat[0][0] / parseFloat(den);
        // the offset in this case will be equal to 0 because it is implemented
        // in the calculation of the delay.
        var off = 0;
    } else {
        m = [frd1, 1, frd1];
        // put the delay in the matrix. the delay will be equal to the one
        // frequency.
        count = 0; // the counter will begin by 0.
        mat = m;
        // the offset is put in the variable off. used by the simulator.
        off = offset;
        fir = off;
    }
    fir = matmultiplication(ones(1, mn), -1)[0];
    var mainre=[m, den, off, count, m1, fir, frequ, offset];
    return mainre;
}

// functions used in this program
function deletemulrows(mat, rowdelmat) {
    // this function deletes multiple rows at a time.
    // https://repl.it/@RinkiNag24/HarmfulFlippantAntelopegroundsquirrel
    for (i = 0; i <= rowdelmat.length - 1; i++) {
        // deleting rows of matrix
        mat = mat.slice(0); // make copy
        mat.splice(rowdelmat[i], 1);
        if (i > 0) {
            mat.splice(rowdelmat[i] - 1, 1);
        }
    }
    return mat;
}

function sum(v) {
    // for taking sum of whole matrix
    var total = 0;
    for (var i in v) {
        total += v[i];
    }
    return total;
}

function convertarray(arrToConvert) {
    // it will convert a matrix in array
    var newArr = [];
    for (var i = 0; i < arrToConvert.length; i++) {
        newArr = newArr.concat(arrToConvert[i]);
    }
    return newArr;
}

function findzero(e1) {
    // https://repl.it/@RinkiNag24/RowdyPeachpuffGrouper
    var vind = [];
    for (i = 0; i <= e1.length - 1; i++) {
        // here i have fixed the col as v is row matrix

        vind[i] = [];

        if (e1[i] == 0) {
            vind[i] = i;
        }
    }
    var a = vind.join('').split('');
    var result = a.map(function(x) {
        return parseInt(x, 10);
    });
    return result;
}

function findnzero(e2) {
    // https://repl.it/@RinkiNag24/RowdyPeachpuffGrouper
    var vind = [];
    for (i = 0; i <= e2.length - 1; i++) {
        // here i have fixed the col as v is row matrix

        vind[i] = [];

        if (e2[i] != 0) {
            vind[i] = i;
        }
    }
    var a = vind.join('').split('');
    var result = a.map(function(x) {
        return parseInt(x, 10);
    });
    return result;
}

function lcm_more_than_two_numbers(input_array) {
    if (toString.call(input_array) !== '[object Array]') return false;
    var r1 = 0;
    var r2 = 0;
    var l = input_array.length;
    for (i = 0; i < l; i++) {
        r1 = input_array[i] % input_array[i + 1];
        if (r1 === 0) {
            input_array[i + 1] =
                input_array[i] * input_array[i + 1] / input_array[i + 1];
        } else {
            r2 = input_array[i + 1] % r1;
            if (r2 === 0) {
                input_array[i + 1] = input_array[i] * input_array[i + 1] / r1;
            } else {
                input_array[i + 1] = input_array[i] * input_array[i + 1] / r2;
            }
        }
    }
    return input_array[l - 1];
}

function gcd_more_than_two_numbers(input) {
    if (toString.call(input) !== '[object Array]') return false;
    var len, a, b;
    len = input.length;
    if (!len) {
        return null;
    }
    a = input[0];
    for (var i = 1; i < len; i++) {
        b = input[i];
        a = gcd_two_numbers(a, b);
    }
    return a;
}

function gcd_two_numbers(x, y) {
    if (typeof x !== 'number' || typeof y !== 'number') return false;
    x = Math.abs(x);
    y = Math.abs(y);
    while (y) {
        var t = y;
        y = x % y;
        x = t;
    }
    return x;
}

function bubbleSort(arr) {
    var len = arr.length;
    for (var i = len - 1; i >= 0; i--) {
        for (var j = 1; j <= i; j++) {
            if (arr[j - 1] > arr[j]) {
                var temp = arr[j - 1];
                arr[j - 1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return [arr];
}

// this function transpose the matrix like makes rows to col and viceversa
function transpose(a) {
    return a[0].map(function(_, c) {
        return a.map(function(r) {
            return r[c];
        });
    });
}

function gsort(items) {
    // gsort works same like gsort in scilab
    var duplicate = [];
    var iter = [];
    for (i = 0; i <= items.length - 1; i++) {
        iter.push(items[i][0]);
        duplicate.push(items[i][0]);
    }
    newiter = bubbleSort(iter);
    tnewiter = transpose(newiter);
    var hash = {};
    var index = [];
    for (i = 0; i < newiter[0].length; i++) {
        var ind_temp;
        if (newiter[0][i] in hash) {
            ind_temp = duplicate.indexOf(newiter[0][i], hash[newiter[0][i]] + 1);
            index.push(ind_temp);
            hash[newiter[0][i]] = ind_temp;
        } else {
            ind_temp = duplicate.indexOf(newiter[0][i]);
            index.push(ind_temp);
            hash[newiter[0][i]] = ind_temp;
        }
    }
    tindex = transpose([index]);
    var result = [tnewiter, tindex];
    return result;
}

function matindices(from, diff, to) {
    // function which implements range list of scilab
    // like matindices[1:2:10] gives 1. 3. 5. 7. 9.
    // which was not possible in js so made function
    var arrayindi = [];
    for (i = from; i <= to; i += diff) {
        arrayindi.push(i);
    }
    return arrayindi;
}

function deleteRow(arr, row) {
    // deleting rows of matrix but single one only after that indices get
    // changed for for multiple rows i have made deletemulrows function.
    arr = arr.slice(0); // make copy
    arr.splice(row - 1, 1);
    return arr;
}

function listiteration(list, fromrows, torows, col) {
    // https://repl.it/@RinkiNag24/PurpleSpiffyEmperorpenguin

    var newl = list; // making a copy of list
    var iterla = [];
    for (i = fromrows; i <= torows; i++) {
        iterla[i - fromrows] = [];
        for (j = col; j <= col; j++) {
            iterla[i - fromrows][j - col] = newl[i][j];
        }
    }
    return iterla;
}

function sub(mat, items) {
    // this function is for subtraction of matrix
    var len1 = items[0].length;
    var len2 = mat.length;
    var ansub = [];
    for (i = 0; i <= len2 - 1; i++) {
        ansub[i] = [];
        for (j = 0; j <= len1 - 1; j++) {
            ansub[i][j] = mat[i][j] - items[i][j];
        }
    }
    return ansub;
}

function removeElementsWithValue(arr, val) {
    // this removes the zero elements from array .
    var i = arr.length;
    while (i--) {
        if (arr[i] === val) {
            arr.splice(i, 1);
        }
    }
    return arr;
}

function matmultiplication(matrix, num) {
    var mul = [];
    for (i = 0; i <= matrix.length - 1; i++) {
        mul[i] = [];
        for (j = 0; j <= matrix[0].length - 1; j++) {
            mul[i][j] = matrix[i][j] * num;
        }
    }
    return mul;
}

function fixedpointgcd(v) {
    // working prototype
    // https://repl.it/@RinkiNag24/MonstrousAcidicMicrovenator
    // This function computes the PGCD of a double vector.
    var x = [];
    for (i = 0; i <= v.length - 1; i++) {
        // considered row matrix only
        x[i] = [];

        x[i][0] = Math.log10(v[i][0]);
    }
    var f = 0; // considering scilab result
    v = [[1], [2]];
    // [N,D]=rat(v,1d-9);
    var N = v;
    var D = [[1], [1]];
    var den = lcm_more_than_two_numbers(convertarray(D));
    var value = gcd_more_than_two_numbers(convertarray(D));
    if (f > 0) {
        value = value * Math.pow(10, f);
    } else {
        den = parseFloat(den) * Math.pow(10, -f);
    }
    var fix = [value, den];
    return fix;
}

function matincrease(matrix, indearr) {
    var rearange = [];
    for (i = 0; i <= matrix.length - 1; i++) {
        rearange[i] = [];

        for (j = 0; j <= matrix[0].length - 1; j++) {
            rearange[i][j] = matrix[i][indearr[0][j]];
        }
    }
    return rearange;
}

function ones() {
    if (arguments.length == 0) {
        return [1];
    } else if (arguments.length == 1) {
        var a = arguments[0];
        if (typeof a.length === 'undefined') {
            return [1];
        } else {
            return math.ones(math.size(a));
        }
    } else {
        var args = Array.prototype.slice.call(arguments);
        return math.ones(args);
    }
}

// uni function
function uni(fr, of) {
    var k = [];
    var m = [];
    var ot = [];

    for (var i = 0; i < fr.length; i++) {
        var istreated = false;
        var ind = [];
        ind = m.indexOf(fr[i]);
        if (ind == '') {
            m[i] = fr[i];
            ot[i] = [of[i]];
            k[i] = [i + 1];
        } else {
            for (var j = 0; j <= ind; j++) {
                if (of[i] == ot[j]) {
                    istreated = true;
                }
            }
            if (!istreated) {
                m[i] = fr[i];
                ot[i] = [of[i]];
                k[i] = [i + 1];
            }
        }
    }

    var result = [m, k];
    return result;
}

function conmat(v, v1) {
    // only for col matrix it joins two matrix
    result = [];
    for (i = 0; i <= v.length - 1; i++) {
        result[i] = [];
        result[i] = [v[i], v1[i]];
    }
    return result;
}

// end of mfreq code
// for calling post method using ajax for calling poly() of scilab
function cont_frm(num, den) {
    var return_value;

    $.ajax({
        type: "POST",
        url: "/getOutput",
        async: false,
        data: { num: num, den: den },
        dataType: "json",
        success: function(rv) {
            if (rv != "Error") {
                return_value = rv;
            }else{
                var msg = "Error while setting block parameters\n\nPlease check entered polynomial";
                alert(msg);
                throw "error";
            }
        },
        error: function(xhr, textStatus) {
            var msg = "An error occurred!! \n\nPlease try again"
            alert(msg);
            throw "error";
        }
    });

    return return_value;
}

/*
 * function to handle input for vector/array
 * case 1: Handle multiple space between two numbers.
 * case 2: Replace that space with comma so that javascript can parse it
 * further
 * case 3: In case user enter 1 2 3 as value it will be converted as [1,2,3]
 */
function convertInputVectorFormat(inputValue) {
    // removed multiple space with single space
    var removeSpace=inputValue.replace(/ +(?= )/g, '');
    // replace single space with comma
    var replaceWithcomma=removeSpace.replace(/\s+/g, ',');

    if (replaceWithcomma.includes("[") && replaceWithcomma.indexOf("[")==0 && replaceWithcomma.includes("]")) {
        replaceWithcomma=replaceWithcomma;
    } else {
        replaceWithcomma="["+replaceWithcomma+"]";
    }
    return replaceWithcomma;
}

// for calling post method using ajax for calling scilab function for Expression block
function get_expr_output_for_DefineandSet(head,exx) {
    var response_map = null;

    $.ajax({
        type: "POST",
        url: "/getExpressionOutput",
        async: false,
        data: { head: head, exx: exx },
        dataType: "json",
        success: function(rm) {
            response_map = rm;
        },
        error: function(xhr, textStatus) {
            var msg = "An error occurred!! \n\nPlease try again"
            alert(msg);
            throw "error";
        }
    });

    return response_map;
}

// calling post method using ajax for calling scilab function cleandata for sigbuilder block
function cleandata(xye) {
    var response = null;

    $.ajax({
        type: "POST",
        url: "/cleandata",
        async: false,
        data: { xye: xye },
        dataType: "json",
        success: function(rm) {
            response = rm;
        },
        error: function(xhr, textStatus) {
            var msg = "An error occurred!! \n\nPlease try again"
            alert(msg);
            throw "error";
        }
    });
    return response;
}

// calling post method using ajax for calling scilab function Do_Spline for sigbuilder block
function Do_Spline(N,order,x,y){
    var response = null;

    $.ajax({
        type: "POST",
        url: "/do_Spline",
        async: false,
        data: { N: N, order: order, x: x, y: y },
        dataType: "json",
        success: function(rm) {
            response = rm;
        },
        error: function(xhr, textStatus) {
            var msg = "An error occurred!! \n\nPlease try again"
            alert(msg);
            throw "error";
        }
    });
    return response;
}

//For Sigbuilder block
function getmethod(mtd){
    var METHOD = "";
    switch (mtd){
        case 0: METHOD = "zero order"; break;
        case 1: METHOD = "linear"; break;
        case 2: METHOD = "order 2"; break;
        case 3: METHOD = "not_a_knot"; break;
        case 4: METHOD = "periodic"; break;
        case 5: METHOD = "monotone"; break;
        case 6: METHOD = "fast"; break;
        case 7: METHOD = "clamped"; break;
    }
    return METHOD;
}

//for parameters for different Chart
function getcharttype(mtd){
    var chartType = "";
    switch (mtd){
        case 0: chartType = "line"; break;
        case 1: chartType = "line"; break;
        case 2: chartType = "spline"; break;
        case 3: chartType = "spline"; break;
        case 4: chartType = "spline"; break;
        case 5: chartType = "spline"; break;
        case 6: chartType = "spline"; break;
        case 7: chartType = "spline"; break;
    }
    return chartType;
}

function update_self_switch_values(graph, cell){
    var model = graph.getModel();
    model.beginUpdate();
    try {
        var oldPorts = getPorts(cell.blockInstance.instance);
        var details = cell.blockInstance.instance.set();
        updateDetails(graph, cell, details);
        var newPorts = getPorts(cell.blockInstance.instance);
        modifyPorts(graph, cell, cell.ports.left, 'left', oldPorts.inputPorts, newPorts.inputPorts);
        modifyPorts(graph, cell, cell.ports.top, 'top', oldPorts.controlPorts, newPorts.controlPorts);
        modifyPorts(graph, cell, cell.ports.right, 'right', oldPorts.outputPorts, newPorts.outputPorts);
        modifyPorts(graph, cell, cell.ports.bottom, 'bottom', oldPorts.commandPorts, newPorts.commandPorts);
    } finally {
        model.endUpdate();
    }
    graph.refresh();
}

