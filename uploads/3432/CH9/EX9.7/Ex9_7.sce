//Example 9.7
//Analysis and design of the system with limit cycle using the root locus.
xdel(winsid())//close all graphics Windows
clear;
clc;
//------------------------------------------------------------------
//System transfer function and its root locus

s=poly(0,'s');
num=0.1;
den=(s^2+0.2*s+1)*(s);
Gs=syslin('c',num/den);

//Root locus
evans(Gs,40)
title(["Root locus of", "$(0.1/s(s^2+0.2*s+1)$"],'fontsize',3);
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
//------------------------------------------------------------------
//Response of the system
figure;
//Response of the system
K=0.5;
i=[1 4 8];
importXcosDiagram(".\Ex9_7_model.xcos")

for r=i
xcos_simulate(scs_m,4);
scs_m.props.context
plot(yt.time,yt.values)
end

xlabel('Time (sec.)');
ylabel('Amplitude');
title("Step response of the system",'fontsize',3);
//------------------------------------------------------------------
//figure handel settings
f=get("current_figure"); //Current figure handle
f.background=8; //make the figure window background white
l=f.children(1);
l.background=8 ;//make the text background white
id=color('grey');
xgrid(id);
//------------------------------------------------------------------
zoom_rect([0 0 150 9])

xset('font size',3);
xstring(80,1.6,"$r=1$");
xstring(80,4.6,"$r=4$");
xstring(80,8.2,"$r=8$");
//------------------------------------------------------------------
//System with notch compensation
D=123*(s^2+0.18*s+0.81)/(s+10)^2;

//Root locus
figure,
evans(Gs*D,40)
title(["Root locus including notch compensation"],'fontsize',3);
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
zoom_rect([-14 -2 2 2])
//------------------------------------------------------------------
//Response of the system witth notch filter
figure;
K=0.5;
i=[2 4];
importXcosDiagram(".\Ex9_7_model_notch.xcos")

for r=i
xcos_simulate(scs_m,4);
scs_m.props.context
plot(yt.time,yt.values)
end

xlabel('Time (sec.)');
ylabel('Amplitude');
title("Step response of the system with notch filter",'fontsize',3);
//------------------------------------------------------------------
//figure handel settings
f=get("current_figure"); //Current figure handle
f.background=8; //make the figure window background white
l=f.children(1);
l.background=8 ;//make the text background white
id=color('grey');
xgrid(id);
//------------------------------------------------------------------
xset('font size',3);
xstring(30,2.2,"$r=2$");
xstring(34,3.75,"$r=4$");
//------------------------------------------------------------------
