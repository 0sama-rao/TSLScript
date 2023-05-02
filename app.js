// const readline = require('readline');
// const https = require('https');
// const tls = require('tls');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// rl.question('Enter a hostname to test (e.g. www.google.com): ', (hostname) => {
//   const versions = ['TLSv1', 'TLSv1.1', 'TLSv1.2'];

//   versions.forEach(version => {
//     const options = {
//       hostname: hostname,
//       port: 443,
//       secureProtocol: version,
//       method: 'GET'
//     };

//     const req = https.request(options, (res) => {
//       console.log(`${version}: ${res.socket.encrypted}`);
//     });

//     req.on('error', (error) => {
//       console.log(`${version}: ${error}`);
//     });

//     req.end();
//   });

//   rl.close();
// });

// const https = require('https');

// https.get('https://www.google.com', (res) => {
//   console.log(`TLS enabled: ${res.socket.encrypted}`);
//   console.log(`TLS 1.1: ${res.socket.encrypted}`);
//   console.log(`TLS 1.2: ${res.socket.encrypted}`);
//   console.log(`TLS 1.3: ${res.socket.encrypted}`);
// })

const readline = require('readline');
const https = require('https');
const tls = require('tls');
const { version } = require('os');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function testTLS(hostname, version) {
  const options = {
    hostname: hostname,
    port: 443,
    secureProtocol: version,
    method: 'GET'
  };
//${version}
  const req = https.request(options, (res) => {
    console.log(`TLS Enabled: ${res.socket.encrypted}`);
  });

  req.on('error', (error) => {
    console.log(`${version}: ${error}`);
  });

  req.end();
}

rl.question('Enter a hostname to test: ', (hostname) => {
  //const versions = res.socket.encrypted;//,'TLSv1.1','TLSv1.2'];
const versions = [tls, testTLS];
  let i = 0;

  function next() {
    if (i >= versions.length) {
      rl.close();
      return;
    }

    const version = versions[i];
    i++;

    testTLS(hostname, version);

    setImmediate(next);
  }

  next();
});