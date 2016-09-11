// infrastructure
exports.root = {
  type: 'blank-container'
};

exports.doc = {
  type: 'docker',
  override: {
    process: {
      type: 'process'
    }
  },
  specific: {
    repositoryUrl: 'https://github.com/nearform/sudc-doc.git',
    processBuild: 'npm install',
    execute: {
      args: '-p 9002:9002 -d',
      process: 'srv/doc-srv.js'
    }
  }
};


exports.hist = {
  type: 'docker',
  override: {
    process: {
      type: 'process'
    }
  },
  specific: {
    repositoryUrl: 'https://github.com/nearform/sudc-history.git',
    processBuild: 'npm install',
    execute: {
      args: '-p 9003:9003 -d',
      process: 'srv/hist-srv.js'
    }
  }
};

exports.real = {
  type: 'docker',
  override: {
    process: {
      type: 'process'
    }
  },
  specific: {
    repositoryUrl: 'https://github.com/nearform/sudc-realtime.git',
    processBuild: 'npm install',
    execute: {
      args: '-p 9001:9001 -d',
      process: 'srv/real-srv.js'
    }
  }
};

exports.web = {
  type: 'docker',
  override: {
    process: {
      type: 'process'
    }
  },
  specific: {
    repositoryUrl: 'https://github.com/nearform/sudc-web.git',
    processBuild: 'npm install; cd web; npm install; npm install bower; node_modules/.bin/bower install',
    ignored: ['.build'],
    execute: {
      args: '-p 8000:8000 -d',
      process: './index.js',
      cwd: 'web'
    }
  }
};

