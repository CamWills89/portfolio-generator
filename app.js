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

const mockData = {
    name: 'Lernantino',
    github: 'lernantino',
    confirmAbout: true,
    about:
      'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et.',
    projects: [
      {
        name: 'Run Buddy',
        description:
          'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
        languages: ['HTML', 'CSS'],
        link: 'https://github.com/lernantino/run-buddy',
        feature: true,
        confirmAddProject: true
      },
      {
        name: 'Taskinator',
        description:
          'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
        languages: ['JavaScript', 'HTML', 'CSS'],
        link: 'https://github.com/lernantino/taskinator',
        feature: true,
        confirmAddProject: true
      },
      {
        name: 'Taskmaster Pro',
        description:
          'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
        languages: ['JavaScript', 'jQuery', 'CSS', 'HTML', 'Bootstrap'],
        link: 'https://github.com/lernantino/taskmaster-pro',
        feature: false,
        confirmAddProject: true
      },
      {
        name: 'Robot Gladiators',
        description:
          'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque.',
        languages: ['JavaScript'],
        link: 'https://github.com/lernantino/robot-gladiators',
        feature: false,
        confirmAddProject: false
      }
    ]
  };

// printProfileData(profileDataArgs);

// Initialize the file system module
const fs = require('fs');
const inquirer = require('inquirer');

//Importing the generatePage function from page-tenplate.js
const generatePage = require('./src/page-template.js');

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your Name?',
            validate: nameInput => {
                if(nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username',
            validate: githubInput => {
                if(githubInput) {
                    return true;
                } else {
                    console.log('Please enter your github username!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
          },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({ confirmAbout }) => confirmAbout
          }
    ]);
};

const promptProject = portfolioData => {
    //if there's no 'projects' array property, create one
    if (!portfolioData.projects) {
        //this will store multiple project entries
        portfolioData.projects = [];
    }

    console.log(`
  =================
  Add a New Project
  =================
  `);
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project?',
        validate: projectInput => {
            if(projectInput) {
                return true;
            } else {
                console.log('Please enter your project name!');
                return false;
            }
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)',
        validate: projectDescriptionInput => {
            if(projectDescriptionInput) {
                return true;
            } else {
                console.log('Please enter a description for your project!');
                return false;
            }
        }
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you this project with? (Check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)',
        validate: githubLink => {
            if(githubLink) {
                return true;
            } else {
                console.log('Please enter the github link to your project!');
                return false;
            }
        }
      },
      {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false
      }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
          } else {
            return portfolioData;
          }
    });
  };

  promptUser()
  .then(promptProject)
  .then(portfolioData => {
    // const pageHTML = generatePage(portfolioData);
    const pageHTML = generatePage(mockData);

    fs.writeFile('./index.html', pageHTML, err => {
      if (err) throw new Error(err);

      console.log('Page created! Check out index.html in this directory to see it!');
    });
  });

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
