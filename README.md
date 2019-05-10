# WizOn
Efforts to reverse engineer and make a private server for a game no longer online and without packets.

Game files are inside the folder titled WizardryOnline(pulled straight from steam).

Launcher file has a check box to switch between having user+pass input fields and not having them.

Only file changed is inside the Wizardry Online\data\settings folder which is connection_na.conf it now points the game to the localhost so you can run a server to check its outbound call.

We have created a server and it is accessable inside the Server folder. It is a .net application that reads the packet sent from the game and sends one back as long as you have the cypher disabled.

Instructions to disable the cypher:
Start the game, attach debugger, go to address 0x004DF578 and change the right operand from 0x1 to 0x0 and then the correct packet should be sent to the server which will now respond with a packet back to the game for you to be able to trace.