const inquirer = require('inquirer');
require('colors');

const questions = [{
    type: 'list',
    name: 'option',
    message: 'What do you want to do?',
    choices: [{
            value: '1',
            name: `${'1.'.green} Create task`
        },
        {
            value: '2',
            name: `${'2.'.green} List tasks`
        },
        {
            value: '3',
            name: `${'3.'.green} List complete tasks`
        },
        {
            value: '4',
            name: `${'4.'.green} List pending tasks`
        },
        {
            value: '5',
            name: `${'5.'.green} Complete task(s)`
        },
        {
            value: '6',
            name: `${'6.'.green} Delete task`
        },
        {
            value: '0',
            name: `${'7.'.green} Exit`
        }
    ]
}];

const pause = [{
    type: 'input',
    name: 'enter',
    message: `Press ${'Enter'.green } to continue\n`
}];

const inquirerMenu = async() => {
    console.clear();
    console.log('=================='.green);
    console.log(' Choose an option'.green);
    console.log('==================\n'.green);

    const { option } = await inquirer.prompt(questions);
    return option;
}

const inquirerPause = async() => {
    console.log('\n');
    await inquirer.prompt(pause);
}

const readInput = async(message) => {
    const question = {
        type: 'input',
        name: 'desc',
        message,
        validate(value) {
            if (value.length === 0) {
                return 'Please enter a value'
            }
            return true;
        }
    }

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const listDeleteTasks = async(tasks = []) => {
    const choices = tasks.map((task, index) => {
        const i = `${index + 1}.`.green;
        return {
            value: task.id,
            name: `${i} ${task.desc}`
        }
    });

    choices.unshift({ // Add at the beginning
        value: '0',
        name: '0.'.green + 'Back'
    });

    const questions = [{
        type: 'list',
        name: 'id',
        message: 'delete',
        choices
    }]

    const { id } = await inquirer.prompt(questions);
    return id;
}

const listCompleteTasks = async(tasks = []) => {
    const choices = tasks.map((task, index) => {
        const i = `${index + 1}.`.green;
        return {
            value: task.id,
            name: `${i} ${task.desc}`,
            checked: (task.completed) ? true : false
        }
    });

    const questions = [{
        type: 'checkbox',
        name: 'ids',
        message: 'Choose tasks',
        choices
    }]

    const { ids } = await inquirer.prompt(questions);
    return ids;
}

const confirm = async(message) => {
    const question = [{
        type: 'confirm',
        name: 'ok',
        message
    }];

    const { ok } = await inquirer.prompt(question);
    return ok;
}

module.exports = {
    inquirerMenu,
    inquirerPause,
    readInput,
    listDeleteTasks,
    confirm,
    listCompleteTasks
}