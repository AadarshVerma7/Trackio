import React from "react";
import GroupMemberToDo from "../../Components/GroupMemberToDo/GroupMemberToDo";
import GroupMemberList from "../../Components/GroupMemberList/GroupMemberList";
import AddResources from "../../Components/AddResources/AddResources";

function GroupPage({ theme }) {
  return (
    <>
      <div className="flex p-8">
        <div className="w-3/4">
          <GroupMemberToDo theme={theme}/>
          <AddResources theme={theme}/>
        </div>
        <div className="w-1/4 pt-5 ">
          <GroupMemberList theme={theme}/>
        </div>
      </div>
    </>
  );
}

export default GroupPage;
