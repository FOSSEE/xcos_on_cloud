//Example 7.35
// Integral Control of a Motor Speed System

xdel(winsid())//close all graphics Windows
clear;
clc;
//------------------------------------------------------------------

//Transfer function model
num=1;
s=poly(0,'s');
den=(s+3);
G=syslin('c',num/den);
sys=tf2ss(G)

// State space representation of augmented system
F=[0 1; 0 -3];
G=[0 1]'
H=[1 0];
J=0;

//Desired poles for augmented system
Pc=[-5 -5]

// State feedback gain is
K=ppol(F,G,Pc)
disp(K,'K=')

//Estimator
Pe=[-10]
L=ppol(sys.A',sys.C',Pe)
disp(L','L=')

//------------------------------------------------------------------
//(c) Compare step reference and disturbance response.
//step reference response switch r=1 and w=0;
r=1;w=0;
importXcosDiagram(".\Ex7_35_model.xcos")
 //The diagram data structure
xcos_simulate(scs_m,4);
scs_m.props.context
figure(0)
plot(yt.time,yt.values)
xlabel('time');
ylabel('y');

figure(1)
plot(ut.time,ut.values)
xlabel('time');
ylabel('y');
//------------------------------------------------------------------
// Step disturbance response switch r=0 and w=1;
w=1;r=0;
importXcosDiagram(".\Ex7_35_model.xcos")
 //The diagram data structure
xcos_simulate(scs_m,4);
scs_m.props.context

scf(0)
plot(yt.time,yt.values,'r--')
xlabel('time');
ylabel('y');
title("step Response",'fontsize',3)
//------------------------------------------------------------------
//figure handel settings
f=get("current_figure"); //Current figure handle
f.background=8; //make the figure window background white
l=f.children(1);
l.background=8 ;//make the text background white
id=color('grey');
xgrid(id);
//------------------------------------------------------------------
legend("y1","y2")
xset('font size',3);
xstring(0.9,0.9,"$y_1$");
xstring(0.25,0.12,"$y_2$");


scf(1)
plot(ut.time,ut.values,'r--')
xlabel('time');
ylabel('y');
title("Control efforts",'fontsize',3)
//------------------------------------------------------------------
//figure handel settings
f=get("current_figure"); //Current figure handle
f.background=8; //make the figure window background white
l=f.children(1);
l.background=8 ;//make the text background white
id=color('grey');
xgrid(id);
//------------------------------------------------------------------
legend("u1","u2")
xset('font size',3);
xstring(0.25,2.5,"$u_1$");
xstring(1,-1,"$u_2$");
//------------------------------------------------------------------
