require('colors');

const {
    inquirerMenu,
    inquirerPause,
    readInput,
    listDeleteTasks,
    confirm,
    listCompleteTasks
} = require('./helpers/inquirer');

const { saveDB, loadDB } = require('./helpers/saveFile');
const Tasks = require('./models/tasks');

const main = async() => {
    let opt = '1';
    const tasks = new Tasks();
    const data = loadDB();

    if (data) { // load tasks
        tasks.listadoArr = data;
    }

    do {
        opt = await inquirerMenu();
        console.log(opt);


        switch (opt) {
            case '1':
                const desc = await readInput('Insert the description: ');
                tasks.createTask(desc);
                break;
            case '2':
                tasks.listTasks();
                break;

            case '3': // completed tasks
                tasks.listComplete(true);
                break;
            case '4': // pending tasks
                tasks.listComplete(false);
                break;
            case '5': // complete tasks
                const ids = await listCompleteTasks(tasks.listadoArr);
                tasks.toggleTasks(ids);
                break;

            case '6': // delete task
                const id = await listDeleteTasks(tasks.listadoArr);
                if (id !== '0') {
                    const ok = await confirm("Are you sure to delete this note?")
                    if (ok) {
                        tasks.deleteTask(id);
                        console.log("Task deleted!");
                    }
                }
                break;
        }
        saveDB(tasks.listadoArr);

        if (opt !== '0') await inquirerPause();
    } while (opt !== '0');
}

main();