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
    var in_1_arry = make_linear(i1);
    var out_1_arry = make_linear(o1);
    var clkin = make_linear(ci1);
    var clkout = make_linear(co1);
    var x01 = make_linear(xx1);
    var z01 = make_linear(z1);
    var rpar01 = make_linear(rpar1);
    var auto1 = make_linear(auto01);

    var ni = (in_1_arry.length/2);
    var no = (out_1_arry.length/2);
    var nci = clkin.length;
    var nco = clkout.length;
    var xx_size = x01.length;
    var z_size = z01.length;
    var rpar_size = rpar01.length;
    var auto_size = auto1.length;
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

    //flag 1
    if(no > 0){
        create_popup_for_define_function(no, ni, nci, nco, xx_size, z_size, rpar_size, graph, cell, text_main_array, update_propertiesObject, in_1_arry, out_1_arry, clkin, clkout);
    }
    //flag2
    else if(xx_size > 0){
       create_popup_for_continuous_states_evolution(no, ni, nci, nco, xx_size, z_size, rpar_size, graph, cell, text_main_array, defaultProperties, update_propertiesObject, in_1_arry, out_1_arry, clkin, clkout);
    }
    else if((nci > 0 && (xx_size > 0 || z_size > 0))|| z_size > 0){
        create_popup_for_event_time(no, ni, nci, nco, xx_size, z_size, rpar_size, defaultProperties, cell, graph, text_main_array, defaultProperties, update_propertiesObject, in_1_arry, out_1_arry, clkin, clkout);
    }
    //flag = 3
    else if(nci>0 && nco>0){
        create_popup_for_time_events_t_evo(no, ni, nci, nco, xx_size, z_size, rpar_size, graph, cell, text_main_array, defaultProperties, update_propertiesObject, in_1_arry, out_1_arry, clkin, clkout);
    }
    //flag = 6  x,z,u1,rpar
    else if(xx_size > 0 || z_size > 0 || no > 0){
        create_popup_for_func_imposing_contraints(no, ni, nci, nco, xx_size, z_size, rpar_size, defaultProperties, graph, text_main_array);
    }
    else{
    //flag 4
        create_popup_for_initialization(no, ni, nci, nco, xx_size, z_size, rpar_size, defaultProperties, cell, graph, text_main_array, update_propertiesObject, in_1_arry, out_1_arry, clkin, clkout);
    }
    check_call_for_sci = 1;
}

//for saving will be used later as per submission of form/popup
function update_cell_object(no, ni, nci, nco, xx_size, z_size, rpar_size, graph, cell, text_main_array, update_propertiesObject, in_1_arry, out_1_arry, clkin, clkout){
    check_call_for_sci = 2;

    /* For all value null condition */
    var no_value_check = (no == 0 && ni == 0 && nci == 0 && nco == 0 && xx_size == 0 && z_size == 0 && rpar_size == 0 && auto_size == 0);
    if(no_value_check){
        text_main_array[0] = " ";
        text_main_array[1] = " ";
        text_main_array[2] = " ";
        text_main_array[3] = " ";
        text_main_array[4] = " ";
        text_main_array[5] = " ";
        text_main_array[6] = " ";
    }
    //For setting opar values
    /* Check for default condition in which opar doesn't come in xml */
    var check = (no == 1 && ni == 1 && nci == 0 && nco == 0 && xx_size == 0 && z_size == 0 && rpar_size == 0);
    cell.blockInstance.instance.x.model.opar = list();
    if(!check){
        cell.blockInstance.instance.x.model.opar = list(new ScilabString(...text_main_array[0]), new ScilabString(...text_main_array[1]), new ScilabString(...text_main_array[2]), new ScilabString(...text_main_array[3]), new ScilabString(...text_main_array[4]), new ScilabString(...text_main_array[5]), new ScilabString(...text_main_array[6]));
    }else{
        if(text_main_array[0] != "y1=sin(u1)"){
            cell.blockInstance.instance.x.model.opar = list(new ScilabString(...text_main_array[0]), new ScilabString(...text_main_array[1]), new ScilabString(...text_main_array[2]), new ScilabString(...text_main_array[3]), new ScilabString(...text_main_array[4]), new ScilabString(...text_main_array[5]), new ScilabString(...text_main_array[6]));
        }
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
            var value = first_wind_value_arry[i].toString().trim();
            txt += value + "\n";
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
        var value_array = clean_text_2(def_func_value).split(/[\n]/);
        var text_value = "";
        for (var i = 0; i < value_array.length; i++) {
            if(value_array[i].length != 0 || value_array[i].trim() != "" ){
                text_value += value_array[i];
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
            first_value_array.push([temp_first_value_array[i]]);
        }
        text_main_array[0] = first_value_array;
        //Once other popup are fixed this function will be removed and put in particular popup code
        def_func_wind.destroy();
        //Condition
        if(xx_size > 0){
            create_popup_for_continuous_states_evolution(no, ni, nci, nco, xx_size, z_size, rpar_size, graph, cell, text_main_array, defaultProperties, update_propertiesObject, in_1_arry, out_1_arry, clkin, clkout);
        }else if((nci > 0 && (xx_size > 0 || z_size > 0))|| z_size > 0){
            create_popup_for_event_time(no, ni, nci, nco, xx_size, z_size, rpar_size, defaultProperties, cell, graph, text_main_array,defaultProperties, update_propertiesObject, in_1_arry, out_1_arry, clkin, clkout);
        }else if(nci>0 && nco>0){
            create_popup_for_time_events_t_evo(no, ni, nci, nco, xx_size, z_size, rpar_size, graph, cell, text_main_array, defaultProperties, update_propertiesObject, in_1_arry, out_1_arry, clkin, clkout);
        }else{
            create_popup_for_initialization(no, ni, nci, nco, xx_size, z_size, rpar_size, defaultProperties,cell, graph, text_main_array, update_propertiesObject, in_1_arry, out_1_arry, clkin, clkout);
        }
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

function create_popup_for_continuous_states_evolution(no, ni, nci, nco, xx_size, z_size, rpar_size, graph, cell, text_main_array, defaultProperties, update_propertiesObject, in_1_arry, out_1_arry, clkin, clkout){

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
    var txt = "xd=[]";
    if(zero_wind_value_arry.length > 0 && zero_wind_value_arry.toString().trim().length > 0){
        var len = zero_wind_value_arry.length;
        txt = "";
        for (var i = 0; i < len; i++) {
            var value = zero_wind_value_arry[i].toString().trim();
            txt += value + "\n";
        }
        cont_stat_inputtextarea.value = txt;
    }else{
        cont_stat_inputtextarea.value = txt;
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
        var value_array = clean_text_2(cont_stat_value).split(/[\n]/);
        var text_value = "";
        for (var i = 0; i < value_array.length; i++) {
            if(value_array[i].length != 0){
                text_value += value_array[i];
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
            zero_value_array.push([temp_zero_value_array[i]]);
        }
        text_main_array[1] = zero_value_array;
        cont_stat_wind.destroy();
        if((nci > 0 && (xx_size > 0 || z_size > 0))|| z_size > 0){
            create_popup_for_event_time(no, ni, nci, nco, xx_size, z_size, rpar_size, defaultProperties, cell ,graph, text_main_array, defaultProperties, update_propertiesObject, in_1_arry, out_1_arry, clkin, clkout);
        }else{
            create_popup_for_initialization(no, ni, nci, nco, xx_size, z_size, rpar_size, defaultProperties,cell, graph, text_main_array, update_propertiesObject, in_1_arry, out_1_arry, clkin, clkout);
        }
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

function create_popup_for_event_time(no, ni, nci, nco, xx_size, z_size, rpar_size, defaultProperties, cell, graph, text_main_array, defaultProperties, update_propertiesObject, in_1_arry, out_1_arry, clkin, clkout){
    var second_wind_value_arry = text_main_array[2];
    var event_time_div = document.createElement("div");
    var event_time_form = document.createElement("form");
    var linebreak = document.createElement('br');
    event_time_form.appendChild(linebreak);

    var event_time_label1 = document.createElement("label");
    event_time_label1.innerHTML = "You may define:";
    event_time_form.appendChild(event_time_label1);
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
            var value = second_wind_value_arry[i].toString().trim();
            txt += value + "\n";
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
        var temp_second_value_array = clean_text_2(event_time_value).split(/[\n]/);
        var second_value_array = [];
        for (var i = 0; i < temp_second_value_array.length; i++) {
            second_value_array.push([temp_second_value_array[i]]);
        }
        text_main_array[2] = second_value_array;
        event_time_wind.destroy();
        if(nci>0 && nco>0){
            create_popup_for_time_events_t_evo(no, ni, nci, nco, xx_size, z_size, rpar_size, graph, cell, text_main_array, defaultProperties, update_propertiesObject, in_1_arry, out_1_arry, clkin, clkout);
        }else{
            create_popup_for_initialization(no, ni, nci, nco, xx_size, z_size, rpar_size, defaultProperties,cell, graph, text_main_array, update_propertiesObject, in_1_arry, out_1_arry, clkin, clkout);
        }
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
    event_time_div.appendChild(event_time_form);
    height = 135 + 26 * defaultProperties.length + 15;
    var event_time_wind = showModalWindow(graph, 'Properties', event_time_div, 450, height);
}

/* flag 3 */

function create_popup_for_time_events_t_evo (no, ni, nci, nco, xx_size, z_size, rpar_size, graph, cell, text_main_array, defaultProperties, update_propertiesObject, in_1_arry, out_1_arry, clkin, clkout) {
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
            var value = third_wind_value_arry[i].toString().trim();
            txt += value + "\n";
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
        var temp_third_value_array = clean_text_2(events_t_evo_value).split(/[\n]/);
        var third_value_array = [];
        for (var i = 0; i < temp_third_value_array.length; i++) {
            third_value_array.push([temp_third_value_array[i]]);
        }
        text_main_array[3] = third_value_array;
        events_t_evo_wind.destroy();
        create_popup_for_initialization(no, ni, nci, nco, xx_size, z_size, rpar_size, defaultProperties,cell, graph, text_main_array, update_propertiesObject, in_1_arry, out_1_arry, clkin, clkout);
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

function create_popup_for_initialization(no, ni, nci, nco, xx_size, z_size, rpar_size, defaultProperties, cell, graph, text_main_array,  update_propertiesObject, in_1_arry, out_1_arry, clkin, clkout){

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
            var value = fourth_wind_value_arry[i].toString().trim();
            txt += value + "\n";
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
        var temp_fourth_value_array = clean_text_2(init_value).split(/[\n]/);
        var fourth_value_array = [];
        for (var i = 0; i < temp_fourth_value_array.length; i++) {
            fourth_value_array.push([temp_fourth_value_array[i]]);
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
            var value = fifth_wind_value_arry[i].toString().trim();
            txt += value + "\n";
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
        var temp_fifth_value_array = clean_text_2(need_finish_value).split(/[\n]/);
        var fifth_value_array = [];
        for (var i = 0; i < temp_fifth_value_array.length; i++) {
            fifth_value_array.push([temp_fifth_value_array[i]]);
        }
        text_main_array[5] = fifth_value_array;
        if(xx_size > 0 || z_size > 0 || no > 0){
            create_popup_for_func_imposing_contraints(no, ni, nci, nco, xx_size, z_size, rpar_size, defaultProperties,cell, graph, text_main_array,update_propertiesObject, in_1_arry, out_1_arry, clkin, clkout);
        }else{
            update_cell_object(no, ni, nci, nco, xx_size, z_size, rpar_size, graph, cell, text_main_array, update_propertiesObject, in_1_arry, out_1_arry, clkin, clkout);
        }
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
                value_for_textarea += "y"+i+"=[]\n";
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
            var value = sixth_wind_value_arry[i].toString().trim();
            txt += value + "\n";
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
        var temp_sixth_value_array = clean_text_2(func_imposing_value).split(/[\n]/);
        var sixth_value_array = [];
        for (var i = 0; i < temp_sixth_value_array.length; i++) {
            sixth_value_array.push([temp_sixth_value_array[i]]);
        }
        text_main_array[6] = sixth_value_array;
        update_cell_object(no, ni, nci, nco, xx_size, z_size, rpar_size, graph, cell, text_main_array, update_propertiesObject, in_1_arry, out_1_arry, clkin, clkout);
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

function make_linear(input_value){
    var k = 0;
    var ip_value = inverse(input_value);
    var ip_arry = [];
    for (var i = 0; i < ip_value.length; i++) {
        for (var j = 0; j < ip_value[i].length; j++) {
            ip_arry[k] = ip_value[i][j];
            k++;
        }
    }
    return ip_arry;
}
