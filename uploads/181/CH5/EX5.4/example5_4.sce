// To establish Operating Point & Stability Factor
// Basic Electronics
// By Debashis De
// First Edition, 2010
// Dorling Kindersley Pvt. Ltd. India
// Example 5-4 in page 238

// Given Data
beta_bjt=50; // Beta Gain of the BJT circuit
Vbe=0.7; // Base-Emitter voltage of BJT in V
Vcc=22.5; // DC voltage across Collector in V
Rc=5600; // Resistance across Collector in ohm
Vce=12; // Operating Collector-Emitter voltage of circuit in V
Ic=1.5*10^-3; // Operating Collector current of circuit in mA
sfactor=3; // Stability factor of the circuit

// Calculations
Re=((Vcc-Vce)/Ic)-Rc;
constant=((beta_bjt+1)*(sfactor-1))/((beta_bjt+1)-sfactor);
Rb=constant*Re;
Ib=Ic/beta_bjt;
voltage=(Ib*Rb)+Vbe+((Ib+Ic)*Re);
R1=Rb*(Vcc/voltage);
R2=(R1*voltage)/(Vcc-voltage);

printf("(a)The value of Emitter Resistance of the BJT circuit is %0.2e ohm \n",Re);
printf("(b)The value of Resistance-1 of the BJT circuit is %0.2e ohm \n",R1);
printf("(c)The value of Resistance-2 of the BJT circuit is %0.2e ohm \n",R2);

// Results
// The value of Emitter Resistance of the BJT circuit is 1.4 K-ohm
// The value of Resistance-1 of the BJT circuit is 22.8 K-ohm
// The value of Resistance-2 of the BJT circuit is 3.4 K-ohm
