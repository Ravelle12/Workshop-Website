#PROJECT: Nu Tech Auto Clinic Website - Professional Automotive Workshop Website

OVERVIEW:
Build a premium, modern website for Nu Tech Auto Clinic, an RMI-approved automotive workshop 
in Durban, South Africa (established 2007). The website must be professional, dark-themed, 
and image-rich, resembling high-end BMW/Audi dealership websites.

TECH STACK:
- Pure HTML5, CSS3, Vanilla JavaScript (no frameworks initially)
- Responsive design (mobile-first approach)
- SheetJS library for Excel export functionality
- Google Maps API integration
- Multi-language support (English, Afrikaans, Zulu)

DESIGN REQUIREMENTS:
- Dark theme: Primary #0A1F44, Secondary #1E3A5F, Accent #C8102E, Gold #D4AF37
- Typography: Inter font family, uppercase headers, clean sans-serif
- Professional automotive aesthetic (sharp lines, minimal rounded corners)
- Sophisticated hover effects and transitions
- Real photography throughout (no stock emojis or cartoons)

PAGES STRUCTURE:
1. HOME (index.html) - Hero, stats, brands carousel, services preview, gallery, contact
2. ABOUT (about.html) - Company history, team, certifications, RMI approval
3. SERVICES (services.html) - Detailed service offerings, pricing, booking CTA
4. PARTS SHOP (parts.html) - 2nd hand parts inventory with search/filter
5. BLOG (blog.html) - Car maintenance tips and articles (multi-language)
6. CONTACT (contact.html) - Form, Google Maps, contact details

KEY FEATURES TO IMPLEMENT:

HOMEPAGE:
- Top bar with business hours, location, RMI badge
- Sticky navigation with language switcher (EN/AF/ZU)
- Hero section with background image overlay, animated stats (18+ years, 50K+ cars)
- Brand carousel with real car logos (VW, Audi, BMW, Mercedes, Toyota, Ford) - grayscale to color hover
- Service cards with images (6 main services)
- Workshop gallery grid (6 images with hover overlays)
- Contact form section with Excel export
- WhatsApp floating button (bottom-right)

CONTACT FORM FUNCTIONALITY:
- Fields: First Name, Last Name, Phone, Email, Vehicle Make, Vehicle Model, Service Type, Message
- Data validation (required fields)
- Export to Excel (.xlsx) using SheetJS library
- Format: One row per enquiry with timestamp, all form data, status column
- Auto-download Excel file on submit
- Success message after submission
- Store data structure: Date/Time | First Name | Last Name | Phone | Email | Vehicle Make | 
  Vehicle Model | Service Type | Message | Status

SERVICES SECTION:
1. Engine Diagnostics - Advanced computer diagnostics
2. Brake Systems - Complete brake service
3. Transmission Repair - Expert transmission work
4. Electrical Systems - Full electrical diagnostics
5. Air Conditioning - AC service and regas
6. Suspension Work - Suspension repairs and alignment

MULTI-LANGUAGE SYSTEM:
- Create JSON files for translations: en.json, af.json, zu.json
- Language switcher in navbar
- Store language preference in localStorage
- Update all text content dynamically based on selected language
- Key sections to translate: Navigation, Hero, Services, Contact Form labels, Footer

STYLING GUIDELINES:
- Use CSS Grid and Flexbox for layouts
- Mobile breakpoint: 768px
- Tablet breakpoint: 1024px
- Desktop max-width: 1400px centered
- Button style: Uppercase text, 16px padding, subtle hover lift
- Card hover: translateY(-5px), border color change to accent
- Image hover: scale(1.1) transform
- Transitions: 0.3s ease for all animations

PERFORMANCE REQUIREMENTS:
- Optimize images (WebP format, max 1920px width)
- Lazy load images below fold
- Minify CSS/JS for production
- Use CDN for external libraries (SheetJS, Google Fonts)

FOLDER STRUCTURE:
/nutech-auto-website
  /css
    - styles.css (main styles)
    - responsive.css (media queries)
    - animations.css (keyframes and transitions)
  /js
    - main.js (general functionality)
    - language.js (translation system)
    - contact-form.js (form handler and Excel export)
  /images
    /hero
    /brands
    /services
    /gallery
    /team
  /translations
    - en.json
    - af.json
    - zu.json
  /pages (optional - for multi-page structure)
  - index.html
  - about.html
  - services.html
  - parts.html
  - blog.html
  - contact.html
  - README.md

ADDITIONAL FEATURES TO BUILD:
- Google Maps embedded (Durban location)
- WhatsApp Business integration (click-to-chat)
- Smooth scroll navigation
- Back-to-top button
- Loading animations on scroll (Intersection Observer)
- Mobile hamburger menu
- Blog CMS structure (for future content)
- Parts inventory system (search, filter, category)

FUTURE WPF INTEGRATION PREP:
- Design contact form data structure compatible with WPF app
- Excel format must match: Same column headers for import
- Include vehicle information fields for service history tracking
- Status field for admin workflow (New, Contacted, Scheduled, Completed)

SEO & ACCESSIBILITY:
- Semantic HTML5 tags (header, nav, main, section, article, footer)
- Alt text for all images
- ARIA labels for interactive elements
- Meta tags: description, keywords, viewport
- Open Graph tags for social sharing
- Structured data for local business (JSON-LD)

BROWSER SUPPORT:
- Chrome, Firefox, Safari, Edge (latest 2 versions)
- Mobile: iOS Safari, Chrome Mobile
- Graceful degradation for older browsers
