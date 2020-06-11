module.exports = {
	'facebookAuth' : {
		'clientID': process.env.FBCLIENTID,
		'clientSecret': process.env.FBCLIENTSECRET,
		'callbackURL': process.env.FBCALLBACKURL
	},

	'googleAuth' : {
		'clientID': process.env.GOOGLECLIENTID,
		'clientSecret': process.env.GOOGLECLIENTSECRET,
		'callbackURL': process.env.GOOGLECALLBACKURL
	}
}