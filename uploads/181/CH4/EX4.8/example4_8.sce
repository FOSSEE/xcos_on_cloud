// Calculate labeled Voltages
// Basic Electronics
// By Debashis De
// First Edition, 2010
// Dorling Kindersley Pvt. Ltd. India
// Example 4-8 in page 211

clear; clc; close;

// Given Data
Vbe=0.7; // Base-Emitter voltage of BJT in V
Vcc2=10; // DC voltage across Collector in V
Vee2=-15; // DC voltage across Emitter in V
Rc2=5*10^3; // Collector Resistance in K-ohms
// Beta Current Gain of BJT is Infinity

// Calculations
Vb1=0;
Ve1=-0.7;
Ve2=0.7;
Vc2=Vee2+Rc2*((Vcc2-Vbe)/Rc2);

printf("Circuit 1:\n(a)Base Voltage = %0.1f V\n(b)Emitter Voltage = %0.1f V\n",Vb1,Ve1);
printf("Circuit 2:\n(a)Emitter Voltage = %0.1f V\n(b)Collector Voltage = %0.1f V\n",Ve2,Vc2);

//Results
// Circuit 1 : Base Voltage = 0 V
// Circuit 1 : Emitter Voltage = -0.7 V
// Circuit 2 : Emitter Voltage = 0.7 V
// Circuit 2 : Collector Voltage = -5.7 V
