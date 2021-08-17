![alt text](https://is3-ssl.mzstatic.com/image/thumb/Purple115/v4/c3/87/9e/c3879ebe-7b27-c1af-021e-e234a326c4e5/AppIcon-1x_U007emarketing-0-6-0-85-220.png/1200x630wa.png "Okta Logo")

# Take Home Challenge
## To Do List App

✨This is a demo project  showing  the integration  of Okta's authentication widget and a web application✨
- User should be able to login to the application
- User should be able to view the list of their To do items
- User can see an input field where they can type a to-do item and upon submitting, the item is added to the ‘To do’ list

## Installation

A) You need [NodeJS](https://nodejs.org/en/) and the following packages:

Dependencies | 
--- |
|npm install express|
|npm install @okta/jwt-verifier|
|npm install cors|
|npm install node-storage|
|npm install simple-encryptor|

If you are on Windows, you can run `npm/install.bat` to install those dependencies.


B) Start the server by executing `node server.js` in a command prompt and verify the deployment by navigating to your server address in your preferred browser:

```sh
http://localhost:28550
```
> Note: `runapp.bat` launcher script can be used as an alternative to the command line 

## Specifications

- The ‘To do App’ is a Single Page Application in vanilla Javascript
- Server side protected Rest APIs to save and restore the ‘user edited To do list’
- User authenticates through Okta’s Sign-in Widget
- Secure REST APIs using Okta’s JWT Verifier
- The server side API is protected via Access/Bearer token

Login workflow|
--- |
The end user is shown the widget if the user is not logged in|
Upon logging in, the user is shown the homepage with a personalized greeting having the user name|
The end user is able to logout of the application|
Customized the Sign-in widget to match the theme of the application|
The web app uses PKCE (Proof Key for Code Exchange) as the OIDC Login flow|
The end user is able to go through the SMS MFA enrollment the first time he logs in|
The end user can send SMS from the widget and verify the SMS|

## Security and encryption

- Base64 encoding of the to do list before encryption so the data is obfuscated
- Encryption of the to do list items using secretID as key and RSA-256 strong algorithm
- The encryptor uses the specified secret Id to derive a key via computing it's SHA-256 hash
- Encryption is done on AES-256 with a unique IV (intialization vector) per call that is returned as part of the result
- Single database Storage per user ID which is only known by Okta and the user himself

We are more than ever concerned about the safety of personal data. Strong encryption an security is mandatory to guarantee the relaibility of the saved details even in case of a data leak. An attacker can get a hold on a database but it is no use if the data is not readable.

> The To Do List client App sends updates from the user as Base64 data, then the To Do List server verifies the user in Okta's database and encrypts the data before inserting to the local database. Only the app account admin who can access the secret key would be able to decrypt the data, however only Okta could determine who is the actual user matching the ID owner of this data; This guarantees a very strong safety all along the pipeline.

## Tech

The To Do List app uses a number of open source projects to work properly:
- [node.js](https://nodejs.org/en/) - evented I/O for the backend
- [Express](https://expressjs.com/) - back end web application framework for Node.js
- [Okta Sign-In Widget](https://github.com/okta/okta-signin-widget) - Javascript widget that provides a fully featured and customizable login experience 
- [@okta/jwt-verifier](https://github.com/okta/okta-oidc-js/tree/master/packages/jwt-verifier) - this library verifies Okta access and ID tokens
- [cors](https://github.com/expressjs/cors) -  Connect/Express middleware that can be used to enable CORS
- [node-storage](https://github.com/amativos/node-storage) - simple file based store for node.js
- [simple-encryptor](https://github.com/sehrope/node-simple-encryptor) - simple encryptor/decryptor for Node.js
- [js-base64](https://github.com/dankogai/js-base64) - Base64 transcoder
- [jQuery](https://jquery.com/) - DOM Traversal and Manipulation library

And of course this project is open source with a [public repository][git-repo-url] on GitHub.

## License
MIT

**Free Software, Thank you!**

[git-repo-url]: <https://github.com/reg31/ToDoServer.git>
