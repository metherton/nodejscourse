// AWS specific infrastructure
exports.awsRoot = {
  type: 'blank-container'
};

exports.awsWebElb = {
  type: 'aws-elb',
  specific: {
    Listeners: [{Protocol: 'HTTP', LoadBalancerPort: 80, InstanceProtocol: 'HTTP', InstancePort: 8000}]
  }
};

exports.awsWebSg = {
  type: 'aws-sg',
  specific: {
    GroupName: 'webSg',
    Description: 'Web security group',
    IpPermissions: [
      { 'IpProtocol': 'tcp', 'FromPort': 3000, 'ToPort': 3000, 'IpRanges': [ { 'CidrIp': '0.0.0.0/0' } ] },
      { 'IpProtocol': 'tcp', 'FromPort': 22, 'ToPort': 22, 'IpRanges': [ { 'CidrIp': '0.0.0.0/0' } ] },
      { 'IpProtocol': 'tcp', 'FromPort': 9002, 'ToPort': 9002, 'IpRanges': [ { 'CidrIp': '0.0.0.0/0' } ] },
      { 'IpProtocol': 'tcp', 'FromPort': 873, 'ToPort': 873, 'IpRanges': [ { 'CidrIp': '10.0.0.0/8' } ] },
      { 'IpProtocol': 'tcp', 'FromPort': 9001, 'ToPort': 9001, 'IpRanges': [ { 'CidrIp': '0.0.0.0/0' } ] },
      { 'IpProtocol': 'tcp', 'FromPort': 9000, 'ToPort': 9000, 'IpRanges': [ { 'CidrIp': '0.0.0.0/0' } ] },
      { 'IpProtocol': 'tcp', 'FromPort': 8000, 'ToPort': 8000, 'IpRanges': [ { 'CidrIp': '0.0.0.0/0' } ] }
    ],
    IpPermissionsEgress: [
      { IpProtocol: '-1', UserIdGroupPairs: [], IpRanges: [ { 'CidrIp': '0.0.0.0/0' } ] } ]
  }
};

exports.awsMachine = {
  type: 'aws-ami',
  name: 'demo2'
};

exports.awsAutoscaling = {
  type: 'aws-autoscaling',
  specific: {
    ImageId: 'ami-4b90b27b',
    MinSize: 2,
    MaxSize: 5
  }
};

exports.awsAMachine = {
  type: 'blank-container'
};
