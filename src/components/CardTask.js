import React from "react";
import "../App.css";
import dayjs from "dayjs";
import { FaTrashAlt } from "react-icons/fa";

function CardTask(props) {
  const { dataTask, deleteTask, handleDoneStatus } = props;

  return (
    <div>
      <div className="father">
        <div className="front">
          <div
            className={!dataTask.completed ? "task-pending" : "task-complete"}
          >
            {dataTask.completed ? "Task completed" : "Task pending"}
          </div>
          <h4>{dataTask.titleTask}</h4>
          <div style={{ display: "flex" }}>
            <h6>{dayjs(dataTask.taskDate).format("DD [-] MMMM [-] YYYY")}</h6>
            &nbsp;
            <h6>{dataTask.taskHour}</h6>
          </div>
        </div>

        <div className="back">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "5px",
              marginTop: "10px",
              position: "absolute",
              right: "0",
              top: "0",
              width: "100%",
              cursor: "pointer",
            }}
          >
            <FaTrashAlt onClick={deleteTask} title="Delete" />
          </div>

          <div className="card-contain">{dataTask.textTask}</div>
          <button
            className="btn-success"
            style={{ width: "80%" }}
            onClick={handleDoneStatus}
          >
            Done task!
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardTask;
