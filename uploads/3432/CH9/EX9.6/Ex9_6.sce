//Example 9.6
//Stability of conditionally stable system using root locus.
xdel(winsid())//close all graphics Windows
clear;
clc;
//------------------------------------------------------------------
//System transfer function and its root locus

s=poly(0,'s');
num=(s+1)^2
den=(s^3);
Gs=syslin('c',num/den)
//Root locus
evans(Gs,7)
title(["Root locus for", "$(s+1)^2/(s^3)$","for system"],...
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
//Response of the system
K=2;
i=[1 2 3 3.475];
figure(1);

importXcosDiagram(".\Ex9_6_model.xcos")

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
xset('font size',3);
xstring(3,6.5,"$r=3.475$");
xstring(2.5,5.2,"$3$");
xstring(2,3,"$2$");
xstring(1,1.4,"$1$");
//------------------------------------------------------------------
