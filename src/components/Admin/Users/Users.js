import React, { useEffect, useState } from "react";
import firebase from "firebase";
import UserDetails from "./UserDetails";
import { Collapse } from "antd";
import { Tooltip, Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

const { Panel } = Collapse;
const Users = () => {
  const [users, setusers] = useState([]);
  const [refresh, setrefresh] = useState(false);
  useEffect(() => {
    async function fetchUsers() {
      const users = await firebase.firestore().collection("users").get();
      setusers(users.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    }
    fetchUsers();
    setrefresh(false);
  }, [refresh]);

  return (
    <div>
      <Tooltip title="refresh">
        <Button
          type="primary"
          onClick={() => setrefresh(!refresh)}
          icon={<ReloadOutlined />}
        >
          Refresh
        </Button>
      </Tooltip>
      <Collapse accordion>
        {users?.map((user, index) => (
          <Panel header={`${user.fName} ${user.lName}`} key={index}>
            <UserDetails key={user?.id} user={user} />
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default Users;
