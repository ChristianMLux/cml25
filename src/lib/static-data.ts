import { Project } from '@/types';

export const projectsData: Omit<Project, 'title' | 'description'>[] = [
  {
    id: 'spn-platform',
    imageUrl: '/assets/images/projects/projects_spn_landing.jpg',
    liveUrl: 'https://www.sparepartsnow.de/',
    technologies: [
      'nextJs',
      'TypeSkript',
      'C#',
      '.ASP',
      'Azure',
      'Docker',
      'Kubernetes',
      'Google Analytics',
    ],
    blurDataUrl:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAHAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABwAI/8QAIRAAAgEEAQUBAAAAAAAAAAAAAQIDBAUGEQAHEiExYXH/xAAVAQEBAAAAAAAAAAAAAAAAAAACA//EABkRAAMAAwAAAAAAAAAAAAAAAAABAgMRIf/aAAwDAQACEQMRAD8Ar8Zgkcl6U4jj9ZCn9JdKq3TTb+YUUgiU/dAn156U3YnSWgrJYf55kE1xeWWdGqjCFeSUkjRJA69B71rQ11s1Z4fGP//Z',
    category: 'web',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    link: '/projects/ecommerce-platform',
    images: ['/assets/images/projects/projects_spn_product_example.jpg'],
  },
  {
    id: 'cml25',
    imageUrl: '/assets/images/projects/projects_cml25_landing.jpg',
    liveUrl: 'https://cml25.netlify.app/',
    githubUrl: 'https://github.com/ChristianMLux/cml25',
    technologies: [
      'nextJs',
      'TypeSkript',
      'Tailwind',
      'Google Analytics',
      'Google Firebase',
    ],
    blurDataUrl:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAHAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABwAI/8QAIRAAAgEEAQUBAAAAAAAAAAAAAQIDBAUGEQAHEiExYXH/xAAVAQEBAAAAAAAAAAAAAAAAAAACA//EABkRAAMAAwAAAAAAAAAAAAAAAAABAgMRIf/aAAwDAQACEQMRAD8Ar8Zgkcl6U4jj9ZCn9JdKq3TTb+YUUgiU/dAn156U3YnSWgrJYf55kE1xeWWdGqjCFeSUkjRJA69B71rQ11s1Z4fGP//Z',
    category: 'web',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    link: '/projects/cml25',
    images: ['/assets/images/projects/projects_cml25_about.jpg'],
  },

  {
    id: 'signatures-project',
    imageUrl: '/assets/images/signatures/signatures_overview.png',
    githubUrl: 'testurl',
    technologies: ['fireworks', 'photoshop'],
    blurDataUrl:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABwAI/8QAIRAAAgEEAQUBAAAAAAAAAAAAAQIDBAUGEQAHEiExYXH/xAAVAQEBAAAAAAAAAAAAAAAAAAACA//EABkRAAMAAwAAAAAAAAAAAAAAAAABAgMRIf/aAAwDAQACEQMRAD8Ar8Zgkcl6U4jj9ZCn9JdKq3TTb+YUUgiU/dAn156U3YnSWgrJYf55kE1xeWWdGqjCFeSUkjRJA69B71rQ11s1Z4fGP//Z',
    category: 'design',
    tags: ['Design', 'Signatur', 'Graphics'],
    link: '/projects/signature-project',
    images: ['/assets/images/signatures/_se_light.jpg'],
  },
  {
    id: 'safetec-project',
    imageUrl: '/assets/images/designs/_st_design5.jpg',
    githubUrl: 'testurl',
    technologies: ['fireworks', 'html', 'css'],
    blurDataUrl:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABwAI/8QAIRAAAgEEAQUBAAAAAAAAAAAAAQIDBAUGEQAHEiExYXH/xAAVAQEBAAAAAAAAAAAAAAAAAAACA//EABkRAAMAAwAAAAAAAAAAAAAAAAABAgMRIf/aAAwDAQACEQMRAD8Ar8Zgkcl6U4jj9ZCn9JdKq3TTb+YUUgiU/dAn156U3YnSWgrJYf55kE1xeWWdGqjCFeSUkjRJA69B71rQ11s1Z4fGP//Z',
    category: 'web',
    tags: ['Design', 'Website', 'Work'],
    link: '/projects/safetec-project',
    images: [],
  },
  {
    id: 'imaging-for-africa-project',
    imageUrl: '/assets/images/designs/design_ifa_ohnekontakt.jpg',
    githubUrl: 'testurl',
    technologies: ['fireworks', 'html', 'css'],
    blurDataUrl:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABwAI/8QAIRAAAgEEAQUBAAAAAAAAAAAAAQIDBAUGEQAHEiExYXH/xAAVAQEBAAAAAAAAAAAAAAAAAAACA//EABkRAAMAAwAAAAAAAAAAAAAAAAABAgMRIf/aAAwDAQACEQMRAD8Ar8Zgkcl6U4jj9ZCn9JdKq3TTb+YUUgiU/dAn156U3YnSWgrJYf55kE1xeWWdGqjCFeSUkjRJA69B71rQ11s1Z4fGP//Z',
    category: 'web',
    tags: ['Design', 'Website', 'Work'],
    link: '/projects/imaging-for-africa-project',
    images: ['/assets/images/designs/i4a_05.jpg'],
  },
  {
    id: '4-soul-project',
    imageUrl: '/assets/images/designs/design_4_soul.jpg',
    githubUrl: 'testurl',
    technologies: ['fireworks', 'html', 'css'],
    blurDataUrl:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABwAI/8QAIRAAAgEEAQUBAAAAAAAAAAAAAQIDBAUGEQAHEiExYXH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABoRAAICAwAAAAAAAAAAAAAAAAECAAMEESH/2gAMAwEAAhEDEQA/AJzoXbu03W+j3eq6jrFzpEumGeW2W1t1lE5VS0ZYlgAvqhIGckEVZ7m91NI7qSLo/UNQVWJVZLhEZh6jJwcZ5B5rSlSXsBbdmFFdO51Hdf/Z',
    category: 'web',
    tags: ['Design', 'Website', 'Hobby'],
    link: '/projects/4-soul',
    images: [],
  },
  {
    id: 'wooden-portfolio-design',
    imageUrl: '/assets/images/designs/design_pf_se2.jpg',
    technologies: ['fireworks', 'photoshop'],
    blurDataUrl:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABwAI/8QAIRAAAgEEAQUBAAAAAAAAAAAAAQIDBAUGEQAHEiExYXH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABoRAAICAwAAAAAAAAAAAAAAAAECAAMEESH/2gAMAwEAAhEDEQA/AJzoXbu03W+j3eq6jrFzpEumGeW2W1t1lE5VS0ZYlgAvqhIGckEVZ7m91NI7qSLo/UNQVWJVZLhEZh6jJwcZ5B5rSlSXsBbdmFFdO51Hdf/Z',
    category: 'design',
    tags: ['Hobby', 'Early Stages'],
    link: '/projects/wooden-portfolio-design',
    images: [],
    githubUrl: '',
  },
  {
    id: 'cmd-portfolio-design',
    imageUrl: '/assets/images/designs/design_cmd.jpg',
    technologies: ['fireworks', 'photoshop'],
    blurDataUrl:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABwAI/8QAIRAAAgEEAQUBAAAAAAAAAAAAAQIDBAUGEQAHEiExYXH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABoRAAICAwAAAAAAAAAAAAAAAAECAAMEESH/2gAMAwEAAhEDEQA/AJzoXbu03W+j3eq6jrFzpEumGeW2W1t1lE5VS0ZYlgAvqhIGckEVZ7m91NI7qSLo/UNQVWJVZLhEZh6jJwcZ5B5rSlSXsBbdmFFdO51Hdf/Z',
    category: 'design',
    tags: ['Hobby', 'Early Stages'],
    link: '/projects/cmd-portfolio-design',
    images: ['/assets/images/designs/design_cmd_white-blue.jpg'],
    githubUrl: '',
  },
  {
    id: 'cc-portfolio-design',
    imageUrl: '/assets/images/designs/cc_02.jpg',
    technologies: ['fireworks', 'photoshop'],
    blurDataUrl:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABwAI/8QAIRAAAgEEAQUBAAAAAAAAAAAAAQIDBAUGEQAHEiExYXH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABoRAAICAwAAAAAAAAAAAAAAAAECAAMEESH/2gAMAwEAAhEDEQA/AJzoXbu03W+j3eq6jrFzpEumGeW2W1t1lE5VS0ZYlgAvqhIGckEVZ7m91NI7qSLo/UNQVWJVZLhEZh6jJwcZ5B5rSlSXsBbdmFFdO51Hdf/Z',
    category: 'design',
    tags: ['Hobby', 'Design'],
    link: '/projects/cc-portfolio-design',
    images: [],
  },
  {
    id: 'imo-fan-project',
    imageUrl: '/assets/images/designs/design_imo_old.png',
    technologies: ['fireworks', 'photoshop', 'html', 'css', 'js'],
    blurDataUrl:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABwAI/8QAIRAAAgEEAQUBAAAAAAAAAAAAAQIDBAUGEQAHEiExYXH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABoRAAICAwAAAAAAAAAAAAAAAAECAAMEESH/2gAMAwEAAhEDEQA/AJzoXbu03W+j3eq6jrFzpEumGeW2W1t1lE5VS0ZYlgAvqhIGckEVZ7m91NI7qSLo/UNQVWJVZLhEZh6jJwcZ5B5rSlSXsBbdmFFdO51Hdf/Z',
    category: 'web',
    tags: ['Hobby', 'Gaming', 'Website', 'Design'],
    link: '/projects/imo-fan-project',
    images: [
      '/assets/images/designs/Imo_grund_003.jpg',
      '/assets/images/designs/Imo_grund_02_003.jpg',
    ],
  },
];
