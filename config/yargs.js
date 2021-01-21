const description = {
    description: {
        demand: true,
        alias: 'd',
        desc: 'Description of the task'
    }
}

const completed = {
    completed: {
        alias: 'c',
        default: true,
        desc: 'True if the task is done'
    }
}

const argv = require('yargs')
    // .command('listar', 'Imprime en consola todas las notas almacenadas', opts)
    .command('crear', 'Crea una nota', description)
    .command('actualizar', 'Actualiza el estado de una nota', description, completed)
    .command('borrar', 'Delete an elemento from list', description)
    .help()
    .argv;

module.exports = {
    argv
}