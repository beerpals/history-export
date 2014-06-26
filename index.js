var git = require('./lib/git');

var repo = '~/Dropbox/Web/github/beerhub';

git.getCommits(repo, function(err, commits) {
  if (err) return done('Failed to read git log.\n'+err);
  console.log(commits);
});