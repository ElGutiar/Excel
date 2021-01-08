console.log('Module JS');

async function start() {
  return await Promise.resolve();
}

start().then(console.log('working'));
