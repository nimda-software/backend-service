// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
const envName = (name = '') => name.match(/.env.[\w\-]+/)[0];
(async function (copy) {
  const fileArgs = process.argv.slice(2);
  const envs = {
    dev: path.join(__dirname, '../.env.development'),
    prod: path.join(__dirname, '../.env.production'),
    test: path.join(__dirname, '../.env.test'),
  };
  const example = path.join(__dirname, '../.env.example');
  const copyOrSkip = (file) => (promiseCopy) => {
    if (fs.existsSync(file)) {
      return console.log(`${envName(file)} - already exists. Skipping.`);
    }
    console.log(`${envName(file)} - copying...`);
    return promiseCopy();
  };

  if (fileArgs.length > 0) {
    return fileArgs.forEach((env) => {
      if (envs[env]) return copyOrSkip(envs[env])(copy(example, envs[env]));
      console.log(`${env} - not found.`);
    });
  }

  console.log('No arguments provided. Creating for:');
  console.log('  dev, prod, test, test-e2e');
  const promises = Object.keys(envs).map((env) => copyOrSkip(envs[env])(copy(example, envs[env])));
  return Promise.all(promises);
})(function (src, dest) {
  return () =>
    new Promise(function (resolve, reject) {
      fs.copyFile(src, dest, (err) => {
        if (err) return reject(err);
        console.log(`${envName(src)} -> ${envName(dest)} - COPIED.`);
        resolve();
      });
    });
})
  .catch(console.error)
  .finally(() => process.exit(0));
