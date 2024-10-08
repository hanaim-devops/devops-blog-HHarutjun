const express = require('express');
const initJaegerTracer = require('jaeger-client').initTracer;

const app = express();
const port = 3000;

const config = {
  serviceName: 'my-service',
  reporter: {
    logSpans: true,
    agentHost: 'jaeger',
    agentPort: 6831,
  },
  sampler: {
    type: 'const',
    param: 1,
  },
};
const options = {
  tags: {
    'my-service.version': '1.0.0',
  },
};
const tracer = initJaegerTracer(config, options);

app.get('/', (req, res) => {
  const span = tracer.startSpan('hello-world');
  res.send('Hello, World!');
  span.finish();
});

app.get('/goodbye', (req, res) => {
    const span = tracer.startSpan('goodbye-world');
    res.send('Goodbye, World!');
    span.finish();
  });  

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
