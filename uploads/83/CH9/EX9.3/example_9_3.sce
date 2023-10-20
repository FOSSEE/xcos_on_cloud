//Chapter 9
//Example 9.3
//page 340
//To calculate subtransient current in Generator,Motor and fault
clear;clc;
mvab=25;
kvb=11;
Vo=10.6/kvb; //PU Prefault voltage
printf('\nPrefault Voltage = %0.4fpu\n',Vo);

Load=15/mvab; //load PU with 0.8pf leading
Io=(Load/(Vo*0.8))*(cosd(36.9)+%i*sind(36.9)); //Prefault current
printf('\nPrefault current = %0.4f at %0.1f deg  PU',abs(Io),atand(imag(Io)/real(Io)));

Eg=Vo+(%i*0.45*Io); //voltage behind subtransient reactance(generator)
printf('\n\nVoltage behind subtransient reactance(Generator) = %0.4f+j%0.2f pu\n''',real(Eg),imag(Eg));

Em=Vo-(%i*0.15*Io); //voltage behind subtransient reactance(motor)
printf('\nVoltage behind subtransient reactance(Motor) = %0.4f-j%0.4f pu',real(Em),abs(imag(Em)));

Ig=Eg/(%i*0.45); //under fault condition
Im=Em/(%i*0.15); //under fault condition
printf('\n\nUnder Faulted condition \n Ig""=%0.4f-j%0.4f pu',real(Ig),abs(imag(Ig)));
printf('\n Im""=%0.4f-j%0.4f pu',real(Im),abs(imag(Im)));
If=Ig+Im; //Current in fault
printf('\n\nCurrent in fault= -j%0.4f pu',abs(imag(If)));

Ib=(mvab*1000/(sqrt(3)*11)); //Base current
//Actual Currents
printf("\n\nNow");
Ig=Ig*Ib
Im=Im*Ib
If=If*Ib
printf('\nIg""= %0.1f-j%0.1f A',real(Ig),abs(imag(Ig)));
printf('\nIm""= %0.1f-j%0.1f A',real(Im),abs(imag(Im)));
printf('\nIf= -j%d A',abs(imag(If)));
