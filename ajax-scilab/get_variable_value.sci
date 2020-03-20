function get_variable_value(filename,var_name)
   f_temp = mopen(filename, 'wt'); // Creating a text file
   var_name = strsubst(var_name," ","");
   if (exists(var_name) == 1) then
       cal_exp=strcat(["variable_name = eval(""",var_name,""")"]);
       execstr(cal_exp,'errcatch');
       var_type = typeof(variable_name);
       if (var_type == 'constant') then // For number/matrix value
           [m,n] = size(variable_name); // reading the size of variable
           mfprintf(f_temp, '[[');
           for y = 1:m // no. of column in variables
               for z = 1:n //no. of row in variabes
                   if (z == n) then
                       if (y == m) then
                           mfprintf(f_temp, '%d', variable_name(y,z)); //Print the variable values
                       else
                           mfprintf(f_temp, '%d],[', variable_name(y,z)); //Print the variable values
                       end
                   else
                       mfprintf(f_temp, '%d,', variable_name(y,z)); //Print the variable values
                   end
               end
            end
            mfprintf(f_temp, ']]');
        elseif (var_type == 'boolean') then // For boolean value
            if (variable_name == %t) then
                mfprintf(f_temp, '%s', 'true');
            else
                mfprintf(f_temp, '%s', 'false');
            end
        else
            mfprintf(f_temp, '%s', 'NoProperValue'); // in case value is not proper
        end
    else
        mfprintf(f_temp, 'Undefined variable: %s', var_name );
    end
    mclose(f_temp)
endfunction
