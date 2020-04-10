# Dawids year 3 dissretation

This is the repo for my final year project. This is a game of Monopoly, that can be played with 3 other players (4 player per game).


## Getting Started

Clone the repo in your chosen directory using 'git pull <http>'. You can then edit the code with your chosen ide. When you are done making changes, yse 'node app' to run the server. 

See deployment for notes on how to deploy the project on a live system.

## Implemented features

* User accounts - creation,login
* Chat
* Matchmaking 
* Private and public rooms
* Game starting
* Game Turns
* Dice functions
* Card creation
* Player movements

## Planned features

* The game actually working

### Prerequisites

The only thing needed is Nodejs and a IDE.

#### Download Node.js

Head on over to https://nodejs.org/en/download/, download the installed and follow the install wizards. 

#### Download IDE

Any IDE that can be used for JavaScript can be used to edit the files here. The one that I recomend is Visual Studio Code that can be found here: https://code.visualstudio.com/download  


## Built With

* [CSEE-Git](cseegit.essex.ac.uk/) - Used to store the app
* [Bcryptjs](https://www.npmjs.com/package/bcryptjs) - Used for hashing user passwords
* [Body-parser](https://www.npmjs.com/package/body-parser) -  Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
* [Connect](https://www.npmjs.com/package/connect) - Connect is an extensible HTTP server framework for node using "plugins" known as middleware.
* [Express](https://www.npmjs.com/package/express) -  Fast, unopinionated, minimalist web framework for node.
* [Express-session](https://www.npmjs.com/package/express-session) - Used to store the users session after they have logged on.
* [Mongoose](https://mongoosejs.com/docs/index.html) - USed to manage the database thatstores user accounts
* [Multer](https://www.npmjs.com/package/multer) - Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
* [Nodemailer](https://www.npmjs.com/package/nodemailer) - Used for sending mail when the user signs up.
* [Socket-io](https://socket.io/get-started/chat/) - Used for communication between the client and the server.
* [SWIG](https://node-swig.github.io/swig-templates/) - Templating engine used.


## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

The project is currently in version 0.2.21

## Authors

* **Dawid Gorski** - *Lead developer* - [Dav418](https://github.com/dav418)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc

