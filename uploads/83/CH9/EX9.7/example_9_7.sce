//Chapter 9
//Example 9.7
//page 355
//To evaluate Zbus using Current Injection method

disp("We can approach this problem using XCOS simulation")
disp("In this simulation");
disp("1)For injecting unit current at bus1 keeping bus2 open circuit,we use a current source of 1 unit which is switched on from t=0 to t=2. During this period we can observe the voltage waveforms of V1 and V2 and compare with the results given in the textbook");
disp("2)For injecting unit current at bus2 keeping bus1 open circuit,we use a current source of 1 unit which is switched on from t=4 to t=6. During this period we can observe the voltage waveforms of V1 and V2 and compare with the results given in the textbook");

Z11=7;
Z21=4;
Z12=Z21;
Z22=6;

Zbus=[Z11 Z12;Z21 Z22]
