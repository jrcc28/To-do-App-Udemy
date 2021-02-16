const colors = require('colors');
const argv = require(`./config/yargs`).argv;
const toDo = require(`./to-do/to-do`);

let command = argv._[0]
switch (command) {
    case 'crear':
        console.log(`Crear nota`);
        let task = toDo.create(argv.description);
        console.log(task);
        break;
    case `listar`:
        console.log(`Listar notas:`);
        let list = toDo.getList();
        for (let task of list) {
            console.log(`=======To do:========`.green);
            console.log(`Description: ${task.description}`);
            console.log(`State: ${task.completed}`);
            console.log(`=====================\n`.green);
        }

        break;
    case `actualizar`:
        console.log(`Actualizar nota`);
        let updated = toDo.updateTask(argv.description, argv.completed);
        console.log(updated);
        break;

    case 'borrar':
        let borrar = toDo.deleteTask(argv.description);
        console.log(borrar);
        break;

    default:
        console.log(`Command undefined`);
        break;
}