import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaQuoteLeft } from 'react-icons/fa';

function TestimonialsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const testimonials = [
    {
      name: 'Sarah M.',
      role: 'Mental Health Advocate',
      avatar: '👩',
      quote: 'HeartLink gave me a safe space to express my emotions without judgment. The AI insights helped me understand patterns I never noticed before.',
      color: 'from-pink-400 to-pink-600'
    },
    {
      name: 'James T.',
      role: 'Software Engineer',
      avatar: '👨',
      quote: 'As someone who struggles with digital burnout, this platform has been transformative. The emotional tracking features are genuinely helpful.',
      color: 'from-purple-400 to-purple-600'
    },
    {
      name: 'Maya L.',
      role: 'College Student',
      avatar: '👧',
      quote: 'Finally, a platform that understands emotional wellness in the digital age. The community is supportive and the AI moderation keeps it safe.',
      color: 'from-blue-400 to-blue-600'
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
            What Our Community Says
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Real stories from people on their emotional wellness journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="glass-card p-8 hover:-translate-y-2 transition-all duration-300"
            >
              <FaQuoteLeft className="text-3xl text-purple-300 mb-4" />
              
              <p className="text-gray-700 leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-200">
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-3xl shadow-lg`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {testimonial.role}
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

export default TestimonialsSection;
