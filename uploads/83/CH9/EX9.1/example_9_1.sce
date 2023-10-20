//Chapter 9
//Example 9.1
//page 335
//To calculate fault current
clear;clc;
//selecting base KVA and MVA
mvab=100;
Gmva=10;
T1mva=10; T2mva=5;
Gkvb=11; //generator kV base
OHLkvb=33; //overhead line kV base
Ckvb=6.6;// cable kB base
xg1=%i*0.15; xg2=%i*0.125; xt1=%i*0.10; xt2=%i*0.08;
xOHL=0.27+%i*0.36 ; xcab= 0.135+%i*0.08;

//clculating PU impedances

xg1=(xg1*mvab)/Gmva;
xg2=(xg2*mvab)/Gmva;
xt1=(xt1*mvab)/T1mva;
xt2=(xt2*mvab)/T2mva;
xOHL=(30*xOHL*mvab)/(OHLkvb^2);
xcab=(3*xcab*mvab)/(Ckvb^2);
//displaying results
printf('\n Reactance of G1= j%0.1f pu \n',abs(imag(xg1)));
printf(' Reactance of G2= j%0.1f pu\n',abs(imag(xg2)));
printf(' Reactance of T1= j%0.1f pu\n',abs(imag(xt1)));
printf(' Reactance of T2= j%0.1f pu\n',abs(imag(xt2)));
printf(' Overhead line impedance=(%0.3f + j%0.3f) pu\n',real(xOHL),abs(imag(xOHL)));
printf(' Cable impedance= (%0.3f + j%0.3f) pu\n',real(xcab),abs(imag(xcab)));

// Impedance diagram is as shown in the figure9.7 in the textbook
// A XCOS simulation for this proble is done to explain the subtransient,transient and steady state periods of a symmetrical short circuit
xtotal=((xg1*xg2)/(xg1+xg2)+xt1+xt2+xOHL+xcab);
Isc_pu=(1/xtotal);
Ibase=(mvab/(sqrt(3)*Ckvb))*1000;
Isc=Isc_pu*Ibase;
x_F_to_bus=(xt1+xt2+xOHL+xcab);
v_11b=x_F_to_bus*Isc_pu*11;
//displaying results
printf('\nTotal impedance= %0.1f < %0.2f deg pu \n',abs(xtotal),atand(imag(xtotal)/real(xtotal)));
printf('Short circuit current= %d A\n',abs(Isc));
printf('Voltage at 11kV bus=%0.2f kV\n',abs(v_11b));
