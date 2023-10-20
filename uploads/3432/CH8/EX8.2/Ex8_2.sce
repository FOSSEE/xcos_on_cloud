//Example 8.2
// Design of a Space Station Attitude Digital Controller using
// Discrete Equivalents

xdel(winsid())//close all graphics Windows
clear;
clc;
//------------------------------------------------------------------
// State space representation of continuous time system
s=poly(0,'s');
num=1;
den=(s^2);
Gs=syslin('c',num/den);
Ds=0.81*(s+0.2)/(s+2);
Ds=syslin('c',Ds);
sysc=Gs*Ds;

//Root locus
evans(sysc)
zoom_rect([-2 -0.4 0.5 0.4])
f=gca();
f.x_location = "origin"
f.y_location = "origin"
h=legend('');
h.visible = "off"
//------------------------------------------------------------------
//figure handel settings
f=get("current_figure"); //Current figure handle
f.background=8; //make the figure window background white
l=f.children(1);
l.background=8 ;//make the text background white
id=color('grey');
xgrid(id);
//------------------------------------------------------------------
title('s-plane locus with respect to K','fontsize',3)
//------------------------------------------------------------------
//Contonuous time response of the system
figure,
tc=0:0.1:30;
syscl=sysc/(1+sysc)
yc=csim("step",tc,syscl);
plot(tc,yc,'b')
//------------------------------------------------------------------
// Discretization of the system at
z=poly(0,'z')
// sampling time Ts=1 sec
Ts=1;
Dz1=horner(Ds,2/Ts*(z-1)/(z+1))
disp(Dz1,"Dz1=","Discrete-time controller with Ts=1 sec.")

// sampling time Ts=0.5 sec
Ts2=0.5;
Dz2=horner(Ds,2/Ts2*(z-1)/(z+1))
disp(Dz2,"Dz2=","Discrete-time controller with Ts=0.5 sec.")

//discrete-time response of the system.

importXcosDiagram(".\Ex8_2_model.xcos")
 //The diagram data structure
xcos_simulate(scs_m,4);
//scs_m.props.context
plot(yt1.time,yt1.values,'m-.') //with Ts=1sec.
plot(yt2.time,yt2.values,'r--') //with Ts=0.5 sec.
//------------------------------------------------------------------------------

title('step responses of continous and digital implementations','fontsize',3)

//------------------------------------------------------------------
//figure handel settings
f=get("current_figure"); //Current figure handle
f.background=8; //make the figure window background white
l=f.children(1);
l.background=8 ;//make the text background white
id=color('grey');
xgrid(id);
//------------------------------------------------------------------
xlabel('Time (sec)','fontsize',2)
ylabel('Plant output','fontsize',2)
legend("Continuous design","Discrete equivalent design, T=1 sec."...
,"Discrete equivalent design, T=0.5 sec.",4)
//------------------------------------------------------------------------------
