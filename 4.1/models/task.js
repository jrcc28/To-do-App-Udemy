const { v4: uuidv4 } = require('uuid');

class Task {
    //Attributes
    id = '';
    desc = ''; // description
    completed = null; // date = completed, null = no completed

    constructor(desc) {
        this.desc = desc;
        this.id = uuidv4(); //Unique id
        this.completed = null;
    }


}

module.exports = Task;