import React from "react";
import { EditAccount } from "../containers/System";

const UpdatedUser = ({ setIsEdit, userId }) => {
  console.log(userId);
  return (
    <div
      className="absolute top-0 left-0 right-0 bottom-0 bg-overlay-70 flex justify-center"
      onClick={(e) => {
        e.stopPropagation();
        setIsEdit(false);
      }}
    >
      <div
        className="bg-white max-w-1100 w-full overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <EditAccount setIsEdit={setIsEdit} userId={userId} />
      </div>
    </div>
  );
};

export default UpdatedUser;
