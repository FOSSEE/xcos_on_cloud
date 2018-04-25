function affichm(varargin) 
    loop = argn(2); //Counting number of variables
    filename='scilab-log-'+string(getpid())+''
            fileid = strcat([pwd(), "/",filename,".txt"]); //Location of the text file 
            f_temp = mopen(fileid, 'wt');// Creating a text file
            mclose(f_temp); // Closing the text file
    for k= 1:loop //For reading and storing different variables
            variable= varargin(k).values; // Storing variable one at a time
            [m,n] = size(variable); // reading the size of variable
            fid = mopen(fileid, 'at'); // opening the file to write the variable
    for y = 1:m // no. of rows in variables
        for z = 1:n //no. of columns in variabes
            mfprintf(fid, ' %f', variable(y,z)); //Print the variable values
        end
        mfprintf(fid, '\n'); 
    end
        mfprintf(fid, '\n');
    end
mclose(fid); // Closing the file
endfunction
