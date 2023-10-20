//Chapter 9
//Example 9.2
//page 337
//To calculate subtransient and momentary current
clear;clc;
mvab=25;
Gmva=25;
T1mva=25; T2mva=25;
Gkvb=11; //generator kV base
OHLkvb=66; //overhead line kV base
Mkvb=6.6; //motor kV base
Mmva=5; //motor mva

XdG=%i*0.2; //Generator's subtransient reactance
XdM=%i*0.25; //Motor's subtransient reactance
XdM2=%i*0.3; //Motor's transient reactance
Xt1=%i*0.1; // step up transformer's reactance
Xt2=%i*0.1;//step down transformer's reactance
Xtl=%i*0.15 ;//trnasmission line's reactance

//per unit calculation
XdM=(XdM*mvab)/Mmva ;//perunit impedance of each motor
printf('\nSubtransient reactance of each motor = j%0.2f pu\n',abs(XdM));

//(a)subtransient current in the fault
Isc=(3*(1/XdM))+(1/(XdG+Xt1+Xt2+Xtl));
Ibase=(mvab*1000)/(sqrt(3)*Mkvb);
Isc=Isc*Ibase;
printf('\nSubtransient current in the fault =%0.1fA\n',abs(Isc));

//(b)subtransient current in the breaker B
IscB=(2*(1/XdM))+(1/(XdG+Xt1+Xt2+Xtl));
IscB=IscB*Ibase;
printf('\nSubtransient current in breaker B=%0.1fA\n',abs(IscB));

//(c) to find the momentary current through breaker B
ImomB=1.6*IscB;
printf('\nMomentary current through the breaker B=%dA\n',abs(ImomB));

//(d) to compute current to be interrupted by breaker in 5 cycles
XdM2=(XdM2*mvab)/Mmva ;//perunit transient impedance of each motor
IscB=(2*(1/XdM2))+(1/(XdG+Xt1+Xt2+Xtl));
IscB=IscB*Ibase;
ImomB=1.1*IscB;
printf('\nCurrent to be interrupted by breaker B in five cycles=%dA\n',abs(ImomB));
