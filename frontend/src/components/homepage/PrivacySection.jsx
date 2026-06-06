import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaUserSecret, FaLock, FaBan, FaRobot } from 'react-icons/fa';

function PrivacySection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const safetyFeatures = [
    {
      icon: <FaUserSecret className="text-4xl text-purple-500" />,
      title: 'Anonymous Mode',
      description: 'Share your feelings without revealing your identity'
    },
    {
      icon: <FaLock className="text-4xl text-blue-500" />,
      title: 'Data Encryption',
      description: 'End-to-end encryption protects your personal information'
    },
    {
      icon: <FaBan className="text-4xl text-pink-500" />,
      title: 'No Data Selling',
      description: 'Your data is yours. We never sell or share it with third parties'
    },
    {
      icon: <FaRobot className="text-4xl text-green-500" />,
      title: 'AI Moderation',
      description: 'Intelligent systems keep interactions safe and respectful'
    }
  ];

  return (
    <section ref={ref} className="py-20 px-4 bg-gradient-to-br from-pastel-purple-light via-pastel-pink-light to-white relative z-10">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            Privacy & Safety First
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Your emotional wellness journey is protected by industry-leading security
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {safetyFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-6 text-center hover:shadow-glass-hover transition-all duration-300 group"
            >
              <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're committed to creating a safe, private space for emotional expression. 
            Your trust is our foundation, and we take every measure to protect it.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default PrivacySection;
