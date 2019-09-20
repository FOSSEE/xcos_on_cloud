var check_call_for_sci = 1;
function genfunc2(opar, i1, o1, ci1, co1, xx1, z1, rpar1, auto01, deptime1, graph, cell){
    var regex_parentheses = /[\])}[{(]/g;
    var defaultProperties = cell.blockInstance.instance.get();
    var original_propertiesObject = {
        id: cell.id
    };
    for (var key in defaultProperties) {
        if (defaultProperties.hasOwnProperty(key)) {
            original_propertiesObject[key]=defaultProperties[key][1].toString();
        }
    }
    var opar_len = opar.length;
    var text_main_array = [];
    if(opar_len != 7){
        text_main_array = [" "," "," "," "," "," "," "];
    }else{
        for (var i = 0; i < opar_len; i++) {
            var ary = getData(opar[i]);
            text_main_array[i] = ary;
        }
    }
    var k = 0;
    var in1 = inverse(i1);
    var in_1_arry = [];
    for (var i = 0; i < in1.length; i++) {
        for (var j = 0; j < in1[i].length; j++) {
            in_1_arry[k] = in1[i][j];
            k++;
        }
    }
    var k = 0;
    var out = inverse(o1);
    var out_1_arry = [];
    for (var i = 0; i < out.length; i++) {
        for (var j = 0; j < out[i].length; j++) {
            out_1_arry[k] = out[i][j];
            k++;
        }
    }
    var k = 0;
    var clkin1 = inverse(ci1);
    var clkin = [];
    for (var i = 0; i < clkin1.length; i++) {
        for (var j = 0; j < clkin1[i].length; j++) {
            clkin[k] = clkin1[i][j];
            k++;
        }
    }
    var k = 0;
    var clkout1 = inverse(co1);
    var clkout = [];
    for (var i = 0; i < clkout1.length; i++) {
        for (var j = 0; j < clkout1[i].length; j++) {
            clkout[k] = clkout1[i][j];
            k++;
        }
    }
    var k = 0;
    var x0 = inverse(xx1);
    var x01 = [];
    for (var i = 0; i < x0.length; i++) {
        for (var j = 0; j < x0[i].length; j++) {
            x01[k] = x0[i][j];
            k++;
        }
    }
    var k = 0;
    var z0 = inverse(z1);
    var z01 = [];
    for (var i = 0; i < z0.length; i++) {
        for (var j = 0; j < z0[i].length; j++) {
            z01[k] = z0[i][j];
            k++;
        }
    }
    var k = 0;
    var rpar0 = inverse(rpar1);
    var rpar01 = [];
    for (var i = 0; i < rpar0.length; i++) {
        for (var j = 0; j < rpar0[i].length; j++) {
            rpar01[k] = rpar0[i][j];
            k++;
        }
    }
    var k = 0;
    var auto = inverse(auto01);
    var auto1 = [];
    for (var i = 0; i < auto.length; i++) {
        for (var j = 0; j < auto[i].length; j++) {
            auto1[k] = auto[i][j];
            k++;
        }
    }
    var ni = (in_1_arry.length/2);
    var no = (out_1_arry.length/2);
    var nrp = 0;
    if(rpar01.length != 0){
        nrp = rpar0.length * rpar0[0].length;
    }
    var nci = clkin.length;
    var nco = clkout.length;
    var xx_size = x01.length;
    var z_size = z01.length;
    var rpar_size = rpar01.length;
    var auto_size = auto1.length;
    var mac = [];
    var ok = false;
    var dep_ut = [];

    var dep_u = false;
    var dep_t = false;
    var depp = "t";
    var deqq = "t";
    get_parameters_wind_scifunc.destroy();

    var update_propertiesObject = {
            id: cell.id
    };
    update_propertiesObject["i"] = i1;
    update_propertiesObject["o"] = o1;
    update_propertiesObject["ci"] = ci1;
    update_propertiesObject["co"] = co1;
    update_propertiesObject["xx"] = xx1;
    update_propertiesObject["z"] = z1;
    update_propertiesObject["rpar"] = rpar1;
    update_propertiesObject["auto0"] = auto01;
    update_propertiesObject["deptime"] = deptime1;

    var return_text_array  = "";
    //flag 1
    if(no > 0){
        create_popup_for_define_function(no, ni, nci, nco, xx_size, z_size, rpar_size, graph, cell, text_main_array, update_propertiesObject, in_1_arry, out_1_arry, clkin, clkout);
    }
    //flag2
    else if(xx_size > 0){
       create_popup_for_continuous_states_evolution(no, ni, nci, nco, xx_size, z_size, rpar_size, graph, cell, text_main_array);
    }
    else if((nci > 0 && (xx_size > 0 || z_size > 0))|| z_size > 0){
        create_popup_for_event_time(no, ni, nci, nco, xx_size, z_size, rpar_size, defaultProperties, graph, text_main_array);
    }
    //flag = 3
    else if(nci>0 && nco>0){
        create_popup_for_time_events_t_evo (no, ni, nci, nco, xx_size, z_size, rpar_size, graph, cell, text_main_array)
    }
    //flag = 6  x,z,u1,rpar
    else if(xx_size > 0 || z_size > 0 || no > 0){
        create_popup_for_func_imposing_contraints(no, ni, nci, nco, xx_size, z_size, rpar_size, defaultProperties, graph, text_main_array)
    }
    else{
    //flag 4
        create_popup_for_initialization(no, ni, nci, nco, xx_size, z_size, rpar_size, defaultProperties, graph, text_main_array ,update_propertiesObject, in_1_arry, out_1_arry, clkin, clkout);
    }
    dep_ut = [dep_u,dep_t];
    check_call_for_sci = 1;
}

//for saving will be used later as per submission of form/popup
function update_cell_object(graph, cell, text_main_array, update_propertiesObject, in_1_arry, out_1_arry, clkin, clkout){
    check_call_for_sci = 2;

    //For setting opar values
    var opar = cell.blockInstance.instance.x.model.opar;
    if(opar.length == 7 || text_main_array[0].toString() != "y1=sin(u1);"){
        cell.blockInstance.instance.x.model.opar = list(new ScilabString([text_main_array[0].toString()]), new ScilabString([text_main_array[1].toString()]), new ScilabString([text_main_array[2].toString()]), new ScilabString([text_main_array[3].toString()]), new ScilabString([text_main_array[4].toString()]), new ScilabString([text_main_array[5].toString()]), new ScilabString([text_main_array[6].toString()]));
    }

    var model = graph.getModel();
    model.beginUpdate();
    try {
        var oldPorts = getPorts(cell.blockInstance.instance);
        var details = cell.blockInstance.instance.set(update_propertiesObject);
        set_io(cell.blockInstance.instance.x.model, cell.blockInstance.instance.x.graphics,in_1_arry, out_1_arry, clkin, clkout);
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

/* flag 1 */

function create_popup_for_define_function(no, ni, nci, nco, xx_size, z_size, rpar_size, graph, cell, text_main_array, update_propertiesObject, in_1_arry, out_1_arry, clkin, clkout) {

    var defaultProperties = cell.blockInstance.instance.get();
    var first_wind_value_arry = text_main_array[0];
    console.log(first_wind_value_arry.length);
    var def_func_div = document.createElement("div");

    var def_func_head = document.createElement("h2");
    def_func_head.innerHTML = "Define the function which computes the output";
    def_func_div.appendChild(def_func_head);

    var def_func_form = document.createElement("form");
    var linebreak = document.createElement('br');
    def_func_form.appendChild(linebreak);

    var def_func_label = document.createElement("label");
    def_func_label.innerHTML = "Enter scilab instruction defining";
    def_func_form.appendChild(def_func_label);
    var linebreak = document.createElement('br');
    def_func_form.appendChild(linebreak);
    var array_for_y_value = [];
    for (var i = 0; i < no; i++) {
        /*
        * creating labels dynamically in def_func popup depending on the no.
        * of outport ports in popup1
        */
        var def_func_label_1 = document.createElement("label");
        def_func_form.appendChild(def_func_label_1);
        var linebreak = document.createElement('br');
        def_func_form.appendChild(linebreak);
        var label_with_index = "y"+(i + 1);
        array_for_y_value[i] = label_with_index;
        def_func_label_1.innerHTML = label_with_index+" (size: 1)";
    }

    var def_func_label_2 = document.createElement("label");
    /* for input port values ie 'u'  */
    var u_text = "as a function of t,";
    if(xx_size != 0){
        u_text += "x,";
    }
    if(z_size != 0){
        u_text += "z," ;
    }
    for (var i = 1; i <= ni; i++) {
        u_text += "u"+i+",";
    }
    u_text += "n_evi," ;
    if(rpar_size != 0){
        u_text += "rpar";
    }
    def_func_label_2.innerHTML =  u_text;
    def_func_form.appendChild(def_func_label_2);
    var linebreak = document.createElement('br');
    def_func_form.appendChild(linebreak);
    def_func_form.appendChild(linebreak);
    var def_func_inputtextarea = document.createElement("TEXTAREA");
    def_func_inputtextarea.style.cssText = "width: 340px";
    var txt = "";
    if(first_wind_value_arry.length > 0 && first_wind_value_arry.toString().trim().length > 0){
        var len = first_wind_value_arry.length;
        for (var i = 0; i < len; i++) {
            txt += first_wind_value_arry[i].toString().trim() + " \n ";
        }
        def_func_inputtextarea.value = txt;
    }else{
        def_func_inputtextarea.value = "y1=sin(u1)";
    }
    def_func_inputtextarea.id = "def_func_inputtextarea";
    def_func_form.appendChild(def_func_inputtextarea);
    var linebreak = document.createElement('br');
    def_func_form.appendChild(linebreak);
    def_func_form.appendChild(linebreak);

    var def_func_submit_btn = document.createElement("button");
    def_func_submit_btn.innerHTML = "OK";
    def_func_submit_btn.type = "button";
    def_func_submit_btn.onclick = function() {
        var def_func_value = document.getElementById("def_func_inputtextarea").value;
        var value_array = def_func_value.split(/[\n]+/);
        var text_value = "";
        for (var i = 0; i < value_array.length; i++) {
            if(value_array[i].length != 0){
                text_value += value_array[i] +";";
            }
        }
        var textfrom_def_func = text_value.toString().replace(/\s\s+/g,"");
        for (var i = 0; i < array_for_y_value.length; i++) {
            var check = textfrom_def_func.includes(array_for_y_value[i]);
            if(!check){
                alert("You did not define "+ array_for_y_value[i] +" (size: 1) !");
                throw "incorrect";
            }
        }
        var temp_first_value_array = value_array;
        var first_value_array = [];
        for (var i = 0; i < temp_first_value_array.length; i++) {
            if(temp_first_value_array[i].length != 0){
                first_value_array.push(temp_first_value_array[i].trim());
            }
        }
        text_main_array[0] = first_value_array;
        //Once other popup are fixed this function will be removed and put in particular popup code
        def_func_wind.destroy();
        //Condition
        create_popup_for_initialization(no, ni, nci, nco, xx_size, z_size, rpar_size, defaultProperties,cell, graph, text_main_array, update_propertiesObject, in_1_arry, out_1_arry, clkin, clkout);
    }
    var def_func_reset_btn = document.createElement("button");
    def_func_reset_btn.innerHTML = 'Cancel';
    def_func_reset_btn.type = "button";
    def_func_reset_btn.onclick = function() {
        def_func_wind.destroy();
    }
    def_func_form.appendChild(def_func_reset_btn);
    def_func_head.style.cssText = "margin-left: 15px";
    def_func_form.style.cssText = "margin-left: 15px";
    def_func_submit_btn.style.cssText = "margin-left: 320px; margin-top: 20px; margin-bottom: 5px";
    def_func_reset_btn.style.cssText = "float: right; margin-top: 20px; margin-right: 15px; margin-bottom: 5px";
    def_func_div.style.cssText = "border: 1px solid black";
    def_func_form.appendChild(def_func_submit_btn);
    def_func_div.appendChild(def_func_form);
    height = 135 + 26 * defaultProperties.length + 15;
    var def_func_wind = showModalWindow(graph, 'Scilab Input Value Request', def_func_div, 450, height);
}

/* flag 2 */

function create_popup_for_continuous_states_evolution(no, ni, nci, nco, xx_size, z_size, rpar_size, graph, cell, text_main_array){

    var defaultProperties = cell.blockInstance.instance.get();
    var zero_wind_value_arry = text_main_array[1];
    var cont_stat_div = document.createElement("div");
    var cont_stat_form = document.createElement("form");
    var linebreak = document.createElement('br');
    cont_stat_form.appendChild(linebreak);

    var cont_stat_label1 = document.createElement("label");
    var label_txt = "Define continuous states evolution<br><br>Enter Scilab instructions defining:<br>"+
    "derivative of continuous state xd (size:" +xx_size+ ") <br> as  function(s) of t,";
    if(xx_size > 0){
        label_txt += "x,";
    }
    if(z_size > 0){
        label_txt += "z," ;
    }
    if(ni > 0){
        var u_text = "";
        for(var i = 1; i <= ni; i++){
            u_text += "u"+i+",";
        }
        label_txt += u_text;
    }
    if(rpar_size > 0){
        label_txt += "rpar";
    }
    cont_stat_label1.innerHTML = label_txt;
    cont_stat_form.appendChild(cont_stat_label1);
    var linebreak = document.createElement('br');
    cont_stat_form.appendChild(linebreak);

    var cont_stat_inputtextarea = document.createElement("TEXTAREA");
    cont_stat_inputtextarea.style.cssText = "width: 340px";
    cont_stat_inputtextarea.id = "cont_stat_inputtextarea";
    var txt = "";
    if(zero_wind_value_arry.length > 0 && zero_wind_value_arry.toString().trim().length > 0){
        var len = zero_wind_value_arry.length;
        for (var i = 0; i < len; i++) {
            txt += zero_wind_value_arry[i].toString().trim() + " \n ";
        }
        cont_stat_inputtextarea.value = txt;
    }else{
        cont_stat_inputtextarea.value = "xd=[]";
    }
    cont_stat_form.appendChild(cont_stat_inputtextarea);
    var linebreak = document.createElement('br');
    cont_stat_form.appendChild(linebreak);
    cont_stat_form.appendChild(linebreak);

    var cont_stat_submit_btn = document.createElement("button");
    cont_stat_submit_btn.innerHTML = "OK";
    cont_stat_submit_btn.type = "button";

    cont_stat_submit_btn.onclick = function() {
        var cont_stat_value = document.getElementById("cont_stat_inputtextarea").value;
        var value_array = cont_stat_value.split(/[\n]+/);
        var text_value = "";
        for (var i = 0; i < value_array.length; i++) {
            if(value_array[i].length != 0){
                text_value += value_array[i] +";";
            }
        }
        var textfrom_stat_func = text_value.toString().replace(/\s\s+/g,"");
        var check = textfrom_stat_func.includes("xd=");
        if(!check){
            alert("You did not define xd !");
            throw "incorrect";
        }
        var temp_zero_value_array = value_array;
        var zero_value_array = [];
        for (var i = 0; i < temp_zero_value_array.length; i++) {
            if(temp_zero_value_array[i].length != 0){
                zero_value_array.push(temp_zero_value_array[i]);
            }
        }
        text_main_array[1] = zero_value_array;
        cont_stat_wind.destroy();
        //create_popup_for_needed_finish(x0, z0, rpar_size, defaultProperties, graph, text_main_array);
    }

    var cont_stat_reset_btn = document.createElement("button");
    cont_stat_reset_btn.innerHTML = "Cancel";
    cont_stat_reset_btn.type = "button";
    cont_stat_reset_btn.onclick = function() {
        cont_stat_wind.destroy();
    }
    cont_stat_form.appendChild(cont_stat_reset_btn);
    cont_stat_form.style.cssText = "margin-left: 15px";
    cont_stat_submit_btn.style.cssText = "margin-left: 320px; margin-top: 20px; margin-bottom: 5px";
    cont_stat_reset_btn.style.cssText = "float: right; margin-top: 20px; margin-right: 15px; margin-bottom: 5px";
    cont_stat_div.style.cssText = "border: 1px solid black";
    cont_stat_form.appendChild(cont_stat_submit_btn);
    cont_stat_div.appendChild(cont_stat_form);
    height = 135 + 26 * defaultProperties.length + 15;
    var cont_stat_wind = showModalWindow(graph, 'Properties', cont_stat_div, 450, height);
}

/* No flag */

function create_popup_for_event_time(no, ni, nci, nco, xx_size, z_size, rpar_size, defaultProperties, graph, text_main_array){
    var second_wind_value_arry = text_main_array[2];
    var event_time_div = document.createElement("div");
    var event_time_form = document.createElement("form");
    var linebreak = document.createElement('br');
    event_time_form.appendChild(linebreak);

    var event_time_label1 = document.createElement("label");
    event_time_label1.innerHTML = "You may define:";
    init_form.appendChild(event_time_label1);
    var linebreak = document.createElement('br');
    event_time_form.appendChild(linebreak);

    var event_time_label2 = document.createElement("label");
    var labeltxt = "";
    var variable_name = "";
    if(xx_size > 0 || z_size > 0 || ni > 0 || rpar_size > 0){
        variable_name = "at event time, as functions of ";
        if(xx_size > 0){
            labeltxt += "-new continuous state x (size:"+xx_size+")<br>";
            variable_name += "x,"
        }
        if(z_size > 0){
            labeltxt += "-new discrete state z (size:"+z_size+")<br>";
            variable_name += "z,"
        }
        if(ni > 0){
            var u_text = "";
            for(var i = 1; i <= ni; i++){
                u_text += "u"+i+",";
            }
            variable_name += u_text;
        }
        if(rpar_size > 0){
            variable_name += "rpar,"
        }
    }else{
        labeltxt = "at event time, as functions of";
    }
    event_time_label2.innerHTML = labeltxt + variable_name;
    event_time_form.appendChild(event_time_label2);
    var linebreak = document.createElement('br');
    event_time_form.appendChild(linebreak);

    var event_time_inputtextarea = document.createElement("TEXTAREA");
    event_time_inputtextarea.style.cssText = "width: 340px";
    event_time_inputtextarea.id = "event_time_inputtextarea";
    event_time_form.appendChild(event_time_inputtextarea);
    var txt = "";
    if(second_wind_value_arry.length > 0 && second_wind_value_arry.toString().trim().length > 0){
        var len = second_wind_value_arry.length;
        for (var i = 0; i < len; i++) {
            txt += second_wind_value_arry[i].toString().trim() + " \n ";
        }
        event_time_inputtextarea.value = txt;
    }else{
        event_time_inputtextarea.value = "";
    }
    var linebreak = document.createElement('br');
    event_time_form.appendChild(linebreak);
    event_time_form.appendChild(linebreak);

    var event_time_submit_btn = document.createElement("button");
    event_time_submit_btn.innerHTML = "OK";
    event_time_submit_btn.type = "button";

    event_time_submit_btn.onclick = function() {
        var event_time_value = document.getElementById("event_time_inputtextarea").value;
        var temp_second_value_array = event_time_value.split(/[\n]+/);
        var second_value_array = [];
        for (var i = 0; i < temp_second_value_array.length; i++) {
            if(temp_second_value_array[i].length != 0){
                second_value_array.push(temp_second_value_array[i]);
            }
        }
        text_main_array[2] = second_value_array;
        event_time_wind.destroy();
        create_popup_for_needed_finish(no, ni, nci, nco, xx_size, z_size, rpar_size, defaultProperties, graph, text_main_array);
    }

    var event_time_reset_btn = document.createElement("button");
    event_time_reset_btn.innerHTML = 'Cancel';
    event_time_reset_btn.type = "button";
    event_time_reset_btn.onclick = function() {
        event_time_wind.destroy();
    }
    event_time_form.appendChild(event_time_reset_btn);
    event_time_form.style.cssText = "margin-left: 15px";
    event_time_submit_btn.style.cssText = "margin-left: 320px; margin-top: 20px; margin-bottom: 5px";
    event_time_reset_btn.style.cssText = "float: right; margin-top: 20px; margin-right: 15px; margin-bottom: 5px";
    event_time_div.style.cssText = "border: 1px solid black";
    event_time_form.appendChild(event_time_submit_btn);
    event_time_div.appendChild(init_form);
    height = 135 + 26 * defaultProperties.length + 15;
    var event_time_wind = showModalWindow(graph, 'Properties', event_time_div, 450, height);
}

/* flag 3 */

function create_popup_for_time_events_t_evo (no, ni, nci, nco, xx_size, z_size, rpar_size, graph, cell, text_main_array) {
    var third_wind_value_arry = text_main_array[3];
    var defaultProperties = cell.blockInstance.instance.get();
    var events_t_evo_div = document.createElement("div");
    var events_t_evo_form = document.createElement("form");
    var linebreak = document.createElement('br');
    events_t_evo_form.appendChild(linebreak);

    var events_t_evo_label2 = document.createElement("label");
    var labeltxt = "Using t,";
    if(ni > 0 || xx_size > 0 || z_size > 0 || rpar_size > 0){
        if(xx_size > 0){
            labeltxt += "x,"
        }
        if(z_size > 0){
            labeltxt += "z,"
        }
        if(ni > 0){
            var u_text = "";
            for(var i = 1; i <= ni; i++){
                u_text += "u"+i+",";
            }
            labeltxt += u_text;
        }
        labeltxt += "n_evi,";
        if(rpar_size > 0){
            labeltxt += "rpar,"
        }
        labeltxt += "you may set <br>vector of output time events t_evo (size:" +nco+")<br>at event time.";
    }else{
        labeltxt += "n_evi,";
        labeltxt += "you may set <br>vector of output time events t_evo (size:" +nco+")<br>at event time.";
    }
    events_t_evo_label2.innerHTML = labeltxt;
    events_t_evo_form.appendChild(events_t_evo_label2);
    var linebreak = document.createElement('br');
    events_t_evo_form.appendChild(linebreak);

    var events_t_evo_inputtextarea = document.createElement("TEXTAREA");
    events_t_evo_inputtextarea.style.cssText = "width: 340px";
    events_t_evo_inputtextarea.id = "events_t_evo_inputtextarea";
    var txt = "";
    if(third_wind_value_arry.length > 0 && third_wind_value_arry.toString().trim().length > 0){
        var len = third_wind_value_arry.length;
        for (var i = 0; i < len; i++) {
            txt += third_wind_value_arry[i].toString().trim() + " \n ";
        }
        events_t_evo_inputtextarea.value = txt;
    }else{
        events_t_evo_inputtextarea.value = "";
    }
    events_t_evo_form.appendChild(events_t_evo_inputtextarea);
    var linebreak = document.createElement('br');
    events_t_evo_form.appendChild(linebreak);
    events_t_evo_form.appendChild(linebreak);

    var events_t_evo_submit_btn = document.createElement("button");
    events_t_evo_submit_btn.innerHTML = "OK";
    events_t_evo_submit_btn.type = "button";

    events_t_evo_submit_btn.onclick = function() {
        var events_t_evo_value = document.getElementById("events_t_evo_inputtextarea").value;
        var temp_third_value_array = events_t_evo_value.split(/[\n]+/);
        var third_value_array = [];
        for (var i = 0; i < temp_third_value_array.length; i++) {
            if(temp_third_value_array[i].length != 0){
                third_value_array.push(temp_third_value_array[i]);
            }
        }
        text_main_array[3] = third_value_array;
        events_t_evo_wind.destroy();
    }

    var events_t_evo_reset_btn = document.createElement("button");
    events_t_evo_reset_btn.innerHTML = 'Cancel';
    events_t_evo_reset_btn.type = "button";
    events_t_evo_reset_btn.onclick = function() {
        events_t_evo_wind.destroy();
    }
    events_t_evo_form.appendChild(events_t_evo_reset_btn);
    events_t_evo_form.style.cssText = "margin-left: 15px";
    events_t_evo_submit_btn.style.cssText = "margin-left: 320px; margin-top: 20px; margin-bottom: 5px";
    events_t_evo_reset_btn.style.cssText = "float: right; margin-top: 20px; margin-right: 15px; margin-bottom: 5px";
    events_t_evo_div.style.cssText = "border: 1px solid black";
    events_t_evo_form.appendChild(events_t_evo_submit_btn);
    events_t_evo_div.appendChild(events_t_evo_form);
    height = 135 + 26 * defaultProperties.length + 15;
    var events_t_evo_wind = showModalWindow(graph, 'Properties', events_t_evo_div, 450, height);

}

/* flag 4 */

function create_popup_for_initialization(no, ni, nci, nco, xx_size, z_size, rpar_size, defaultProperties,cell, graph, text_main_array, update_propertiesObject, in_1_arry, out_1_arry, clkin, clkout){

    var fourth_wind_value_arry = text_main_array[4];
    var init_div = document.createElement("div");
    var init_form = document.createElement("form");
    var linebreak = document.createElement('br');
    init_form.appendChild(linebreak);

    var init_label1 = document.createElement("label");
    init_label1.innerHTML = "You may do whatever needed for initialization: <br> File or graphic opening..,";
    init_form.appendChild(init_label1);
    var linebreak = document.createElement('br');
    init_form.appendChild(linebreak);

    var init_label2 = document.createElement("label");
    var labeltxt = "";
    var variable_name = "";
    if(xx_size > 0 || z_size > 0 || rpar_size > 0){
        variable_name = "as function(s) of ";
        labeltxt = "You may also reinitialize: <br>";
        if(xx_size > 0){
            labeltxt += "- continuous state x (size:"+xx_size+")<br>";
            variable_name += "x,"
        }
        if(z_size > 0){
            labeltxt += "- discrete state z (size:"+z_size+")<br>";
            variable_name += "z,"
        }
        if(rpar_size > 0){
            variable_name += "rpar,"
        }
    }else{
        labeltxt = "as function(s) of";
    }
    init_label2.innerHTML = labeltxt + variable_name;
    init_form.appendChild(init_label2);
    var linebreak = document.createElement('br');
    init_form.appendChild(linebreak);

    var init_inputtextarea = document.createElement("TEXTAREA");
    init_inputtextarea.style.cssText = "width: 340px";
    init_inputtextarea.id = "init_inputtextarea";
    var txt = "";
    if(fourth_wind_value_arry.length > 0 && fourth_wind_value_arry.toString().trim().length > 0){
        var len = fourth_wind_value_arry.length;
        for (var i = 0; i < len; i++) {
            txt += fourth_wind_value_arry[i].toString().trim() + " \n ";
        }
        init_inputtextarea.value = txt;
    }else{
        init_inputtextarea.value = "";
    }
    init_form.appendChild(init_inputtextarea);
    var linebreak = document.createElement('br');
    init_form.appendChild(linebreak);
    init_form.appendChild(linebreak);

    var init_submit_btn = document.createElement("button");
    init_submit_btn.innerHTML = "OK";
    init_submit_btn.type = "button";

    init_submit_btn.onclick = function() {
        var init_value = document.getElementById("init_inputtextarea").value;
        var temp_fourth_value_array = init_value.split(/[\n]+/);
        var fourth_value_array = [];
        for (var i = 0; i < temp_fourth_value_array.length; i++) {
            if(temp_fourth_value_array[i].length != 0){
                fourth_value_array.push(temp_fourth_value_array[i]);
            }
        }
        text_main_array[4] = fourth_value_array;
        init_wind.destroy();
        create_popup_for_needed_finish( no, ni, nci, nco, xx_size, z_size, rpar_size, defaultProperties,cell, graph, text_main_array, update_propertiesObject, in_1_arry, out_1_arry, clkin, clkout);
    }

    var init_reset_btn = document.createElement("button");
    init_reset_btn.innerHTML = 'Cancel';
    init_reset_btn.type = "button";
    init_reset_btn.onclick = function() {
        init_wind.destroy();
    }
    init_form.appendChild(init_reset_btn);
    init_form.style.cssText = "margin-left: 15px";
    init_submit_btn.style.cssText = "margin-left: 320px; margin-top: 20px; margin-bottom: 5px";
    init_reset_btn.style.cssText = "float: right; margin-top: 20px; margin-right: 15px; margin-bottom: 5px";
    init_div.style.cssText = "border: 1px solid black";
    init_form.appendChild(init_submit_btn);
    init_div.appendChild(init_form);
    height = 135 + 26 * defaultProperties.length + 15;
    var init_wind = showModalWindow(graph, 'Properties', init_div, 450, height);

}

/* flag 5 */

function create_popup_for_needed_finish(no, ni, nci, nco, xx_size, z_size, rpar_size, defaultProperties,cell, graph, text_main_array, update_propertiesObject, in_1_arry, out_1_arry, clkin, clkout){

    var fifth_wind_value_arry = text_main_array[5];
    var need_finish_div = document.createElement("div");
    var need_finish_form = document.createElement("form");
    var linebreak = document.createElement('br');
    need_finish_form.appendChild(linebreak);

    var need_finish_label1 = document.createElement("label");
    need_finish_label1.innerHTML = "You may do whatever needed to finish : <br> File or graphic closing...,";
    need_finish_form.appendChild(need_finish_label1);
    var linebreak = document.createElement('br');
    need_finish_form.appendChild(linebreak);

    var need_finish_label2 = document.createElement("label");
    var labeltxt = "";
    var variable_name = "";
    if(xx_size > 0 || z_size > 0 || rpar_size > 0 ){
        variable_name = "as function(s) of ";
        labeltxt = "You may also change final value of: <br>";
        if(xx_size > 0){
            labeltxt += "- continuous state x (size:"+xx_size+")<br>";
            variable_name += "x,"
        }
        if(z_size > 0){
            labeltxt += "- discrete state z (size:"+z_size+")<br>";
            variable_name += "z,"
        }
        if(rpar_size > 0){
            variable_name += "rpar,"
        }
    }else{
        labeltxt = "as function(s) of";
    }
    need_finish_label2.innerHTML = labeltxt + variable_name;
    need_finish_form.appendChild(need_finish_label2);
    var linebreak = document.createElement('br');
    need_finish_form.appendChild(linebreak);

    var need_finish_inputtextarea = document.createElement("TEXTAREA");
    need_finish_inputtextarea.style.cssText = "width: 340px";
    need_finish_inputtextarea.id = "need_finish_inputtextarea";
    var txt = "";
    if(fifth_wind_value_arry.length > 0 && fifth_wind_value_arry.toString().trim().length > 0 ){
        var len = fifth_wind_value_arry.length;
        for (var i = 0; i < len; i++) {
            txt += fifth_wind_value_arry[i].toString().trim() + " \n ";
        }
        need_finish_inputtextarea.value = txt;
    }else{
        need_finish_inputtextarea.value = "";
    }
    need_finish_form.appendChild(need_finish_inputtextarea);
    var linebreak = document.createElement('br');
    need_finish_form.appendChild(linebreak);
    need_finish_form.appendChild(linebreak);

    var need_finish_submit_btn = document.createElement("button");
    need_finish_submit_btn.innerHTML = "OK";
    need_finish_submit_btn.type = "button";

    need_finish_submit_btn.onclick = function() {
        var need_finish_value = document.getElementById("need_finish_inputtextarea").value;
        var temp_fifth_value_array = need_finish_value.split(/[\n]+/);
        var fifth_value_array = [];
        for (var i = 0; i < temp_fifth_value_array.length; i++) {
            if(temp_fifth_value_array[i].length != 0){
                fifth_value_array.push(temp_fifth_value_array[i]);
            }
        }
        text_main_array[5] = fifth_value_array;
        create_popup_for_func_imposing_contraints(no, ni, nci, nco, xx_size, z_size, rpar_size, defaultProperties,cell, graph, text_main_array,update_propertiesObject, in_1_arry, out_1_arry, clkin, clkout);
        need_finish_wind.destroy();
    }

    var need_finish_reset_btn = document.createElement("button");
    need_finish_reset_btn.innerHTML = "Cancel";
    need_finish_reset_btn.type = "button";
    need_finish_reset_btn.onclick = function() {
        need_finish_wind.destroy();
    }
    need_finish_form.appendChild(need_finish_reset_btn);
    need_finish_form.style.cssText = "margin-left: 15px";
    need_finish_submit_btn.style.cssText = "margin-left: 320px; margin-top: 20px; margin-bottom: 5px";
    need_finish_reset_btn.style.cssText = "float: right; margin-top: 20px; margin-right: 15px; margin-bottom: 5px";
    need_finish_div.style.cssText = "border: 1px solid black";
    need_finish_form.appendChild(need_finish_submit_btn);
    need_finish_div.appendChild(need_finish_form);
    height = 135 + 26 * defaultProperties.length + 15;
    var need_finish_wind = showModalWindow(graph, 'Properties', need_finish_div, 450, height);

}

/* Flag 6 */

function create_popup_for_func_imposing_contraints(no, ni, nci, nco, xx_size, z_size, rpar_size, defaultProperties,cell, graph, text_main_array,update_propertiesObject, in_1_arry, out_1_arry, clkin, clkout) {

    var sixth_wind_value_arry = text_main_array[6];
    var func_imposing_div = document.createElement("div");
    var func_imposing_form = document.createElement("form");
    var linebreak = document.createElement('br');
    func_imposing_form.appendChild(linebreak);

    var func_imposing_label1 = document.createElement("label");
    func_imposing_label1.innerHTML = "You may define here functions imposing contraints <br> on initial inputs, states and outputs" +
    "Note: these functions may be called more than once <br>";
    func_imposing_form.appendChild(func_imposing_label1);
    var linebreak = document.createElement('br');
    func_imposing_form.appendChild(linebreak);

    var func_imposing_label2 = document.createElement("label");
    var labeltxt = "Enter Scilab instructions defining: <br>";
    var variable_name = "";
    var value_for_textarea = "";
    if(no > 0 || xx_size > 0 || z_size > 0 || rpar_size > 0){
        variable_name = "as function(s) of ";
        if(xx_size > 0){
            labeltxt += "- state x (size:"+xx_size+")<br>";
            variable_name += "x,"
        }
        if(z_size > 0){
            labeltxt += "- state z (size:"+z_size+")<br>";
            variable_name += "z,"
        }
        if(no > 0){
            var y_text = "";
            for(var i = 1; i <= no; i++){
                y_text += "- output y"+i+" (size : 1) <br>";
                value_for_textarea += "y"+i+"=[] \n";
            }
            labeltxt += y_text;
        }
        if(ni > 0){
            for(var i = 1; i <= ni; i++){
                variable_name += "u"+i+",";
            }
        }
        if(rpar_size > 0){
            variable_name += "rpar,"
        }
    }else{
        labeltxt = "as function(s) of";
    }
    func_imposing_label2.innerHTML = labeltxt + variable_name;
    func_imposing_form.appendChild(func_imposing_label2);
    var linebreak = document.createElement('br');
    func_imposing_form.appendChild(linebreak);

    var func_imposing_inputtextarea = document.createElement("TEXTAREA");
    func_imposing_inputtextarea.style.cssText = "width: 340px";
    func_imposing_inputtextarea.id = "func_imposing_inputtextarea";
    var txt = "";
    if(sixth_wind_value_arry.length > 0 && sixth_wind_value_arry.toString().trim().length > 0){
        var len = sixth_wind_value_arry.length;
        for (var i = 0; i < len; i++) {
            txt += sixth_wind_value_arry[i].toString().trim() + " \n ";
        }
        func_imposing_inputtextarea.value = txt;
    }else{
        func_imposing_inputtextarea.value = value_for_textarea;
    }
    func_imposing_form.appendChild(func_imposing_inputtextarea);
    var linebreak = document.createElement('br');
    func_imposing_form.appendChild(linebreak);
    func_imposing_form.appendChild(linebreak);

    var func_imposing_submit_btn = document.createElement("button");
    func_imposing_submit_btn.innerHTML = "OK";
    func_imposing_submit_btn.type = "button";

    func_imposing_submit_btn.onclick = function() {
        var func_imposing_value = document.getElementById("func_imposing_inputtextarea").value;
        var temp_sixth_value_array = func_imposing_value.split(/[\n]+/);
        var sixth_value_array = [];
        for (var i = 0; i < temp_sixth_value_array.length; i++) {
            if(temp_sixth_value_array[i].length != 0){
                sixth_value_array.push(temp_sixth_value_array[i]);
            }
        }
        text_main_array[6] = sixth_value_array;
        update_cell_object(graph, cell, text_main_array, update_propertiesObject, in_1_arry, out_1_arry, clkin, clkout);
        func_imposing_wind.destroy();
    }

    var func_imposing_reset_btn = document.createElement("button");
    func_imposing_reset_btn.innerHTML = "Cancel";
    func_imposing_reset_btn.type = "button";
    func_imposing_reset_btn.onclick = function() {
        func_imposing_wind.destroy();
    }
    func_imposing_form.appendChild(func_imposing_reset_btn);
    func_imposing_form.style.cssText = "margin-left: 15px";
    func_imposing_submit_btn.style.cssText = "margin-left: 320px; margin-top: 20px; margin-bottom: 5px";
    func_imposing_reset_btn.style.cssText = "float: right; margin-top: 20px; margin-right: 15px; margin-bottom: 5px";
    func_imposing_div.style.cssText = "border: 1px solid black";
    func_imposing_form.appendChild(func_imposing_submit_btn);
    func_imposing_div.appendChild(func_imposing_form);
    height = 135 + 26 * defaultProperties.length + 15;
    var func_imposing_wind = showModalWindow(graph, 'Properties', func_imposing_div, 450, height);

}

function create_scifunc_popups(graph,cell,name,diagRoot) {

    /* This is the code for getting parameters after double click on block */

    create_popup1();

    function create_popup1() {
        var defaultProperties = cell.blockInstance.instance.get();
        var popup1div = document.createElement("div");
        popup1div.id = "sci_div"

        var popup1head = document.createElement("h2");
        popup1head.id = "headp1";
        popup1head.innerHTML = "Set Scope Parameters";
        popup1div.appendChild(popup1head);

        var popup1form = document.createElement("form");
        popup1form.id = "popup1form";
        var linebreak = document.createElement('br');
        popup1form.appendChild(linebreak);

        for (var key in defaultProperties) {
            if (defaultProperties.hasOwnProperty(key)) {
                /* creating labels and inputs for popup1 */
                // Input Title
                var fieldName = defaultProperties[key];
                var namelabel = document.createElement('label');
                namelabel.innerHTML = defaultProperties[key][0];
                popup1form.appendChild(namelabel);

                // Input
                var input = document.createElement("input");
                input.name = key;
                input.value = defaultProperties[key][1];
                input.setAttribute("id", key.toString());
                input.setAttribute("class", "fieldInput");
                input.style.cssText = "margin-right: 15px";
                popup1form.appendChild(input);

                // Line break
                var linebreak = document.createElement('br');
                popup1form.appendChild(linebreak);

                // Line break
                var linebreak = document.createElement('br');
                popup1form.appendChild(linebreak);
            }
        }

        var popup1submit_btn = document.createElement("button");
        popup1submit_btn.innerHTML = 'OK';
        popup1submit_btn.type = "button";
        popup1submit_btn.name = "submit";

        popup1submit_btn.onclick = function() {
            var propertiesObject = {
                id: cell.id
            };
            var in1 = '', out = '', clkin = '', clkout = '', x0 = '', z0 = '', rpar = '', auto = '', it = '';
            for (var key in defaultProperties) {
                if (defaultProperties.hasOwnProperty(key)) {
                    propertiesObject[key] = document.getElementById(key.toString()).value;
                    if (key.toString() == "i") {
                        in1 = inverse(document.getElementById(key.toString()).value);
                        for(var i = 0; i < in1.length; i++){
                            if(i == 0){
                                if(in1[i].length == 1 || in1[i].length > 2){
                                    alert("Answer given for input ports sizes \nhas invalid dimension:\nwaiting for dimension -1 x 2.");
                                    throw "incorrect";
                                }
                            }else{
                                if(in1[i].length == 1 || in1[i].length > 2){
                                    alert("Answer given for input ports sizes \nis incorrect: Inconsistent row/column dimensions");
                                    throw "incorrect";
                                }
                            }
                        }
                    } else if (key.toString() == "o") {
                        out = inverse(document.getElementById(key.toString()).value);
                        for(var i = 0; i < out.length; i++){
                            if(i == 0){
                                if(out[i].length == 1 || out[i].length > 2){
                                    alert("Answer given for output ports sizes \nhas invalid dimension:\nwaiting for dimension -2 x 2");
                                    throw "incorrect";
                                }
                            }else{
                                if(out[i].length == 1 || out[i].length > 2){
                                    alert("Answer given for output ports sizes \nis incorrect: Inconsistent row/column dimensions");
                                    throw "incorrect";
                                }
                            }
                        }
                    } else if (key.toString() == "ci") {
                        clkin = inverse(document.getElementById(key.toString()).value);
                    } else if (key.toString() == "co") {
                        clkout = inverse(document.getElementById(key.toString()).value);
                    } else if (key.toString() == "xx") {
                        x0 = inverse(document.getElementById(key.toString()).value);
                    } else if (key.toString() == "z") {
                        z0 = inverse(document.getElementById(key.toString()).value);
                    } else if (key.toString() == "rpar") {
                        rpar = inverse(document.getElementById(key.toString()).value);
                    } else if (key.toString() == "auto0") {
                        auto = inverse(document.getElementById(key.toString()).value);
                    } else if (key.toString() == "deptime") {
                        it = document.getElementById(key.toString()).value;
                    }
                }
            }
            wind1.destroy();
            /*
             * calling appropriate popup depending on the different inputs
             * given in popup1
             */
            if (out[0].length != 0) {
                create_popup2(in1,out,clkin,clkout,x0,z0,propertiesObject,defaultProperties);
            } else if (!x0 == "") {
                create_popup3(out,clkin,clkout,x0,z0,propertiesObject,defaultProperties);
            } else if (!z0 == "") {
                create_popup4(out,clkin,clkout,x0,z0,propertiesObject,defaultProperties);
            } else if (!clkin == "" && !clkout == "") {
                create_popup5(out,clkin,clkout,x0,z0,propertiesObject,defaultProperties);
            } else {
                create_popup6(out,clkin,clkout,x0,z0,propertiesObject,defaultProperties);
            }
        }

        var popup1reset_btn = document.createElement("button");
        popup1reset_btn.innerHTML = 'Cancel';
        popup1reset_btn.type = "button";
        popup1reset_btn.name = "submit";
        popup1reset_btn.id = "resetButtonProperties1";
        popup1reset_btn.onclick = function() {
            // Reset
            for (var key in defaultProperties) {
                if (defaultProperties.hasOwnProperty(key)) {
                    var element = document.getElementById(key.toString());
                    element.value = defaultProperties[key][1];
                }
            }
            wind1.destroy();
        };

        popup1form.appendChild(popup1reset_btn);
        popup1head.style.cssText = "margin-left: 15px";
        popup1form.style.cssText = "margin-left: 15px";
        popup1reset_btn.style.cssText = "margin-top: 20px; margin-right: 15px; float: right;margin-bottom: 5px";
        popup1submit_btn.style.cssText = "margin-left: 320px; margin-top: 20px; margin-bottom: 5px";
        popup1div.style.cssText = "border: 1px solid black";
        popup1form.appendChild(popup1submit_btn);
        popup1div.appendChild(popup1form);

        height = 135 + 26 * defaultProperties.length + 15;
        var wind1 = showModalWindow(graph, 'Properties', popup1div, 450, height);
    }

    function create_popup2(in1,out,clkin,clkout,x0,z0,propertiesObject,defaultProperties) {
        var popup2div = document.createElement("div");
        popup2div.id = "def_fun"

        var popup2head = document.createElement("h2");
        popup2head.id = "headp2";
        popup2head.innerHTML = "Define the function which computes the output";
        popup2div.appendChild(popup2head);

        var popup2form = document.createElement("form");
        popup2form.id = "popup2form";
        var linebreak = document.createElement('br');
        popup2form.appendChild(linebreak);

        var popup2label = document.createElement("label");
        popup2label.innerHTML = "Enter scilab instruction defining";
        popup2form.appendChild(popup2label);
        var linebreak = document.createElement("br");
        popup2form.appendChild(linebreak);
        var array_for_y_value = [];
        for (var i = 0; i < out.length; i++) {
            /*
             * creating labels dynamically in popup2 depending on the no.
             * of outport ports in popup1
             */
            var popuplabel_1 = document.createElement("label");
            popup2form.appendChild(popuplabel_1);
            var linebreak = document.createElement("br");
            popup2form.appendChild(linebreak);
            var label_with_index = "y"+(i + 1);
            array_for_y_value[i] = label_with_index;
            popuplabel_1.innerHTML = label_with_index+" (size: 1)";
        }

        var popup2label_2 = document.createElement("label");
        /* for input port values ie 'u'  */
        var u_text = ""
        for(var i = 1; i <= in1.length; i++){
            u_text += "u"+i+",";
        }
        popup2label_2.innerHTML =  "as a function of t,"+u_text+"n_evi";
        popup2form.appendChild(popup2label_2);
        var linebreak = document.createElement("br");
        popup2form.appendChild(linebreak);
        var popupinputtextarea = document.createElement("TEXTAREA");
        popupinputtextarea.style.cssText = "width: 340px";
        popupinputtextarea.value = "y1 = sin(u1)";
        popupinputtextarea.id = "p2inputtextarea";
        popup2form.appendChild(popupinputtextarea);
        popup2form.appendChild(linebreak);
        popup2form.appendChild(linebreak);

        var popup2submit_btn = document.createElement("button");
        popup2submit_btn.innerHTML = "OK";
        popup2submit_btn.type = "button";
        popup2submit_btn.onclick = function() {
            var popup2value = document.getElementById("p2inputtextarea").value;
            var value_array = popup2value.split(/[,;\n]+/);
            var filterarray = []; //store proper value
            var j = 0;
            for(var i = 0; i < value_array.length; i++){
                if(value_array[i].length != 0){
                    filterarray[j] = value_array[i];
                }
                j++;
            }
            for(var i = 0; i < array_for_y_value.length; i++){
                var textfrompopup2 = filterarray.toString().replace(/\s\s+/g,"");
                var check = textfrompopup2.includes(array_for_y_value[i]);
                if(!check){
                    alert("You did not define "+ array_for_y_value[i] +" (size: 1) !");
                    throw "incorrect";
                }
            }
            propertiesObject["popup2value"] = filterarray;
            wind2.destroy();
            /* calling appropriate popup depending on the conditions */
            if (!x0 == "") {
                create_popup3(out,clkin,clkout,x0,z0,propertiesObject,defaultProperties);
            } else if (!z0 == "") {
                create_popup4(out,clkin,clkout,x0,z0,propertiesObject,defaultProperties);
            } else if (!clkin == "" && !clkout == "") {
                create_popup5(out,clkin,clkout,x0,z0,propertiesObject,defaultProperties);
            } else {
                create_popup6(out,clkin,clkout,x0,z0,propertiesObject,defaultProperties);
            }
        }
        var popup2reset_btn = document.createElement("button");
        popup2reset_btn.innerHTML = 'Cancel';
        popup2reset_btn.type = "button";
        popup2reset_btn.name = "submit";
        popup2reset_btn.id = "resetButtonProperties2";
        popup2reset_btn.onclick = function() {
            wind2.destroy();
        }
        popup2form.appendChild(popup2reset_btn);
        popup2head.style.cssText = "margin-left: 15px";
        popup2form.style.cssText = "margin-left: 15px";
        popup2submit_btn.style.cssText = "margin-left: 320px; margin-top: 20px; margin-bottom: 5px";
        popup2reset_btn.style.cssText = "float: right; margin-top: 20px; margin-right: 15px; margin-bottom: 5px";
        popup2div.style.cssText = "border: 1px solid black";
        popup2form.appendChild(popup2submit_btn);
        popup2div.appendChild(popup2form);

        height = 135 + 26 * defaultProperties.length + 15;
        var wind2 = showModalWindow(graph, 'Properties', popup2div, 450, height);
    }

    function create_popup3(out,clkin,clkout,x0,z0,propertiesObject,defaultProperties) {
        var popup3div = document.createElement("div");
        popup3div.id = "continuous"

        var popup3form = document.createElement("form");
        popup3form.id = "popup3form";
        var linebreak = document.createElement('br');
        popup3form.appendChild(linebreak);

        var popup3label1 = document.createElement("label");
        popup3label1.innerHTML = "Define continuous states evolution";
        popup3form.appendChild(popup3label1);
        var linebreak = document.createElement("br");
        popup3form.appendChild(linebreak);
        var linebreak = document.createElement("br");
        popup3form.appendChild(linebreak);
        var popup3label2 = document.createElement("label");
        popup3label2.innerHTML = "Enter Scilab instructions defining:";
        popup3form.appendChild(popup3label2);
        var linebreak = document.createElement("br");
        popup3form.appendChild(linebreak);
        var popup3label3 = document.createElement("label");
        popup3label3.innerHTML = "derivative of continuous state xd(size:1) as function(s) of t,x,z,u1";
        popup3form.appendChild(popup3label3);

        var linebreak = document.createElement("br");
        popup3form.appendChild(linebreak);
        var popup3input = document.createElement("input");
        popup3input.id = "p3input";
        popup3input.style.cssText = "width: 340px";
        popup3form.appendChild(popup3input);
        popup3form.appendChild(linebreak);

        var popup3submit_btn = document.createElement("button");
        popup3submit_btn.innerHTML = "Submit";
        popup3submit_btn.type = "button";

        popup3submit_btn.onclick = function() {
            var popup3value = document.getElementById("p3input").value;
            if (popup3value == "xd =" || popup3value == "xd=" || popup3value == "xd= " || popup3value == "xd = " || popup3value == "") {
                alert("You did not define xd");
                return false;
            }
            propertiesObject["popup3value"] = popup3value;
            wind3.destroy();
            /* calling appropriate popup depending on conditions */
            if (!z0=="") {
                create_popup4(out,clkin,clkout,x0,z0,propertiesObject,defaultProperties);
            } else if (!clkin=="" && !clkout=="") {
                create_popup5(out,clkin,clkout,x0,z0,propertiesObject,defaultProperties);
            } else {
                create_popup6(out,clkin,clkout,x0,z0,propertiesObject,defaultProperties);
            }
        }
        var popup3reset_btn = document.createElement("button");
        popup3reset_btn.innerHTML = 'Reset';
        popup3reset_btn.type = "button";
        popup3reset_btn.name = "submit";
        popup3reset_btn.id = "resetButtonProperties3";
        popup3reset_btn.onclick = function() {
            document.getElementById("p3input").value = "";
        }
        popup3form.appendChild(popup3reset_btn);
        popup3form.style.cssText = "margin-left: 15px";
        popup3submit_btn.style.cssText = "margin-top: 20px";
        popup3reset_btn.style.cssText = "float: right; margin-top: 20px; margin-right: 15px";
        popup3div.style.cssText = "border: 1px solid black";
        popup3form.appendChild(popup3submit_btn);
        popup3div.appendChild(popup3form);

        height = 135 + 26 * defaultProperties.length + 15;
        var wind3 = showModalWindow(graph, 'Properties', popup3div, 450, height);
    }

    function create_popup4(out,clkin,clkout,x0,z0,propertiesObject,defaultProperties) {
        var popup4div = document.createElement("div");
        popup4div.id = "discrete"

        var popup4form = document.createElement("form");
        popup4form.id = "popup4form";
        var linebreak = document.createElement('br');
        popup4form.appendChild(linebreak);

        var popup4label1 = document.createElement("label");
        popup4label1.innerHTML = "You may define:";
        popup4form.appendChild(popup4label1);
        var linebreak = document.createElement("br");
        popup4form.appendChild(linebreak);

        if (!x0=="") {
            var popup4label2 = document.createElement("label");
            popup4label2.innerHTML = "-new continuous state x(size:1)";
            popup4form.appendChild(popup4label2);
            var linebreak = document.createElement("br");
            popup4form.appendChild(linebreak);
        }

        var popup4label3 = document.createElement("label");
        popup4label3.innerHTML = "-new discrete state z(size:1)";
        popup4form.appendChild(popup4label3);
        var linebreak = document.createElement("br");
        popup4form.appendChild(linebreak);
        var popup4label4 = document.createElement("label");
        popup4label4.innerHTML = "at event time, as functions of t,x,z,u1,n_evi,";
        popup4form.appendChild(popup4label4);
        var linebreak = document.createElement("br");
        popup4form.appendChild(linebreak);

        var popup4input1 = document.createElement("input");
        popup4input1.id = "p4input1";
        popup4input1.style.cssText = "width: 410px";
        popup4form.appendChild(popup4input1);
        popup4form.appendChild(linebreak);
        var popup4input2 = document.createElement("input");
        popup4input2.id = "p4input2";
        popup4input2.style.cssText = "width: 410px";
        popup4form.appendChild(popup4input2);
        popup4form.appendChild(linebreak);

        var popup4submit_btn = document.createElement("button");
        popup4submit_btn.innerHTML = "Submit";
        popup4submit_btn.type = "button";

        popup4submit_btn.onclick = function() {
            var popup4value1 = document.getElementById("p4input1").value;
            var popup4value2 = document.getElementById("p4input2").value;
            var popup4value = [popup4value1, popup4value2];
            propertiesObject["popup4value"] = popup4value;
            wind4.destroy();
            /* calling appropriate popup depending on conditions */
            if (!clkin=="" && !clkout=="") {
                create_popup5(out,clkin,clkout,x0,z0,propertiesObject,defaultProperties);
            } else {
                create_popup6(out,clkin,clkout,x0,z0,propertiesObject,defaultProperties);
            }
        }

        var popup4reset_btn = document.createElement("button");
        popup4reset_btn.innerHTML = 'Reset';
        popup4reset_btn.type = "button";
        popup4reset_btn.name = "submit";
        popup4reset_btn.id = "resetButtonProperties4";
        popup4reset_btn.onclick = function() {
            document.getElementById("p4input").value = "";
        }
        popup4form.appendChild(popup4reset_btn);
        popup4form.style.cssText = "margin-left: 15px";
        popup4submit_btn.style.cssText = "margin-top: 20px";
        popup4reset_btn.style.cssText = "float: right; margin-top: 20px; margin-right: 15px";
        popup4div.style.cssText = "border: 1px solid black";
        popup4form.appendChild(popup4submit_btn);
        popup4div.appendChild(popup4form);

        height = 135 + 26 * defaultProperties.length + 15;
        var wind4 = showModalWindow(graph, 'Properties', popup4div, 450, height);
    }

    function create_popup5(out,clkin,clkout,x0,z0,propertiesObject,defaultProperties) {
        var popup5div = document.createElement("div");
        popup5div.id = "event"

        var popup5form = document.createElement("form");
        popup5form.id = "popup5form";
        var linebreak = document.createElement('br');
        popup5form.appendChild(linebreak);

        var popup5label = document.createElement("label");
        popup5label.innerHTML = "Using t,x,z,u1,n_evi, you may set vector of output time events t_evo(size:1) at event time";
        popup5form.appendChild(popup5label);
        var linebreak = document.createElement("br");
        popup5form.appendChild(linebreak);

        var popup5input1 = document.createElement("input");
        popup5input1.id = "p5input1";
        popup5input1.value = "y1=sin(u1)";
        popup5input1.style.cssText = "width: 410px";
        popup5form.appendChild(popup5input1);
        popup5form.appendChild(linebreak);
        var popup5input2 = document.createElement("input");
        popup5input2.id = "p5input2";
        popup5input2.value = "x = []";
        popup5input2.style.cssText = "width: 410px";
        popup5form.appendChild(popup5input2);
        popup5form.appendChild(linebreak);
        var popup5input3 = document.createElement("input");
        popup5input3.id = "p5input3";
        popup5input3.value = "z = []";
        popup5input3.style.cssText = "width: 410px";
        popup5form.appendChild(popup5input3);
        popup5form.appendChild(linebreak);
        var popup5input4 = document.createElement("input");
        popup5input4.id = "p5input4";
        popup5input4.value = "t_evo = []";
        popup5input4.style.cssText = "width: 410px";
        popup5form.appendChild(popup5input4);
        popup5form.appendChild(linebreak);

        var popup5submit_btn = document.createElement("button");
        popup5submit_btn.innerHTML = "Submit";
        popup5submit_btn.type = "button";

        popup5submit_btn.onclick = function() {
            var popup5value1 = document.getElementById("p5input1").value;
            var popup5value2 = document.getElementById("p5input2").value;
            var popup5value3 = document.getElementById("p5input3").value;
            var popup5value4 = document.getElementById("p5input4").value;
            var popup5value = [popup5value1, popup5value2, popup5value3, popup5value4];
            propertiesObject["popup5value"] = popup5value;
            wind5.destroy();
            /* calling popup6 because popup6, popup7 always open */
            create_popup6(out,clkin,clkout,x0,z0,propertiesObject,defaultProperties);
        }

        var popup5reset_btn = document.createElement("button");
        popup5reset_btn.innerHTML = 'Reset';
        popup5reset_btn.type = "button";
        popup5reset_btn.name = "submit";
        popup5reset_btn.id = "resetButtonProperties5";
        popup5reset_btn.onclick = function() {
            document.getElementById("p5input").value = "y1=sin(u1)";
        }
        popup5form.appendChild(popup5reset_btn);
        popup5form.style.cssText = "margin-left: 15px";
        popup5submit_btn.style.cssText = "margin-top: 20px";
        popup5reset_btn.style.cssText = "float: right; margin-top: 20px; margin-right: 15px";
        popup5div.style.cssText = "border: 1px solid black";
        popup5form.appendChild(popup5submit_btn);
        popup5div.appendChild(popup5form);

        height = 135 + 26 * defaultProperties.length + 15;
        var wind5 = showModalWindow(graph, 'Properties', popup5div, 450, height);
    }

    function create_popup6(out,clkin,clkout,x0,z0,propertiesObject,defaultProperties) {
        var popup6div = document.createElement("div");
        popup6div.id = "init_file"

        var popup6form = document.createElement("form");
        popup6form.id = "popup6form";
        var linebreak = document.createElement('br');
        popup6form.appendChild(linebreak);

        var popup6label1 = document.createElement("label");
        popup6label1.innerHTML = "You may do whatever needed for initialization: File or graphic opening..,";
        popup6form.appendChild(popup6label1);
        var linebreak = document.createElement("br");
        popup6form.appendChild(linebreak);
        if (!x0=="" && !z0=="") {
            var popup6label2 = document.createElement("label");
            popup6label2.innerHTML = "You may also reinitialize";
            popup6form.appendChild(popup6label2);
            var linebreak = document.createElement("br");
            popup6form.appendChild(linebreak);
        }
        if (!x0=="") {
            var popup6label3 = document.createElement("label");
            popup6label3.innerHTML = "-Continuous state x(size:1)";
            popup6form.appendChild(popup6label3);
            var linebreak = document.createElement("br");
            popup6form.appendChild(linebreak);
        }
        if (!z0=="") {
            var popup6label4 = document.createElement("label");
            popup6label4.innerHTML = "-discrete state z(size:1)";
            popup6form.appendChild(popup6label4);
            var linebreak = document.createElement("br");
            popup6form.appendChild(linebreak);
        }
        /*
         * creating different labels depending on the previous popups which
         * were opened
         */
        if (!x0=="" && !z0=="") {
            var popup6label5 = document.createElement("label");
            popup6label5.innerHTML = "as function(s) of x,z,";
            popup6form.appendChild(popup6label5);
            var linebreak = document.createElement("br");
            popup6form.appendChild(linebreak);
        } else if (!x0=="") {
            var popup6label6 = document.createElement("label");
            popup6label6.innerHTML = "as function(s) of x,";
            popup6form.appendChild(popup6label6);
            var linebreak = document.createElement("br");
            popup6form.appendChild(linebreak);
        } else if (!z0=="") {
            var popup6label7 = document.createElement("label");
            popup6label7.innerHTML = "as function(s) of z,";
            popup6form.appendChild(popup6label7);
            var linebreak = document.createElement("br");
            popup6form.appendChild(linebreak);
        } else {
            var popup6label8 = document.createElement("label");
            popup6label8.innerHTML = "as function(s) of ";
            popup6form.appendChild(popup6label8);
            var linebreak = document.createElement("br");
            popup6form.appendChild(linebreak);
        }

        var popup6input1 = document.createElement("input");
        popup6input1.id = "p6input1";
        popup6input1.style.cssText = "width: 410px";
        popup6form.appendChild(popup6input1);
        popup6form.appendChild(linebreak);
        var popup6input2 = document.createElement("input");
        popup6input2.id = "p6input2";
        popup6input2.style.cssText = "width: 410px";
        popup6form.appendChild(popup6input2);
        popup6form.appendChild(linebreak);

        var popup6submit_btn = document.createElement("button");
        popup6submit_btn.innerHTML = "Submit";
        popup6submit_btn.type = "button";

        popup6submit_btn.onclick = function() {
            var popup6value1 = document.getElementById("p6input1").value;
            var popup6value2 = document.getElementById("p6input2").value;
            var popup6value = [popup6value1, popup6value2];
            propertiesObject["popup6value"] = popup6value;
            wind6.destroy();
            /* calling popup7 as always after popup6, popup7 opens */
            create_popup7(out,clkin,clkout,x0,z0,propertiesObject,defaultProperties);
        }

        var popup6reset_btn = document.createElement("button");
        popup6reset_btn.innerHTML = 'Reset';
        popup6reset_btn.type = "button";
        popup6reset_btn.name = "submit";
        popup6reset_btn.id = "resetButtonProperties6";
        popup6reset_btn.onclick = function() {
            document.getElementById("p6input").value = "";
        }
        popup6form.appendChild(popup6reset_btn);
        popup6form.style.cssText = "margin-left: 15px";
        popup6submit_btn.style.cssText = "margin-top: 20px";
        popup6reset_btn.style.cssText = "float: right; margin-top: 20px; margin-right: 15px";
        popup6div.style.cssText = "border: 1px solid black";
        popup6form.appendChild(popup6submit_btn);
        popup6div.appendChild(popup6form);

        height = 135 + 26 * defaultProperties.length + 15;
        var wind6 = showModalWindow(graph, 'Properties', popup6div, 450, height);
    }

    function create_popup7(out,clkin,clkout,x0,z0,propertiesObject,defaultProperties) {
        var popup7div = document.createElement("div");
        popup7div.id = "fin_file"

        var popup7form = document.createElement("form");
        popup7form.id = "popup7form";
        var linebreak = document.createElement('br');
        popup7form.appendChild(linebreak);

        var popup7label1 = document.createElement("label");
        popup7label1.innerHTML = "You may do whatever needed to finish: File or graphic closing...,";
        popup7form.appendChild(popup7label1);
        var linebreak = document.createElement("br");
        popup7form.appendChild(linebreak);

        if (!x0=="" && !z0=="") {
            var popup7label2 = document.createElement("label");
            popup7label2.innerHTML = "You may also change final value of:";
            popup7form.appendChild(popup7label2);
            var linebreak = document.createElement("br");
            popup7form.appendChild(linebreak);
        }
        if (!x0=="") {
            var popup7label3 = document.createElement("label");
            popup7label3.innerHTML = "-Continuous state x(size:1)";
            popup7form.appendChild(popup7label3);
            var linebreak = document.createElement("br");
            popup7form.appendChild(linebreak);
        }
        if (!z0=="") {
            var popup7label4 = document.createElement("label");
            popup7label4.innerHTML = "-discrete state z(size:1)";
            popup7form.appendChild(popup7label4);
            var linebreak = document.createElement("br");
            popup7form.appendChild(linebreak);
        }
        if (!x0=="" && !z0=="") {
            var popup7label5 = document.createElement("label");
            popup7label5.innerHTML = "as function(s) of x,z,";
            popup7form.appendChild(popup7label5);
            var linebreak = document.createElement("br");
            popup7form.appendChild(linebreak);
        } else if (!x0=="") {
            var popup7label6 = document.createElement("label");
            popup7label6.innerHTML = "as function(s) of x,";
            popup7form.appendChild(popup7label6);
            var linebreak = document.createElement("br");
            popup7form.appendChild(linebreak);
        } else if (!z0=="") {
            var popup7label7 = document.createElement("label");
            popup7label7.innerHTML = "as function(s) of z,";
            popup7form.appendChild(popup7label7);
            var linebreak = document.createElement("br");
            popup7form.appendChild(linebreak);
        } else {
            var popup7label8 = document.createElement("label");
            popup7label8.innerHTML = "as function(s) of ";
            popup7form.appendChild(popup7label8);
            var linebreak = document.createElement("br");
            popup7form.appendChild(linebreak);
        }

        var popup7input1 = document.createElement("input");
        popup7input1.id = "p7input1";
        popup7input1.style.cssText = "width: 390px";
        popup7form.appendChild(popup7input1);
        popup7form.appendChild(linebreak);
        var popup7input2 = document.createElement("input");
        popup7input2.id = "p7input2";
        popup7input2.style.cssText = "width: 390px";
        popup7form.appendChild(popup7input2);
        popup7form.appendChild(linebreak);

        var popup7submit_btn = document.createElement("button");
        popup7submit_btn.innerHTML = "Submit";
        popup7submit_btn.type = "button";

        popup7submit_btn.onclick = function() {
            var popup7value1 = document.getElementById("p7input1").value;
            var popup7value2 = document.getElementById("p7input2").value;
            var popup7value = [popup7value1, popup7value2];
            propertiesObject["popup7value"] = popup7value;
            wind7.destroy();
            if (out.length != 0) {
                create_popup8(out,clkin,clkout,x0,z0,propertiesObject,defaultProperties);
            }
        }

        var popup7reset_btn = document.createElement("button");
        popup7reset_btn.innerHTML = 'Reset';
        popup7reset_btn.type = "button";
        popup7reset_btn.name = "submit";
        popup7reset_btn.id = "resetButtonProperties7";
        popup7reset_btn.onclick = function() {
            document.getElementById("p7input").value = "";
        }
        popup7form.appendChild(popup7reset_btn);
        popup7form.style.cssText = "margin-left: 15px";
        popup7submit_btn.style.cssText = "margin-top: 20px";
        popup7reset_btn.style.cssText = "float: right; margin-top: 20px; margin-right: 15px";
        popup7div.style.cssText = "border: 1px solid black";
        popup7form.appendChild(popup7submit_btn);
        popup7div.appendChild(popup7form);

        height = 135 + 26 * defaultProperties.length + 15;
        var wind7 = showModalWindow(graph, 'Properties', popup7div, 450, height);
    }

    function create_popup8(out,clkin,clkout,x0,z0,propertiesObject,defaultProperties) {
        var popup8div = document.createElement("div");
        popup8div.id = "constraint"

        var popup8form = document.createElement("form");
        popup8form.id = "popup8form";
        var linebreak = document.createElement('br');
        popup8form.appendChild(linebreak);

        var popup8label1 = document.createElement("label");
        popup8label1.innerHTML = "You may define here functions imposing constraints on initial inputs, states and outputs";
        popup8form.appendChild(popup8label1);
        var linebreak = document.createElement("br");
        popup8form.appendChild(linebreak);
        var popup8label2 = document.createElement("label");
        popup8label2.innerHTML = "Note:These functions may be called more than once";
        popup8form.appendChild(popup8label2);
        var linebreak = document.createElement("br");
        popup8form.appendChild(linebreak);
        var linebreak = document.createElement("br");
        popup8form.appendChild(linebreak);
        var linebreak = document.createElement("br");
        popup8form.appendChild(linebreak);
        var popup8label3 = document.createElement("label");
        popup8label3.innerHTML = "Enter scilab instruction defining:";
        popup8form.appendChild(popup8label3);
        var linebreak = document.createElement("br");
        popup8form.appendChild(linebreak);

        if (!x0=="") {
            var popup8label4 = document.createElement("label");
            popup8label4.innerHTML = "-state x(size:1)";
            popup8form.appendChild(popup8label4);
            var linebreak = document.createElement("br");
            popup8form.appendChild(linebreak);
        }
        if (!z0=="") {
            var popup8label5 = document.createElement("label");
            popup8label5.innerHTML = "-state z(size:1)";
            popup8form.appendChild(popup8label5);
            var linebreak = document.createElement("br");
            popup8form.appendChild(linebreak);
        }
        var popup8label6 = document.createElement("label");
        popup8label6.innerHTML = "-output y1(size:1)";
        popup8form.appendChild(popup8label6);
        var linebreak = document.createElement("br");
        popup8form.appendChild(linebreak);

        var popuplabels = new Array();
        for (var i=9; i<=out.length; i=i+4) {
            popuplabels[i] = new Array();
            popuplabels[i][0] = document.createElement("label");
            popup8form.appendChild(popuplabels[i][0]);
            var linebreak = document.createElement("br");
            popup8form.appendChild(linebreak);
            if (i == 9) {
                popuplabels[i][0].innerHTML = "-output y2(size:1)";
            } else if (i == 13) {
                popuplabels[i][0].innerHTML = "-output y3(size:1)";
            } else if (i == 17) {
                popuplabels[i][0].innerHTML = "-output y4(size:1)";
            } else if (i == 21) {
                popuplabels[i][0].innerHTML = "-output y5(size:1)";
            } else if (i == 25) {
                popuplabels[i][0].innerHTML = "-output y6(size:1)";
            } else if (i == 29) {
                popuplabels[i][0].innerHTML = "-output y7(size:1)";
            }
        }

        if (!x0=="" && !z0=="") {
            var popup8label7 = document.createElement("label");
            popup8label7.innerHTML = "as function(s) of x,z,u1,";
            popup8form.appendChild(popup8label7);
            var linebreak = document.createElement("br");
            popup8form.appendChild(linebreak);
        } else if (!x0=="") {
            var popup8label8 = document.createElement("label");
            popup8label8.innerHTML = "as function(s) of x,u1,";
            popup8form.appendChild(popup8label8);
            var linebreak = document.createElement("br");
            popup8form.appendChild(linebreak);
        } else if (!z0=="") {
            var popup8label9 = document.createElement("label");
            popup8label9.innerHTML = "as function(s) of z,u1,";
            popup8form.appendChild(popup8label9);
            var linebreak = document.createElement("br");
            popup8form.appendChild(linebreak);
        } else {
            var popup8label10 = document.createElement("label");
            popup8label10.innerHTML = "as function(s) of u1,";
            popup8form.appendChild(popup8label10);
            var linebreak = document.createElement("br");
            popup8form.appendChild(linebreak);
        }

        var popup8input1 = document.createElement("input");
        popup8input1.id = "p8input1";
        popup8input1.style.cssText = "width: 340px";
        popup8form.appendChild(popup8input1);
        popup8form.appendChild(linebreak);
        var popup8input2 = document.createElement("input");
        popup8input2.id = "p8input2";
        popup8input2.style.cssText = "width: 340px";
        popup8form.appendChild(popup8input2);
        popup8form.appendChild(linebreak);

        var popupinputs = new Array();
        for (var i=5; i<=out.length; i=i+4) {
            popupinputs[i] = new Array();
            popupinputs[i][0] = document.createElement("input");
            popupinputs[i][0].style.cssText = "width: 340px";
            popup8form.appendChild(popupinputs[i][0]);
            var linebreak = document.createElement("br");
            popup8form.appendChild(linebreak);
            if (i == 5) {
                popupinputs[i][0].value = "y1 = []";
                popupinputs[i][0].id = "p8input3";
            } else if (i == 9) {
                popupinputs[i][0].value = "y2 = []";
                popupinputs[i][0].id = "p8input4";
            } else if (i == 13) {
                popupinputs[i][0].value = "y3 = []";
                popupinputs[i][0].id = "p8input5";
            } else if (i == 17) {
                popupinputs[i][0].value = "y4 = []";
                popupinputs[i][0].id = "p8input6";
            } else if (i == 21) {
                popupinputs[i][0].value = "y5 = []";
                popupinputs[i][0].id = "p8input7";
            } else if (i == 25) {
                popupinputs[i][0].value = "y6 = []";
                popupinputs[i][0].id = "p8input8";
            } else if (i == 29) {
                popupinputs[i][0].value = "y7 = []";
                popupinputs[i][0].id = "p8input9";
            }
        }

        var popup8submit_btn = document.createElement("button");
        popup8submit_btn.innerHTML = "Submit";
        popup8submit_btn.type = "button";

        popup8submit_btn.onclick = function() {
            var popup8value1 = document.getElementById("p8input1").value;
            var popup8value2 = document.getElementById("p8input2").value;
            var popup8value3 = document.getElementById("p8input3").value;
            var popup8value = [popup8value1, popup8value2, popup8value3];
            propertiesObject["popup8value"] = popup8value;
            if (out.length == 5) {
                var popup8value = [popup8value1, popup8value2, popup8value3];
                propertiesObject["popup8value"] = popup8value;
            } else if (out.length == 9) {
                var popup8value4 = document.getElementById("p8input4").value;
                var popup8value = [popup8value1, popup8value2, popup8value3, popup8value4];
                propertiesObject["popup8value"] = popup8value;
            } else if (out.length == 13) {
                var popup8value4 = document.getElementById("p8input4").value;
                var popup8value5 = document.getElementById("p8input5").value;
                var popup8value = [popup8value1, popup8value2, popup8value3, popup8value4, popup8value5];
                propertiesObject["popup8value"] = popup8value;
            } else if (out.length == 17) {
                var popup8value4 = document.getElementById("p8input4").value;
                var popup8value5 = document.getElementById("p8input5").value;
                var popup8value6 = document.getElementById("p8input6").value;
                var popup8value = [popup8value1, popup8value2, popup8value3, popup8value4, popup8value5, popup8value6];
                propertiesObject["popup8value"] = popup8value;
            } else if (out.length == 21) {
                var popup8value4 = document.getElementById("p8input4").value;
                var popup8value5 = document.getElementById("p8input5").value;
                var popup8value6 = document.getElementById("p8input6").value;
                var popup8value7 = document.getElementById("p8input7").value;
                var popup8value = [popup8value1, popup8value2, popup8value3, popup8value4, popup8value5, popup8value6,popup8value7];
                propertiesObject["popup8value"] = popup8value;
            } else if (out.length == 25) {
                var popup8value4 = document.getElementById("p8input4").value;
                var popup8value5 = document.getElementById("p8input5").value;
                var popup8value6 = document.getElementById("p8input6").value;
                var popup8value7 = document.getElementById("p8input7").value;
                var popup8value8 = document.getElementById("p8input8").value;
                var popup8value = [popup8value1, popup8value2, popup8value3, popup8value4, popup8value5, popup8value6, popup8value7, popup8value8];
                propertiesObject["popup8value"] = popup8value;
            } else if (out.length == 29) {
                var popup8value4 = document.getElementById("p8input4").value;
                var popup8value5 = document.getElementById("p8input5").value;
                var popup8value6 = document.getElementById("p8input6").value;
                var popup8value7 = document.getElementById("p8input7").value;
                var popup8value8 = document.getElementById("p8input8").value;
                var popup8value9 = document.getElementById("p8input9").value;
                var popup8value = [popup8value1, popup8value2, popup8value3, popup8value4, popup8value5, popup8value6, popup8value7, popup8value8, popup8value9];
                propertiesObject["popup8value"] = popup8value;
            }

            var model = graph.getModel();
            model.beginUpdate();
            try {
                var oldPorts = getPorts(cell.blockInstance.instance);
                var details = cell.blockInstance.instance.set(propertiesObject);
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
            wind8.destroy();
        }
        var popup8reset_btn = document.createElement("button");
        popup8reset_btn.innerHTML = 'Reset';
        popup8reset_btn.type = "button";
        popup8reset_btn.name = "submit";
        popup8reset_btn.id = "resetButtonProperties8";
        popup8reset_btn.onclick = function() {
            document.getElementById("p8input").value = "";
        }
        popup8form.appendChild(popup8reset_btn);
        popup8form.style.cssText = "margin-left: 15px";
        popup8submit_btn.style.cssText = "margin-top: 20px";
        popup8reset_btn.style.cssText = "float: right; margin-top: 20px; margin-right: 15px";
        popup8div.style.cssText = "border: 1px solid black";
        popup8form.appendChild(popup8submit_btn);
        popup8div.appendChild(popup8form);

        height = 135 + 26 * defaultProperties.length + 15;
        var wind8 = showModalWindow(graph, 'Properties', popup8div, 450, height);
    }
}
