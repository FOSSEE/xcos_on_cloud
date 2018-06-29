function create_scifunc_popups(graph,cell,name,diagRoot){
    /*This is the code for building the file browser which opens just after double click on block*/
    var upload = document.createElement("div");
    upload.id = "file_upload";
    var heading = document.createElement("h3");
    heading.innerHTML = "Scifunc block upload SCI";
    heading.style.cssText = "margin-left: 50px";
    upload.appendChild(heading);
    var instr = document.createElement("h4");
    instr.innerHTML = "Please choose a .sci file to proceed";
    instr.style.cssText = "margin-left: 50px";
    upload.appendChild(instr);
    var input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", ".sci");
    input.id = "file";
    input.name = "file";
    input.style.cssText = "margin-left: 50px; margin-bottom: 20px";
    upload.appendChild(input);
    var ok_btn = document.createElement("button");
    ok_btn.innerHTML = "Submit";
    ok_btn.id = "ok";
    upload.appendChild(ok_btn);
    var cancel_btn = document.createElement("button");
    cancel_btn.innerHTML = "Cancel";
    cancel_btn.id = "cancel";
    upload.appendChild(cancel_btn);
    ok_btn.style.cssText = "float: left; margin-top: 48px; margin-bottom: 10px;margin-left: 15px; border: 1px solid #ffc1e3";
    cancel_btn.style.cssText = "float: right; margin-bottom: 10px; margin-right: 15px; border: 1px solid #ffc1e3";
    upload.style.cssText = "border: 1px solid black; position: absolute; margin-left: 400px; margin-top: 35px; margin-right: 480px; margin-bottom: 50px; background: url('../images/window.gif')";
    document.body.appendChild(upload);

    /*document.getElementById("ok").onmouseover = function() {
        this.style.backgroundColor = "red";
    }
    document.getElementById("ok").onmouseout = function() {
        this.style.backgroundColor = "#f3e5f5";
    }
    document.getElementById("cancel").onmouseover = function() {
        this.style.backgroundColor = "red";
    }
    document.getElementById("cancel").onmouseout = function() {
        this.style.backgroundColor = "#f3e5f5";
    }*/
    cancel_btn.onclick = function() {
        alert("Choose a .sci file to proceed!");
        document.getElementById("file_upload").style.display = "none";
    }

    ok_btn.onclick = function() {
        document.getElementById("file_upload").style.display = "none";
        var file_name = document.getElementById("file").value;
        var ext = file_name.split('.').pop();
        if(file_name == ""){
            alert("No file choosen!! Please choose a .sci file");
            return false;
        }
        if(ext != "sci"){
            alert("Invalid file chosen!! Please choose a .sci file");
            return false;
        }

        var fileInput = document.getElementById('file');
        var file = fileInput.files[0];
        var formData = new FormData()
        formData.append('file', file);
        $.ajax({
            type:"post",
            url: "/uploadsci",
            async: true,
            cache: false,
            processData: false,
            contentType: false,
            data:formData,
            success: function(msg){
                    if(msg == "File is uploaded successfully!!"){
                        alert("File got executed without any error\n\n" + msg);
                        create_popup1();
                        return true;
                    }
                    else{
                        if(msg == "System calls are not allowed in .sci file!\nPlease upload another .sci file!!"){
                            alert("Execution Error Found:\n" + msg)
                            return false;
                        }
                        else{
                            alert("Error encountered while executing file:\n" + msg);
                            return false;
                        }
                    }
            },
            error: function(msg){
                alert("An error occured while uploading file, please try again!");
                return false;
            }
        });


        /*code for 1st popup*/
        function create_popup1(){
            document.getElementById("file_upload").style.display = "none";
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
                    /*creating labels and inputs for popup1*/
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
            popup1submit_btn.innerHTML = 'Submit';
            popup1submit_btn.type = "button";
            popup1submit_btn.name = "submit";

            popup1submit_btn.onclick = function() {

                var propertiesObject = {
                    id: cell.id
                };
                for (var key in defaultProperties) { 
                    if (defaultProperties.hasOwnProperty(key)) {
                        propertiesObject[key] = document.getElementById(key.toString()).value;
                        if(key.toString()=="in1"){
                            var in1 = document.getElementById(key.toString()).value;
                            var pattern = "\[\]|\[[0-9]{1},[0-9]{1}\]|\[[0-9]{1},[0-9]{1};[0-9]{1},[0-9]{1}\]";
                            if(!in1.match(pattern)){
                                alert("Enter input of form [1,1] or [1,1;1,1] in input port size");
                                return false;
                            }
                        }
                        if(key.toString()=="out"){
                            var out = document.getElementById(key.toString()).value;
                            var pattern = "\[\]|\[[0-9]{1},[0-9]{1}\]|\[[0-9]{1},[0-9]{1};[0-9]{1},[0-9]{1}\]";
                            if(!out.match(pattern)){
                                alert("Enter input of form [1,1] or [1,1;1,1] in output port size");
                                return false;
                            }
                        }
                        if(key.toString()=="clkin"){
                            var clkin = document.getElementById(key.toString()).value;
                            var pattern = "\[\]|\[[0-9]{1}|\[[0-9]{1};[0-9]{1}\]";
                            if(clkin != ""){
                                if(!clkin.match(pattern)||clkin == ""){
                                    alert("Enter input of form [1] or [1;1] in input event port size");
                                    return false;
                                }
                            }
                        }
                        if(key.toString()=="clkout"){
                            var clkout = document.getElementById(key.toString()).value;
                            var pattern = "\[\]|\[[0-9]{1}|\[[0-9]{1};[0-9]{1}\]";
                            if(clkout != ""){
                                if(!clkout.match(pattern)){
                                    alert("Enter input of form [1] or [1;1] in output event port size");
                                    return false;
                                }
                            }
                        }
                        if(key.toString()=="x0"){
                            var x0 = document.getElementById(key.toString()).value;
                            var pattern = "\[\]|\[[0-9]{1}|\[[0-9]{1};[0-9]{1}\]";
                            if(x0 != ""){
                                if(!x0.match(pattern)){
                                    alert("Enter input of form [1] or [1;1] in initial continuous state");
                                    return false;
                                }
                            }
                        }
                        if(key.toString()=="z0"){
                            var z0 = document.getElementById(key.toString()).value;
                            var pattern = "\[\]|\[[0-9]{1}|\[[0-9]{1};[0-9]{1}\]";
                            if(z0 != ""){
                                if(!z0.match(pattern)){
                                    alert("Enter input of form [1] or [1;1] in initial discrete state");
                                    return false;
                                }
                            }
                        }
                        if(key.toString()=="rpar"){
                            var rpar = document.getElementById(key.toString()).value;
                            var pattern = "\[\]|\[[0-9]{1}|\[[0-9]{1};[0-9]{1}\]";
                            if(rpar != ""){
                                if(!rpar.match(pattern)){
                                    alert("Enter input of form [1] or [1;1] in system parameters vector");
                                    return false;
                                }
                            }
                        }
                        if(key.toString()=="auto"){
                            var auto = document.getElementById(key.toString()).value;
                            var pattern = "\[\]|\[[0-9]{1}|\[[0-9]{1};[0-9]{1}\]";
                            if(auto != ""){
                                if(!auto.match(pattern)){
                                    alert("Enter input of form [1] or [1;1] in initial firing vector");
                                    return false;
                                }
                            }
                        }
                        if(key.toString()=="it"){
                            var it = document.getElementById(key.toString()).value;
                            if(isNaN(it) || it == ""){
                                alert("Incorrect value assigned to: is block always active");
                                return false;
                            }
                        }
                    }
                }
                wind1.destroy();
                /*calling appropriate popup depending on the different inputs given in popup1*/
                if(out.length != 0){
                    create_popup2(out,clkin,clkout,x0,z0,propertiesObject,defaultProperties);
                }
                else{
                    if(!x0==""){
                        create_popup3(out,clkin,clkout,x0,z0,propertiesObject,defaultProperties);
                    }
                    else{
                        if(!z0==""){
                            create_popup4(out,clkin,clkout,x0,z0,propertiesObject,defaultProperties);
                        }
                        else{
                            if(!clkin=="" && !clkout==""){
                                create_popup5(out,clkin,clkout,x0,z0,propertiesObject,defaultProperties);
                            }
                            else{
                                create_popup6(out,clkin,clkout,x0,z0,propertiesObject,defaultProperties);
                            }
                        }
                    }
                }
            }

            var popup1reset_btn = document.createElement("button");
            popup1reset_btn.innerHTML = 'Reset';
            popup1reset_btn.type = "button";
            popup1reset_btn.name = "submit";
            popup1reset_btn.id = "resetButtonProperties1";
            popup1reset_btn.onclick = function() {
            // Reset
                for (var key in defaultProperties) {
                    if (defaultProperties.hasOwnProperty(key)) {
                        console.log(document.getElementById(key.toString()));
                        var element = document.getElementById(key.toString());
                        element.value = defaultProperties[key][1];
                    }
                }
            };

            popup1form.appendChild(popup1reset_btn);
            popup1head.style.cssText = "margin-left: 15px";
            popup1form.style.cssText = "margin-left: 15px";
            popup1reset_btn.style.cssText = "margin-top: 20px; margin-right: 15px; float: right";
            popup1submit_btn.style.cssText = "margin-top: 20px";
            popup1div.style.cssText = "border: 1px solid black";
            popup1form.appendChild(popup1submit_btn);
            popup1div.appendChild(popup1form);

            height = 135 + 26 * defaultProperties.length + 15;
            var wind1 = showModalWindow(graph, 'Properties', popup1div, 450, height);
        }

        function create_popup2(out,clkin,clkout,x0,z0,propertiesObject,defaultProperties){
            /*creating popup2*/
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

            var popuplabels = new Array();
            for(var i=5; i<=out.length; i=i+4){
                /*creating labels dynamically in popup2 depending on the no. of outport ports in popup1*/
                popuplabels[i] = new Array();
                popuplabels[i][0] = document.createElement("label");
                popup2form.appendChild(popuplabels[i][0]);
                var linebreak = document.createElement("br");
                popup2form.appendChild(linebreak);
                if(i == 5){
                    popuplabels[i][0].innerHTML = "y1 = sin(u1)";
                }
                if(i == 9){
                    popuplabels[i][0].innerHTML = "y2 = sin(u1)";
                }
                if(i == 13){
                    popuplabels[i][0].innerHTML = "y3 = sin(u1)";
                }
                if(i == 17){
                    popuplabels[i][0].innerHTML = "y4 = sin(u1)";
                }
                if(i == 21){
                    popuplabels[i][0].innerHTML = "y5 = sin(u1)";
                }
                if(i == 25){
                    popuplabels[i][0].innerHTML = "y6 = sin(u1)";
                }
                if(i == 29){
                    popuplabels[i][0].innerHTML = "y7 = sin(u1)";
                }
            }


            var popup2label5 = document.createElement("label");
            popup2label5.innerHTML =  "as a function of t, u1 n_evi";
            popup2form.appendChild(popup2label5);
            var linebreak = document.createElement("br");
            popup2form.appendChild(linebreak);

            var popupinputs = new Array();
            for(var i=5; i<=out.length; i=i+4){
                /*creating inputs dynamically in popup2 depending on the no. of outport ports in popup1*/
                popupinputs[i] = new Array();
                popupinputs[i][0] = document.createElement("input");
                popupinputs[i][0].style.cssText = "width: 340px";
                popup2form.appendChild(popupinputs[i][0]);
                var linebreak = document.createElement("br");
                popup2form.appendChild(linebreak);
                if(i == 5){
                    popupinputs[i][0].value = "y1 = sin(u1)";
                    popupinputs[i][0].id = "p2input1";
                }
                if(i == 9){
                    popupinputs[i][0].value = "y2 = sin(u1)";
                    popupinputs[i][0].id = "p2input2";
                }
                if(i == 13){
                    popupinputs[i][0].value = "y3 = sin(u1)";
                    popupinputs[i][0].id = "p2input3";
                }
                if(i == 17){
                    popupinputs[i][0].value = "y4 = sin(u1)";
                    popupinputs[i][0].id = "p2input4";
                }
                if(i == 21){
                    popupinputs[i][0].value = "y5 = sin(u1)";
                    popupinputs[i][0].id = "p2input5";
                }
                if(i == 25){
                    popupinputs[i][0].value = "y6 = sin(u1)";
                    popupinputs[i][0].id = "p2input6";
                }
                if(i == 29){
                    popupinputs[i][0].value = "y7 = sin(u1)";
                    popupinputs[i][0].id = "p2input7";
                }
            }


            var popup2submit_btn = document.createElement("button");
            popup2submit_btn.innerHTML = "Submit";
            popup2submit_btn.type = "button";
            popup2submit_btn.onclick = function() {
                var popup2value1 = document.getElementById("p2input1").value;
                if(popup2value1 == ""){
                    alert("y is not defined");
                    return false;
                }
                if(out.length == 5){
                    if(popup2value1 == ""){
                        alert("y is not defined");
                        return false;
                    }
                    var popup2value = [popup2value1];
                    propertiesObject["popup2value"] = popup2value;    
                }
                if(out.length == 9){
                    var popup2value1 = document.getElementById("p2input1").value;
                    var popup2value2 = document.getElementById("p2input2").value;
                    if(popup2value1 == "" || popup2value2 == ""){
                        alert("y is not defined");
                        return false;
                    }
                    var popup2value = [popup2value1,popup2value2];
                    propertiesObject["popup2value"] = popup2value;    
                }
                if(out.length == 13){
                    var popup2value1 = document.getElementById("p2input1").value;
                    var popup2value2 = document.getElementById("p2input2").value;
                    var popup2value3 = document.getElementById("p2input3").value;
                    if(popup2value1 == "" || popup2value2 == "" || popup2value3 == ""){
                            alert("y is not defined");
                            return false;
                    }
                    var popup2value = [popup2value1,popup2value2,popup2value3];
                    propertiesObject["popup2value"] = popup2value;    
                }
                if(out.length == 17){
                    if(popup2value1 == "" || popup2value2 == "" || popup2value3 == "" || popup2value4 == ""){
                            alert("y is not defined");
                            return false;
                    }
                    var popup2value1 = document.getElementById("p2input1").value;
                    var popup2value2 = document.getElementById("p2input2").value;
                    var popup2value3 = document.getElementById("p2input3").value;
                    var popup2value4 = document.getElementById("p2input4").value;
                    var popup2value = [popup2value1,popup2value2,popup2value3,popup2value4];
                    propertiesObject["popup2value"] = popup2value;    
                }
                if(out.length == 21){
                    if(popup2value1 == "" || popup2value2 == "" || popup2value3 == "" || popup2value4 == "" || popup2value5 == ""){
                            alert("y is not defined");
                            return false;
                    }
                    var popup2value1 = document.getElementById("p2input1").value;
                    var popup2value2 = document.getElementById("p2input2").value;
                    var popup2value3 = document.getElementById("p2input3").value;
                    var popup2value4 = document.getElementById("p2input4").value;
                    var popup2value5 = document.getElementById("p2input5").value;
                    var popup2value = [popup2value1,popup2value2,popup2value3,popup2value4,popup2value5];
                    propertiesObject["popup2value"] = popup2value;    
                }
                if(out.length == 25){
                    if(popup2value1 == "" || popup2value2 == "" || popup2value3 == "" || popup2value4 == "" || popup2value5 == "" || popup2value6 == ""){
                            alert("y is not defined");
                            return false;
                    }
                    var popup2value1 = document.getElementById("p2input1").value;
                    var popup2value2 = document.getElementById("p2input2").value;
                    var popup2value3 = document.getElementById("p2input3").value;
                    var popup2value4 = document.getElementById("p2input4").value;
                    var popup2value5 = document.getElementById("p2input5").value;
                    var popup2value6 = document.getElementById("p2input6").value;
                    var popup2value = [popup2value1,popup2value2,popup2value3,popup2value4,popup2value5,popup2value6];
                    propertiesObject["popup2value"] = popup2value;    
                }
                if(out.length == 29){
                    if(popup2value1 == "" || popup2value2 == "" || popup2value3 == "" || popup2value4 == "" || popup2value5 == "" || popup2value6 == "" || popup2value7 == ""){
                            alert("y is not defined");
                            return false;
                    }
                    var popup2value1 = document.getElementById("p2input1").value;
                    var popup2value2 = document.getElementById("p2input2").value;
                    var popup2value3 = document.getElementById("p2input3").value;
                    var popup2value4 = document.getElementById("p2input4").value;
                    var popup2value5 = document.getElementById("p2input5").value;
                    var popup2value6 = document.getElementById("p2input6").value;
                    var popup2value7 = document.getElementById("p2input7").value;
                    var popup2value = [popup2value1,popup2value2,popup2value3,popup2value4,popup2value5,popup2value6,popup2value7];
                    propertiesObject["popup2value"] = popup2value;    
                }

                wind2.destroy();
                /*calling appropriate popup depending on the conditions*/
                if(!x0==""){
                    create_popup3(out,clkin,clkout,x0,z0,propertiesObject,defaultProperties);
                }
                else{
                    if(!z0==""){
                        create_popup4(out,clkin,clkout,x0,z0,propertiesObject,defaultProperties);
                    }
                    else{
                        if(!clkin=="" && !clkout==""){
                            create_popup5(out,clkin,clkout,x0,z0,propertiesObject,defaultProperties);
                        }
                        else{
                            create_popup6(out,clkin,clkout,x0,z0,propertiesObject,defaultProperties);
                        }
                    }
                }
            }
            var popup2reset_btn = document.createElement("button");
            popup2reset_btn.innerHTML = 'Reset';
            popup2reset_btn.type = "button";
            popup2reset_btn.name = "submit";
            popup2reset_btn.id = "resetButtonProperties2";
            popup2reset_btn.onclick = function() {
                document.getElementById("p2input").value = "y1=sin(u1)";
            }
            popup2form.appendChild(popup2reset_btn);
            popup2head.style.cssText = "margin-left: 15px";
            popup2form.style.cssText = "margin-left: 15px";
            popup2submit_btn.style.cssText = "margin-top: 20px";
            popup2reset_btn.style.cssText = "float: right; margin-top: 20px; margin-right: 15px";
            popup2div.style.cssText = "border: 1px solid black";
            popup2form.appendChild(popup2submit_btn);
            popup2div.appendChild(popup2form);

            height = 135 + 26 * defaultProperties.length + 15;
            var wind2 = showModalWindow(graph, 'Properties', popup2div, 450, height);

        }


        function create_popup3(out,clkin,clkout,x0,z0,propertiesObject,defaultProperties){
            /*creating popup3*/
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
                if(popup3value == "xd =" || popup3value == "xd=" || popup3value == "xd= " || popup3value == "xd = " || popup3value == ""){
                    alert("You did not define xd");
                    return false;
                }
                propertiesObject["popup3value"] = popup3value;
                wind3.destroy();      
                /*calling appropriate popup depending on conditions*/
                if(!z0==""){
                    create_popup4(out,clkin,clkout,x0,z0,propertiesObject,defaultProperties);
                }
                else{
                    if(!clkin=="" && !clkout==""){
                        create_popup5(out,clkin,clkout,x0,z0,propertiesObject,defaultProperties);
                    }
                    else{
                        create_popup6(out,clkin,clkout,x0,z0,propertiesObject,defaultProperties);
                    }
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


        function create_popup4(out,clkin,clkout,x0,z0,propertiesObject,defaultProperties){
            /*creating popup4*/
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

            if(!x0==""){
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
                /*calling appropriate popup depending on conditions*/
                if(!clkin=="" && !clkout==""){
                    create_popup5(out,clkin,clkout,x0,z0,propertiesObject,defaultProperties);
                }
                else{
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


        function create_popup5(out,clkin,clkout,x0,z0,propertiesObject,defaultProperties){
            /*creating popup5*/
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
                /*calling popup6 because popup6, popup7 always open*/
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

        function create_popup6(out,clkin,clkout,x0,z0,propertiesObject,defaultProperties){
            /*creating popup6*/
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
            if(!x0=="" && !z0==""){
                var popup6label2 = document.createElement("label");
                popup6label2.innerHTML = "You may also reinitialize";
                popup6form.appendChild(popup6label2);
                var linebreak = document.createElement("br");
                popup6form.appendChild(linebreak);
            }
            if(!x0==""){
                var popup6label3 = document.createElement("label");
                popup6label3.innerHTML = "-Continuous state x(size:1)";
                popup6form.appendChild(popup6label3);
                var linebreak = document.createElement("br");
                popup6form.appendChild(linebreak);
            }
            if(!z0==""){
                var popup6label4 = document.createElement("label");
                popup6label4.innerHTML = "-discrete state z(size:1)";
                popup6form.appendChild(popup6label4);
                var linebreak = document.createElement("br");
                popup6form.appendChild(linebreak);
            }
            /*creating different labels depending on the previous popups which were opened*/
            if(!x0=="" && !z0==""){
                var popup6label5 = document.createElement("label");
                popup6label5.innerHTML = "as function(s) of x,z,";
                popup6form.appendChild(popup6label5);
                var linebreak = document.createElement("br");
                popup6form.appendChild(linebreak);   
            }   
            else{
                if(!x0==""){
                    var popup6label6 = document.createElement("label");
                    popup6label6.innerHTML = "as function(s) of x,";
                    popup6form.appendChild(popup6label6);
                    var linebreak = document.createElement("br");
                    popup6form.appendChild(linebreak);
                }
                else{
                    if(!z0==""){
                        var popup6label7 = document.createElement("label");
                        popup6label7.innerHTML = "as function(s) of z,";
                        popup6form.appendChild(popup6label7);
                        var linebreak = document.createElement("br");
                        popup6form.appendChild(linebreak);
                    }
                    else{
                        var popup6label8 = document.createElement("label");
                        popup6label8.innerHTML = "as function(s) of ";
                        popup6form.appendChild(popup6label8);
                        var linebreak = document.createElement("br");
                        popup6form.appendChild(linebreak);
                    }
                }
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
                /*calling popup7 as always after popup6, popup7 opens*/
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
            /*creating popup7*/
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

            if(!x0=="" && !z0==""){
                var popup7label2 = document.createElement("label");
                popup7label2.innerHTML = "You may also change final value of:";
                popup7form.appendChild(popup7label2);
                var linebreak = document.createElement("br");
                popup7form.appendChild(linebreak);
            }
            if(!x0==""){
                var popup7label3 = document.createElement("label");
                popup7label3.innerHTML = "-Continuous state x(size:1)";
                popup7form.appendChild(popup7label3);
                var linebreak = document.createElement("br");
                popup7form.appendChild(linebreak);
            }
            if(!z0==""){
                var popup7label4 = document.createElement("label");
                popup7label4.innerHTML = "-discrete state z(size:1)";
                popup7form.appendChild(popup7label4);
                var linebreak = document.createElement("br");
                popup7form.appendChild(linebreak);
            }
            if(!x0=="" && !z0==""){
                var popup7label5 = document.createElement("label");
                popup7label5.innerHTML = "as function(s) of x,z,";
                popup7form.appendChild(popup7label5);
                var linebreak = document.createElement("br");
                popup7form.appendChild(linebreak);   
            }   
            else{
                if(!x0==""){
                    var popup7label6 = document.createElement("label");
                    popup7label6.innerHTML = "as function(s) of x,";
                    popup7form.appendChild(popup7label6);
                    var linebreak = document.createElement("br");
                    popup7form.appendChild(linebreak);
                }
                else{
                    if(!z0==""){
                        var popup7label7 = document.createElement("label");
                        popup7label7.innerHTML = "as function(s) of z,";
                        popup7form.appendChild(popup7label7);
                        var linebreak = document.createElement("br");
                        popup7form.appendChild(linebreak);
                    }
                    else{
                        var popup7label8 = document.createElement("label");
                        popup7label8.innerHTML = "as function(s) of ";
                        popup7form.appendChild(popup7label8);
                        var linebreak = document.createElement("br");
                        popup7form.appendChild(linebreak);
                    }
                }
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
                if(out.length != 0){
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

            if(!x0==""){
                var popup8label4 = document.createElement("label");
                popup8label4.innerHTML = "-state x(size:1)";
                popup8form.appendChild(popup8label4);
                var linebreak = document.createElement("br");
                popup8form.appendChild(linebreak);
            }
            if(!z0==""){
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
            for(var i=9; i<=out.length; i=i+4){
                popuplabels[i] = new Array();
                popuplabels[i][0] = document.createElement("label");
                popup8form.appendChild(popuplabels[i][0]);
                var linebreak = document.createElement("br");
                popup8form.appendChild(linebreak);
                if(i == 9){
                    popuplabels[i][0].innerHTML = "-output y2(size:1)";
                }
                if(i == 13){
                    popuplabels[i][0].innerHTML = "-output y3(size:1)";
                }
                if(i == 17){
                    popuplabels[i][0].innerHTML = "-output y4(size:1)";
                }
                if(i == 21){
                    popuplabels[i][0].innerHTML = "-output y5(size:1)";
                }
                if(i == 25){
                    popuplabels[i][0].innerHTML = "-output y6(size:1)";
                }
                if(i == 29){
                    popuplabels[i][0].innerHTML = "-output y7(size:1)";
                }
            }

            if(!x0=="" && !z0==""){
                var popup8label7 = document.createElement("label");
                popup8label7.innerHTML = "as function(s) of x,z,u1,";
                popup8form.appendChild(popup8label7);
                var linebreak = document.createElement("br");
                popup8form.appendChild(linebreak);   
            }   
            else{
                if(!x0==""){
                    var popup8label8 = document.createElement("label");
                    popup8label8.innerHTML = "as function(s) of x,u1,";
                    popup8form.appendChild(popup8label8);
                    var linebreak = document.createElement("br");
                    popup8form.appendChild(linebreak);
                }
                else{
                    if(!z0==""){
                        var popup8label9 = document.createElement("label");
                        popup8label9.innerHTML = "as function(s) of z,u1,";
                        popup8form.appendChild(popup8label9);
                        var linebreak = document.createElement("br");
                        popup8form.appendChild(linebreak);
                    }
                    else{
                        var popup8label10 = document.createElement("label");
                        popup8label10.innerHTML = "as function(s) of u1,";
                        popup8form.appendChild(popup8label10);
                        var linebreak = document.createElement("br");
                        popup8form.appendChild(linebreak);
                    }
                }
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
            for(var i=5; i<=out.length; i=i+4){
                popupinputs[i] = new Array();
                popupinputs[i][0] = document.createElement("input");
                popupinputs[i][0].style.cssText = "width: 340px";
                popup8form.appendChild(popupinputs[i][0]);
                var linebreak = document.createElement("br");
                popup8form.appendChild(linebreak);
                if(i == 5){
                    popupinputs[i][0].value = "y1 = []";
                    popupinputs[i][0].id = "p8input3";
                }
                if(i == 9){
                    popupinputs[i][0].value = "y2 = []";
                    popupinputs[i][0].id = "p8input4";
                }
                if(i == 13){
                    popupinputs[i][0].value = "y3 = []";
                    popupinputs[i][0].id = "p8input5";
                }
                if(i == 17){
                    popupinputs[i][0].value = "y4 = []";
                    popupinputs[i][0].id = "p8input6";
                }
                if(i == 21){
                    popupinputs[i][0].value = "y5 = []";
                    popupinputs[i][0].id = "p8input7";
                }
                if(i == 25){
                    popupinputs[i][0].value = "y6 = []";
                    popupinputs[i][0].id = "p8input8";
                }
                if(i == 29){
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
                if(out.length == 5){
                    var popup8value = [popup8value1, popup8value2, popup8value3];                     
                    propertiesObject["popup8value"] = popup8value;
                }
                if(out.length == 9){
                    var popup8value4 = document.getElementById("p8input4").value;    
                    var popup8value = [popup8value1, popup8value2, popup8value3, popup8value4];
                    propertiesObject["popup8value"] = popup8value;
                }
                if(out.length == 13){
                    var popup8value4 = document.getElementById("p8input4").value;
                    var popup8value5 = document.getElementById("p8input5").value; 
                    var popup8value = [popup8value1, popup8value2, popup8value3, popup8value4, popup8value5];
                    propertiesObject["popup8value"] = popup8value;
                }
                if(out.length == 17){
                    var popup8value4 = document.getElementById("p8input4").value;
                    var popup8value5 = document.getElementById("p8input5").value;
                    var popup8value6 = document.getElementById("p8input6").value;
                    var popup8value = [popup8value1, popup8value2, popup8value3, popup8value4, popup8value5, popup8value6];
                    propertiesObject["popup8value"] = popup8value;
                }
                if(out.length == 21){
                    var popup8value4 = document.getElementById("p8input4").value; 
                    var popup8value5 = document.getElementById("p8input5").value;
                    var popup8value6 = document.getElementById("p8input6").value;
                    var popup8value7 = document.getElementById("p8input7").value;
                    var popup8value = [popup8value1, popup8value2, popup8value3, popup8value4, popup8value5, popup8value6,popup8value7];
                    propertiesObject["popup8value"] = popup8value;
                }
                if(out.length == 25){
                    var popup8value4 = document.getElementById("p8input4").value;
                    var popup8value5 = document.getElementById("p8input5").value; 
                    var popup8value6 = document.getElementById("p8input6").value;
                    var popup8value7 = document.getElementById("p8input7").value;
                    var popup8value8 = document.getElementById("p8input8").value;
                    var popup8value = [popup8value1, popup8value2, popup8value3, popup8value4, popup8value5, popup8value6, popup8value7, popup8value8];
                    propertiesObject["popup8value"] = popup8value;
                }
                if(out.length == 29){
                    var popup8value4 = document.getElementById("p8input4").value;
                    var popup8value5 = document.getElementById("p8input5").value;
                    var popup8value6 = document.getElementById("p8input6").value;
                    var popup8value7 = document.getElementById("p8input7").value;
                    var popup8value8 = document.getElementById("p8input8").value;
                    var popup8value9 = document.getElementById("p8input9").value;
                    var popup8value = [popup8value1, popup8value2, popup8value3, popup8value4, popup8value5, popup8value6, popup8value7, popup8value8, popup8value9];
                    propertiesObject["popup8value"] = popup8value;
                }

                /*  
                    Loading XML of last graph configuration so that all the links
                    nodes of the previous xml can be copied to the new XML 
                */
                
                var encPrevXml = new mxCodec(mxUtils.createXmlDocument());
                var nodePrevXml = encPrevXml.encode(diagRoot);
                var strPrevXml = mxUtils.getPrettyXml(nodePrevXml);
                strPrevXml = mxUtils.parseXml(strPrevXml);
                var xslPrevXml = trySomething("finalmodsheet.xsl"); 
                function trySomething(x) {
                    if (window.ActiveXObject) {
                        xhttp = new ActiveXObject("Msxml2.XMLHTTP");
                    } else {
                        xhttp = new XMLHttpRequest();
                    }
                    xhttp.open("GET", x, false);
                    try {
                        xhttp.responseType = "msxml-document"
                    } catch (err) {}
                    xhttp.send("");
                    return xhttp.responseXML;
                }
                var xsltProcessorPrevXml = new XSLTProcessor();
                xsltProcessorPrevXml.importStylesheet(xslPrevXml);
                var resultDocumentPrevXml = xsltProcessorPrevXml.transformToDocument(strPrevXml);
                /*
                    Maverick
                    Using resultDocument.documentElement to remove an additional tag "<#document>" created by the XSLTProcessor.
                */
                strPrevXml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\n" + mxUtils.getPrettyXml(resultDocumentPrevXml.documentElement);
                strPrevXml = strPrevXml.replace(/\n\n/g, "\n");
                strPrevXml = strPrevXml.replace(/\n*/, '');
                strPrevXml = strPrevXml.replace(/>\s*</g, '><');
                strPrevXml = strPrevXml.replace(/<!--[\s\S]*?-->/g, '');
                var docPrevXml = mxUtils.parseXml(strPrevXml);
                var codecPrevXml = new mxCodec(docPrevXml);
                var rootNode = docPrevXml.documentElement;
                while(rootNode.nodeName != 'root')
                    {
                        rootNode = rootNode.firstChild;
                    }
                var currentNode = rootNode.firstChild;

                var parent = graph.getDefaultParent();
                var model = graph.getModel();
                var v1 = null;
                var doc = mxUtils.createXmlDocument();
                model.beginUpdate();
                try {
                    var geometry = cell.getGeometry();
                    var x=geometry.x;
                    var y=geometry.y;

                    var details_instance = new window[name]();
                    var details = cell.blockInstance.instance.set(propertiesObject); //window[name]("set",cell.value,propertiesObject);
                    //pass_c(c);
            
                    editor.execute('deleteBlock',(editor, cell));
                    var enc = new mxCodec(mxUtils.createXmlDocument());
                    var node = enc.encode(details);
                    var temp = enc.encode(parent);
         
                    // Get the stylesheet for the graph
                    var stylesheet = graph.getStylesheet();
                    // From the stylesheet, get the style of the particular block
                    var style = stylesheet.styles[name];
         
                    /*
                     * When a particular block is loaded for the first time,
                     * the image in the style of the block will be a path to the image.
                     * Set the label in the style property of the block has a html image,
                     * and set the image in the style property as null
                     *
                     * NOTE: Since the image of any block need not be changed for
                     *       for every movement of that block, the image must be
                     *       set only once.
                     */
             
                    if (style != null && style['image'] != null) {
         
                        // Make label as a image html element
                        var label = '<img src="' + style['image'] + '" height="80" width="80">';
                        // Set label
                        style['label'] = label;
 
                        style['imagePath'] = style['image'];
         
                        // Set image as null
                        style['image'] = null;
         
                        // Add the label as a part of node
                        node.setAttribute('label', label);
                    }
         
                    /*
                     * If a particular block with image tag in it's style property
                     * has been invoked already, the image tag would be null for any
                     * successive instances of the same block. Hence, set the label
                     * from the label tag in style which was set when that blockModel
                     * was invoked on the first time.
                     */
                    //console.log(node);
                    if (style != null && style['label'] != null) {
         
                        // Set label from the label field in the style property
                        node.setAttribute('label', style['label']);
                    }
                    //console.log(temp.getAttribute("id"));
                    node.setAttribute("parent", temp.getAttribute("id"));
                    //node.parent = temp.getAttribute("id");
                    var i, arr = [];
         
                    var details_instance=cell.blockInstance.instance;
        
                    var blockModel = details_instance.x.model;
                    var graphics = details_instance.x.graphics;
         
                    /* To determine number and type of Port*/
                    var inputPorts = [],
                    outputPorts = [],
                    controlPorts = [],
                    commandPorts = [];
                    if (blockModel.in.height != null) {
                        arr = getData(graphics.in_implicit);
                        if (arr.length != 0) {
                            inputPorts = arr;
                        }
                        else {
                            for (i = 0; i < blockModel.in.height; i++) {
                                inputPorts.push("E");
                            }
                        }
                    }
                    if (blockModel.out.height != null) {
                        arr = getData(graphics.out_implicit);
                        if (arr.length != 0) {
                            outputPorts = arr;
                        }
                        else {
                            for (i = 0; i < blockModel.out.height; i++) {
                                outputPorts.push("E");
                            }
                        }
                    }
                    if (blockModel.evtin.height != null) {
                        for (i = 0; i < blockModel.evtin.height; i++) {
                            controlPorts.push("CONTROL");
                        }
                    }
                    if (blockModel.evtout.height != null) {
                        for (i = 0; i < blockModel.evtout.height; i++) {
                            commandPorts.push("COMMAND");
                        }
                    }
                    v1 = graph.insertVertex(parent, null, node, x, y, 80, 80, name);

                    // @Chhavi: Additional attribute to store the block's instance
                    v1.blockInstance = createInstanceTag(details_instance);
                    v1.currentAngle = 0;
                    v1.flipX = 1;
                    v1.flipY = 1;
                    createPorts(graph, v1, inputPorts, controlPorts, outputPorts, commandPorts);
                    v1.setConnectable(false);
                } 
                finally {
                    model.endUpdate();
                }

                 /*  The code below is responsible for moving the new (non-links) node created after the set
                    function is called back to their previous positions as in their previous XML.
                    This is done to retain the id's so that the Link node of previous XML can be used 
                    to create connecting wires for the new XML also.
                */

                var referenceModelCount = referenceModelProps.length;
                var missingKeys = [];
                var lastId = Math.max(...Object.keys(model.cells));

                for( var i=0;i< referenceModelCount ; i++)
                {
                    var present = false;
                    for(var key in model.cells)
                        {
                            (model.cells.hasOwnProperty(key))
                            {
                                if(referenceModelProps[i].id == key)
                                    {
                                        present = true;
                                        break;
                                    }
                            }
                        }
                    if(present == false)
                        missingKeys.push(referenceModelProps[i].id);
                }

                var newIDs= [];
                for(var i=modelNextId;i<=lastId;i++)
                    newIDs.push(i);
                var j = 0;

                for(var i = 0; i < missingKeys.length; i++)
                    {   
                        var referenceModelStyle = referenceModelProps.find( function (obj) {
                            return obj.id == missingKeys[i];
                        }).style;
                        
                        if(model.cells[newIDs[j]].style.endsWith('Port')) {
                            if( referenceModelStyle == model.cells[newIDs[j]].style ) {
                                model.cells[missingKeys[i]] = model.cells[newIDs[j]];
                                model.cells[missingKeys[i]].id = String(missingKeys[i]);
                                delete model.cells[newIDs[j++]];
                            }
                            else {
                                var tempId = j;
                                while(newIDs[++j] <= lastId )
                                {
                                    if(referenceModelStyle == model.cells[newIDs[j]].style) {
                                        model.cells[missingKeys[i]] = model.cells[newIDs[j]];
                                        model.cells[missingKeys[i]].id = String(missingKeys[i]);
                                        delete model.cells[newIDs[j]];
                                        newIDs.splice(j,1);
                                        j = tempId;
                                        break;
                                    }    
                                }
                            } 
                        }
                        else if (model.cells[newIDs[j]].style) {
                            model.cells[missingKeys[i]] = model.cells[newIDs[j]];
                            model.cells[missingKeys[i]].id = String(missingKeys[i]);
                            delete model.cells[newIDs[j++]];
                        }
                    }
                referenceModelProps = [];
                newIDs = [];
                
                model.beginUpdate();
                try {
                    // Connecting the blocks by inserting link nodes                          
                    while(currentNode!=null)
                    {
                        var curNodeName = currentNode.nodeName;
                        if(curNodeName.endsWith('Link'))
                           {
                               var pointsArray = [];
                               var newSourceCell = graph.getModel().getCell(currentNode.getAttribute('source'));
                               var newTargetCell = graph.getModel().getCell(currentNode.getAttribute('target'));
                                   
                                if(newSourceCell.getEdgeCount() <=0 && newTargetCell.getEdgeCount()<=0) {

                                   var childNode = currentNode.firstChild;
                                        if (childNode != null) {
                                            if (childNode.nodeName == 'mxGeometry') {
                                                var tempNode = childNode.firstChild;
                                                if (tempNode != null) {
                                                    if (tempNode.nodeName == 'mxPoint') {
                                                        pointsArray.push(new mxPoint(tempNode.getAttribute('x'), tempNode.getAttribute('y')));
                                                    } else {
                                                        if (tempNode.nodeName == 'Array') {
                                                            var mxPointNode = tempNode.firstChild;
                                                            while (mxPointNode != null) {
                                                                pointsArray.push(new mxPoint(mxPointNode.getAttribute('x'), mxPointNode.getAttribute('y')));
                                                                mxPointNode = mxPointNode.nextSibling;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }

                                    createEdgeObject(graph, newSourceCell, newTargetCell, null);
                                }
                           }
                        currentNode=currentNode.nextSibling;
                    } 

                } finally {
                    model.endUpdate();
                }

                graph.setSelectionCell(v1);

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
}
