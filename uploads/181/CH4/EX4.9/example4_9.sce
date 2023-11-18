// Calculating BJT parameters assuming Vbe
// Basic Electronics
// By Debashis De
// First Edition, 2010
// Dorling Kindersley Pvt. Ltd. India
// Example 4-9 in page 211

// Given Data
Ve=1; // Emitter Voltage of BJT in V
Vbe=0.7; // Base-Emitter Voltage of BJT in V
Rb=20*10^3; // Base Resistance of Circuit in K-ohms
Rc=5*10^3; // Collector Resistance of Circuit in K-ohms
Re=5*10^3; // Emitter Resistance of Circuit in K-ohms
Vcc=5; // DC voltage across Collector in V
Vee=-5; // DC voltage across Emitter in V

// Calculations
Vb=Ve-Vbe;
Ib=Vb/Rb;
Ie=(Vcc-1)/Re;
Ic=Ie-Ib;
Vc=(Rc*Ic)-Vcc;
beta_bjt=Ic/Ib;
alpha=Ic/Ie;

printf("Circuit Parameters:\n(a)Base Voltage = %0.3f V\n(b)Base Current = %0.3e A\n(c)Emitter Current = %0.3e A\n(d)Collector Current = %0.3e A\n(e)Collector Voltage = %0.3f V\n(f)beta gain = %0.3f\n(g)alpha gain = %0.3f\n",Vb,Ib,Ie,Ic,Vc,beta_bjt,alpha);

// Results
// For the BJT Circuit,
// (a) Base Voltage = 0.3 V
// (b) Base Current = 0.015 mA
// (c) Emitter Current = 0.8 mA
// (d) Collector Current = 0.785 mA
// (e) Collector Voltage = -1.075 volt
// (f) Beta gain = 52.3
// (g) Alpha gain = 0.98
