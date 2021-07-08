#!/usr/bin/env node

const fs = require('fs');
const util = require('util');
const chalk = require('chalk');
const path = require('path');
// console.log(fs.promises);
//Method2
// const lstat = util.promisify(fs.stat);

// Method3
const { lstat } = fs.promises;
const targetDir = process.argv[2] || process.cwd();
// console.log(`targetDir : ${targetDir}`);
fs.readdir(targetDir, async (err, filenames) => {
  if (err) {
    console.log(err);
    return;
  }

  const statPromises = filenames.map((filename) => {
    // console.log(path.join(targetDir, filename));
    return lstat(path.join(targetDir, filename));
  });

  try {
    const allStats = await Promise.all(statPromises);
    // console.log('after allstats');
    // console.log(allStats);
    for (let stats of allStats) {
      const index = allStats.indexOf(stats);

      if (stats.isFile()) {
        console.log(filenames[index]);
      } else {
        console.log(chalk.bold(filenames[index]));
      }
      // console.log(filenames[index], stats.isFile());
    }
  } catch (err) {
    console.log('in err');
    console.log(err);
  }

  // console.log(filenames);
});

//Method1
// const lstat = (fileName) =>{
//     return new Promise((resolve, reject)=>{
//         fs.lstat(fileName, (err, stats)=>{
//             if(err){
//                 reject(err);
//             }
//             resolve(stats);
//         })
//     })
// }
