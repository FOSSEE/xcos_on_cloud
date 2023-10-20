//Example 9.5
//Changing Overshoot and Saturation nonlinearity.

xdel(winsid())//close all graphics Windows
clear;
clc;
//------------------------------------------------------------------
//System transfer function and its root locus

s=poly(0,'s');
num=(s+1)
den=(s^2);
Gs=syslin('c',num/den)

//Root locus
evans(Gs,5)
title(["Root locus of", "$(s+1)/(s^2)$","with saturation removed"],...
'fontsize',3);
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
// Step response
K=1;
i=[2 4 6 8 10 12];
figure(1);
importXcosDiagram(".\Ex9_5_model.xcos")

for r=i
xcos_simulate(scs_m,4);
scs_m.props.context
plot(yt.time,yt.values)
end

xlabel('time');
ylabel('y');
title("Step response of the system for various input sizes",'fontsize',3);
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
xstring(4,2.5,"$r=2$");
xstring(6,5.5,"$4$");
xstring(8,8.7,"$6$");
xstring(10,12.2,"$8$");
xstring(12,15.4,"$10$");
xstring(14,18.4,"$12$");
//------------------------------------------------------------------
