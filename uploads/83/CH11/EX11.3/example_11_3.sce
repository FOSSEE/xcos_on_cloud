//Chapter 11
//Example 11.3
//page 409
//To find fault current and subtransient current in all parts of the system
clear;clc;

a=-0.5+(sqrt(3)/2)*%i;

//neglecting prefault currents
Vf0=10/11;
Eg=Vf0; Em1=Vf0 ;Em2=Vf0;

//positive sequence network when it is replaced by its thevenin's equvivalent as shown in fig11.18
printf('\nsequence impedances are given by \n');
Z1=(%i*0.525*%i*0.23)/(%i*0.755);
Z2=Z1;
Z0=%i*1.712;
printf('Z1=j%0.4f \nZ2=j%0.4f \nZ0=j%0.4f',abs(imag(Z1)),abs(imag(Z2)),abs(imag(Z0)));
//to find sequence current
Ia1=Vf0/(Z1+Z2+Z0);
Ia2=Ia1;
Ia0=Ia1;

//to find fault current
If=3*Ia0;
printf('\n\nFault Current= -j%0.4f',abs(imag(If)));


//component current flowing from generator and motor
printf('\n\nComponents currents flowing from Generator and motor are \n')
Ig1=Ia1*(0.23/0.755) ;
Ig2=Ig1;
Ig0=0;
printf('Ig1= -j%0.4f \nIg2= -j%0.4f \nIg0=%d',abs(Ig1),abs(Ig2),abs(Ig0));
printf('\n');
Im1=Ia1*(0.525/0.755);
Im2=Im1;
Im0=Ia0;
printf('\nIm1= -j%0.4f \nIm2= -j%0.4f \nIm0= -j%0.4f',abs(Im1),abs(Im2),abs(Im0));

//fault currents from the generator and motor towards g are
printf('\n\nFault current from the generator towards g are ');
Ig=[1 1 1;a^2 a 1;a a^2 1]*[Ig1;Ig2;Ig0];
disp(Ig);
printf('and to g from motors are');
Im=[1 1 1;a^2 a 1;a a^2 1]*[Im1;Im2;Im0];
disp(Im);

printf('\nPositive sequence current =%0.3f pu',(-%i*Ig1));
printf('\nNegative sequence current =%0.3f pu',(%i*Ig2));
printf('\nZero sequence current=%d\n',Ig0);

//under loaded condition,PU motor currents are
Im1o=(15/(25*0.909*0.8))*(0.800103636+%i*0.5998617938);
Im2o=(7.5/(25*0.909*0.8))*(0.800103636+%i*0.5998617938);
printf('\nThe per unit motor currents are:\n');
printf('Motor1:%0.2f +j%0.3f pu',real(Im1o),imag(Im1o));
printf('\nMotor2:%0.2f +j%0.3f pu',real(Im2o),imag(Im2o));

//the voltages behind subtransient reactances are calculated below
printf('\n\nVoltage behind subtransient reactances:\n');
printf('Motor1:');
Em1=Em1-(%i*0.345*Im1o);
printf('Em1= %0.4f-j%0.4f',real(Em1),abs(imag(Em1)));

printf('\nMotor2:');
Em2=Em2-(%i*0.69*Im2o);
printf('Em2= %0.4f-j%0.4f',real(Em2),abs(imag(Em2)));

printf('\nGenerator:');
Eg=Eg+(%i*0.525*(Im2o+Im1o));
printf('Eg= %0.4fj+%0.4f',real(Eg),abs(imag(Eg)));

//actual value of positive sequence current from generator and motor
printf('\n\nThe actual value of positive sequence current from the generator towards fault is = %0.2f+j%0.3f',real(Im1o+Im2o+Ig1),imag(Im1o+Im2o+Ig1));
printf('\nThe actual value of positive sequence current from the motors towards fault is = %0.2f-j%0.3f',real(-Im1o-Im2o+Im1),abs(imag(-Im1o-Im2o+Im1)));
