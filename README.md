<!-- Setting up react app -->

Take the clone of the repo on local. And then install the dependencies using npm i command.

<!-- Setting up the server  -->

When we used command npm i , it would have install a npm package called JSON Server , which is being used as a server by our react app.

Create the Custom hook (useTaskOperations)
for doing the common operation for ToDo , InProgress, Done component

Command to run the server is : "json-server --watch data/db.json --port 8000"

After doing all this the React app is connected to the server which is using db.json file as a Database.

<!-- State Management -->

We have to share the data between ToDo, InProgress ,Done component . So for maintaining and making the data easily accessbile to each of the component React-redux is used.
