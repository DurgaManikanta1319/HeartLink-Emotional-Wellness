import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { HiOutlinePlus, HiOutlineCalendar, HiOutlineChatBubbleBottomCenterText, HiOutlineArrowLeftOnRectangle, HiOutlineSparkles, HiOutlineTrash, HiOutlinePaperAirplane } from "react-icons/hi2";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const emotions = [
  { name: "Happy", emoji: "😊", color: "from-yellow-200 to-orange-300", bg: "bg-yellow-50" },
  { name: "Calm", emoji: "😌", color: "from-teal-200 to-blue-300", bg: "bg-teal-50" },
  { name: "Anxious", emoji: "😰", color: "from-orange-200 to-red-300", bg: "bg-orange-50" },
  { name: "Sad", emoji: "😔", color: "from-blue-200 to-indigo-300", bg: "bg-blue-50" },
  { name: "Excited", emoji: "🤩", color: "from-pink-200 to-rose-300", bg: "bg-pink-50" },
];

function Dashboard() {
  const navigate = useNavigate();
  const [moods, setMoods] = useState([]);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletingMoodId, setDeletingMoodId] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      role: "assistant",
      content: "Hi, I am your HeartLink AI Coach. Tell me how you are feeling today.",
    },
  ]);
  const [chatError, setChatError] = useState("");

  const fetchMoods = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");
      
      const res = await axios.get(`${API_URL}/api/mood`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetched moods:", res.data);
      setMoods(res.data);
    } catch (err) {
      console.error("Failed to fetch moods", err);
      if (err.response?.status === 401) navigate("/login");
    }
  };

  useEffect(() => {
    fetchMoods();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleAddMood = async () => {
    if (!selectedEmotion) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API_URL}/api/mood`,
        { emotion: selectedEmotion.name, note },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Mood logged:", res.data);
      setSelectedEmotion(null);
      setNote("");
      fetchMoods();
    } catch (err) {
      console.error("Failed to add mood", err);
      alert("Failed to save mood. Please ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMood = async (moodId) => {
    const confirmed = window.confirm("Delete this journey entry?");
    if (!confirmed) return;

    setDeletingMoodId(moodId);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/api/mood/${moodId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMoods((prev) => prev.filter((mood) => mood._id !== moodId));
    } catch (err) {
      console.error("Failed to delete mood", err);
      alert("Failed to delete mood entry.");
    } finally {
      setDeletingMoodId(null);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const message = chatInput.trim();
    if (!message || chatLoading) return;

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    setChatLoading(true);
    setChatError("");
    setChatInput("");
    const userMessage = { role: "user", content: message };
    const updatedMessages = [...chatMessages, userMessage];
    setChatMessages(updatedMessages);

    try {
      const response = await axios.post(
        `${API_URL}/api/chat`,
        {
          messages: updatedMessages,
          selectedEmotion: selectedEmotion?.name || null,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.data.reply || "I am here for you." },
      ]);
    } catch (error) {
      const apiMessage =
        error.response?.data?.message ||
        "I could not respond right now. Please try again in a moment.";
      const apiDetails = error.response?.data?.details;
      setChatError(apiDetails ? `${apiMessage}` : apiMessage);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${selectedEmotion ? selectedEmotion.bg : 'bg-white/10'}`}>
      
      {/* Sidebar/Nav Overlay */}
      <nav className="fixed top-0 w-full z-40 bg-white/30 backdrop-blur-lg border-b border-white/20 px-8 py-4 flex justify-between items-center">
        <div className="text-2xl font-black bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent flex items-center gap-2">
          HeartLink 💖
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-gray-500 hover:text-red-500 font-bold transition-colors"
        >
          <HiOutlineArrowLeftOnRectangle className="text-xl" /> Logout
        </button>
      </nav>

      <main className="max-w-6xl mx-auto pt-32 pb-20 px-4 grid md:grid-cols-3 gap-10">
        
        {/* Left Column: Mood Selector */}
        <div className="md:col-span-2 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/60 backdrop-blur-2xl p-10 rounded-[3rem] shadow-glass border border-white/50"
          >
            <h2 className="text-3xl font-black mb-8 text-gray-800">How are you feeling right now?</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
              {emotions.map((emo) => (
                <motion.button
                  key={emo.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedEmotion(emo)}
                  className={`flex flex-col items-center p-6 rounded-[2rem] border-2 transition-all ${
                    selectedEmotion?.name === emo.name 
                    ? `border-purple-400 bg-white shadow-lg` 
                    : "border-transparent bg-white/40 hover:bg-white/60"
                  }`}
                >
                  <span className="text-4xl mb-3">{emo.emoji}</span>
                  <span className="font-bold text-gray-600">{emo.name}</span>
                </motion.button>
              ))}
            </div>

            <AnimatePresence>
              {selectedEmotion && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-6"
                >
                  <textarea
                    placeholder="Want to add a note about why? (Optional)"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full p-6 bg-white/50 border border-purple-100 rounded-[2rem] focus:ring-4 focus:ring-purple-200 outline-none transition-all resize-none h-32 text-lg text-gray-700 font-medium"
                  />
                  <button
                    onClick={handleAddMood}
                    disabled={loading}
                    className="w-full py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-[2rem] font-black text-xl shadow-2xl shadow-purple-200 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                  >
                    {loading ? "Saving Heartbeat..." : "Log My Mood 💖"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Statistics/Insights placeholder */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-8 rounded-[3rem] text-white shadow-xl">
              <HiOutlineCalendar className="text-4xl mb-4" />
              <div className="text-3xl font-black mb-1">{moods.length}</div>
              <div className="opacity-80 font-bold">Total Heartbeats</div>
            </div>
            <div className="bg-white/60 backdrop-blur-xl p-8 rounded-[3rem] shadow-glass border border-white/50">
              <HiOutlineSparkles className="text-4xl mb-4 text-purple-500" />
              <div className="text-3xl font-black mb-1">Stay Strong!</div>
              <div className="text-gray-500 font-bold text-sm">You are doing great.</div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-2xl p-6 rounded-[2rem] shadow-glass border border-white/50"
          >
            <div className="flex items-center gap-3 mb-4">
              <HiOutlineSparkles className="text-2xl text-purple-500" />
              <h3 className="text-xl font-black text-gray-800">HeartLink AI Coach</h3>
            </div>

            <div className="h-64 overflow-y-auto space-y-3 bg-white/40 rounded-2xl p-4 border border-white/50">
              {chatMessages.map((msg, index) => (
                <div
                  key={`${msg.role}-${index}`}
                  className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm font-medium ${
                    msg.role === "user"
                      ? "ml-auto bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                      : "mr-auto bg-gray-100 text-gray-700"
                  }`}
                >
                  {msg.content}
                </div>
              ))}
              {chatLoading && (
                <div className="mr-auto bg-gray-100 text-gray-700 px-4 py-2 rounded-2xl text-sm font-medium">
                  Thinking...
                </div>
              )}
            </div>
            {chatError && (
              <p className="mt-3 text-sm text-red-500 font-medium">{chatError}</p>
            )}

            <form onSubmit={handleSendMessage} className="mt-4 flex gap-3">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask for advice, breathing, or mood support..."
                className="flex-1 px-4 py-3 bg-white/70 border border-purple-100 rounded-2xl outline-none focus:ring-2 focus:ring-purple-300"
              />
              <button
                type="submit"
                disabled={chatLoading || !chatInput.trim()}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold disabled:opacity-50"
              >
                <HiOutlinePaperAirplane className="text-xl" />
              </button>
            </form>
          </motion.div>
        </div>

        {/* Right Column: Mood History */}
        <div className="space-y-6">
          <h3 className="text-2xl font-black text-gray-800 flex items-center gap-3">
            Your Journey <HiOutlinePlus className="text-purple-500" />
          </h3>
          
          <div className="space-y-4 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
            {moods.length === 0 ? (
              <div className="bg-white/40 p-10 rounded-[2.5rem] text-center border border-dashed border-gray-300">
                <p className="text-gray-400 font-bold italic">No history yet. Start by logging your first mood!</p>
              </div>
            ) : (
              moods.map((m, i) => {
                const emoData = emotions.find(e => e.name === m.emotion) || emotions[0];
                return (
                  <motion.div
                    key={m._id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white shadow-sm hover:shadow-md transition-shadow p-6 rounded-[2rem] border border-gray-100 group"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{emoData.emoji}</span>
                        <div>
                          <div className={`font-black ${m.emotion === 'Happy' ? 'text-yellow-600' : m.emotion === 'Anxious' ? 'text-red-600' : 'text-purple-600'}`}>
                            {m.emotion}
                          </div>
                          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                            {new Date(m.timestamp).toLocaleDateString()} • {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteMood(m._id)}
                        disabled={deletingMoodId === m._id}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-md disabled:opacity-50"
                        aria-label="Delete mood entry"
                        title="Delete entry"
                      >
                        <HiOutlineTrash className="text-lg" />
                      </button>
                    </div>
                    {m.note && (
                      <div className="flex gap-2 bg-gray-50 p-4 rounded-2xl italic text-gray-500 text-sm font-medium">
                        <HiOutlineChatBubbleBottomCenterText className="text-gray-300 shrink-0 mt-1" />
                        "{m.note}"
                      </div>
                    )}
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
