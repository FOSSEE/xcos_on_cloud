//Example 8.2
// Design of a Space Station Attitude Digital Controller using
// Discrete Equivalents

// State space representation of continuous time system
s=poly(0,'s');
num=1;
den=(s^2);
Gs=syslin('c',num/den);
Ds=0.81*(s+0.2)/(s+2);
Ds=syslin('c',Ds);
sysc=Gs*Ds;

//Root locus
evans(sysc)
//Contonuous time response of the system
tc=0:0.1:30;
syscl=sysc/(1+sysc)
yc=csim("step",tc,syscl);
//------------------------------------------------------------------
// Discretization of the system at
z=poly(0,'z')
// sampling time Ts=1 sec
Ts=1;
Dz1=horner(Ds,2/Ts*(z-1)/(z+1))
disp(Dz1,"Dz1=","Discrete-time controller with Ts=1 sec.")

// sampling time Ts=0.5 sec
Ts2=0.5;
Dz2=horner(Ds,2/Ts2*(z-1)/(z+1))
disp(Dz2,"Dz2=","Discrete-time controller with Ts=0.5 sec.")
