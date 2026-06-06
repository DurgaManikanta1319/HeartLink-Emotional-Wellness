import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaSmile, FaBrain, FaUsers } from 'react-icons/fa';

function HowItWorksSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const steps = [
    {
      icon: <FaSmile className="text-6xl text-yellow-400" />,
      step: 'Step 1',
      title: 'Share Your Mood',
      description: 'Express how you feel with our intuitive mood selector. Choose from 6 emotions and add personal notes in a safe, judgment-free space.'
    },
    {
      icon: <FaBrain className="text-6xl text-purple-400" />,
      step: 'Step 2',
      title: 'Get AI Insights',
      description: 'Our compassionate AI analyzes patterns in your emotional journey, offering personalized insights and gentle suggestions for growth.'
    },
    {
      icon: <FaUsers className="text-6xl text-blue-400" />,
      step: 'Step 3',
      title: 'Connect Safely',
      description: 'Build meaningful connections in moderated spaces where toxic behavior is filtered and authentic emotional expression is celebrated.'
    }
  ];

  return (
    <section ref={ref} className="py-20 px-4 bg-gradient-to-br from-pastel-pink-light via-pastel-purple-light to-pastel-blue-light relative z-10">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Your emotional wellness journey in three simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative"
            >
              <div className="glass-card p-8 h-full hover:shadow-glass-hover transition-all duration-300 group">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <span className="text-sm font-semibold text-purple-500 mb-2">
                    {step.step}
                  </span>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
              
              {/* Connector Arrow */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                  <div className="text-4xl text-purple-300">→</div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
