var argv = require('minimist')(process.argv.slice(2));
var fs = require('fs');
var git = require('./lib/git');

repo = fs.existsSync(argv['_'][0]) ? argv['_'][0] : '';

git.getCommits(repo, function(err, commits) {
  if (err) return done('Failed to read git log.\n'+err);
  console.log(commits);
});