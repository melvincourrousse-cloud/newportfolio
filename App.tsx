/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Mail, MapPin, Phone, ExternalLink, ArrowLeft, Linkedin, ArrowRight, Download, FileText } from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

type Section = 'home' | 'about' | 'skills' | 'projects' | 'ambition' | 'transmission' | 'sport' | 'experiences' | 'contact';

const sectionOrder: { id: Section; label: string }[] = [
  { id: 'about', label: 'À propos de moi' },
  { id: 'ambition', label: 'Mon ambition' },
  { id: 'projects', label: 'Mes projets' },
  { id: 'transmission', label: "L'art de transmettre" },
  { id: 'sport', label: 'Le sport une passion' },
  { id: 'experiences', label: 'Mes expériences' },
  { id: 'skills', label: 'Mes atouts pour votre entreprise' },
  { id: 'contact', label: 'Contact' },
];

const generatePortfolioPDF = async (setIsGenerating: (val: boolean) => void) => {
  setIsGenerating(true);
  try {
    // Create a temporary container for the full site content
    const element = document.createElement('div');
    element.style.position = 'absolute';
    element.style.left = '-9999px';
    element.style.top = '0';
    element.style.width = '800px'; // Standard width for PDF
    element.style.backgroundColor = '#E4E3E0'; // Brand BG
    element.style.color = '#141414'; // Brand Ink
    element.style.padding = '40px';
    element.className = 'font-sans';

    // Add content to the temporary container
    element.innerHTML = `
      <div style="text-align: center; margin-bottom: 40px;">
        <h1 style="font-size: 32px; margin-bottom: 10px;">Melvin Courroussé-Brou</h1>
        <p style="font-size: 18px; opacity: 0.8;">Portfolio - Sport Business</p>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h2 style="border-bottom: 2px solid #141414; padding-bottom: 5px; margin-bottom: 15px;">À propos de moi</h2>
        <p style="line-height: 1.6;">Passionné de sport depuis mon plus jeune âge et intéréssé business au fil des années. Amos Sport Business school constitue alors l’école parfaite pour mon épanouissement scolaire. Son cursus nous forme sur les métiers de l’industrie du sport.</p>
        <p style="line-height: 1.6; margin-top: 10px;"><strong>Mon ambition :</strong> M’impliquer pleinement dans la croissance et la structuration d’entreprises du secteur sportif avec une forte volonté d’entreprendre et de concevoir durablement de la valeur pour les organisations et les entreprises sportives avec lesquelles je collaborerai.</p>
      </div>

      <div style="margin-bottom: 30px;">
        <h2 style="border-bottom: 2px solid #141414; padding-bottom: 5px; margin-bottom: 15px;">Mes atouts pour votre entreprise</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <div>
            <h3 style="font-size: 16px; opacity: 0.6; text-transform: uppercase;">Hard Skills</h3>
            <ul style="list-style: none; padding: 0;">
              <li style="margin-bottom: 5px;">• Événementiel sport</li>
              <li style="margin-bottom: 5px;">• Communication sportive</li>
              <li style="margin-bottom: 5px;">• Développement commercial</li>
              <li style="margin-bottom: 5px;">• Marketing</li>
              <li style="margin-bottom: 5px;">• Outils : Canva, Capcut, Excel, Word</li>
            </ul>
          </div>
          <div>
            <h3 style="font-size: 16px; opacity: 0.6; text-transform: uppercase;">Soft Skills</h3>
            <p>Aisance relationnelle / Capacité de persuasion / Esprit entrepreneurial / Enthousiasme / Rigueur</p>
          </div>
        </div>
      </div>

      <div style="margin-bottom: 30px;">
        <h2 style="border-bottom: 2px solid #141414; padding-bottom: 5px; margin-bottom: 15px;">Mon ambition</h2>
        <p style="line-height: 1.6;">Mon ambition est de devenir un acteur majeur de l'industrie du sport en apportant une vision innovante et stratégique. Je souhaite mettre mes compétences au service de projets ambitieux, alliant performance organisationnelle et passion pour le terrain.</p>
      </div>

      <div style="margin-bottom: 30px;">
        <h2 style="border-bottom: 2px solid #141414; padding-bottom: 5px; margin-bottom: 15px;">Contact</h2>
        <p>Email : melvin.courrousse@gmail.com</p>
        <p>LinkedIn : linkedin.com/in/melvin-courrousse-brou</p>
      </div>
    `;

    document.body.appendChild(element);

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#E4E3E0'
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('Melvin_Courrousse_Brou_Portfolio.pdf');

    document.body.removeChild(element);
  } catch (error) {
    console.error('Error generating PDF:', error);
  } finally {
    setIsGenerating(false);
  }
};

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'about', label: 'À propos de moi' },
    { id: 'ambition', label: 'Mon ambition' },
    { id: 'projects', label: 'Mes projets' },
    { id: 'transmission', label: "L'art de transmettre" },
    { id: 'sport', label: 'Le sport une passion' },
    { id: 'experiences', label: 'Mes expériences' },
    { id: 'skills', label: 'Mes atouts pour votre entreprise' },
    { id: 'contact', label: 'Contact' },
  ];

  const navigateTo = (section: Section) => {
    setActiveSection(section);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-brand-text selection:text-brand-bg">
      <AnimatePresence mode="wait">
        {activeSection === 'home' ? (
          <motion.main
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-screen flex flex-col items-center justify-center p-6 text-center bg-brand-bg"
          >
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-brand-text mb-12"
            >
              Melvin Courroussé-Brou
            </motion.h1>

            <div className="relative">
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 px-8 py-3 bg-brand-text text-brand-bg rounded-full hover:opacity-90 transition-all duration-300 group"
              >
                Explorer le portfolio
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 bg-brand-bg border border-brand-text/20 rounded-2xl shadow-xl overflow-hidden z-50 py-2"
                  >
                    {menuItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => navigateTo(item.id as Section)}
                        className="w-full text-left px-6 py-3 text-brand-text/80 hover:bg-brand-text/10 hover:text-brand-text transition-colors text-sm font-medium"
                      >
                        {item.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.main>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="min-h-screen bg-brand-bg pb-20"
          >
            {/* Navigation Header */}
            <header className="sticky top-0 z-40 bg-brand-bg/80 backdrop-blur-md border-b border-brand-text/20">
              <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                <button 
                  onClick={() => navigateTo('home')}
                  className="flex items-center gap-2 text-brand-text/60 hover:text-brand-text transition-colors text-sm font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Retour
                </button>
                
                <div className="relative">
                  <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-sm font-semibold text-brand-text flex items-center gap-1"
                  >
                    Menu
                    <ChevronDown className={`w-4 h-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-4 w-56 bg-brand-bg border border-brand-text/20 rounded-xl shadow-lg py-2 z-50"
                      >
                        {menuItems.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => navigateTo(item.id as Section)}
                            className={`w-full text-left px-4 py-2 text-sm transition-colors ${activeSection === item.id ? 'bg-brand-text/10 text-brand-text font-bold' : 'text-brand-text/60 hover:bg-brand-text/10 hover:text-brand-text'}`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </header>

            {/* Content Area */}
            <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">
              {activeSection === 'about' && <AboutSection />}
              {activeSection === 'projects' && <ProjectsSection />}
              {activeSection === 'ambition' && <AmbitionSection />}
              {activeSection === 'transmission' && <TransmissionSection />}
              {activeSection === 'sport' && <SportSection />}
              {activeSection === 'experiences' && <ExperiencesSection />}
              {activeSection === 'skills' && <SkillsSection />}
              {activeSection === 'contact' && <ContactSection />}
              
              <NextSectionButton currentSection={activeSection} onNavigate={navigateTo} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NextSectionButton({ currentSection, onNavigate }: { currentSection: Section, onNavigate: (section: Section) => void }) {
  const currentIndex = sectionOrder.findIndex(s => s.id === currentSection);
  
  if (currentIndex === -1 && currentSection !== 'contact') return null;

  let nextSection: Section;
  let label: string;

  if (currentSection === 'contact') {
    nextSection = 'home';
    label = 'Retour à l’accueil';
  } else {
    const nextItem = sectionOrder[currentIndex + 1];
    if (!nextItem) return null;
    nextSection = nextItem.id;
    label = nextItem.label;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-24 flex justify-center"
    >
      <button
        onClick={() => onNavigate(nextSection)}
        className="group flex items-center gap-4 px-10 py-5 bg-brand-text text-brand-bg rounded-full hover:opacity-90 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
      >
        <span className="text-lg font-medium tracking-wide">{label}</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
      </button>
    </motion.div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-4xl font-light text-brand-text mb-12 border-l-4 border-brand-text pl-6"
    >
      {children}
    </motion.h2>
  );
}

function AboutSection() {
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <section>
      <SectionTitle>À propos de moi</SectionTitle>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-brand-text/80 leading-relaxed">
          <p>
            Passionné de sport depuis mon plus jeune âge et intéréssé business au fil des années. Amos Sport Business school constitue alors l’école parfaite pour mon épanouissement scolaire. Son cursus nous forme sur les métiers de l’industrie du sport.
          </p>
          <p>
            <strong>Mon ambition :</strong> M’impliquer pleinement dans la croissance et la structuration d’entreprises du secteur sportif avec une forte volonté d’entreprendre et de concevoir durablement de la valeur pour les organisations et les entreprises sportives avec lesquelles je collaborerai.
          </p>
          
          <div className="pt-4 flex flex-wrap gap-4">
            <button 
              onClick={() => generatePortfolioPDF(setIsGenerating)}
              disabled={isGenerating}
              className="flex items-center gap-2 px-6 py-3 bg-brand-text text-brand-bg rounded-full hover:opacity-90 transition-all duration-300 font-medium text-sm disabled:opacity-50"
            >
              {isGenerating ? (
                <>Génération...</>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Télécharger le Portfolio (PDF)
                </>
              )}
            </button>
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-2 px-6 py-3 border border-brand-text text-brand-text rounded-full hover:bg-brand-text/10 transition-all duration-300 font-medium text-sm"
            >
              <FileText className="w-4 h-4" />
              Imprimer la page
            </button>
          </div>
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden shadow-2xl bg-brand-bg"
        >
          <img 
            src="/images/PP portfolio.JPG" 
            alt="Melvin Courroussé-Brou - Photo de profil" 
            className="w-full h-auto object-contain block"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>
    </section>
  );
}

function SkillsSection() {
  const skills = [
    "Événementiel sport : Gestion projet (budget prévisionnel, rétroplanning)",
    "Communication sportive : Plan de communication, création contenu, animation réseaux sociaux",
    "Développement commercial : Plaquette commercial, négociation commerciale & closing",
    "Marketing : Persona, SMART, marketing mix (stratégie marketing)",
    "Outils maitrisés : Canva, Capcut, Excel, Word"
  ];

  return (
    <section id="skills-section">
      <SectionTitle>Mes atouts pour votre entreprise</SectionTitle>
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Hard Skills Column */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-brand-text/60 mb-4 uppercase tracking-wider">Hard Skills</h3>
          <div className="grid gap-3">
            {skills.map((skill, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="p-4 bg-brand-bg rounded-xl border border-brand-text/20 shadow-sm"
              >
                <span className="text-brand-text font-medium text-sm leading-snug">{skill}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Soft Skills Column */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-brand-text/60 mb-4 uppercase tracking-wider">Soft Skills</h3>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 bg-brand-bg rounded-2xl border border-brand-text/20 shadow-sm"
          >
            <p className="text-brand-text/80 leading-relaxed">
              Aisance relationnelle / Capacité de persuasion / Esprit entrepreneurial / Enthousiasme / Rigueur
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const projects = [
    {
      title: "Développement des activités BtoB / BtoC pour un club de golf",
      url: "https://drive.google.com/file/d/16qtl9oVm22k086Fec1qXIYSO5H4FbByG/view?usp=drive_link"
    },
    {
      title: "Plaquette commerciale pour un événement de fléchette",
      url: "https://drive.google.com/file/d/1xJ5YOa62bm9xysG6PJLarnxNL9dUWP9O/view?usp=drive_link"
    },
    {
      title: "Stratégie marketing / communication pour la marque Salomon",
      url: "https://drive.google.com/file/d/1_0UnqQKilZfo52cQc218AbXcbYCvXXWs/view?usp=drive_link"
    }
  ];

  return (
    <section>
      <SectionTitle>Mes projets</SectionTitle>
      <div className="space-y-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 bg-brand-bg rounded-2xl border border-brand-text/20 shadow-sm"
        >
          <p className="text-brand-text/80 leading-relaxed">
            Nous réalisons divers projets concrets qui permettent de mettre en application les connaissances acquises lors des cours théoriques. Voici quelques-unes de mes réalisations marquantes :
          </p>
        </motion.div>

        <div className="grid gap-6">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-8 bg-brand-bg rounded-2xl border border-brand-text/20 shadow-sm group hover:border-brand-text transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <h3 className="text-xl font-medium text-brand-text max-w-xl">
                {project.title}
              </h3>
              <a 
                href={project.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-text text-brand-bg rounded-full hover:opacity-90 transition-colors text-sm font-medium whitespace-nowrap self-start md:self-center"
              >
                Voir le projet
                <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AmbitionSection() {
  return (
    <div className="flex flex-col">
      {/* PAGE 1 */}
      <section className="min-h-screen w-full flex flex-col items-center justify-center p-6 md:p-12 space-y-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-light text-brand-text tracking-tight text-center"
        >
          Mon ambition
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl text-center text-brand-text/80 leading-relaxed text-lg md:text-xl space-y-6"
        >
          <p>
            Afin de concrétiser mon ambition, je m’engage d’ores et déjà à la réalisation d’actions spécifiques :
          </p>
          <p>
            – Participation à de nombreux événements en tant que bénévole afin de comprendre leur organisation, leur structuration, ainsi que la réalité du terrain et les enjeux propres aux différents rôles.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 gap-4 md:gap-8 w-full max-w-5xl"
        >
          <img 
            src="/images/ep-marathon-vert.jpg" 
            alt="Bénévolat Marathon Vert" 
            className="rounded-2xl object-cover w-full aspect-video shadow-xl"
            referrerPolicy="no-referrer"
          />
          <img 
            src="/images/ep-crmhb.jpg" 
            alt="Bénévolat CRMHB" 
            className="rounded-2xl object-cover w-full aspect-video shadow-xl"
            referrerPolicy="no-referrer"
          />
          <img 
            src="/images/photo-bayman.jpg" 
            alt="Bénévolat BayMan" 
            className="rounded-2xl object-cover w-full aspect-video shadow-xl"
            referrerPolicy="no-referrer"
          />
          <img 
            src="/images/footair2.jpg" 
            alt="Bénévolat FOOTAIR2" 
            className="rounded-2xl object-cover w-full aspect-video shadow-xl"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </section>

      {/* PAGE 2 */}
      <section className="min-h-screen w-full flex flex-col items-center justify-center p-6 md:p-12 space-y-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-light text-brand-text tracking-tight text-center"
        >
          Mon ambition
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl text-center text-brand-text/80 leading-relaxed text-lg md:text-xl"
        >
          <p>
            – Réalisation d’une veille constante sur les évolutions du secteur à travers des podcasts et des magazines spécialisés (Le café du Sport Business, Sport Buzz Business, Sport Business club...)
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 w-full max-w-6xl"
        >
          <img 
            src="/images/sbb.png" 
            alt="Sport Buzz Business" 
            className="rounded-2xl object-cover w-full aspect-video shadow-xl"
            referrerPolicy="no-referrer"
          />
          <img 
            src="/images/sbc.png" 
            alt="Sport Business Club" 
            className="rounded-2xl object-cover w-full aspect-video shadow-xl"
            referrerPolicy="no-referrer"
          />
          <img 
            src="/images/lcdsb.png" 
            alt="Le Café du Sport Business" 
            className="rounded-2xl object-cover w-full aspect-video shadow-xl"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </section>
    </div>
  );
}

function TransmissionSection() {
  return (
    <section>
      <SectionTitle>L'art de transmettre</SectionTitle>
      <div className="space-y-12">
        <div className="text-brand-text/80 leading-relaxed max-w-3xl space-y-4">
          <p>
            Bercé dans le football depuis mon plus jeune âge je m’engage en 2019 en tant qu’éducateur au sein de mon club formateur afin de transmettre mes savoirs.
          </p>
          <p>
            Ce qui me plaît le plus dans ce rôle, être en mesure de former, développer le potentiel de chacun et créer des souvenirs heureux au sein de mes équipes.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <img src="/images/Causerie.JPG" alt="Causerie d'avant-match" className="rounded-xl object-cover w-full aspect-video shadow-lg" referrerPolicy="no-referrer" />
          <img src="/images/équipe.JPG" alt="L'équipe au complet" className="rounded-xl object-cover w-full aspect-video shadow-lg" referrerPolicy="no-referrer" />
          <img src="/images/victoire.jpg" alt="Célébration d'une victoire" className="rounded-xl object-cover w-full aspect-video shadow-lg" referrerPolicy="no-referrer" />
        </div>
      </div>
    </section>
  );
}

function SportSection() {
  return (
    <section>
      <SectionTitle>Le sport une passion</SectionTitle>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-brand-text/80 leading-relaxed">
          <p>
            À côté du ballon rond, je suis passionné par le développement de mes capacités physiques et très attaché au développement d’une bonne santé.
          </p>
          <p>
            Mon quotidien hebdomadaire depuis l’âge de mes 16 ans : 5 à 6 séances de sport par semaine via la pratique de la musculation et d'autres disciplines permettant de développer mes capacités cardio-vasculaires (course à pied, crossfit...).
          </p>
          <p className="font-medium text-brand-text">
            La clé du succès pour progresser : discipline, analyse, dépassement de soi.
          </p>
        </div>
        <img src="/images/Crossfit.png" alt="Pratique du Crossfit et musculation" className="rounded-2xl object-cover w-full aspect-video shadow-xl" referrerPolicy="no-referrer" />
      </div>
    </section>
  );
}

function ExperiencesSection() {
  return (
    <section>
      <SectionTitle>Mes expériences</SectionTitle>
      <div className="space-y-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="p-6 bg-brand-bg rounded-2xl border border-brand-text/10 shadow-sm">
              <h3 className="text-lg font-semibold text-brand-text mb-4">Conseiller de vente running — Intersport</h3>
              <ul className="space-y-2 text-brand-text/80 list-disc pl-5">
                <li>Identification des besoins et attentes du client</li>
                <li>Conseils sur les produits adaptés au profil client</li>
                <li>Mise en place d’opérations commerciales</li>
              </ul>
            </div>

            <div className="p-6 bg-brand-bg rounded-2xl border border-brand-text/10 shadow-sm">
              <h3 className="text-lg font-semibold text-brand-text mb-4">Animateur commercial — Asics Running</h3>
              <ul className="space-y-2 text-brand-text/80 list-disc pl-5">
                <li>Accompagnement des vendeurs au rayon running sur la marque</li>
                <li>Promotion de la marque auprès des clients</li>
                <li>Reporting des comportements d'achat</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <img 
              src="/images/photo intersport.JPG" 
              alt="Expérience chez Intersport" 
              className="rounded-2xl object-cover w-full aspect-video shadow-md hover:shadow-xl transition-shadow duration-500" 
              referrerPolicy="no-referrer" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <section className="py-12">
      <SectionTitle>Contact</SectionTitle>
      <div className="max-w-2xl mx-auto text-center space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center p-6 bg-brand-bg rounded-2xl border border-brand-text/10 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="w-12 h-12 rounded-full bg-brand-text/10 flex items-center justify-center text-brand-text mb-4">
              <Phone className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-semibold text-brand-text/60 uppercase tracking-wider mb-2">Téléphone</h4>
            <span className="text-xl font-medium text-brand-text">06.21.80.84.73</span>
          </div>

          <div className="flex flex-col items-center p-6 bg-brand-bg rounded-2xl border border-brand-text/10 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="w-12 h-12 rounded-full bg-brand-text/10 flex items-center justify-center text-brand-text mb-4">
              <Mail className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-semibold text-brand-text/60 uppercase tracking-wider mb-2">Email</h4>
            <a href="mailto:melvin.courrousse@gmail.com" className="text-xl font-medium text-brand-text hover:text-brand-text/80 transition-colors">
              melvin.courrousse@gmail.com
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col items-center gap-6">
          <a 
            href="https://www.linkedin.com/in/melvin-courroussé-brou-aa5b28268" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-3 px-8 py-4 bg-brand-text text-brand-bg rounded-full font-semibold hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Linkedin className="w-5 h-5" />
            Voir mon LinkedIn
            <ExternalLink className="w-4 h-4 opacity-50" />
          </a>

          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => generatePortfolioPDF(setIsGenerating)}
              disabled={isGenerating}
              className="flex items-center gap-2 px-6 py-3 border border-brand-text text-brand-text rounded-full hover:bg-brand-text/10 transition-all duration-300 font-medium text-sm disabled:opacity-50"
            >
              {isGenerating ? (
                <>Génération...</>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Télécharger le Portfolio (PDF)
                </>
              )}
            </button>
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-2 px-6 py-3 border border-brand-text/40 text-brand-text/60 rounded-full hover:bg-brand-text/5 transition-all duration-300 font-medium text-sm"
            >
              <FileText className="w-4 h-4" />
              Imprimer la page
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
