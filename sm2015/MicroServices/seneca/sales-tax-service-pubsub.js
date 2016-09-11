"use strict";

require('seneca')()
  .use('redis-transport')
  .use('sales-tax-plugin')
  .listen({type:'redis'});
