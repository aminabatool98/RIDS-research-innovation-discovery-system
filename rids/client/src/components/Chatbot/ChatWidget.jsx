import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { toggleChat, setChatOpen } from "../../redux/slices/uiSlice";
import { ChatWindow } from "./ChatWindow";

export const ChatWidget = () => {
  const chatOpen = useSelector((state) => state.ui.chatOpen);
  const dispatch = useDispatch();

  return (
    <>
      <motion.button
        onClick={() => dispatch(toggleChat())}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-wheat text-ink shadow-card focus-ring"
        aria-label="Open research assistant chat"
      >
        <AnimatePresence mode="wait">
          {chatOpen ? (
            <motion.span key="x" initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ opacity: 0 }}>
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ opacity: 0 }}>
              <MessageCircle className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-5 z-50 w-[min(380px,calc(100vw-2.5rem))] overflow-hidden rounded-xl border border-ink-line bg-ink-soft shadow-card"
          >
            <ChatWindow onClose={() => dispatch(setChatOpen(false))} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
