exports = module.exports = {
    "apigeeEdgeCredentials" : {
    				orgName : process.env.orgName || 'XXXX',
					userName : process.env.userName || 'XXXX',
					password : process.env.password || 'XXXX',
					envName : process.env.envName || 'XXXX',
					logging : (process.env.logging === 'true'),
					curl : (process.env.curl === 'true'),
				}
			};