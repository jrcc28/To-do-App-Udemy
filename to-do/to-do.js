const fs = require('fs');
const colors = require('colors');

let listToDo = [];

const saveDB = () => {
    let data = JSON.stringify(listToDo); // Convert array to valid json
    // return new Promise((resolve, reject) => {
    //     fs.writeFile(`./db/data.json`, data, (err) => {
    //         if (err) reject(err);
    //         else resolve(`Saved in db/data.json`);
    //     });
    // })
    fs.writeFile(`./db/data.json`, data, (err) => {
        if (err) throw new Error('Error saving', err);
    });
}

const loadDB = () => {
    try {
        listToDo = require('../db/data.json'); // Just need to use require, JS convert the json file into JS Object or correspond
    } catch (error) {
        listToDo = [];
    }
    // console.log(listToDo);
}

const create = (description) => {
    loadDB();
    let toDo = {
        description,
        completed: false
    }
    listToDo.push(toDo);
    saveDB();
    return toDo;
}

const getList = () => {
    loadDB();
    return listToDo;
}

const updateTask = (description, completed = true) => {
    loadDB();
    let index = listToDo.findIndex(task => task.description === description); // Return index of the task if the descriptions match, else -1 not found
    if (index >= 0) {
        listToDo[index].completed = completed;
        saveDB();
        return true;
    } else return false;
}

const deleteTask = (description) => {
    loadDB();
    let newlistToDo = listToDo.filter(task => task.description !== description); // If description match return that object and delete it from array
    if (newlistToDo.length < listToDo.length) {
        listToDo = newlistToDo;
        saveDB();
        return true;
    } else return false;
}

module.exports = {
    create,
    getList,
    updateTask,
    deleteTask
}