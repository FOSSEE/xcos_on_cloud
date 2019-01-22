//Function to display content of prerequisite file

var editorCodeMirror = null;
var resultCodeMirror = null;

function displayPrerequisiteFile(graph) {
    var maindiv = document.createElement('div');
    maindiv.className = "maindiv";
    maindiv.innerHTML = "<table width='100%'><tr><td>"
        +"<div id='codediv' style='width:800px; height:350px'>"
        +"<label class='insidelabel'>Scilab Code :</label>"
        +"<textarea id='editorTextArea' placeholder='Write a new code...'></textarea>"
        +"</div>"
        +"</td><td>"
        +"<div id='resultdiv' style='display:none'>"
        +"<label class='insidelabel'>Result :</label>"
        +"<img src='images/close.gif' style='float:right;' onclick='displayResultforCode(false);' title='Close result window'>"
        +"<textarea id='resultTextArea'></textarea>"
        +"</div>"
        +"</td></tr><tr><td style='padding-top:60px'>"
        +"<button id='executePrerequisite' onclick='executePrerequisiteFile();' title='Start execution'>Execute</button>"
        +"<button id='stopPrerequisite' style='margin-left:60px' onclick='stopPrerequisiteFile();' title='Stop execution'>Stop</button>"
        +"</td></tr></table>";
    showModalWindow(graph, 'Prerequisite File', maindiv, 900, 500);
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
}

//Function to display/hide result window of scilab code
function displayResultforCode(visible_flag) {

    var codediv = document.getElementById("codediv");
    var resultdiv = document.getElementById("resultdiv");
    if (codediv === null || resultdiv === null)
        return;
    if (visible_flag) {
        codediv.style.width="420px";
        codediv.style.height="350px";
        resultdiv.style.display = "block";
        resultdiv.style.width="410px";
        resultdiv.style.height="350px";
        resultCodeMirror.setValue(prerequisite_output);
        resultCodeMirror.refresh();
    } else {
        codediv.style.width="800px";
        codediv.style.height="350px";
        resultdiv.style.display = "none";
    }

}

var old_script_id = null;
var script_id = null;

function executePrerequisiteFile() {
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
        async: true,
        processData: false,
        contentType: false,
        data: formData,
        dataType: "json",
        success: function(rv) {
            var msg = rv.msg;
            if (msg != '') {
                alert("Error while executing script:\n" + msg);
            }
            var id = rv.script_id;
            if (id !== null) {
                old_script_id = script_id;
                script_id = id;

                $.ajax({
                    type: "POST",
                    url: "/getscriptoutput",
                    async: true,
                    data: { script_id: script_id },
                    dataType: "json",
                    success: function(rv) {
                        var msg = rv.msg;
                        if (msg != '') {
                            alert("Error while executing script:\n" + msg);
                        }
                        var output = rv.output;
                        if (output !== null) {
                            /* save the output here */
                            prerequisite_output = output;
                            /* if code window is open, show the output window */
                            displayResultforCode(output != '');
                        }
                        setScriptSimulationFlags(false);
                    },
                    error: function(xhr, textStatus, errorThrown) {
                        var msg = "Error while executing script:\n";
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
        },
        error: function(xhr, textStatus, errorThrown) {
            var msg = "Error while executing script:\n";
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
    if (script_id === null)
        return;

    stopScriptButton.disabled = true;

    $.ajax({
        type: "POST",
        url: "/stopscript",
        async: true,
        data: { script_id: script_id },
        success: function(rv) {
            script_id = old_script_id;
            setScriptSimulationFlags(false);
        }
    });
}

function clearPrerequisiteFile() {
    prerequisite_content = "";
    prerequisite_output = "";
    script_id = null;
    setScriptSimulationFlags(false);
}
