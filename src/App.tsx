import React from "react";
import "./App.css";
import {useSelector} from "react-redux";
import {getSuitableEmployees} from "./redux/selectors";

function App() {
    const employees = useSelector(getSuitableEmployees)
    console.log(employees)
    return <div>

    </div>;
}

export default App;
