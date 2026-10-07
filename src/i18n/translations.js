/**
 * Static UI string translations for English, Hindi, and Gujarati.
 * Keys are dot-separated paths or direct words/phrases, values are objects keyed by locale code.
 */
const translations = {
  // Navbar
  "nav.home": { en: "Home", hi: "होम", gu: "હોમ" },
  "nav.more": { en: "More", hi: "और", gu: "વધુ" },
  "nav.search": { en: "Search", hi: "खोज", gu: "શોધ" },
  "nav.toggleTheme": { en: "Toggle theme", hi: "थीम बदलें", gu: "થીમ બદલો" },
  "nav.tagline": {
    en: "Latest Indian news, trending stories and clear explainers — updated throughout the day.",
    hi: "भारत की ताज़ा खबरें, ट्रेंडिंग स्टोरीज़ और स्पष्ट विश्लेषण — दिनभर अपडेट।",
    gu: "ભારતના તાજા સમાચાર, ટ્રેન્ડિંગ સ્ટોરીઝ અને સ્પષ્ટ વિશ્લેષણ — આખો દિવસ અપડેટ.",
  },

  // Home
  "home.latestNews": { en: "Latest News", hi: "ताज़ा खबर", gu: "તાજા સમાચાર" },
  "home.viewAll": { en: "View All", hi: "सभी देखें", gu: "બધા જુઓ" },
  "home.featuredCategories": { en: "Featured Categories", hi: "प्रमुख श्रेणियाँ", gu: "ફીચર્ડ શ્રેણીઓ" },
  "home.articles": { en: "Articles", hi: "लेख", gu: "લેખો" },
  "home.by": { en: "By", hi: "द्वारा", gu: "દ્વારા" },

  // Post detail
  "post.views": { en: "views", hi: "दृश्य", gu: "વ્યૂ" },
  "post.share": { en: "Share:", hi: "शेयर:", gu: "શેર:" },
  "post.relatedArticles": { en: "Related Articles", hi: "संबंधित लेख", gu: "સંબંધિત લેખો" },
  "post.comments": { en: "Comments", hi: "टिप्पणियाँ", gu: "ટિપ્પણીઓ" },
  "post.beFirst": { en: "Be the first to comment.", hi: "पहली टिप्पणी करें।", gu: "પ્રથમ ટિપ્પણી કરો." },
  "post.leaveComment": { en: "Leave a comment", hi: "एक टिप्पणी छोड़ें", gu: "એક ટિપ્પણી મૂકો" },
  "post.writeComment": { en: "Write your comment…", hi: "अपनी टिप्पणी लिखें…", gu: "તમારી ટિપ્પણી લખો…" },
  "post.postComment": { en: "Post Comment", hi: "टिप्पणी भेजें", gu: "ટિપ્પણી મોકલો" },
  "post.posting": { en: "Posting…", hi: "भेज रहे हैं…", gu: "મોકલી રહ્યાં છે…" },
  "post.commentSubmitted": { en: "Comment submitted — pending review.", hi: "टिप्पणी भेजी गई — समीक्षा में है।", gu: "ટિપ્પણી મોકલવામાં આવી — સમીક્ષા હેઠળ." },
  "post.commentError": { en: "Something went wrong. Try again.", hi: "कुछ गलत हुआ। पुनः प्रयास करें।", gu: "કંઈક ખોટું થયું. ફરી પ્રયાસ કરો." },
  "post.commentingAs": { en: "Commenting as", hi: "इस नाम से टिप्पणी", gu: "તરીકે ટિપ્પણી" },
  "post.signOut": { en: "sign out", hi: "साइन आउट", gu: "સાઇન આઉટ" },
  "post.loading": { en: "Loading article…", hi: "लेख लोड हो रहा है…", gu: "લેખ લોડ થઈ રહ્યો છે…" },

  // Search
  "search.title": { en: "Search Articles", hi: "लेख खोजें", gu: "લેખ શોધો" },
  "search.subtitle": { en: "Find news, topics, and tags from across", hi: "खबरें, विषय और टैग खोजें —", gu: "સમાચાર, વિષયો અને ટૅગ્સ શોધો —" },
  "search.placeholder": { en: "Search news, topics, tags…", hi: "खबरें, विषय, टैग खोजें…", gu: "સમાચાર, વિષયો, ટૅગ્સ શોધો…" },
  "search.searching": { en: "Searching…", hi: "खोज रहे हैं…", gu: "શોધી રહ્યાં છે…" },
  "search.recentArticles": { en: "Recent Articles", hi: "हाल के लेख", gu: "તાજેતરના લેખો" },
  "search.results": { en: "result", hi: "परिणाम", gu: "પરિણામ" },
  "search.resultsPlural": { en: "results", hi: "परिणाम", gu: "પરિણામો" },
  "search.for": { en: "for", hi: "के लिए", gu: "માટે" },
  "search.noResults": { en: "No articles matched", hi: "कोई लेख नहीं मिला", gu: "કોઈ લેખ મળ્યો નહીં" },
  "search.tryDifferent": { en: "Try a different search term.", hi: "कोई अन्य खोज शब्द आज़माएँ।", gu: "કોઈ જુદો શોધ શબ્દ અજમાવો." },
  "search.page": { en: "Page", hi: "पृष्ठ", gu: "પૃષ્ઠ" },
  "search.of": { en: "of", hi: "का", gu: "માંથી" },
  "search.prev": { en: "Prev", hi: "पिछला", gu: "પાછળ" },
  "search.next": { en: "Next", hi: "अगला", gu: "આગળ" },

  // Category page
  "category.label": { en: "Category", hi: "श्रेणी", gu: "શ્રેણી" },
  "category.loading": { en: "Loading articles…", hi: "लेख लोड हो रहे हैं…", gu: "લેખો લોડ થઈ રહ્યાં છે…" },
  "category.empty": { en: "No articles in this category yet.", hi: "इस श्रेणी में अभी कोई लेख नहीं है।", gu: "આ શ્રેણીમાં હજુ કોઈ લેખ નથી." },

  // Sidebar
  "sidebar.trendingNow": { en: "Trending Now", hi: "अभी ट्रेंडिंग", gu: "હવે ટ્રેન્ડિંગ" },
  "sidebar.nothingTrending": { en: "Nothing trending yet.", hi: "अभी कोई ट्रेंड नहीं है।", gu: "હજુ કંઈ ટ્રેન્ડિંગ નથી." },

  // Contact
  "contact.title": { en: "Contact Us", hi: "संपर्क करें", gu: "સંપર્ક કરો" },
  "contact.subtitle": { en: "Have a tip, correction, or question? We'd love to hear from you.", hi: "कोई टिप, सुधार या सवाल है? हम आपसे सुनना चाहेंगे।", gu: "કોઈ ટિપ, સુધારો કે પ્રશ્ન છે? અમે તમારી પાસેથી સાંભળવા માંગીએ છીએ." },
  "contact.email": { en: "Email", hi: "ईमेल", gu: "ઈમેલ" },
  "contact.newsroom": { en: "Newsroom", hi: "न्यूज़रूम", gu: "ન્યૂઝરૂમ" },
  "contact.remoteTeam": { en: "Remote-first editorial team", hi: "रिमोट-प्रथम संपादकीय टीम", gu: "રિમોટ-ફર્સ્ટ સંપાદકીય ટીમ" },
  "contact.yourName": { en: "Your name", hi: "आपका नाम", gu: "તમારું નામ" },
  "contact.yourEmail": { en: "Your email", hi: "आपका ईमेल", gu: "તમારો ઈમેલ" },
  "contact.subject": { en: "Subject", hi: "विषय", gu: "વિષય" },
  "contact.yourMessage": { en: "Your message", hi: "आपका संदेश", gu: "તમારો સંદેશ" },
  "contact.send": { en: "Send Message", hi: "संदेश भेजें", gu: "સંદેશ મોકલો" },
  "contact.sending": { en: "Sending…", hi: "भेज रहे हैं…", gu: "મોકલી રહ્યાં છે…" },
  "contact.sent": { en: "Message sent — we'll be in touch.", hi: "संदेश भेजा गया — हम संपर्क करेंगे।", gu: "સંદેશ મોકલાયો — અમે સંપર્કમાં રહીશું." },
  "contact.error": { en: "Something went wrong. Try again.", hi: "कुछ गलत हुआ। पुनः प्रयास करें।", gu: "કંઈક ખોટું થયું. ફરી પ્રયાસ કરો." },

  // Footer
  "footer.quickLinks": { en: "Quick Links", hi: "त्वरित लिंक", gu: "ઝડપી લિંક્સ" },
  "footer.categories": { en: "Categories", hi: "श्रेणियाँ", gu: "શ્રેણીઓ" },
  "footer.aboutUs": { en: "About Us", hi: "हमारे बारे में", gu: "અમારા વિશે" },
  "footer.contactUs": { en: "Contact Us", hi: "संपर्क करें", gu: "સંપર્ક કરો" },
  "footer.privacyPolicy": { en: "Privacy Policy", hi: "गोपनीयता नीति", gu: "ગોપનીયતા નીતિ" },
  "footer.terms": { en: "Terms & Conditions", hi: "नियम और शर्तें", gu: "નિયમો અને શરતો" },
  "footer.sitemap": { en: "Sitemap", hi: "साइटमैप", gu: "સાઇટમેપ" },
  "footer.allRights": { en: "All Rights Reserved.", hi: "सर्वाधिकार सुरक्षित।", gu: "તમામ હક આરક્ષિત." },

  // Login dialog & Auth
  "login.signIn": { en: "Sign In", hi: "साइन इन", gu: "સાઇન ઇન" },
  "login.signUp": { en: "Sign Up", hi: "साइन अप", gu: "સાઇન અપ" },
  "login.yourName": { en: "Your name", hi: "आपका नाम", gu: "તમારું નામ" },
  "login.email": { en: "Email address", hi: "ईमेल पता", gu: "ઈમેલ સરનામું" },
  "login.password": { en: "Password (min. 6 characters)", hi: "पासवर्ड (न्यूनतम 6 अक्षर)", gu: "પાસવર્ડ (ઓછામાં ઓછા 6 અક્ષર)" },
  "login.pleaseWait": { en: "Please wait…", hi: "कृपया प्रतीक्षा करें…", gu: "કૃપા કરીને રાહ જુઓ…" },
  "login.createAccount": { en: "Create Account", hi: "खाता बनाएँ", gu: "એકાઉન્ટ બનાવો" },
  "login.commentPrompt": { en: "Please sign in or create an account to post your comment.", hi: "अपनी टिप्पणी पोस्ट करने के लिए साइन इन करें।", gu: "તમારી ટિપ્પણી પોસ્ટ કરવા માટે સાઇન ઇન કરો." },
  "login.contactPrompt": { en: "Please sign in to send your message.", hi: "अपना संदेश भेजने के लिए साइन इन करें।", gu: "તમારો સંદેશ મોકલવા માટે સાઇન ઇન કરો." },
  "login.newHere": { en: "New here? Create an account", hi: "यहाँ नए हैं? खाता बनाएँ", gu: "અહીં નવા છો? એકાઉન્ટ બનાવો" },
  "login.alreadyHave": { en: "Already have an account? Sign in", hi: "पहले से खाता है? साइन इन करें", gu: "પહેલેથી એકાઉન્ટ છે? સાઇન ઇન કરો" },
  "login.signInToComment": { en: "Sign in to comment", hi: "टिप्पणी करने के लिए साइन इन करें", gu: "ટિપ્પણી કરવા માટે સાઇન ઇન કરો" },
  "login.createToComment": { en: "Create an account to comment", hi: "टिप्पणी करने के लिए खाता बनाएँ", gu: "ટિપ્પણી કરવા માટે એકાઉન્ટ બનાવો" },

  // About page
  "about.title": { en: "About Us", hi: "हमारे बारे में", gu: "અમારા વિશે" },
  "about.whatWeCover": { en: "What We Cover", hi: "हम क्या कवर करते हैं", gu: "અમે શું આવરી લઈએ છીએ" },
  "about.editorialStandards": { en: "Editorial Standards", hi: "संपादकीय मानक", gu: "સંપાદકીય ધોરણો" },
  "about.advertising": { en: "Advertising", hi: "विज्ञापन", gu: "જાહેરાત" },

  // 404
  "404.title": { en: "Page not found", hi: "पृष्ठ नहीं मिला", gu: "પૃષ્ઠ મળ્યું નથી" },
  "404.desc": { en: "The page you're looking for doesn't exist or has been moved.", hi: "आप जो पृष्ठ खोज रहे हैं वह मौजूद नहीं है या हटा दिया गया है।", gu: "તમે જે પૃષ્ઠ શોધી રહ્યાં છો તે અસ્તિત્વમાં નથી અથવા ખસેડવામાં આવ્યું છે." },
  "404.backHome": { en: "Back to Home", hi: "मुख्य पृष्ठ पर वापस", gu: "મુખ્ય પૃષ્ઠ પર પાછા" },

  // Sitemap page
  "sitemap.title": { en: "Sitemap", hi: "साइटमैप", gu: "સાઇટમેપ" },
  "sitemap.pages": { en: "Pages", hi: "पेज", gu: "પૃષ્ઠો" },
  "sitemap.categories": { en: "Categories", hi: "श्रेणियाँ", gu: "શ્રેણીઓ" },
  "sitemap.recentArticles": { en: "Recent Articles", hi: "हाल के लेख", gu: "તાજેતરના લેખો" },

  // Common
  "common.readMore": { en: "Read More", hi: "और पढ़ें", gu: "વધુ વાંચો" },
  "common.loading": { en: "Loading…", hi: "लोड हो रहा है…", gu: "લોડ થઈ રહ્યું છે…" },

  // Language names
  "lang.en": { en: "English", hi: "English", gu: "English" },
  "lang.hi": { en: "हिन्दी", hi: "हिन्दी", gu: "હિન્દી" },
  "lang.gu": { en: "ગુજરાતી", hi: "ગુજરાતી", gu: "ગુજરાતી" },

  // Common category & word mappings for direct text lookup
  "World": { en: "World", hi: "विश्व", gu: "વિશ્વ" },
  "Business": { en: "Business", hi: "व्यापार", gu: "વેપાર" },
  "Sports": { en: "Sports", hi: "खेल", gu: "રમતગમત" },
  "Entertainment": { en: "Entertainment", hi: "मनोरंजन", gu: "મનોરંજન" },
  "Lifestyle": { en: "Lifestyle", hi: "जीवनशैली", gu: "જીવનશૈલી" },
  "Technology": { en: "Technology", hi: "तकनीक", gu: "ટેકનોલોજી" },
  "Health": { en: "Health", hi: "स्वास्थ्य", gu: "સ્વાસ્થ્ય" },
  "Travel": { en: "Travel", hi: "यात्रा", gu: "પ્રવાસ" },
  "Politics": { en: "Politics", hi: "राजनीति", gu: "રાજકારણ" },
  "Science": { en: "Science", hi: "विज्ञान", gu: "વિજ્ઞાન" },
  "Education": { en: "Education", hi: "शिक्षा", gu: "શિક્ષણ" },
  "Automobile": { en: "Automobile", hi: "ऑटोमोबाइल", gu: "ઓટોમોબાઇલ" },
  "Economy": { en: "Economy", hi: "अर्थव्यवस्था", gu: "અર્થતંત્ર" },
  "Trending Now": { en: "Trending Now", hi: "अभी ट्रेंडिंग", gu: "હવે ટ્રેન્ડિંગ" },
  "Latest News": { en: "Latest News", hi: "ताज़ा खबर", gu: "તાજા સમાચાર" },
  "View All": { en: "View All", hi: "सभी देखें", gu: "બધા જુઓ" },
  "Articles": { en: "Articles", hi: "लेख", gu: "લેખો" },
  "Home": { en: "Home", hi: "होम", gu: "હોમ" },
  "About Us": { en: "About Us", hi: "हमारे बारे में", gu: "અમારા વિશે" },
  "Contact Us": { en: "Contact Us", hi: "संपर्क करें", gu: "સંપર્ક કરો" },
  "Privacy Policy": { en: "Privacy Policy", hi: "गोपनीयता नीति", gu: "ગોપનીયતા નીતિ" },
  "Terms & Conditions": { en: "Terms & Conditions", hi: "नियम और शर्तें", gu: "નિયમો અને શરતો" },
  "Search": { en: "Search", hi: "खोज", gu: "શોધ" },
  "Sitemap": { en: "Sitemap", hi: "साइटमैप", gu: "સાઇટમેપ" },
  "What We Cover": { en: "What We Cover", hi: "हम क्या कवर करते हैं", gu: "અમે શું આવરી લઈએ છીએ" },
  "Editorial Standards": { en: "Editorial Standards", hi: "संपादकीय मानक", gu: "સંપાદકીય ધોરણો" },
  "Advertising": { en: "Advertising", hi: "विज्ञापन", gu: "જાહેરાત" },
  "Contact page": { en: "Contact page", hi: "संपर्क पृष्ठ", gu: "સંપર્ક પૃષ્ઠ" },
  "Information We Collect": { en: "Information We Collect", hi: "हम जो जानकारी एकत्र करते हैं", gu: "અમે જે માહિતી એકત્રિત કરીએ છીએ" },
  "Cookies and Similar Technologies": { en: "Cookies and Similar Technologies", hi: "कुकीज़ और समान तकनीकें", gu: "કુકીઝ અને સમાન તકનીકો" },
  "Use of Content": { en: "Use of Content", hi: "सामग्री का उपयोग", gu: "સામગ્રીનો ઉપયોગ" },
  "User-Submitted Content": { en: "User-Submitted Content", hi: "उपयोगकर्ता द्वारा सबमिट की गई सामग्री", gu: "વપરાશકર્તા દ્વારા સબમિટ કરાયેલ સામગ્રી" },
  "Accuracy of Information": { en: "Accuracy of Information", hi: "जानकारी की सटीकता", gu: "માહિતીની ચોકસાઈ" },
  "Third-Party Links and Advertising": { en: "Third-Party Links and Advertising", hi: "तृतीय-पक्ष लिंक और विज्ञापन", gu: "તૃતીય-પક્ષ લિંક્સ અને જાહેરાત" },
  "Last updated:": { en: "Last updated:", hi: "अंतिम अपडेट:", gu: "છેલ્લું અપડેટ:" },
};

export default translations;
