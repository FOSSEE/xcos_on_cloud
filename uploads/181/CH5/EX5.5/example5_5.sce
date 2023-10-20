// Design Bias Circuit for given Stability Factor
// Basic Electronics
// By Debashis De
// First Edition, 2010
// Dorling Kindersley Pvt. Ltd. India
// Example 5-5 in page 239

clear; clc; close;

// Given data
Vcc=20; // Supply DC Voltage in V
Rc=1.5*10^3; // Collector Resistance in ohm
Vce=8; // Collector-Emitter Resistance in V
Ic=4*10^-3; // Collector Current in A
S=12; // Stability Factor of circuit
beta_bjt=50; // Beta Gain of BJT

// Calculations
Ib=Ic/beta_bjt;
Re=(Vcc-Vce-Ic*Rc)/(Ib+Ic);
Rb=Re*((S*beta_bjt)/((beta_bjt+1)-S));
Ie=Ic+Ib;
Vbn=0.2+Ie*Re;
Vth=Vbn+Ib*Rb;
R1=(Vcc*Rb)/Vth;
Ir1=(Vcc-Vbn)/R1;
Ir2=Ir1-Ib;
R2=Vbn/Ir2;

// For S=3
S_2=3;
Rc_2=1.47*10^3;
Re_2=Re;
Rb_2=Re*((S_2*beta_bjt)/((beta_bjt+1)-S_2));
Vth_2=Vbn+(Ib*Rb_2)+6.16;
R1_2=(Vcc*Rb_2)/Vth_2;
Ir1_2=(Vcc-Vbn)/R1_2;
Ir2_2=Ir1_2-Ib;
R2_2=Vbn/Ir2-2;

printf("For S=12 \n");
printf("(a)Ib = %0.2e A \n(b)Ir1 = %0.2e A \n(c)Ir2 = %0.2e A \n",Ib,Ir1,Ir2);
printf("(d)Re = %0.2e ohm \n(e)Rb = %0.2e ohm \n(f)R1 = %0.2e ohm \n(g)R2 = %0.2e ohm \n",Re,Rb,R1,R2);
printf("(h)Base-Ground Voltage Vbn = %0.2f V \n(i)Thevenin Voltage Vth = %0.2f V \n",Vbn,Vth);
printf("\n For S=3 \n");
printf("(a)Re = %0.2e ohm \n(b)Rb = %0.2e ohm \n(c)R1 = %0.2e ohm \n(d)R2 = %0.2e ohm \n",Re_2,Rb_2,R1_2,R2_2);
printf("(e)Thevenin Voltage Vth = %0.2f V \n(f)Ir1 = %0.2e A \n(g)Ir2 = %0.2e A \n",Vth_2,Ir1_2,Ir2_2);

// Results
//  S=12
// (a) Ib=80 mu-A
// (b) Re=1.47 K-ohm
// (c) Rb=21.17 K-ohm
// (d) Vbn=5.91 V
// (e) Vth=7.60 V
// (f) R1=55.71 K-ohm
// (g) R2=37.16 K-ohm
// (h) IR1=0.253 mA
// (i) IR2=0.173 mA
// S=3
// (a) Rb=3.13 K-ohm
// (b) R1=10.16 K-ohm
// (c) IR1=1.387 mA
// (d) R2=4.52 K-ohm
// (e) IR2=1.307 mA
