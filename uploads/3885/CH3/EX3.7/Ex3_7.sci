//control systems by Nagoor Kani A
//Edition 3
//Year of publication 2015
//Scilab version 6.0.0
//operating systems windows 10
// Example 3.7

clc;
clear;
s=%s
p=poly([1 0.4 0 ],'s','coeff')
q=poly([0 0.6 1],'s','coeff')
g=p./q
disp(g,'the given transfer function is')
c=g/(1+g)
disp(c,'the closed loop transfer function is')
u=c/s
disp(u,'the in put is unit step signal')
//standard form od second order system is w^2/s^2+2*zeta*w*s+w^2
//compaing h with the standard form
w=1//natural frequency of oscillation
disp(w,'natural frequency of oscillation in rad/sec')
zeta=1/(2*w)
disp(zeta,'the damping ratio is')
mp=exp((-zeta*%pi)/sqrt(1-(zeta)^2))*100//percentage peak overshoot
disp(mp,'percentage peak overshoot in percentage')
tp=%pi/(w*sqrt(1-(zeta)^2))
disp(tp,'peak time in seconds')
