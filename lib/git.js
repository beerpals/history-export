var cp = require('child_process');
var es = require('event-stream');
var util = require('util');

module.exports = {
  getCommits: getCommits
};

function getCommits(repo, done) {
  var cmd = 'cd '+ repo +'; git log -E --format=\'{"date": "%ad", "beer": "%s"}\' HEAD';

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
    return JSON.parse(data);
  }
  catch(e) {
    return null;
  }
};
