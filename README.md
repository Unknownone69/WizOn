# WizOn
Efforts to reverse engineer and make a private server for a game no longer online and without packets.

Game files are hosted at https://mega.nz/#!CoNhXIzB!xtyuKz3_DjzmHneZCX74GhklD1sZVzrKMWojPbPrdnQ (pulled straight from steam) or otherwise you can install them directly from steam with the link steam://install/221360 (put it inside a browser, hit enter and if steam is installed it will prompt to open the steam client bootstrapper, open it and steam will download the files).

Launcher file has a check box to switch between having user+pass input fields and not having them.

Only file that needs to be changed is inside the Wizardry Online\data\settings folder which is connection_na.conf so that it points the game to the localhost so you can run a server to check its outbound call.

We have created a server and it is accessable inside the Server folder. It is a .net application that reads the packet sent from the game and sends one back as long as you have the cypher disabled.

Instructions to disable the cypher:
Start the game, attach debugger, go to address 0x004DF578 and change the right operand from 0x1 to 0x0 and then the correct packet should be sent to the server which will now respond with a packet back to the game for you to be able to trace (if every time you click connect the packet changes, then the cyphey is not correctly disabled.)

If you would like to help us out you can contact Hei#8806 or myself Unknownone69#2394 on discord.
