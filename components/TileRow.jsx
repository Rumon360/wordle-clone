import { AnimatePresence, motion } from "framer-motion";

export const TileRow = ({ letters = [], results = [], active }) => {
  const flipDelay = 0.2;

  return (
    <div className={`flex space-x-3 ${active ? "active-row" : ""}`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const letter = letters[i]?.toUpperCase() || "";
        const result = results[i];

        const bg =
          result === "Correct"
            ? "bg-green-600"
            : result === "Available"
            ? "bg-yellow-400"
            : result === "Incorrect"
            ? "bg-gray-700/50"
            : "bg-transparent";

        const border =
          result || active ? "border-gray-400" : "border-gray-700/50";

        return (
          <motion.div
            key={i}
            className={`flex justify-center items-center border-2 ${border} ${bg} 
              w-[55px] lg:w-[80px] h-[60px] lg:h-[80px] rounded-md transition-all duration-150`}
            initial={{ rotateX: 0 }}
            animate={{
              rotateX: result ? 360 : 0,
              transition: {
                duration: 0.65,
                delay: i * flipDelay,
                ease: "easeInOut",
              },
            }}
          >
            <AnimatePresence mode="popLayout">
              {letter && (
                <motion.h1
                  key={letter + i}
                  className="text-2xl md:text-3xl lg:text-4xl text-white font-bold"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {letter}
                </motion.h1>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};
