//Chapter 9
//Example 9.4
//page 345
//To calculate maximum MVA
mvab=50;
kvb=6.6;
mvaA=40;
mvaB=50;
mvaC=25;
feeder_impedance=((0.06+%i*0.12)*mvab)/(kvb^2)

Gen_A_reactance=(%i*0.1*mvab/mvaA);
Gen_B_reactance=(%i*0.1*mvab/mvaB);
Gen_C_reactance=(%i*0.1*mvab/mvaC);

printf('\nGenerator A reactance = j%0.3f pu',abs(Gen_A_reactance));
printf('\nGenerator B reactance = j%0.3f pu',abs(Gen_B_reactance));
printf('\nGenerator C reactance = j%0.3f pu',abs(Gen_C_reactance));

Reactor_A_reactance=(%i*0.12*mvab/mvaA);
Reactor_B_reactance=(%i*0.12*mvab/mvaB);
Reactor_C_reactance=(%i*0.12*mvab/mvaC);

printf('\nReactor A reactance = j%0.3f pu',abs(Reactor_A_reactance));
printf('\nReactor B reactance = j%0.3f pu',abs(Reactor_B_reactance));
printf('\nReactor C reactance = j%0.3f pu',abs(Reactor_C_reactance));

function resistance=parallel(r1,r2)
resistance=(r1*r2/(r1+r2));
endfunction

Z=(feeder_impedance)+parallel(%i*0.125,(%i*0.15 + parallel(%i*0.22,%i*0.44)));
scmva=(1/abs(Z))*mvab;
printf("\n\nSC MVA = %d MVA",scmva);
