import { useState, useEffect } from "react";
import { toastAlert } from "../../../toastAlert/toastAlert.js";
import Header from "../Header/Header.jsx";
import { IoAdd } from "react-icons/io5";
import { motion } from "motion/react";
import axios from "axios";
import ProjectsCard from "./ProjectsCard.jsx";
import { IoCloseOutline } from "react-icons/io5";
import { User } from "../../../../../../backend/src/models/users.model.js";



function Project() {
  const [isAddButtonClicked, setIsAddButtonClicked] = useState(false);
  const [sentInvites, setSentInvites] = useState([]);
  const [receivedInvites, setReceivedInvites] = useState([]);
  const [isInviteButtonClicked, setIsInviteButtonClicked] = useState(false);
  const [isInviteTabOpen, setIsInviteTabOpen] = useState("sent");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startedAt, setStartedAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("Pending");

  const fetchProject = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/project/getProjects",
        {
          withCredentials: true,
        }
      )
      setProjects(response.data.message)
      console.log(response.data)
    } catch (error) {
      console.log("error in fetching projects", error)
    }
  }

  const handleInvites = async () => {
    setLoading(true);
    setIsInviteButtonClicked(!isInviteButtonClicked);
    try {
      const response = await axios.get(
        "http://localhost:4000/invites/getSentInvites",
        {
          withCredentials: true,
        }
      )
      console.log(response.data)
      setSentInvites(response.data.message)
      const response2 = await axios.get(
        "http://localhost:4000/invites/getReceivedInvites",
        {
          withCredentials: true,
        }
      )
      console.log(response2.data)
      setReceivedInvites(response2.data.message)
      if (sentInvites.length > 0 || receivedInvites.length > 0) {
        setLoading(false);
      }
    } catch (error) {
      console.log("error in fetching invites", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAcceptInvite = async(userId, projectId) => {
    console.log("userId", userId, "projectId", projectId)
    try {
      const response = await axios.put('http://localhost:4000/project/addCollaborator',
      {
        userId,
        projectId
      },
      {
        withCredentials:true
      }
    )
      
      console.log(response.data)
      toastAlert(response.data.message, "success")
    } catch (error) {
      console.log("error in adding collaborator", error)
      console.log(error.response.data)
    }
  }

  const handleInviteStauts = async(id, status) => {
    try {
      const response = await axios.put(`http://localhost:4000/invites/updateInviteStatus/${id}`,
        {
          status
        },
        {
          withCredentials:true
        }
      )
      console.log(response.data)
      toastAlert(response.data.message, "success")
    } catch (error) {
      toastAlert(error.response.data.message, "error")
      console.log("error in updating invite status", error)
    }
  }

  const handleDeleteInvite = async(id) => {
    try {
      const response = await axios.delete(`http://localhost:4000/invites/deleteInvite/${id}`,
        {
          withCredentials:true
        }
      )
      console.log(response.data)
      toastAlert(response.data.data, "success")

      setSentInvites((prev) => prev.filter((invite)=> invite._id !==id))
    }
    catch (error) {
      console.log("error in deleting invite", error)
    }
  }

  useEffect(() => {
    fetchProject();
  }, []);

  const handleAddProject = () => {
    setIsAddButtonClicked(!isAddButtonClicked);
    console.log(isAddButtonClicked);
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/project/createProject",
        {
          title,
          description,
          startedAt,
          endAt,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      toastAlert(response.data.data);
      setProjects((prev) => [...prev, response.data.message]);
      setTitle("");
      setDescription("");
      setStartedAt("");
      setEndAt("");
      setIsAddButtonClicked(false);
    } catch (error) {
      toastAlert(error.response.data.message, "error");
      console.error("error in creating project", error);
    }
  };

  return (
    <div className="flex flex-col relative h-screen w-full">
      <div>
        <Header />
      </div>
      <div className="bg-[#e0e4ff] lg:h-[88.2%] lg:mx-8 mt-4 rounded-t-2xl px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl text-black font-bold">Existing Projects</h1>
          <div className="flex flex-row gap-3 ">
            <button
              onClick={handleInvites}
              className="flex gap-2 px-4 py-2 bg-black/80 text-white rounded-lg hover:cursor-pointer"
            >
              Invites
            </button>
            {isInviteButtonClicked ? (
              <button className="absolute top-19 left-60 h-4/5 w-3/5 bg-black/10 backdrop-blur-3xl flex flex-col rounded-2xl text-black p-6 gap-6">
                <div className="border-b h-8 border-black/20 flex flex-row justify-between w-full px-4 ">
                  <div className="flex flex-row gap-6 text-bottom">
                    <button
                      onClick={() => setIsInviteTabOpen("sent")}
                      className={`border-b-3 pb-1 px-2 py-0.5 text-base cursor-pointer ${
                        isInviteTabOpen === "sent"
                          ? "border-purple-600/80 font-semibold"
                          : "border-transparent"
                      }`}
                    >
                      Sent
                    </button>
                    <button
                      onClick={() => setIsInviteTabOpen("received")}
                      className={`border-b-3 pb-1 px-2 py-0.5 text-base cursor-pointer ${
                        isInviteTabOpen === "received"
                          ? "border-purple-600/80 font-semibold"
                          : "border-transparent"
                      }`}
                    >
                      Received
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() =>
                        setIsInviteButtonClicked(!isInviteButtonClicked)
                      }
                      className="text-3xl w-8 cursor-pointer"
                    >
                      <IoCloseOutline />
                    </button>
                  </div>
                </div>
                <div className="h-full w-full flex flex-col gap-3 overflow-y-scroll px-4">
                  {isInviteTabOpen === "sent" &&
                    sentInvites.map((invites) => (
                      <motion.ul
                        initial={{ y: 300 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-row justify-between items-center bg-white/40 px-4 rounded-2xl"
                        key={invites._id}
                      >
                        <div className="flex flex-row py-2 gap-7">
                          <div className="flex flex-col py-2 text-left">
                            <span className="font-semibold">Invited</span>
                            <span className="font-semibold">For Project </span>
                          </div>
                          <div className="flex flex-col py-2 text-left">
                            <li>{invites.invitedUser.username}</li>
                            <li>{invites.project.title}</li>
                          </div>
                        </div>
                        <div className="flex flex-row gap-3">
                          <button
                            className={`
                              h-10 px-4 text-white rounded-lg hover:cursor-pointer backdrop-blur-2xl shadow-md
                              ${
                                invites.status === "Accepted"
                                  ? "bg-[#93a877]"
                                  : ""
                              }
                              ${
                                invites.status === "Rejected"
                                  ? "bg-[#df7373]"
                                  : ""
                              }
                              ${
                                invites.status === "Pending"
                                  ? "bg-gray-400"
                                  : ""
                              }
                            `}
                          >
                            {invites.status}
                          </button>
                          {invites.status === "Pending" && (
                            <button
                              onClick={() => handleDeleteInvite(invites._id)}
                              className="h-10 px-4 bg-rose-400 text-white rounded-lg hover:cursor-pointer backdrop-blur-2xl shadow-md"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </motion.ul>
                    ))}

                  {isInviteTabOpen === "received" &&
                    receivedInvites.map((invites) => (
                      <motion.ul
                        initial={{ y: 300 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-row justify-between items-center bg-white/40 px-4 rounded-2xl"
                        key={invites._id}
                      >
                        <div className="flex flex-row py-2 gap-7">
                          <div className="flex flex-col py-2 text-left">
                            <span className="font-semibold">Invited By</span>
                            <span className="font-semibold">For Project </span>
                          </div>
                          <div className="flex flex-col py-2 text-left">
                            <li>{invites.invitedBy.username}</li>
                            <li>{invites.project.title}</li>
                          </div>
                        </div>
                        <div className="flex flex-row gap-3">
                          {invites.status === "Pending" ? (
                            <div className="flex flex-row gap-3">
                              <button
                                onClick={() => {
                                  setStatus("Accepted");
                                  handleInviteStauts(invites._id, "Accepted")
                                  handleAcceptInvite(invites.invitedUser, invites.project._id)
                                }}
                                className="h-10 px-4 bg-[#93a877] shadow-md text-white rounded-lg hover:cursor-pointer"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => {
                                  setStatus("Rejected");
                                  handleInviteStauts(invites._id, "Rejected")
                                }}
                                className="h-10 px-4 bg-[#df7373] shadow-md text-white rounded-lg hover:cursor-pointer"
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <button
                              className={`h-10 px-4 text-white rounded-lg hover:cursor-pointer backdrop-blur-2xl shadow-md ${
                                invites.status === "Accepted"
                                  ? "bg-[#93a877]"
                                  : ""
                              }
                              ${
                                invites.status === "Rejected"
                                  ? "bg-[#df7373]"
                                  : ""
                              }
                            `}
                            >
                              {invites.status}
                            </button>
                          )}
                        </div>
                      </motion.ul>
                    ))}
                </div>
              </button>
            ) : null}
            <button
              onClick={handleAddProject}
              className="flex gap-2 px-4 py-2 bg-black/80 text-white rounded-lg hover:cursor-pointer"
            >
              Start New Project
              <span className="text-2xl">
                <IoAdd />
              </span>
            </button>
            {isAddButtonClicked ? (
              <motion.div
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute top-19 left-60 h-4/5 w-3/5 bg-black/10 backdrop-blur-3xl flex flex-col items-center rounded-2xl text-black p-6 gap-6"
              >
                <div className="w-full flex justify-between px-6">
                  <h1 className="text-3xl font-bold mt-3">Add Project</h1>
                  <button
                    onClick={handleAddProject}
                    className="text-3xl w-8 cursor-pointer"
                  >
                    <IoCloseOutline />
                  </button>
                </div>
                <form
                  className="w-3/4 h-3/4 flex flex-col gap-10 items-center py-4"
                  action=""
                >
                  <div className="w-full h-full flex">
                    <div className="w-2/5 text-base flex flex-col justify-center gap-8">
                      <label
                        className="font-semibold py-2"
                        htmlFor="projectName"
                      >
                        Project Name
                      </label>
                      <label
                        className="font-semibold py-2"
                        htmlFor="projectDescription"
                      >
                        Project Description
                      </label>
                      <label
                        className="font-semibold py-2"
                        htmlFor="startingDate"
                      >
                        Starting Date
                      </label>
                      <label className="font-semibold py-2" htmlFor="dueDate">
                        Due Date
                      </label>
                    </div>
                    <div className="text-base w-3/5 flex flex-col justify-center gap-8">
                      <input
                        className="px-4 w-full py-2 bg-white/80 rounded-2xl outline-none"
                        type="text"
                        id="projectName"
                        placeholder="Enter Project Name"
                        value={title}
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                      />
                      <input
                        className="px-4 w-full py-2 bg-white/80 rounded-2xl outline-none"
                        type="text"
                        id="projectDescription"
                        placeholder="Enter Project Description"
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      />
                      <input
                        className="px-4 w-full py-2 bg-white/80 rounded-2xl outline-none"
                        type="date"
                        id="startingDate"
                        value={startedAt}
                        onChange={(e) => {
                          setStartedAt(e.target.value);
                        }}
                      />
                      <input
                        className="px-4 w-full py-2 bg-white/80 rounded-2xl outline-none"
                        type="date"
                        id="dueDate"
                        value={endAt}
                        onChange={(e) => {
                          setEndAt(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    onClick={handleCreateProject}
                    className="px-4 w-1/2 py-2 bg-black text-white rounded-lg hover:cursor-pointer mt-4"
                  >
                    Create Project
                  </button>
                </form>
              </motion.div>
            ) : null}
          </div>
        </div>
        <div className="py-4 my-3 h-11/12 w-full gap-10 flex flex-row">
          {projects.map((project) => (
            <div key={project._id}>
              <ProjectsCard
                id={project._id}
                title={project.title}
                description={project.description}
                startedAt={project.startedAt}
                endAt={project.endAt}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Project;
