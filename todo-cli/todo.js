const todoList = () => {
    all = []
    const add = (todoItem) => {
        all.push(todoItem)
    }
    const markAsComplete = (index) => {
        all[index].completed = true
    }

    const overdue = () => {
        const overdueItems = all.filter((item) => item.dueDate < today && !item.completed);
        return overdueItems;
    }

    const dueToday = () => {
        const itemsDueToday = all.filter((item) => item.dueDate === today && !item.completed || item.completed);
        return itemsDueToday;
    }

    const dueLater = () => {
        const itemsDueLater = all.filter((item) => item.dueDate > today && !item.completed);
        return itemsDueLater;
    }

    const toDisplayableList = (list) => {
        let output = "";
        list.forEach((item, index) => {
            const status = item.completed ? "X" : " ";
            if (item.dueDate === today && !item.completed || item.completed) {
                output += `[${status}] ${item.title}\n`;
            } else {
                output += `[${status}] ${item.title} ${item.dueDate}\n`;
            }
        });
        return output;
    }

    return {
        all,
        add,
        markAsComplete,
        overdue,
        dueToday,
        dueLater,
        toDisplayableList
    };
};

// ####################################### #
// DO NOT CHANGE ANYTHING BELOW THIS LINE. #
// ####################################### #

const todos = todoList();

const formattedDate = d => {
    return d.toISOString().split("T")[0]
}

var dateToday = new Date()
const today = formattedDate(dateToday)
const yesterday = formattedDate(
    new Date(new Date().setDate(dateToday.getDate() - 1))
)
const tomorrow = formattedDate(
    new Date(new Date().setDate(dateToday.getDate() + 1))
)

todos.add({ title: 'Submit assignment', dueDate: yesterday, completed: false })
todos.add({ title: 'Pay rent', dueDate: today, completed: true })
todos.add({ title: 'Service Vehicle', dueDate: today, completed: false })
todos.add({ title: 'File taxes', dueDate: tomorrow, completed: false })
todos.add({ title: 'Pay electric bill', dueDate: tomorrow, completed: false })

console.log("My Todo-list\n")

console.log("Overdue")
var overdues = todos.overdue()
var formattedOverdues = todos.toDisplayableList(overdues)
console.log(formattedOverdues)
console.log("\n")

console.log("Due Today")
let itemsDueToday = todos.dueToday()
let formattedItemsDueToday = todos.toDisplayableList(itemsDueToday)
console.log(formattedItemsDueToday)
console.log("\n")

console.log("Due Later")
let itemsDueLater = todos.dueLater()
let formattedItemsDueLater = todos.toDisplayableList(itemsDueLater)
console.log(formattedItemsDueLater)
console.log("\n\n")
