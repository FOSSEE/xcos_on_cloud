// Sketch output voltage Vo
// Basic Electronics
// By Debashis De
// First Edition, 2010
// Dorling Kindersley Pvt. Ltd. India
// Example 3-24 in page 169

clear; clc; close;

// Given data
// Data is provided in the diagrams

// Calculation
printf("(a)When Vi<50 V, Second diode conducts\n");
Vo=100-((2/3)*27);
printf("Vo = %0.0f V\n",Vo);
printf("When 50<Vi<100 both diodes conduct and Vo=Vi.When Vi>100, only the first diode conducts.Hence Vo = 100 V\n");
printf("(b)When Vi<25 V,neither diodes conduct and Vo = 25 V.When Vi>25,upper diode conducts\n");
Vi=((100-25)*(3/2))+25;
printf("When Vo reaches 100 V, Vi rises to %0.1f V",Vi);

// Result
// The output voltage is shown in the xcos diagrams
