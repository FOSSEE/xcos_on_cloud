//Function to display content of prerequisite file

var prerequisite_window = null;
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
        +"<button id='uploadPrerequisite' onclick='uploadPrerequisiteFile();' title='Upload and Execute Script'>Upload</button>"
        +"<button id='executePrerequisite' style='margin-left:60px' onclick='executePrerequisiteFile();' title='Execute Script'>Execute</button>"
        +"<button id='stopPrerequisite' style='margin-left:60px' onclick='stopPrerequisiteFile();' title='Stop Script'>Stop</button>"
        +"<button id='showresult' style='margin-left:60px' onclick='displayResultforCode(true);' title='Show Script Result'>Show Result</button>"
        +"</td></tr></table>";
    prerequisite_window = showModalWindow(graph, 'Prerequisite File', maindiv, 900, 500);
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
    if (codediv === null || resultdiv === null)
        return;
    if (visible_flag) {
        showresult.disabled = true;
        codediv.style.width="420px";
        codediv.style.height="350px";
        resultdiv.style.display = "block";
        resultdiv.style.width="410px";
        resultdiv.style.height="350px";
        resultCodeMirror.setValue(prerequisite_output);
        resultCodeMirror.refresh();
    } else {
        showresult.disabled = (prerequisite_output.length == 0);
        codediv.style.width="800px";
        codediv.style.height="350px";
        resultdiv.style.display = "none";
    }

}

var old_script_id = null;
var script_id = null;

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
                old_script_id = script_id;
                script_id = id;

                $.ajax({
                    type: "POST",
                    url: "/getscriptoutput",
                    async: async,
                    data: { script_id: script_id },
                    dataType: "json",
                    success: function(rv) {
                        var msg = rv.msg;
                        if (msg != '') {
                            alert("Error while executing script\n\n" + msg);
                        }
                        var output = rv.output;
                        if (output != null) {
                            /* save the output here */
                            prerequisite_output = output;
                            /* if code window is open, show the output window */
                            displayResultforCode(output != '');
                        }
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
