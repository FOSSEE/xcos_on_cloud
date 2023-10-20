//Example 9.9
//Describing Function for a saturation nonlinearity.

xdel(winsid())//close all graphics Windows
clear;
clc;
//------------------------------------------------------------------
//Response of the saturation nonlinearity to sinusoidal input
figure;
importXcosDiagram(".\Ex9_9_model.xcos")
xcos_simulate(scs_m,4);
scs_m.props.context
plot(yt.time,yt.values(:,1),'r--')
plot(yt.time,yt.values(:,2),'b')

xlabel('Time (sec.)');
ylabel('Amplitude');
title("Saturation nonlinearity output to sinusoidal input",...
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
//Describing Functin for saturation nonlinearity.
k=1;
N=1;
i=1;
Keq=[];

for a=0:0.2:10
    if k*a/N > 1 then
    Keq(i,1)=2/%pi*(k*asin(N/a/k)+N/a*sqrt(1-(N/k/a)^2))
    else
    Keq(i,1)=k
    end
    i=i+1;
end

a=0:0.2:10;
a=a';
figure,
plot(a,Keq)
xlabel('$a$');
ylabel('$K_{eq}}$');

xset('font size',3);
title("Describing Function for a saturation nonlinearity...
 with k=N=1",'fontsize',3);
//------------------------------------------------------------------
//figure handel settings
f=get("current_figure"); //Current figure handle
f.background=8; //make the figure window background white
l=f.children(1);
l.background=8 ;//make the text background white
id=color('grey');
xgrid(id);
//------------------------------------------------------------------
zoom_rect([0 0 10 1.1])
//------------------------------------------------------------------
