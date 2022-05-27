module.exports = {	
	apps: [
	{
	name: 'tryhackme',
	exec_mode: 'cluster',
	instances: 'max',
	script: './.output/server/index.mjs'
	}
       ],
	deploy: { 
		production: {
			host: ['0.0.0.0']
		}
	}
}
