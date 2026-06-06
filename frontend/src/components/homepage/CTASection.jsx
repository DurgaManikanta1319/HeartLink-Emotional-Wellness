import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-pink-400 via-purple-500 to-blue-500 relative z-10 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-36 h-36 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Start Your Emotional Journey Today
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands discovering healthier ways to connect, communicate, and grow emotionally in the digital age.
          </p>

          <motion.button
            onClick={() => navigate('/track')}
            className="group relative inline-flex items-center gap-3 px-12 py-5 bg-white text-purple-600 rounded-full text-xl font-bold shadow-2xl hover:shadow-white/50 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Begin Your Journey
            <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
            
            {/* Button Glow Effect */}
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 text-white/80 text-sm"
          >
            Free to start • No credit card required • Safe & private
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

export default CTASection;
