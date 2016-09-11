exports.name = 'sudc-system';
exports.namespace = 'sudc';
exports.id = '62999e58-66a0-4e50-a870-f2673acf6c79';

exports.topology = {
  aws: {
    awsWebElb: [{
      awsWebSg: [{
        awsMachine: ['web']
      }, {
        awsMachine: ['doc', 'hist', 'real']
      }]
    }]
  },
  autoscaling: {
    awsWebElb: [{
      awsWebSg: [{
        awsAutoscaling: {
          awsAMachine: ['web', 'doc', 'hist', 'real']
        }
      }]
    }]
  },
  development: {
    root: ['doc', 'hist', 'real', 'web']
  },
  process: {
    root: ['doc', 'hist', 'real', 'web']
  }
};

