import employeesReducer, {actions, Employee} from "./employeesReducer";

let state = {
    employees: [
        {
            id: 1,
            name: "Илья Емельянов",
            isArchive: false,
            role: "driver",
            phone: "+7 (883) 508-3269",
            birthday: "12.02.1982",
        },
        {
            id: 2,
            name: "Александр Ларионов",
            isArchive: true,
            role: "waiter",
            phone: "+7 (823) 440-3602",
            birthday: "26.01.1986",
        },
        {
            id: 3,
            name: "Богдан Давыдов",
            isArchive: false,
            role: "driver",
            phone: "+7 (971) 575-2645",
            birthday: "29.11.1990",
        },
        {
            id: 4,
            name: "Олимпиада Макарова",
            isArchive: true,
            role: "waiter",
            phone: "+7 (945) 447-2286",
            birthday: "06.01.1987",
        },
        {
            id: 5,
            name: "Алла Котова",
            isArchive: false,
            role: "cook",
            phone: "+7 (948) 523-2964",
            birthday: "26.01.1982",
        },
    ] as Employee[],
};

it('employee should be edit', () => {
    let action = actions.editEmployee({
        id: 2,
        name: "Алла Котова",
        isArchive: false,
        role: "waiter",
        phone: "+7 (823) 440-3602",
        birthday: "21.11.1786",
    })
    let newState = employeesReducer(state, action)
    expect(newState.employees[1]).toStrictEqual({
        id: 2,
        name: "Алла Котова",
        isArchive: false,
        role: "waiter",
        phone: "+7 (823) 440-3602",
        birthday: "21.11.1786",
    })
})

it('employees length should be increment', () => {
    let action = actions.addEmployee({
        id: 6,
        name: "Алла Котова",
        isArchive: true,
        role: "waiter",
        phone: "+7 (823) 440-3602",
        birthday: "26.01.1986",
    })
    let newState = employeesReducer(state, action)
    expect(newState.employees.length).toBe(6)
})