import { useState, useRef, useEffect } from "react";

const PublicNotesWidget = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      userName: "Dr. Ariful",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
      text: "Tooth #16 order needs verification.",
      time: "10:30 AM",
      isSelf: false,
    },
    {
      id: 2,
      userName: "You",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
      text: "Updated delivery schedules for today.",
      time: "11:15 AM",
      isSelf: true,
    },
  ]);

  const [newNote, setNewNote] = useState("");
  const chatEndRef = useRef(null);

  // Auto scroll to bottom when new message arrives
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [notes]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    const newEntry = {
      id: Date.now(),
      userName: "You",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
      text: newNote,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSelf: true,
    };

    setNotes((prev) => [...prev, newEntry]);
    setNewNote("");
  };

  return (
    <div className="w-full lg:w-80 bg-white rounded-3xl border border-slate-200 shadow-md flex flex-col h-[520px] overflow-hidden">
      {/* Header */}
      <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
          <div>
            <h3 className="text-xs font-black tracking-wider uppercase">
              Team Noticeboard
            </h3>
            <p className="text-[10px] text-slate-400 font-medium">Public Messenger</p>
          </div>
        </div>
        <span className="bg-slate-800 text-slate-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-slate-700">
          {notes.length}
        </span>
      </div>

      {/* Messages List Area */}
      <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-slate-50/50">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`flex gap-2 items-end ${
              note.isSelf ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <img
              src={note.avatar}
              alt={note.userName}
              className="w-6 h-6 rounded-full bg-slate-200 border border-slate-300"
            />
            <div
              className={`max-w-[80%] p-2.5 text-xs rounded-2xl ${
                note.isSelf
                  ? "bg-blue-600 text-white rounded-br-none shadow-sm"
                  : "bg-white text-slate-800 rounded-bl-none border border-slate-200 shadow-2xs"
              }`}
            >
              <div
                className={`flex justify-between items-center gap-2 mb-1 text-[9px] font-bold ${
                  note.isSelf ? "text-blue-200" : "text-slate-400"
                }`}
              >
                <span>{note.userName}</span>
                <span>{note.time}</span>
              </div>
              <p className="leading-snug font-medium break-words">{note.text}</p>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Box with Send Button */}
      <form onSubmit={handleSend} className="p-2.5 bg-white border-t border-slate-100 flex gap-1.5 items-center">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Type a note..."
          className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl transition shadow-sm active:scale-95 cursor-pointer flex items-center justify-center"
          title="Send Note"
        >
          <svg className="w-4 h-4 transform rotate-90" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default PublicNotesWidget;