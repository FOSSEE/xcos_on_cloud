///Example 8.1
// Digital Controller using tustin approximation.

xdel(winsid())//close all graphics Windows
clear;
clc;
//------------------------------------------------------------------
//Cntroller
s=poly(0,'s');
numD=s/2+1;
denD=s/10+1;
D=10*numD/denD;
Ds=syslin('c',D);
//sampling freq. = 25 times bandwidth
Wbw=10;
Ws=25*Wbw;
fs=Ws/2/%pi;
T=1/fs; //sampling time
a=1;b=-1;
c=1;d=1;
//Digital controller
z=poly(0,'z');
Dz=horner(Ds,2/T*(a*z+b)/(c*z+d));
disp(Dz,'Digital Controller : ')

//------------------------------------------------------------------
//step response and control efforts.
figure(0);
importXcosDiagram(".\Ex8_1_model.xcos")
 //The diagram data structure
xcos_simulate(scs_m,4);
scs_m.props.context
plot(yt.time,yt.values(:,1),'r--')
plot(yt.time,yt.values(:,2),2)

xlabel('Time (sec.)');
ylabel('Position, y');
title(["Comparison between digital and continuous controller step...
 response";"with a sample rate 25 times bandwidth";"(a) Position "],...
 'fontsize',3);
//------------------------------------------------------------------
//figure handel settings
f=get("current_figure"); //Current figure handle
f.background=8; //make the figure window background white
l=f.children(1);
l.background=8 ;//make the text background white
id=color('grey');
xgrid(id);
//------------------------------------------------------------------

//control effort

figure(1);
plot(ut.time,ut.values(:,1),'r--')
plot2d2(ut.time,ut.values(:,2),2)

xlabel('Time (sec.)');
ylabel('Control, u');
title(["Comparison between digital and continuous controller step...
 response";"with a sample rate 25 times bandwidth";"(b) Control "],...
 'fontsize',3);
//------------------------------------------------------------------
//figure handel settings
f=get("current_figure"); //Current figure handle
f.background=8; //make the figure window background white
l=f.children(1);
l.background=8 ;//make the text background white
id=color('grey');
xgrid(id);
//------------------------------------------------------------------
//------------------------------------------------------------------
