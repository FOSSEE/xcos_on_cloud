//Chapter 11
//Example 11.2
//page 408
//To find fault current and voltage across the grounding resistor
clear;clc;

X1eq=(%i*0.18)/2;
X2eq=(%i*0.15)/2;
Z0eq=(%i*0.10)+3*(2*20/(11^2));

Ea=1;

//calculation of fault current
printf('\nFault current is given by ');
If=(3*Ea)/(X1eq+X2eq+Z0eq)

//current in grounding resistor
Ifg=abs(If)*(20/(11*sqrt(3)));
printf('\n\nCurrent through grounding resistor Ifg=%0.2fkA',Ifg);

//voltage across grounding resistor
Vgr=abs(If*(2*20/(11^2))*(11/sqrt(3)));
printf('\n\nVoltage across grounding resistor Vgr=%0.2fkV\n\n',Vgr);