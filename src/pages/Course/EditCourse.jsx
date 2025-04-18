import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AdminNavbar from "../../components/Navbar/AdminNavbar";
import { FaBuffer } from "react-icons/fa";
import { MdNavigateNext } from "react-icons/md";
import { Link,useNavigate } from "react-router-dom";

const EditCourse = () => {
  const navigate = useNavigate();
  
  const { id } = useParams();
  const [course, setCourse] = useState({
    courseName: "",
    description: "",
    price: "",
    img: "",
  });

  const [lessons, setLessons] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://codearena-backend-dev.onrender.com/api/teacher/courses/${id}`, {
        withCredentials: true, // Cho phép gửi cookies hoặc xác thực từ trình duyệt
      })
      .then(({ data }) => {
        setCourse(data.data);
        setLessons(data.data.lessons || []);
      })
      .catch(() => setError("Không thể tải dữ liệu khóa học"))
      .finally(() => setLoading(false));
  }, [id]);
  
  const handleChange = (e) =>
    setCourse({ ...course, [e.target.name]: e.target.value });
  
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append(
      "course",
      new Blob([JSON.stringify(course)], { type: "application/json" })
    );
    if (file) formData.append("img", file);

    try {
      const response = await axios.put(
        `https://codearena-backend-dev.onrender.com/api/teacher/courses/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // Cho phép gửi cookies, session
        }
      );
      console.log("Thành công:",response);
      // alert("Cập nhật khóa học thành công!");
      toast.success("Cập nhật khóa học thành công!", {
        position: "top-right",
        autoClose: 3000,  // 4 giây
      });
      
      setTimeout(() => {
      navigate(-1);
      }, 4000);    
    } catch (error) {
      console.error("Lỗi:", error.response?.data || error.message);
      // alert("Lỗi khi thêm khóa học!");
      toast.error("Không thể cập nhật khóa học!", {
        position: "top-right",
        autoClose: 3000, 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddLesson = () => {
    // Chuyển hướng đến trang thêm bài học mới
    window.location.href = `/admin/courses/${id}/lesson`;
  };

  // if (loading) return <div className="text-center mt-10">Loading...</div>;
  // if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="flex-1 flex flex-col h-fit py-6 px-3">
      <AdminNavbar />
      <div className="flex gap-2">
        <FaBuffer size={30} />
        <MdNavigateNext size={30} />
        <h2 className="text-lg font-bold mb-4">Course Management</h2>
        <MdNavigateNext size={30} />
        <h2 className="text-lg font-bold mb-4">Edit Course</h2>
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <label className="w-1/4 text-gray-700 font-medium">
              Course Title:
            </label>
            <input
              type="text"
              name="courseName"
              value={course.courseName}
              onChange={handleChange}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-scolor"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="w-1/4 text-gray-700 font-medium">Price:</label>
            <input
              type="number"
              name="price"
              value={course.price}
              onChange={handleChange}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-scolor"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="w-1/4 text-gray-700 font-medium">Image:</label>
            <div className="flex-1">
              {course.img && (
                <img
                  src={course.img}
                  alt="Course"
                  className="w-40 h-40 object-cover rounded-md mb-2"
                />
              )}
              <input
                type="file"
                onChange={handleFileChange}
                className="border rounded-lg px-3 py-2 w-full"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <label className="w-1/4 text-gray-700 font-medium">
              Description:
            </label>
            <textarea
              name="description"
              rows={3}
              value={course.description}
              onChange={handleChange}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-scolor"
            ></textarea>
          </div>
          <div className="flex items-center space-x-4">
            <label className="w-1/4 text-gray-700 font-medium">Type:</label>
            <select
              name="courseEnum"
              value={course.courseEnum}
              onChange={handleChange}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-scolor"
            >
              <option>Select Type</option>
              <option value="FREE">Free</option>
              <option value="PAID">Paid</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
        <Link
            onClick={() => navigate(-1)}
            className="px-6 py-2 border-2 border-sicolor text-ficolor rounded-lg hover:bg-opacity-80"
          >
            Cancel
          </Link>
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

export default EditCourse;


