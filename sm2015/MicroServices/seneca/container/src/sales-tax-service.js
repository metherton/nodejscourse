"use strict";

require('seneca')()
  .use('sales-tax-plugin')
  .listen({
    host: '0.0.0.0'
  });
