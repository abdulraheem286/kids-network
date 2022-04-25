import React, { useState } from "react";
import { Button } from "antd";
import { Select } from "antd";
import firebase from "firebase";
const { Option } = Select;
const UserDetails = ({ user }) => {
  const [state, setState] = useState({ isAdmin: false, ...user });
  const saveUser = async () => {
    try {
      firebase
        .firestore()
        .collection("users")
        .doc(user.id)
        .update({ isAdmin: state.isAdmin })
        .then(() => alert("User Updated"));
    } catch (error) {
      console.log(error);
    }
  };
  const deleteUser = async () => {
    try {
      firebase
        .firestore()
        .collection("users")
        .doc(user.id)
        .delete()
        .then(() => alert("User Deleted"));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="border rounded p-2 my-3">
      <div className="d-flex my-2">
        <Button className="mr-4" type="primary" onClick={saveUser}>
          Save
        </Button>
        <Button danger onClick={deleteUser}>
          Delete
        </Button>
      </div>
      <div className="d-flex w-100 justify-content-between">
        <label>First Name:</label>
        <p>{user.fName}</p>
      </div>
      <div className="d-flex w-100 justify-content-between">
        <label>Last Name:</label>
        <p>{user.lName}</p>
      </div>
      <div className="d-flex w-100 justify-content-between">
        <label>Email:</label>
        <p>{user.email}</p>
      </div>
      <div className="d-flex w-100 justify-content-between">
        <label>Admin:</label>
        <Select
          defaultValue={state?.isAdmin}
          style={{ width: 120 }}
          onChange={(e) => {
            console.log(e);
            setState({ ...state, isAdmin: e });
          }}
        >
          <Option value={true}>True</Option>
          <Option value={false}>False</Option>
        </Select>{" "}
      </div>
    </div>
  );
};

export default UserDetails;
