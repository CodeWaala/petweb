import React, { Component } from "react";
import "../css/App.css";
import AddAppointment from "../Components/AddAppointment.js";
import SearchAppointment from "../Components/SearchAppointment.js";
import ListAppointment from "../Components/ListAppointment.js";
import { without } from "lodash";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Appts: [],
      formDisplay: false,
      orderBy: "petName",
      orderDir: "asc",
      queryText: ''
    };

    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.addAppointment = this.addAppointment.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
    this.searchAppts = this.searchAppts.bind(this);
  }

  componentDidMount() {
    fetch("./data.json")
      .then(response => response.json())
      .then(result => {
        this.setState({
          Appts: result
        });
      });
  }

  deleteAppointment(apt) {
    let tempAppts = this.state.Appts;
    tempAppts = without(tempAppts, apt);
    this.setState({
      Appts: tempAppts
    });
  }

  addAppointment(apt) {
    let tempAppts = this.state.Appts;
    tempAppts.unshift(apt);
    this.setState({
      Appts: tempAppts
    });
  }

  toggleForm() {
    this.setState({
      formDisplay: !this.state.formDisplay
    });
  }

  changeOrder(order,dir) {
    this.setState({
       orderBy: order,
       orderDir: dir
    })
  }

  searchAppts(query) {
    this.setState({ queryText: query });
  }

  render() {
    let order;
    let filteredApts = this.state.Appts;
    if (this.state.orderDir === "asc") {
      order = 1;
    } else {
      order = -1;
    }

    filteredApts = filteredApts.sort((a, b) => {
      if (
        a[this.state.orderBy].toLowerCase() <
        b[this.state.orderBy].toLowerCase()
      ) {
        return -1 * order;
      } else {
        return 1 * order;
      }
    })
    .filter(eachItem => {
      return (
       eachItem['petName']
       .toLowerCase()
       .includes(this.state.queryText.toLowerCase()) ||
       eachItem['ownerName']
       .toLowerCase()
       .includes(this.state.queryText.toLowerCase()) ||
       eachItem['aptNotes']
       .toLowerCase()
       .includes(this.state.queryText.toLowerCase())
      );
    });

    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointment
                  addAppointment={this.addAppointment}
                  formDisplay={this.state.formDisplay}
                  toggleForm={this.toggleForm}
                />
                <SearchAppointment
                  orderBy={this.state.orderBy}
                  orderDir={this.state.orderDir}
                  changeOrder= {this.changeOrder}
                  searchAppts= {this.searchAppts}
                />
                <ListAppointment
                  Appts={filteredApts}
                  deleteAppointment={this.deleteAppointment}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
