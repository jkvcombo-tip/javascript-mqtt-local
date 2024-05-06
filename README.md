# javascript-mqtt-local
javasript mqtt running on local broker

Downlaod Mqtt Broker :
https://mosquitto.org/files/binary/win64/mosquitto-2.0.18-install-windows-x64.exe

Install Live Server Extension Vscode
Live Server : Ritwick Dey

Javasript Snippet Extension
Javascript ES6 : charalampos

Edit Config :
listener 1883
listener 9001
protocol websockets
socket_domain ipv4
allow_anonymous true

Run Mosquitto Broker Locally
mosquitto -c mosquitto.conf -v

Terminate/Kill process
CTRL-C / 
netstat - a
netstat -ano | findstr :<port_number>
netstat -ano | findstr :1883
Kill process on Task Manager-Details(See Listening ID)