//Example 7.35
// Integral Control of a Motor Speed System

//Transfer function model
num=1;
s=poly(0,'s');
den=(s+3);
G=syslin('c',num/den);
sys=tf2ss(G)

// State space representation of augmented system
F=[0 1; 0 -3];
G=[0 1]';
H=[1 0];
J=0;

//Desired poles for augmented system
Pc=[-5 -5];

// State feedback gain is
K=ppol(F,G,Pc)

//Estimator
Pe=[-10];
L=ppol(sys.A',sys.C',Pe)

// (c) Compare step reference and disturbance response.

// the required values
// for step reference response switch, set r to 1 and w to 0
// for step disturbance response switch, set r to 0 and w to 1

r=1
w=0
