import React from "react";
import { CreatePost } from "../containers/System";

const UpdatePost = ({ setIsEdit }) => {
  //console.log(dataEdit);
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
        <CreatePost isEdit />
      </div>
    </div>
  );
};

export default UpdatePost;
