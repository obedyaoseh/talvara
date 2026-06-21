import { useEffect, useMemo, useState } from 'react'
import { Accordion, AccordionItem } from './components/ui/accordion'
import { Badge } from './components/ui/badge'
import { Button } from './components/ui/button'
import { Card } from './components/ui/card'
import { Input } from './components/ui/input'
import { Select } from './components/ui/select'
import { Textarea } from './components/ui/textarea'
import './App.css'

const CALENDLY_URL = 'https://calendly.com/talvara'
const CONTACT_EMAIL = 'enquiries@talvara.io'
const CURRENT_YEAR = new Date().getFullYear()
const GOOGLE_FORM_ACTION =
  'https://docs.google.com/forms/d/e/1FAIpQLSe7cvAf0WTxd3IXPTxhc9Cui0Yb3Uj4162IUIqER49F9uFqfw/formResponse'
const googleFormFields = {
  firstName: 'entry.1902457185',
  lastName: 'entry.1853011576',
  email: 'entry.124667748',
  company: 'entry.1238528478',
  role: 'entry.1096991086',
  stage: 'entry.541976643',
  situation: 'entry.1895594218',
  message: 'entry.1259541258',
}

const companyStageOptions = [
  ['Pre-Seed/Idea Stage', 'Pre-Seed'],
  ['Seed/Early Revenue', 'Seed'],
  ['Series A/Growth Stage', 'Series A'],
  ['Series B+/Scaling Stage', 'Series B'],
  ['Established/Mature Business', 'Other'],
]

const outboundSituationOptions = [
  ['Just starting (no process yet)', 'No SDR yet'],
  ['Inconsistent/Experimental process', 'Have SDR not working'],
  ['Established, but underperforming', 'Scaling team'],
  ['High-performing and looking to optimize', 'Other'],
]

const navLinks = [
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'The Platform', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const stats = [
  ['7 days', 'Contract signed to SDR deployed'],
  ['Day 12', 'Outbound live · calls, email, LinkedIn'],
  ['$7,500', 'Total cost of a 90-day managed pilot'],
  ['RRS 7.0+', 'Minimum score before any deployment'],
]

const heroPills = [
  'AI-ranked SDR pool',
  'Human-reviewed shortlist',
  'Managed day-to-day delivery',
]

const logos = [
  {
    name: 'Self-Leadership Training with Lauren Cartigny',
    src: '/logos/self-science-lab.png',
    invert: true,
  },
  {
    name: 'Shift Left Jamaica',
    src: '/logos/shift-left-jamaica.png',
  },
  {
    name: 'TalentMatched',
    src: '/logos/talentmatched.svg',
    invert: true,
  },
  {
    name: 'Crucible International Inc.',
    src: '/logos/crucible-international.png',
  },
  {
    name: 'United Nations ITC',
    src: '/logos/international-trade-centre.svg',
  },
  {
    name: 'Battleground',
    src: '/logos/battleground.png',
  },
]

const testimonials = [
  {
    quote:
      'A tailored sales programme that helped organisations rethink their approach, restructure their commercial teams, and build the foundations for sustained revenue growth.',
    name: 'Milou Van Bruggen',
    title: 'Associate Programme Officer, Tech Sector Development',
    company: 'International Trade Centre (UN ITC)',
    logo: 'ITC',
    image: '/testimonials/milou-van-bruggen.jpg',
  },
  {
    quote:
      'Practical, curated sessions on selling into the UK market - with the strategic clarity and market entry frameworks our teams had been missing.',
    name: 'Haifa Ben Salem',
    title: 'Portfolio Manager',
    company: 'United Nations ITC',
    logo: 'UN ITC',
    image: '/testimonials/haifa-ben-salem.jpg',
  },
  {
    quote:
      'Brought structure and clarity to our GTM and translated a complex proposition into a scalable, executable plan.',
    name: 'Eli Goldberg',
    title: 'Head of Battleground',
    company: 'UK & EMEA',
    logo: 'BG',
    image: '/testimonials/eli-goldberg.jpg',
  },
  {
    quote:
      "In a market where most business is won through referrals, having a structured methodology and process to generate repeatable revenue alongside that is something I genuinely valued. Great team, great approach - I'd have no hesitation recommending them.",
    name: 'Tom Wood',
    title: 'CEO',
    company: 'TalentMatched',
    logo: 'TM',
    image: '/testimonials/tom-wood.png',
  },
  {
    quote:
      'Michael provided practical, strategic guidance that helped us sharpen our commercial positioning and approach to the UK market. His insights around value-led messaging, pipeline discipline, and structuring our sales playbook were particularly valuable. The sessions were focused, actionable, and immediately applicable. I would highly recommend working with him for organisations looking to strengthen their revenue strategy and execution.',
    name: 'Ryan Simons',
    title: 'CEO / Founder',
    company: 'DenArthur Analytics',
    logo: 'DA',
    image: '/testimonials/ryan-simons.jpg',
  },
]

const rrsAreas = [
  ['Prospecting', '25%'],
  ['Communication', '20%'],
  ['Objection Handling', '20%'],
  ['Sales Thinking', '20%'],
  ['Coachability', '15%'],
]

const cohort = [
  ['Sekinat S.', '7.3'],
  ['Alice O.', '7.0'],
  ['Mark Q.', '7.5'],
  ['Faustina A.', '7.0'],
  ['Kwesi D.', '7.5'],
  ['Cyril M.', '7.0'],
  ['Tariq N.', '7.0'],
  ['Joy E.', '7.5'],
  ['Eva D.', '7.0'],
  ['Kennedy K.', '7.5'],
  ['Forster E.', '7.5'],
  ['Priscilla N.', '7.0'],
  ['Rebecca E.', '7.0'],
  ['Maclean S.', '7.0'],
  ['Priscilla K.', '7.5'],
  ['Godfred A.', '7.0'],
  ['Ruby B.', '7.0'],
  ['Esther S.', '7.2'],
  ['Michaela', '7.4'],
]

const sdrHeadshots = {
  'Sekinat S.': '/sdr-headshots/sekinat-s.jpeg',
  'Alice O.': '/sdr-headshots/alice-o.png',
  'Mark Q.': '/sdr-headshots/mark-q.png',
  'Faustina A.': '/sdr-headshots/faustina-a.jpg',
  'Kwesi D.': '/sdr-headshots/kwesi-d.jpeg',
  'Cyril M.': '/sdr-headshots/cyril-m.jpeg',
  'Tariq N.': '/sdr-headshots/tariq-n.jpeg',
  'Joy E.': '/sdr-headshots/joy-e.jpg',
  'Eva D.': '/sdr-headshots/eva-d.jpeg',
  'Kennedy K.': '/sdr-headshots/kennedy-k.jpg',
  'Forster E.': '/sdr-headshots/forster-e.jpg',
  'Priscilla N.': '/sdr-headshots/priscilla-n.jpg',
  'Rebecca E.': '/sdr-headshots/rebecca-e.jpg',
  'Maclean S.': '/sdr-headshots/maclean-s.png',
  'Priscilla K.': '/sdr-headshots/priscilla-k.jpeg',
  'Godfred A.': '/sdr-headshots/godfred-a.jpg',
  'Ruby B.': '/sdr-headshots/ruby-b.jpg',
  'Esther S.': '/sdr-headshots/esther-s.jpeg',
  'Michaela': '/sdr-headshots/michaela.jpg',
}

const sdrHeadshotPositions = {
  'Alice O.': '50% 18%',
  'Cyril M.': '50% 18%',
  'Eva D.': '50% 16%',
  'Faustina A.': '50% 22%',
  'Forster E.': '50% 18%',
  'Joy E.': '50% 18%',
  'Kennedy K.': '50% 14%',
  'Kwesi D.': '50% 20%',
  'Maclean S.': '50% 12%',
  'Mark Q.': '50% 14%',
  'Priscilla K.': '50% 18%',
  'Priscilla N.': '50% 14%',
  'Rebecca E.': '50% 16%',
  'Sekinat S.': '48% 18%',
  'Tariq N.': '50% 16%',
  'Godfred A.': '50% 18%',
  'Ruby B.': '50% 20%',
  'Esther S.': '50% 18%',
  'Michaela': '50% 18%',
}

const pricingOffers = [
  {
    eyebrow: 'Offer 01',
    title: 'Direct Hire',
    price: '$4,000-$6,500',
    meta: 'one-time placement fee',
    body:
      "AI-matched, RRS-assessed candidates with full scoring, intro videos, and sample outreach delivered to you. You hire, you manage. Clean exit, no ongoing obligation. The RRS means you're not hiring blind - you're hiring with data.",
    bestFor:
      'Best for: teams with strong internal sales management who want a quality filter, not a managed service.',
  },
  {
    eyebrow: 'Offer 02 - Core',
    title: 'Managed SDR',
    price: '$3,375/mo',
    meta: 'per SDR - minimum 1-year term',
    body:
      'Full managed service. AI matching, RRS assessment, human-led deployment and ongoing management. Client Portal access from day one. Weekly pipeline reports every Monday. Coaching sprints when metrics dip. Shared outcome ownership. Outbound playbook delivered on exit.',
    bestFor:
      'Best for: Seed-to-Series B companies building their first or second outbound motion.',
  },
  {
    eyebrow: 'Offer 03',
    title: 'Managed Pod',
    price: '$8,800-$10,800/mo',
    meta: '3 SDRs + oversight - minimum 1-year term',
    body:
      'Your complete outbound function handed off from day one. Three assessed, deployed, and managed SDRs running coordinated outbound - with full reporting, Client Portal access, coaching, and playbook delivery. Highest leverage product.',
    bestFor:
      'Best for: companies ready to run outbound at scale without building an internal SDR management layer.',
  },
  {
    eyebrow: 'Offer 04 - Most Popular',
    title: '90-Day Pilot',
    price: '$2,500/mo',
    meta: '$7,500 total - then $3,375/mo min 1-year',
    body:
      'The full Talvara product - AI matching, RRS assessment, Client Portal access, human-managed deployment - at 80% of the ongoing monthly rate. Weekly reports. Day 60 mid-review. Free replacement guarantee. At Day 90, convert or exit cleanly. Pod pilot: $7,500/mo - $22,500 total.',
    bestFor:
      "You're not hiring someone and hoping it works. You're buying 90 days of AI-matched, human-managed outbound - with a live Client Portal, weekly reports, coaching sprints, and a replacement guarantee - for $7,500 total. Less than a month of a US SDR's fully loaded cost.",
    featured: true,
  },
]

const comparisonRows = [
  ['Proprietary training academy', 'Yes - Africa Sales Academy', 'No', 'No', 'No'],
  ['Proprietary eLearning platform', 'Yes - MySalesLMS', 'No', 'No', 'No'],
  ['AI-powered candidate matching', 'Yes', 'No', 'No', 'No'],
  ['Pre-deployment RRS assessment', 'Yes', 'No', 'No', 'No'],
  ['Live Client Portal', 'Yes - from day 12', 'No', 'No', 'No'],
  ['Weekly pipeline reporting', 'Yes - every Monday', 'No', 'Ad hoc', 'No'],
  ['AI-generated performance insights', 'Yes', 'No', 'No', 'No'],
  ['SDR daily command dashboard', 'Yes', 'No', 'No', 'No'],
  ['Coaching sprints', 'Data-triggered', 'No', 'Manager-dependent', 'No'],
  ['Client outbound playbook', 'Built + delivered', 'No', 'No', 'No'],
  ['Replacement guarantee', 'Auto-triggered', 'Sometimes', 'No', 'No'],
  ['Annual cost (1 SDR)', '$40,500', '$48.6k-$64.8k', '$70.2k-$91.8k', '$24.3k-$37.8k unmanaged'],
]

const pricingFaqs = [
  [
    'How quickly can an SDR start?',
    'Within 7 days of contract signing. Outbound live by day 12. Client Portal access from day one.',
  ],
  [
    'What is MySalesLMS?',
    "MySalesLMS is Talvara's proprietary eLearning platform - built specifically for Africa Sales Academy learners. It delivers the full six-week SDR training curriculum, tracked and measured throughout. It is not a third-party tool - it is built and owned by us.",
  ],
  [
    'What is the Africa Sales Academy?',
    "The Africa Sales Academy is the talent sourcing and training arm that feeds Talvara's SDR pool. It is a separate entity with its own brand and mission - creating structured commercial career pathways across Africa. Every SDR who reaches a Talvara client has been trained through ASA and assessed via the Revenue Readiness Score.",
  ],
  [
    'What does the Client Portal show me?',
    'Live SDR performance data - calls made, meetings booked, pipeline value attributed, and RR Score - updated in real time. The platform also surfaces AI-generated insights, ICP optimisation suggestions, and SDR benchmarks vs platform average.',
  ],
  [
    'What if the SDR underperforms?',
    'The replacement guarantee is automatic. If performance falls below agreed KPIs before Day 90, we replace the SDR at no additional cost. This is possible because the RRS tells us - with data - what good looks like before we deploy.',
  ],
  [
    'What does the weekly report contain?',
    'Meetings booked, outreach volume, pipeline value, conversion signals, and any coaching actions triggered by the data. Delivered every Monday automatically.',
  ],
  [
    'How does the AI matching work?',
    'Your requirements are mapped across 14 criteria during the discovery call. Our AI engine cross-references the full assessed SDR pool and surfaces the strongest candidate fits. Our team reviews every result against your buyer profile before anything is presented. AI ranks. Humans decide.',
  ],
  [
    'Is there a long-term contract?',
    'The pilot is 3 months at $2,500/mo ($7,500 total). After that, minimum 1-year term at $3,375/mo.',
  ],
  [
    'Where are the SDRs from?',
    'Applications are open across Africa - location is not a barrier to entry. Active cohorts are currently in Nigeria and Ghana, with Kenya launching in 2027.',
  ],
  [
    'Do I keep anything when the engagement ends?',
    'Yes. The full outbound playbook - ICP definition, messaging, objection scripts, sequence architecture - is delivered to you on exit. The institutional knowledge stays in your business permanently.',
  ],
  [
    'What tools do SDRs work in?',
    "Your stack. SDRs are briefed and set up on your CRM, sequencer, and prospecting tools before outbound starts. Tools cost is included for all managed engagements. We don't impose a fixed stack - we work in what you use.",
  ],
]

const portalFeatures = [
  'Live SDR performance cards',
  'Calls made - meetings booked - RR Score per SDR',
  'Real-time pipeline value tracking',
  'AI-generated insights per SDR',
  'Status indicators - On Track / Watch',
  'Day 90 conversion alert',
  'Weekly pipeline summary',
  'Meeting calendar integration',
  'ICP optimisation suggestions',
  'Request additional SDRs',
]

const dashboardFeatures = [
  'Daily task checklist',
  'Weekly KPI summary - calls, emails, meetings booked',
  'Progress bars toward weekly targets',
  'Activity log prompt',
  'Live RR Score with full category breakdown',
  'AI-prioritised prospect queue with status tags',
  'Pipeline attribution tracking',
  'Coaching sprint alerts',
  'Weekly check-in reminders',
  'Career progression tracker',
]

const partners = [
  ['Self-Leadership Training with Lauren Cartigny', 'Self-leadership and commercial confidence training.', '/logos/self-science-lab.png'],
  ['Shift Left Jamaica', 'Nearshore software development, QA testing, and IT solutions.', '/logos/shift-left-jamaica.png'],
  ['TalentMatched', 'AI hiring infrastructure and talent qualification partner.', '/logos/talentmatched.svg'],
  ['Crucible International Inc.', 'Outsourcing, operational transformation, and delivery partner.', '/logos/crucible-international.png'],
  ['United Nations ITC', 'Trade development and market-entry programme experience.', '/logos/international-trade-centre.svg'],
  ['Battleground', 'Risk, resilience, and business continuity software and consulting.', '/logos/battleground.png'],
]

const whyBuilt = [
  [
    "Africa's talent surge is real",
    '304 million young Africans aged 21-30 are in the workforce today. Sub-Saharan GDP is growing at 4.3% in 2026 - faster than every other major region. The commercial talent pool is enormous, but understructured. We built the Africa Sales Academy and MySalesLMS to give that talent a structured pathway to global commercial roles. Applications are open across Africa. Location is not a barrier to entry.',
  ],
  [
    'AI proved humans irreplaceable',
    "The most-funded autonomous AI SDR raised $74 million. It couldn't retain its own customers and reverted to a hybrid model by 2026. AI can surface and rank talent, prioritise prospect queues, and generate performance insights. It cannot replace the human judgment layer - objection handling, trust, contextual reading, and relationship building. That layer is Talvara's product.",
  ],
  [
    'Nobody built the commercial layer',
    'Andela proved African talent can be placed with Western enterprise at scale, then moved upmarket to senior engineering and left the commercial layer unaddressed. No funded competitor owns the space. We built the Academy, LMS, assessment IP, Client Portal, and SDR Dashboard to own that space.',
  ],
]

const values = [
  [
    'AI where it belongs. Humans where it matters.',
    'We use AI to match, score, rank, and generate insights. We use humans to review every result, make every critical decision, and own every outcome. The two work together. Neither replaces the other.',
  ],
  [
    'Built end to end - not bolted together.',
    'The Africa Sales Academy, MySalesLMS, the RRS, the Client Portal, and the SDR Dashboard are all built and owned by Talvara. This is not a patchwork of third-party tools. It is an integrated platform - and that integration is the moat.',
  ],
  [
    'Assessed before arrival.',
    "No SDR reaches a client without clearing the Revenue Readiness Score. Every candidate is scored across five weighted competency categories. We don't ship potential. We ship readiness.",
  ],
  [
    'Accountability is shared.',
    'Weekly reporting, data-triggered coaching sprints, a live Client Portal, and a replacement guarantee mean we stay accountable for what happens after deployment - alongside you, every week.',
  ],
  [
    'The playbook is yours.',
    'ICP definition, messaging, objection scripts, and sequence architecture are built during the engagement and delivered to you on exit. The institutional knowledge stays inside your business permanently.',
  ],
]

const founders = [
  {
    name: 'Michael K. Adonteng',
    title: 'Co-Founder',
    initials: 'MA',
    image: '/team/michael-adonteng.png',
    bio: [
      'Michael brings 18 years of B2B sales and leadership experience to Talvara. He has spent his career helping founders and revenue teams design go-to-market strategy, build outbound playbooks, sharpen sales EQ, and embed operating cadence that compounds over time.',
      'As an advisor to startup executives across diverse regions and verticals, Michael specialises in scaling revenue and building high-performing teams - with a track record that includes $32M+ in influenced revenue, reduced SDR ramp times, stronger pipeline quality, and predictable forecasting. At Talvara, he leads client strategy and deployment - ensuring every engagement is accountable to outcomes, not just activity.',
    ],
    linkedin: 'https://www.linkedin.com/in/michaeladonteng',
  },
  {
    name: 'Erica Franklin',
    title: 'Co-Founder',
    initials: 'EF',
    image: '/team/erica-franklin.png',
    imageFit: 'contain',
    bio: [
      "Erica brings over 15 years of experience across sales leadership, commercial education, and relationship-driven growth. She is the Chief Operating Officer of the Africa Sales Academy - the training infrastructure that powers Talvara's SDR pool - where she leads the design and delivery of the six-week structured commercial programme that every Talvara SDR completes before assessment.",
      'Alongside her work at ASA, Erica is the Founder of EVF Consulting and serves as Director of Sales at Sistas in Sales, a global community of over 10,000 women of colour focused on career growth and upskilling. Named one of the 100 Powerful Women in Sales 2023 by TalentMatched and Women in Sales, Erica leads talent, training, and partnerships at Talvara - ensuring the platform delivers not just revenue, but lasting commercial capability that clients keep.',
    ],
    linkedin: 'https://www.linkedin.com/in/erica-franklin',
  },
  {
    name: 'Name TBC',
    title: 'CTO',
    initials: 'CTO',
    image: '',
    imageFit: 'cover',
    bio: [
      'Bio coming soon.',
    ],
    linkedin: '',
  },
  {
    name: 'René Carayol MBE',
    title: 'Strategic Advisor — Leadership & Culture',
    initials: 'RC',
    image: '/team/rene-carayol.png',
    imageFit: 'cover',
    bio: [
      '30+ years coaching FTSE 100 / Fortune 500 CEOs. Board: PepsiCo · IPC Media · Marks & Spencer. His networks and counsel accelerate Talvara into institutional rooms.',
    ],
    linkedin: 'https://www.linkedin.com/in/renecarayol',
  },
]

const legalUpdated = 'May 17, 2026'

const legalPages = {
  privacy: {
    title: 'Privacy Policy',
    subtitle:
      'How Talvara collects, uses, shares, and protects personal information from website visitors, prospects, clients, and business contacts.',
    notice:
      'This policy explains how Talvara handles personal information when you visit the website, contact us, book a call, or engage with our services.',
    sections: [
      {
        heading: '1. Who We Are',
        body: [
          'Talvara is a managed revenue platform that deploys pre-assessed SDRs to B2B startups through AI-powered matching and human-led delivery.',
          `For privacy questions, contact us at ${CONTACT_EMAIL}.`,
        ],
      },
      {
        heading: '2. Information We Collect',
        body: [
          'Information you provide directly: first name, last name, email address, company, role or title, company stage, current outbound situation, message content, and any other information you choose to send through our forms or by email.',
          'Booking information: if you book a discovery call through Calendly, Calendly may collect scheduling details such as your name, email address, meeting time, timezone, and any information you add to the booking form.',
          'Business relationship information: notes from calls, proposal details, client requirements, ICP information, operational preferences, and communications related to Talvara services.',
          'Technical information: IP address, browser type, device information, pages visited, referring pages, approximate location, timestamps, and similar usage data collected through hosting, security, analytics, or cookie technologies if enabled.',
        ],
      },
      {
        heading: '3. How We Use Information',
        body: [
          'To respond to enquiries and evaluate whether Talvara is a fit for your outbound needs.',
          'To schedule and run discovery calls, onboarding discussions, pilot planning, and client communications.',
          'To prepare proposals, service scopes, SDR matching inputs, reporting structures, and operational recommendations.',
          'To operate, secure, maintain, and improve the website and Talvara services.',
          'To send relevant business communications where permitted, including follow-ups about Talvara, pilots, pricing, or resources. You can ask us to stop sending non-essential communications at any time.',
          'To comply with legal, tax, accounting, security, fraud prevention, and contractual obligations.',
        ],
      },
      {
        heading: '4. Legal Bases Where Applicable',
        body: [
          'Where UK GDPR, EU GDPR, or similar laws apply, we rely on one or more legal bases depending on context: consent, legitimate interests, performance of a contract or steps before entering a contract, compliance with legal obligations, and protection of our services and users.',
          'Our legitimate interests include responding to B2B enquiries, developing client relationships, operating the website, improving services, and protecting Talvara from misuse, provided those interests are not overridden by your rights.',
        ],
      },
      {
        heading: '5. Cookies and Analytics',
        body: [
          'The current website is designed as a marketing and enquiry site. If analytics, pixels, embedded media, or similar technologies are added, they may use cookies or comparable identifiers.',
          'Strictly necessary cookies may be used to operate the website. Non-essential analytics or marketing cookies are used only in line with applicable consent requirements.',
        ],
      },
      {
        heading: '6. How We Share Information',
        body: [
          'We may share information with service providers that help us operate the website and business, including hosting providers, form providers such as Google Forms, email providers, scheduling tools such as Calendly, CRM or pipeline tools, analytics providers if enabled, legal and accounting advisers, and security vendors.',
          'We may share information with Talvara personnel, contractors, or delivery partners where needed to evaluate, plan, provide, or manage services.',
          'We may disclose information if required by law, regulation, legal process, government request, or to protect the rights, safety, property, and security of Talvara, clients, candidates, or others.',
          'We do not sell personal information in the ordinary sense. If future marketing tools create a regulated "sale" or "sharing" under a specific privacy law, Talvara should update this policy and provide required choices before using those tools.',
        ],
      },
      {
        heading: '7. International Transfers',
        body: [
          'Talvara may work with clients, candidates, service providers, and infrastructure in different countries. Your information may be processed outside your country of residence.',
          'Where required, we will use appropriate safeguards for international transfers, such as contractual protections or other lawful transfer mechanisms.',
        ],
      },
      {
        heading: '8. Retention',
        body: [
          'We keep personal information only for as long as reasonably necessary for the purposes described in this policy, including responding to enquiries, managing business relationships, keeping business records, complying with legal obligations, resolving disputes, and enforcing agreements.',
          'If an enquiry does not become an active client relationship, we will normally keep enquiry and communication records for a reasonable business period unless a longer period is required or permitted by law.',
        ],
      },
      {
        heading: '9. Security',
        body: [
          'We use reasonable administrative, technical, and organisational measures designed to protect personal information. No website, email system, or internet transmission is completely secure, so we cannot guarantee absolute security.',
        ],
      },
      {
        heading: '10. Your Rights and Choices',
        body: [
          'Depending on where you live, you may have rights to access, correct, delete, restrict, object to, or receive a copy of your personal information. You may also have the right to withdraw consent where processing is based on consent.',
          `To exercise a privacy right, contact ${CONTACT_EMAIL}. We may need to verify your identity before responding.`,
          'You may unsubscribe from non-essential business communications by using the unsubscribe instructions where provided or by contacting us.',
        ],
      },
      {
        heading: '11. Third-Party Links',
        body: [
          'The website may link to or submit information through third-party websites or tools, including Google Forms, Calendly, and LinkedIn. Their privacy practices are governed by their own policies, not this policy.',
        ],
      },
      {
        heading: '12. Children',
        body: [
          'Talvara is a B2B website and is not directed to children. We do not knowingly collect personal information from children.',
        ],
      },
      {
        heading: '13. Changes to This Policy',
        body: [
          'We may update this policy from time to time. The updated version will be posted on this page with a new "Last updated" date.',
        ],
      },
      {
        heading: '14. Contact',
        body: [
          `Questions about this policy or Talvara privacy practices can be sent to ${CONTACT_EMAIL}.`,
        ],
      },
    ],
  },
  terms: {
    title: 'Terms of Service',
    subtitle:
      'The terms that govern use of the Talvara website and pre-contract interactions with Talvara.',
    notice:
      'These terms cover the website and early business interactions. Talvara pilots, managed SDR deployments, pricing, service levels, data processing, confidentiality, and commercial obligations are governed by a separate signed agreement or order form.',
    sections: [
      {
        heading: '1. Acceptance of These Terms',
        body: [
          'These Terms of Service apply to your access to and use of talvara.io and any related Talvara website pages, content, forms, and calls to action.',
          'By using the website, submitting an enquiry, or booking a call, you agree to these terms. If you do not agree, do not use the website.',
        ],
      },
      {
        heading: '2. About Talvara',
        body: [
          'Talvara is a managed revenue platform that deploys pre-assessed SDRs to B2B startups through AI-powered matching and human-led delivery.',
          'The website describes Talvara capabilities, process, pricing information, pilots, and related business materials. It is provided for general business information and lead enquiry purposes.',
        ],
      },
      {
        heading: '3. Website Use',
        body: [
          'You may use the website only for lawful business purposes and in accordance with these terms.',
          'You must not misuse the website, attempt unauthorised access, interfere with security features, scrape content at scale, upload malicious code, impersonate another person, or use the website in a way that could damage Talvara, users, candidates, clients, or service providers.',
        ],
      },
      {
        heading: '4. Enquiries and Discovery Calls',
        body: [
          'Submitting a form or booking a discovery call does not create a client relationship, employment relationship, agency relationship, partnership, or obligation for Talvara to provide services.',
          'Talvara may decline, pause, or stop discussions where we believe there is no appropriate fit, incomplete information, misuse, conflict, or operational concern.',
        ],
      },
      {
        heading: '5. Services and Separate Agreements',
        body: [
          'Any Talvara 90-day pilot, managed SDR deployment, candidate matching, reporting, coaching, portal access, pricing, replacement commitment, or related commercial service must be confirmed in a separate written agreement, order form, statement of work, or signed proposal.',
          'If there is a conflict between these website terms and a signed client agreement, the signed client agreement controls for the services it covers.',
        ],
      },
      {
        heading: '6. Pricing and Website Information',
        body: [
          'Website pricing, timelines, case studies, testimonials, statistics, and service descriptions are provided for general information and may change before a contract is signed.',
          'Talvara aims to keep website information accurate, but we do not guarantee that all content is complete, current, or error-free.',
        ],
      },
      {
        heading: '7. No Guaranteed Outcomes from Website Use',
        body: [
          'The website may describe intended process, pilot structure, outbound timing, and revenue readiness standards. These descriptions do not guarantee any specific revenue, pipeline, meeting, hiring, conversion, or commercial outcome.',
          'Any performance commitments must be stated in a signed Talvara agreement.',
        ],
      },
      {
        heading: '8. Intellectual Property',
        body: [
          'The website and its content, including copy, design, graphics, structure, brand assets, logos, trade names, methodology descriptions, and the Revenue Readiness Score concept, are owned by Talvara or its licensors unless otherwise stated.',
          'You may view the website for your internal business evaluation. You may not copy, reproduce, modify, distribute, resell, or create derivative works from Talvara content without written permission.',
        ],
      },
      {
        heading: '9. Third-Party Services and Links',
        body: [
          'The website may link to or embed third-party services, including Calendly, LinkedIn, form providers, analytics tools, or other external websites.',
          'Talvara is not responsible for third-party websites, policies, availability, content, or practices. Your use of third-party services is governed by their terms and policies.',
        ],
      },
      {
        heading: '10. Confidentiality of Information You Submit',
        body: [
          'Please do not submit highly confidential, sensitive, regulated, or proprietary information through the website form unless Talvara has agreed appropriate terms with you.',
          'Information submitted through forms or email will be handled in line with our Privacy Policy, but website submissions alone do not create a mutual non-disclosure agreement.',
        ],
      },
      {
        heading: '11. Disclaimers',
        body: [
          'The website is provided on an "as is" and "as available" basis. To the fullest extent permitted by law, Talvara disclaims warranties of merchantability, fitness for a particular purpose, non-infringement, availability, and accuracy.',
          'Nothing in these terms excludes or limits liability that cannot be excluded or limited under applicable law.',
        ],
      },
      {
        heading: '12. Limitation of Liability',
        body: [
          'To the fullest extent permitted by law, Talvara will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, or for lost profits, lost revenue, lost data, business interruption, or loss of goodwill arising from use of the website.',
          'To the fullest extent permitted by law, Talvara total liability arising from website use will not exceed $100 or the minimum amount permitted by applicable law, whichever is greater.',
        ],
      },
      {
        heading: '13. Indemnity',
        body: [
          'You agree to indemnify and hold Talvara harmless from claims, losses, liabilities, damages, costs, and expenses arising from your misuse of the website, violation of these terms, infringement of rights, or unlawful conduct.',
        ],
      },
      {
        heading: '14. Changes to the Website and Terms',
        body: [
          'Talvara may update, suspend, or discontinue any part of the website at any time.',
          'We may update these terms from time to time. The updated version will be posted on this page with a new "Last updated" date.',
        ],
      },
      {
        heading: '15. Governing Law',
        body: [
          'Unless a signed client agreement says otherwise, these website terms are governed by the laws of England and Wales, and the courts of England and Wales will have jurisdiction, subject to any mandatory rights that apply in your location.',
        ],
      },
      {
        heading: '16. Contact',
        body: [
          `Questions about these terms can be sent to ${CONTACT_EMAIL}.`,
        ],
      },
    ],
  },
}

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .replace('.', '')
    .slice(0, 2)
    .toUpperCase()
}

function isInternalHref(href) {
  return href.startsWith('/')
}

function goTo(href) {
  const [path, hash] = href.split('#')
  window.history.pushState({}, '', href)
  window.dispatchEvent(new PopStateEvent('popstate'))
  if (hash) {
    requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
    })
  } else if (path) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function animateCount(el, duration = 1200) {
  if (el.dataset.countAnimated === 'true') return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const target = Number(el.dataset.countTarget)
  if (Number.isNaN(target)) return

  el.dataset.countAnimated = 'true'
  const prefix = el.dataset.countPrefix || ''
  const suffix = el.dataset.countSuffix || ''
  const start = performance.now()

  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1)
    const eased = 1 - (1 - progress) ** 4
    const value = Math.floor(eased * target)

    el.textContent = `${prefix}${value.toLocaleString()}${suffix}`

    if (progress < 1) requestAnimationFrame(update)
  }

  requestAnimationFrame(update)
}

function prepareWordReveal(el) {
  if (el.dataset.wordRevealReady === 'true') return

  const text = el.textContent?.replace(/\s+/g, ' ').trim()
  if (!text) return

  el.textContent = ''
  text.split(' ').forEach((word, index) => {
    const wrap = document.createElement('span')
    const inner = document.createElement('span')

    wrap.className = 'word-wrap'
    inner.className = 'word'
    inner.textContent = word
    inner.style.transitionDelay = `${Math.min(index, 12) * 50}ms`

    wrap.appendChild(inner)
    el.appendChild(wrap)

    if (index < text.split(' ').length - 1) {
      el.appendChild(document.createTextNode(' '))
    }
  })

  el.dataset.wordRevealReady = 'true'
}

function App() {
  const [path, setPath] = useState(window.location.pathname)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    document.documentElement.classList.add('animations-ready')
    const onScroll = () => setIsScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      document.documentElement.classList.remove('animations-ready')
    }
  }, [])

  useEffect(() => {
    document.querySelectorAll('[data-word-reveal]').forEach((el) => prepareWordReveal(el))

    const items = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            entry.target
              .querySelectorAll('[data-word-reveal]')
              .forEach((el) => el.classList.add('words-visible'))
            entry.target
              .querySelectorAll('[data-count-target]')
              .forEach((el) => animateCount(el))
          }
        })
      },
      { threshold: 0.12 },
    )
    items.forEach((item) => {
      const siblings = Array.from(item.parentElement?.children || []).filter((child) =>
        child.matches?.('[data-reveal]'),
      )
      const index = Math.max(siblings.indexOf(item), 0)
      item.style.setProperty('--reveal-delay', `${Math.min(index, 8) * 70}ms`)
      observer.observe(item)
    })
    return () => observer.disconnect()
  }, [path])

  useEffect(() => {
    const supportsFinePointer = window.matchMedia('(pointer: fine)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!supportsFinePointer || prefersReducedMotion) return undefined

    const cards = Array.from(document.querySelectorAll('.magnetic-card'))
    const cleanups = cards.map((card) => {
      const onMove = (event) => {
        const rect = card.getBoundingClientRect()
        const x = (event.clientX - rect.left) / rect.width - 0.5
        const y = (event.clientY - rect.top) / rect.height - 0.5
        card.style.transform = `perspective(720px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-4px)`
      }
      const onLeave = () => {
        card.style.transform = ''
      }

      card.addEventListener('mousemove', onMove)
      card.addEventListener('mouseleave', onLeave)

      return () => {
        card.removeEventListener('mousemove', onMove)
        card.removeEventListener('mouseleave', onLeave)
      }
    })

    return () => cleanups.forEach((cleanup) => cleanup())
  }, [path])

  const page = useMemo(() => {
    switch (path) {
      case '/how-it-works':
        return <HowItWorks />
      case '/pricing':
        return <Pricing />
      case '/about':
        return <About />
      case '/contact':
        return <Contact />
      case '/privacy-policy':
        return <Legal type="privacy" />
      case '/terms-of-service':
        return <Legal type="terms" />
      default:
        return <Home />
    }
  }, [path])

  return (
    <div className="site-shell">
      <Header
        path={path}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        isScrolled={isScrolled}
      />
      <main>{page}</main>
      <Footer />
    </div>
  )
}

function Link({ href, children, className = '', onClick, ...props }) {
  const handleClick = (event) => {
    if (isInternalHref(href)) {
      event.preventDefault()
      goTo(href)
    }
    onClick?.(event)
  }

  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
      {...(!isInternalHref(href) ? { target: '_blank', rel: 'noreferrer' } : {})}
      {...props}
    >
      {children}
    </a>
  )
}

function Header({ path, menuOpen, setMenuOpen, isScrolled }) {
  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <nav className="nav-wrap" aria-label="Primary navigation">
        <Link
          href="/"
          className="brand"
          aria-label="Talvara home"
          onClick={() => setMenuOpen(false)}
        >
          <img className="brand-logo" src="/talvara-logo.svg" alt="" aria-hidden="true" />
        </Link>
        <button
          className="menu-button"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg
            className="menu-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M5 8h14M5 16h14" />
          </svg>
        </button>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={!link.href.includes('#') && path === link.href ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <Button as={Link} href={CALENDLY_URL} className="nav-cta">
          Start Your Pilot
        </Button>
      </nav>
    </header>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <Link href="/" className="footer-brand">
            <img className="brand-logo footer-logo" src="/talvara-logo.svg" alt="" aria-hidden="true" />
          </Link>
          <p>Talent sourced across Africa. Active cohorts: Nigeria & Ghana.</p>
        </div>
        <div className="footer-links">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
        <div className="footer-links">
          <a href="https://www.linkedin.com/company/talvara" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-of-service">Terms of Service</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {CURRENT_YEAR} Talvara. All rights reserved.</span>
        <span>{CONTACT_EMAIL}</span>
      </div>
    </footer>
  )
}

function Eyebrow({ children, dark = false }) {
  const label = typeof children === 'string' ? children.replaceAll(' - ', ' · ') : children

  return <p className={`eyebrow ${dark ? 'on-dark' : ''}`}>{label}</p>
}

function ButtonRow({ children }) {
  return <div className="button-row">{children}</div>
}

function CTAButton({ href = CALENDLY_URL, children, variant = 'primary' }) {
  return (
    <Button as={Link} href={href} className={`button ${variant}`}>
      {children}
    </Button>
  )
}

function SectionIntro({ eyebrow, title, children, align = 'left', dark = false }) {
  return (
    <div className={`section-intro ${align} ${dark ? 'dark' : ''}`} data-reveal>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <h2 data-word-reveal>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  )
}

function RRSBadge({ score }) {
  return (
    <Badge className="rrs-badge" variant={score ? 'gold' : 'muted'}>
      {score ? `RRS ${score}` : 'Score pending'}
    </Badge>
  )
}

function Avatar({ name, custom, src, fit, style, alt }) {
  if (src) {
    return (
      <img
        className={`avatar avatar-image ${fit === 'contain' ? 'avatar-image-contain' : ''}`}
        src={src}
        alt={alt ?? `${name} profile`}
        loading="lazy"
        style={style}
      />
    )
  }

  return <div className="avatar">{custom || initials(name)}</div>
}

function Home() {
  return (
    <>
      <section className="hero-section dark-section">
        <div className="hero-grid">
          <div className="hero-copy" data-reveal>
            <Eyebrow dark>MANAGED REVENUE PLATFORM · AI-POWERED MATCHING · HUMAN-LED DELIVERY</Eyebrow>
            <h1>
              <span className="hero-main-line" data-word-reveal>
                Talent that <br className="mobile-only" />arrives ready.
              </span>
              <span className="hero-tagline">AI-matched. Human-led. Pipeline from day 12.</span>
            </h1>
            <p>
              Our AI ranks and matches. Our humans decide, deploy, and stay accountable.
              Pre-assessed SDRs deployed in 7 days, reporting pipeline from day 12.
              You don't manage them. We do.
            </p>
            <div className="hero-pill-row" aria-label="Talvara platform model">
              {heroPills.map((pill) => (
                <span key={pill}>{pill}</span>
              ))}
            </div>
          </div>
          <ButtonRow>
            <CTAButton>Start Your 90-Day Pilot</CTAButton>
            <CTAButton href="/how-it-works" variant="outline-dark">
              See How It Works
            </CTAButton>
          </ButtonRow>
          <HeroSystemRail />
        </div>
      </section>
      <StatBar />
      <LogoBar />
      <ProblemSection />
      <PlatformOverview />
      <RRSSection />
      <HowPreview />
      <PortalShowcase />
      <SDRDashboardShowcase />
      <Testimonials />
      <PartnersSection />
      <AIHumanSection />
      <PilotCTA />
    </>
  )
}

function StatBar() {
  return (
    <section className="stat-bar" aria-label="Talvara platform stats">
      {stats.map(([value, label]) => (
        <div className="stat-card metric-card motion-card" key={value} data-reveal>
          <strong>{value}</strong>
          <span>{label}</span>
          <em aria-hidden="true" />
        </div>
      ))}
    </section>
  )
}

function LogoBar() {
  return (
    <section className="logo-section">
      <div className="logo-section-copy">
        <Eyebrow>Trusted by growth-stage companies</Eyebrow>
        <p>Client and partner logos from confirmed Talvara proof points.</p>
      </div>
      <div className="logo-track" aria-label="Client and partner logos">
        {logos.map((logo) => (
          <span className={`wordmark logo-card ${logo.invert ? 'logo-invert' : ''}`} key={logo.name}>
            <img src={logo.src} alt={logo.name} loading="lazy" />
          </span>
        ))}
      </div>
    </section>
  )
}

function ProblemSection() {
  return (
    <section className="section cream problem-section">
      <div className="problem-layout">
        <div>
          <SectionIntro
            eyebrow="The Real Cost of In-House Hiring"
            title="Most founders realise too late what an SDR actually costs."
          >
            You post the role. You interview. You negotiate. You onboard. You wait
            through ramp. By the time your SDR makes their first outbound call,
            you're 12 weeks in, out of pocket, and still without a booked meeting.
          </SectionIntro>
          <div className="copy-stack">
            <p>
              A fully loaded UK SDR costs GBP52,000-GBP68,000 a year - before tools,
              employer NI, recruitment fees, and the management hours nobody budgets
              for. A US SDR runs $110,000-$160,000 fully loaded annually. The headline
              salary is never the real number.
            </p>
            <p>
              Most founders try Upwork or LinkedIn first. They spend weeks on it, get
              inconsistent results, and burn time they don't have. That's usually what
              brings them to Talvara.
            </p>
          </div>
          <p className="operator-note">
            We remove the cost, the ramp, and the risk - and replace it with a
            managed, assessed, accountable SDR who is outbound live by day 12.
          </p>
          <div className="change-row" aria-label="What Talvara changes">
            <span>No hiring process</span>
            <span>No SDR management</span>
            <span>Outbound live by day 12</span>
          </div>
        </div>
        <div className="comparison-box feature-card motion-card" data-reveal>
          <div className="comparison-heading">
            <strong>90-day cost comparison</strong>
            <span>Route, cost, and time-to-outbound</span>
          </div>
          {[
            ['In-house', 'UK in-house 90 days', '$25k-$36k+'],
            ['In-house', 'US in-house 90 days', '$27k-$36k+'],
            ['In-house', 'In-house time to first outbound', '8-12 weeks'],
            ['Talvara', 'Talvara 90-day pilot total', '$7,500'],
            ['Talvara', 'Talvara time to first outbound', 'Day 12'],
            ['Talvara', 'Saving vs UK in-house', '$28,500+'],
          ].map(([group, label, value]) => (
            <div key={label} className={group === 'Talvara' ? 'talvara-row' : ''}>
              <em>{group}</em>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PlatformOverview() {
  const entities = [
    {
      title: 'Africa Sales Academy - Step 01',
      subtitle: 'Talent sourcing and training arm',
      body: "Open applications across Africa. Candidates screened for commercial aptitude, communication, and coachability. Those who pass enter the six-week structured training programme. Roughly 25-35% don't advance to assessment. That's the filter - not a failure of the programme.",
      logo: '/logos/africa-sales-academy.png',
    },
    {
      title: 'MySalesLMS - Enabled by ASA',
      subtitle: 'Proprietary eLearning platform - built for ASA learners',
      body: 'Not a third-party tool. Ours. MySalesLMS delivers the full six-week curriculum - prospecting, communication, objection handling, CRM fundamentals, and commercial thinking. Candidates learn at their own pace, tracked and measured throughout. Trainers review and give feedback on every module.',
      logo: '/logos/mysaleslms-alt.png',
    },
    {
      title: 'Talvara - Step 02 onwards',
      subtitle: 'The managed revenue platform - the investable asset',
      body: 'The platform, the RRS IP, the performance data, the client relationships, the Client Portal, and the SDR Dashboard. Every SDR who reaches a client has passed through ASA, been trained on MySalesLMS, and cleared the Revenue Readiness Score. This is what grows, scales, and attracts investment.',
      logo: '/talvara-logo.svg',
    },
  ]

  return (
    <section className="section platform-section">
      <div className="platform-composition">
        <SectionIntro
          eyebrow="Three Entities. One Outcome."
          title="We built the entire infrastructure. You only ever see the results."
        >
          Talvara is not a standalone service. It is the visible layer of a fully
          integrated platform - built on three connected entities, each with a
          distinct role. The Africa Sales Academy finds and trains the talent.
          MySalesLMS delivers the structured curriculum. Talvara deploys, manages,
          and stays accountable for results. The client only ever interacts with
          Talvara. This is not an agency with a training partner. It is an
          integrated platform with owned infrastructure underneath it.
        </SectionIntro>
        <div className="entity-grid">
          {entities.map((entity, index) => (
            <Card
              as="article"
              className="entity-card entity-stack-card feature-card motion-card"
              key={entity.title}
              data-reveal
            >
              <div className="card-media entity-logo-media">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <img src={entity.logo} alt={`${entity.title} logo`} loading="lazy" />
              </div>
              <span className="card-label">{entity.subtitle}</span>
              <h3>{entity.title}</h3>
              <p>{entity.body}</p>
              <div className="card-footer-zone">
                <span className="card-meta-dot" aria-hidden="true" />
                <span className="card-action-arrow" aria-hidden="true" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function RRSSection({
  eyebrow = 'The Revenue Readiness Score - Talvara Core IP',
  title = 'No SDR reaches a client without clearing the bar.',
  platform = false,
}) {
  return (
    <section className="section dark-section rrs-section" id="rrs">
      <div className="split-layout align-start">
        <SectionIntro
          dark
          eyebrow={eyebrow}
          title={title}
        >
          {platform
            ? "Every ASA graduate sits the Revenue Readiness Score - Talvara's proprietary assessment framework. Five weighted commercial competency categories, scored independently by our AI engine and reviewed by our team before any result is acted on. The score is shared with you at shortlist delivery alongside intro videos and sample outreach sequences. AI ranks. Humans decide."
            : "The Revenue Readiness Score is Talvara's proprietary assessment framework - five weighted commercial competency categories that every ASA graduate must pass before entering the Talvara SDR pool. The score is shared with you at shortlist delivery alongside intro videos and sample outreach sequences, so your decision is grounded in evidence, not CV polish."}
        </SectionIntro>
        <div className="rrs-panel feature-card motion-card" data-reveal>
          <div className="rrs-summary">
            <span>Minimum deployment threshold</span>
            <strong>RRS 7.0+</strong>
            <p>
              Overall &gt;= 7.0. No individual category below 6.0. No exceptions.
              Candidates who don't clear the threshold don't enter the pool -
              regardless of how well they performed in training.
            </p>
          </div>
          {rrsAreas.map(([area, weight]) => (
            <div className="rrs-bar" key={area}>
              <div>
                <span>{area}</span>
                <strong>{weight}</strong>
              </div>
              <div className="bar-track">
                <span style={{ width: weight }} />
              </div>
            </div>
          ))}
          <div className="threshold">
            Overall &gt;= 7.0 - No individual category below 6.0 - No exceptions. This bar does not move.
          </div>
        </div>
      </div>
    </section>
  )
}

function HowPreview() {
  const steps = [
    [
      '01',
      'Africa Sales Academy',
      'Open applications across Africa. Candidates screened for commercial aptitude and coachability before the six-week programme delivered through MySalesLMS.',
    ],
    [
      '02',
      'Revenue Readiness Score',
      'Every ASA graduate sits Talvara\'s assessment. Only candidates scoring >=7.0 overall - with no category below 6.0 - enter the Talvara SDR pool.',
    ],
    [
      '03',
      'AI-Ranked, Human-Reviewed Match',
      'Your ICP, market, and communication requirements are mapped. AI surfaces the strongest fits; a human reviews every result before 3-5 candidates are presented.',
    ],
    [
      '04',
      '7-Day Deployment',
      'SDR privately briefed on your product, ICP, competitive landscape, tools, and KPIs. Setup and prospect review happen first; outbound goes live by Day 12.',
    ],
    [
      '05',
      'Performance Layer + Client Portal',
      'Weekly pipeline reports every Monday. Coaching sprints triggered by data. Your live Client Portal gives real-time visibility from day one.',
    ],
  ]

  return (
    <section className="section cream">
      <SectionIntro
        align="center"
        eyebrow="How It Works - 5-Step Platform"
        title="From open application to live pipeline. Every step owned by Talvara."
      >
        AI maps your requirements and ranks candidates. Humans review every result
        and make every decision. Because pipeline is too important to hand to an
        algorithm.
      </SectionIntro>
      <div className="step-grid compact">
        {steps.map(([num, title, body]) => (
          <Card as="article" className="step-card compact-list-card motion-card" key={num} data-reveal>
            <span className="card-thumb">{num}</span>
            <div className="card-copy">
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          </Card>
        ))}
      </div>
      <div className="center-action">
        <CTAButton href="/how-it-works" variant="dark">
          See the Full Process
        </CTAButton>
      </div>
    </section>
  )
}

function PortalShowcase({ platform = false }) {
  return (
    <section className="section">
      <div className="split-layout">
        <div>
          <SectionIntro
            eyebrow={platform ? 'The Client Portal - Your Pipeline Intelligence View' : 'The Client Portal - Pipeline Intelligence'}
            title={platform ? 'Real-time visibility. AI-generated insights. No chasing.' : 'Your pipeline. Live. Every day.'}
          >
            You don't wait until Monday to know what's happening. The Talvara Client
            Portal gives you real-time visibility into your SDR's performance -
            calls made, meetings booked, pipeline value attributed, and RR Score -
            from the moment outbound starts.
          </SectionIntro>
          <div className="copy-stack portal-copy" data-reveal>
            <p>
              You can see whether an SDR is on track, watch emerging performance
              signals, request additional SDRs, and monitor the route to Day 90
              conversion.
            </p>
            <p>
              The portal also surfaces AI-generated insights - which ICPs are
              responding, where conversations stall, where messaging is improving,
              and when coaching is needed.
            </p>
          </div>
        </div>
        <div className="portal-mock feature-card motion-card magnetic-card" data-reveal>
          <div className="mock-header">
            <span>Talvara / Pipeline</span>
            <strong>Week 04</strong>
          </div>
          <div className="mock-kpis">
            <div><span>Calls</span><strong>312</strong></div>
            <div><span>Meetings</span><strong>18</strong></div>
            <div><span>RR Score</span><strong>8.2</strong></div>
          </div>
          <div className="mock-table">
            {['Amaka Okafor', 'Joy Essien', 'Ruby Boateng'].map((name, i) => (
              <div key={name}>
                <span>{name}</span>
                <em>{i === 1 ? 'Watch' : 'On Track'}</em>
              </div>
            ))}
          </div>
          <ul className="feature-list compact-feature-list">
            {portalFeatures.slice(0, 6).map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function SDRDashboardShowcase() {
  return (
    <section className="section cream dashboard-section">
      <div className="split-layout reverse">
        <div className="dashboard-panel feature-card motion-card" data-reveal>
          <div className="mock-header">
            <span>SDR Dashboard</span>
            <strong>Today</strong>
          </div>
          <div className="dashboard-score">
            <span>RR Score</span>
            <strong>7.5</strong>
            <em>On Track</em>
          </div>
          <ul className="feature-list">
            {dashboardFeatures.slice(0, 7).map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
        <div>
          <SectionIntro
            eyebrow="The SDR Dashboard - Their Daily Command Centre"
            title="Your SDR knows exactly what to do. Every single day."
          >
            Every deployed Talvara SDR operates from their own command centre - a
            daily dashboard that tracks tasks, KPIs, prospect queue, and RR Score in
            real time.
          </SectionIntro>
          <div className="copy-stack portal-copy" data-reveal>
            <p>
              There is no ambiguity about what needs to happen today. No slippage
              between sessions. No chasing for activity logs.
            </p>
            <p>
              The dashboard connects performance expectations, daily execution, and
              coaching triggers in one place - so the SDR knows what to do, Talvara
              knows when to intervene, and you see the output.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const scrollingTestimonials = [...testimonials, ...testimonials]

  return (
    <section className="section cream testimonial-section">
      <div className="review-row" data-reveal>
        <span>Client proof</span>
        <strong>Results that speak for themselves.</strong>
      </div>
      <SectionIntro align="center" eyebrow="What Our Clients Say" title="Results that speak for themselves." />
      <div className="testimonial-marquee" aria-label="Client testimonials">
        <div className="testimonial-track">
        {scrollingTestimonials.map((item, index) => (
          <Card
            as="article"
            className={`testimonial quote-card motion-card ${index === 0 ? 'featured' : ''}`}
            key={`${item.name}-${index}`}
            data-reveal
            aria-hidden={index >= testimonials.length ? 'true' : undefined}
          >
            <span className="quote-mark">"</span>
            <p>{item.quote}</p>
            <div className="attribution">
              {item.image ? (
                <img className="testimonial-avatar" src={item.image} alt={`${item.name} profile`} loading="lazy" />
              ) : (
                <span className="mini-logo" aria-hidden="true">{item.logo}</span>
              )}
              <div>
                <strong>{item.name}</strong>
                <span>{item.title} - {item.company}</span>
              </div>
            </div>
          </Card>
        ))}
        </div>
      </div>
    </section>
  )
}

function PartnersSection() {
  return (
    <section className="section partners-section">
      <SectionIntro
        align="center"
        eyebrow="Our Partners"
        title="Built on trusted partnerships."
      >
        We work with a network of partners who share our commitment to building
        commercial talent pipelines that perform - from sales tech platforms to
        accelerators, diaspora networks, and fractional sales leaders.
      </SectionIntro>
      <div className="partner-grid">
        {partners.map(([name, description, logo]) => (
          <Card as="article" className="partner-card compact-list-card motion-card" key={name} data-reveal>
            <span
              className={`partner-logo ${
                logo.includes('talentmatched') || logo.includes('self-science-lab') ? 'partner-logo-invert' : ''
              }`}
            >
              <img src={logo} alt={`${name} logo`} loading="lazy" />
            </span>
            <div>
              <h3>{name}</h3>
              <p>{description}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}

function AIHumanSection() {
  return (
    <section className="section dark-section ai-human-section">
      <div className="split-layout align-start">
        <SectionIntro
          dark
          eyebrow="Our Approach"
          title="The AI SDR failed. The human layer is the scarce resource."
        >
          The most-funded autonomous AI SDR raised $74 million. It could not
          retain its own customers and reverted to a hybrid model by 2026. The
          market proved what experienced sales leaders already knew - objection
          handling, trust, contextual reading, and relationship building cannot be
          automated. They require human judgment.
        </SectionIntro>
        <Card className="approach-card feature-card motion-card" data-reveal>
          <p>
            Talvara is built on this reality. We use AI where it belongs - matching,
            scoring, ranking, surfacing insights, prioritising prospect queues. We
            put humans where it matters - deciding, deploying, coaching, and owning
            the outcome.
          </p>
          <p>
            The result is a platform that moves faster than a traditional agency and
            performs better than a fully automated solution. This is not a compromise.
            It is the right model.
          </p>
        </Card>
      </div>
    </section>
  )
}

function PilotCTA() {
  return (
    <section className="cta-band dark-section" data-reveal>
        <h2 data-word-reveal>Start with 90 days. Exit cleanly if it doesn't work.</h2>
        <p>
          $7,500 total. AI-matched candidates, human-managed delivery. Live Client
          Portal from day one. Weekly reporting from day 12. Free replacement
          guarantee. At Day 90 - convert or walk away. The data makes the decision,
          not a sales pitch.
        </p>
        <ButtonRow>
          <CTAButton>Book a Discovery Call</CTAButton>
          <CTAButton href="/pricing" variant="ghost">View Pricing</CTAButton>
        </ButtonRow>
        <span className="cta-note">No automated sequences. A person responds to every enquiry within 24 hours.</span>
    </section>
  )
}

function HowItWorks() {
  const entities = [
    [
      'Africa Sales Academy - Step 01',
      "The talent sourcing and training arm. Separate entity. Its own brand, its own mission - creating structured commercial career pathways across Africa. ASA feeds Talvara but is not owned by Talvara. Open applications across Africa. Candidates screened for commercial aptitude, communication, and coachability before entering the programme. Roughly 25-35% don't advance to assessment. That's the filter - not a failure of the programme.",
    ],
    [
      'MySalesLMS - Enabled by ASA',
      "Talvara's proprietary eLearning platform - built specifically for ASA learners. Not a third-party tool. Ours. MySalesLMS delivers the full six-week curriculum: prospecting methodology, communication frameworks, objection handling, CRM fundamentals, and commercial thinking for B2B environments. Candidates learn at their own pace, tracked and measured throughout. Trainers review and give feedback on every module.",
    ],
    [
      'Talvara - Step 02 onwards',
      'The managed revenue platform - the investable asset. The platform, the RRS IP, the performance data, the client relationships, the Client Portal, and the SDR Dashboard. Every SDR who reaches a client has passed through ASA, been trained on MySalesLMS, and cleared the Revenue Readiness Score. This is what grows, scales, and attracts investment.',
    ],
  ]
  const curriculum = [
    'Prospecting methodology and ICP identification',
    'Multi-channel communication frameworks',
    'Objection handling and live call practice',
    'CRM fundamentals and pipeline hygiene',
    'Commercial thinking and deal qualification',
  ]
  const fullSteps = [
    [
      'Step 03 - AI-Ranked, Human-Reviewed Match',
      'Your requirements are mapped across 14 criteria - ICP, market, buyer profile, communication style, tools, urgency, and more. Our AI matching engine cross-references the full assessed SDR pool and surfaces the strongest candidates. Our team reviews every result against your discovery call notes before 3-5 best-fit candidates are presented.',
    ],
    [
      'Step 04 - Deployment Setup + Outbound Launch',
      'Contract signed. The SDR receives a private briefing on your product, ICP, competitive landscape, buyer personas, cultural nuances, and tools setup. Talvara reviews the prospect list before a single name is touched; outbound goes live by Day 12.',
    ],
    [
      'Step 05 - Performance Layer + Client Portal',
      'From day one, you have access to the Talvara Client Portal - live SDR performance data, calls made, meetings booked, pipeline value, and RR Score in real time. Every Monday a full pipeline report lands automatically. If metrics dip, Talvara diagnoses and intervenes via a coaching sprint.',
    ],
  ]

  return (
    <>
      <PageHero
        eyebrow="The Platform"
        title="Three entities. Five steps. One outcome."
        subtitle="From open application in Africa to live pipeline in your CRM - every step is owned, structured, and accountable. Here's exactly how the Talvara platform works end to end."
        visual={<InfrastructureVisual />}
      />
      <section className="section" id="platform">
        <SectionIntro
          align="center"
          eyebrow="How It All Connects"
          title="Built in layers. Invisible to you. Essential to everything."
        >
          Talvara is the client-facing layer of a three-entity infrastructure -
          each with a distinct role, each essential to the outcome. Understanding
          how they connect explains why Talvara can make guarantees that a
          traditional agency cannot. This is not an agency with a training partner.
          It is an integrated platform with owned infrastructure underneath it.
        </SectionIntro>
        <div className="entity-grid page-entity-grid">
          {entities.map(([title, body], index) => (
            <Card as="article" className="entity-card feature-card motion-card" key={title} data-reveal>
              <span className="card-thumb">{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </Card>
          ))}
        </div>
      </section>
      <section className="section cream">
        <div className="split-layout align-start">
          <SectionIntro
            eyebrow="Step 01 - Africa Sales Academy - Powered by MySalesLMS"
            title="Six weeks. Structured. Tracked. Filtered."
          >
            Every Talvara SDR begins at the Africa Sales Academy. The six-week
            programme is delivered through MySalesLMS - Talvara's proprietary
            eLearning platform - with live sessions, recorded roleplays, written
            exercises, and daily activity logs. Trainers review and give feedback
            on every module. Only candidates who demonstrate commercial readiness
            progress to the Revenue Readiness Score.
          </SectionIntro>
          <Card className="curriculum-card feature-card motion-card" data-reveal>
            <h3>Curriculum</h3>
            <ol>
              {curriculum.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
            <p>
              Applications are open across Africa - location is not a barrier to
              entry. Active cohorts are currently running in Nigeria and Ghana,
              with Kenya launching in 2027.
            </p>
          </Card>
        </div>
      </section>
      <RRSSection
        eyebrow="Step 02 - Revenue Readiness Score - Talvara Core IP"
        title="The assessment that separates readiness from potential."
        platform
      />
      <section className="section" id="process">
        <SectionIntro
          align="center"
          eyebrow="Steps 03-05 - Match - Deploy - Perform"
          title="AI ranks. Humans decide. Data drives everything after."
        />
        <div className="timeline platform-steps">
          {fullSteps.map(([title, body], index) => (
            <Card as="article" className="timeline-card compact-list-card motion-card" key={title} data-reveal>
              <span className="card-thumb">{String(index + 3).padStart(2, '0')}</span>
              <div className="card-copy">
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>
      <PortalShowcase platform />
      <SDRDashboardShowcase />
      <section className="section cream">
        <SectionIntro
          align="center"
          eyebrow="90-Day Pilot Timeline"
          title="The first 90 days are sequenced before the SDR starts."
        />
        <div className="timeline-table feature-card motion-card" data-reveal>
          {[
            ['Week 0', 'Onboarding, ICP, messaging, tools, KPIs agreed in writing'],
            ['Days 1-7', 'SDR briefed, tools setup, prospect list built and reviewed by Talvara'],
            ['Day 12', 'Outbound live: calls, emails, LinkedIn, CRM logging starts, Client Portal active'],
            ['Weeks 3-8', 'Pipeline building, Monday reports, coaching sprints if metrics dip'],
            ['Day 60', 'Mid-pilot review, data check, adjust messaging or ICP if needed'],
            ['Days 61-90', 'Final sprint, pipeline closing, playbook foundation built'],
            ['Day 90', 'Convert to $3,375/mo min 1-year - or exit cleanly. Your data, your call.'],
          ].map(([milestone, detail]) => (
            <div key={milestone}>
              <strong>{milestone}</strong>
              <span>{detail}</span>
            </div>
          ))}
        </div>
      </section>
      <PilotCTA />
    </>
  )
}

function Pricing() {
  return (
    <>
      <PageHero
        className="pricing-hero"
        eyebrow="Pricing"
        title="Four offers. Zero ambiguity."
        subtitle="No hidden costs. No surprise recruitment fees. Every offer includes the Revenue Readiness Score, AI-powered matching, managed deployment, Client Portal access, and the outbound playbook on exit."
        visual={<PricingSignalVisual />}
      />
      <section className="section pricing-offer-section">
        <div className="offer-grid">
          {pricingOffers.map((offer) => (
            <Card
              as="article"
              className={`offer-card feature-card motion-card ${offer.featured ? 'featured-offer' : ''}`}
              key={offer.title}
              data-reveal
            >
              <span className="card-label">{offer.eyebrow}</span>
              <h2>{offer.title}</h2>
              <strong>{offer.price}</strong>
              <em>{offer.meta}</em>
              <p>{offer.body}</p>
              <p className="best-for">{offer.bestFor}</p>
              {offer.featured && <CTAButton>Start Your 90-Day Pilot</CTAButton>}
            </Card>
          ))}
        </div>
      </section>
      <section className="section">
        <SectionIntro
          align="center"
          eyebrow="Comparison"
          title="No other platform owns the full infrastructure."
        >
          Training, assessment IP, Client Portal, and SDR Dashboard are built into
          Talvara. That is what makes the replacement guarantee possible.
        </SectionIntro>
        <div className="comparison-table feature-card motion-card" data-reveal>
          <div className="comparison-table-head">
            <span>Feature</span>
            <span>Talvara</span>
            <span>Place-&-Exit Agency</span>
            <span>In-House</span>
            <span>Upwork / BPO</span>
          </div>
          {comparisonRows.map((row) => (
            <div className="comparison-table-row" key={row[0]}>
              {row.map((cell, index) => (
                <span key={`${row[0]}-${cell}`} className={index === 1 ? 'talvara-cell' : ''}>
                  {cell}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>
      <section className="section cream">
        <SectionIntro align="center" eyebrow="FAQ" title="Straight answers before the call." />
        <Accordion className="faq-list">
          {pricingFaqs.map(([question, answer]) => (
            <AccordionItem key={question} title={question} data-reveal>
              <p>{answer}</p>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
      <PilotCTA />
    </>
  )
}

function About() {
  return (
    <>
      <PageHero
        eyebrow="About Talvara"
        title="We built the platform we wished existed."
        subtitle="Talvara exists because the commercial talent layer in Africa was completely unaddressed - and because the right answer was never fully human or fully automated. It was both, in the right order. So we built the infrastructure to make it work."
        visual={<CohortSignalVisual />}
      />
      <section className="section">
        <SectionIntro
          align="center"
          eyebrow="Our Mission"
          title="Not an agency. Not a bot. A platform built end to end."
        >
          Talvara is a managed revenue platform that combines AI-powered candidate
          matching with human-led deployment, management, and accountability.
        </SectionIntro>
        <div className="mission-copy copy-stack" data-reveal>
          <p>
            We built it because the two dominant options in the market - place-and-exit
            agencies and autonomous AI tools - both fail the same way. One hands you
            the problem. The other can't handle the nuance.
          </p>
          <p>
            Behind Talvara sits a fully integrated infrastructure. The Africa Sales
            Academy finds and trains the talent. MySalesLMS delivers the six-week
            structured curriculum. Talvara deploys, manages, and stays accountable
            for results. The client only ever sees Talvara.
          </p>
          <p>
            Every SDR we deploy has passed our Revenue Readiness Score. Every
            engagement includes a live Client Portal, weekly pipeline reports,
            coaching sprints, and a playbook delivered to the client on exit.
          </p>
        </div>
        <div className="credibility-strip">
          <div><strong>18+ years</strong><span>B2B sales leadership</span></div>
          <div><strong>15+ years</strong><span>Commercial education</span></div>
          <div><strong>ASA</strong><span>Training infrastructure</span></div>
        </div>
      </section>
      <section className="section cream">
        <SectionIntro align="center" eyebrow="The Team" title="The people behind the platform." />
        <div className="founder-grid">
          {founders.map((founder) => (
            <Card
              as="article"
              className="founder-card person-card feature-card magnetic-card motion-card"
              key={founder.name}
              data-reveal
            >
              <Avatar
                name={founder.name}
                custom={founder.initials}
                src={founder.image}
                fit={founder.imageFit}
              />
              <div>
                <h3>{founder.name}</h3>
                <span>{founder.title}</span>
                {founder.bio.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {founder.linkedin && (
                  <a href={founder.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>
      </section>
      <section className="section">
        <SectionIntro
          align="center"
          eyebrow="Why We Built This"
          title="Three things converged. We moved first."
        />
        <div className="principle-grid">
          {whyBuilt.map(([title, body], index) => (
            <Card as="article" className="principle-card feature-card motion-card" key={title} data-reveal>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </Card>
          ))}
        </div>
      </section>
      <section className="section cream">
        <SectionIntro
          align="center"
          eyebrow="How We Work"
          title="The principles we operate by."
        />
        <div className="value-list">
          {values.map(([title, body], index) => (
            <Card as="article" className="value-card compact-list-card motion-card" key={title} data-reveal>
              <span className="value-index">{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </Card>
          ))}
        </div>
      </section>
      <section className="section">
        <SectionIntro
          align="center"
          eyebrow="SDR Cohort Gallery"
          title="Assessed SDRs across Cohort 1 and Cohort 2."
        />
        <div className="profile-grid">
          {cohort.map(([name, score]) => (
            <ProfileCard
              key={name}
              name={name}
              score={score}
              image={sdrHeadshots[name]}
              imagePosition={sdrHeadshotPositions[name]}
            />
          ))}
        </div>
      </section>
    </>
  )
}

function ProfileCard({ name, score, image, imagePosition }) {
  return (
    <Card as="article" className="profile-card compact-profile-card motion-card" data-reveal>
      <Avatar
        name={name}
        src={image}
        alt=""
        style={imagePosition ? { '--avatar-position': imagePosition } : undefined}
      />
      <h3>{name}</h3>
      <RRSBadge score={score} />
    </Card>
  )
}

function HeroSystemRail() {
  return (
    <div className="hero-system-rail" aria-label="Talvara delivery model">
      <span>ASA-trained talent</span>
      <span>RRS-assessed pool</span>
      <span>Talvara-managed delivery</span>
    </div>
  )
}

function InfrastructureVisual() {
  const nodes = [
    {
      name: 'Africa Sales Academy',
      label: 'Source + train',
      logo: '/logos/africa-sales-academy.png',
    },
    {
      name: 'MySalesLMS',
      label: 'Curriculum + evidence',
      logo: '/logos/mysaleslms-alt.png',
    },
    {
      name: 'Talvara',
      label: 'Deploy + manage',
      logo: '/talvara-logo.svg',
    },
  ]

  return (
    <div className="native-visual infrastructure-visual" aria-label="Talvara platform infrastructure">
      {nodes.map((node, index) => (
        <div className="native-node" key={node.name}>
          <span className="native-index">{String(index + 1).padStart(2, '0')}</span>
          <span className="native-logo">
            <img src={node.logo} alt={`${node.name} logo`} loading="lazy" />
          </span>
          <strong>{node.name}</strong>
          <em>{node.label}</em>
        </div>
      ))}
      <div className="native-flow-line" aria-hidden="true" />
      <div className="native-visual-footer">
        <span>Open application</span>
        <span>RRS 7.0+ gate</span>
        <span>Live pipeline</span>
      </div>
    </div>
  )
}

function PricingSignalVisual() {
  return (
    <div className="native-visual pricing-signal-visual" aria-label="Talvara pricing offers">
      {pricingOffers.map((offer) => (
        <div className={offer.featured ? 'featured' : ''} key={offer.title}>
          <span>{offer.eyebrow.replace('Offer ', '')}</span>
          <strong>{offer.title}</strong>
          <em>{offer.price}</em>
        </div>
      ))}
    </div>
  )
}

function CohortSignalVisual() {
  const featured = ['Joy E.', 'Kwesi D.', 'Faustina A.', 'Alice O.', 'Mark Q.']

  return (
    <div className="native-visual cohort-signal-visual" aria-label="Assessed SDR talent pool">
      <div className="cohort-avatar-row">
        {featured.map((name) => (
          <Avatar
            key={name}
            name={name}
            src={sdrHeadshots[name]}
            style={sdrHeadshotPositions[name] ? { '--avatar-position': sdrHeadshotPositions[name] } : undefined}
          />
        ))}
      </div>
      <div className="cohort-signal-copy">
        <strong>Assessed SDRs</strong>
        <span>Across Cohort 1 and Cohort 2</span>
      </div>
      <div className="cohort-signal-meta">
        <span>RRS 7.0+ deployment gate</span>
        <span>Active cohorts: Nigeria & Ghana</span>
      </div>
    </div>
  )
}

function ContactSignalVisual() {
  return (
    <div className="native-visual contact-signal-visual" aria-label="Talvara response process">
      <div>
        <span>01</span>
        <strong>Tell us the pipeline problem</strong>
      </div>
      <div>
        <span>02</span>
        <strong>Founder-led review</strong>
      </div>
      <div>
        <span>03</span>
        <strong>Reply within 24 hours</strong>
      </div>
    </div>
  )
}

function Contact() {
  const [formStatus, setFormStatus] = useState('idle')

  async function handleContactSubmit(event) {
    event.preventDefault()

    const form = event.currentTarget
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    setFormStatus('sending')
    const payload = new URLSearchParams(new FormData(form))

    try {
      await fetch(GOOGLE_FORM_ACTION, {
        method: 'POST',
        mode: 'no-cors',
        body: payload,
      })
      setFormStatus('sent')
      form.reset()
    } catch (error) {
      console.error('Talvara enquiry submission failed:', error)
      setFormStatus('error')
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="A real conversation. No sequences."
        subtitle="Every enquiry gets a personal response within 24 hours - from a person, not an automated system. Tell us your pipeline problem. We'll tell you honestly whether Talvara is the right fit."
        visual={<ContactSignalVisual />}
      />
      <section className="section">
        <div className="contact-grid">
          <form
            className="contact-form"
            action={GOOGLE_FORM_ACTION}
            method="post"
            encType="application/x-www-form-urlencoded"
            acceptCharset="UTF-8"
            onSubmit={handleContactSubmit}
            data-reveal
          >
            <input type="hidden" name="fvv" value="1" />
            <input type="hidden" name="pageHistory" value="0" />
            <input type="hidden" name="submit" value="Submit" />
            <input type="hidden" name={`${googleFormFields.stage}_sentinel`} value="" />
            <input type="hidden" name={`${googleFormFields.situation}_sentinel`} value="" />
            <label>
              First name
              <Input name={googleFormFields.firstName} autoComplete="given-name" required />
            </label>
            <label>
              Last name
              <Input name={googleFormFields.lastName} autoComplete="family-name" required />
            </label>
            <label>
              Email
              <Input name={googleFormFields.email} type="email" autoComplete="email" required />
            </label>
            <label>
              Company
              <Input name={googleFormFields.company} autoComplete="organization" required />
            </label>
            <label>
              Role / Title
              <Input name={googleFormFields.role} required />
            </label>
            <label>
              Company stage
              <Select name={googleFormFields.stage} defaultValue="" required>
                <option value="" disabled>Select stage</option>
                {companyStageOptions.map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </Select>
            </label>
            <label>
              Current outbound situation
              <Select name={googleFormFields.situation} defaultValue="" required>
                <option value="" disabled>Select situation</option>
                {outboundSituationOptions.map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </Select>
            </label>
            <label className="full">
              Message
              <Textarea
                name={googleFormFields.message}
                rows="6"
                placeholder="What's your outbound challenge? What have you already tried?"
                required
              />
            </label>
            {formStatus === 'sent' && (
              <p className="form-status full" role="status">
                Thanks. Your enquiry has been sent to Talvara.
              </p>
            )}
            {formStatus === 'error' && (
              <p className="form-status form-status-error full" role="alert">
                The form could not send. Please email {CONTACT_EMAIL} or book a discovery call.
              </p>
            )}
            <Button className="button primary full" type="submit" disabled={formStatus === 'sending'}>
              {formStatus === 'sending' ? 'Sending...' : 'Send Enquiry ->'}
            </Button>
          </form>
          <Card as="aside" className="call-card cta-card conversion-card motion-card" data-reveal>
            <Eyebrow>Prefer a call?</Eyebrow>
            <h2>Book a Discovery Call</h2>
            <p>
              Contact: {CONTACT_EMAIL}. We respond within 24 hours on business days.
            </p>
            <ul className="call-expectations">
              <li>Your current pipeline situation and what's already been tried</li>
              <li>Your ICP, outbound targets, and what a win looks like</li>
              <li>An honest assessment of whether Talvara fits right now</li>
              <li>Whether the pilot or another offer is the right starting point</li>
              <li>Timeline, pricing, and next steps - all answered in the call</li>
            </ul>
            <p>
              If Talvara isn't the right fit right now, we'll say so - and tell you
              when to come back.
            </p>
            <CTAButton>Book a Discovery Call</CTAButton>
          </Card>
        </div>
      </section>
    </>
  )
}

function PageHero({ eyebrow, title, subtitle, className = '', visual }) {
  return (
    <section className={`page-hero dark-section ${className}`}>
      <div data-reveal>
        <Eyebrow dark>{eyebrow}</Eyebrow>
        <h1 data-word-reveal>{title}</h1>
        <p>{subtitle}</p>
        {visual && <div className="page-hero-visual">{visual}</div>}
      </div>
    </section>
  )
}

function Legal({ type }) {
  const page = legalPages[type]

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={page.title}
        subtitle={page.subtitle}
      />
      <section className="section">
        <Card className="legal-note legal-document feature-card motion-card" data-reveal>
          <div className="legal-document-header">
            <span>Last updated: {legalUpdated}</span>
            <p>{page.notice}</p>
          </div>
          {page.sections.map((section) => (
            <section className="legal-section" key={section.heading}>
              <h2>{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </Card>
      </section>
    </>
  )
}

export default App
