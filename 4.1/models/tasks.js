const Task = require("./task");

require('colors');

/**
 * _listado
 * {  'id1234': { id: 1 , desc: asd, completed: 111}  }
 * {  'id123524': { id: 1 , desc: asd, completed: 111}  }
 * {  'id121253': { id: 1 , desc: asd, completed: 111}  }
 * 
 */
class Tasks {

    _listado = {}; // _ is used to express that is private

    constructor() {
        this._listado = {};
    }

    createTask(desc = '') {
        const task = new Task(desc);
        // this._listado.id || this._listado[id]
        this._listado[task.id] = task;
    }

    get listadoArr() { // It's like a property of the class
        const listado = [];
        let tarea;
        Object.keys(this._listado).forEach(key => { // return an array of all the keys
            listado.push(this._listado[key]);
        });

        return listado;
    }

    set listadoArr(tasks = []) {
        tasks.forEach(task => {
            this._listado[task.id] = task;
        });
    }

    listTasks() {
        let i = 1;
        let output = '';
        // Object.keys(this._listado).forEach(key => { // return an array of all the keys
        //     output = `${index}. ${this._listado[key].desc} :: `;
        //     if (this._listado[key].completed) {
        //         output += `${'Completed'.green}`;
        //     } else {
        //         output += `${'Incompleted'.red}`;
        //     }
        //     console.log(output);
        //     index++;
        // });

        this.listadoArr.forEach((value, index) => {
            i = `${index + 1}.`.green;
            const { desc, completed } = value;
            const state = (completed) ? 'Completed'.green : 'Incompleted'.red;

            console.log(`${i} ${desc} :: ${state}`);
        })
    }

    listComplete(comp = true) { // False return incompleted task
        let index = 1;
        this.listadoArr.forEach((value) => {
            const { desc, completed } = value;
            if (comp && completed) {
                console.log(`${(index+'.').green} ${desc} :: ${completed.green}`);
                index++;
            } else if (!comp && !completed) {
                console.log(`${(index+'.').green} ${desc} :: ${'Incompleted'.red}`);
                index++;
            }
        })
    }

    deleteTask(id = '') {
        if (this._listado[id])
            delete this._listado[id];
    }

    toggleTasks(ids = []) {
        ids.forEach(id => {
            const task = this._listado[id];
            if (!task.completed) {
                task.completed = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(task => {
            if (!ids.includes(task.id)) { // task.id doesn't exists into ids array?
                this._listado[task.id].completed = null;
            }
        });

    }
}

module.exports = Tasks;