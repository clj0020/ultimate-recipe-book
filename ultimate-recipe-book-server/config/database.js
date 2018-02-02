'use strict';

const nconf = require('nconf');

// Read in keys and secrets. Using nconf use can set secrets via
// environment variables, command-line arguments, or a keys.json file.
nconf
	// command line arguments
	.argv()
	// environment variables
	.env()
	// config file
	.file('keys.json');

// Connect to a MongoDB server provisioned over at
// MongoLab.  See the README for more info.]]777777777444
const user = nconf.get('mongoUser');
const pass = nconf.get('mongoPass');
const host = nconf.get('mongoHost');
const port = nconf.get('mongoPort');
const gcloudProjectId = nconf.get('gcloudProjectId');

let uri = `mongodb://${user}:${pass}@${host}:${port}`;
if (nconf.get('mongoDatabase')) {
	uri = `${uri}/${nconf.get('mongoDatabase')}`;
}

module.exports = {
	// database: 'mongodb://madmen8:Rgb0lRw8JIhJ@ds139801.mlab.com:39801/heroku_w8xprj9n', // production
	database: uri, //dev
	secret: nconf.get("SECRET"),
	MEMCACHE_URL: nconf.get("MEMCACHE_URL"),
	// OAUTH2_CALLBACK: "https://${gcloudProjectId}.appspot.com/auth/google/callback",
	OAUTH2_CALLBACK: "http://localhost:8080/auth/google/callback",
	OAUTH2_CLIENT_ID: nconf.get("OAUTH2_CLIENT_ID"),
	OAUTH2_CLIENT_SECRET: nconf.get("OAUTH2_CLIENT_SECRET")
}
