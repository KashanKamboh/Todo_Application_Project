#! /user/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

let todoList :string[]= [];
let conditions = true;

// Printing Welcome Messages
console.log(chalk.bold.rgb(204,204,204)(`\n  \t\t <<<================================================>>>`));
console.log(chalk.bold.rgb(204,204,204)(` <<<==================>>> Welcome to CodeWithKashaf -ToDo-List App <<<=================>>>`));
console.log(chalk.bold.rgb(204,204,204)(` \t\t <<<================================================>>>`));

let main = async () => {
    while (conditions){
        let options = await inquirer.prompt([
            {
                name: "choices",
                type: "list",
                message: "Choose an option you want to do:",
                choices: ["Add Task","Delete Task","Update Task", "View Todo-List", "Exit"],
            }
        ]);
        if(options.choices === "Add Task"){
            await addTask()
        }
        else if (options.choices === "Delete Task"){
            await deleteTask()
        }
        else if (options.choices === "Update Task"){
            await  updateTask()
        }
        else if(options.choices === "View Todo-List"){
            await viewTask()
        }
        else if (options.choices === "Exit"){
            conditions = false;
        }
        
    }
}
// Function to Add new Task
let addTask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: "Enter your new task:",
        }
    ]);
    todoList.push(newTask.task);
    console.log(`\n ${newTask.task} task added Successfully in Todo-List`);
    
}
//function to view Todo-list
let viewTask = async ()=> {
    console.log("\n Your Todo-List:")
    todoList.forEach((task , index) => {
        console.log(`${index + 1}: ${task}`)
    })
    
}
// Function to delete task from the list
let deleteTask = async () => {
    await viewTask ()
    let taskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "input",
            message: "Enter the `index no` of the tasks you want to delete :"
        }
    ]);
    let deletedTask = todoList.splice( taskIndex.index -1,1);
    console.log(`\n ${deletedTask} task has been deleted successfully from your Todo-List`);
}
// Function to update the task
let updateTask = async () =>{
    await viewTask()
    let update_task_index = await inquirer.prompt([
        {
            name: "index",
            type: "input",
            message: "Enter the `index no` of the tasks you want to update :"
        },
        {
            name: "new_task",
            type: "input",
            message: " Now Enter the new task:",
        }
    ])
    todoList[update_task_index.index -1] = update_task_index.new_Task
    console.log(`Task at index no ${update_task_index.index -1} updated successfully [For updated list check option: "View Todo-List"]`);
    
}

main();