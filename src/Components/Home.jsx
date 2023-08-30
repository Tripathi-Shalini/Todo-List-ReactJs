import { useState } from "react";
import { Modal } from "antd";
import "../Assets/Style/Home.css";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  let [tasklist, setTaskList] = useState([]);
  const [deletemodal, setDeleteModal] = useState(false);
  const [editpopup, setEditPopup] = useState(false);
  let [copyarr, setCopyArr] = useState();
  let [edit, setedit] = useState();
  let [arrindex, setArrIndex] = useState();
  const [priority, setPriority] = useState();
  const [progress, setProgress] = useState("Todo");
  const [task, setTask] = useState();

  const handleButtonClick = (value) => {
    setPriority(value);
  };

  const inputhandlechange = (e) => {
    // const { value, name } = e.target;
    // setTask({ ...task, [name]: value });;
    setTask(e.target.value);
  };

  const inputhandleForProgress = (e, index) => {
    setProgress(e.target.value);
    tasklist[index].progress = e.target.value;
    setTaskList(tasklist);
    console.log("Data", e.target.value, index);
  };

  const AddTask = (e) => {
    e.preventDefault();

    tasklist.push({ task, priority, progress });
    console.log(tasklist);

    handleCancel();
  };

  const showModal = (data, index, editMode = false) => {
    setedit(data);
    setTask(data.task);
    setPriority(data.priority);
    setArrIndex(index);
    // console.log("edit0", data, index);
    setIsModalOpen(true);

    setEditPopup(editMode);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //   console.log(editpopup)

  //   Delete Modal

  const showDModal = (index) => {
    setArrIndex(index);

    setDeleteModal(true);
  };

  const handleDOk = () => {
    setDeleteModal(false);
  };

  const handleDCancel = () => {
    setDeleteModal(false);
  };

  const getIdandDelet = (arrindex) => {
    // console.log("index", arrindex)
    copyarr = [...tasklist];
    if (arrindex !== -1) {
      copyarr.splice(arrindex, 1);
      setTaskList(copyarr);
      handleDCancel();
    }
    // console.log("after delte", tasklist);
  };

  //   Edit Task
  const EditTask = () => {
    console.log("1ss", edit);
    tasklist[arrindex].task = task;
    tasklist[arrindex].priority = priority;
    setTaskList(tasklist);
    handleCancel();
  };

  return (
    <>
      <div class="container p-5 bg-light">
        <div className="row d-flex justify-content-between">
          <div className="col d-flex justify-content-start justify-content-between">
            <h1>
              <b>Task List</b>
            </h1>
          </div>
          <div className="col d-flex justify-content-end ">
            <div>
              <button
                type="button"
                class="btn btn-primary "
                onClick={showModal}
              >
                +Add Task
              </button>
            </div>
          </div>
        </div>
        <table class="table table-borderless">
          <thead>
            <tr>
              <th scope="col">Task</th>
              <th scope="col">Priority</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {tasklist?.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{data.task}</td>
                  <td>
                    <text
                      style={{
                        color:
                          data.priority == "High"
                            ? "red"
                            : data.priority == "Medium"
                            ? "yellow"
                            : "green",
                      }}
                    >
                      <b> {data.priority}</b>
                    </text>
                  </td>
                  <td>
                    <select
                      name="progress"
                      id="progress"
                      onChange={(e) => inputhandleForProgress(e, index)}
                      value={data.progress}
                    >
                      <option value="Todo">Todo</option>
                      <option value="Progress">Progress</option>
                      <option value="Done">Done</option>
                    </select>
                  </td>
                  <td>
                    {" "}
                    <div class="progress circalbtn">
                      <div
                        class={
                          data.progress == "Todo"
                            ? "progress-bar w-0"
                            : data.progress == "Progress"
                            ? "progress-bar w-50"
                            : "progress-bar w-100"
                        }
                        role="progressbar"
                        aria-valuenow={
                          data.progress == "Todo"
                            ? 0
                            : data.progress == "Progress"
                            ? 50
                            : 100
                        }
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </td>
                  <td>
                    {" "}
                    <FaRegEdit
                      onClick={() => {
                        showModal(data, index, true);
                      }}
                    />
                  </td>
                  <td>
                    <AiOutlineDelete
                      style={{ color: "red" }}
                      onClick={() => showDModal(index)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Add Modal start */}
        <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          destroyOnClose={true}
        >
          <div className="container">
            <label>
              <b className="text-secondary">Task</b>
            </label>
            <br />
            <input
              type="text"
              name="inputval"
              placheholder="Enter Task"
              value={task}
              onChange={inputhandlechange}
              className="form-control pt-2"
            />

            <br />

            <label>
              <b className="text-secondary">Priorty</b>
            </label>
            <br />
            <div className="row pt-2 d-flex justify-content-center">
              <div className="col">
                <button
                  type="button"
                  name="high"
                  class="btn btn-outline-danger"
                  onClick={() => handleButtonClick("High")}
                >
                  High
                </button>
              </div>
              <div className="col">
                <button
                  type="button"
                  class="btn btn-outline-warning"
                  name="medium"
                  onClick={() => handleButtonClick("Medium")}
                >
                  Medium
                </button>
              </div>
              <div className="col">
                <button
                  type="button"
                  class="btn btn-outline-success"
                  name="low"
                  onClick={() => handleButtonClick("Low")}
                >
                  Low
                </button>
              </div>
            </div>
            <br />
            <div className="col d-flex justify-content-center">
              {editpopup == true ? (
                <button  class="btn btn-primary " onClick={EditTask}>
                  Edit
                </button>
              ) : (
                <button
                  type="submit"
                  class="btn btn-secondary"
                  onClick={AddTask}
                >
                  Add
                </button>
              )}
            </div>
          </div>
        </Modal>

        {/* Add Modal End */}

        {/* Delete Modal Open */}

        <Modal
          open={deletemodal}
          onOk={handleDOk}
          onCancel={handleDCancel}
          footer={null}
          destroyOnClose={true}
        >
          <div className="container">
            <div className="d-flex justify-content-center">
              <h3>
                Are you sure you want to
                <br />
                delete this task?
              </h3>
            </div>
            <div className="row  pt-3">
              <div className="col d-flex justify-content-end">
                <button
                  className="btn btn-primary"
                  onClick={() => getIdandDelet(arrindex)}
                >
                  Delete
                </button>
              </div>
              <div className="col d-flex justify-content-start">
                <button className="btn btn-light" onClick={handleDCancel}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Modal>

        {/* Delete Modal close */}
      </div>
    </>
  );
};
export default HomePage;
