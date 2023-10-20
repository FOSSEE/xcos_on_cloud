//control systems by Nagoor Kani A
//Edition 3
//Year of publication 2015
//Scilab version 6.0.0
//operating systems windows 10
// Example 7.11

clc;
clear;
s=%s
p=poly([40 10],'s','coeff')
q=poly([0 3 4 1],'s','coeff')
sm=cont_frm(p,q)
disp(sm,'the state model in matrix form is')
