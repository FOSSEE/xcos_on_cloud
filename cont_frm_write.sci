function calculate_cont_frm(num,den)
H=cont_frm(num,den);
[A,B,C,D]=abcd(H);
cont_frm_write(A,B,C,D);
endfunction


function cont_frm_write(varargin)
    loop = argn(2) //Counting number of variables
    filename='cont_frm_value'
    printf(filename);
            fileid = strcat([pwd(), "/",filename,".txt"]) //Location of the text file 
            f_temp = mopen(fileid, 'wt')// Creating a text file
            mclose(f_temp) // Closing the text file
    for k= 1:loop //For reading and storing different variables
            variable= varargin(k) // Storing variable one at a time
            [m,n] = size(variable) // reading the size of variable
            fid = mopen(fileid, 'at') // opening the file to write the variable
    for y = 1:n // no. of rows in variables
        for z = 1:m //no. of columns in variabes
            mfprintf(fid, '%d ', variable(z,y)) //Print the variable values
        end
        mfprintf(fid, '')
    end
        mfprintf(fid, '')
    end
mclose(fid) // Closing the file
endfunction
