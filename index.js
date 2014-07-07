var argv = require('minimist')(process.argv.slice(2));
var fs = require('fs');
var git = require('./lib/git');

repo = fs.existsSync(argv['_'][0]) ? argv['_'][0] : '';

var compareByDate = function(a, b) {
  if (new Date(a.date) < new Date(b.date))
     return 1;
  if (new Date(a.date) > new Date(b.date))
    return -1;
  return 0;
};

git.getCommits(repo, function(err, commits) {
  if (err) return new Error('Failed to read git log.\n'+err);
  console.log(commits.sort(compareByDate));
});