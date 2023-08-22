const fs = require('fs');
const path = require('path');
const readline = require('readline');



const question = 'Are there any files or folders you wish to exclude? already excluded = /node_modules, *.spec.js, /build';

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question(`${question}`, function(answer) {
    const precluded = 'node_modules, build, .git, .next, .DS_Store';
    answer.length > 0 ? answer = precluded + ", " + answer : answer = precluded
  console.log("Thank you for your valuable feedback: ", answer);
  const exclusions = [".git", "//node_modules", "//.next"];

  exclusions.push(...answer.split(', ').map(x => new RegExp(x)));

    const tree = {
    'application-name': 'my-app' 
    };

    function crawl(dir, node) {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
        const fullpath = path.join(dir, item);
        const stat = fs.statSync(fullpath);
        
        if (stat.isFile() && !exclusions.some(exclude => fullpath.match(exclude))) {
        const ext = path.extname(item).slice(1);
        node[item] = { type: ext };
        } 
        else if (stat.isDirectory() && !exclusions.some(exclude => fullpath.match(exclude))) {
        node[item] = { type: "folder"};
        crawl(fullpath, node[item]); 
        }
    });
    }

    crawl('.', tree);

    const jsonTree = JSON.stringify(tree, null, 2);
    // console.log(JSON.stringify(tree, null, 2));

    fs.writeFile('map.json', jsonTree, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });

  rl.close();
});

