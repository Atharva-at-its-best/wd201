const todoList = () => {
    const today = new Date().toLocaleDateString("en-CA");
    const all = [];
    const add = (todoItem) => {
        all.push(todoItem);
    };
    const markAsComplete = (index) => {
        all[index].completed = true;
    };

    const overdue = () => {
        return all.filter((item) => {
            return item.dueDate < today && !item.completed;
        });
    };

    const dueToday = () => {
        return all.filter((item) => {
            return (item.dueDate === today && !item.completed) || item.completed;
        });
    };

    const dueLater = () => {
        return all.filter((item) => {
            return item.dueDate > today && !item.completed;
        });
    };

    const toDisplayableList = (list) => {
        return list
            .map((item, index) => {
                const formateddateoutput = item.dueDate === today ? "" : item.dueDate;
                return `[${item.completed ? "x" : " "}] ${item.title} ${formateddateoutput}`;
            })
            .join("\n");
    };

    return {
        all,
        add,
        markAsComplete,
        overdue,
        dueToday,
        dueLater,
        toDisplayableList,
    };
};

module.exports = todoList;
