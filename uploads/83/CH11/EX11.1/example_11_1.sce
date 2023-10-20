//Chapter 11
//Example 11.1
//page 406
//To draw sequence networks of generator and to compare LG fault current will be greater than three-phase fault current when neutral is solidly grounded
clear;clc;

disp("Sequence networks of synchronous generator grounded through neutral impedance has been drawn using XCOS ");

disp("Since the derivation can not be done here, let us do this problem by taking a suitable values for the sequence reactances of the generator");

disp("X1=j0.18, X2=j0.15, X0=j0.10 pu and Ea=1");

disp("From the figs 11.13 and 11.14 in the textbook,we can find Ilg and I3L");

Ea=1;X1=0.18*%i;X2=0.15*%i;X0=0.10*%i;

IaLG=3*Ea/(2*X1+X0)
Ia3L=3*Ea/(3*X1)

disp("Same values of sequence impedance have been used in XCOS simulation also to varify the result");
