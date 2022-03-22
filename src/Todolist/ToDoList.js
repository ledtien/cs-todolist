import React, { Component } from "react";
import { Container } from "./Containers/Container";
import { ThemeProvider } from "styled-components";
import { ToDoListDarkTheme } from "./Themes/ToDoListDarkTheme";
import { ToDoListLightTheme } from "./Themes/ToDoListLightTheme";
import { ToDoListPrimaryTheme } from "./Themes/ToDoListPrimaryTheme";
import { Dropdown } from "./Components/Dropdown";
import { Heading1, Heading2, Heading3, Heading4 } from ".//Components/Heading";
import { Label, Input, TextField } from "./Components/TextField";
import { Button } from "./Components/Button";
import { Table, Thead, Tbody, Tr, Th, Td } from "./Components/Table";
import { connect } from "react-redux";
import { AddTaskAction } from "../redux/actions/ToDoListAction";

class ToDoList extends Component {
  state = {
    taskName: "",
  };

  renderTaskToDo = () => {
    return this.props.tasksList
      .filter((task) => !task.done)
      .map((task, index) => {
        return (
          <Tr key={index}>
            <Th style={{ verticalAlign: "middle" }}>{task.taskName}</Th>
            <Th className="text-right">
              <Button className="ml-1">
                <i className="fa fa-edit"></i>
              </Button>
              <Button className="ml-1">
                <i className="fa fa-check"></i>
              </Button>
              <Button className="ml-1">
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
              <Button className="ml-1">
                <i className="fa fa-trash"></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };
  render() {
    return (
      <div>
        <ThemeProvider theme={this.props.themeToDoList}>
          <Container className="container">
            <Dropdown>
              <option value="">Dark theme</option>
              <option value="">Light theme</option>
              <option value="">Primary theme</option>
            </Dropdown>
            <Heading1 className="m-3">To do list</Heading1>
            <TextField
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
            <Button className="ml-2">
              <i className="fa fa-upload"></i>
              Update task
            </Button>
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
}

const mapStateToProps = (state) => {
  return {
    themeToDoList: state.ToDoListReducer.themeToDoList,
    tasksList: state.ToDoListReducer.tasksList,
  };
};

export default connect(mapStateToProps)(ToDoList);
