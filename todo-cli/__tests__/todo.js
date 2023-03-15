const todoList = require('../todo');

describe("Todolist Test Suite", () => {
    let todolist;

    beforeAll(() => {
        todolist = todoList();
        todolist.add(
            {
                title: "Test todo",
                completed: false,
                dueDate: new Date().toLocaleDateString("en-CA")
            }
        );
    });

    test("Should add new todo", () => {
        const todoItemsCount = todolist.all.length;
        todolist.add(
            {
                title: "Test todo",
                completed: false,
                dueDate: new Date().toLocaleDateString("en-CA")
            }
        );
        expect(todolist.all.length).toBe(todoItemsCount + 1);
    });

    test("Should mark a todo as complete", () => {
        expect(todolist.all[0].completed).toBe(false);
        todolist.markAsComplete(0);
        expect(todolist.all[0].completed).toBe(true);
    });

    test("Should retrieve overdue items", () => {
        const overdueDate = new Date("2023-03-14");
        todolist.add({
            title: "Overdue todo",
            completed: false,
            dueDate: overdueDate.toLocaleDateString("en-CA")
        });
        const overdueItems = todolist.overdue();
        expect(overdueItems.length).toBe(1);
        expect(overdueItems[0].title).toBe("Overdue todo");
    });

    test("Should retrieve due today items", () => {
        const today = new Date().toLocaleDateString("en-CA");
        todolist.add({
            title: "Todo due today",
            completed: false,
            dueDate: today
        });
        const dueTodayItems = todolist.dueToday();
        expect(dueTodayItems.length).toBe(1);
        expect(dueTodayItems[0].title).toBe("Todo due today");
    });

    test("Should retrieve due later items", () => {
        const futureDate = new Date("2023-03-16").toLocaleDateString("en-CA");
        todolist.add({
            title: "Todo due later",
            completed: false,
            dueDate: futureDate
        });
        const dueLaterItems = todolist.dueLater();
        expect(dueLaterItems.length).toBe(1);
        expect(dueLaterItems[0].title).toBe("Todo due later");
    });
});
