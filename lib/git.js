var cp = require('child_process');
var es = require('event-stream');
var util = require('util');

module.exports = {
  getCommits: getCommits
};

function getCommits(repo, done) {
  var cmd = 'cd '+ repo +'; git log -E --format=\'{"date": "%ad", "message": "%s"}\' HEAD';

  return es.child(cp.exec(cmd))
    .pipe(es.split('\n'))
    .pipe(es.map(function(data, cb) {
      var commit = getBeer(data);
      if (commit) cb(null, commit);
      else cb();
    }))
    .pipe(es.writeArray(done));
}

var getBeer = function(data){
  try {
    var commit = JSON.parse(data);
    if (!filter(commit.message)){
      return commit;
    }
  }
  catch(e) { }
  return null;
};

var filter = function(message){
  return /^feat.*:.+|^chore.*:.+|^style.*:.+|^fix.*:.+|^test.*:.+|^docs.*:.+|^merge.+/i.test(message);
};
