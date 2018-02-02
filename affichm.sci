function affichm(filename, varargin)
    loop = argn(2)-1;
            fileid = strcat([pwd(), "/",filename,".txt"]);
            f_temp = mopen(fileid, 'wt');
            mclose(f_temp);
    for k= 1:loop
            variable= varargin(k).values;
            [m,n] = size(variable);
            fid = mopen(fileid, 'at');
    for y = 1:m
        for z = 1:n
            mfprintf(fid, '    %f', variable(y,z));
        end
        mfprintf(fid, '\n');
    end
        mfprintf(fid, '\n');
    end
mclose(fid);
endfunction
