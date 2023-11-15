//Chapter 10
//Example 10.4
//page no 392
//To draw the zero sequence networks of the system given in example 10.2

//selecting generator rating as base in generator circuit

mvab=25;
kvGb=11;  //base voltage for generator
kvTLb=kvGb*(121/10.8); //base voltage for TL
kvMb=kvTLb*(10.8/121); //base voltage for motors

//Calculation of zero sequence reactance

xT0=0.0805; //zero sequence reactance of transformer
xG0=0.06; //zero sequence reactance of generator

//zero sequence reactanc eof motors
xM1_0=0.06*(mvab/15)*(10/kvMb)^2;
xM2_0=0.06*(mvab/7.5)*(10/kvMb)^2;

x_clr_0=3*2.5*(mvab/kvGb^2); // Reactance of current limiting reactors to be icluded in the zero sequence network
x_TL_0=300*(mvab/kvTLb^2); //Zero sequence reactance of TL

printf('\n\nTransformer zero sequence reactance = %0.4f pu',xT0);
printf('\nGenerator zero sequence reactances = %0.2f pu',xG0);
printf('\nZero sequence reactance of motor 1 = %0.3f pu',xM1_0);
printf('\nZero sequence reactance of motor 2 = %0.3f pu',xM2_0);
printf('\nReactance of current limiting reactors = %0.3f pu',x_clr_0);
printf('\nZero sequence reactance of transmission line = %0.3f pu\n\n',x_TL_0);

disp('Zero sequence diagram has been drawn using XCOS,simulation has not been done as it is not being asked in the problem');
