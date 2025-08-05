import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Palette, Zap, Users, Star, Download, Github, Linkedin, Mail, Phone, MapPin, Code, Rocket, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Animated Counter Component
function AnimatedCounter({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const startValue = 0;
      
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);
        
        setCount(Math.floor(startValue + (end - startValue) * progress));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}</span>;
}

// Floating Icons Component
function FloatingIcon({ icon: Icon, className, delay = 0 }: { icon: any; className: string; delay?: number }) {
  return (
    <motion.div
      initial={{ y: 0, rotate: 0 }}
      animate={{ 
        y: [-10, 10, -10],
        rotate: [-5, 5, -5]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }}
      className={className}
    >
      <Icon className="w-8 h-8 text-primary/30" />
    </motion.div>
  );
}

export default function Index() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const skills = [
    "Flutter", "React Native", "Kotlin", "Java", "Dart", "JavaScript", "TypeScript",
    "Android SDK", "iOS Development", "Firebase", "SQLite", "REST APIs", "GraphQL"
  ];

  const services = [
    {
      icon: Smartphone,
      title: "Native Android Development",
      description: "High-performance native Android apps using Kotlin and Java with modern architecture patterns."
    },
    {
      icon: Palette,
      title: "Cross-Platform Apps",
      description: "Beautiful Flutter and React Native apps that work seamlessly across iOS and Android."
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Speed up your existing apps with advanced optimization techniques and best practices."
    },
    {
      icon: Users,
      title: "UI/UX Implementation",
      description: "Convert designs into pixel-perfect, responsive mobile interfaces with smooth animations."
    }
  ];

  const portfolio = [
    {
      title: "E-Commerce Mobile App",
      description: "Full-featured shopping app with payment integration",
      tech: ["Flutter", "Firebase", "Stripe"],
      rating: 4.9,
      downloads: "50K+"
    },
    {
      title: "Social Media Platform",
      description: "Real-time messaging and content sharing app",
      tech: ["React Native", "GraphQL", "AWS"],
      rating: 4.8,
      downloads: "100K+"
    },
    {
      title: "Fitness Tracking App",
      description: "Health monitoring with wearable device integration",
      tech: ["Kotlin", "Room DB", "BLE"],
      rating: 4.7,
      downloads: "25K+"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardHoverVariants = {
    hover: {
      scale: 1.05,
      y: -10,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-success-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0">
        <FloatingIcon icon={Code} className="absolute top-20 left-10" delay={0} />
        <FloatingIcon icon={Smartphone} className="absolute top-40 right-20" delay={1} />
        <FloatingIcon icon={Rocket} className="absolute bottom-40 left-20" delay={2} />
        <FloatingIcon icon={Sparkles} className="absolute bottom-20 right-10" delay={3} />
      </div>

      {/* Mouse Follower */}
      <motion.div
        className="fixed w-4 h-4 bg-primary/20 rounded-full pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 400
        }}
      />

      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div 
            className="text-2xl font-bold text-primary"
            whileHover={{ scale: 1.1, color: "hsl(142, 76%, 50%)" }}
            transition={{ duration: 0.2 }}
          >
            DevAndroid
          </motion.div>
          <nav className="hidden md:flex space-x-8">
            {["Home", "Services", "Portfolio", "About", "Contact"].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-foreground hover:text-primary transition-colors"
                whileHover={{ y: -2, scale: 1.05 }}
                transition={{ duration: 0.2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item}
              </motion.a>
            ))}
          </nav>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="bg-primary hover:bg-primary/90">
              <motion.div
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Mail className="w-4 h-4 mr-2" />
              </motion.div>
              Hire Me
            </Button>
          </motion.div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        id="home" 
        className="py-20 px-4 relative z-10"
        style={{ y: parallaxY }}
      >
        <motion.div 
          className="container mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <Badge className="mb-4 bg-success-100 text-success-800 border-success-200">
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🟢
                </motion.span>
                Available for Freelance Projects
              </Badge>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-success-600 bg-clip-text text-transparent"
            >
              <motion.span
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Expert Android Developer
              </motion.span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed"
            >
              I create beautiful, high-performance mobile applications using Flutter, React Native, and native Android development. 
              Let's bring your app ideas to life with top-notch design and functionality.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
                  <motion.div
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Download className="w-5 h-5 mr-2" />
                  </motion.div>
                  View My Work
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-primary text-primary hover:bg-primary hover:text-white">
                  <motion.div
                    animate={{ rotate: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Phone className="w-5 h-5 mr-2" />
                  </motion.div>
                  Get In Touch
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Skills */}
      <motion.section 
        className="py-16 px-4 bg-background/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Tech Stack & Skills
          </motion.h2>
          <motion.div 
            className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.1, 
                  rotate: [0, -5, 5, 0],
                  boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Badge 
                  variant="secondary" 
                  className="text-sm py-2 px-4 bg-success-100 text-success-800 border-success-200 hover:bg-success-200 transition-colors cursor-pointer"
                >
                  {skill}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Services */}
      <motion.section 
        id="services" 
        className="py-20 px-4"
        style={{ y }}
      >
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">My Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional mobile app development services tailored to your business needs
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover="hover"
              >
                <motion.div variants={cardHoverVariants}>
                  <Card className="border-success-200 hover:shadow-lg transition-shadow h-full">
                    <CardHeader>
                      <motion.div
                        whileHover={{ 
                          rotate: 360,
                          scale: 1.2 
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <service.icon className="w-12 h-12 text-primary mb-4" />
                      </motion.div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">{service.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Portfolio */}
      <motion.section 
        id="portfolio" 
        className="py-20 px-4 bg-background/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Successful mobile applications delivered to satisfied clients
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {portfolio.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover="hover"
              >
                <motion.div variants={cardHoverVariants}>
                  <Card className="border-success-200 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <CardDescription className="text-base">{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <motion.div 
                        className="flex flex-wrap gap-2 mb-4"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        {project.tech.map((tech, techIndex) => (
                          <motion.div
                            key={tech}
                            variants={itemVariants}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            <Badge variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          </motion.div>
                        ))}
                      </motion.div>
                      <div className="flex justify-between items-center">
                        <motion.div 
                          className="flex items-center gap-1"
                          whileHover={{ scale: 1.1 }}
                        >
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                          >
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          </motion.div>
                          <span className="font-semibold">{project.rating}</span>
                        </motion.div>
                        <motion.div 
                          className="flex items-center gap-1 text-success-600"
                          whileHover={{ scale: 1.1 }}
                        >
                          <motion.div
                            animate={{ y: [0, -3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <Download className="w-4 h-4" />
                          </motion.div>
                          <span className="font-semibold">{project.downloads}</span>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* About */}
      <motion.section 
        id="about" 
        className="py-20 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto">
          <motion.div 
            className="grid lg:grid-cols-2 gap-12 items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl font-bold mb-6">About Me</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                I'm a passionate Android developer with 5+ years of experience creating innovative mobile applications. 
                I specialize in Flutter, React Native, and native Android development, delivering high-quality solutions 
                that exceed client expectations.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                My expertise includes modern architecture patterns, performance optimization, and creating intuitive user 
                experiences. I'm committed to writing clean, maintainable code and staying up-to-date with the latest 
                mobile development trends.
              </p>
              <motion.div 
                className="grid grid-cols-2 gap-6"
                variants={containerVariants}
              >
                <motion.div 
                  className="text-center"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="text-3xl font-bold text-primary">
                    <AnimatedCounter end={150} />+
                  </div>
                  <div className="text-muted-foreground">Projects Completed</div>
                </motion.div>
                <motion.div 
                  className="text-center"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="text-3xl font-bold text-primary">
                    <AnimatedCounter end={98} />%
                  </div>
                  <div className="text-muted-foreground">Client Satisfaction</div>
                </motion.div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-br from-success-100 to-success-200 rounded-2xl p-8 text-center"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                rotate: 1
              }}
            >
              <motion.div 
                className="w-48 h-48 bg-gradient-to-br from-primary to-success-600 rounded-full mx-auto mb-6 flex items-center justify-center"
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <motion.div
                  animate={{ 
                    rotate: [0, -360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <Smartphone className="w-24 h-24 text-white" />
                </motion.div>
              </motion.div>
              <h3 className="text-2xl font-bold mb-2">Mobile First Approach</h3>
              <p className="text-muted-foreground">
                Every app I build is designed with mobile-first principles, ensuring optimal performance and user experience.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact */}
      <motion.section 
        id="contact" 
        className="py-20 px-4 bg-background/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Let's Work Together</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to bring your mobile app idea to life? Get in touch and let's discuss your project.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: Mail, title: "Email", info: "your.email@example.com" },
              { icon: Phone, title: "Phone", info: "+1 (555) 123-4567" },
              { icon: MapPin, title: "Location", info: "Available Worldwide" }
            ].map((contact, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover="hover"
              >
                <motion.div variants={cardHoverVariants}>
                  <Card className="text-center border-success-200">
                    <CardHeader>
                      <motion.div
                        whileHover={{ 
                          rotate: [0, -10, 10, 0],
                          scale: 1.2 
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <contact.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                      </motion.div>
                      <CardTitle>{contact.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{contact.info}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="text-center mt-12"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, 0],
                    x: [0, 2, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Mail className="w-5 h-5 mr-2" />
                </motion.div>
                Start Your Project
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        className="border-t bg-background py-12 px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto">
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <motion.div 
                className="text-2xl font-bold text-primary mb-4"
                whileHover={{ scale: 1.05 }}
              >
                DevAndroid
              </motion.div>
              <p className="text-muted-foreground">
                Expert Android developer creating beautiful, high-performance mobile applications.
              </p>
            </motion.div>
            
            {[
              {
                title: "Services",
                items: ["Android Development", "Flutter Apps", "React Native", "UI/UX Implementation"]
              },
              {
                title: "Technologies", 
                items: ["Kotlin & Java", "Dart & Flutter", "React Native", "Firebase & APIs"]
              }
            ].map((section, index) => (
              <motion.div key={index} variants={itemVariants}>
                <h3 className="font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2 text-muted-foreground">
                  {section.items.map((item, itemIndex) => (
                    <motion.li 
                      key={item}
                      whileHover={{ x: 5, color: "hsl(142, 76%, 36%)" }}
                      transition={{ duration: 0.2 }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
            
            <motion.div variants={itemVariants}>
              <h3 className="font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4">
                {[Github, Linkedin, Mail].map((Icon, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: 360,
                      backgroundColor: "hsl(142, 76%, 36%)"
                    }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button variant="outline" size="icon">
                      <Icon className="w-4 h-4" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="border-t mt-8 pt-8 text-center text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p>&copy; 2024 DevAndroid. All rights reserved.</p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}
