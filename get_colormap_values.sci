function getvaluesfromcolormap(filename,colormapstring)
    f_temp = mopen(filename, 'wt'); // Creating a text file
    string_to_pass = strcat(["cmp_value_from_script = [",colormapstring,"]"]); //forming string
    ok = execstr(string_to_pass,'errcatch');
    if (ok~=0) then
        mfprintf(f_temp, '%s',  lasterror()); //catch error message if any
    else
        cmp_array = cmp_value_from_script(:); //converts to one dimensional array
        arry_size = size(cmp_array); // gives array of size eg. 96 1
        arry_length = arry_size(1); //Get size of array eg. 96
        mfprintf(f_temp, '[');
        for i = 1:arry_length
            if i == arry_length then
            mfprintf(f_temp, '%g', cmp_array(i)); //print values of array
            else
            mfprintf(f_temp, '%g,', cmp_array(i)); // print values of array
            end
        end
        mfprintf(f_temp, ']');
    end
endfunction
