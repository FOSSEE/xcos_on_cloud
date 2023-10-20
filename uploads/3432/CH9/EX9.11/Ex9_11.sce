//Example 9.11
//Describing Function for a relay with hysteresis nonlinearity.

xdel(winsid())//close all graphics Windows
clear;
clc;
//------------------------------------------------------------------
//Response of the saturation noninearity to sinusoidal input
figure;
importXcosDiagram(".\Ex9_11_model.xcos")
xcos_simulate(scs_m,4);
scs_m.props.context
plot(yt.time,yt.values(:,1),'r--')
plot(yt.time,yt.values(:,2),'b')

xlabel('Time (sec.)');
ylabel('Amplitude');
title("Relay with hysteresis nonlinearity output to sinusoidal...
 input",'fontsize',3);
//------------------------------------------------------------------
//figure handel settings
f=get("current_figure"); //Current figure handle
f.background=8; //make the figure window background white
l=f.children(1);
l.background=8 ;//make the text background white
id=color('grey');
xgrid(id);
//------------------------------------------------------------------
zoom_rect([0 -1.2 5 1.2])
//------------------------------------------------------------------
////Describing Functin for relay with hysteresis nonlinearity.
h=0.1;
N=1;
i=1;

for a=0.1:0.025:1
    if a<h then
        Keq(i,1)=0;
        ro(i,1)=0;
        theta(i,1)=0
    else
        Keq(i,1)=4*N/(%pi*a)*(sqrt(1-(h/a)^2)-%i*h/a)
        [r th]=polar(Keq(i,1));
        ro(i,1)=r; //magnitude
        theta(i,1)=clean(th); //angle in radians
    end
    i=i+1;
end

a=0.1:0.025:1
a=a';
figure,

subplot(2,1,1), plot(a,ro)
xlabel('$a$');
ylabel(['Magnitude', '$|K_{eq}|$']);

xset('font size',3);
//------------------------------------------------------------------
//figure handel settings
f=get("current_figure"); //Current figure handle
f.background=8; //make the figure window background white
l=f.children(1);
l.background=8 ;//make the text background white
id=color('grey');
xgrid(id);
//------------------------------------------------------------------
title("Describing Functin for relay with hysteresis nonlinearity...
 with h=0.1 and N=1",'fontsize',3);

subplot(2,1,2), plot(a,theta*180/%pi)
xlabel('$a$');
ylabel(['Phase', '$ \angle K_{eq}$','deg.']);
xset('font size',3);
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
