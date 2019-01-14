    //Function to display content of prerequisite file

    function displayPrerequisiteFile(graph){

        var file_content = prerequisite_content;
        var maindiv = document.createElement('div');
        maindiv.className = "maindiv";
        maindiv.innerHTML ="<table width = '100%'>"+
        "<tr><td><div id ='codediv' style='width:800px; height:350px'><label class='insidelabel'>Scilab Code : </label><textarea id ='editorTextArea' placeholder= 'Write a new code...'></textarea></div></td>"+
        "<td><div id ='resultdiv' style='display:none'><label class='insidelabel'>Result : </label><img src='images/close.gif' style='float:right;' onclick='displayResultforCode(false);' title='Close result window'><textarea id='resultTextArea'></textarea></div></td></tr>"+
        "<tr><td style ='padding-top:60px'><button id='executePrerequisite' onclick='displayResultforCode(true);' title='Start execution'>Execute</button><button id='executePrerequisite' style='margin-left:60px' onclick='displayResultforCode(false);' title='Stop execution'>Stop</button></td></tr></table>";
        showModalWindow(graph, 'Prerequisite File', maindiv, 900, 500);
        var editorTextArea = document.getElementById("editorTextArea");
        var resultTextArea = document.getElementById("resultTextArea");
        var parser = new DOMParser();
        var parse_content = parser.parseFromString(file_content, "text/html");
        editorTextArea.value = parse_content.body.textContent;
        
        CodeMirror.fromTextArea(editorTextArea, {
        lineNumbers: true,
        lineWrapping : false,
        matchBrackets: true
        });
        
        CodeMirror.fromTextArea(resultTextArea, {
        lineNumbers: false,
        lineWrapping : false,
        readOnly: true
        });

    }
    
    //Function to display/hide result window of scilab code
    function displayResultforCode(visible_flag){

        var codediv = document.getElementById("codediv");
        var resultdiv = document.getElementById("resultdiv");
        if(visible_flag){
            codediv.style.width="420px"; 
            codediv.style.height="350px";
            resultdiv.style.display = "block";
            resultdiv.style.width="410px"; 
            resultdiv.style.height="350px";
        }else{
            codediv.style.width="800px"; 
            codediv.style.height="350px";
            resultdiv.style.display = "none";
        }

    }

