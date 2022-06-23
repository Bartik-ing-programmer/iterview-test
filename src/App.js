import { useReducer, useState, useEffect } from "react";
import "./App.css";
import reducer from "./reducer";
import CardTask from "./components/CardTask";
import Modal from "./components/modal/Modal";
import { FaFortAwesome, FaFeatherAlt, FaFrog } from "react-icons/fa";

const initialState = {
  items: [],
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [task, setTask] = useState({
    textTask: "",
    titleTask: "",
    taskDate: "",
    taskHour: "",
  });

  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch({
      type: "set_items",
      payload: {
        items: {
          idTask: Math.round(Math.random() * 100000),
          taskDate: task.taskDate,
          taskHour: task.taskHour,
          completed: false,
          titleTask: task.titleTask,
          textTask: task.textTask,
        },
      },
    });

    setTask({
      textTask: "",
      titleTask: "",
      taskDate: "",
      taskHour: "",
    });

    setShowModal(false);
  };

  const handleDoneStatus = (task) => {
    const idx = task.idTask;

    dispatch({
      type: "done_task",
      idx,
    });

    alert("Status done changed");
  };

  const deleteTask = (task) => {
    const idx = task.idTask;

    dispatch({
      type: "delete_task",
      idx,
    });
  };

  const filterRegister = (data) => {
    if (!data || data === "") return setSearch("");

    setSearch(data);

    const filteredTask = state.items.filter((t) =>
      t.titleTask.toLowerCase().includes(data.toLowerCase())
    );

    setFilterData(filteredTask);
  };

  useEffect(() => {}, [filterData]);

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>Schedule</h1>
          <button className="header-button" onClick={() => setShowModal(true)}>
            Add new task 📝
          </button>
        </header>

        {state.items.length > 0 && (
          <>
            <input
              type="text"
              className="filter-input"
              placeholder="🔎 Filter task by title"
              value={search}
              onChange={(e) => filterRegister(e.target.value)}
            />

            <div className="task-container">
              {state.items.length > 0 &&
                search === "" &&
                state.items.map((t) => (
                  <CardTask
                    key={t.idTask}
                    handleDoneStatus={() => handleDoneStatus(t)}
                    deleteTask={() => deleteTask(t)}
                    dataTask={t}
                  />
                ))}

              {filterData.length > 0 &&
                search !== "" &&
                filterData.map((t) => (
                  <CardTask
                    key={t.idTask}
                    handleDoneStatus={() => handleDoneStatus(t)}
                    deleteTask={() => deleteTask(t)}
                    dataTask={t}
                  />
                ))}

              {filterData.length === 0 && search !== "" && (
                <p>Task relation not exists</p>
              )}
            </div>
          </>
        )}

        <footer className="footer">
          <FaFortAwesome className="footer-icons" size="25px" />
          <FaFeatherAlt className="footer-icons" size="25px" />
          <FaFrog className="footer-icons" size="25px" />
        </footer>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <div className="content-modal">
          <div className="header-modal">
            <h1 className="content-title">Schedule</h1>
            <h4>New task</h4>
          </div>

          <form className="form-modal" onSubmit={handleSubmit}>
            <div className="dateTime-container">
              <input
                type="date"
                value={task.taskDate}
                onChange={(e) => setTask({ ...task, taskDate: e.target.value })}
                required
              />
              &nbsp;
              <input
                type="time"
                value={task.taskHour}
                onChange={(e) => setTask({ ...task, taskHour: e.target.value })}
                required
              />
            </div>

            <input
              className="titleTask-input"
              type="text"
              name="titleTask"
              placeholder="Title"
              value={task.titleTask}
              onChange={(e) => setTask({ ...task, titleTask: e.target.value })}
              required
              minLength={6}
            />

            <textarea
              className="textTask-input"
              rows="8"
              name="textTask"
              placeholder="Description"
              value={task.textTask}
              onChange={(e) => setTask({ ...task, textTask: e.target.value })}
              required
              minLength={6}
            />

            <div className="buttons-modal">
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn-success">
                Success
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default App;
