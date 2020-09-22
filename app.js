// const profileDataArgs = process.argv.slice(2, process.argv.length);

// const printProfileData = profileDataArr => {
//     for(let i = 0; i < profileDataArr.length; i += 1) {
//         console.log(profileDataArr[i]);
//     }

//     console.log('================');

//     // profileDataArr.forEach(function(profileItem) {
//     //     console.log(profileItem);
//     // }); the arrow function does the same thing, but is cleaner
//     profileDataArr.forEach(profileItem => console.log(profileItem));
// };

// printProfileData(profileDataArgs);

// Initialize the file system module
// const fs = require('fs');
const inquirer = require('inquirer');


inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your Name?'
        }
    ])
    .then(answers => console.log(answers));
//Importing the generatePage function from page-tenplate.js
// const generatePage = require('./src/page-template.js');

// const profileDataArgs = process.argv.slice(2);
// const name = profileDataArgs[0];
// const github = profileDataArgs[1];
// const [name, github] = profileDataArgs;

// console.log(name, github);
// console.log(generatePage(name, github));

// fs.writeFile('index.html', generatePage(name, github), err => {
//     if (err) throw err;

//     console.log('Portfolio complete! Check out index.html to see the output!');
// });
