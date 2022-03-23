import React, { Component } from "react";
import { Container } from "./Containers/Container";
import { ThemeProvider } from "styled-components";

import { Dropdown } from "./Components/Dropdown";
import { Heading1, Heading3 } from ".//Components/Heading";
import { TextField } from "./Components/TextField";
import { Button } from "./Components/Button";
import { Table, Thead, Tr, Th } from "./Components/Table";
import { connect } from "react-redux";
import {
  AddTaskAction,
  changeThemeAction,
  deleteTask,
  doneTask,
  editTask,
  updateTask,
} from "../redux/actions/ToDoListAction";
import { arrTheme } from "./Themes/ThemeManager";

class ToDoList extends Component {
  state = {
    taskName: "",
    disabled: true,
  };

  renderTaskToDo = () => {
    return this.props.tasksList
      .filter((task) => !task.done)
      .map((task, index) => {
        return (
          <Tr key={index}>
            <Th style={{ verticalAlign: "middle" }}>{task.taskName}</Th>
            <Th className="text-right">
              <Button
                onClick={() => {
                  this.setState(
                    {
                      disabled: false,
                    },
                    () => {
                      this.props.dispatch(editTask(task));
                    }
                  );
                }}
                className="ml-1"
              >
                <i className="fa fa-edit"></i>
              </Button>
              <Button
                onClick={() => {
                  this.props.dispatch(doneTask(task.id));
                }}
                className="ml-1"
              >
                <i className="fa fa-check"></i>
              </Button>
              <Button
                onClick={() => {
                  this.props.dispatch(deleteTask(task.id));
                }}
                className="ml-1"
              >
                <i className="fa fa-trash"></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };

  renderTaskCompleted = () => {
    return this.props.tasksList
      .filter((task) => task.done)
      .map((task, index) => {
        return (
          <Tr key={index}>
            <Th style={{ verticalAlign: "middle" }}>{task.taskName}</Th>
            <Th className="text-right">
              <Button
                onClick={() => {
                  this.props.dispatch(deleteTask(task.id));
                }}
                className="ml-1"
              >
                <i className="fa fa-trash"></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };

  renderTheme = () => {
    return arrTheme.map((theme, index) => {
      return (
        <option key={index} value={theme.id}>
          {theme.name}
        </option>
      );
    });
  };

  componentWillReceiveProps(newProps) {
    this.setState({
      taskName: newProps.tasksEdit.taskName,
    });
  }
  render() {
    return (
      <div>
        <ThemeProvider theme={this.props.themeToDoList}>
          <Container className="container">
            <Dropdown
              onChange={(e) => {
                let { value } = e.target;
                this.props.dispatch(changeThemeAction(value));
              }}
            >
              {this.renderTheme()}
            </Dropdown>
            <Heading1 className="m-3">To do list</Heading1>
            <TextField
              value={this.state.taskName}
              onChange={(e) => {
                this.setState({
                  taskName: e.target.value,
                });
              }}
              name="taskName"
              label="Task name"
              className="w-50"
            />
            <Button
              onClick={() => {
                let { taskName } = this.state;
                let task = {
                  id: Date.now(),
                  taskName: taskName,
                  done: false,
                };

                this.props.dispatch(AddTaskAction(task));
              }}
              className="ml-2"
            >
              <i className="fa fa-plus"></i>
              Add task
            </Button>
            {this.state.disabled ? (
              <Button
                disabled
                onClick={() => {
                  this.props.dispatch(updateTask(this.state.taskName));
                }}
                className="ml-2"
              >
                <i className="fa fa-upload"></i>
                Update task
              </Button>
            ) : (
              <Button
                onClick={() => {
                  let { taskName } = this.state;
                  this.setState(
                    {
                      disabled: true,
                      taskName: "",
                    },
                    () => {
                      this.props.dispatch(updateTask(taskName));
                    }
                  );
                }}
                className="ml-2"
              >
                <i className="fa fa-upload"></i>
                Update task
              </Button>
            )}
            <hr style={{ borderColor: "white" }} />
            <Heading3>Tasks to do:</Heading3>
            <Table>
              <Thead>{this.renderTaskToDo()}</Thead>
            </Table>

            <Heading3>Tasks Completed</Heading3>
            <Table>
              <Thead>{this.renderTaskCompleted()}</Thead>
            </Table>
          </Container>
        </ThemeProvider>
      </div>
    );
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.tasksEdit.id !== this.props.tasksEdit.id) {
      this.setState({
        taskName: this.props.tasksEdit.taskName,
      });
    }
  }
}

const mapStateToProps = (state) => {
  return {
    themeToDoList: state.ToDoListReducer.themeToDoList,
    tasksList: state.ToDoListReducer.tasksList,
    tasksEdit: state.ToDoListReducer.tasksEdit,
  };
};

export default connect(mapStateToProps)(ToDoList);
