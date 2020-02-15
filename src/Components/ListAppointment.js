import React, { Component } from "react";
import { FaTimes } from "react-icons/fa";
//import Moment from 'react-moment';

class ListAppointment extends Component {
  render() {
    const { Appts } = this.props;
    return (
      <div className="appointment-list item-list mb-3">
        {Appts.map((item,index) => (
          <div className="pet-item col media py-3" key={index}>
            <div className="mr-3">
              <button className="pet-delete btn btn-sm btn-danger"
              onClick={() => this.props.deleteAppointment(item)}>
                <FaTimes/>
              </button>
            </div>
            <div className="pet-info media-body">
              <div className="pet-head d-flex">
                <span className="pet-name">{item.petName}</span>
                <span className="apt-date ml-auto">{item.aptDate}</span>
              </div>
              <div className="owner-name">
                <span className="label-item">Owner: </span>
                <span>{item.ownerName}</span>
              </div>
              <div className="apt-notes">{item.aptNotes}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ListAppointment;
