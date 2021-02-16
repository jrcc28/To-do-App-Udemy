const { read } = require('fs');

require('colors');

const showMenu = async() => {
    return new Promise((resolve) => {
        console.clear();
        console.log('=================='.green);
        console.log(' Choose an option'.green);
        console.log('==================\n'.green);
    
        console.log(`${'1.'.green} Create task`);
        console.log(`${'2.'.green} Show tasks`);
        console.log(`${'3.'.green} Show completed task`);
        console.log(`${'4.'.green} Show pending task`);
        console.log(`${'5.'.green} Complete task`);
        console.log(`${'6.'.green} Delete task`);
        console.log(`${'0.'.green} Exit`);
    
        // Interface to show and receive info from user
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readLine.question('Choose an option: ', (opt) => {
            readLine.close();
            resolve(opt);
        });
    });


}

const pause = () => {
    return new Promise((resolve) => {
        // Interface to show and receive info from user
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readLine.question(`\nPress ${'Enter'.green} to continue \n`, (opt) => {
            readLine.close();
            resolve();
        });
    });
}


module.exports = {
    showMenu,
    pause

}