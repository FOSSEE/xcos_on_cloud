//Function to display content of prerequisite file

var editorCodeMirror = null;
var resultCodeMirror = null;

function displayPrerequisiteFile(graph) {
    var file_content = prerequisite_content;
    var maindiv = document.createElement('div');
    maindiv.className = "maindiv";
    maindiv.innerHTML = "<table width='100%'>"+
        "<tr><td><div id='codediv' style='width:800px; height:350px'><label class='insidelabel'>Scilab Code : </label><textarea id='editorTextArea' placeholder='Write a new code...'></textarea></div></td>"+
        "<td><div id='resultdiv' style='display:none'><label class='insidelabel'>Result : </label><img src='images/close.gif' style='float:right;' onclick='displayResultforCode(false);' title='Close result window'><textarea id='resultTextArea'></textarea></div></td></tr>"+
        "<tr><td style='padding-top:60px'><button id='executePrerequisite' onclick='saveAndExecutePrerequisiteFile();' title='Start execution'>Execute</button><button id='executePrerequisite' style='margin-left:60px' onclick='stopPrerequisiteFile();' title='Stop execution'>Stop</button></td></tr></table>";
    showModalWindow(graph, 'Prerequisite File', maindiv, 900, 500);
    var editorTextArea = document.getElementById("editorTextArea");
    var resultTextArea = document.getElementById("resultTextArea");
    editorTextArea.value = prerequisite_content;

    editorCodeMirror = CodeMirror.fromTextArea(editorTextArea, {
        lineNumbers: true,
        lineWrapping : false,
        matchBrackets: true
    });

    resultCodeMirror = CodeMirror.fromTextArea(resultTextArea, {
        lineNumbers: false,
        lineWrapping : false,
        readOnly: true
    });
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
    } else {
        codediv.style.width="800px";
        codediv.style.height="350px";
        resultdiv.style.display = "none";
    }

}

var old_script_id = null;
var script_id = null;

function saveAndExecutePrerequisiteFile() {
    if (editorCodeMirror == null)
        return;
    prerequisite_content = editorCodeMirror.getValue();
    executePrerequisiteFile();
}

function executePrerequisiteFile() {
    if (prerequisite_content == "")
        return;

    executeScriptButton.disabled = true;
    stopScriptButton.disabled = false;
    clearScriptButton.disabled = true;

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
            }
            var output = rv.output;
            if (output !== null) {
                /* TODO: save the output here */
                /* TODO: if code window is open, show the output window */
            }
            executeScriptButton.disabled = false;
            stopScriptButton.disabled = true;
            clearScriptButton.disabled = false;
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
            executeScriptButton.disabled = false;
            stopScriptButton.disabled = true;
            clearScriptButton.disabled = false;
        }
    });
}

function stopPrerequisiteFile() {
    if (script_id === null)
        return;

    stopScriptButton.disabled = true;

    var formData = new FormData();
    formData.set('script_id', script_id);
    $.ajax({
        type: "POST",
        url: "/stopscript",
        async: true,
        processData: false,
        contentType: false,
        data: formData,
        success: function(rv) {
            script_id = old_script_id;
        }
    });
}

function clearPrerequisiteFile() {
    prerequisite_content = "";
    script_id = null;
    executeScriptButton.disabled = true;
    stopScriptButton.disabled = true;
    clearScriptButton.disabled = true;
}
