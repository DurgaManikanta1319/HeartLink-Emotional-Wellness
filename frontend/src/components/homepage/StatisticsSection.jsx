import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

function StatisticsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    {
      value: 76,
      label: 'Feel Digitally Disconnected',
      color: 'from-pink-400 to-pink-600'
    },
    {
      value: 62,
      label: 'Want Safe Emotional Space',
      color: 'from-purple-400 to-purple-600'
    },
    {
      value: 48,
      label: 'Avoid Sharing Feelings Online',
      color: 'from-blue-400 to-blue-600'
    }
  ];

  const [counters, setCounters] = useState([0, 0, 0]);

  useEffect(() => {
    if (inView) {
      stats.forEach((stat, index) => {
        let current = 0;
        const increment = stat.value / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.value) {
            current = stat.value;
            clearInterval(timer);
          }
          setCounters(prev => {
            const newCounters = [...prev];
            newCounters[index] = Math.floor(current);
            return newCounters;
          });
        }, 30);
      });
    }
  }, [inView]);

  return (
    <section ref={ref} className="py-20 px-4 relative z-10">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            The Impact of Digital Loneliness
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Understanding the emotional wellness crisis in our connected world
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="glass-card p-10 text-center hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className={`text-7xl font-bold mb-4 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {counters[index]}%
              </div>
              <p className="text-xl font-semibold text-gray-700 leading-relaxed">
                {stat.label}
              </p>
              <div className="mt-6 h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${counters[index]}%` } : {}}
                  transition={{ duration: 1.5, delay: index * 0.2 }}
                  className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12 text-gray-600 italic max-w-2xl mx-auto"
        >
          *Based on recent studies on digital wellbeing and emotional health in online spaces
        </motion.p>
      </div>
    </section>
  );
}

export default StatisticsSection;
