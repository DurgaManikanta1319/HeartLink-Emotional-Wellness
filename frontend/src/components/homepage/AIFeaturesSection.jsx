import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaChartLine, FaShieldAlt, FaLightbulb, FaHeart } from 'react-icons/fa';

function AIFeaturesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: <FaChartLine className="text-5xl text-blue-500" />,
      title: 'Sentiment Analysis',
      description: 'Advanced AI understands the nuances of your emotions, tracking patterns and providing meaningful insights into your emotional journey.'
    },
    {
      icon: <FaShieldAlt className="text-5xl text-green-500" />,
      title: 'Toxic Message Filter',
      description: 'Intelligent content moderation protects your space from negativity, ensuring every interaction is respectful and supportive.'
    },
    {
      icon: <FaLightbulb className="text-5xl text-yellow-500" />,
      title: 'Personalized Suggestions',
      description: 'Receive tailored recommendations for emotional wellness activities, coping strategies, and growth opportunities based on your unique patterns.'
    },
    {
      icon: <FaHeart className="text-5xl text-pink-500" />,
      title: 'Emotional Pattern Tracking',
      description: 'Visualize your emotional trends over time, helping you understand triggers, celebrate progress, and build resilience.'
    }
  ];

  return (
    <section ref={ref} className="py-20 px-4 bg-gradient-to-br from-pastel-blue-light via-white to-pastel-purple-light relative z-10">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            AI-Powered Features
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Compassionate technology designed to support your emotional wellness
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="glass-card p-8 hover:shadow-glow-lg transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-purple-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AIFeaturesSection;
