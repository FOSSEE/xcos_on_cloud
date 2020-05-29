//Function to display content of prerequisite file

var prerequisite_window = null;
var editorCodeMirror = null;
var resultCodeMirror = null;

function displayPrerequisiteFile(graph) {
    var maindiv = document.createElement('div');
    maindiv.className = "maindiv";
    maindiv.innerHTML = "<table width='100%'><tr><td>"
        +"<div id='codediv' style='width:800px; height:320px'>"
        +"<label class='insidelabel'>Scilab Code :</label>"
        +"<textarea id='editorTextArea' placeholder='Write a new code...'></textarea>"
        +"</div>"
        +"</td><td>"
        +"<div id='resultdiv' style='display:none;'>"
        +"<label class='insidelabel'>Result :</label>"
        +"<img src='images/close.gif' style='float:right;' onclick='displayResultforCode(false);' title='Close result window'>"
        +"<textarea id='resultTextArea'></textarea>"
        +"</div>"
        +"</td></tr></table><table width='100%' style='padding-top:30px'><tr><td><div id='buttondiv'style='padding-top:40px' >"
        +"<button id='uploadPrerequisite' onclick='uploadPrerequisiteFile();' title='Upload and Execute Script'>Upload</button>"
        +"<button id='executePrerequisite' style='margin-left:20px' onclick='executePrerequisiteFile();' title='Execute Script'>Execute</button>"
        +"<button id='stopPrerequisite' style='margin-left:20px' onclick='stopPrerequisiteFile();' title='Stop Script'>Stop</button>"
        +"<button id='showresult' style='margin-left:20px' onclick='displayResultforCode(true);' title='Show Script Result'>Show Result</button>"
        +"<button id='showbrowser' style='margin-left:20px' onclick='displayVarBrowser(true);' title='Show variable browser'>Show Variables</button>"
        +"</div></td><td><div id='var_browser_div' style='display:none;'>"
        +"<label style= 'font-weight:bold'>Variable Browser :</label>"
        +"<img src='images/close.gif' style='float:right;' onclick='displayVarBrowser(false);' title='Close variable browser'>"
        +"<div id='var_browser'></div></div>"
        +"</td></tr></table>";
    prerequisite_window = showModalWindow(graph, 'Prerequisite File', maindiv, 900, 515);
    prerequisite_window.addListener(mxEvent.DESTROY, function(evt) {
        prerequisite_window = null;
    });
    var editorTextArea = document.getElementById("editorTextArea");
    var resultTextArea = document.getElementById("resultTextArea");
    editorTextArea.value = prerequisite_content;

    editorCodeMirror = CodeMirror.fromTextArea(editorTextArea, {
        lineNumbers: true,
        lineWrapping : false,
        matchBrackets: true
    });
    editorCodeMirror.on("changes", function(cm) {
        prerequisite_content = cm.getValue();
        setScriptSimulationFlags(scriptSimulationStarted);
    });

    resultCodeMirror = CodeMirror.fromTextArea(resultTextArea, {
        lineNumbers: false,
        lineWrapping : false,
        readOnly: true
    });

    setScriptSimulationFlags(scriptSimulationStarted);
    displayResultforCode(prerequisite_output != '');
    displayVarBrowser(scilabVariableMap.size != 0);
}

function displayCode() {
    var codediv = document.getElementById("codediv");
    if (codediv === null)
        return;
    editorCodeMirror.setValue(prerequisite_content);
}

//Function to display/hide result window of scilab code
function displayResultforCode(visible_flag) {

    var codediv = document.getElementById("codediv");
    var resultdiv = document.getElementById("resultdiv");
    var showresult = document.getElementById("showresult");
    var button_div = document.getElementById("buttondiv");
    if (codediv === null || resultdiv === null)
        return;
    if (visible_flag) {
        showresult.disabled = true;
        codediv.style.width="420px";
        codediv.style.height="320px";
        resultdiv.style.display = "block";
        resultdiv.style.width="410px";
        resultdiv.style.height="320px";
        resultCodeMirror.setValue(prerequisite_output);
        resultCodeMirror.refresh();
        button_div.style.marginBottom = "58px";
    } else {
        showresult.disabled = (prerequisite_output.length == 0);
        codediv.style.width="830px";
        codediv.style.height="320px";
        resultdiv.style.display = "none";
    }

}
//Function to display/hide variable browser
function displayVarBrowser(visible_flag){
    var main_var_browser = document.getElementById("var_browser_div");
    var showbrowser = document.getElementById("showbrowser");
    var variable_browser = document.getElementById("var_browser");
    if (visible_flag) {
        variable_browser.innerHTML = getvaluesOfVariables();
        main_var_browser.style.display = "block";
        showbrowser.disabled = true;
    }else{
        main_var_browser.style.display = "none";
        showbrowser.disabled = (scilabVariableMap.size == 0);
    }
}

var script_id = null;
var new_script_id = null;
var scilabVariableMap = new Map();

function clean_text_2(s) {
    // handle whitespace
    s = s.replace(/[\b\f\r\v]/g, '');
    s = s.replace(/\t/g, '    ');
    s = s.replace(/ +(\n|$)/g, '\n');
    s = s.replace(/\n+$/g, '');
    return s;
}

function uploadPrerequisiteFile() {
    if (!(window.File && window.FileReader && window.Blob && window.FileList)) {
        alert('This browser doesn\'t support this feature.');
        return;
    }

    var wind;
    var new_prerequisite_content = '';

    var fileNode = document.createElement('input');
    fileNode.type = 'file';
    fileNode.accept = '.sci,.sce'
    fileNode.style = "margin:30px 30px 40px 30px;";
    fileNode.addEventListener('change', function(evt) {
        var f = evt.target.files[0];

        if (!(f.name.endsWith(".sci") || f.name.endsWith(".sce"))) {
            alert("Choose proper file! Only sci/sce files can be uploaded!");
            return false;
        }

        var r = new FileReader();
        r.onload = function(e) {
            new_prerequisite_content = clean_text_2(e.target.result);
        }
        r.readAsText(f);
    }, false);

    var button = document.createElement('button');
    button.innerHTML = 'Submit';
    button.type = "button";
    button.name = "submit";
    button.style = "margin:0px 113px 30px 113px;";
    button.onclick = function() {
        if (new_prerequisite_content == '') {
            alert("Enter filename!");
            return false;
        }
        if (prerequisite_content != '') {
            if (!confirm("Uploading this file will remove the existing script. Are you sure you want to continue?"))
                return false;
        }
        prerequisite_content = new_prerequisite_content;
        displayCode();
        wind.destroy();

        executePrerequisiteFile();
    }

    var breakNode1 = document.createElement('br');

    var breakNode2 = document.createElement('br');

    var node = document.createElement('form');
    node.appendChild(fileNode);
    node.appendChild(button);
    node.appendChild(breakNode1);
    node.appendChild(breakNode2);
    node.style.visibility = "visible";

    var div = document.createElement('div');
    div.setAttribute("style", "height:100;width:100");
    div.appendChild(node);

    wind = showModalWindow(editor.graph, 'Upload Sci File', div, 268, 162);
    wind.addListener(mxEvent.DESTROY, function(evt) {
        if (prerequisite_window != null)
            prerequisite_window.setVisible(true);
    });

    if (prerequisite_window != null)
        prerequisite_window.setVisible(false);
}

function executePrerequisiteFile(async = true) {
    if (prerequisite_content == "")
        return;

    setScriptSimulationFlags(true);

    var blob = new Blob([prerequisite_content], {
        type: 'application/x-scilab'
    });
    var formData = new FormData();
    formData.set('file', blob);
    $.ajax({
        type: "POST",
        url: "/uploadscript",
        async: async,
        processData: false,
        contentType: false,
        data: formData,
        dataType: "json",
        success: function(rv) {
            var msg = rv.msg;
            if (msg != '') {
                alert("Error while executing script\n\n" + msg);
            }
            var id = rv.script_id;
            if (id != null) {
                new_script_id = id;

                $.ajax({
                    type: "POST",
                    url: "/getscriptoutput",
                    async: async,
                    data: { script_id: new_script_id },
                    dataType: "json",
                    success: function(rv) {
                        var msg = rv.msg;
                        if (msg != '') {
                            alert("Error while executing script\n\n" + msg);
                        } else {
                            script_id = new_script_id;
                            var variables = rv.variables;
                            var variableMap = new Map();
                            if (Array.isArray(variables)) {
                                for (var v of variables) {
                                    var name = v.name;
                                    var type = v.type;
                                    var size = v.size;
                                    var value = v.value;
                                    if (name == null || type == null || size == null || value == null)
                                        continue;
                                    variableMap.set(name, { type, size, value });
                                }
                            }
                            scilabVariableMap = variableMap;
                        }
                        var output = rv.output;
                        if (output != null) {
                            /* save the output here */
                            prerequisite_output = output;
                            /* if code window is open, show the output window */
                            displayResultforCode(output != '');
                            displayVarBrowser(scilabVariableMap.size != 0);
                        }
                        new_script_id = null;
                        setScriptSimulationFlags(false);
                    },
                    error: function(xhr, textStatus, errorThrown) {
                        var msg = "Error while executing script\n\n";
                        if (textStatus != null) {
                            msg += textStatus + "\n";
                        }
                        if (errorThrown != null) {
                            msg += errorThrown + "\n";
                        }
                        alert(msg);
                        setScriptSimulationFlags(false);
                    }
                });
            } else {
                setScriptSimulationFlags(false);
            }
        },
        error: function(xhr, textStatus, errorThrown) {
            var msg = "Error while executing script\n\n";
            if (textStatus != null) {
                msg += textStatus + "\n";
            }
            if (errorThrown != null) {
                msg += errorThrown + "\n";
            }
            alert(msg);
            setScriptSimulationFlags(false);
        }
    });
}

function stopPrerequisiteFile() {
    if (new_script_id === null)
        return;

    stopScriptButton.disabled = true;

    $.ajax({
        type: "POST",
        url: "/stopscript",
        async: true,
        data: { script_id: new_script_id },
        success: function(rv) {
            new_script_id = null;
            setScriptSimulationFlags(false);
        }
    });
}

function clearPrerequisiteFile() {
    prerequisite_content = "";
    prerequisite_output = "";
    script_id = null;
    new_script_id = null;
    scilabVariableMap = new Map();
    setScriptSimulationFlags(false);
}

//To create a table for showing variables
function getvaluesOfVariables(){
    var table_content = "<table cellspacing='0' cellpadding='0' border='0'><tr><td>"
                        +"<table cellspacing='0' cellpadding='1' border='1' width='400' >"
                        +"<tr style='color:white;background-color:grey;font-size:12px'>"
                        +"<th width ='130'>Name </th><th width ='130'> Value </th><th width ='130'> Type </th></tr></table></td></tr>"
                        +"<tr><td><div style='width:410; height:66px; overflow:auto;'>"
                        +"<table cellspacing='0' cellpadding='1' border='1' width='400'>" ;
    for (const entry of scilabVariableMap.entries()) {
        table_content += "<tr><td width ='125'>"+entry[0]+"</td><td width ='125'>"+entry[1].value+"</td><td width ='125'>"+get_type_of_variable(entry[1].type)+"</td></tr>"
    }
    table_content += "</table></div></td></tr></table>";
    return table_content
}

//To get type of variable from map value type
function get_type_of_variable(type_counter){
    var type_name = "";
    switch (type_counter) {
        case "1":
            type_name = "Double";
            break;
        case "2":
            type_name = "Polynomial";
            break;
        case "4":
            type_name = "Boolean";
            break;
        case "10":
            type_name = "String";
            break;
        default:
            type_name = "N/A";
    }
    return type_name
}
