import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminNavbar from "../../components/Navbar/AdminNavbar";
import { FaBuffer } from "react-icons/fa";
import { MdNavigateNext } from "react-icons/md";

const AddLesson = () => {
  // State lưu dữ liệu từ form nhập vào
  const navigate = useNavigate();

  const {courseId, id} = useParams();
  const [lessonData, setLessonData] = useState({
    lessonName: "",
    description: "",
    date: "",
    course : {id : courseId} , // ID của khóa học
    isDeleted: false,
  });
  const [loading, setLoading] = useState(false); // Trạng thái loading

  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);

  const handleChange = (e) => {
    setLessonData({ ...lessonData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImg(e.target.files[0]);
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append(
      "lesson",
      new Blob([JSON.stringify(lessonData)], { type: "application/json" })
    );
    if (img) formData.append("img", img);
    if (video) formData.append("video", video);

    try {
      const response = await axios.post(
        "https://codearena-backend-dev.onrender.com/api/teacher/lessons/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // Cho phép gửi cookies, session
        }
      );      
      console.log("Thành công:", response.data);
      // alert("Thêm bài học thành công!");
      toast.success("Thêm bài học thành công!", {
      position: "top-right",
      autoClose: 3000,  // 4 giây
      });

      setTimeout(() => {
        navigate(-1);
        }, 4000);    
    } catch (error) {
      console.error("Lỗi:", error.response?.data || error.message);
      // alert("Lỗi khi thêm bài học!");
       toast.error("Không thể thêm bài học!", {
              position: "top-right",
              autoClose: 3000, 
            });
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-fit py-6 px-3">
      <AdminNavbar />
      <div className="flex gap-2">
        <FaBuffer size={30} />
        <MdNavigateNext size={30} />
        <h2 className="text-lg font-bold mb-4">Lesson Management</h2>
        <MdNavigateNext size={30} />
        <h2 className="text-lg font-bold mb-4">Add New Lesson</h2>
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <div className="space-y-4">
          {[{ label: "Lesson Title:", name: "lessonName", type: "text" }].map(
            ({ label, name, type }) => (
              <div key={name} className="flex items-center space-x-4">
                <label className="w-1/4 text-gray-700 font-medium">
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  value={lessonData[name]}
                  onChange={handleChange}
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-scolor"
                />
              </div>
            )
          )}
          <div className="flex items-center space-x-4">
            <label className="w-1/4 text-gray-700 font-medium">Image:</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="flex-1 border rounded-lg px-3 py-2"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="w-1/4 text-gray-700 font-medium">Video:</label>
            <input
              type="file"
              onChange={handleVideoChange}
              className="flex-1 border rounded-lg px-3 py-2"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="w-1/4 text-gray-700 font-medium">
              Description:
            </label>
            <textarea
              name="description"
              rows={3}
              value={lessonData.description}
              onChange={handleChange}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-scolor"
            ></textarea>
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 border-2 border-sicolor text-ficolor rounded-lg hover:bg-opacity-80"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`px-6 py-2 rounded-lg ${loading ? "bg-gray-400" : "bg-scolor text-ficolor hover:bg-opacity-80"}`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Submit"}
          </button>
        </div>
      </form>
            <ToastContainer /> 
      
    </div>
  );
};

export default AddLesson;
