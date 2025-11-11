import './App.css';
import { useState } from 'react';
import { motion } from 'framer-motion';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-50 text-slate-800">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/98 backdrop-blur-xl z-50 shadow-lg border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <img
                src="/profile.jpg"
                alt="Satheesh Kumar K"
                className="w-9 h-9 rounded-full object-cover object-top shadow-md border-2 border-blue-700"
                style={{ objectPosition: '50% 20%' }}
              />
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-slate-800">Satheesh Kumar K</span>
                <span className="hidden lg:inline-block px-2.5 py-1 bg-blue-50 text-blue-800 text-xs font-semibold rounded-full">Database Administrator</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="#home" className="text-slate-600 hover:text-blue-700 transition-colors duration-300 text-sm font-semibold">Home</a>
              <a href="#about" className="text-slate-600 hover:text-blue-700 transition-colors duration-300 text-sm font-semibold">About</a>
              <a href="#experience" className="text-slate-600 hover:text-blue-700 transition-colors duration-300 text-sm font-semibold">Experience</a>
              <a href="#skills" className="text-slate-600 hover:text-blue-700 transition-colors duration-300 text-sm font-semibold">Skills</a>
              <a href="#projects" className="text-slate-600 hover:text-blue-700 transition-colors duration-300 text-sm font-semibold">Projects</a>
              <a href="#contact" className="text-slate-600 hover:text-blue-700 transition-colors duration-300 text-sm font-semibold">Contact</a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-slate-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4">
              <a href="#home" className="block py-2 text-slate-600 hover:text-blue-700" onClick={() => setMobileMenuOpen(false)}>Home</a>
              <a href="#about" className="block py-2 text-slate-600 hover:text-blue-700" onClick={() => setMobileMenuOpen(false)}>About</a>
              <a href="#experience" className="block py-2 text-slate-600 hover:text-blue-700" onClick={() => setMobileMenuOpen(false)}>Experience</a>
              <a href="#skills" className="block py-2 text-slate-600 hover:text-blue-700" onClick={() => setMobileMenuOpen(false)}>Skills</a>
              <a href="#projects" className="block py-2 text-slate-600 hover:text-blue-700" onClick={() => setMobileMenuOpen(false)}>Projects</a>
              <a href="#contact" className="block py-2 text-slate-600 hover:text-blue-700" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 lg:px-8 pt-20 relative overflow-hidden">
        {/* Animated background circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-slate-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gray-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

        <motion.div
          className="max-w-5xl mx-auto text-center relative z-10 py-12"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Profile Image */}
          <motion.div
            className="mb-6 flex justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              {/* Gradient background ring */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full opacity-75 blur-sm"></div>
              <div className="absolute -inset-0.5 bg-white rounded-full"></div>
              <img
                src="/profile.jpg"
                alt="Satheesh Kumar K"
                className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full object-cover object-top border-3 border-white shadow-2xl"
                style={{ objectPosition: '50% 20%' }}
              />
              {/* Verified Badge */}
              <div className="absolute bottom-0 right-0 bg-gradient-to-br from-blue-700 to-blue-900 rounded-full p-1.5 shadow-lg border-3 border-white">
                <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div className="mb-6" variants={fadeInUp}>
            <motion.p
              className="text-blue-700 text-base md:text-lg mb-3 font-medium"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Hi, I'm
            </motion.p>
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">
                Satheesh Kumar K
              </span>
            </motion.h1>
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-700 mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Database Administrator
            </motion.h2>

            {/* Professional Badges */}
            <motion.div
              className="flex flex-wrap justify-center gap-2 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold border border-green-200 shadow-sm">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Available for Work
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold border border-blue-200 shadow-sm">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Certified Professional
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold border border-purple-200 shadow-sm">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                6+ Months Experience
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 mb-8"
            variants={fadeInUp}
          >
            <a href="#contact"
               className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-8 py-3 rounded-lg font-semibold text-sm shadow-lg shadow-blue-700/30 hover:shadow-xl hover:shadow-blue-700/40 transition-all duration-300 transform hover:scale-105">
              Get In Touch
            </a>
            <a href="#projects"
               className="bg-white border-2 border-blue-700 text-blue-700 px-8 py-3 rounded-lg font-semibold text-sm shadow-md hover:bg-blue-50 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              View My Work
            </a>
            <a href="/resume.pdf"
               target="_blank"
               rel="noopener noreferrer"
               className="bg-white border-2 border-slate-600 text-slate-700 px-8 py-3 rounded-lg font-semibold text-sm shadow-md hover:bg-slate-50 hover:shadow-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View CV
            </a>
          </motion.div>

          <motion.div
            className="flex justify-center gap-6"
            variants={fadeInUp}
          >
            <motion.a
              href="https://github.com/satheesh-kumar-DBA"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-cyan-400 transition-colors duration-300"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.840 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.430.372.823 1.102.823 2.222v3.293c.0.319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/satheesh-kumar-702b20308"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-cyan-400 transition-colors duration-300"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </motion.a>
            <motion.a
              href="mailto:satheeshkumar2k4@gmail.com"
              className="text-slate-600 hover:text-cyan-400 transition-colors duration-300"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/></svg>
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            <span className="bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">About Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-700 to-blue-900 mx-auto mb-12"></div>

          <div className="max-w-5xl mx-auto">
            <p className="text-base text-slate-700 leading-loose text-justify mb-6">
              I'm a passionate Database Administrator specializing in <span className="text-blue-700 font-semibold">PostgreSQL and MySQL</span> with expertise in building efficient, secure, and scalable database systems.
              My focus is on ensuring reliability and optimizing performance through comprehensive database administration, advanced performance tuning techniques including
              <span className="text-blue-700 font-semibold"> query optimization, indexing strategies, and EXPLAIN analysis</span>, along with robust backup automation solutions.
            </p>
            <p className="text-base text-slate-700 leading-loose text-justify mb-6">
              I excel in <span className="text-blue-700 font-semibold">monitoring and troubleshooting</span> database performance using tools like pg_stat_statements and custom logging mechanisms.
              My expertise extends to implementing <span className="text-blue-700 font-semibold">comprehensive backup and recovery strategies</span> including pg_dump, pg_basebackup, Point-in-Time Recovery (PITR),
              and WAL archiving, coupled with both logical and physical replication setups. I'm proficient in <span className="text-blue-700 font-semibold">security and auditing</span> through pgAudit
              implementation, audit logging, and access control management to ensure compliance with security standards.
            </p>
            <p className="text-base text-slate-700 leading-loose text-justify mb-6">
              Additionally, I bring strong <span className="text-blue-700 font-semibold">automation and scripting capabilities</span> using pgAgent for job scheduling and batch scripting for automated workflows.
              My skillset includes <span className="text-blue-700 font-semibold">data visualization and reporting</span> through Power BI dashboard design, DAX measures, and data modeling to transform complex
              database insights into actionable business intelligence. I also possess solid <span className="text-blue-700 font-semibold">database development</span> experience in schema design,
              stored procedures, functions, and SQL development to create efficient and maintainable database architectures.
            </p>
            <p className="text-base text-slate-700 leading-loose text-justify mb-6">
              Currently working as <span className="text-blue-700 font-semibold">Junior Database Administrator</span> at
              <span className="text-blue-800 font-semibold"> TBS Technologies Private Limited</span>, where I apply my skills in real-world production environments,
              managing development, testing, and production databases while collaborating with development and DevOps teams to deliver optimal database solutions.
            </p>
            <p className="text-base text-slate-700 leading-loose text-justify mb-8">
              Graduated with B.E. in Computer Science and Engineering with a CGPA of 8.2, I combine strong academic foundation with hands-on industry experience
              to deliver robust, high-performance database solutions that ensure data integrity, business continuity, and operational efficiency.
            </p>
          </div>

          {/* Professional Stats Section */}
          <div className="max-w-6xl mx-auto mt-12">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div
                className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl text-center border-2 border-sky-200 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                variants={scaleIn}
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-800 mb-2">6+</div>
                <div className="text-slate-600 font-semibold">Months</div>
                <div className="text-sm text-slate-500">Experience</div>
              </motion.div>
              <motion.div
                className="bg-gradient-to-br from-blue-50 to-blue-50 p-8 rounded-2xl text-center border-2 border-cyan-200 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                variants={scaleIn}
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-800 mb-2">3</div>
                <div className="text-slate-600 font-semibold">Projects</div>
                <div className="text-sm text-slate-500">Completed</div>
              </motion.div>
              <motion.div
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl text-center border-2 border-blue-200 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                variants={scaleIn}
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">4</div>
                <div className="text-slate-600 font-semibold">Certifications</div>
                <div className="text-sm text-slate-500">Achieved</div>
              </motion.div>
              <motion.div
                className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl text-center border-2 border-indigo-200 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                variants={scaleIn}
              >
                <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">60%</div>
                <div className="text-slate-600 font-semibold">Efficiency</div>
                <div className="text-sm text-slate-500">Improvement</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            <span className="bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">Professional Experience</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-700 to-blue-900 mx-auto mb-12"></div>

          <div className="max-w-5xl mx-auto">
            <div className="group bg-white border-2 border-slate-200 rounded-2xl p-8 shadow-xl hover:border-blue-700 hover:shadow-2xl hover:shadow-blue-700/20 transition-all duration-300">
              <div className="flex items-start gap-6 mb-6">
                {/* Company Logo Placeholder */}
                <div className="hidden md:block w-20 h-20 bg-gradient-to-br from-blue-700 to-blue-900 rounded-xl flex-shrink-0 shadow-lg flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">TBS</span>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2 group-hover:text-blue-700 transition-colors">
                        Junior Database Administrator
                      </h3>
                      <p className="text-xl text-blue-700 font-semibold mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                        </svg>
                        TBS Technologies Private Limited
                      </p>
                      <p className="text-slate-600 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        Tiruppur, Tamil Nadu, India
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <span className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-100 to-cyan-100 text-blue-900 px-4 py-2 rounded-full text-sm font-semibold shadow-md border border-sky-200">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        July 2025 - Present
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-700 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-slate-700 leading-relaxed">
                    Administer and maintain PostgreSQL databases to ensure optimal performance, availability, and data integrity across development, testing, and production environments
                  </p>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-700 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-slate-700 leading-relaxed">
                    Monitor database performance using pgAdmin, system logs, and performance metrics to proactively detect and resolve bottlenecks
                  </p>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-700 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-slate-700 leading-relaxed">
                    Perform database backups, restorations, and security audits with pgAgent and pgAudit, ensuring compliance with internal data protection and audit standards
                  </p>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-700 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-slate-700 leading-relaxed">
                    Develop and implement automated backup and monitoring solutions using batch scripting to enhance reliability and reduce manual workload
                  </p>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-700 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-slate-700 leading-relaxed">
                    Execute SQL query optimization and index tuning to improve response time, throughput, and overall database scalability
                  </p>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-700 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-slate-700 leading-relaxed">
                    Collaborate with application and development teams to design efficient data models and troubleshoot database-driven application issues
                  </p>
                </div>
              </div>

              {/* Additional Highlights */}
              <div className="mt-8 pt-8 border-t-2 border-slate-200">
                <h4 className="text-xl font-bold text-slate-800 mb-4">Key Strengths & Expertise</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-blue-700 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-slate-700 leading-relaxed">
                      Strong expertise in SQL performance tuning, query optimization, and database internals
                    </p>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-blue-700 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-slate-700 leading-relaxed">
                      Skilled in performing regular backups, restorations, and recovery testing to ensure data integrity and business continuity
                    </p>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-blue-700 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-slate-700 leading-relaxed">
                      Proven ability to collaborate effectively with development and DevOps teams for database optimization and troubleshooting
                    </p>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-blue-700 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-slate-700 leading-relaxed">
                      Dedicated continuous learner, staying current with the latest PostgreSQL features, community releases, and best practices
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            <span className="bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">Skills & Expertise</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-700 to-blue-900 mx-auto mb-12"></div>

          {/* Technologies */}
          <div className="mb-12">
            <motion.h3
              className="text-2xl md:text-3xl font-bold text-center mb-10 text-blue-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Technologies & Tools
            </motion.h3>
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {[
                {
                  name: 'PostgreSQL',
                  icon: <svg className="w-12 h-12 mx-auto" viewBox="0 0 432.071 445.383"><defs><linearGradient id="postgresqlGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style={{stopColor: '#336791', stopOpacity: 1}} /><stop offset="100%" style={{stopColor: '#5090c1', stopOpacity: 1}} /></linearGradient></defs><path fill="url(#postgresqlGrad)" d="M323.205 324.227c2.833-23.601 1.984-27.062 19.563-23.239l4.463.392c13.517.615 31.199-2.174 41.587-7 22.362-10.376 35.622-27.7 13.572-23.148-50.297 10.376-53.755-6.655-53.755-6.655 53.111-78.803 75.313-178.836 56.149-203.322C352.514-5.534 262.036 26.049 260.522 26.869l-.482.089c-9.938-2.062-21.06-3.294-33.554-3.496-22.761-.374-40.032 5.967-53.133 15.904 0 0-161.408-66.498-153.899 83.628 1.597 31.936 45.777 241.655 98.47 178.31 19.259-23.163 37.871-42.748 37.871-42.748 9.242 6.14 20.307 9.272 31.912 8.147l.897-.765c-.281 2.876-.157 5.689.359 9.019-13.572 15.167-9.584 17.83-36.723 23.416-27.457 5.659-11.326 15.734-.797 18.367 12.768 3.193 42.305 7.716 62.268-20.224l-.795 3.188c5.325 4.26 4.965 30.619 5.72 49.452.756 18.834 1.468 36.108 4.156 46.13 2.688 10.022 6.548 34.34 35.098 27.283 23.922-5.892 36.701-24.029 38.059-51.974 1.004-15.863 2.478-12.942 2.739-26.409l2.302-3.877c1.775 22.395.976 58.013 6.572 83.932 4.035 18.686 12.244 48.189 52.638 38.655 31.188-7.354 47.208-25.078 13.937-22.395zM64.32 352.752c-15.873 19.015-34.052 31.878-48.894 32.812-22.479 1.416-35.937-10.962-38.222-30.435-7.992-68.016 36.933-146.766 102.663-93.26-8.098 9.29-1.842 74.786-15.547 90.884zm258.993 25.049c-13.572.956-22.027-8.768-22.773-24.975-1.196-25.958 3.581-58.478 9.242-73.79 2.837-7.688 12.403-28.535 29.778-20.224 17.453 8.768 4.641 28.535 1.804 43.848-3.58 15.312 4.173 73.302-18.051 75.141z"/></svg>
                },
                {
                  name: 'MySQL',
                  icon: <svg className="w-12 h-12 mx-auto" viewBox="0 0 24 24"><defs><linearGradient id="mysqlGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style={{stopColor: '#00758F', stopOpacity: 1}} /><stop offset="50%" style={{stopColor: '#F29111', stopOpacity: 1}} /><stop offset="100%" style={{stopColor: '#E48E00', stopOpacity: 1}} /></linearGradient></defs><path fill="url(#mysqlGrad)" d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.174.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41H0c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.347-4.064h1.095c.242 2.015.384 3.86.428 5.53zm4.017-4.08c-.378 2.045-.876 3.533-1.492 4.46-.482.716-1.01 1.073-1.583 1.073-.153 0-.34-.046-.566-.138v-.494c.11.017.24.026.386.026.268 0 .483-.075.647-.222.197-.18.295-.382.295-.605 0-.155-.077-.47-.23-.944L6.23 14.615h.91l.727 2.36c.164.536.233.91.205 1.123.4-1.064.678-2.227.835-3.483zm12.325 4.08h-2.63v-5.53h.885v4.85h1.745zm-3.32.135l-1.016-.5c.09-.076.177-.158.255-.25.433-.506.648-1.258.648-2.253 0-1.83-.718-2.746-2.155-2.746-.704 0-1.254.232-1.65.697-.43.508-.646 1.256-.646 2.245 0 .972.19 1.686.574 2.14.35.41.877.615 1.583.615.264 0 .506-.033.725-.098l1.325.772.36-.622zM15.5 17.588c-.225-.36-.337-.94-.337-1.736 0-1.393.424-2.09 1.27-2.09.443 0 .77.167.977.5.224.362.336.936.336 1.723 0 1.404-.424 2.108-1.27 2.108-.445 0-.774-.167-.978-.5zm-1.658-.425c0 .47-.172.856-.516 1.156-.344.3-.803.45-1.384.45-.543 0-1.064-.172-1.573-.515l.237-.476c.438.22.833.328 1.19.328.332 0 .593-.073.783-.22.188-.147.3-.355.3-.615 0-.33-.23-.61-.648-.83-.388-.205-1.163-.46-1.163-.46-.422-.168-.74-.377-.951-.628-.21-.25-.316-.555-.316-.912 0-.439.144-.803.43-1.091.286-.288.675-.433 1.16-.433.416 0 .83.1 1.24.3l-.213.476c-.352-.18-.67-.27-.957-.27-.315 0-.564.074-.748.22-.184.147-.277.347-.277.6 0 .33.234.61.648.83.388.205 1.163.46 1.163.46.422.168.74.377.951.628.21.25.316.555.316.912z"/></svg>
                },
                {
                  name: 'Power BI',
                  icon: <svg className="w-12 h-12 mx-auto" viewBox="0 0 24 24"><defs><linearGradient id="powerbiGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style={{stopColor: '#F2C811', stopOpacity: 1}} /><stop offset="100%" style={{stopColor: '#FBBC04', stopOpacity: 1}} /></linearGradient></defs><path fill="none" stroke="url(#powerbiGrad)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                },
                {
                  name: 'pgAdmin',
                  icon: <svg className="w-12 h-12 mx-auto" viewBox="0 0 24 24"><defs><linearGradient id="pgadminGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style={{stopColor: '#3b82f6', stopOpacity: 1}} /><stop offset="100%" style={{stopColor: '#8b5cf6', stopOpacity: 1}} /></linearGradient></defs><g fill="none" stroke="url(#pgadminGrad)"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></g></svg>
                },
                {
                  name: 'pgAgent',
                  icon: <svg className="w-12 h-12 mx-auto" viewBox="0 0 24 24"><defs><linearGradient id="pgagentGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style={{stopColor: '#06b6d4', stopOpacity: 1}} /><stop offset="100%" style={{stopColor: '#3b82f6', stopOpacity: 1}} /></linearGradient></defs><path fill="none" stroke="url(#pgagentGrad)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                },
                {
                  name: 'SQL',
                  icon: <svg className="w-12 h-12 mx-auto" viewBox="0 0 24 24"><defs><linearGradient id="sqlGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style={{stopColor: '#60a5fa', stopOpacity: 1}} /><stop offset="100%" style={{stopColor: '#1e40af', stopOpacity: 1}} /></linearGradient></defs><path fill="none" stroke="url(#sqlGrad)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
                },
                {
                  name: 'Windows Server',
                  icon: <svg className="w-12 h-12 mx-auto" viewBox="0 0 24 24"><defs><linearGradient id="windowsGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style={{stopColor: '#0078D4', stopOpacity: 1}} /><stop offset="100%" style={{stopColor: '#00BCF2', stopOpacity: 1}} /></linearGradient></defs><path fill="none" stroke="url(#windowsGrad)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
                },
                {
                  name: 'Batch Scripting',
                  icon: <svg className="w-12 h-12 mx-auto" viewBox="0 0 24 24"><defs><linearGradient id="batchGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style={{stopColor: '#10b981', stopOpacity: 1}} /><stop offset="100%" style={{stopColor: '#059669', stopOpacity: 1}} /></linearGradient></defs><path fill="none" stroke="url(#batchGrad)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                }
              ].map((tech, idx) => (
                <motion.div
                  key={idx}
                  className="group relative bg-white border-2 border-slate-200 p-6 rounded-xl text-center hover:border-blue-700 hover:shadow-2xl hover:shadow-blue-700/30 transition-all duration-300"
                  variants={scaleIn}
                  whileHover={{ scale: 1.05, y: -10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="mb-3 group-hover:scale-125 transition-transform duration-300">{tech.icon}</div>
                  <p className="font-semibold text-slate-700 group-hover:text-blue-700 transition-colors">{tech.name}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Technical Skills */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-10 text-blue-700">Technical Skills</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { skill: 'Database Administration', desc: 'Installation, Configuration, Maintenance, and Production DBA Management (PostgreSQL & MySQL)' },
                { skill: 'Performance Tuning', desc: 'Query Optimization, Indexing, EXPLAIN Analysis, and Execution Plan Review' },
                { skill: 'Monitoring & Troubleshooting', desc: 'Database Monitoring, Performance Analysis, pg_stat_statements, and Custom Logging' },
                { skill: 'Backup, Recovery & Replication', desc: 'pg_dump, pg_basebackup, PITR, WAL Archiving, Logical & Physical Replication' },
                { skill: 'Automation & Scripting', desc: 'pgAgent Jobs, Automated Backups, Batch Scripting' },
                { skill: 'Security & Auditing', desc: 'pgAudit, Audit Logging, Access Control, and Compliance Monitoring' },
                { skill: 'Data Visualization & Reporting', desc: 'Power BI Dashboard Design, DAX, Data Modeling, and Reporting Automation' },
                { skill: 'Development', desc: 'Database Schema Design, Stored Procedures, Functions, and SQL Development' }
              ].map((item, idx) => (
                <div key={idx} className="group bg-white border border-slate-200 p-6 rounded-xl hover:border-blue-700 hover:shadow-xl hover:shadow-blue-700/20 transition-all duration-300">
                  <div className="flex items-start">
                    <span className="text-blue-700 mr-4 text-2xl group-hover:scale-125 transition-transform">✓</span>
                    <div>
                      <h4 className="text-xl font-bold text-slate-800 mb-2">{item.skill}</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            <span className="bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">Featured Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-700 to-blue-900 mx-auto mb-12"></div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* Project 1 */}
            <motion.div
              className="group bg-slate-50 border-2 border-slate-200 rounded-2xl p-8 hover:border-blue-700 hover:shadow-2xl hover:shadow-blue-700/30 transition-all duration-500"
              variants={fadeInUp}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <svg className="w-8 h-8" viewBox="0 0 432.071 445.383">
                    <defs>
                      <linearGradient id="postgresqlProjectGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor: '#336791', stopOpacity: 1}} />
                        <stop offset="100%" style={{stopColor: '#5090c1', stopOpacity: 1}} />
                      </linearGradient>
                    </defs>
                    <path fill="url(#postgresqlProjectGrad)" d="M323.205 324.227c2.833-23.601 1.984-27.062 19.563-23.239l4.463.392c13.517.615 31.199-2.174 41.587-7 22.362-10.376 35.622-27.7 13.572-23.148-50.297 10.376-53.755-6.655-53.755-6.655 53.111-78.803 75.313-178.836 56.149-203.322C352.514-5.534 262.036 26.049 260.522 26.869l-.482.089c-9.938-2.062-21.06-3.294-33.554-3.496-22.761-.374-40.032 5.967-53.133 15.904 0 0-161.408-66.498-153.899 83.628 1.597 31.936 45.777 241.655 98.47 178.31 19.259-23.163 37.871-42.748 37.871-42.748 9.242 6.14 20.307 9.272 31.912 8.147l.897-.765c-.281 2.876-.157 5.689.359 9.019-13.572 15.167-9.584 17.83-36.723 23.416-27.457 5.659-11.326 15.734-.797 18.367 12.768 3.193 42.305 7.716 62.268-20.224l-.795 3.188c5.325 4.26 4.965 30.619 5.72 49.452.756 18.834 1.468 36.108 4.156 46.13 2.688 10.022 6.548 34.34 35.098 27.283 23.922-5.892 36.701-24.029 38.059-51.974 1.004-15.863 2.478-12.942 2.739-26.409l2.302-3.877c1.775 22.395.976 58.013 6.572 83.932 4.035 18.686 12.244 48.189 52.638 38.655 31.188-7.354 47.208-25.078 13.937-22.395zM64.32 352.752c-15.873 19.015-34.052 31.878-48.894 32.812-22.479 1.416-35.937-10.962-38.222-30.435-7.992-68.016 36.933-146.766 102.663-93.26-8.098 9.29-1.842 74.786-15.547 90.884zm258.993 25.049c-13.572.956-22.027-8.768-22.773-24.975-1.196-25.958 3.581-58.478 9.242-73.79 2.837-7.688 12.403-28.535 29.778-20.224 17.453 8.768 4.641 28.535 1.804 43.848-3.58 15.312 4.173 73.302-18.051 75.141z"/>
                  </svg>
                </div>
                <span className="text-sm font-semibold text-blue-700 bg-blue-100 px-4 py-1 rounded-full">Database</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-slate-800 group-hover:text-blue-700 transition-colors">
                Auto Backup and Restore System
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Designed and implemented batch-scripted automation for scheduled backups, data restoration, and storage path management using pg_dump and pg_restore. Integrated backup scheduling with pgAgent for real-time task execution and monitoring. Achieved a fully automated and reliable backup system, reducing manual maintenance time by over 60% and ensuring data consistency and disaster recovery readiness.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-sm">PostgreSQL</span>
                <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm">pgAgent</span>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">Batch Scripting</span>
                <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">Windows Server</span>
              </div>
              <a href="https://github.com/satheesh-kumar-DBA"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-flex items-center text-blue-700 hover:text-cyan-400 font-semibold transition-colors group">
                View on GitHub
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>

            {/* Project 2 */}
            <motion.div
              className="group bg-slate-50 border-2 border-slate-200 rounded-2xl p-8 hover:border-blue-700 hover:shadow-2xl hover:shadow-blue-700/30 transition-all duration-500"
              variants={fadeInUp}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <svg className="w-8 h-8 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-blue-700 bg-blue-100 px-4 py-1 rounded-full">Analytics</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-slate-800 group-hover:text-blue-700 transition-colors">
                Vehicle Model Analysis Dashboard
              </h3>

              <p className="text-slate-600 mb-6 leading-relaxed">
                Designed interactive analytics dashboard for vehicle performance and trend visualization. Created DAX measures, data models, and integrated with PostgreSQL to deliver real-time insights. Improved decision-making through real-time insights on vehicle trends by fuel type, year, and brand.
              </p>

              {/* Dashboard Preview Image */}
              <div className="mb-6 rounded-lg overflow-hidden border-2 border-slate-200 group-hover:border-blue-700 transition-all duration-300">
                <img
                  src="/powerbi-dashboard.png"
                  alt="Vehicle Model Analysis Dashboard showing fuel type analysis, brand counts, and yearly trends"
                  className="w-full h-auto"
                />
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">Power BI</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-sm">PostgreSQL</span>
              </div>

              <a href="https://github.com/satheesh-kumar-DBA"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-flex items-center text-blue-700 hover:text-cyan-400 font-semibold transition-colors group">
                Learn More
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>

            {/* Project 3 */}
            <motion.div
              className="group bg-slate-50 border-2 border-slate-200 rounded-2xl p-8 hover:border-blue-700 hover:shadow-2xl hover:shadow-blue-700/30 transition-all duration-500"
              variants={fadeInUp}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <svg className="w-8 h-8 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-blue-700 bg-blue-100 px-4 py-1 rounded-full">Security</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-slate-800 group-hover:text-blue-700 transition-colors">
                Custom Audit Logging
              </h3>

              <p className="text-slate-600 mb-6 leading-relaxed">
                Modified pgAudit extension and compiled custom DLL to implement comprehensive audit logging for security compliance requirements. Achieved full compliance with internal security audit standards.
              </p>

              {/* Project Preview Image */}
              <div className="mb-6 rounded-lg overflow-hidden border-2 border-slate-200 group-hover:border-blue-700 transition-all duration-300">
                <img
                  src="/pgaudit-project.png"
                  alt="Custom Audit Logging implementation with pgAudit extension"
                  className="w-full h-auto"
                />
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-sm">PostgreSQL</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">pgAudit</span>
                <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">C/C++</span>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">Windows/Linux</span>
              </div>

              <a href="https://github.com/satheesh-kumar-DBA/pgaudit"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-flex items-center text-blue-700 hover:text-cyan-400 font-semibold transition-colors group">
                View on GitHub
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Education & Achievements Section */}
      <section id="education" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            <span className="bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">Education & Achievements</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-700 to-blue-900 mx-auto mb-12"></div>

          {/* Education Timeline */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="space-y-8">
              <div className="group bg-slate-50 border-2 border-slate-200 rounded-2xl p-8 hover:border-blue-700 hover:shadow-2xl hover:shadow-blue-700/20 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <svg className="w-8 h-8 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-blue-700 transition-colors">
                      Bachelor of Engineering – Computer Science
                    </h3>
                    <p className="text-lg text-blue-700 mb-2">Dr. Mahalingam College of Engineering and Technology</p>
                    <div className="flex flex-wrap gap-4 text-slate-600">
                      <span className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        CGPA: 8.2
                      </span>
                      <span className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        2021 – 2025
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="mb-20">
            <motion.h3
              className="text-3xl font-bold text-center mb-10 text-blue-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Certifications
            </motion.h3>

            {(() => {
              const certifications = [
                {
                  name: 'Python for Beginners',
                  provider: 'Udemy',
                  icon: (
                    <svg className="w-16 h-16 mx-auto" viewBox="0 0 256 255" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="pythonBlue" x1="12.959%" y1="12.039%" x2="79.639%" y2="78.201%">
                          <stop offset="0%" style={{stopColor: '#387EB8', stopOpacity: 1}} />
                          <stop offset="100%" style={{stopColor: '#366994', stopOpacity: 1}} />
                        </linearGradient>
                        <linearGradient id="pythonYellow" x1="19.128%" y1="20.579%" x2="90.742%" y2="88.429%">
                          <stop offset="0%" style={{stopColor: '#FFE873', stopOpacity: 1}} />
                          <stop offset="100%" style={{stopColor: '#FFC331', stopOpacity: 1}} />
                        </linearGradient>
                      </defs>
                      <path d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z" fill="url(#pythonBlue)"/>
                      <path d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897zm34.114-19.586a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.131 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13z" fill="url(#pythonYellow)"/>
                    </svg>
                  )
                },
                {
                  name: 'Java (Basic)',
                  provider: 'HackerRank',
                  icon: (
                    <svg className="w-16 h-16 mx-auto" viewBox="0 0 256 346" xmlns="http://www.w3.org/2000/svg">
                      <path d="M82.554 267.473s-13.198 7.675 9.393 10.272c27.369 3.122 41.356 2.675 71.517-3.034 0 0 7.93 4.972 19.003 9.279-67.611 28.977-153.019-1.679-99.913-16.517M74.292 229.659s-14.803 10.958 7.805 13.296c29.236 3.016 52.324 3.263 92.276-4.43 0 0 5.526 5.602 14.215 8.666-81.747 23.904-172.798 1.885-114.296-17.532" fill="#5382A1"/>
                      <path d="M143.942 165.515c16.66 19.18-4.377 36.44-4.377 36.44s42.301-21.837 22.874-49.183c-18.144-25.5-32.059-38.172 43.268-81.858 0 0-118.238 29.53-61.765 94.6" fill="#E76F00"/>
                      <path d="M233.364 295.442s9.767 8.047-10.757 14.273c-39.026 11.823-162.432 15.393-196.714.471-12.323-5.36 10.787-12.8 18.056-14.362 7.581-1.644 11.914-1.337 11.914-1.337-13.705-9.655-88.583 18.957-38.034 27.15 137.853 22.356 251.292-10.066 215.535-26.195M88.9 190.48s-62.771 14.91-22.228 20.323c17.118 2.292 51.243 1.774 83.03-.89 25.978-2.19 52.063-6.85 52.063-6.85s-9.16 3.923-15.787 8.448c-63.744 16.765-186.886 8.966-151.435-8.183 29.981-14.492 54.358-12.848 54.358-12.848M201.506 253.422c64.8-33.672 34.839-66.03 13.927-61.67-5.126 1.066-7.428 1.99-7.428 1.99s1.91-2.998 5.551-4.293c41.486-14.584 73.424 42.938-13.355 65.647 0 0 .998-.895 1.305-1.674" fill="#5382A1"/>
                      <path d="M162.439.371s35.887 35.9-34.037 91.101c-56.071 44.282-12.786 69.53-.023 98.377-32.73-29.53-56.75-55.526-40.635-79.72C111.395 74.612 176.918 57.393 162.439.37" fill="#E76F00"/>
                      <path d="M95.268 344.665c62.199 3.982 157.712-2.209 159.974-31.64 0 0-4.348 11.158-51.404 20.018-53.088 9.99-118.564 8.824-157.399 2.421.001 0 7.95 6.58 48.83 9.201" fill="#5382A1"/>
                    </svg>
                  )
                },
                {
                  name: 'SQL for Beginners',
                  provider: 'Scaler',
                  icon: (
                    <svg className="w-16 h-16 mx-auto" viewBox="0 0 24 24" fill="none">
                      <defs>
                        <linearGradient id="sqlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style={{stopColor: '#00758F', stopOpacity: 1}} />
                          <stop offset="100%" style={{stopColor: '#336791', stopOpacity: 1}} />
                        </linearGradient>
                      </defs>
                      <path d="M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.59 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4z" fill="url(#sqlGrad)" opacity="0.3"/>
                      <ellipse cx="12" cy="7" rx="8" ry="4" fill="none" stroke="url(#sqlGrad)" strokeWidth="2"/>
                      <path d="M4 7v10c0 2.21 3.59 4 8 4s8-1.79 8-4V7" fill="none" stroke="url(#sqlGrad)" strokeWidth="2"/>
                      <path d="M4 12c0 2.21 3.59 4 8 4s8-1.79 8-4" fill="none" stroke="url(#sqlGrad)" strokeWidth="2"/>
                      <path d="M4 17c0 2.21 3.59 4 8 4s8-1.79 8-4" fill="none" stroke="url(#sqlGrad)" strokeWidth="2"/>
                    </svg>
                  )
                },
                {
                  name: 'Machine Learning',
                  provider: 'Udemy',
                  icon: (
                    <svg className="w-16 h-16 mx-auto" viewBox="0 0 24 24" fill="none">
                      <defs>
                        <linearGradient id="mlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style={{stopColor: '#FF6B6B', stopOpacity: 1}} />
                          <stop offset="50%" style={{stopColor: '#4ECDC4', stopOpacity: 1}} />
                          <stop offset="100%" style={{stopColor: '#45B7D1', stopOpacity: 1}} />
                        </linearGradient>
                      </defs>
                      {/* Neural network nodes */}
                      <circle cx="4" cy="6" r="2" fill="url(#mlGrad)"/>
                      <circle cx="4" cy="12" r="2" fill="url(#mlGrad)"/>
                      <circle cx="4" cy="18" r="2" fill="url(#mlGrad)"/>
                      <circle cx="12" cy="4" r="2" fill="url(#mlGrad)"/>
                      <circle cx="12" cy="12" r="2.5" fill="url(#mlGrad)"/>
                      <circle cx="12" cy="20" r="2" fill="url(#mlGrad)"/>
                      <circle cx="20" cy="8" r="2" fill="url(#mlGrad)"/>
                      <circle cx="20" cy="16" r="2" fill="url(#mlGrad)"/>
                      {/* Connections */}
                      <path d="M6 6L10 4M6 12L10 12M6 18L10 20M14 4L18 8M14 12L18 8M14 12L18 16M14 20L18 16"
                            stroke="url(#mlGrad)" strokeWidth="1.5" opacity="0.4"/>
                    </svg>
                  )
                }
              ];

              return (
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                >
                  {certifications.map((cert, idx) => (
                    <motion.div
                      key={idx}
                      className="group bg-white border-2 border-slate-200 p-6 rounded-xl text-center hover:border-blue-700 hover:shadow-xl hover:shadow-blue-700/20 transition-all duration-300"
                      variants={scaleIn}
                    >
                      <div className="mb-4 flex justify-center">
                        <div className="w-16 h-16 flex items-center justify-center">
                          {cert.icon}
                        </div>
                      </div>
                      <h4 className="font-bold text-lg text-slate-800 mb-1">{cert.name}</h4>
                      <p className="text-sm text-slate-600">{cert.provider}</p>
                    </motion.div>
                  ))}
                </motion.div>
              );
            })()}
          </div>

          {/* Achievements */}
          <div>
            <h3 className="text-3xl font-bold text-center mb-10 text-blue-700">Key Achievements</h3>
            <div className="max-w-4xl mx-auto space-y-6">
              {[
                { achievement: 'Developed pgAudit using Visual Studio Enterprise for PostgreSQL 17.6', date: 'October 2025', icon: '🚀' },
                { achievement: 'Presented paper on "IoT-Based Wearable Watch for Visually Impaired Persons" at Kongu Engineering College, Erode', date: 'April 28, 2023', icon: '📝' },
                { achievement: 'Runners-up in Cricket Tournament at Kumaraguru College of Engineering and Technology', date: 'February 2022', icon: '🏆' }
              ].map((item, idx) => (
                <div key={idx} className="group bg-slate-50 border-2 border-slate-200 p-6 rounded-xl hover:border-blue-700 hover:shadow-xl hover:shadow-blue-700/20 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl group-hover:scale-125 transition-transform">{item.icon}</div>
                    <div className="flex-1">
                      <p className="text-lg text-slate-800 mb-1">{item.achievement}</p>
                      <p className="text-slate-600">{item.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">Get In Touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-700 to-blue-900 mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-slate-600 mb-12 leading-relaxed">
            I'm always open to discussing new opportunities, exciting projects, and database challenges!
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <a href="mailto:satheeshkumar2k4@gmail.com"
               className="group bg-slate-50 border-2 border-slate-200 p-8 rounded-2xl hover:border-blue-700 hover:shadow-2xl hover:shadow-blue-700/30 transition-all duration-300 transform hover:-translate-y-3">
              <div className="p-4 bg-blue-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-10 h-10 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800 group-hover:text-blue-700 transition-colors">Email</h3>
              <p className="text-slate-600 text-sm break-all">satheeshkumar2k4@gmail.com</p>
            </a>

            <a href="https://linkedin.com/in/satheesh-kumar-702b20308"
               target="_blank"
               rel="noopener noreferrer"
               className="group bg-slate-50 border-2 border-slate-200 p-8 rounded-2xl hover:border-blue-700 hover:shadow-2xl hover:shadow-blue-700/30 transition-all duration-300 transform hover:-translate-y-3">
              <div className="p-4 bg-blue-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-10 h-10 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800 group-hover:text-blue-700 transition-colors">LinkedIn</h3>
              <p className="text-slate-600 text-sm">Connect with me</p>
            </a>

            <a href="https://github.com/satheesh-kumar-DBA"
               target="_blank"
               rel="noopener noreferrer"
               className="group bg-slate-50 border-2 border-slate-200 p-8 rounded-2xl hover:border-blue-700 hover:shadow-2xl hover:shadow-blue-700/30 transition-all duration-300 transform hover:-translate-y-3">
              <div className="p-4 bg-blue-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-10 h-10 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.840 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.430.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800 group-hover:text-blue-700 transition-colors">GitHub</h3>
              <p className="text-slate-600 text-sm">Check out my work</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 border-t border-slate-200 bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-300 text-center md:text-left">
              &copy; 2025 Satheesh Kumar K. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="https://github.com/satheesh-kumar-DBA" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-cyan-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.840 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.430.372.823 1.102.823 2.222v3.293c.0.319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="https://linkedin.com/in/satheesh-kumar-702b20308" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-cyan-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
