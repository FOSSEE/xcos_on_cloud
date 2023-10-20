//Chapter 10
//Example 10.2
//page no 390
//To draw sequence networks of the system
clear;clc;

//selecting generator rating as base in generator circuit

mvab=25;
kvGb=11;  //base voltage for generator
kvTLb=kvGb*(121/10.8); //base voltage for TL
kvMb=kvTLb*(10.8/121); //base voltage for motors

xG=%i*0.2;
xT=%i*0.1;
xTL=100;
xM=%i*0.25;

mvaG=25;
mvaT=30;
mvaM1=15;
mvaM2=7.5;

kvM=10;

//converting all the reactances to PUs

xT=xT*(mvab/mvaT)*(10.8/kvGb)^2;
xTL=xTL*(mvab/(kvTLb)^2);
xM1=xM*(mvab/mvaM1)*(kvM/kvMb)^2;
xM2=xM*(mvab/mvaM2)*(kvM/kvMb)^2;

//displaying the results

printf('\n\nTransmission line voltage base = %0.1f kV',kvTLb);
printf('\n\Motor voltage base = %d kV',kvMb);
printf('\n\nTransformer reactance = %0.4f pu',abs(imag(xT)));
printf('\nLine reactance = %0.3f pu',abs(xTL));
printf('\nReactance of motor 1 = %0.3f pu',abs(imag(xM1)));
printf('\nReactance of motor 2 = %0.3f pu\n\n',abs(imag(xM2)));

disp('Positive and Negative sequence diagram has been drawn using XCOS,simulation has not been done as it is not being asked in the problem');
