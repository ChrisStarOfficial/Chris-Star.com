import { motion } from 'framer-motion';

export const HyperspaceEffect = () => {
  return (
    <div className="fixed inset-0 bg-black z-50 overflow-hidden">
      {/* Stars/particles moving towards camera */}
      <div className="absolute inset-0">
        {[...Array(200)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white rounded-full"
            initial={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              scale: 0.1,
              opacity: 0,
            }}
            animate={{
              scale: [0.1, 1, 2, 3],
              opacity: [0, 1, 0.8, 0],
              x: [
                `${(Math.random() - 0.5) * 100}px`,
                `${(Math.random() - 0.5) * 400}px`,
              ],
              y: [
                `${(Math.random() - 0.5) * 100}px`,
                `${(Math.random() - 0.5) * 400}px`,
              ],
            }}
            transition={{
              duration: 1 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Hyperspace tunnel streaks */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[1px] h-32 bg-gradient-to-b from-transparent via-blue-400 to-transparent"
            initial={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              rotate: Math.random() * 360,
              scale: 0,
            }}
            animate={{
              scale: [0, 8, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 0.8 + Math.random() * 0.5,
              repeat: Infinity,
              delay: Math.random() * 1.5,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Blue energy field */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-blue-400/10 to-purple-900/20"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Central light burst */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-blue-400/30 via-transparent to-transparent"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="text-white text-2xl font-light tracking-widest text-center"
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          JUMPING TO DESTINATION
        </motion.div>
      </div>

      {/* Side tunnel walls */}
      <div className="absolute inset-0 flex justify-between">
        <motion.div
          className="w-1/4 h-full bg-gradient-to-r from-blue-900/40 to-transparent"
          animate={{
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="w-1/4 h-full bg-gradient-to-l from-blue-900/40 to-transparent"
          animate={{
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
};