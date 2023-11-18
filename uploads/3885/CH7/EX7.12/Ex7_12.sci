//control systems by Nagoor Kani A
//Edition 3
//Year of publication 2015
//Scilab version 6.0.0
//operating systems windows 10
// Example 7.12

s=%s
h=syslin('c',(2*(s+5))/((s+2)*(s+3)*(s+4)))
disp(h,'thr transfer function is')
ss=tf2ss(h)
disp(ss,'the state space model is')
[Ac,Bc,U,ind]=canon(ss(2),ss(3))
disp(Ac,Bc,U,ind)
