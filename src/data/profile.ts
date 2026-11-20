/**
 * ALL copy on the site lives in this file. Components hold no text of their own.
 *
 * Source of facts: Jagadish's résumé. Do not add numbers, clients, titles or
 * dates that aren't in it. The phone number is deliberately NOT here: the site
 * shows email only.
 *
 * Empty strings ('') are placeholders still waiting on content. While a field
 * is empty, the page shows a bracketed placeholder (as in the approved design)
 * and `npm run build` prints a warning listing what's missing.
 */

export interface Stop {
  years: string;
  org: string;
  role: string;
  place: string;
  current?: boolean;
}

export interface Fact {
  label: string;
  value: string;
}

export interface StoryPart {
  lead: string; // bold opening words, e.g. "The starting point."
  text: string;
}

export interface Profile {
  siteUrl: string;
  name: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  lede: string;
  email: string;
  linkedin: string;
  resumeUrl: string;
  location: string;
  locationShort: string; // for JSON-LD addressLocality
  region: string;
  openTo: string;
  education: string[];
  stops: Stop[]; // career, OLDEST first. Mark the current job with current: true
  caseStudy: {
    id: string;
    title: string;
    facts: Fact[];
    start: StoryPart;
    change: StoryPart;
    result: StoryPart;
    /** Before/after diagram. Put the image in /public and set src + alt. */
    diagram?: { src: string; alt: string; width: number; height: number };
    /** Or 2–3 real metrics, e.g. { label: 'Hosting cost', value: '…' } */
    metrics?: Fact[];
  };
  systems: { name: string; summary: string }[];
  work: { title: string; body: string }[];
  contactLine: string;
  ui: {
    nav: { experience: string; caseStudy: string; work: string; contact: string; backToTop: string };
    emailButton: string;
    resumeLink: string;
    routeTitle: string;
    systemsTitle: string;
    systemsHead: [string, string];
    workTitle: string;
    contactTitle: string;
    details: { email: string; linkedin: string; location: string; openTo: string };
    placeholders: {
      linkedin: string;
      openTo: string;
      systemSummary: string;
      diagram: string;
    };
  };
}

export const profile: Profile = {
  // TODO: replace with the real domain once it's connected in Vercel.
  siteUrl: 'https://jagadish-pampatwar.vercel.app',

  name: 'Jagadish Pampatwar',
  title: 'Enterprise Java and AI solutions architect',
  metaTitle: 'Jagadish Pampatwar — Enterprise Java & AI Solutions Architect',
  metaDescription:
    'Jagadish Pampatwar, enterprise Java and AI solutions architect at CSX Transportation in Jacksonville, Florida. 19+ years modernizing enterprise platforms.',
  lede:
    "Enterprise Java and AI solutions architect. Since 2012 I've designed the systems CSX uses to run a freight railroad, and I'm now bringing large language models into them carefully.",

  email: 'jagadish.pampatwar@gmail.com',
  linkedin: '', // TODO from user, e.g. 'https://www.linkedin.com/in/…'
  resumeUrl: '/resume.pdf', // TODO: add the file at public/resume.pdf
  location: 'Jacksonville, Florida',
  locationShort: 'Jacksonville',
  region: 'FL',
  openTo: '', // TODO from user, e.g. 'Full-time, remote or on site in Jacksonville'

  education: [
    'Master of Computer Science, Texas A&M University–Kingsville.',
    'Bachelor of Technology in Computer Science and Engineering, India.',
  ],

  stops: [
    { years: '2005–2006', org: 'Sourcen', role: 'Java Developer', place: 'Bangalore, India' },
    { years: '2008–2010', org: 'Pfizer', role: 'Senior Developer', place: 'Groton, CT' },
    { years: '2010–2011', org: 'Convergys', role: 'Senior Java Engineer', place: 'Lake Mary, FL' },
    { years: '2011', org: 'NY State Dept. of Health', role: 'Java Architect, Lead Developer', place: 'Albany, NY' },
    { years: '2011–2012', org: 'GuideWell / Blue Cross Blue Shield', role: 'Senior Java Engineer', place: 'Jacksonville, FL' },
    { years: '2012–now', org: 'CSX Transportation', role: 'Java Architect, Senior Technical Lead', place: 'Jacksonville, FL', current: true },
  ],

  caseStudy: {
    id: 'transflo',
    title: 'How the Transflo modernization saved CSX about $1 million',
    facts: [
      { label: 'System', value: 'Transflo Customer Inventory Management' },
      { label: 'My role', value: 'Java architect and modernization lead' },
      { label: 'Company', value: 'CSX Transportation' },
      { label: 'Outcome', value: 'About $1 million in cost savings' },
    ],
    start: {
      lead: 'The starting point.',
      text: "Transflo's inventory system rested on legacy technology, and its dependencies made the application hard to maintain.",
    },
    change: {
      lead: 'What changed.',
      text: 'I set the target architecture and the route to it: removing legacy dependencies, consolidating the technology, and reshaping the application so it could scale and connect cleanly to the rest of the enterprise.',
    },
    result: {
      lead: 'The result.',
      text: 'Roughly $1 million saved, and a codebase the team can extend without fighting it.',
    },
    diagram: undefined, // TODO from user
    metrics: [], // TODO from user (2–3 real numbers)
  },

  systems: [
    { name: 'PTC Operations Portal', summary: '' }, // TODO one line
    { name: 'Fleet Management System', summary: '' }, // TODO one line
    { name: 'Engineering and Track Management platforms', summary: '' }, // TODO one line
  ],

  work: [
    {
      title: 'Modernizing legacy Java.',
      body: 'Moving monolithic J2EE applications built on JSF, JSP, EJB and JMS to Spring Boot microservices on Kubernetes.',
    },
    {
      title: 'Putting LLMs to work.',
      body: 'Azure OpenAI and LangChain workflows, retrieval over enterprise data, and agent-based automation, with access control and checks on what the model produces.',
    },
    {
      title: 'Event-driven systems.',
      body: 'High-volume Kafka pipelines for real-time ingestion and integration, with REST APIs published through Apigee.',
    },
    {
      title: 'Cloud and delivery.',
      body: 'Deployments on Azure, AWS and OpenShift, infrastructure in Terraform, pipelines in Jenkins, ArgoCD and Spinnaker, monitoring in ELK and Datadog.',
    },
    {
      title: 'Leading engineers.',
      body: 'Architecture reviews, shared design standards, and mentoring senior developers across teams.',
    },
  ],

  contactLine:
    "I'm open to architect roles in enterprise Java, application modernization and generative AI. Email is the quickest way to reach me.",

  ui: {
    nav: {
      experience: 'Experience',
      caseStudy: 'Case study',
      work: 'What I work on',
      contact: 'Contact',
      backToTop: 'Back to top',
    },
    emailButton: 'Email Jagadish',
    resumeLink: 'Download résumé (PDF)',
    routeTitle: "Where I've worked",
    systemsTitle: "Other systems I've architected at CSX",
    systemsHead: ['System', 'What it does and my part in it'],
    workTitle: 'What I work on',
    contactTitle: "Let's talk about your system",
    details: { email: 'Email', linkedin: 'LinkedIn', location: 'Based in', openTo: 'Open to' },
    placeholders: {
      linkedin: '[LinkedIn profile URL]',
      openTo: '[Full-time or contract, on site or remote]',
      systemSummary: '[One line]',
      diagram:
        '[Before-and-after architecture diagram, or two or three real numbers: hosting cost, release frequency, incidents]',
    },
  },
};

/** Placeholders still empty. Printed as a warning at build time. */
export function missingContent(p: Profile = profile): string[] {
  const missing: string[] = [];
  if (!p.linkedin) missing.push('LinkedIn URL (profile.linkedin)');
  if (!p.openTo) missing.push('"Open to" (profile.openTo)');
  if (!p.caseStudy.diagram && !p.caseStudy.metrics?.length)
    missing.push('Transflo diagram or 2–3 metrics (profile.caseStudy.diagram / metrics)');
  for (const s of p.systems) if (!s.summary) missing.push(`One-line summary for "${s.name}"`);
  return missing;
}
