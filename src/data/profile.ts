/**
 * ALL copy on the site lives in this file. Components hold no text of their own.
 *
 * Facts come only from Jagadish's résumé: don't add metrics, clients, team
 * sizes or dates that aren't in it. The $1M is "approximately", so always
 * "about" or "~", never "over". There is deliberately no phone number here.
 *
 * Empty strings ('') are placeholders. `npm run build` prints a warning for each.
 */

export interface Row { n: string; title: string; line: string; tag: string }
export interface Work {
  id: string;
  theme: 'sand' | 'steel';
  label: string; // top-left of the coloured panel, e.g. "Legacy → Modern"
  index: string; // top-right, e.g. "01"
  big: [string, string]; // two lines; the second is dimmed
  flow: [string, string, string]; // three chips; the last fills solid when lit
  name: string; // small caps line under the chips
  kicker: string; // label above the title
  title: string;
  text: string;
  tags: string[];
  details: string[]; // "Explore the engineering" list
}
export interface Job {
  when: string;
  company: string;
  role: string;
  desc?: string;
  tags?: string[];
  where: string;
}

export const profile = {
  // TODO: replace with the real domain once it's connected in Vercel.
  siteUrl: 'https://jagadish-pampatwar.vercel.app',

  name: 'Jagadish Pampatwar',
  jobTitle: 'Enterprise Java and AI Solutions Architect',
  locality: 'Jacksonville',
  region: 'FL',
  location: 'Jacksonville, Florida',
  meta: {
    title: 'Jagadish Pampatwar — Enterprise Java & AI Architect',
    description:
      'Jagadish Pampatwar, enterprise Java and AI solutions architect in Jacksonville, Florida. 19 years modernizing enterprise platforms, including about $1M saved on the Transflo modernization at CSX.',
  },

  email: 'jagadish.pampatwar@gmail.com',
  resumeUrl: '/resume.pdf', // TODO: add the file at public/resume.pdf
  linkedin: '', // TODO, e.g. 'https://www.linkedin.com/in/…' (appears in the hero bar + JSON-LD)
  github: '', // TODO, e.g. 'https://github.com/…' (appears in the hero bar)

  // Set to '' to hide the "open to" dot if he isn't looking.
  openTo: 'Open to architect roles',

  header: {
    logo: 'j',
    logoLabel: 'Jagadish Pampatwar, back to top',
    nav: [
      { href: '#work', text: 'Selected work' },
      { href: '#about', text: 'About' },
      { href: '#experience', text: 'Experience' },
      { href: '#contact', text: 'Contact' },
    ],
    talk: "Let's talk",
  },

  hero: {
    role: 'Java architect. Cloud and AI solutions.',
    headline: ['Architecting systems', 'that ', 'stay running.'] as [string, string, string], // last part in amber
    // Lede segments: { b: true } renders in the brighter ink.
    lede: [
      { t: "I modernize enterprise Java platforms that businesses can't afford to switch off, and connect them to AI. " },
      { t: '19 years', b: true },
      { t: ' in, and at ' },
      { t: 'CSX Transportation since 2012', b: true },
      { t: '.' },
    ],
    primaryCta: 'See the work',
    resumeCta: 'Résumé',
    bar: 'Enterprise architecture. Measurable outcomes.',
    barLinks: { email: 'Email', linkedin: 'LinkedIn', github: 'GitHub', scroll: 'Scroll to explore' },
  },

  howIArchitect: {
    label: 'How I architect',
    intro: ['From the legacy core', 'to the intelligent edge.'],
    foot: '19 years of enterprise Java',
    rows: [
      { n: '01', title: 'Modernize', line: 'Monoliths to cloud-native services.', tag: 'JAVA' },
      { n: '02', title: 'Stream', line: 'Event-driven integration on Kafka.', tag: 'EVT' },
      { n: '03', title: 'Deploy', line: 'Azure, AWS and OpenShift at scale.', tag: 'OPS' },
      { n: '04', title: 'Augment', line: 'LLMs and RAG, with guardrails.', tag: 'AI' },
    ] as Row[],
  },

  coreStack: {
    label: 'Core stack',
    items: ['Java', 'Spring Boot', 'Kafka', 'Kubernetes', 'Azure OpenAI'],
    plus: '+ a lot of production',
  },

  workSection: {
    n: '01',
    label: 'Selected work',
    heading: ['Modernized at scale.', 'Measured in dollars.'],
    intro: 'Two bodies of work from CSX Transportation, and the architecture behind them.',
    more: 'Explore the engineering',
    also: 'Earlier: healthcare at GuideWell, public health for New York State, enterprise apps at Pfizer.',
    alsoLink: 'Full experience',
  },

  work: [
    {
      id: 'transflo',
      theme: 'sand',
      label: 'Legacy → Modern',
      index: '01',
      big: ['Legacy out.', 'About $1M saved.'],
      flow: ['Legacy system', 'Target architecture', '~$1M saved'],
      name: 'Transflo · CSX Transportation',
      kicker: 'Application modernization · Architecture lead',
      title: 'Transflo Customer Inventory Management System.',
      text: 'Led the modernization of a legacy system to a scalable, maintainable architecture, cutting legacy dependencies and simplifying maintenance.',
      tags: ['Java', 'Modernization', 'Architecture', 'Rationalization'],
      details: [
        'Designed the strategy to move legacy capabilities onto a modern foundation.',
        'Reduced legacy technology dependencies and rationalized the stack.',
        'Built a base for future enhancements and enterprise integration.',
        'Contributed to approximately $1 million in cost savings.',
      ],
    },
    {
      id: 'rail-systems',
      theme: 'steel',
      label: 'Data → Decisions',
      index: '02',
      big: ['Rail operations.', 'In real time.'],
      flow: ['Rail data', 'Kafka events', 'Ops platforms'],
      name: 'Key systems · CSX Transportation',
      kicker: 'Distributed systems · Solution architecture',
      title: 'PTC Operations Portal, Fleet Management, Engineering & Track platforms.',
      text: 'Architected the systems behind rail operations: event-driven designs for high-volume ingestion and real-time processing, with secure APIs through Apigee.',
      tags: ['Kafka', 'Spring Boot', 'MongoDB', 'Angular', 'Apigee'],
      details: [
        'Cloud-native microservices with Java, Spring Boot, Kafka and MongoDB.',
        'Event-driven integration for real-time data across platforms.',
        'Deployments on AWS, Azure and OpenShift with Docker and Kubernetes.',
        'Observability with the ELK Stack and Datadog.',
      ],
    },
  ] as Work[],

  about: {
    n: '02',
    label: 'The architect behind the systems',
    heading: ['Architecture is my craft.', 'Reliability is the product.'],
    cta: 'Work with me',
    paragraphs: [
      "I'm Jagadish, an enterprise Java architect. I design the platforms large organizations run on, and I move them forward without stopping them.",
      'At CSX I define solution architecture and technical roadmaps, set the patterns teams reuse, and lead the modernization of monolithic J2EE applications into cloud-native services on Kafka, Kubernetes and the cloud.',
      'Lately I bring generative AI into those systems: Azure OpenAI and LangChain workflows, retrieval over company data, and AI agents, always with access control and validation of what the models produce.',
    ],
    focusLabel: 'Current focus',
    focus: 'Java modernization + applied AI',
    educationLabel: 'Education',
    education: { degree: 'MS, Computer Science', school: 'Texas A&M University–Kingsville' },
  },

  toolkitSection: {
    n: '03',
    label: 'The toolkit',
    heading: ['Depth in Java.', 'Range across the stack.'],
  },
  toolkit: [
    {
      label: '01 / Architect',
      title: 'Enterprise and solution architecture',
      text: 'Microservices, domain-driven and event-driven design, governance and standards that scale across teams.',
      tags: ['Microservices', 'DDD', 'REST', 'Apigee', 'Kafka', 'JMS / IBM MQ'],
    },
    {
      label: '02 / Build',
      title: 'Java, cloud and data',
      text: 'The platform work underneath: services, containers, pipelines and the data stores behind them.',
      tags: ['Java 17', 'Spring Boot', 'Hibernate', 'Kubernetes', 'OpenShift', 'Azure', 'AWS', 'Terraform', 'Oracle', 'MongoDB'],
    },
    {
      label: '03 / Augment',
      title: 'AI and delivery',
      text: 'Practical generative AI in enterprise systems, shipped through reliable delivery and observability.',
      tags: ['Azure OpenAI', 'LangChain', 'RAG', 'AI agents', 'GitHub Copilot', 'Jenkins', 'Argo CD', 'Datadog'],
    },
  ],

  experienceSection: {
    n: '04',
    label: 'Experience',
    heading: 'Built in the real world.',
    resumeLink: 'View résumé',
  },
  // Newest first.
  experience: [
    {
      when: '2012 — PRESENT',
      company: 'CSX Transportation',
      role: 'Java Architect / Senior Technical Lead',
      desc: 'Leading enterprise architecture, modernization and cloud transformation for large-scale transportation and logistics platforms. Architecture reviews, engineering standards and mentoring across development teams.',
      tags: ['Java', 'Spring Boot', 'Kafka', 'Kubernetes', 'Azure OpenAI'],
      where: 'Jacksonville, FL',
    },
    {
      when: '2011 — 2012',
      company: 'GuideWell / Blue Cross Blue Shield',
      role: 'Senior Java Engineer',
      desc: 'Enterprise healthcare applications on Spring MVC and Hibernate, with business rules in the Drools rule engine.',
      where: 'Jacksonville, FL',
    },
    {
      when: '2011',
      company: 'New York State Department of Health',
      role: 'Java Architect / Lead Developer',
      desc: 'Secure public-health applications with JMS-based asynchronous messaging and caching for performance.',
      where: 'Albany, NY',
    },
    {
      when: '2010 — 2011',
      company: 'Convergys',
      role: 'Senior Java Engineer',
      desc: 'Ordering and billing applications with SOAP integrations and asynchronous messaging.',
      where: 'Lake Mary, FL',
    },
    {
      when: '2008 — 2010',
      company: 'Pfizer',
      role: 'Senior Developer',
      desc: 'Enterprise Java/J2EE applications and backend integrations.',
      where: 'Groton, CT',
    },
    { when: '2005 — 2006', company: 'Sourcen', role: 'Java Developer', where: 'Bangalore, India' },
  ] as Job[],

  principlesSection: {
    n: '05',
    label: 'How I work',
    heading: ['Big systems.', 'Calm changes.'],
  },
  principles: [
    {
      n: '01',
      title: 'Modernize without stopping the business',
      text: 'Legacy systems move to the new architecture in stages, while they keep serving the people who depend on them.',
    },
    {
      n: '02',
      title: 'Standards teams can reuse',
      text: 'Reusable patterns, design guidelines and reviews, so good architecture survives beyond one project.',
    },
    {
      n: '03',
      title: 'AI with guardrails',
      text: 'Data security, access control and validation of AI output come first, so teams can trust what the models produce.',
    },
  ],

  contact: {
    n: '06',
    label: "What's next?",
    heading: ['Big systems', 'start with a', 'conversation.'] as [string, string, string], // last line in amber
    lede: "I'm open to enterprise architecture, Java modernization and AI solutions architect roles. Have something in mind?",
    form: {
      title: 'Drop me a note.',
      name: 'Your name',
      email: 'Email address',
      message: 'What are you thinking?',
      submit: 'Send message',
      sending: 'Sending…',
      note: 'Your message goes straight to my inbox.',
      // Validation: "Please add " + only the missing items, joined with ", ".
      missingPrefix: 'Please add ',
      missing: { name: 'your name', email: 'a valid email', message: 'a message' },
      success: 'Thanks, your message was sent. I will get back to you soon.',
      error: 'The message could not be sent. Please email jagadish.pampatwar@gmail.com directly.',
      // Sent to Web3Forms as hidden fields (they set the email you receive).
      subject: 'New message from jagadish portfolio',
      fromName: 'Portfolio contact form',
    },
  },

  footer: { backToTop: 'Back to top' },
};

/** Placeholders still empty. Printed as a warning at build time. */
export function missingContent(): string[] {
  const m: string[] = [];
  if (!profile.linkedin) m.push('LinkedIn URL (profile.linkedin)');
  if (!profile.github) m.push('GitHub URL (profile.github)');
  return m;
}
