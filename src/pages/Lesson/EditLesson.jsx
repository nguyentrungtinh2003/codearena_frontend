import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../../components/Navbar/AdminNavbar";
import { Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";

const EditLesson = () => {
  const navigate = useNavigate();

  const { courseId, lessonId } = useParams(); // Lấy cả courseId từ URL
  
  const [lessons, setLesson] = useState({
    lessonName: "",
    description: "",
    img: "",
    videoURL: "",
    course : {id : courseId},
  });

  useEffect(() => {
    console.log("Lesson ID:", lessonId);
    console.log("Course ID:", lessons.courseId);
  }, [lessonId, lessons.courseId]);
  
  const [file, setFile] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("Course ID:", courseId); // Kiểm tra xem có lấy được không

  useEffect(() => {
    axios
      .get(`https://codearena-backend-dev.onrender.com/api/lessons/${lessonId}`)
      .then(({ data }) => {
        console.log("Dữ liệu nhận từ API:", data);
        setLesson({
          ...data.data,
          course: { id: data.data.course?.id ?? courseId },
        });
        console.log("Dữ liệu gửi đi:", lessons);
        console.log("courseId trước khi gửi:", lessons.courseId);

      })
      .catch((err) => {
        console.error("Lỗi khi tải dữ liệu bài học:", err);
        setError("Không thể tải dữ liệu bài học");
      })
      .finally(() => setLoading(false));
  }, [lessonId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLesson({ ...lessons, [name]: value });
  };

  const handleImageChange = (e) => setFile(e.target.files[0]);
  const handleVideoChange = (e) => setVideo(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const formData = new FormData();
  
    formData.append("lesson", new Blob([JSON.stringify(lessons)], { type: "application/json" }));
    if (file) formData.append("img", file);
    if (video) formData.append("video", video);
  

    // Kiểm tra nếu course.id bị null
    if (!lessons.course?.id) {
    alert("Lỗi: Course ID bị null!");
    return;
    }

    console.log("Dữ liệu gửi đi:", [...formData.entries()]);
  
    try {
      const response = await axios.put(
        `https://codearena-backend-dev.onrender.com/api/lessons/update/${lessonId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("Phản hồi từ server:", response.data);
      // alert("Cập nhật bài học thành công!");
        toast.success("Cập nhật bài học thành công!", {
            position: "top-right",
            autoClose: 3000,  // 4 giây
            });
      
            setTimeout(() => {
              navigate(-1);
              }, 4000);  
    } catch (err) {
      console.error("Lỗi khi cập nhật bài học:", err.response?.data || err.message);
      // alert("Lỗi khi cập nhật bài học! Xem console để biết chi tiết.");
        toast.error("Không thể cập nhật bài học!", {
              position: "top-right",
              autoClose: 3000, 
            });
    }
    finally{
      setLoading(false);
    }
  };
  

  // if (loading) return <div className="text-center mt-10">Loading...</div>;
  // if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="flex-1 flex flex-col h-fit p-6">
      <AdminNavbar />
      <div className="flex gap-2">
        <MdNavigateNext size={30} />
        <h2 className="text-lg font-bold mb-4">Lesson Management</h2>
        <MdNavigateNext size={30} />
        <h2 className="text-lg font-bold mb-4">Edit Lesson</h2>
      </div>

      <Form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <Form.Group className="mb-3" controlId="formLessonName">
          <Form.Label>Lesson Name</Form.Label>
          <Form.Control type="text" name="lessonName" value={lessons.lessonName} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} name="description" value={lessons.description} onChange={handleChange} />
        </Form.Group>

        {/* Hiển thị ảnh cũ nếu có */}
        <Form.Group className="mb-3" controlId="formImage">
          <Form.Label>Lesson Image</Form.Label>
          {lessons.img && <img src={lessons.img} alt="Lesson" className="w-40 h-40 object-cover rounded-md mb-2" />}
          <Form.Control type="file" onChange={handleImageChange} />
        </Form.Group>

        {/* Hiển thị video cũ nếu có */}
        <Form.Group className="mb-3" controlId="formVideo">
          <Form.Label>Lesson Video</Form.Label>
          {lessons.videoURL && (
            <video controls className="w-64 h-40 mb-2">
              <source src={lessons.videoURL} type="video/mp4" />
              Trình duyệt của bạn không hỗ trợ video.
            </video>
          )}
          <Form.Control type="file" onChange={handleVideoChange} />
        </Form.Group>

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
          </button>        </div>
      </Form>
            <ToastContainer /> 
      
    </div>
  );
};

export default EditLesson;
