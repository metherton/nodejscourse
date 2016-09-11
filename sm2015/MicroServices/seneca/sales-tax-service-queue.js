"use strict";

require('seneca')()
  .use('beanstalk-transport')
  .use('sales-tax-plugin')
  .listen({type:'beanstalk'});
