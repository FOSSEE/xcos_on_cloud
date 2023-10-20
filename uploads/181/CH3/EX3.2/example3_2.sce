// Find the diode currents
// Basic Electronics
// By Debashis De
// First Edition, 2010
// Dorling Kindersley Pvt. Ltd. India
// Example 3-2 in page 144

clear; clc; close;

// Given data
R=10*10^3; // Resistance in K-ohms

// Calculation
printf("(a) R = 10K.Assume both diodes are conducting.We have:\n");
printf("100 = 10.02*I1 + 10*I2 + 0.2\n 100 = 10.01*I2 + 10*I1 + 0.6\n");
function y=f(i);
    y(1)=10.02*i(1)+10*i(2)+0.2-100
    y(2)=10.015*i(2)+10*i(1)+0.6-100
endfunction
ans=fsolve([0.1;0.1],f);
I1=ans([1]);
I2=ans([2]);
printf("I1 = %0.3f A,I2 = %0.3f A\n",I1,I2);
printf("Solving,we find I2<0.Thus D is not ON\n");
I1=(100-0.2)/10.02;
printf("I1 = %0.2e A and I2 = 0\n\n",I1);
printf("(b) R=1K.Assume both diodes are ON,we have:\n");
printf("100 = 1.52*I1 + 1.5*I2 + 0.2\n 100 = 1.515*I2 + 1.5*I1 + 0.6\n");
function y1=g(j);
    y1(1)=1.52*j(1)+1.5*j(2)+0.2-100
    y1(2)=1.515*j(2)+1.5*j(1)+0.6-100
endfunction
ans1=fsolve([0.1;0.1],g);
I1=ans1([1]);
I2=ans1([2]);
printf("Solving,we find\nI1 = %0.3f A and I2 = %0.3f A.Hence assumption is valid",I1,I2);

// Result
// Since both currents are positive,assumption is valid for I1 = 39.717 mA and I2 = 26.287 mA
