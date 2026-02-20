import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import BlogEditor from "../../container/features/blog/BlogEditor";
import { GetBlogByIdAction } from "../../redux/actions/blog/BlogActions";
import Spinner from "../../components/loading";

const BlogEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch: any = useDispatch();
  const [initialValues, setInitialValues] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    if (id === "new") {
      setInitialValues(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    dispatch(GetBlogByIdAction({ credentials: id }))
      .then((res: any) => {
        if (res.payload) {
          setInitialValues(res.payload);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="mt-[160px] w-full flex justify-center items-center h-[50vh]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mt-[100px] mb-[60px] mx-auto min-h-[50vh]">
      <BlogEditor
        mode={id === "new" ? "create" : "update"}
        value={id === "new" ? null : initialValues}
        onSubmitForm={() => navigate("/blog-management")}
        onCancel={() => navigate("/blog-management")}
      />
    </div>
  );
};

export default BlogEdit;
