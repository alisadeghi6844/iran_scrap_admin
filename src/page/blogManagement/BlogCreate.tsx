import React from "react";
import { useNavigate } from "react-router-dom";
import BlogEditor from "../../container/features/blog/BlogEditor";

const BlogCreate = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-[100px] mb-[60px] mx-auto min-h-[50vh]">
      <BlogEditor
        mode="create"
        onSubmitForm={() => navigate("/blog-management")}
        onCancel={() => navigate("/blog-management")}
      />
    </div>
  );
};

export default BlogCreate;
