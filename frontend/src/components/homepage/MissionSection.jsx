import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaHeart, FaHandsHelping, FaSeedling } from 'react-icons/fa';

function MissionSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const coreValues = [
    {
      icon: <FaHeart className="text-5xl text-pink-400" />,
      title: 'Empathy',
      description: 'Understanding and sharing the feelings of others in a digital world'
    },
    {
      icon: <FaHandsHelping className="text-5xl text-purple-400" />,
      title: 'Safe Communication',
      description: 'Creating spaces where authentic expression is protected and valued'
    },
    {
      icon: <FaSeedling className="text-5xl text-blue-400" />,
      title: 'Emotional Growth',
      description: 'Nurturing personal development through mindful emotional awareness'
    }
  ];

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
            Our Mission
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            In an increasingly connected world, digital loneliness and emotional disconnect have become silent epidemics. 
            We're building a safe haven where technology strengthens human bonds rather than replacing them, 
            fostering genuine emotional wellness through compassionate AI and mindful design.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {coreValues.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="glass-card group hover:scale-105 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center p-8">
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MissionSection;
