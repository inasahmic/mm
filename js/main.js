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

    // Initialize language switcher
    initLanguageSwitcher();
    
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
    let currentLanguage = 'en';
    
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
            'hero-subtitle': 'Practice for Psychotherapy (according to the Heilpraktikergesetz)',
            'hero-description': 'Martial Minds is more than just a practice name - it is a concept. The word "martial" originally comes from the field of martial arts - and symbolizes strength, courage, discipline and determination to actively face life\'s challenges. "Minds" refers to the depth, complexity and versatility of our minds. Together, Martial Minds embodies the powerful combination of inner strength and psychological growth - exactly where change begins.',
            'learn-more': 'Learn More',
            'get-started': 'Get Started',
            
            // About Section
            'about-title': 'About Me',
            'about-subtitle': 'Your journey to mental strength and personal growth',
            'about-description': 'My path into psychotherapeutic work began with a deep interest in human experience, social dynamics and emotional healing. This interest led me to a Master of Science in Social Psychology, where I learned how our thoughts, feelings and actions arise and can change in interaction with our social environment.',
            'about-experience': 'Since 2016, I have been working in the psychosocial field, particularly in initial psychological counseling for people with a history of migration. This work in a non-profit environment has not only shaped me, but has also shown me how important a resource-oriented and culturally sensitive approach to mental health is.',
            'about-martial': 'In addition to my therapeutic work, another area has played a central role in my life for over two decades: Kuk Sool Won, a traditional Korean martial art that I have been practicing since 2001. I am a 3rd Dan (black belt) holder. Kuk Sool Won combines aspects of self-defense, meditation, movement and inner discipline. It is not only about physical strength, but also about the balance between mind and body, focus, resilience and mindfulness - values that have also deeply influenced my therapeutic approach.',
            'about-approach': 'My approach is characterized by mindfulness, clarity, empathy and the deep conviction that change is possible - if we are willing to look, feel and grow. I look forward to accompanying you on your journey.',
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
            'target-groups-title': 'Target Groups & Approach',
            'target-groups-desc': 'I treat adults and young people aged 16 and over who want to consciously work on their personal development and mental health. I also support companies - especially managers and teams - as part of coaching, prevention and personal development to promote mental strength, self-reflection and sustainable leadership skills.',
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
            'pricing-basic': 'Basic Services',
            'pricing-specialized': 'Specialized Services',
            'pricing-premium': 'Premium Services',
            'per-session': '/session',
            'per-service': '/service',
            'per-test': '/test',
            'pricing-psychotherapy': 'Psychotherapy (60 min)',
            'pricing-emdr': 'EMDR trauma therapy (60 min)',
            'pricing-birthchart': 'Psychological Birthchart reading',
            'pricing-couples': 'Couples therapy (60 min)',
            'pricing-consultation': 'Initial consultation (135,99€)',
            'pricing-birkman': 'Birkman Advance personality test',
            'pricing-business': 'Business coaching (prices on request)',
            'pricing-prevention': 'Primary prevention programs',
            'most-popular': 'Most Popular',
            'pricing-note': 'Note: All services are for self-payers or people whose private insurance covers the costs. The treatment is exclusively for self-payers or people whose private insurance covers the costs. For companies and institutions, prices are available upon request.',
            
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
            'all-rights': 'All rights reserved.'
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
            'hero-subtitle': 'Praxis für Psychotherapie (nach dem Heilpraktikergesetz)',
            'hero-description': 'Martial Minds ist mehr als nur ein Praxismame - es ist ein Konzept. Das Wort "martial" kommt ursprünglich aus dem Bereich der Kampfkünste - und symbolisiert Stärke, Mut, Disziplin und Entschlossenheit, sich aktiv den Herausforderungen des Lebens zu stellen. "Minds" bezieht sich auf die Tiefe, Komplexität und Vielseitigkeit unseres Geistes. Zusammen verkörpert Martial Minds die kraftvolle Kombination aus innerer Stärke und psychologischem Wachstum - genau dort, wo Veränderung beginnt.',
            'learn-more': 'Mehr erfahren',
            'get-started': 'Jetzt starten',
            
            // About Section
            'about-title': 'Über mich',
            'about-subtitle': 'Ihr Weg zu mentaler Stärke und persönlichem Wachstum',
            'about-description': 'Mein Weg in die psychotherapeutische Arbeit begann mit einem tiefen Interesse an menschlichen Erfahrungen, sozialen Dynamiken und emotionaler Heilung. Dieses Interesse führte mich zu einem Master of Science in Sozialpsychologie, wo ich lernte, wie unsere Gedanken, Gefühle und Handlungen entstehen und sich in der Interaktion mit unserer sozialen Umwelt verändern können.',
            'about-experience': 'Seit 2016 arbeite ich im psychosozialen Bereich, insbesondere in der ersten psychologischen Beratung für Menschen mit Migrationshintergrund. Diese Arbeit in einem gemeinnützigen Umfeld hat mich nicht nur geprägt, sondern mir auch gezeigt, wie wichtig ein ressourcenorientierter und kultursensibler Ansatz für die psychische Gesundheit ist.',
            'about-martial': 'Neben meiner therapeutischen Arbeit spielt ein weiterer Bereich seit über zwei Jahrzehnten eine zentrale Rolle in meinem Leben: Kuk Sool Won, eine traditionelle koreanische Kampfkunst, die ich seit 2001 praktiziere. Ich bin Trägerin des 3. Dan (Schwarzgurt). Kuk Sool Won verbindet Aspekte der Selbstverteidigung, Meditation, Bewegung und inneren Disziplin. Es geht nicht nur um körperliche Kraft, sondern auch um das Gleichgewicht zwischen Geist und Körper, Fokus, Widerstandsfähigkeit und Achtsamkeit - Werte, die auch meinen therapeutischen Ansatz tief geprägt haben.',
            'about-approach': 'Mein Ansatz ist geprägt von Achtsamkeit, Klarheit, Empathie und der tiefen Überzeugung, dass Veränderung möglich ist - wenn wir bereit sind zu schauen, zu fühlen und zu wachsen. Ich freue mich darauf, Sie auf Ihrem Weg zu begleiten.',
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
            'target-groups-title': 'Zielgruppen & Ansatz',
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
            'pricing-basic': 'Grundleistungen',
            'pricing-specialized': 'Spezialleistungen',
            'pricing-premium': 'Premium-Leistungen',
            'per-session': '/Sitzung',
            'per-service': '/Leistung',
            'per-test': '/Test',
            'pricing-psychotherapy': 'Psychotherapie (60 Min)',
            'pricing-emdr': 'EMDR Traumatherapie (60 Min)',
            'pricing-birthchart': 'Psychologische Geburtshoroskop-Deutung',
            'pricing-couples': 'Paartherapie (60 Min)',
            'pricing-consultation': 'Erstberatung (135,99€)',
            'pricing-birkman': 'Birkman Advance Persönlichkeitstest',
            'pricing-business': 'Business Coaching (Preise auf Anfrage)',
            'pricing-prevention': 'Primärpräventionsprogramme',
            'most-popular': 'Am beliebtesten',
            'pricing-note': 'Hinweis: Alle Leistungen sind für Selbstzahler oder Menschen, deren private Krankenversicherung die Kosten übernimmt. Die Behandlung ist ausschließlich für Selbstzahler oder Menschen, deren private Krankenversicherung die Kosten übernimmt. Für Unternehmen und Institutionen sind Preise auf Anfrage erhältlich.',
            
            // References Section
            'references-title': 'Referenzen & Zertifizierungen',
            'references-subtitle': 'Professionelle Verbindungen und anerkannte Expertise',
            'reference-fresh-minds': 'Fresh Minds',
            'reference-fresh-minds-desc': 'Projektkooperationspartner - gemeinsam arbeiten wir daran, innovative Lösungen für die psychische Gesundheit in die Gemeinschaft zu bringen.',
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
            'hero-description': 'Martial Minds je više od samo imena ordinacije - to je koncept. Riječ "martial" potiče iz područja borilačkih vještina - i simbolizira snagu, hrabrost, disciplinu i odlučnost da se aktivno suočimo sa životnim izazovima. "Minds" se odnosi na dubinu, složenost i svestranost našeg uma. Zajedno, Martial Minds utjelovljuje snažnu kombinaciju unutrašnje snage i psihološkog rasta - upravo tamo gdje počinje promjena.',
            'learn-more': 'Saznaj više',
            'get-started': 'Započni',
            
            // About Section
            'about-title': 'O meni',
            'about-subtitle': 'Vaš put do mentalne snage i ličnog rasta',
            'about-description': 'Moj put u psihoterapeutski rad započeo je dubokim interesom za ljudsko iskustvo, socijalne dinamike i emocionalno ozdravljenje. Ovo interesovanje me je dovelo do Master of Science u socijalnoj psihologiji, gdje sam naučila kako nastaju naši misli, osjećaji i akcije i kako se mogu mijenjati u interakciji sa našom socijalnom okolinom.',
            'about-experience': 'Od 2016. godine radim u psihosocijalnom polju, posebno u prvobitnom psihološkom savjetovanju za ljude sa migracijskom istorijom. Ovaj rad u neprofitnom okruženju ne samo da me je oblikovao, već mi je i pokazao koliko je važan resursno-orijentisan i kulturološki osjetljiv pristup mentalnom zdravlju.',
            'about-martial': 'Pored mog terapeutskog rada, još jedno područje igra centralnu ulogu u mom životu više od dvije decenije: Kuk Sool Won, tradicionalna koreanska borilačka vještina koju praktikujem od 2001. godine. Ja sam nosilac 3. Dana (crni pojas). Kuk Sool Won kombinira aspekte samoobrane, meditacije, pokreta i unutrašnje discipline. Ne radi se samo o fizičkoj snazi, već i o ravnoteži između uma i tijela, fokusu, otpornosti i svjesnosti - vrijednostima koje su također duboko uticale na moj terapeutski pristup.',
            'about-approach': 'Moj pristup karakteriše svjesnost, jasnoća, empatija i duboko uvjerenje da je promjena moguća - ako smo spremni da gledamo, osjećamo i rastemo. Radujem se što ću vas pratiti na vašem putovanju.',
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
    window.changeLanguage = function(lang, showNotification = true) {
        currentLanguage = lang;
        updateContent(lang);
        localStorage.setItem('preferredLanguage', lang);
        
        if (showNotification) {
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
        const langData = languages[lang];
        if (!langData) return;
        
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
    
    // Load saved language preference or default to English
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    changeLanguage(savedLanguage, false);
}
