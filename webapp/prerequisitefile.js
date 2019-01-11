    
    /*
    Libraries needed for codemirror for making textarea for Prerequisite File window.
    */
    
    //Function to load CSS and JS related to features of codemirror
    
    function loadjsandcssfile(filename, filetype){
        if (filetype == "js"){          //for JS
            var filetobeincluded = document.createElement('script')
            filetobeincluded.setAttribute("type","text/javascript")
            filetobeincluded.setAttribute("src", filename)
        }
        else if (filetype == "css"){        //for CSS
            var filetobeincluded = document.createElement("link")
            filetobeincluded.setAttribute("rel", "stylesheet")
            filetobeincluded.setAttribute("type", "text/css")
            filetobeincluded.setAttribute("href", filename)
        }
        if (typeof filetobeincluded != "undefined"){
        document.getElementsByTagName("head")[0].appendChild(filetobeincluded);//to load file in header of page
        } 
    }

    loadjsandcssfile("codemirror/lib/codemirror.js", "js"); //codemirror main JS
    loadjsandcssfile("codemirror/lib/codemirror.css", "css"); //codemirror main CSS
    var CodeMirror ; //Declare codemirror object;
    loadjsandcssfile("codemirror/display/placeholder.js", "js"); //JS for placeholder functionality for codemirror window
    loadjsandcssfile("codemirror/display/fullscreen.js", "js"); //JS for fullscreen functionality for codemirror window
    loadjsandcssfile("codemirror/display/fullscreen.css", "css"); //CSS for fullscreen functionality for codemirror window
    
    //Function to display content of pre file.
    
    function displayPrerequisiteFile(graph){
        var editorTextArea = null;
        var resultTextArea = null;
        var file_content = prerequisite_content;
        var maindiv = document.createElement('div');
        maindiv.style.width = '95%';
        maindiv.style.height = '100%';
        maindiv.style.padding ='10px 10px 10px 10px';
        maindiv.innerHTML ="<table width = '100%'>"+
        ""+
        "<tr><td><div id ='codediv' style='width:800px; height:350px'><label style='font-size:18px;font-weight:bold'>Scilab Code: </label><textarea id ='editorTextArea' placeholder= 'Write a new code...'></textarea></div></td>"+
        "<td><div id ='resultdiv' style='display:none'><label style='font-size:18px;font-weight:bold'>Result: </label><textarea id='resultTextArea'></textarea></div></td></tr>"+
        "<tr><td style ='padding-top:60px'><button id='executePrerequisite' onclick='displayResultforCode(true);'>Execute</button><button id='executePrerequisite' style='margin-left:60px' onclick='displayResultforCode(false);'>Stop</button></td></tr></table>";
        showModalWindow(graph, 'Prerequisite File', maindiv, 900, 500);
        editorTextArea = document.getElementById("editorTextArea");
        resultTextArea = document.getElementById("resultTextArea");
        
        if(file_content != null){
        
            editorTextArea.value = file_content;
        
        }
        CodeMirror.fromTextArea(editorTextArea, {
        lineNumbers: true,
        lineWrapping : false
        });
        
        CodeMirror.fromTextArea(resultTextArea, {
        lineNumbers: false,
        readOnly: true
        });
    }
    
    function displayResultforCode(visible_flag){

        if(visible_flag){
            var codediv = document.getElementById("codediv");
            codediv.style.width="420px"; 
            codediv.style.height="350px";
            var resultdiv = document.getElementById("resultdiv");
            resultdiv.style.display = "block";
            resultdiv.style.width="410px"; 
            resultdiv.style.height="350px";
        }else{
            var codediv = document.getElementById("codediv");
            codediv.style.width="800px"; 
            codediv.style.height="350px";
            var resultdiv = document.getElementById("resultdiv");
            resultdiv.style.display = "none";
        }
        
       
        
    }

