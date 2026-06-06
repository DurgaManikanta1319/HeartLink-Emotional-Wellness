import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  HiOutlineHeart, 
  HiOutlineShieldCheck, 
  HiOutlineSparkles, 
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineChartBar,
  HiOutlineUserGroup,
  HiOutlineLockClosed,
  HiOutlineFingerPrint,
  HiOutlineEyeSlash,
  HiOutlineFire,
  HiOutlineAdjustmentsHorizontal
} from "react-icons/hi2";
import { useEffect, useState, useRef } from "react";

// --- Components ---

const StatCounter = ({ value, label, suffix = "%" }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  
  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    const duration = 2000;
    let timer;

    const handleScroll = () => {
      const rect = nodeRef.current?.getBoundingClientRect();
      if (rect && rect.top < window.innerHeight && rect.bottom >= 0) {
        let startTime = null;
        const step = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          setCount(Math.floor(progress * (end - start) + start));
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check immediately
    return () => window.removeEventListener('scroll', handleScroll);
  }, [value]);

  return (
    <motion.div 
      ref={nodeRef}
      whileHover={{ y: -10 }}
      className="bg-white/40 backdrop-blur-xl border border-white/50 p-8 rounded-[2rem] shadow-glass hover:shadow-glass-hover transition-all"
    >
      <div className="text-5xl font-black bg-gradient-to-r from-purple-700 to-pink-500 bg-clip-text text-transparent mb-2">
        {count}{suffix}
      </div>
      <div className="text-gray-600 font-medium">{label}</div>
    </motion.div>
  );
};

const SectionHeader = ({ title, subtitle }) => (
  <div className="text-center mb-16 px-4">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-800 to-pink-600 bg-clip-text text-transparent"
    >
      {title}
    </motion.h2>
    <motion.p 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-lg text-gray-500 max-w-2xl mx-auto"
    >
      {subtitle}
    </motion.p>
  </div>
);

function Home() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div className="relative min-h-screen font-sans selection:bg-purple-200">
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 origin-left z-50 rounded-full"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-white/30 backdrop-blur-lg border-b border-white/20">
        <div className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-black bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent flex items-center gap-2"
          >
            HeartLink <HiOutlineHeart className="text-pink-500" />
          </motion.div>
          <div className="flex gap-4 md:gap-8 items-center">
            <Link to="/login" className="text-gray-600 hover:text-purple-600 font-bold transition-colors">
              Login
            </Link>
            <Link to="/register" className="bg-purple-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-purple-700 hover:shadow-xl hover:shadow-purple-200 transition-all active:scale-95">
              Start Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-48 pb-32 px-4 flex flex-col items-center justify-center text-center max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-white/50 backdrop-blur-md border border-white/50 text-purple-600 font-bold text-sm mb-6 shadow-sm">
            ✨ Reimagining Emotional Connection for 2026
          </span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[1.1]">
            <span className="block text-gray-900">Your Journey to</span>
            <span className="block bg-gradient-to-r from-purple-800 via-pink-600 to-indigo-700 bg-clip-text text-transparent">
              Emotional Wellness
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            Step away from digital noise. Find a safe space to track your moods, 
            share your heart, and grow with AI-powered empathy.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-6 mb-20"
        >
          <Link 
            to="/register" 
            className="group relative px-10 py-5 bg-purple-600 text-white text-xl font-bold rounded-[2rem] shadow-2xl shadow-purple-200 hover:scale-105 transition-all overflow-hidden"
          >
            <span className="relative z-10">Get Started Free</span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          <button className="px-10 py-5 bg-white/60 backdrop-blur-xl border border-white text-purple-700 text-xl font-bold rounded-[2rem] hover:bg-white/80 transition-all flex items-center justify-center gap-2">
            Explore Features <HiOutlineSparkles />
          </button>
        </motion.div>

        {/* Hero Decorative Assets */}
        <div className="flex flex-wrap justify-center gap-12 opacity-60">
          {['🌈 Mindfulness', '✨ AI Insights', '🧘‍♀️ Inner Peace', '🌸 Safe Space'].map((text, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
              className="px-6 py-3 bg-white/40 rounded-full font-bold text-gray-700"
            >
              {text}
            </motion.div>
          ))}
        </div>
      </section>

      {/* 1) Mission Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-pink-50/50 via-purple-50/50 to-blue-50/50 backdrop-blur-sm relative border-y border-white/30">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            title="Our Mission" 
            subtitle="In an age of digital loneliness, we're building a bridge back to true emotional connection."
          />
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: <HiOutlineHeart className="text-5xl mb-4 text-pink-500" />, 
                title: "Empathy", 
                desc: "Every interaction is filtered through AI trained to understand and validate your unique feelings." 
              },
              { 
                icon: <HiOutlineShieldCheck className="text-5xl mb-4 text-purple-500" />, 
                title: "Safe Communication", 
                desc: "A toxic-free environment where you can speak your truth without fear of judgment or harm." 
              },
              { 
                icon: <HiOutlineSparkles className="text-5xl mb-4 text-indigo-500" />, 
                title: "Emotional Growth", 
                desc: "Turning patterns into progress with personalized suggestions for your mental well-being." 
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white/40 backdrop-blur-xl hover:bg-white/60 border border-white/50 p-10 rounded-[3rem] text-center shadow-glass transition-all hover:scale-105"
              >
                {item.icon}
                <h3 className="text-2xl font-bold mb-3 text-gray-800">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2) How It Works Section */}
      <section className="py-32 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            title="How It Works" 
            subtitle="Three simple steps to a better emotional world."
          />
          <div className="flex flex-col md:flex-row items-center gap-12 text-center">
            {[
              { step: "Step 1", title: "Share Your Mood", desc: "Express yourself through words, emojis, or voice notes in your private vault.", icon: <HiOutlineChatBubbleBottomCenterText /> },
              { step: "Step 2", title: "Get AI Insights", desc: "Our empathetic AI analyzes patterns and provides gentle, real-time reflection.", icon: <HiOutlineSparkles /> },
              { step: "Step 3", title: "Connect Safely", desc: "Connect with others on similar journeys in moderated, anonymous focus hubs.", icon: <HiOutlineUserGroup /> }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex-1 relative p-10 bg-white/30 backdrop-blur-lg rounded-[3rem] border border-white/50 shadow-glass"
              >
                <div className="text-sm font-black text-purple-400 mb-4 bg-purple-50 px-4 py-1 rounded-full inline-block">
                  {item.step}
                </div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-20 h-20 bg-purple-600 text-white rounded-[2rem] flex items-center justify-center text-3xl mb-6 shadow-xl shadow-purple-200 transition-transform group-hover:rotate-6">
                    {item.icon}
                  </div>
                  <h4 className="text-2xl font-bold mb-4 text-gray-800">{item.title}</h4>
                  <p className="text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3) Impact Statistics Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-purple-600/5 to-pink-500/5">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            title="Impact Statistics" 
            subtitle="The disconnection is real. We're here to change the numbers."
          />
          <div className="grid md:grid-cols-3 gap-8">
            <StatCounter value="76" label="Feel Digitally Disconnected" />
            <StatCounter value="62" label="Want Safe Emotional Space" />
            <StatCounter value="48" label="Avoid Sharing Feelings Online" />
          </div>
        </div>
      </section>

      {/* 4) AI-Powered Features Section */}
      <section className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            title="AI-Powered Features" 
            subtitle="Powerful technology, used with ultimate compassion."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Sentiment Analysis", desc: "Know the 'why' behind your 'what'.", icon: <HiOutlineChartBar /> },
              { title: "Toxic Message Filter", desc: "Zero tolerance for negativity.", icon: <HiOutlineAdjustmentsHorizontal /> },
              { title: "Personalized Emotional Suggestions", desc: "Personalized ways to find peace.", icon: <HiOutlineSparkles /> },
              { title: "Emotional Pattern Tracking", desc: "See how you grow over time.", icon: <HiOutlineFire /> }
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168, 85, 247, 0.2)" }}
                className="bg-white/50 backdrop-blur-md border border-white/50 p-8 rounded-[2.5rem] transition-all group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/0 to-pink-400/0 group-hover:from-purple-400/5 group-hover:to-pink-400/5 transition-colors" />
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl mb-6 text-purple-600 shadow-sm transition-colors group-hover:bg-purple-600 group-hover:text-white">
                  {feature.icon}
                </div>
                <h5 className="text-xl font-bold mb-3 text-gray-800 leading-tight">{feature.title}</h5>
                <p className="text-gray-500 text-sm font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5) Testimonials Section */}
      <section className="py-32 px-4 bg-white/30 border-y border-white/50">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            title="Testimonials" 
            subtitle="See what our community members are saying."
          />
          <div className="flex flex-col md:flex-row gap-8">
            {[
              { name: "Sarah J.", role: "Student", text: "HeartLink is the first place I've felt truly heard without being judged. The AI insights are like a warm hug.", img: "https://i.pravatar.cc/150?u=sarah" },
              { name: "David K.", role: "Designer", text: "I love the anonymous mode. It allows me to be vulnerable without worrying about my social circles.", img: "https://i.pravatar.cc/150?u=david" },
              { name: "Elena M.", role: "Teacher", text: "The pattern tracking helped me realize what triggers my anxiety. It's been a life-changer.", img: "https://i.pravatar.cc/150?u=elena" }
            ].map((user, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white/70 backdrop-blur-xl p-10 rounded-[3rem] shadow-glass border border-white/80 flex-1 relative group hover:shadow-glass-hover transition-all"
              >
                <img src={user.img} alt={user.name} className="w-16 h-16 rounded-full mb-6 border-4 border-white shadow-lg group-hover:scale-110 transition-transform" />
                <p className="text-gray-600 italic mb-6 font-medium leading-relaxed">"{user.text}"</p>
                <div>
                  <h6 className="font-bold text-gray-900">{user.name}</h6>
                  <p className="text-purple-500 text-sm font-bold">{user.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6) Privacy & Safety Section */}
      <section className="py-32 px-4">
        <SectionHeader 
          title="Privacy & Safety" 
          subtitle="Your trust is our foundation. Clinical-grade security for your heart."
        />
        <div className="max-w-5xl mx-auto bg-purple-900 text-white rounded-[4rem] p-12 md:p-20 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-700/30 blur-[100px] rounded-full -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-700/20 blur-[100px] rounded-full -ml-48 -mb-48" />

          <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight text-white">Security by <br /> Design</h2>
              <p className="text-purple-100 text-lg mb-12 font-medium opacity-80">
                In 2026, privacy isn't a feature—it's a human right. Every byte of your emotional data is treated with clinical-grade encryption.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "Anonymous Mode", icon: <HiOutlineEyeSlash /> },
                { title: "Data Encryption", icon: <HiOutlineLockClosed /> },
                { title: "No Data Selling", icon: <HiOutlineFingerPrint /> },
                { title: "AI Moderation", icon: <HiOutlineShieldCheck /> }
              ].map((item, i) => (
                <div key={i} className="bg-purple-800/40 backdrop-blur-md border border-purple-700/50 p-6 rounded-[2rem] text-center flex flex-col items-center">
                  <div className="text-3xl mb-3 text-pink-400">{item.icon}</div>
                  <div className="font-bold text-sm tracking-wide">{item.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7) Final Call-to-Action Section */}
      <section className="py-40 px-4 text-center relative bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter !bg-gradient-to-r !from-purple-800 !via-pink-600 !to-indigo-700 !bg-clip-text !text-transparent">
            Start Your Emotional <br /> Journey Today
          </h2>
          <p className="text-xl md:text-2xl text-gray-500 mb-16 font-medium max-w-2xl mx-auto">
            Join thousands of others who have found their safe space. No credit card, no pressure, just you.
          </p>
          <Link 
            to="/register" 
            className="inline-block px-16 py-8 bg-purple-600 text-white text-2xl font-black rounded-[2.5rem] shadow-2xl shadow-purple-300 hover:scale-110 hover:shadow-purple-400 hover:bg-purple-700 transition-all active:scale-95"
          >
            Join HeartLink Now
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-200 text-center text-gray-400 font-bold bg-white/50 backdrop-blur-md">
        <p>© 2026 HeartLink — A New Era of Empathy. Made with ❤️ for Humanity.</p>
      </footer>
    </div>
  );
}

export default Home;
