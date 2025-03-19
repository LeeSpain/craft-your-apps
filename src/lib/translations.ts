
type TranslationKey = 
  | 'hero.title'
  | 'hero.subtitle'
  | 'hero.exploreButton'
  | 'hero.chatButton'
  | 'portfolio.title'
  | 'portfolio.subtitle'
  | 'portfolio.buyNow'
  | 'portfolio.viewDemo'
  | 'custom.title'
  | 'custom.subtitle'
  | 'custom.chatButton'
  | 'chatbot.welcome'
  | 'chatbot.buyOrCustom'
  | 'chatbot.whichApp'
  | 'chatbot.customIndustry'
  | 'chatbot.customExtras'
  | 'chatbot.quote'
  | 'form.name'
  | 'form.company'
  | 'form.email'
  | 'form.phone'
  | 'form.industry'
  | 'form.submit'
  | 'form.thanks'
  | 'footer.copyright';

type Translations = {
  [key in TranslationKey]: {
    en: string;
    es: string;
    fr: string;
    de: string;
  };
};

export const translations: Translations = {
  'hero.title': {
    en: 'Discover Ready-Made Apps or Build Your Own with AIAppCrafter!',
    es: '¡Descubre aplicaciones listas para usar o crea las tuyas con AIAppCrafter!',
    fr: 'Découvrez des applications prêtes à l\'emploi ou créez la vôtre avec AIAppCrafter !',
    de: 'Entdecken Sie fertige Apps oder erstellen Sie Ihre eigene mit AIAppCrafter!'
  },
  'hero.subtitle': {
    en: 'Premium apps for businesses, ready to launch or customized to your needs.',
    es: 'Aplicaciones premium para empresas, listas para lanzar o personalizadas según sus necesidades.',
    fr: 'Applications premium pour entreprises, prêtes à être lancées ou personnalisées selon vos besoins.',
    de: 'Premium-Apps für Unternehmen, startbereit oder nach Ihren Bedürfnissen angepasst.'
  },
  'hero.exploreButton': {
    en: 'Explore Apps',
    es: 'Explorar Apps',
    fr: 'Explorer les Apps',
    de: 'Apps erkunden'
  },
  'hero.chatButton': {
    en: 'Chat with AIAppCrafter',
    es: 'Chatear con AIAppCrafter',
    fr: 'Discuter avec AIAppCrafter',
    de: 'Mit AIAppCrafter chatten'
  },
  'portfolio.title': {
    en: 'Our App Portfolio',
    es: 'Nuestro Catálogo de Apps',
    fr: 'Notre Portfolio d\'Applications',
    de: 'Unser App-Portfolio'
  },
  'portfolio.subtitle': {
    en: 'Discover our collection of premium, ready-to-launch applications',
    es: 'Descubra nuestra colección de aplicaciones premium listas para lanzar',
    fr: 'Découvrez notre collection d\'applications premium prêtes à être lancées',
    de: 'Entdecken Sie unsere Sammlung von Premium-Anwendungen, die startbereit sind'
  },
  'portfolio.buyNow': {
    en: 'Buy Now',
    es: 'Comprar Ahora',
    fr: 'Acheter Maintenant',
    de: 'Jetzt Kaufen'
  },
  'portfolio.viewDemo': {
    en: 'View Demo',
    es: 'Ver Demo',
    fr: 'Voir la Démo',
    de: 'Demo ansehen'
  },
  'custom.title': {
    en: 'Need a Custom Solution?',
    es: '¿Necesita una Solución Personalizada?',
    fr: 'Besoin d\'une Solution Personnalisée ?',
    de: 'Benötigen Sie eine maßgeschneiderte Lösung?'
  },
  'custom.subtitle': {
    en: 'We can build a tailor-made application that perfectly fits your business needs',
    es: 'Podemos crear una aplicación a medida que se adapte perfectamente a las necesidades de su empresa',
    fr: 'Nous pouvons créer une application sur mesure qui correspond parfaitement aux besoins de votre entreprise',
    de: 'Wir können eine maßgeschneiderte Anwendung erstellen, die perfekt zu Ihren Geschäftsanforderungen passt'
  },
  'custom.chatButton': {
    en: 'Chat for a Custom Quote',
    es: 'Chatear para un Presupuesto Personalizado',
    fr: 'Discuter pour un Devis Personnalisé',
    de: 'Chatten Sie für ein individuelles Angebot'
  },
  'chatbot.welcome': {
    en: 'Hello! I\'m AIAppCrafter, your personal app assistant.',
    es: '¡Hola! Soy AIAppCrafter, tu asistente de aplicaciones personal.',
    fr: 'Bonjour ! Je suis AIAppCrafter, votre assistant d\'application personnel.',
    de: 'Hallo! Ich bin AIAppCrafter, Ihr persönlicher App-Assistent.'
  },
  'chatbot.buyOrCustom': {
    en: 'Want to buy a ready-made app or build a custom one? Say "Buy" or "Custom"!',
    es: '¿Quieres comprar una aplicación ya hecha o construir una personalizada? ¡Di "Comprar" o "Personalizada"!',
    fr: 'Vous souhaitez acheter une application prête à l\'emploi ou en créer une sur mesure ? Dites "Acheter" ou "Personnalisée" !',
    de: 'Möchten Sie eine fertige App kaufen oder eine maßgeschneiderte App erstellen? Sagen Sie "Kaufen" oder "Individuell"!'
  },
  'chatbot.whichApp': {
    en: 'Which app are you interested in?',
    es: '¿En qué aplicación está interesado?',
    fr: 'Quelle application vous intéresse ?',
    de: 'An welcher App sind Sie interessiert?'
  },
  'chatbot.customIndustry': {
    en: 'What industry is your app for? (e.g., pet care, real estate, team productivity, fan community)',
    es: '¿Para qué industria es su aplicación? (por ejemplo, cuidado de mascotas, bienes raíces, productividad de equipos, comunidad de fans)',
    fr: 'Pour quelle industrie est votre application ? (ex. : soins pour animaux, immobilier, productivité d\'équipe, communauté de fans)',
    de: 'Für welche Branche ist Ihre App? (z.B. Tierpflege, Immobilien, Team-Produktivität, Fan-Community)'
  },
  'chatbot.customExtras': {
    en: 'Would you like any of these extra features?',
    es: '¿Le gustaría alguna de estas características adicionales?',
    fr: 'Souhaitez-vous l\'une de ces fonctionnalités supplémentaires ?',
    de: 'Möchten Sie eine dieser zusätzlichen Funktionen?'
  },
  'chatbot.quote': {
    en: 'Here\'s your quote:',
    es: 'Aquí está su presupuesto:',
    fr: 'Voici votre devis :',
    de: 'Hier ist Ihr Angebot:'
  },
  'form.name': {
    en: 'Full Name',
    es: 'Nombre Completo',
    fr: 'Nom Complet',
    de: 'Vollständiger Name'
  },
  'form.company': {
    en: 'Company Name',
    es: 'Nombre de la Empresa',
    fr: 'Nom de l\'Entreprise',
    de: 'Firmenname'
  },
  'form.email': {
    en: 'Email Address',
    es: 'Dirección de Correo Electrónico',
    fr: 'Adresse Email',
    de: 'E-Mail-Adresse'
  },
  'form.phone': {
    en: 'Phone Number (Optional)',
    es: 'Número de Teléfono (Opcional)',
    fr: 'Numéro de Téléphone (Facultatif)',
    de: 'Telefonnummer (Optional)'
  },
  'form.industry': {
    en: 'Industry',
    es: 'Industria',
    fr: 'Industrie',
    de: 'Branche'
  },
  'form.submit': {
    en: 'Submit',
    es: 'Enviar',
    fr: 'Soumettre',
    de: 'Absenden'
  },
  'form.thanks': {
    en: 'Thanks! Check your email for next steps.',
    es: '¡Gracias! Revise su correo electrónico para conocer los próximos pasos.',
    fr: 'Merci ! Consultez votre email pour les prochaines étapes.',
    de: 'Danke! Überprüfen Sie Ihre E-Mail für die nächsten Schritte.'
  },
  'footer.copyright': {
    en: '© 2023 AIAppCrafter. All rights reserved.',
    es: '© 2023 AIAppCrafter. Todos los derechos reservados.',
    fr: '© 2023 AIAppCrafter. Tous droits réservés.',
    de: '© 2023 AIAppCrafter. Alle Rechte vorbehalten.'
  }
};

export const getTranslation = (key: TranslationKey, language: 'en' | 'es' | 'fr' | 'de'): string => {
  return translations[key][language];
};
