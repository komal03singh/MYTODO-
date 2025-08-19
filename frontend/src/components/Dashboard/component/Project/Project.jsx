import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { toastAlert } from "../../../toastAlert/toastAlert";
import { IoCloseOutline } from "react-icons/io5";

function Project() {
  const { id } = useParams();
  const [title, setTitle] = useState("");

  const [isAddMemButtonClicked, setIsAddMemButtonClicked] = useState(false);
  const [email, setEmail] = useState("");

  const fetchProject = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/project/getSingleProject/${id}`,
          {
            withCredentials: true,
          }
        );
        console.log(response.data);
        setTitle(response.data.message.title);
      } catch (error) {
        console.log("error in fetching project", error);
      }
    }

  const handleInvite = async(e)=>{
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:4000/invites/createInvite',
        {
          projectId : id,
          email
        },
        {
          withCredentials:true
        }
      )
      console.log(response.data)
      toastAlert(response.data.data, "success")
      setEmail("")
    } catch (error) {
      toastAlert(error.response.data.message, "error")
    }
  }

  useEffect(() => {
    fetchProject();
  },[]);

  return (
    <div className="flex flex-col relative h-screen w-full">
      <div className="flex justify-between items-center h-16 px-7">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <button
          onClick={() => setIsAddMemButtonClicked(!isAddMemButtonClicked)}
          className="bg-black text-white px-4 py-2 h-10 rounded-lg hover:cursor-pointer"
        >
          Add Members
        </button>
      </div>
      {isAddMemButtonClicked ? (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-40 left-60 h-3/12 w-3/5 bg-black/10 backdrop-blur-3xl flex flex-col items-center rounded-2xl text-black p-4"
        >
          <div className="flex justify-between items-center w-full px-6">
            <h1 className="text-2xl font-bold">Member Invite</h1>
            <button onClick={() => setIsAddMemButtonClicked(!isAddMemButtonClicked)} className="text-2xl cursor-pointer"><IoCloseOutline /></button>
          </div>
      
          <form
            className="w-full h-full flex items-center px-7"
            onSubmit={handleInvite}
            action="">
            <div className="w-full h-10 flex gap-6 items-center">
                <label className="text-lg font-semibold" htmlFor="Email">
                  E-mail
                </label>
                <input
                  className="px-4 py-2 w-4/5 bg-white/80 rounded-2xl outline-none"
                  type="text"
                  id="Email"
                  placeholder="Enter Invitee's Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
            </div>
            <button
              type="submit"
              className="px-4 w-1/3 h-10 bg-black text-white rounded-lg hover:cursor-pointer"
            >
              Send Invite
            </button>
          </form>
        </motion.div>
      ) : null}
      <div className="bg-[#e0e4ff] lg:h-[88.2%] lg:mx-8 mt-4 rounded-t-2xl px-6 py-4"></div>
    </div>
  );
}

export default Project;
