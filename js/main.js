// Main JavaScript functionality for Martial Minds website

// Navbar behavior on scroll
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Initialize language switcher - moved to DOMContentLoaded event listener
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize scroll to top button
    initScrollToTop();
});

// Scroll-based animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.service-card, .pricing-card, .reference-card, .contact-item').forEach(el => {
        observer.observe(el);
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Contact form handling
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            showNotification('Thank you for your message! I will get back to you soon.', 'success');
            
            // Reset form
            form.reset();
        });
    }
}

// Scroll to top button
function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Language switcher functionality
function initLanguageSwitcher() {
    let currentLanguage = 'de';
    
    const languages = {
        en: {
            // Navigation
            'home': 'Home',
            'about': 'About',
            'services': 'Services',
            'pricing': 'Pricing',
            'contact': 'Contact',
            
            // Hero Section
            'hero-title': 'Martial Minds',
            'hero-subtitle': 'Practice for Psychotherapy',
            'heilpraktiker-text': 'According to the Heilpraktikergesetz',
            'schwerpunkte-title': 'My Focus Areas',
            'schwerpunkte-text': 'Personal development, trauma healing, coping with anxiety disorders, self-esteem & inner stability, couple relationships & communication, spiritual self-awareness, prevention training, workplace health promotion/executive coaching/business coaching',
            'hero-description': 'Martial Minds is more than just a practice name - it is a concept. The word "martial" originally comes from the field of martial arts - and symbolizes strength, courage, discipline and determination to actively face life\'s challenges. "Minds" refers to the depth, complexity and versatility of our minds. Together, Martial Minds embodies the powerful combination of inner strength and psychological growth - exactly where change begins.',
            'learn-more': 'Learn More',
            'get-started': 'Get Started',
            
            // About Section
            'about-title': 'About Me',
            'about-subtitle': 'Your journey to mental strength and personal growth',
            'about-title-2': 'Non-medical practitioner for psychotherapy',
            'about-description': 'My path into psychotherapeutic work began with a deep interest in human experience, social dynamics and emotional healing. This interest led me to a Master of Science in Social Psychology, where I learned how our thoughts, feelings and actions arise and can change in interaction with our social environment.',
            'about-experience': 'Since 2016, I have been working in the psychosocial field, particularly in initial psychological counseling for people with a history of migration. This work in a non-profit environment has not only shaped me, but has also shown me how important a resource-oriented and culturally sensitive approach to mental health is. Topics such as identity, attachment, loss and resilience are at the heart of this - experiences that are now directly incorporated into my therapeutic work.',
            'about-martial': 'In addition to my therapeutic work, another area has played a central role in my life for over two decades: Kuk Sool Won, a traditional Korean martial art that I have been practicing since 2001. I am a 3rd Dan (black belt) holder. Kuk Sool Won combines aspects of self-defense, meditation, movement and inner discipline. It is not only about physical strength, but also about the balance between mind and body, focus, resilience and mindfulness - values that have also deeply influenced my therapeutic approach.',
            'about-approach': 'My approach is characterized by mindfulness, clarity, empathy and the deep conviction that change is possible - if we are willing to look, feel and grow. I look forward to accompanying you on your journey.',
            'qualifications-title': 'I am a qualified:',
            'martial-philosophy': 'The connection between martial arts and psychotherapy was the inspiration for the name of my practice: Martial Minds stands for the synthesis of inner strength, clarity and mental agility - for the ability to courageously engage with oneself and consciously grow.',
            
            // Services Section
            'services-title': 'Services & Methods',
            'services-subtitle': 'Professional support for your mental health and personal development',
            'service-birkman': 'Birkman Personality Test',
            'service-birkman-desc': 'A well-founded psychological test that reveals your behavioral patterns, needs, strengths and stressors. Ideal for professional reorientation, strengthening self-knowledge or as a basis for coaching and therapy.',
            'service-emdr': 'EMDR - Trauma Therapy',
            'service-emdr-desc': 'Eye Movement Desensitization and Reprocessing is a scientifically well-researched method for processing stressful or traumatic memories. Bilateral stimulation helps the brain release internal blockages.',
            'service-behavioral': 'Behavioral Therapy',
            'service-behavioral-desc': 'A structured approach to changing thoughts, feelings and actions. Helps to overcome anxiety disorders, depression, inner emptiness, exhaustion, negative self-image or debilitating habits.',
            'service-couples': 'Couples Therapy',
            'service-couples-desc': 'Finding new paths together. I support couples with tools from emotion-focused therapy, non-violent communication and systemic methods. For more closeness, understanding and real change.',
            'service-birthchart': 'Psychological Birthchart Reading',
            'service-birthchart-desc': 'A depth psychology-based interpretation of your birth chart - with a focus on inner dynamics, emotional development and unconscious patterns. Not an astrology cliché, but a fascinating tool for self-knowledge.',
            'service-business': 'Business Coaching',
            'service-business-desc': 'Tailor-made offers for companies including workplace health promotion, executive coaching, team development, and primary prevention programs to strengthen mental health and resilience.',
            
            // Target Groups & Approach
            'target-groups-title': 'Target Groups and Costs',
            'target-groups-desc': 'I treat adults and young people aged 16 and over who want to consciously work on their personal development and mental health. I also support companies - especially managers and teams - as part of coaching, prevention and personal development to promote mental strength, self-reflection and sustainable leadership skills. Treatment is exclusively for self-payers or people whose private insurance covers the costs.',
            'advantages-title': 'Advantages for you as a self-payer or privately insured person:',
            'advantage-1': 'Flexible appointment allocation according to your needs',
            'advantage-2': 'Intensive, individual support without long waiting times',
            'advantage-3': 'Access to specialized, modern methods such as EMDR, Birkman test or psychological birthchart reading',
            'advantage-4': 'Personal and confidential atmosphere with high quality standards',
            'advantage-5': 'Combination of proven psychotherapeutic methods and modern, scientifically based methods',
            'advantage-6': 'No application or approval procedures necessary: Treatment can begin immediately',
            'advantage-7': 'Absolute discretion: no diagnoses or treatment data are passed on to third parties',
            'therapy-approach-title': 'Therapy & Support - Online and On-site',
            'therapy-approach-desc': 'All services offered by my practice preferably take place online (remotely) - securely, flexibly and regardless of location. Initial consultations usually take place in person in order to create a basis of trust. If you would like therapy in person, this is also possible at any time.',
            'methods-title': 'Methods and tools I use:',
            'method-1': 'Thought protocols to reflect on and restructure negative thought patterns',
            'method-2': 'Exposure exercises to gradually confront stressful situations',
            'method-3': 'Behavioral exercises that train new ways of acting',
            'method-4': 'Mindfulness and relaxation techniques for more inner peace and self-awareness',
            'method-5': 'Resource work to strengthen your personal resilience',
            
            // Pricing Section
            'pricing-title': 'Pricing',
            'pricing-subtitle': 'Transparent pricing for professional mental health services',
            'pricing-list-title': 'Services & Prices',
            'pricing-basic': 'Basic Services',
            'pricing-specialized': 'Specialized Services',
            'pricing-premium': 'Premium Services',
            'per-session': '/session',
            'per-service': '/service',
            'per-test': '/test',
            'pricing-consultation': 'Initial consultation/Anamnesis',
            'pricing-psychotherapy': 'Psychotherapy',
            'pricing-emdr': 'EMDR trauma therapy',
            'pricing-birkman': 'Birkman Advance personality test',
            'pricing-couples': 'Couples therapy/Communication coaching for couples',
            'pricing-birthchart': 'Psychological Birthchart reading',
            'pricing-prevention': 'Primary prevention in companies / institutions',
            'pricing-business': 'Workplace health promotion/Executive Coaching/ Business Coaching',
            'most-popular': 'Most Popular',
            'pricing-note': 'Note: All services are for self-payers or people whose private insurance covers the costs. The treatment is exclusively for self-payers or people whose private insurance covers the costs. For companies and institutions, prices are available upon request.',
            'pricing-birthchart': 'Psychological Birthchart Reading',
            'pricing-prevention': 'Primary Prevention in Companies / Institutions',
            'pricing-business': 'Workplace Health Promotion/Executive Coaching/ Business Coaching',
            'pricing-on-request': 'Prices on request',
            'pricing-on-request-2': 'Prices on request',
            
            // References Section
            'references-title': 'References & Certifications',
            'references-subtitle': 'Professional affiliations and recognized expertise',
            'reference-fresh-minds': 'Fresh Minds',
            'reference-fresh-minds-desc': 'Project collaboration partner - working together to bring innovative mental health solutions to the community.',
            'reference-birkman': 'Official Birkman Consultant',
            'reference-birkman-desc': 'Certified Birkman Coach with official recognition, providing scientifically-based personality assessments and coaching.',
            
            // Contact Section
            'contact-title': 'Contact Me',
            'contact-subtitle': 'Ready to start your journey? Get in touch today.',
            'contact-info-title': 'Get in Touch',
            'contact-form-title': 'Send a Message',
            'phone': 'Phone',
            'email': 'Email',
            'location': 'Location',
            'location-desc': 'Online sessions available worldwide. In-person sessions available in Germany.',
            'availability': 'Availability',
            'availability-desc': 'Flexible scheduling. Initial consultations usually in-person, therapy sessions online or in-person.',
            'select-service': 'Select a Service',
            'option-psychotherapy': 'Psychotherapy',
            'option-emdr': 'EMDR Trauma Therapy',
            'option-birkman': 'Birkman Personality Test',
            'option-behavioral': 'Behavioral Therapy',
            'option-couples': 'Couples Therapy',
            'option-birthchart': 'Psychological Birthchart Reading',
            'option-business': 'Business Coaching',
            'option-other': 'Other',
            'send-message': 'Send Message',
            
            // Footer
            'all-rights': 'All rights reserved.',
            
            // Birth Chart Page
            'birthchart-hero-title': 'Psychological Birthchart Reading',
            'birthchart-hero-subtitle': 'Your personal horoscope - rethought through the lens of modern psychology',
            'birthchart-benefits-title': 'What a birth chart reveals',
            'birthchart-benefits-subtitle': 'Discover the transformative insights waiting in your astrological blueprint',
            'birthchart-benefit-1-title': 'Self-reflection & inner growth',
            'birthchart-benefit-1-desc': 'Gain deep insights into your personality structure, emotional patterns and unconscious motivations that shape your behavior and decisions.',
            'birthchart-benefit-2-title': 'Recognize strengths & challenges',
            'birthchart-benefit-2-desc': 'Identify your natural talents, potential growth areas and the unique challenges that can become opportunities for personal development.',
            'birthchart-benefit-3-title': 'Connect conscious & unconscious',
            'birthchart-benefit-3-desc': 'Bridge the gap between your conscious mind and deeper psychological patterns to create greater self-awareness and integration.',
            'birthchart-benefit-4-title': 'Personality development & self-acceptance',
            'birthchart-benefit-4-desc': 'Develop a compassionate understanding of yourself and create a roadmap for personal growth that aligns with your authentic nature.',
            'birthchart-benefit-5-title': 'Decision making & life planning',
            'birthchart-benefit-5-desc': 'Use your astrological insights to make aligned decisions and create a life path that matches your true purpose and potential.',
            'birthchart-benefit-6-title': 'Understand relationship patterns',
            'birthchart-benefit-6-desc': 'Discover how your birth chart influences your relationships and learn to create healthier, more fulfilling connections with others.',
            'birthchart-process-title': 'The Reading Process',
            'birthchart-process-subtitle': 'A structured approach to decoding your astrological insights',
            'birthchart-step-1-title': 'Initial consultation',
            'birthchart-step-1-desc': 'We begin with a conversation about your current life situation, challenges and what you hope to gain from the birth chart reading. This helps me tailor the interpretation to your specific needs.',
            'birthchart-step-2-title': 'Horoscope calculation & analysis',
            'birthchart-step-2-desc': 'I calculate your precise birth chart with your exact birth time, birth date and birth place. This creates a unique astrological blueprint that reveals your personality structure and life patterns.',
            'birthchart-step-3-title': 'Psychological interpretation',
            'birthchart-step-3-desc': 'Using depth psychological principles, I interpret your horoscope with a focus on inner dynamics, emotional development and unconscious patterns rather than predictions or fortune telling.',
            'birthchart-step-4-title': 'Integration & application',
            'birthchart-step-4-desc': 'We discuss how you can apply these insights in your daily life and create practical strategies for personal growth and self-acceptance based on your astrological profile.',
            'birthchart-cta-title': 'Ready to begin?',
            'birthchart-cta-desc': 'Take the first step to deeper self-understanding and personal growth. Contact me to schedule your psychological birth chart reading.',
            'call-button': 'Call +49 175 1427016',
            'email-button': 'Send email',
            'book-button': 'Book online',
            'back-to-home': 'Back to Home',
            'birthchart-different-title': 'Not Your Typical Horoscope',
            'birthchart-different-desc': 'This is not an astrology cliché or daily horoscope reading. Instead, it is a sophisticated psychological tool that combines:',
            'birthchart-feature-1-title': 'Scientific Foundation:',
            'birthchart-feature-1-desc': 'Based on psychological research and depth psychological principles',
            'birthchart-feature-2-title': 'Professional Expertise:',
            'birthchart-feature-2-desc': 'Conducted by a trained therapist and certified coach',
            'birthchart-feature-3-title': 'Psychological Focus:',
            'birthchart-feature-3-desc': 'Emphasis on self-understanding and personal development',
            'birthchart-feature-4-title': 'Holistic Approach:',
            'birthchart-feature-4-desc': 'Integration of mind, body and spiritual awareness',
            'birthchart-spiritual-title': 'Spiritual Component',
            'birthchart-spiritual-desc-1': 'For all those seeking a spiritual component in their personality development, psychological birth chart reading is an exciting addition to classical psychotherapy and coaching.',
            'birthchart-spiritual-desc-2': 'It offers a unique bridge between scientific psychology and spiritual wisdom and provides insights that can complement and enrich your therapeutic journey.',
            'birthchart-philosophy-title': 'The Martial Minds Philosophy',
            'birthchart-philosophy-desc-1': 'As a trained therapist and coach, I use psychological birth chart reading to accompany you on your path of personal development - entirely in the spirit of Martial Minds: the balance of mind and body, strength and mindfulness.',
            'birthchart-philosophy-desc-2': 'This approach combines the discipline and focus of martial arts with the depth and insight of psychological astrology, creating a unique framework for personal transformation and growth.',
            'birthchart-pricing-title': 'Investment in Self-Knowledge',
            'birthchart-pricing-subtitle': 'per Reading Session',
            'birthchart-pricing-item-1': 'Comprehensive Birth Chart Analysis',
            'birthchart-pricing-item-2': '60-minute intensive session',
            'birthchart-pricing-item-3': 'No written summary',
            'birthchart-pricing-item-4': 'Follow-up via email',
            'birthchart-pricing-item-5': 'Integration with therapy goals',
            'business-health-title': 'Occupational Health Promotion',
            'business-health-desc': 'My offers for companies are tailor-made and always oriented towards the specific needs of your organization. Whether it\'s about promoting mental health in the workplace, individual support for executives or team development - the focus is always on sustainable, effective change.',
            'business-executive-title': 'Executive Coaching',
            'business-executive-desc': 'Individual coaching for executives and employees, workshops to strengthen resilience, self-leadership or team culture, and consultation on healthy leadership and psychological safety in the company.',
            'business-leadership-title': 'Leadership Development',
            'business-leadership-desc': 'Based on the Birkman Method Assessment, I support executives in developing their leadership skills and creating healthy work environments.',
            'business-prevention-title': 'Primary Prevention',
            'business-prevention-desc': 'Preventive programs for companies and institutions that aim to prevent mental illnesses early through stress management, resilience training and mindfulness programs.',
            'business-team-title': 'Team Development',
            'business-team-desc': 'Workshops and trainings to strengthen team culture, improve communication and build psychological safety in the workplace.',
            'birthchart-integration-title': 'Integration into my Practice',
            'birthchart-integration-subtitle': 'How the Birthchart Reading fits into the Martial Minds approach',
            'business-process-step-1-title': 'Assessment & Analysis',
            'business-process-step-1-desc': 'We begin with a comprehensive assessment of your organization\'s current state, identifying areas for improvement and growth opportunities.',
            'business-process-step-2-title': 'Tailored Solution Development',
            'business-process-step-2-desc': 'Based on the assessment, I develop a tailored program that takes into account your specific needs and organizational culture.',
            'business-process-step-3-title': 'Implementation & Support',
            'business-process-step-3-desc': 'We implement the program together, with continuous support and guidance to ensure successful results.',
            'business-process-step-4-title': 'Evaluation & Continuous Improvement',
            'business-process-step-4-desc': 'Regular progress evaluation and continuous refinement of strategies to maximize impact and sustainability.',
            'business-metric-1': 'Improvement in team communication',
            'business-metric-2': 'Reduction in workplace stress',
            'business-metric-3': 'Increase in employee satisfaction',
            'business-metric-4': 'Improvement in leadership effectiveness',
            'business-pricing-item-1': 'Professional EMDR treatment',
            'business-pricing-item-2': 'Structured therapy process',
            'business-pricing-item-3': 'Evidence-based approach',
            'business-pricing-item-4': 'Continuous support',
            'business-pricing-item-5': 'Progress tracking',
            'business-pricing-business-title': 'Business Coaching & Prevention',
            'business-pricing-business-desc': 'For companies and institutions, prices are available upon request. All programs are tailored to your specific needs and organizational structure.',
            'consultation-button': 'Book consultation',
            'personal-journey-title': 'Your Growth Journey',
            'personal-journey-subtitle': 'A structured path to personal transformation and success',
            'personal-journey-step-1-title': 'Assessment & Awareness',
            'personal-journey-step-1-desc': 'We begin by understanding your current situation, identifying growth areas and creating awareness of patterns that may be holding you back.',
            'personal-journey-step-2-title': 'Goal Setting & Planning',
            'personal-journey-step-2-desc': 'Together we establish clear, meaningful goals and create a structured plan for their implementation, breaking down big goals into manageable steps.',
            'personal-journey-step-3-title': 'Skill Development & Practice',
            'personal-journey-step-3-desc': 'You learn practical skills and techniques and then practice them consistently to build new habits and patterns that support your growth.',
            'personal-journey-step-4-title': 'Integration & Mastery',
            'personal-journey-step-4-desc': 'As you integrate new skills into your daily life, you develop mastery and confidence and create lasting positive changes.',
            'personal-stories-title': 'Transformation Stories',
            'personal-stories-subtitle': 'Real people, real change, real results',
            'personal-story-1-quote': '"Through behavioral therapy, I learned to recognize my negative thought patterns and replace them with empowering beliefs. I now approach challenges with confidence instead of fear."',
            'personal-story-1-author': '- Sarah M., Anxiety Management',
            'personal-story-2-quote': '"Couple therapy helped us free ourselves from destructive communication patterns. We now have the tools to resolve conflicts constructively and grow together."',
            'personal-story-2-author': '- Michael & Lisa, Relationship Growth',
            'personal-story-3-quote': '"The personal development program gave me the mindset and skills to achieve goals I never thought possible. I now live the life I always dreamed of."',
            'personal-story-3-author': '- David K., Life Transformation',
            'personal-pricing-individual-title': 'Individual Therapy Investment',
            'personal-pricing-individual-subtitle': 'per 60-minute session',
            'personal-pricing-individual-item-1': 'Professional behavioral therapy',
            'personal-pricing-individual-item-2': 'Personalized treatment plan',
            'personal-pricing-individual-item-3': 'Evidence-based approaches',
            'personal-pricing-individual-item-4': 'Ongoing support',
            'personal-pricing-individual-item-5': 'Progress tracking',
            'personal-pricing-couple-title': 'Couple Therapy Investment',
            'personal-pricing-couple-subtitle': 'per 60-minute session',
            'personal-pricing-couple-item-1': 'Professional couple therapy',
            'personal-pricing-couple-item-2': 'Communication skills training',
            'personal-pricing-couple-item-3': 'Conflict resolution strategies',
            'personal-pricing-couple-item-4': 'Relationship growth tools',
            'personal-pricing-couple-item-5': 'Ongoing relationship support',
            'personal-methods-title': 'Methods and Tools',
            'personal-methods-subtitle': 'Practical techniques for transformation and growth',
            'personal-method-1-title': 'Thought Protocols',
            'personal-method-1-desc': 'Reflect on and restructure negative thought patterns that limit your potential and cause unnecessary stress.',
            'personal-method-2-title': 'Exposure Exercises',
            'personal-method-2-desc': 'Gradually confront stressful situations in a safe environment to build self-confidence and reduce fears.',
            'personal-method-3-title': 'Behavioral Exercises',
            'personal-method-3-desc': 'Practice new behaviors that align with your goals and create positive changes in your life.',
            'personal-method-4-title': 'Mindfulness & Relaxation',
            'personal-method-4-desc': 'Develop inner peace and self-awareness through proven techniques for stress reduction and mental clarity.',
            'personal-method-5-title': 'Resource Work',
            'personal-method-5-desc': 'Strengthen your personal resilience by identifying and building upon your existing strengths and abilities.',
            'personal-method-6-title': 'Holistic Integration',
            'personal-method-6-desc': 'Combine classic behavioral therapy with modern, holistic elements for comprehensive personal transformation.',
            'personal-couples-title': 'Couples Therapy & Communication',
            'personal-couples-subtitle': 'Find new ways together through understanding and growth',
            'personal-couples-subsection-title': 'Building Stronger Relationships',
            'personal-couples-desc-1': 'I accompany couples with tools from emotion-focused therapy, non-violent communication and systemic methods. For more closeness, understanding and real change - instead of recurring conflicts.',
            'personal-couples-desc-2': 'Couples therapy helps you free yourself from negative patterns and develop healthier ways of interacting. It\'s about creating a foundation of trust, respect and mutual understanding.',
            'personal-couples-learn-title': 'What you will learn',
            'personal-couples-learn-1': 'Effective communication techniques',
            'personal-couples-learn-2': 'Conflict resolution strategies',
            'personal-couples-learn-3': 'Building emotional intimacy',
            'personal-couples-learn-4': 'Trust and vulnerability',
            'personal-couples-martial-title': 'The Martial Arts Approach to Relationships',
            'personal-couples-martial-desc-1': 'Just as martial arts teaches balance, respect and discipline, healthy relationships require the same principles. We work together to find the balance between individual needs and partnership goals.',
            'personal-couples-martial-desc-2': 'Through structured exercises and guided conversations, you develop the skills to face challenges together and create a relationship that supports the growth and happiness of both partners.',
            
            // Business Consulting Page
            'business-hero-title': 'EMDR Trauma Therapy & Business Coaching',
            'business-hero-subtitle': 'Process what blocks. Create space for healing and growth.',
            'business-emdr-title': 'Understanding EMDR Therapy',
            'business-emdr-subtitle': 'How this revolutionary therapy works and why it\'s so effective',
            'business-emdr-science-title': 'The Science Behind EMDR',
            'business-emdr-science-desc-1': 'EMDR is based on the so-called "adaptive information processing model" (AIP model). This assumes that our brain is fundamentally capable of processing stressful experiences on its own - but in extreme stress or trauma experiences, this natural process can be blocked.',
            'business-emdr-science-desc-2': 'This is exactly where EMDR comes in: It helps to resolve such blockages so that traumatic memories can be processed and emotionally relieved. Typically, the therapist guides the client through targeted eye movements or alternating stimuli while simultaneously calling up certain stressful memories.',
            'business-emdr-process-title': 'The EMDR Process',
            'business-emdr-process-desc': 'This process takes place in several structured phases, including: anamnesis and therapy planning, stabilization and preparation, targeted focus on stressful memories, desensitization and processing, strengthening positive beliefs, body awareness & integration, and completion and follow-up.',
            'business-emdr-treatment-title': 'Conditions Treated with EMDR',
            'business-emdr-treatment-desc': 'Originally developed for PTSD, EMDR is now also successfully used for:',
            'business-emdr-treatment-1': 'Anxiety disorders & panic attacks',
            'business-emdr-treatment-2': 'Depression & self-esteem issues',
            'business-emdr-treatment-3': 'Addiction issues',
            'business-emdr-treatment-4': 'Chronic pain',
            'business-evidence-title': 'Scientific Evidence & Recognition',
            'business-evidence-subtitle': 'EMDR is supported worldwide by extensive research and official recognition',
            'business-study-1-title': 'Meta-analysis by Rasines-Laudes & Serrano-Pintado (2023)',
            'business-study-1-desc': 'This systematic review analyzed 18 randomized controlled studies with a total of 1,213 participants. The results show that EMDR causes significant improvements in PTSD symptoms, anxiety and depression.',
            'business-study-2-title': 'Expert opinion of the Scientific Advisory Board for Psychotherapy (WBP, 2014)',
            'business-study-2-desc': 'The WBP recognized EMDR as a scientifically based psychotherapy method for adults with PTSD.',
            'business-study-3-title': 'EMDR Institute - Overview of randomized studies',
            'business-study-3-desc': 'More than 20 randomized studies prove the effectiveness of EMDR in the treatment of trauma.',
            'business-study-4-title': 'Cochrane Review by Bisson et al. (2007)',
            'business-study-4-desc': 'This systematic review compared various psychological treatments for chronic PTSD and found that EMDR is an effective therapy option.',
            'business-recommendations-title': 'Official Recommendations',
            'business-recommendations-subtitle': 'EMDR is recognized and recommended by leading health organizations worldwide',
            'business-recommendation-1-title': 'World Health Organization (WHO, 2013)',
            'business-recommendation-1-desc': 'The WHO recommends EMDR as an evidence-based treatment for PTSD in adults.',
            'business-recommendation-2-title': 'American Psychiatric Association (APA, 2004)',
            'business-recommendation-2-desc': 'The APA recognizes EMDR as an effective treatment method for acute stress disorders and PTSD.',
            'business-recommendation-3-title': 'Joint Federal Committee (G-BA, 2014)',
            'business-recommendation-3-desc': 'In Germany, EMDR was recognized in 2014 as a psychotherapy method for statutorily insured persons with PTSD.',
            'business-coaching-title': 'Business Coaching & Workplace Health Promotion',
            'business-coaching-subtitle': 'Tailored solutions for companies and organizations',
            'business-services-title': 'Services Offered',
            'business-services-subtitle': 'Comprehensive solutions for organizational development and mental health',
            'business-process-title': 'How We Work Together',
            'business-process-subtitle': 'A structured approach to organizational development',
            'business-metrics-title': 'Measurable Results',
            'business-metrics-subtitle': 'Track your progress and see the impact of our collaboration',
            'business-pricing-emdr-title': 'EMDR Therapy Investment',
            'business-pricing-emdr-desc': 'per 60-minute session',
            
            // Personal Development Page
            'personal-hero-title': 'Personal Development & Behavioral Therapy',
            'personal-hero-subtitle': 'Recognize old patterns. Take new paths to growth and transformation.',
            'personal-behavioral-title': 'Behavioral Therapeutic Approach',
            'personal-behavioral-subtitle': 'Evidence-based methods for sustainable change and personal growth',
            'personal-behavioral-what-title': 'What is Behavioral Therapy?',
            'personal-behavioral-what-desc-1': 'Behavioral therapy is one of the best-researched forms of therapy and offers clear, everyday tools to address psychological stress. It focuses on changing thought, feeling and action patterns that block or burden you in life.',
            'personal-behavioral-what-desc-2': 'Together we look at: What automatic thoughts and reactions have crept into your life, what inner beliefs influence your self-image and relationships, and how you can develop healthier, strengthening patterns step by step.',
            'personal-martial-connection-title': 'The Martial Arts Connection',
            'personal-martial-connection-desc': 'Just as martial arts requires discipline, practice and gradual improvement, behavioral therapy helps you develop new patterns through consistent practice and mindful awareness of your thoughts and behaviors.',
            'personal-behavioral-treatment-title': 'Conditions Treated',
            'personal-behavioral-treatment-desc': 'Behavioral therapy is particularly helpful for:',
            'personal-treatment-1': 'Anxiety disorders & inner restlessness',
            'personal-treatment-2': 'Depression & exhaustion',
            'personal-treatment-3': 'Self-esteem issues & perfectionism',
            'personal-treatment-4': 'Trauma consequences & stress-related complaints',
            'personal-programs-title': 'Personal Development Programs',
            'personal-programs-subtitle': 'Transform your mindset and achieve your goals with structured programs',
            'personal-program-1-title': 'Mindset Mastery',
            'personal-program-1-desc': 'Develop a growth mindset that embraces challenges, learns from mistakes and continuously improves. Transform limiting beliefs into empowering perspectives.',
            'personal-program-2-title': 'Goal Achievement',
            'personal-program-2-desc': 'Learn to set meaningful goals, create actionable plans and develop the discipline and resilience needed to achieve them consistently.',
            'personal-program-3-title': 'Emotional Intelligence',
            'personal-program-3-desc': 'Improve your ability to understand and manage emotions, build stronger relationships and face life challenges with greater wisdom.',
            'personal-program-4-title': 'Mindfulness & Wellness',
            'personal-program-4-desc': 'Develop practices for stress reduction, mental clarity and general well-being that support your personal and professional growth.',
            'personal-program-5-title': 'Resilience Building',
            'personal-program-5-desc': 'Strengthen your ability to recover from setbacks, adapt to change and maintain focus on your goals despite challenges.',
            'personal-program-6-title': 'Leadership Development',
            'personal-program-6-desc': 'Develop the skills and mindset needed to lead effectively, whether in your career, relationships or personal life.',
            'personal-cta-title': 'Ready to transform your life?',
            'personal-cta-desc': 'Take the first step to personal growth and transformation. Contact me to schedule your therapy session or personal development consultation.',
            
            // Pricing Section
            'pricing-title': 'Costs',
            'pricing-subtitle': 'Transparent pricing for professional psychological health services',
            'pricing-list-title': 'Services & Prices',
            'pricing-consultation': 'Initial consultation/Anamnesis',
            'pricing-psychotherapy': 'Psychotherapy',
            'pricing-psychotherapy-desc': '125.99€/session 60 min.',
            'pricing-emdr': 'EMDR Trauma Therapy',
            'pricing-emdr-desc': '125.99€/session 60 min.',
            'pricing-birkman': 'Birkman Advance Personality Test',
            'pricing-couples': 'Couple Therapy/Communication Coaching for Couples',
            'pricing-couples-desc': '169.99€/session 60 min.',
            'pricing-note': 'All services are for self-payers or people whose private health insurance covers the costs. For companies and institutions, prices are available on request.',
            'pricing-note-strong': 'Note:',
            
            // Contact Section
            'contact-info-title': 'Get in Touch',
            'contact-phone-label': 'Phone',
            'contact-email-label': 'E-Mail',
            'contact-location-label': 'Location',
            'contact-location-desc': 'Online sessions available worldwide. In-person sessions in Germany.',
            'contact-availability-label': 'Availability',
            'contact-availability-desc': 'Flexible appointment scheduling. Initial consultations mostly in person, therapy sessions online or in person.',
            'contact-form-title': 'Send a Message',
            'form-firstname': 'First Name',
            'form-lastname': 'Last Name',
            'form-email': 'Email Address',
            'form-phone': 'Phone Number',
            'form-message': 'Your Message',
            'send-message': 'SEND MESSAGE',
            
            // About Section - Qualifications
            'qualification-1': 'Master of Science in Social Psychology',
            'qualification-2': 'Heilpraktikerin für Psychotherapie',
            'qualification-3': 'EMDR-Therapeutin (für traumaorientierte Psychotherapie)',
            'qualification-4': 'Zertifizierter Birkman Coach',
            'qualification-5': 'Psychologische Birthchart Readerin (tiefenpsychologisch & spirituell orientiert)',
            
            // About Section - Martial Arts
            'about-martial-arts': 'In addition to my therapeutic work, another area has played a central role in my life for over two decades: Kuk Sool Won, a traditional Korean martial art that I have been practicing since 2001. I hold the 3rd Dan (black belt). Kuk Sool Won combines aspects of self-defense, meditation, movement theory, and inner discipline. It\'s not just about physical strength, but about the balance between mind and body, about focus, resilience, and mindfulness - values that have also deeply shaped my therapeutic approach.',
            'about-practice-name': 'This connection was the inspiration for the name of my practice: Martial Minds stands for the synthesis of inner strength, clarity, and psychological agility - for the ability to bravely confront oneself and consciously grow.',
            'about-approach': 'My approach is characterized by mindfulness, clarity, empathy and the deep conviction that change is possible - if we are ready to look, feel and grow. I look forward to accompanying you on your journey.',
            
            // Martial Arts Philosophy
            'martial-arts-philosophy-title': 'Martial Arts Philosophy',
            'martial-arts-philosophy-desc': 'The connection between martial arts and psychotherapy was the inspiration for the name of my practice: Martial Minds stands for the synthesis of inner strength, clarity, and psychological agility - for the ability to bravely confront oneself and consciously grow.',
            
            // Services Dropdown Menu
            'dropdown-birthchart': 'Psychological Birthchart Reading',
            'dropdown-emdr': 'EMDR Trauma Therapy',
            'dropdown-personal': 'Personal Development',
            'dropdown-overview': 'All Services Overview'
        },
        
        de: {
            // Navigation
            'home': 'Startseite',
            'about': 'Über mich',
            'services': 'Leistungen',
            'pricing': 'Preise',
            'contact': 'Kontakt',
            
            // Hero Section
            'hero-title': 'Martial Minds',
            'hero-subtitle': 'Praxis für Psychotherapie',
            'heilpraktiker-text': 'Nach dem Heilpraktikergesetz',
            'schwerpunkte-title': 'Meine Schwerpunkte',
            'schwerpunkte-text': 'Persönlichkeitsentwicklung, Trauma Heilung, Bewältigung von Angststörungen, Selbstwert & innere Stabilität, Paarbeziehungen & Kommunikation, Spirituelle Selbsterkenntnis, Präventionstraining, Betriebliche Gesundheitsförderung/Executive Coaching/Business Coaching',
            'hero-description': 'Martial Minds ist mehr als nur ein Praxismame - es ist ein Konzept. Das Wort "martial" kommt ursprünglich aus dem Bereich der Kampfkünste - und symbolisiert Stärke, Mut, Disziplin und Entschlossenheit, sich aktiv den Herausforderungen des Lebens zu stellen. "Minds" bezieht sich auf die Tiefe, Komplexität und Vielseitigkeit unseres Geistes. Zusammen verkörpert Martial Minds die kraftvolle Kombination aus innerer Stärke und psychologischem Wachstum - genau dort, wo Veränderung beginnt.',
            'learn-more': 'Mehr erfahren',
            'get-started': 'Jetzt starten',
            
            // About Section
            'about-title': 'Über mich',
            'about-subtitle': 'Ihr Weg zu mentaler Stärke und persönlichem Wachstum',
            'about-title-2': 'Heilpraktikerin für Psychotherapie',
            'about-description': 'Mein Weg in die psychotherapeutische Arbeit begann mit einem tiefen Interesse an menschlichen Erfahrungen, sozialen Dynamiken und emotionaler Heilung. Dieses Interesse führte mich zu einem Master of Science in Sozialpsychologie, wo ich lernte, wie unsere Gedanken, Gefühle und Handlungen entstehen und sich in der Interaktion mit unserer sozialen Umwelt verändern können.',
            'about-experience': 'Seit 2016 arbeite ich im psychosozialen Bereich, insbesondere in der ersten psychologischen Beratung für Menschen mit Migrationshintergrund. Diese Arbeit in einem gemeinnützigen Umfeld hat mich nicht nur geprägt, sondern mir auch gezeigt, wie wichtig ein ressourcenorientierter und kultursensibler Ansatz für die psychische Gesundheit ist.',
            'about-martial': 'Neben meiner therapeutischen Arbeit spielt ein weiterer Bereich seit über zwei Jahrzehnten eine zentrale Rolle in meinem Leben: Kuk Sool Won, eine traditionelle koreanische Kampfkunst, die ich seit 2001 praktiziere. Ich bin Trägerin des 3. Dan (Schwarzgurt). Kuk Sool Won verbindet Aspekte der Selbstverteidigung, Meditation, Bewegung und inneren Disziplin. Es geht nicht nur um körperliche Kraft, sondern auch um das Gleichgewicht zwischen Geist und Körper, Fokus, Widerstandsfähigkeit und Achtsamkeit - Werte, die auch meinen therapeutischen Ansatz tief geprägt haben.',
            'about-approach': 'Mein Ansatz ist geprägt von Achtsamkeit, Klarheit, Empathie und der tiefen Überzeugung, dass Veränderung möglich ist - wenn wir bereit sind zu schauen, zu fühlen und zu wachsen. Ich freue mich darauf, Sie auf Ihrem Weg zu begleiten.',
            'qualifications-title': 'Ich bin ausgebildete:',
            'martial-philosophy': 'Die Verbindung zwischen Kampfkunst und Psychotherapie war die Inspiration für den Namen meiner Praxis: Martial Minds steht für die Synthese aus innerer Stärke, Klarheit und mentaler Beweglichkeit - für die Fähigkeit, sich mutig mit sich selbst auseinanderzusetzen und bewusst zu wachsen.',
            
            // Services Section
            'services-title': 'Leistungen & Methoden',
            'services-subtitle': 'Professionelle Unterstützung für Ihre psychische Gesundheit und persönliche Entwicklung',
            'service-birkman': 'Birkman Persönlichkeitstest',
            'service-birkman-desc': 'Ein fundierter psychologischer Test, der Ihre Verhaltensmuster, Bedürfnisse, Stärken und Stressoren aufdeckt. Ideal für berufliche Neuorientierung, zur Stärkung der Selbsterkenntnis oder als Grundlage für Coaching und Therapie.',
            'service-emdr': 'EMDR - Traumatherapie',
            'service-emdr-desc': 'Eye Movement Desensitization and Reprocessing ist eine wissenschaftlich gut erforschte Methode zur Verarbeitung belastender oder traumatischer Erinnerungen. Bilaterale Stimulation hilft dem Gehirn, innere Blockaden zu lösen.',
            'service-behavioral': 'Verhaltenstherapie',
            'service-behavioral-desc': 'Ein strukturierter Ansatz zur Veränderung von Gedanken, Gefühlen und Handlungen. Hilft bei der Überwindung von Angststörungen, Depressionen, innerer Leere, Erschöpfung, negativem Selbstbild oder lähmenden Gewohnheiten.',
            'service-couples': 'Paartherapie',
            'service-couples-desc': 'Gemeinsam neue Wege finden. Ich unterstütze Paare mit Werkzeugen aus der emotionsfokussierten Therapie, gewaltfreier Kommunikation und systemischen Methoden. Für mehr Nähe, Verständnis und echte Veränderung.',
            'service-birthchart': 'Psychologische Geburtshoroskop-Deutung',
            'service-birthchart-desc': 'Eine tiefenpsychologisch fundierte Interpretation Ihres Geburtshoroskops - mit Fokus auf innere Dynamiken, emotionale Entwicklung und unbewusste Muster. Kein Astrologie-Klischee, sondern ein faszinierendes Werkzeug für Selbsterkenntnis.',
            'service-business': 'Business Coaching',
            'service-business-desc': 'Maßgeschneiderte Angebote für Unternehmen einschließlich betrieblicher Gesundheitsförderung, Führungskräfte-Coaching, Teamentwicklung und Primärpräventionsprogramme zur Stärkung der psychischen Gesundheit und Widerstandsfähigkeit.',
            
            // Target Groups & Approach
            'target-groups-title': 'Zielgruppen und Kosten',
            'target-groups-desc': 'Ich behandle Erwachsene und Jugendliche ab 16 Jahren, die bewusst an ihrer persönlichen Entwicklung und psychischen Gesundheit arbeiten möchten. Ich unterstütze auch Unternehmen - insbesondere Führungskräfte und Teams - im Rahmen von Coaching, Prävention und persönlicher Entwicklung, um mentale Stärke, Selbstreflexion und nachhaltige Führungsfähigkeiten zu fördern.',
            'advantages-title': 'Vorteile für Sie als Selbstzahler oder privat Versicherte:',
            'advantage-1': 'Flexible Terminvergabe nach Ihren Bedürfnissen',
            'advantage-2': 'Intensive, individuelle Betreuung ohne lange Wartezeiten',
            'advantage-3': 'Zugang zu spezialisierten, modernen Methoden wie EMDR, Birkman-Test oder psychologische Geburtshoroskop-Deutung',
            'advantage-4': 'Persönliche und vertrauliche Atmosphäre mit hohen Qualitätsstandards',
            'advantage-5': 'Kombination aus bewährten psychotherapeutischen Methoden und modernen, wissenschaftlich fundierten Methoden',
            'advantage-6': 'Keine Antrags- oder Genehmigungsverfahren erforderlich: Die Behandlung kann sofort beginnen',
            'advantage-7': 'Absolute Diskretion: Keine Diagnosen oder Behandlungsdaten werden an Dritte weitergegeben',
            'therapy-approach-title': 'Therapie & Unterstützung - Online und vor Ort',
            'therapy-approach-desc': 'Alle von meiner Praxis angebotenen Leistungen finden bevorzugt online (aus der Ferne) statt - sicher, flexibel und ortsunabhängig. Erste Beratungen finden in der Regel persönlich statt, um eine Vertrauensbasis zu schaffen. Wenn Sie eine Therapie vor Ort wünschen, ist dies jederzeit möglich.',
            'methods-title': 'Methoden und Werkzeuge, die ich verwende:',
            'method-1': 'Gedankenprotokolle zur Reflexion und Umstrukturierung negativer Gedankenmuster',
            'method-2': 'Konfrontationsübungen zur schrittweisen Auseinandersetzung mit belastenden Situationen',
            'method-3': 'Verhaltensübungen, die neue Handlungsweisen trainieren',
            'method-4': 'Achtsamkeits- und Entspannungstechniken für mehr inneren Frieden und Selbstbewusstsein',
            'method-5': 'Ressourcenarbeit zur Stärkung Ihrer persönlichen Widerstandsfähigkeit',
            
            // Pricing Section
            'pricing-title': 'Preise',
            'pricing-subtitle': 'Transparente Preisgestaltung für professionelle psychische Gesundheitsleistungen',
            'pricing-list-title': 'Leistungen & Preise',
            'pricing-psychotherapy': 'Psychotherapie (60 Min)',
            'pricing-psychotherapy-desc': 'Einzeltherapie, Verhaltenstherapie',
            'pricing-emdr': 'EMDR Traumatherapie (60 Min)',
            'pricing-emdr-desc': 'Traumaverarbeitung, bilaterale Stimulation',
            'pricing-couples': 'Paartherapie (60 Min)',
            'pricing-couples-desc': 'Beziehungsberatung, Kommunikationstraining',
            'pricing-birthchart': 'Psychologische Geburtshoroskop-Deutung',
            'pricing-birthchart-desc': '60 Min Sitzung, keine schriftliche Zusammenfassung',
            'pricing-birkman': 'Birkman Advance Persönlichkeitstest',
            'pricing-birkman-desc': 'Umfassende Persönlichkeitsanalyse',
            'pricing-consultation': 'Erstberatung',
            'pricing-consultation-desc': 'Erstgespräch und Therapieplanung',
            'pricing-business': 'Business Coaching',
            'pricing-business-desc': 'Führungskräfte-Coaching, Teamentwicklung',
            'pricing-business-price': 'Auf Anfrage',
            'pricing-note': 'Hinweis: Alle Leistungen sind für Selbstzahler oder Menschen, deren private Krankenversicherung die Kosten übernimmt. Für Unternehmen und Institutionen sind Preise auf Anfrage erhältlich.',
            'pricing-birthchart': 'Psychologisches Birthchartreading',
            'pricing-prevention': 'Primärprävention in Unternehmen / Institutionen',
            'pricing-business': 'Betriebliche Gesundheitsförderung/Executive Coaching/ Business Coaching',
            'pricing-on-request': 'Preise auf Anfrage',
            'pricing-on-request-2': 'Preise auf Anfrage',
            
            // Contact Section
            'contact-info-title': 'Kontakt aufnehmen',
            'contact-phone-label': 'Telefon',
            'contact-email-label': 'E-Mail',
            'contact-location-label': 'Standort',
            'contact-location-desc': 'Online-Sitzungen weltweit verfügbar. Präsenz-Sitzungen in Deutschland.',
            'contact-availability-label': 'Verfügbarkeit',
            'contact-availability-desc': 'Flexible Terminvergabe. Erstgespräche meist persönlich, Therapiesitzungen online oder persönlich.',
            'contact-form-title': 'Nachricht senden',
            'form-firstname': 'Vorname',
            'form-lastname': 'Nachname',
            'form-email': 'E-Mail-Adresse',
            'form-phone': 'Telefonnummer',
            'form-message': 'Ihre Nachricht',
            'send-message': 'Nachricht senden',
            
            // About Section - Qualifications
            'qualification-1': 'Master of Science in Social Psychology',
            'qualification-2': 'Heilpraktikerin für Psychotherapie',
            'qualification-3': 'EMDR-Therapeutin (für traumaorientierte Psychotherapie)',
            'qualification-4': 'Zertifizierter Birkman Coach',
            'qualification-5': 'Psychologische Birthchart Readerin (tiefenpsychologisch & spirituell orientiert)',
            
            // About Section - Martial Arts
            'about-martial-arts': 'Neben meiner therapeutischen Arbeit nimmt ein weiterer Bereich seit über zwei Jahrzehnten eine zentrale Rolle in meinem Leben ein: Kuk Sool Won, eine traditionelle koreanische Kampfkunst, die ich seit 2001 praktiziere. Ich bin Trägerin des 3. Dan (Schwarzgurt). Kuk Sool Won vereint Aspekte der Selbstverteidigung, Meditation, Bewegungslehre und inneren Disziplin. Es geht nicht nur um körperliche Stärke, sondern um die Balance zwischen Geist und Körper, um Fokus, Resilienz und Achtsamkeit – Werte, die auch meine therapeutische Haltung tief geprägt haben.',
            'about-practice-name': 'Diese Verbindung war die Inspiration für den Namen meiner Praxis: Martial Minds steht für die Synthese aus innerer Kraft, Klarheit und psychischer Beweglichkeit – für die Fähigkeit, sich mutig mit sich selbst auseinanderzusetzen und bewusst zu wachsen.',
            'about-approach': 'Meine Haltung ist geprägt von Achtsamkeit, Klarheit, Empathie und der tiefen Überzeugung, dass Veränderung möglich ist – wenn wir bereit sind, hinzusehen, zu fühlen und zu wachsen. Ich freue mich darauf, Sie auf Ihrem Weg zu begleiten.',
            
            // Martial Arts Philosophy
            'martial-arts-philosophy-title': 'Kampfkunst-Philosophie',
            'martial-arts-philosophy-desc': 'Die Verbindung zwischen Kampfkunst und Psychotherapie war die Inspiration für den Namen meiner Praxis: Martial Minds steht für die Synthese aus innerer Kraft, Klarheit und psychischer Beweglichkeit – für die Fähigkeit, sich mutig mit sich selbst auseinanderzusetzen und bewusst zu wachsen.',
            
            // Services Dropdown Menu
            'dropdown-birthchart': 'Psychologisches Birthchart Reading',
            'dropdown-emdr': 'EMDR Traumatherapie',
            'dropdown-personal': 'Persönlichkeitsentwicklung',
            'dropdown-overview': 'Alle Angebote im Überblick',
            
            // Birth Chart Page
            'birthchart-hero-title': 'Psychologisches Birthchart Reading',
            'birthchart-hero-subtitle': 'Ihr persönliches Horoskop – neu gedacht durch die Brille der modernen Psychologie',
            'birthchart-benefits-title': 'Was ein Geburtshoroskop offenbart',
            'birthchart-benefits-subtitle': 'Entdecken Sie die transformativen Erkenntnisse, die in Ihrem astrologischen Bauplan warten',
            'birthchart-benefit-1-title': 'Selbstreflexion & inneres Wachstum',
            'birthchart-benefit-1-desc': 'Gewinnen Sie tiefe Einblicke in Ihre Persönlichkeitsstruktur, emotionale Muster und unbewusste Motivationen, die Ihr Verhalten und Ihre Entscheidungen prägen.',
            'birthchart-benefit-2-title': 'Stärken & Herausforderungen erkennen',
            'birthchart-benefit-2-desc': 'Identifizieren Sie Ihre natürlichen Talente, potenzielle Wachstumsbereiche und die einzigartigen Herausforderungen, die zu Chancen für die persönliche Entwicklung werden können.',
            'birthchart-benefit-3-title': 'Bewusstes & Unbewusstes verbinden',
            'birthchart-benefit-3-desc': 'Überbrücken Sie die Lücke zwischen Ihrem bewussten Geist und tieferen psychologischen Mustern, um größere Selbstwahrnehmung und Integration zu schaffen.',
            'birthchart-benefit-4-title': 'Persönlichkeitsentwicklung & Selbstakzeptanz',
            'birthchart-benefit-4-desc': 'Entwickeln Sie ein mitfühlendes Verständnis für sich selbst und erstellen Sie eine Roadmap für persönliches Wachstum, die mit Ihrer authentischen Natur übereinstimmt.',
            'birthchart-benefit-5-title': 'Entscheidungsfindung & Lebensplanung',
            'birthchart-benefit-5-desc': 'Nutzen Sie Ihre astrologischen Erkenntnisse, um ausgerichtete Entscheidungen zu treffen und einen Lebensweg zu schaffen, der Ihrem wahren Zweck und Potenzial entspricht.',
            'birthchart-benefit-6-title': 'Beziehungsmuster verstehen',
            'birthchart-benefit-6-desc': 'Entdecken Sie, wie Ihr Geburtshoroskop Ihre Beziehungen beeinflusst und lernen Sie, gesündere, erfüllendere Verbindungen zu anderen zu schaffen.',
            'birthchart-process-title': 'Der Reading-Prozess',
            'birthchart-process-subtitle': 'Ein strukturierter Ansatz zur Entschlüsselung Ihrer astrologischen Erkenntnisse',
            'birthchart-step-1-title': 'Erstgespräch',
            'birthchart-step-1-desc': 'Wir beginnen mit einem Gespräch über Ihre aktuelle Lebenssituation, Herausforderungen und was Sie sich vom Birthchart Reading erhoffen. Dies hilft mir, die Deutung auf Ihre spezifischen Bedürfnisse zuzuschneiden.',
            'birthchart-step-2-title': 'Horoskop-Berechnung & Analyse',
            'birthchart-step-2-desc': 'Ich berechne Ihr präzises Geburtshoroskop mit Ihrer exakten Geburtszeit, dem Geburtsdatum und dem Geburtsort. Dies schafft einen einzigartigen astrologischen Bauplan, der Ihre Persönlichkeitsstruktur und Lebensmuster offenbart.',
            'birthchart-step-3-title': 'Psychologische Deutung',
            'birthchart-step-3-desc': 'Mit tiefenpsychologischen Prinzipien deute ich Ihr Horoskop mit Fokus auf innere Dynamiken, emotionale Entwicklung und unbewusste Muster anstatt auf Vorhersagen oder Wahrsagerei.',
            'birthchart-step-4-title': 'Integration & Anwendung',
            'birthchart-step-4-desc': 'Wir besprechen, wie Sie diese Erkenntnisse in Ihrem täglichen Leben anwenden können und erstellen praktische Strategien für persönliches Wachstum und Selbstakzeptanz basierend auf Ihrem astrologischen Profil.',
            'birthchart-cta-title': 'Bereit zu beginnen?',
            'birthchart-cta-desc': 'Machen Sie den ersten Schritt zu tieferem Selbstverständnis und persönlichem Wachstum. Kontaktieren Sie mich, um Ihr psychologisches Geburtshoroskop-Reading zu vereinbaren.',
            'back-to-home': 'Zurück zur Startseite',
            'birthchart-different-title': 'Nicht Ihr typisches Horoskop',
            'birthchart-different-desc': 'Dies ist kein Astrologie-Klischee oder tägliches Horoskop-Reading. Stattdessen ist es ein ausgeklügeltes psychologisches Werkzeug, das kombiniert:',
            'birthchart-feature-1-title': 'Wissenschaftliche Grundlage:',
            'birthchart-feature-1-desc': 'Basiert auf psychologischer Forschung und tiefenpsychologischen Prinzipien',
            'birthchart-feature-2-title': 'Professionelle Expertise:',
            'birthchart-feature-2-desc': 'Durchgeführt von einer ausgebildeten Therapeutin und zertifizierten Coach',
            'birthchart-feature-3-title': 'Psychologischer Fokus:',
            'birthchart-feature-3-desc': 'Betonung auf Selbstverständnis und persönliche Entwicklung',
            'birthchart-feature-4-title': 'Ganzheitlicher Ansatz:',
            'birthchart-feature-4-desc': 'Integration von Geist, Körper und spirituellem Bewusstsein',
            'birthchart-spiritual-title': 'Spirituelle Komponente',
            'birthchart-spiritual-desc-1': 'Für alle, die eine spirituelle Komponente in ihrer Persönlichkeitsentwicklung suchen, ist das psychologische Birthchart Reading eine spannende Ergänzung zur klassischen Psychotherapie und Coaching.',
            'birthchart-spiritual-desc-2': 'Es bietet eine einzigartige Brücke zwischen wissenschaftlicher Psychologie und spiritueller Weisheit und bietet Erkenntnisse, die Ihre therapeutische Reise ergänzen und bereichern können.',
            'birthchart-philosophy-title': 'Die Martial Minds-Philosophie',
            'birthchart-philosophy-desc-1': 'Als ausgebildete Therapeutin und Coach nutze ich das psychologische Birthchart Reading, um Sie auf Ihrem Weg der Persönlichkeitsentwicklung zu begleiten - ganz im Sinne von Martial Minds: Die Balance von Geist und Körper, Stärke und Achtsamkeit.',
            'birthchart-philosophy-desc-2': 'Dieser Ansatz kombiniert die Disziplin und den Fokus der Kampfkunst mit der Tiefe und dem Einblick der psychologischen Astrologie und schafft einen einzigartigen Rahmen für persönliche Transformation und Wachstum.',
            'birthchart-pricing-title': 'Investition in Selbsterkenntnis',
            'birthchart-pricing-subtitle': 'pro Reading-Sitzung',
            'birthchart-pricing-item-1': 'Umfassende Geburtshoroskop-Analyse',
            'birthchart-pricing-item-2': '60-minütige intensive Sitzung',
            'birthchart-pricing-item-3': 'Keine schriftliche Zusammenfassung',
            'birthchart-pricing-item-4': 'Nachbetreuung per E-Mail',
            'birthchart-pricing-item-5': 'Integration mit Therapiezielen',
            'business-health-title': 'Betriebliche Gesundheitsförderung',
            'business-health-desc': 'Meine Angebote für Unternehmen sind maßgeschneidert und orientieren sich stets am konkreten Bedarf Ihrer Organisation. Ob es um die Förderung psychischer Gesundheit am Arbeitsplatz, um die individuelle Begleitung von Führungskräften oder um die Entwicklung von Teams geht – im Fokus steht immer eine nachhaltige, wirksame Veränderung.',
            'business-executive-title': 'Executive Coaching',
            'business-executive-desc': 'Einzelcoachings für Führungskräfte und Mitarbeitende, Workshops zur Stärkung von Resilienz, Selbstführung oder Teamkultur, und Beratung zu gesunder Führung und psychologischer Sicherheit im Unternehmen.',
            'business-leadership-title': 'Leadership Development',
            'business-leadership-desc': 'Basierend auf dem Birkman Method Assessment, unterstütze ich Führungskräfte dabei, ihre Führungskompetenzen zu entwickeln und gesunde Arbeitsumgebungen zu schaffen.',
            'business-prevention-title': 'Primärprävention',
            'business-prevention-desc': 'Präventive Programme für Unternehmen und Institutionen, die darauf abzielen, psychische Erkrankungen frühzeitig zu verhindern durch Stressmanagement, Resilienztraining und Achtsamkeitsprogramme.',
            'business-team-title': 'Teamentwicklung',
            'business-team-desc': 'Workshops und Trainings zur Stärkung der Teamkultur, Verbesserung der Kommunikation und Aufbau psychologischer Sicherheit am Arbeitsplatz.',
            'birthchart-integration-title': 'Integration in meine Praxis',
            'birthchart-integration-subtitle': 'Wie das Birthchart Reading in den Martial Minds-Ansatz passt',
            'business-process-step-1-title': 'Bewertung & Analyse',
            'business-process-step-1-desc': 'Wir beginnen mit einer umfassenden Bewertung des aktuellen Zustands Ihrer Organisation, identifizieren Verbesserungsbereiche und Wachstumsmöglichkeiten.',
            'business-process-step-2-title': 'Maßgeschneiderte Lösungsentwicklung',
            'business-process-step-2-desc': 'Basierend auf der Bewertung entwickle ich ein maßgeschneidertes Programm, das Ihre spezifischen Bedürfnisse und Organisationskultur berücksichtigt.',
            'business-process-step-3-title': 'Umsetzung & Unterstützung',
            'business-process-step-3-desc': 'Wir setzen das Programm gemeinsam um, mit kontinuierlicher Unterstützung und Begleitung, um erfolgreiche Ergebnisse zu gewährleisten.',
            'business-process-step-4-title': 'Bewertung & kontinuierliche Verbesserung',
            'business-process-step-4-desc': 'Regelmäßige Bewertung des Fortschritts und kontinuierliche Verfeinerung der Strategien, um Wirkung und Nachhaltigkeit zu maximieren.',
            'business-metric-1': 'Verbesserung der Teamkommunikation',
            'business-metric-2': 'Reduzierung von Arbeitsplatzstress',
            'business-metric-3': 'Steigerung der Mitarbeiterzufriedenheit',
            'business-metric-4': 'Verbesserung der Führungseffektivität',
            'business-pricing-item-1': 'Professionelle EMDR-Behandlung',
            'business-pricing-item-2': 'Strukturierter Therapieprozess',
            'business-pricing-item-3': 'Evidenzbasierter Ansatz',
            'business-pricing-item-4': 'Kontinuierliche Unterstützung',
            'business-pricing-item-5': 'Fortschrittsverfolgung',
            'business-pricing-business-title': 'Business Coaching & Prävention',
            'business-pricing-business-desc': 'Für Unternehmen und Institutionen sind Preise auf Anfrage erhältlich. Alle Programme sind auf Ihre spezifischen Bedürfnisse und Organisationsstruktur zugeschnitten.',
            'consultation-button': 'Beratung buchen',
            'personal-journey-title': 'Ihre Wachstumsreise',
            'personal-journey-subtitle': 'Ein strukturierter Weg zu persönlicher Transformation und Erfolg',
            'personal-journey-step-1-title': 'Bewertung & Bewusstsein',
            'personal-journey-step-1-desc': 'Wir beginnen damit, Ihre aktuelle Situation zu verstehen, Wachstumsbereiche zu identifizieren und ein Bewusstsein für Muster zu schaffen, die Sie möglicherweise zurückhalten.',
            'personal-journey-step-2-title': 'Zielsetzung & Planung',
            'personal-journey-step-2-desc': 'Gemeinsam etablieren wir klare, bedeutungsvolle Ziele und erstellen einen strukturierten Plan zu ihrer Umsetzung, indem wir große Ziele in überschaubare Schritte aufteilen.',
            'personal-journey-step-3-title': 'Fähigkeitsentwicklung & Übung',
            'personal-journey-step-3-desc': 'Sie lernen praktische Fähigkeiten und Techniken und üben sie dann konsequent, um neue Gewohnheiten und Muster aufzubauen, die Ihr Wachstum unterstützen.',
            'personal-journey-step-4-title': 'Integration & Meisterschaft',
            'personal-journey-step-4-desc': 'Während Sie neue Fähigkeiten in Ihr tägliches Leben integrieren, entwickeln Sie Meisterschaft und Selbstvertrauen und schaffen dauerhafte positive Veränderungen.',
            'personal-stories-title': 'Transformationsgeschichten',
            'personal-stories-subtitle': 'Echte Menschen, echte Veränderung, echte Ergebnisse',
            'personal-story-1-quote': '"Durch Verhaltenstherapie lernte ich, meine negativen Denkmuster zu erkennen und sie durch befähigende Überzeugungen zu ersetzen. Ich gehe jetzt mit Selbstvertrauen statt mit Angst an Herausforderungen heran."',
            'personal-story-1-author': '- Sarah M., Angstbewältigung',
            'personal-story-2-quote': '"Paartherapie half uns, uns von destruktiven Kommunikationsmustern zu befreien. Wir haben jetzt die Tools, um Konflikte konstruktiv zu lösen und gemeinsam zu wachsen."',
            'personal-story-2-author': '- Michael & Lisa, Beziehungswachstum',
            'personal-story-3-quote': '"Das Persönlichkeitsentwicklungsprogramm gab mir die Denkweise und Fähigkeiten, um Ziele zu erreichen, die ich nie für möglich gehalten hätte. Ich lebe jetzt das Leben, von dem ich immer geträumt habe."',
            'personal-story-3-author': '- David K., Lebensverwandlung',
            'personal-pricing-individual-title': 'Einzeltherapie-Investition',
            'personal-pricing-individual-subtitle': 'pro 60-minütige Sitzung',
            'personal-pricing-individual-item-1': 'Professionelle Verhaltenstherapie',
            'personal-pricing-individual-item-2': 'Personalisierter Behandlungsplan',
            'personal-pricing-individual-item-3': 'Evidenzbasierte Ansätze',
            'personal-pricing-individual-item-4': 'Laufende Unterstützung',
            'personal-pricing-individual-item-5': 'Fortschrittsverfolgung',
            'personal-pricing-couple-title': 'Paartherapie-Investition',
            'personal-pricing-couple-subtitle': 'pro 60-minütige Sitzung',
            'personal-pricing-couple-item-1': 'Professionelle Paartherapie',
            'personal-pricing-couple-item-2': 'Kommunikationsfähigkeiten-Training',
            'personal-pricing-couple-item-3': 'Konfliktlösungsstrategien',
            'personal-pricing-couple-item-4': 'Beziehungswachstum-Tools',
            'personal-pricing-couple-item-5': 'Laufende Beziehungsunterstützung',
            'personal-methods-title': 'Methoden und Tools',
            'personal-methods-subtitle': 'Praktische Techniken für Transformation und Wachstum',
            'personal-method-1-title': 'Gedankenprotokolle',
            'personal-method-1-desc': 'Reflektieren und umstrukturieren Sie negative Denkmuster, die Ihr Potenzial begrenzen und unnötigen Stress verursachen.',
            'personal-method-2-title': 'Expositionsübungen',
            'personal-method-2-desc': 'Konfrontieren Sie sich schrittweise mit belastenden Situationen in einer sicheren Umgebung, um Selbstvertrauen aufzubauen und Ängste zu reduzieren.',
            'personal-method-3-title': 'Verhaltensübungen',
            'personal-method-3-desc': 'Trainieren Sie neue Handlungsweisen, die mit Ihren Zielen übereinstimmen und positive Veränderungen in Ihrem Leben schaffen.',
            'personal-method-4-title': 'Achtsamkeit & Entspannung',
            'personal-method-4-desc': 'Entwickeln Sie innere Ruhe und Selbstwahrnehmung durch bewährte Techniken zur Stressreduktion und mentalen Klarheit.',
            'personal-method-5-title': 'Ressourcenarbeit',
            'personal-method-5-desc': 'Stärken Sie Ihre persönliche Widerstandskraft, indem Sie Ihre bestehenden Stärken und Fähigkeiten identifizieren und darauf aufbauen.',
            'personal-method-6-title': 'Ganzheitliche Integration',
            'personal-method-6-desc': 'Kombinieren Sie klassische Verhaltenstherapie mit modernen, ganzheitlichen Elementen für umfassende persönliche Transformation.',
            'personal-couples-title': 'Paartherapie & Kommunikation',
            'personal-couples-subtitle': 'Gemeinsam neue Wege finden durch Verständnis und Wachstum',
            'personal-couples-subsection-title': 'Stärkere Beziehungen aufbauen',
            'personal-couples-desc-1': 'Ich begleite Paare mit Tools aus der emotionsfokussierten Therapie, der gewaltfreien Kommunikation und systemischen Methoden. Für mehr Nähe, Verständnis und echte Veränderung – statt wiederkehrender Konflikte.',
            'personal-couples-desc-2': 'Paartherapie hilft Ihnen, sich von negativen Mustern zu befreien und gesündere Wege des Miteinanders zu entwickeln. Es geht darum, eine Grundlage aus Vertrauen, Respekt und gegenseitigem Verständnis zu schaffen.',
            'personal-couples-learn-title': 'Was Sie lernen werden',
            'personal-couples-learn-1': 'Effektive Kommunikationstechniken',
            'personal-couples-learn-2': 'Konfliktlösungsstrategien',
            'personal-couples-learn-3': 'Aufbau emotionaler Intimität',
            'personal-couples-learn-4': 'Vertrauen und Verletzlichkeit',
            'personal-couples-martial-title': 'Der Kampfkunst-Ansatz für Beziehungen',
            'personal-couples-martial-desc-1': 'Genau wie Kampfkunst Balance, Respekt und Disziplin lehrt, erfordern gesunde Beziehungen dieselben Prinzipien. Wir arbeiten zusammen daran, die Balance zwischen individuellen Bedürfnissen und Partnerschaftszielen zu finden.',
            'personal-couples-martial-desc-2': 'Durch strukturierte Übungen und geführte Gespräche entwickeln Sie die Fähigkeiten, Herausforderungen gemeinsam zu bewältigen und eine Beziehung zu schaffen, die das Wachstum und Glück beider Partner unterstützt.',
            
            // Business Consulting Page
            'business-hero-title': 'EMDR Traumatherapie & Business Coaching',
            'business-hero-subtitle': 'Verarbeiten, was blockiert. Raum schaffen für Heilung und Wachstum.',
            'business-emdr-title': 'EMDR-Therapie verstehen',
            'business-emdr-subtitle': 'Wie diese revolutionäre Therapie funktioniert und warum sie so wirksam ist',
            'business-emdr-science-title': 'Die Wissenschaft hinter EMDR',
            'business-emdr-science-desc-1': 'EMDR basiert auf dem sogenannten „adaptiven Informationsverarbeitungsmodell" (AIP-Modell). Dieses geht davon aus, dass unser Gehirn grundsätzlich in der Lage ist, belastende Erlebnisse selbst zu verarbeiten – doch bei extremen Stress- oder Trauma Erfahrungen kann dieser natürliche Prozess blockiert werden.',
            'business-emdr-science-desc-2': 'Genau hier setzt EMDR an: Es hilft, solche Blockaden zu lösen, sodass traumatische Erinnerungen verarbeitet und emotional entlastet werden können. Typischerweise begleitet der Therapeut den Klienten durch gezielte Augenbewegungen oder abwechselnde Reize, während gleichzeitig bestimmte belastende Erinnerungen aufgerufen werden.',
            'business-emdr-process-title': 'Der EMDR-Prozess',
            'business-emdr-process-desc': 'Dieser Prozess findet in mehreren strukturierten Phasen statt, darunter: Anamnese und Therapieplanung, Stabilisierung und Vorbereitung, gezielte Fokussierung auf belastende Erinnerungen, Desensibilisierung und Verarbeitung, Stärkung positiver Überzeugungen, Körperwahrnehmung & Integration, und Abschluss und Nachsorge.',
            'business-emdr-treatment-title': 'Mit EMDR behandelte Erkrankungen',
            'business-emdr-treatment-desc': 'Ursprünglich für PTBS entwickelt, wird EMDR heute auch erfolgreich eingesetzt bei:',
            'business-emdr-treatment-1': 'Angststörungen & Panikattacken',
            'business-emdr-treatment-2': 'Depressionen & Selbstwertproblemen',
            'business-emdr-treatment-3': 'Suchtthemen',
            'business-emdr-treatment-4': 'Chronischen Schmerzen',
            'business-evidence-title': 'Wissenschaftliche Evidenz & Anerkennung',
            'business-evidence-subtitle': 'EMDR wird durch umfangreiche Forschung und offizielle Anerkennung weltweit unterstützt',
            'business-study-1-title': 'Meta-Analyse von Rasines-Laudes & Serrano-Pintado (2023)',
            'business-study-1-desc': 'Diese systematische Übersichtsarbeit analysierte 18 randomisierte kontrollierte Studien mit insgesamt 1.213 Teilnehmer:innen. Die Ergebnisse zeigen, dass EMDR signifikante Verbesserungen bei PTBS-Symptomen, Angst und Depression bewirkt.',
            'business-study-2-title': 'Gutachten des Wissenschaftlichen Beirats Psychotherapie (WBP, 2014)',
            'business-study-2-desc': 'Der WBP erkannte EMDR als wissenschaftlich fundierte Psychotherapiemethode für Erwachsene mit PTBS an.',
            'business-study-3-title': 'EMDR Institute - Übersicht über randomisierte Studien',
            'business-study-3-desc': 'Mehr als 20 randomisierte Studien belegen die Wirksamkeit von EMDR bei der Behandlung von Trauma.',
            'business-study-4-title': 'Cochrane-Review von Bisson et al. (2007)',
            'business-study-4-desc': 'Dieser systematische Review verglich verschiedene psychologische Behandlungen für chronische PTBS und fand heraus, dass EMDR eine effektive Therapieoption darstellt.',
            'business-recommendations-title': 'Offizielle Empfehlungen',
            'business-recommendations-subtitle': 'EMDR wird von führenden Gesundheitsorganisationen weltweit anerkannt und empfohlen',
            'business-recommendation-1-title': 'Weltgesundheitsorganisation (WHO, 2013)',
            'business-recommendation-1-desc': 'Die WHO empfiehlt EMDR als evidenzbasierte Behandlung für PTBS bei Erwachsenen.',
            'business-recommendation-2-title': 'American Psychiatric Association (APA, 2004)',
            'business-recommendation-2-desc': 'Die APA erkennt EMDR als effektive Behandlungsmethode für akute Stressstörungen und PTBS an.',
            'business-recommendation-3-title': 'Gemeinsamer Bundesausschuss (G-BA, 2014)',
            'business-recommendation-3-desc': 'In Deutschland wurde EMDR 2014 als Psychotherapiemethode für gesetzlich Versicherte mit PTBS anerkannt.',
            'business-coaching-title': 'Business Coaching & Betriebliche Gesundheitsförderung',
            'business-coaching-subtitle': 'Maßgeschneiderte Lösungen für Unternehmen und Organisationen',
            'business-services-title': 'Angebotene Services',
            'business-services-subtitle': 'Umfassende Lösungen für Organisationsentwicklung und mentale Gesundheit',
            'business-process-title': 'Wie wir zusammenarbeiten',
            'business-process-subtitle': 'Ein strukturierter Ansatz zur Organisationsentwicklung',
            'business-metrics-title': 'Messbare Ergebnisse',
            'business-metrics-subtitle': 'Verfolgen Sie Ihren Fortschritt und sehen Sie die Auswirkungen unserer Zusammenarbeit',
            'business-pricing-emdr-title': 'EMDR-Therapie-Investition',
            'business-pricing-emdr-desc': 'pro 60-minütige Sitzung',
            
            // Personal Development Page
            'personal-hero-title': 'Persönlichkeitsentwicklung & Verhaltenstherapie',
            'personal-hero-subtitle': 'Alte Muster erkennen. Neue Wege gehen zu Wachstum und Transformation.',
            'personal-behavioral-title': 'Verhaltenstherapeutischer Ansatz',
            'personal-behavioral-subtitle': 'Evidenzbasierte Methoden für nachhaltige Veränderung und persönliches Wachstum',
            'personal-behavioral-what-title': 'Was ist Verhaltenstherapie?',
            'personal-behavioral-what-desc-1': 'Verhaltenstherapie ist eine der am besten erforschten Therapieformen und bietet klare, alltagsnahe Werkzeuge, um psychische Belastungen gezielt anzugehen. Sie fokussiert sich auf die Veränderung von Denk-, Gefühls- und Handlungsmustern, die Sie im Leben blockieren oder belasten.',
            'personal-behavioral-what-desc-2': 'Gemeinsam schauen wir auf: Welche automatischen Gedanken und Reaktionen sich in Ihrem Leben eingeschlichen haben, welche inneren Glaubenssätze Ihr Selbstbild und Ihre Beziehungen beeinflussen, und wie Sie Schritt für Schritt gesündere, stärkende Muster entwickeln können.',
            'personal-martial-connection-title': 'Die Kampfkunst-Verbindung',
            'personal-martial-connection-desc': 'Genau wie Kampfkunst Disziplin, Übung und schrittweise Verbesserung erfordert, hilft Verhaltenstherapie Ihnen dabei, neue Muster durch konsequente Übung und achtsame Wahrnehmung Ihrer Gedanken und Verhaltensweisen zu entwickeln.',
            'personal-behavioral-treatment-title': 'Behandelte Erkrankungen',
            'personal-behavioral-treatment-desc': 'Verhaltenstherapie ist besonders hilfreich bei:',
            'personal-treatment-1': 'Angststörungen & innerer Unruhe',
            'personal-treatment-2': 'Depressionen & Erschöpfungszuständen',
            'personal-treatment-3': 'Selbstwertthemen & Perfektionismus',
            'personal-treatment-4': 'Traumafolgen & stressbedingten Beschwerden',
            'personal-programs-title': 'Persönlichkeitsentwicklungsprogramme',
            'personal-programs-subtitle': 'Verwandeln Sie Ihre Denkweise und erreichen Sie Ihre Ziele mit strukturierten Programmen',
            'personal-program-1-title': 'Mindset-Meisterschaft',
            'personal-program-1-desc': 'Entwickeln Sie eine Wachstumsmentalität, die Herausforderungen annimmt, aus Fehlern lernt und sich kontinuierlich verbessert. Verwandeln Sie einschränkende Glaubenssätze in befähigende Perspektiven.',
            'personal-program-2-title': 'Zielerreichung',
            'personal-program-2-desc': 'Lernen Sie, bedeutungsvolle Ziele zu setzen, umsetzbare Pläne zu erstellen und die Disziplin und Resilienz zu entwickeln, die nötig sind, um sie konsequent zu erreichen.',
            'personal-program-3-title': 'Emotionale Intelligenz',
            'personal-program-3-desc': 'Verbessern Sie Ihre Fähigkeit, Emotionen zu verstehen und zu managen, stärkere Beziehungen aufzubauen und Lebensherausforderungen mit größerer Weisheit zu bewältigen.',
            'personal-program-4-title': 'Achtsamkeit & Wellness',
            'personal-program-4-desc': 'Entwickeln Sie Praktiken zur Stressreduktion, mentalen Klarheit und allgemeinem Wohlbefinden, die Ihr persönliches und berufliches Wachstum unterstützen.',
            'personal-program-5-title': 'Resilienz-Aufbau',
            'personal-program-5-desc': 'Stärken Sie Ihre Fähigkeit, sich von Rückschlägen zu erholen, sich an Veränderungen anzupassen und trotz Herausforderungen den Fokus auf Ihre Ziele zu behalten.',
            'personal-program-6-title': 'Führungsentwicklung',
            'personal-program-6-desc': 'Entwickeln Sie die Fähigkeiten und Denkweise, die nötig sind, um effektiv zu führen, sei es in Ihrer Karriere, in Beziehungen oder im persönlichen Leben.',
            'personal-cta-title': 'Bereit, Ihr Leben zu verwandeln?',
            'personal-cta-desc': 'Machen Sie den ersten Schritt zu persönlichem Wachstum und Transformation. Kontaktieren Sie mich, um Ihre Therapiesitzung oder Persönlichkeitsentwicklungsberatung zu vereinbaren.',
            
            // References Section
            'references-title': 'Referenzen & Zertifizierungen',
            'references-subtitle': 'Professionelle Verbindungen und anerkannte Expertise',
            'reference-fresh-minds': 'Fresh Minds',
            'reference-fresh-minds-desc': 'Kundenprojekt - gemessen wurden Mitarbeiterzufriedenheit und Glücksniveau. Erfolgreich implementierte Programme zur Arbeitsplatzgesundheit und gemessene Verbesserungen der Mitarbeiterzufriedenheit.',
            'reference-birkman': 'Offizieller Birkman-Berater',
            'reference-birkman-desc': 'Zertifizierter Birkman-Coach mit offizieller Anerkennung, der wissenschaftlich fundierte Persönlichkeitsbewertungen und Coaching anbietet.',
            
            // Contact Section
            'contact-title': 'Kontakt',
            'contact-subtitle': 'Bereit für Ihren Weg? Nehmen Sie noch heute Kontakt auf.',
            'contact-info-title': 'Kontakt aufnehmen',
            'contact-form-title': 'Nachricht senden',
            'phone': 'Telefon',
            'email': 'E-Mail',
            'location': 'Standort',
            'location-desc': 'Online-Sitzungen weltweit verfügbar. Persönliche Sitzungen in Deutschland verfügbar.',
            'availability': 'Verfügbarkeit',
            'availability-desc': 'Flexible Terminplanung. Erste Beratungen in der Regel persönlich, Therapiesitzungen online oder persönlich.',
            'select-service': 'Leistung auswählen',
            'option-psychotherapy': 'Psychotherapie',
            'option-emdr': 'EMDR Traumatherapie',
            'option-birkman': 'Birkman Persönlichkeitstest',
            'option-behavioral': 'Verhaltenstherapie',
            'option-couples': 'Paartherapie',
            'option-birthchart': 'Psychologische Geburtshoroskop-Deutung',
            'option-business': 'Business Coaching',
            'option-other': 'Sonstiges',
            'send-message': 'Nachricht senden',
            
            // Footer
            'all-rights': 'Alle Rechte vorbehalten.'
        },
        
        bs: {
            // Navigation
            'home': 'Početna',
            'about': 'O meni',
            'services': 'Usluge',
            'pricing': 'Cjenovnik',
            'contact': 'Kontakt',
            
            // Hero Section
            'hero-title': 'Martial Minds',
            'hero-subtitle': 'Ordini za psihoterapiju (prema Heilpraktikergesetz)',
            'heilpraktiker-text': 'Prema Heilpraktikergesetz',
            'schwerpunkte-title': 'Moja područja fokusa',
            'schwerpunkte-text': 'Lični razvoj, isceljenje traume, suočavanje sa anksioznim poremećajima, samopoštovanje & unutrašnja stabilnost, veze parova & komunikacija, duhovna samosvest, trening prevencije, promocija zdravlja na radnom mestu/Executive Coaching/Business Coaching',
            'hero-description': 'Martial Minds je više od samo imena ordinacije - to je koncept. Riječ "martial" potiče iz područja borilačkih vještina - i simbolizira snagu, hrabrost, disciplinu i odlučnost da se aktivno suočimo sa životnim izazovima. "Minds" se odnosi na dubinu, složenost i svestranost našeg uma. Zajedno, Martial Minds utjelovljuje snažnu kombinaciju unutrašnje snage i psihološkog rasta - upravo tamo gdje počinje promjena.',
            'learn-more': 'Saznaj više',
            'get-started': 'Započni',
            
            // About Section
            'about-title': 'O meni',
            'about-subtitle': 'Vaš put do mentalne snage i ličnog rasta',
            'about-title-2': 'Nemedicinski praktičar za psihoterapiju',
            'about-description': 'Moj put u psihoterapeutski rad započeo je dubokim interesom za ljudsko iskustvo, socijalne dinamike i emocionalno ozdravljenje. Ovo interesovanje me je dovelo do Master of Science u socijalnoj psihologiji, gdje sam naučila kako nastaju naši misli, osjećaji i akcije i kako se mogu mijenjati u interakciji sa našom socijalnom okolinom.',
            'about-experience': 'Od 2016. godine radim u psihosocijalnom polju, posebno u prvobitnom psihološkom savjetovanju za ljude sa migracijskom istorijom. Ovaj rad u neprofitnom okruženju ne samo da me je oblikovao, već mi je i pokazao koliko je važan resursno-orijentisan i kulturološki osjetljiv pristup mentalnom zdravlju.',
            'about-martial': 'Pored mog terapeutskog rada, još jedno područje igra centralnu ulogu u mom životu više od dvije decenije: Kuk Sool Won, tradicionalna koreanska borilačka vještina koju praktikujem od 2001. godine. Ja sam nosilac 3. Dana (crni pojas). Kuk Sool Won kombinira aspekte samoobrane, meditacije, pokreta i unutrašnje discipline. Ne radi se samo o fizičkoj snazi, već i o ravnoteži između uma i tijela, fokusu, otpornosti i svjesnosti - vrijednostima koje su također duboko uticale na moj terapeutski pristup.',
            'about-approach': 'Moj pristup karakteriše svjesnost, jasnoća, empatija i duboko uvjerenje da je promjena moguća - ako smo spremni da gledamo, osjećamo i rastemo. Radujem se što ću vas pratiti na vašem putovanju.',
            'qualifications-title': 'Ja sam kvalifikovana:',
            'martial-philosophy': 'Veza između borilačkih vještina i psihoterapije bila je inspiracija za ime moje ordinacije: Martial Minds predstavlja sintezu unutrašnje snage, jasnoće i mentalne agilnosti - za sposobnost da se hrabro angažujemo sa sobom i svjesno rastemo.',
            
            // Services Section
            'services-title': 'Usluge & Metode',
            'services-subtitle': 'Profesionalna podrška za vaše mentalno zdravlje i lični razvoj',
            'service-birkman': 'Birkman test ličnosti',
            'service-birkman-desc': 'Fundiran psihološki test koji otkriva vaše obrasce ponašanja, potrebe, snage i stresore. Idealno za profesionalnu reorijentaciju, jačanje samosaznanja ili kao osnova za coaching i terapiju.',
            'service-emdr': 'EMDR - Traumatska terapija',
            'service-emdr-desc': 'Eye Movement Desensitization and Reprocessing je naučno dobro istražena metoda za obradu stresnih ili traumatskih sjećanja. Bilaterarna stimulacija pomaže mozgu da oslobodi unutrašnje blokade.',
            'service-behavioral': 'Bihejvioralna terapija',
            'service-behavioral-desc': 'Strukturiran pristup mijenjanju misli, osjećaja i akcija. Pomaže u prevladavanju anksioznih poremećaja, depresije, unutrašnje praznine, iscrpljenosti, negativnog samopouzdanja ili onesposobljavajućih navika.',
            'service-couples': 'Terapija parova',
            'service-couples-desc': 'Pronalaženje novih puteva zajedno. Podržavam parove alatima iz emocijom fokusirane terapije, nenasilne komunikacije i sistemskih metoda. Za više bliskosti, razumijevanja i stvarne promjene.',
            'service-birthchart': 'Psihološko čitanje natalne karte',
            'service-birthchart-desc': 'Dubinsko-psihološka interpretacija vaše natalne karte - sa fokusom na unutrašnje dinamike, emocionalni razvoj i nesvjesne obrasce. Nije astrološki kliše, već fascinantan alat za samosaznanje.',
            'service-business': 'Business Coaching',
            'service-business-desc': 'Prilagođene ponude za kompanije uključujući promociju zdravlja na radnom mjestu, executive coaching, razvoj timova i programe primarne prevencije za jačanje mentalnog zdravlja i otpornosti.',
            
            // Target Groups & Approach
            'target-groups-title': 'Ciljne grupe & Pristup',
            'target-groups-desc': 'Tretiram odrasle i mlade ljude od 16 godina koji žele svjesno raditi na svom ličnom razvoju i mentalnom zdravlju. Također podržavam kompanije - posebno menadžere i timove - kao dio coachinga, prevencije i ličnog razvoja za promociju mentalne snage, samorefleksije i održivih vještina vođenja.',
            'advantages-title': 'Prednosti za vas kao samoplatioca ili privatno osiguranog:',
            'advantage-1': 'Fleksibilna raspodjela termina prema vašim potrebama',
            'advantage-2': 'Intenzivna, individualna podrška bez dugih vremena čekanja',
            'advantage-3': 'Pristup specijaliziranim, modernim metodama kao što su EMDR, Birkman test ili psihološko čitanje natalne karte',
            'advantage-4': 'Lična i povjerljiva atmosfera sa visokim standardima kvaliteta',
            'advantage-5': 'Kombinacija dokazanih psihoterapeutskih metoda i modernih, naučno zasnovanih metoda',
            'advantage-6': 'Nisu potrebni postupci prijave ili odobrenja: Tretman može početi odmah',
            'advantage-7': 'Apsolutna diskrecija: nikakve dijagnoze ili podaci o tretmanu se ne prenose trećim stranama',
            'therapy-approach-title': 'Terapija & Podrška - Online i uživo',
            'therapy-approach-desc': 'Sve usluge koje nudi moja ordinacija preferiraju se online (na daljinu) - sigurno, fleksibilno i bez obzira na lokaciju. Prve konzultacije obično se održavaju uživo kako bi se stvorila osnova povjerenja. Ako želite terapiju uživo, to je također moguće u bilo koje vrijeme.',
            'methods-title': 'Metode i alati koje koristim:',
            'method-1': 'Protokoli misli za refleksiju i restrukturiranje negativnih obrazaca misli',
            'method-2': 'Vježbe izlaganja za postupno suočavanje sa stresnim situacijama',
            'method-3': 'Bihejvioralne vježbe koje treniraju nove načine djelovanja',
            'method-4': 'Tehnike svjesnosti i opuštanja za više unutrašnjeg mira i samosvjesnosti',
            'method-5': 'Rad sa resursima za jačanje vaše lične otpornosti',
            
            // Pricing Section
            'pricing-title': 'Cjenovnik',
            'pricing-subtitle': 'Transparentno određivanje cijena za profesionalne usluge mentalnog zdravlja',
            'pricing-list-title': 'Usluge & Cijene',
            'pricing-basic': 'Osnovne usluge',
            'pricing-specialized': 'Specijalizirane usluge',
            'pricing-premium': 'Premium usluge',
            'per-session': '/sesija',
            'per-service': '/usluga',
            'per-test': '/test',
            'pricing-psychotherapy': 'Psihoterapija (60 min)',
            'pricing-emdr': 'EMDR traumatska terapija (60 min)',
            'pricing-birthchart': 'Psihološko čitanje natalne karte',
            'pricing-couples': 'Terapija parova (60 min)',
            'pricing-consultation': 'Prva konzultacija (135,99€)',
            'pricing-birkman': 'Birkman Advance test ličnosti',
            'pricing-business': 'Business coaching (cijene na upit)',
            'pricing-prevention': 'Programi primarne prevencije',
            'most-popular': 'Najpopularnije',
            'pricing-note': 'Napomena: Sve usluge su za samoplatioce ili ljude čija privatna osiguranja pokrivaju troškove. Tretman je isključivo za samoplatioce ili ljude čija privatna osiguranja pokrivaju troškove. Za kompanije i institucije, cijene su dostupne na upit.',
            'pricing-birthchart': 'Psihološko čitanje natalne karte',
            'pricing-prevention': 'Primarna prevencija u kompanijama / institucijama',
            'pricing-business': 'Promocija zdravlja na radnom mestu/Executive Coaching/ Business Coaching',
            'pricing-on-request': 'Cijene na upit',
            'pricing-on-request-2': 'Cijene na upit',
            
            // Contact Section
            'contact-info-title': 'Kontaktirajte nas',
            'contact-phone-label': 'Telefon',
            'contact-email-label': 'E-Mail',
            'contact-location-label': 'Lokacija',
            'contact-location-desc': 'Online sesije dostupne širom svijeta. Sesije uživo u Njemačkoj.',
            'contact-availability-label': 'Dostupnost',
            'contact-availability-desc': 'Fleksibilno zakazivanje termina. Prve konzultacije obično uživo, terapijske sesije online ili uživo.',
            'contact-form-title': 'Pošaljite poruku',
            'form-firstname': 'Ime',
            'form-lastname': 'Prezime',
            'form-email': 'E-Mail adresa',
            'form-phone': 'Broj telefona',
            'form-message': 'Vaša poruka',
            'send-message': 'POŠALJI PORUKU',
            
            // About Section - Qualifications
            'qualification-1': 'Master of Science u socijalnoj psihologiji',
            'qualification-2': 'Heilpraktiker za psihoterapiju',
            'qualification-3': 'EMDR terapeut (za traumu orijentisanu psihoterapiju)',
            'qualification-4': 'Sertifikovani Birkman trener',
            'qualification-5': 'Psihološki čitač natalne karte (dubinsko-psihološki i duhovno orijentisan)',
            
            // About Section - Martial Arts
            'about-martial-arts': 'Pored mog terapeutskog rada, još jedna oblast igra centralnu ulogu u mom životu već preko dvije decenije: Kuk Sool Won, tradicionalna korejska borilačka veština koju vežbam od 2001. godine. Nosilac sam 3. Dan (crni pojas). Kuk Sool Won kombinuje aspekte samoobrane, meditacije, teorije kretanja i unutrašnje discipline. Ne radi se samo o fizičkoj snazi, već o balansu između uma i tela, o fokusu, otpornosti i svesnosti - vrednostima koje su takođe duboko oblikovale moj terapeutski pristup.',
            'about-practice-name': 'Ova veza je bila inspiracija za ime moje prakse: Martial Minds predstavlja sintezu unutrašnje snage, jasnoće i psihološke pokretljivosti - za sposobnost hrabrog suočavanja sa sobom i svesnog rasta.',
            'about-approach': 'Moj pristup je obeležen svesnošću, jasnoćom, empatijom i dubokim uverenjem da je promena moguća - ako smo spremni da gledamo, osećamo i rastemo. Radujem se što ću vas pratiti na vašem putu.',
            
            // Martial Arts Philosophy
            'martial-arts-philosophy-title': 'Filozofija borilačkih veština',
            'martial-arts-philosophy-desc': 'Veza između borilačkih veština i psihoterapije bila je inspiracija za ime moje prakse: Martial Minds predstavlja sintezu unutrašnje snage, jasnoće i psihološke pokretljivosti - za sposobnost hrabrog suočavanja sa sobom i svesnog rasta.',
            
            // Services Dropdown Menu
            'dropdown-birthchart': 'Psihološko čitanje natalne karte',
            'dropdown-emdr': 'EMDR traumatska terapija',
            'dropdown-personal': 'Lični razvoj',
            'dropdown-overview': 'Pregled svih usluga',
            
            // Birth Chart Page
            'birthchart-hero-title': 'Psihološko čitanje natalne karte',
            'birthchart-hero-subtitle': 'Vaš lični horoskop - ponovo razmišljen kroz prizmu moderne psihologije',
            'birthchart-benefits-title': 'Šta natalna karta otkriva',
            'birthchart-benefits-subtitle': 'Otkrijte transformativne uvide koji čekaju u vašem astrološkom planu',
            'birthchart-benefit-1-title': 'Samorefleksija & unutrašnji rast',
            'birthchart-benefit-1-desc': 'Steknete duboke uvide u vašu strukturu ličnosti, emocionalne obrasce i nesvesne motivacije koji oblikuju vaše ponašanje i odluke.',
            'birthchart-benefit-2-title': 'Prepoznavanje snaga & izazova',
            'birthchart-benefit-2-desc': 'Identifikujte svoje prirodne talente, potencijalne oblasti rasta i jedinstvene izazove koji mogu postati prilike za lični razvoj.',
            'birthchart-benefit-3-title': 'Povezivanje svesnog & nesvesnog',
            'birthchart-benefit-3-desc': 'Premostite jaz između vašeg svesnog uma i dubljih psiholoških obrazaca da biste stvorili veću samosvest i integraciju.',
            'birthchart-benefit-4-title': 'Razvoj ličnosti & samoprihvatanje',
            'birthchart-benefit-4-desc': 'Razvijte saosećajno razumevanje sebe i stvorite mapu puta za lični rast koja se slaže sa vašom autentičnom prirodom.',
            'birthchart-benefit-5-title': 'Donositi odluke & planiranje života',
            'birthchart-benefit-5-desc': 'Koristite svoje astrološke uvide da donosite usklađene odluke i stvorite životni put koji odgovara vašoj istinskoj svrsi i potencijalu.',
            'birthchart-benefit-6-title': 'Razumevanje obrazaca veza',
            'birthchart-benefit-6-desc': 'Otkrijte kako vaša natalna karta utiče na vaše veze i naučite da stvarate zdravije, ispunjavajuće veze sa drugima.',
            'birthchart-process-title': 'Proces čitanja',
            'birthchart-process-subtitle': 'Strukturirani pristup dekodiranju vaših astroloških uvida',
            'birthchart-step-1-title': 'Početna konzultacija',
            'birthchart-step-1-desc': 'Počinjemo razgovorom o vašoj trenutnoj životnoj situaciji, izazovima i tome što se nadate od čitanja natalne karte. Ovo mi pomaže da prilagodim tumačenje vašim specifičnim potrebama.',
            'birthchart-step-2-title': 'Kalkulacija & analiza horoskopa',
            'birthchart-step-2-desc': 'Kalkulišem vašu preciznu natalnu kartu sa vašim tačnim vremenom rođenja, datumom rođenja i mestom rođenja. Ovo stvara jedinstveni astrološki plan koji otkriva vašu strukturu ličnosti i životne obrasce.',
            'birthchart-step-3-title': 'Psihološko tumačenje',
            'birthchart-step-3-desc': 'Koristeći principe dubinske psihologije, tumačim vaš horoskop sa fokusom na unutrašnje dinamike, emocionalni razvoj i nesvesne obrasce umesto na predviđanja ili gatanje.',
            'birthchart-step-4-title': 'Integracija & primena',
            'birthchart-step-4-desc': 'Razgovaramo o tome kako možete primeniti ove uvide u svom svakodnevnom životu i stvaramo praktične strategije za lični rast i samoprihvatanje na osnovu vašeg astrološkog profila.',
            'birthchart-cta-title': 'Spremni da počnete?',
            'birthchart-cta-desc': 'Napravite prvi korak ka dubljem samorazumevanju i ličnom rastu. Kontaktirajte me da zakazete vaše psihološko čitanje natalne karte.',
            'call-button': 'Pozovite +49 175 1427016',
            'email-button': 'Pošaljite email',
            'book-button': 'Rezervišite online',
            'back-to-home': 'Nazad na početnu',
            'birthchart-different-title': 'Nije vaš tipičan horoskop',
            'birthchart-different-desc': 'Ovo nije astrološki kliše ili dnevno čitanje horoskopa. Umesto toga, to je sofisticirani psihološki alat koji kombinuje:',
            'birthchart-feature-1-title': 'Naučna osnova:',
            'birthchart-feature-1-desc': 'Bazirano na psihološkim istraživanjima i principima dubinske psihologije',
            'birthchart-feature-2-title': 'Profesionalna ekspertiza:',
            'birthchart-feature-2-desc': 'Sprovodi obučeni terapeut i sertifikovani kouč',
            'birthchart-feature-3-title': 'Psihološki fokus:',
            'birthchart-feature-3-desc': 'Naglasak na samorazumevanje i lični razvoj',
            'birthchart-feature-4-title': 'Holistički pristup:',
            'birthchart-feature-4-desc': 'Integracija uma, tela i duhovne svesti',
            'birthchart-spiritual-title': 'Duhovna komponenta',
            'birthchart-spiritual-desc-1': 'Za sve one koji traže duhovnu komponentu u svom razvoju ličnosti, psihološko čitanje natalne karte je uzbudljivo dopuna klasičnoj psihoterapiji i koučingu.',
            'birthchart-spiritual-desc-2': 'Nudi jedinstveni most između naučne psihologije i duhovne mudrosti i pruža uvide koji mogu dopuniti i obogatiti vaše terapeutske putovanje.',
            'birthchart-philosophy-title': 'Martial Minds filozofija',
            'birthchart-philosophy-desc-1': 'Kao obučeni terapeut i kouč, koristim psihološko čitanje natalne karte da vas pratim na vašem putu ličnog razvoja - potpuno u duhu Martial Minds: balans uma i tela, snage i svesnosti.',
            'birthchart-philosophy-desc-2': 'Ovaj pristup kombinuje disciplinu i fokus borilačkih veština sa dubinom i uvidom psihološke astrologije i stvara jedinstveni okvir za ličnu transformaciju i rast.',
            'birthchart-pricing-title': 'Investicija u samospoznaju',
            'birthchart-pricing-subtitle': 'po sesiji čitanja',
            'birthchart-pricing-item-1': 'Sveobuhvatna analiza natalne karte',
            'birthchart-pricing-item-2': '60-minutna intenzivna sesija',
            'birthchart-pricing-item-3': 'Nema pismenog sažetka',
            'birthchart-pricing-item-4': 'Praćenje putem e-pošte',
            'birthchart-pricing-item-5': 'Integracija sa terapijskim ciljevima',
            'business-health-title': 'Promocija zdravlja na radnom mestu',
            'business-health-desc': 'Moje ponude za kompanije su prilagođene i uvek se orijentišu na konkretne potrebe vaše organizacije. Bilo da se radi o promociji mentalnog zdravlja na radnom mestu, individualnoj podršci rukovodstvu ili razvoju timova - fokus je uvek na održive, efikasne promene.',
            'business-executive-title': 'Executive Coaching',
            'business-executive-desc': 'Individualni koučing za rukovodstvo i zaposlene, radionice za jačanje otpornosti, samovođenje ili timske kulture, i savetovanje o zdravom vođstvu i psihološkoj sigurnosti u kompaniji.',
            'business-leadership-title': 'Razvoj vođstva',
            'business-leadership-desc': 'Na osnovu Birkman Method Assessment-a, podržavam rukovodstvo u razvoju njihovih vođstvenih kompetencija i stvaranju zdravih radnih okruženja.',
            'business-prevention-title': 'Primarna prevencija',
            'business-prevention-desc': 'Preventivni programi za kompanije i institucije koji imaju za cilj da spreče mentalne bolesti u ranoj fazi kroz upravljanje stresom, trening otpornosti i programe svesnosti.',
            'business-team-title': 'Razvoj tima',
            'business-team-desc': 'Radionice i treninzi za jačanje timske kulture, poboljšanje komunikacije i izgradnju psihološke sigurnosti na radnom mestu.',
            'birthchart-integration-title': 'Integracija u moju praksu',
            'birthchart-integration-subtitle': 'Kako se čitanje natalne karte uklapa u Martial Minds pristup',
            'business-process-step-1-title': 'Procena & analiza',
            'business-process-step-1-desc': 'Počinjemo sa sveobuhvatnom procenom trenutnog stanja vaše organizacije, identifikujemo oblasti za poboljšanje i mogućnosti rasta.',
            'business-process-step-2-title': 'Razvoj prilagođenih rešenja',
            'business-process-step-2-desc': 'Na osnovu procene, razvijam prilagođeni program koji uzima u obzir vaše specifične potrebe i kulturu organizacije.',
            'business-process-step-3-title': 'Implementacija & podrška',
            'business-process-step-3-desc': 'Zajedno implementiramo program, sa kontinuiranom podrškom i vođenjem kako bismo osigurali uspešne rezultate.',
            'business-process-step-4-title': 'Procena & kontinuirano poboljšanje',
            'business-process-step-4-desc': 'Redovna procena napretka i kontinuirano usavršavanje strategija kako bismo maksimizirali uticaj i održivost.',
            'business-metric-1': 'Poboljšanje timske komunikacije',
            'business-metric-2': 'Smanjenje stresa na radnom mestu',
            'business-metric-3': 'Povećanje zadovoljstva zaposlenih',
            'business-metric-4': 'Poboljšanje efikasnosti vođstva',
            'business-pricing-item-1': 'Profesionalno EMDR lečenje',
            'business-pricing-item-2': 'Strukturirani terapijski proces',
            'business-pricing-item-3': 'Pristup zasnovan na dokazima',
            'business-pricing-item-4': 'Kontinuirana podrška',
            'business-pricing-item-5': 'Praćenje napretka',
            'business-pricing-business-title': 'Business coaching & prevencija',
            'business-pricing-business-desc': 'Za kompanije i institucije, cene su dostupne na zahtev. Svi programi su prilagođeni vašim specifičnim potrebama i strukturi organizacije.',
            'consultation-button': 'Zakaži konsultaciju',
            'personal-journey-title': 'Vaše putovanje rasta',
            'personal-journey-subtitle': 'Strukturirani put ka ličnoj transformaciji i uspehu',
            'personal-journey-step-1-title': 'Procena & svest',
            'personal-journey-step-1-desc': 'Počinjemo razumevanjem vaše trenutne situacije, identifikovanjem oblasti za rast i stvaranjem svesti o obrascima koji vas možda zadržavaju.',
            'personal-journey-step-2-title': 'Postavljanje ciljeva & planiranje',
            'personal-journey-step-2-desc': 'Zajedno uspostavljamo jasne, značajne ciljeve i kreiramo strukturirani plan za njihovu implementaciju, deleći velike ciljeve na upravljive korake.',
            'personal-journey-step-3-title': 'Razvoj veština & vežbanje',
            'personal-journey-step-3-desc': 'Učite praktične veštine i tehnike i zatim ih vežbate dosledno kako biste izgradili nove navike i obrasce koji podržavaju vaš rast.',
            'personal-journey-step-4-title': 'Integracija & majstorstvo',
            'personal-journey-step-4-desc': 'Dok integrišete nove veštine u svoj svakodnevni život, razvijate majstorstvo i samopouzdanje i stvarate trajne pozitivne promene.',
            'personal-stories-title': 'Priče transformacije',
            'personal-stories-subtitle': 'Pravi ljudi, prava promena, pravi rezultati',
            'personal-story-1-quote': '"Kroz bihejvioralnu terapiju naučila sam da prepoznam svoje negativne obrasce mišljenja i zamenim ih osnažujućim uverenjima. Sada pristupam izazovima sa samopouzdanjem umesto sa strahom."',
            'personal-story-1-author': '- Sarah M., Upravljanje anksioznošću',
            'personal-story-2-quote': '"Par terapija nam je pomogla da se oslobodimo destruktivnih obrazaca komunikacije. Sada imamo alate da rešavamo konflikte konstruktivno i rastemo zajedno."',
            'personal-story-2-author': '- Michael & Lisa, Rast veze',
            'personal-story-3-quote': '"Program ličnog razvoja mi je dao način razmišljanja i veštine da postignem ciljeve za koje nikad nisam mislio da su mogući. Sada živim život o kome sam uvek sanjao."',
            'personal-story-3-author': '- David K., Transformacija života',
            'personal-pricing-individual-title': 'Investicija u individualnu terapiju',
            'personal-pricing-individual-subtitle': 'po 60-minutnoj sesiji',
            'personal-pricing-individual-item-1': 'Profesionalna bihejvioralna terapija',
            'personal-pricing-individual-item-2': 'Personalizovani plan lečenja',
            'personal-pricing-individual-item-3': 'Pristupi zasnovani na dokazima',
            'personal-pricing-individual-item-4': 'Tekuća podrška',
            'personal-pricing-individual-item-5': 'Praćenje napretka',
            'personal-pricing-couple-title': 'Investicija u par terapiju',
            'personal-pricing-couple-subtitle': 'po 60-minutnoj sesiji',
            'personal-pricing-couple-item-1': 'Profesionalna par terapija',
            'personal-pricing-couple-item-2': 'Trening komunikacijskih veština',
            'personal-pricing-couple-item-3': 'Strategije rešavanja konflikata',
            'personal-pricing-couple-item-4': 'Alati za rast veze',
            'personal-pricing-couple-item-5': 'Tekuća podrška veze',
            'personal-methods-title': 'Metode i alati',
            'personal-methods-subtitle': 'Praktične tehnike za transformaciju i rast',
            'personal-method-1-title': 'Protokoli mišljenja',
            'personal-method-1-desc': 'Reflektujte i restrukturirajte negativne obrasce mišljenja koji ograničavaju vaš potencijal i uzrokuju nepotreban stres.',
            'personal-method-2-title': 'Vežbe izlaganja',
            'personal-method-2-desc': 'Postupno se suočavajte sa stresnim situacijama u sigurnom okruženju kako biste izgradili samopouzdanje i smanjili strahove.',
            'personal-method-3-title': 'Bihejvioralne vežbe',
            'personal-method-3-desc': 'Vežbajte nova ponašanja koja se slažu sa vašim ciljevima i stvaraju pozitivne promene u vašem životu.',
            'personal-method-4-title': 'Svesnost & opuštanje',
            'personal-method-4-desc': 'Razvijte unutrašnji mir i samosvest kroz dokazane tehnike za smanjenje stresa i mentalnu jasnoću.',
            'personal-method-5-title': 'Rad sa resursima',
            'personal-method-5-desc': 'Ojačajte svoju ličnu otpornost identifikovanjem i građenjem na vašim postojećim snagama i sposobnostima.',
            'personal-method-6-title': 'Holistička integracija',
            'personal-method-6-desc': 'Kombinujte klasičnu bihejvioralnu terapiju sa modernim, holističkim elementima za sveobuhvatnu ličnu transformaciju.',
            'personal-couples-title': 'Par terapija & komunikacija',
            'personal-couples-subtitle': 'Zajedno pronađite nove puteve kroz razumevanje i rast',
            'personal-couples-subsection-title': 'Izgradnja jačih veza',
            'personal-couples-desc-1': 'Pratim parove sa alatima iz emocijama fokusirane terapije, nenasilne komunikacije i sistemskih metoda. Za više bliskosti, razumevanja i stvarne promene - umesto ponavljajućih konflikata.',
            'personal-couples-desc-2': 'Par terapija vam pomaže da se oslobodite negativnih obrazaca i razvijete zdravije načine međusobnog delovanja. Radi se o stvaranju osnove poverenja, poštovanja i međusobnog razumevanja.',
            'personal-couples-learn-title': 'Šta ćete naučiti',
            'personal-couples-learn-1': 'Efikasne komunikacijske tehnike',
            'personal-couples-learn-2': 'Strategije rešavanja konflikata',
            'personal-couples-learn-3': 'Izgradnja emocionalne intimnosti',
            'personal-couples-learn-4': 'Poverenje i ranjivost',
            'personal-couples-martial-title': 'Martial Arts pristup vezama',
            'personal-couples-martial-desc-1': 'Baš kao što borilačke veštine uče balans, poštovanje i disciplinu, zdrave veze zahtevaju iste principe. Radimo zajedno na pronalaženju balansa između individualnih potreba i ciljeva partnerstva.',
            'personal-couples-martial-desc-2': 'Kroz strukturirane vežbe i vođene razgovore, razvijate veštine da se zajedno suočite sa izazovima i stvorite vezu koja podržava rast i sreću oba partnera.',
            
            // Business Consulting Page
            'business-hero-title': 'EMDR traumatska terapija & Business coaching',
            'business-hero-subtitle': 'Obrađujte ono što blokira. Stvorite prostor za isceljenje i rast.',
            'business-emdr-title': 'Razumevanje EMDR terapije',
            'business-emdr-subtitle': 'Kako ova revolucionarna terapija funkcioniše i zašto je tako efikasna',
            'business-emdr-science-title': 'Nauka iza EMDR',
            'business-emdr-science-desc-1': 'EMDR se zasniva na takozvanom "adaptivnom modelu obrade informacija" (AIP model). Ovo pretpostavlja da je naš mozak u osnovi sposoban da sam obrađuje stresne iskustva - ali u ekstremnim stresnim ili traumatskim iskustvima, ovaj prirodni proces može biti blokiran.',
            'business-emdr-science-desc-2': 'Ovde EMDR dolazi u igru: Pomaže da se takve blokade reše tako da se traumatska sećanja mogu obraditi i emocionalno rasteretiti. Tipično, terapeut vodi klijenta kroz ciljane pokrete očiju ili naizmenične stimuluse dok se istovremeno pozivaju određena stresna sećanja.',
            'business-emdr-process-title': 'EMDR proces',
            'business-emdr-process-desc': 'Ovaj proces se odvija u nekoliko strukturiranih faza, uključujući: anamnezu i planiranje terapije, stabilizaciju i pripremu, ciljano fokusiranje na stresna sećanja, desenzitizaciju i obradu, jačanje pozitivnih uverenja, telesnu svest & integraciju, i završetak i praćenje.',
            'business-emdr-treatment-title': 'Stanja koja se leče EMDR-om',
            'business-emdr-treatment-desc': 'Prvobitno razvijen za PTSP, EMDR se sada takođe uspešno koristi za:',
            'business-emdr-treatment-1': 'Anksiozne poremećaje & napade panike',
            'business-emdr-treatment-2': 'Depresije & probleme sa samopoštovanjem',
            'business-emdr-treatment-3': 'Probleme sa zavisnostima',
            'business-emdr-treatment-4': 'Hronične bolove',
            'business-evidence-title': 'Naučni dokazi & priznanje',
            'business-evidence-subtitle': 'EMDR je podržan širom sveta obimnim istraživanjima i zvaničnim priznanjem',
            'business-study-1-title': 'Meta-analiza Rasines-Laudes & Serrano-Pintado (2023)',
            'business-study-1-desc': 'Ovaj sistematski pregled analizirao je 18 randomizovanih kontrolisanih studija sa ukupno 1.213 učesnika. Rezultati pokazuju da EMDR izaziva značajna poboljšanja u PTSP simptomima, anksioznosti i depresiji.',
            'business-study-2-title': 'Mišljenje Naučnog saveta za psihoterapiju (WBP, 2014)',
            'business-study-2-desc': 'WBP je prepoznao EMDR kao naučno zasnovanu psihoterapijsku metodu za odrasle sa PTSP.',
            'business-study-3-title': 'EMDR Institut - Pregled randomizovanih studija',
            'business-study-3-desc': 'Više od 20 randomizovanih studija dokazuje efikasnost EMDR-a u lečenju traume.',
            'business-study-4-title': 'Cochrane pregled Bisson et al. (2007)',
            'business-study-4-desc': 'Ovaj sistematski pregled poredio je različite psihološke tretmane za hronični PTSP i otkrio da je EMDR efikasna terapijska opcija.',
            'business-recommendations-title': 'Zvanične preporuke',
            'business-recommendations-subtitle': 'EMDR je prepoznat i preporučen od strane vodećih zdravstvenih organizacija širom sveta',
            'business-recommendation-1-title': 'Svetska zdravstvena organizacija (WHO, 2013)',
            'business-recommendation-1-desc': 'WHO preporučuje EMDR kao tretman zasnovan na dokazima za PTSP kod odraslih.',
            'business-recommendation-2-title': 'Američka psihijatrijska asocijacija (APA, 2004)',
            'business-recommendation-2-desc': 'APA prepoznaje EMDR kao efikasnu metodu lečenja za akutne stresne poremećaje i PTSP.',
            'business-recommendation-3-title': 'Zajednički savezni odbor (G-BA, 2014)',
            'business-recommendation-3-desc': 'U Nemačkoj je EMDR 2014. prepoznat kao psihoterapijska metoda za zakonski osigurane osobe sa PTSP.',
            'business-coaching-title': 'Business coaching & promocija zdravlja na radnom mestu',
            'business-coaching-subtitle': 'Prilagođena rešenja za kompanije i organizacije',
            'business-services-title': 'Ponudjene usluge',
            'business-services-subtitle': 'Sveobuhvatna rešenja za razvoj organizacije i mentalno zdravlje',
            'business-process-title': 'Kako radimo zajedno',
            'business-process-subtitle': 'Strukturirani pristup razvoju organizacije',
            'business-metrics-title': 'Merljivi rezultati',
            'business-metrics-subtitle': 'Pratite vaš napredak i vidite uticaj naše saradnje',
            'business-pricing-emdr-title': 'EMDR terapijska investicija',
            'business-pricing-emdr-desc': 'po 60-minutnoj sesiji',
            
            // Personal Development Page
            'personal-hero-title': 'Lični razvoj & bihejvioralna terapija',
            'personal-hero-subtitle': 'Prepoznajte stare obrasce. Idite novim putevima ka rastu i transformaciji.',
            'personal-behavioral-title': 'Bihejvioralni terapeutski pristup',
            'personal-behavioral-subtitle': 'Metode zasnovane na dokazima za održive promene i lični rast',
            'personal-behavioral-what-title': 'Šta je bihejvioralna terapija?',
            'personal-behavioral-what-desc-1': 'Bihejvioralna terapija je jedna od najbolje istraženih oblika terapije i nudi jasne, svakodnevne alate za ciljano rešavanje psiholoških opterećenja. Fokusira se na promenu obrazaca mišljenja, osećanja i delovanja koji vas blokiraju ili opterećuju u životu.',
            'personal-behavioral-what-desc-2': 'Zajedno gledamo: Koji su se automatski misli i reakcije ušunjali u vaš život, koja unutrašnja uverenja utiču na vašu sliku o sebi i vaše veze, i kako možete korak po korak razviti zdravije, jačajuće obrasce.',
            'personal-martial-connection-title': 'Veza sa borilačkim veštinama',
            'personal-martial-connection-desc': 'Baš kao što borilačke veštine zahtevaju disciplinu, vežbu i postepeno poboljšanje, bihejvioralna terapija vam pomaže da razvijete nove obrasce kroz konzistentnu praksu i svesnu percepciju vaših misli i ponašanja.',
            'personal-behavioral-treatment-title': 'Stanja koja se leče',
            'personal-behavioral-treatment-desc': 'Bihejvioralna terapija je posebno korisna za:',
            'personal-treatment-1': 'Anksiozne poremećaje & unutrašnju nemirnost',
            'personal-treatment-2': 'Depresije & stanja iscrpljenosti',
            'personal-treatment-3': 'Probleme sa samopoštovanjem & perfekcionizam',
            'personal-treatment-4': 'Posledice traume & stresom izazvane tegobe',
            'personal-programs-title': 'Programi ličnog razvoja',
            'personal-programs-subtitle': 'Transformišite svoj način razmišljanja i postignite svoje ciljeve sa strukturiranim programima',
            'personal-program-1-title': 'Majstorstvo mentaliteta',
            'personal-program-1-desc': 'Razvijte mentalitet rasta koji prihvata izazove, uči iz grešaka i kontinuirano se poboljšava. Transformišite ograničavajuća uverenja u osnažujuće perspektive.',
            'personal-program-2-title': 'Postizanje ciljeva',
            'personal-program-2-desc': 'Naučite da postavljate značajne ciljeve, stvarate izvodljive planove i razvijate disciplinu i otpornost potrebnu da ih konzistentno postignete.',
            'personal-program-3-title': 'Emocionalna inteligencija',
            'personal-program-3-desc': 'Poboljšajte svoju sposobnost da razumete i upravljate emocijama, gradite jače veze i suočavajte se sa životnim izazovima sa većom mudrošću.',
            'personal-program-4-title': 'Svesnost & wellness',
            'personal-program-4-desc': 'Razvijte prakse za smanjenje stresa, mentalnu jasnoću i opšte blagostanje koje podržavaju vaš lični i profesionalni rast.',
            'personal-program-5-title': 'Izgradnja otpornosti',
            'personal-program-5-desc': 'Ojačajte svoju sposobnost da se oporavite od neuspeha, prilagodite se promenama i zadržite fokus na svoje ciljeve uprkos izazovima.',
            'personal-program-6-title': 'Razvoj vođstva',
            'personal-program-6-desc': 'Razvijte veštine i mentalitet potrebne za efikasno vođstvo, bilo u vašoj karijeri, vezama ili ličnom životu.',
            'personal-cta-title': 'Spremni da transformišete svoj život?',
            'personal-cta-desc': 'Napravite prvi korak ka ličnom rastu i transformaciji. Kontaktirajte me da zakazete vašu terapijsku sesiju ili konzultaciju za lični razvoj.',
            
            // References Section
            'references-title': 'Reference & Certifikacije',
            'references-subtitle': 'Profesionalne veze i priznata ekspertiza',
            'reference-fresh-minds': 'Fresh Minds',
            'reference-fresh-minds-desc': 'Partner za saradnju na projektima - zajedno radimo na tome da donesemo inovativna rješenja za mentalno zdravlje u zajednicu.',
            'reference-birkman': 'Službeni Birkman savjetnik',
            'reference-birkman-desc': 'Certifikovani Birkman Coach sa službenim priznanjem, pruža naučno zasnovane procjene ličnosti i coaching.',
            
            // Contact Section
            'contact-title': 'Kontakt',
            'contact-subtitle': 'Spremni za vaš put? Javite se još danas.',
            'contact-info-title': 'Javite se',
            'contact-form-title': 'Pošaljite poruku',
            'phone': 'Telefon',
            'email': 'E-mail',
            'location': 'Lokacija',
            'location-desc': 'Online sesije dostupne širom svijeta. Sesije uživo dostupne u Njemačkoj.',
            'availability': 'Dostupnost',
            'availability-desc': 'Fleksibilno planiranje termina. Prve konzultacije obično uživo, terapijske sesije online ili uživo.',
            'select-service': 'Odaberite uslugu',
            'option-psychotherapy': 'Psihoterapija',
            'option-emdr': 'EMDR traumatska terapija',
            'option-birkman': 'Birkman test ličnosti',
            'option-behavioral': 'Bihejvioralna terapija',
            'option-couples': 'Terapija parova',
            'option-birthchart': 'Psihološko čitanje natalne karte',
            'option-business': 'Business coaching',
            'option-other': 'Ostalo',
            'send-message': 'Pošaljite poruku',
            
            // Footer
            'all-rights': 'Sva prava zadržana.'
        }
    };
    
    // Function to change language
    window.changeLanguage = function(lang, showNotif = true) {
        currentLanguage = lang;
        console.log('Changing language to:', lang);
        updateContent(lang);
        localStorage.setItem('preferredLanguage', lang);
        console.log('Language saved to localStorage:', lang);
        
        if (showNotif) {
            const langNames = {
                'en': 'English',
                'de': 'Deutsch',
                'bs': 'Bosanski'
            };
            
            showNotification(`Language changed to ${langNames[lang]}`, 'success');
        }
    };
    
    // Function to update content based on language
    function updateContent(lang) {
        console.log('Updating content to language:', lang);
        const langData = languages[lang];
        if (!langData) {
            console.error('No language data found for:', lang);
            return;
        }
        
        // Update all elements with data-lang attribute
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            if (langData[key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = langData[key];
                } else if (element.tagName === 'OPTION') {
                    element.textContent = langData[key];
                } else {
                    element.textContent = langData[key];
                }
            }
        });
    }
    
    // Load saved language preference or default to German
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'de';
    console.log('Loading language preference:', savedLanguage);
    changeLanguage(savedLanguage, false);
}
