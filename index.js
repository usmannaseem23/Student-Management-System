#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class student {
    static counter = 1000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 1000;
    }
    enroll_course(course) {
        this.courses.push(course);
    }
    view_balance() {
        console.log(chalk.green.italic(`Balance for ${this.name} is : PKR ${this.balance}`));
    }
    pay_Fees(amount) {
        this.balance -= amount;
        console.log(chalk.green.italic(`PKR ${amount} Fees paid successfully for ${this.name}`));
        console.log(chalk.blue.italic(`Remaning balance is  : PKR ${this.balance}`));
    }
    show_status() {
        console.log(chalk.italic.magentaBright(`ID : ${this.id} `));
        console.log(chalk.italic.magentaBright(`Name ${this.name}`));
        console.log(chalk.italic.magentaBright(`Courses ${this.courses}`));
        console.log(chalk.italic.magentaBright(`Balance ${this.balance}`));
    }
}
class std_manager {
    students;
    constructor() {
        this.students = [];
    }
    new_student(name) {
        let studEnt = new student(name);
        this.students.push(studEnt);
        console.log(chalk.green.italic(`${name} successfully added in new student and his/her id is ${studEnt.id} :`));
    }
    enroll_student(student_id, course) {
        let stud_course = this.find_student(student_id);
        if (stud_course) {
            stud_course.enroll_course(course);
            console.log(chalk.green.italic(`${stud_course.name} enrolled in ${course} successfully`));
        }
        else {
            console.log(chalk.red.italic(" Student not found . please enter a correct user ID "));
        }
    }
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log(chalk.red.italic(" Student not found . please enter a correct user ID "));
        }
    }
    pay_student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_Fees(amount);
        }
        else {
            console.log(chalk.red.italic("Student not found . please enter a correct user ID "));
        }
    }
    show_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
        else {
            console.log(chalk.red.italic("Student not found . please enter a correct user ID "));
        }
    }
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
async function mang() {
    console.log(chalk.bgBlackBright.bold.italic("Student Managment System"));
    let std_work = new std_manager();
    while (true) {
        let student_choice = await inquirer.prompt([
            {
                name: "students",
                message: chalk.blue.italic("Choose an option:"),
                type: "list",
                choices: [
                    "Add student",
                    "Enroll student",
                    "View student balance",
                    "Pay fees",
                    "Show status",
                    "Exit"
                ]
            }
        ]);
        switch (student_choice.students) {
            case "Add student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: (chalk.yellow.italic)("Enter a student name"),
                    }
                ]);
                std_work.new_student(name_input.name);
                break;
            case "Enroll student":
                let enroll_process = await inquirer.prompt([
                    {
                        name: "std_id",
                        type: "number",
                        message: chalk.green.italic("Enter the student ID")
                    },
                    {
                        name: "course",
                        type: "input",
                        message: chalk.green.italic("Enter the course name")
                    }
                ]);
                std_work.enroll_student(enroll_process.std_id, enroll_process.course);
                break;
            case "View student balance":
                let std_balanceprocess = await inquirer.prompt([
                    {
                        name: "idd",
                        type: "number",
                        message: chalk.blue.italic("Enter the student ID")
                    }
                ]);
                std_work.view_student_balance(std_balanceprocess.idd);
                break;
            case "Pay fees":
                let pay_process = await inquirer.prompt([
                    {
                        name: "id",
                        type: "number",
                        message: chalk.blue.italic("Enter student ID")
                    },
                    {
                        name: "fee",
                        type: "number",
                        message: chalk.yellow.italic("Enter the amount to pay")
                    }
                ]);
                std_work.pay_student_fees(pay_process.id, pay_process.fee);
                break;
            case "Show status":
                let status = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: chalk.blue.italic("Enter the student ID")
                    }
                ]);
                std_work.show_status(status.student_id);
                break;
            case "Exit":
                console.log(chalk.red.italic("Exit..."));
                process.exit();
        }
    }
}
mang();
