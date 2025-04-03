import { Project } from "@/types";
import { cache } from "react";
import { getServerTranslation } from "@/lib/getServerTranslation";

const projectsData: Omit<Project, "title" | "description">[] = [
  {
    id: "spn-platform",
    imageUrl: "/assets/images/projects/projects_spn_landing.jpg",
    liveUrl: "https://www.sparepartsnow.de/",
    technologies: [
      "nextJs",
      "TypeSkript",
      "C#",
      ".ASP",
      "Azure",
      "Docker",
      "Kubernetes",
      "Google Analytics",
    ],
    blurDataUrl:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAHAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABwAI/8QAIRAAAgEEAQUBAAAAAAAAAAAAAQIDBAUGEQAHEiExYXH/xAAVAQEBAAAAAAAAAAAAAAAAAAACA//EABkRAAMAAwAAAAAAAAAAAAAAAAABAgMRIf/aAAwDAQACEQMRAD8Ar8Zgkcl6U4jj9ZCn9JdKq3TTb+YUUgiU/dAn156U3YnSWgrJYf55kE1xeWWdGqjCFeSUkjRJA69B71rQ11s1Z4fGP//Z",
    category: "web",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    link: "/projects/ecommerce-platform",
    images: ["/assets/images/projects/projects_spn_product_example.jpg"],
  },
  {
    id: "signatures-project",
    imageUrl: "/assets/images/signatures/signatures_overview.png",
    githubUrl: "testurl",
    technologies: ["fireworks", "photoshop"],
    blurDataUrl:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAABgj/xAAiEAACAQMDBQEAAAAAAAAAAAABAgMABBEFEiEGBxMiMXH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABoRAAICAwAAAAAAAAAAAAAAAAECAAMEESH/2gAMAwEAAhEDEQA/AJzoXbu03W+j3eq6jrFzpEumGeW2W1t1lE5VS0ZYlgAvqhIGckEVZ7m91NI7qSLo/UNQVWJVZLhEZh6jJwcZ5B5rSlSXsBbdmFFdO51Hdf/Z",
    category: "design",
    tags: ["Design", "Signatur", "Graphics"],
    link: "/projects/signature-project",
    images: ["/assets/images/signatures/_se_light.jpg"],
  },
  {
    id: "safetec-project",
    imageUrl: "/assets/images/designs/_st_design5.jpg",
    githubUrl: "testurl",
    technologies: ["fireworks", "html", "css"],
    blurDataUrl:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAABgj/xAAiEAACAQMDBQEAAAAAAAAAAAABAgMABBEFEiEGBxMiMXH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABoRAAICAwAAAAAAAAAAAAAAAAECAAMEESH/2gAMAwEAAhEDEQA/AJzoXbu03W+j3eq6jrFzpEumGeW2W1t1lE5VS0ZYlgAvqhIGckEVZ7m91NI7qSLo/UNQVWJVZLhEZh6jJwcZ5B5rSlSXsBbdmFFdO51Hdf/Z",
    category: "web",
    tags: ["Design", "Website", "Work"],
    link: "/projects/safetec-project",
    images: [],
  },
  {
    id: "imaging-for-africa-project",
    imageUrl: "/assets/images/designs/design_ifa_ohnekontakt.jpg",
    githubUrl: "testurl",
    technologies: ["fireworks", "html", "css"],
    blurDataUrl:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAABgj/xAAiEAACAQMDBQEAAAAAAAAAAAABAgMABBEFEiEGBxMiMXH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABoRAAICAwAAAAAAAAAAAAAAAAECAAMEESH/2gAMAwEAAhEDEQA/AJzoXbu03W+j3eq6jrFzpEumGeW2W1t1lE5VS0ZYlgAvqhIGckEVZ7m91NI7qSLo/UNQVWJVZLhEZh6jJwcZ5B5rSlSXsBbdmFFdO51Hdf/Z",
    category: "web",
    tags: ["Design", "Website", "Work"],
    link: "/projects/imaging-for-africa-project",
    images: ["/assets/images/designs/i4a_05.jpg"],
  },
  {
    id: "4-soul-project",
    imageUrl: "/assets/images/designs/design_4_soul.jpg",
    githubUrl: "testurl",
    technologies: ["fireworks", "html", "css"],
    blurDataUrl:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAABgj/xAAiEAACAQMDBQEAAAAAAAAAAAABAgMABBEFEiEGBxMiMXH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABoRAAICAwAAAAAAAAAAAAAAAAECAAMEESH/2gAMAwEAAhEDEQA/AJzoXbu03W+j3eq6jrFzpEumGeW2W1t1lE5VS0ZYlgAvqhIGckEVZ7m91NI7qSLo/UNQVWJVZLhEZh6jJwcZ5B5rSlSXsBbdmFFdO51Hdf/Z",
    category: "web",
    tags: ["Design", "Website", "Hobby"],
    link: "/projects/4-soul",
    images: [],
  },
  {
    id: "wooden-portfolio-design",
    imageUrl: "/assets/images/designs/design_pf_se2.jpg",
    technologies: ["fireworks", "photoshop"],
    blurDataUrl:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAABgj/xAAiEAACAQMDBQEAAAAAAAAAAAABAgMABBEFEiEGBxMiMXH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABoRAAICAwAAAAAAAAAAAAAAAAECAAMEESH/2gAMAwEAAhEDEQA/AJzoXbu03W+j3eq6jrFzpEumGeW2W1t1lE5VS0ZYlgAvqhIGckEVZ7m91NI7qSLo/UNQVWJVZLhEZh6jJwcZ5B5rSlSXsBbdmFFdO51Hdf/Z",
    category: "design",
    tags: ["Hobby", "Early Stages"],
    link: "/projects/wooden-portfolio-design",
    images: [],
    githubUrl: "",
  },
  {
    id: "cmd-portfolio-design",
    imageUrl: "/assets/images/designs/design_cmd.jpg",
    technologies: ["fireworks", "photoshop"],
    blurDataUrl:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAABgj/xAAiEAACAQMDBQEAAAAAAAAAAAABAgMABBEFEiEGBxMiMXH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABoRAAICAwAAAAAAAAAAAAAAAAECAAMEESH/2gAMAwEAAhEDEQA/AJzoXbu03W+j3eq6jrFzpEumGeW2W1t1lE5VS0ZYlgAvqhIGckEVZ7m91NI7qSLo/UNQVWJVZLhEZh6jJwcZ5B5rSlSXsBbdmFFdO51Hdf/Z",
    category: "design",
    tags: ["Hobby", "Early Stages"],
    link: "/projects/cmd-portfolio-design",
    images: ["/assets/images/designs/design_cmd_white-blue.jpg"],
    githubUrl: "",
  },
  {
    id: "cc-portfolio-design",
    imageUrl: "/assets/images/designs/cc_02.jpg",
    technologies: ["fireworks", "photoshop"],
    blurDataUrl:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAABgj/xAAiEAACAQMDBQEAAAAAAAAAAAABAgMABBEFEiEGBxMiMXH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABoRAAICAwAAAAAAAAAAAAAAAAECAAMEESH/2gAMAwEAAhEDEQA/AJzoXbu03W+j3eq6jrFzpEumGeW2W1t1lE5VS0ZYlgAvqhIGckEVZ7m91NI7qSLo/UNQVWJVZLhEZh6jJwcZ5B5rSlSXsBbdmFFdO51Hdf/Z",
    category: "design",
    tags: ["Hobby", "Design"],
    link: "/projects/cc-portfolio-design",
    images: [],
  },
  {
    id: "imo-fan-project",
    imageUrl: "/assets/images/designs/design_imo_old.png",
    technologies: ["fireworks", "photoshop", "html", "css", "js"],
    blurDataUrl:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAABgj/xAAiEAACAQMDBQEAAAAAAAAAAAABAgMABBEFEiEGBxMiMXH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABoRAAICAwAAAAAAAAAAAAAAAAECAAMEESH/2gAMAwEAAhEDEQA/AJzoXbu03W+j3eq6jrFzpEumGeW2W1t1lE5VS0ZYlgAvqhIGckEVZ7m91NI7qSLo/UNQVWJVZLhEZh6jJwcZ5B5rSlSXsBbdmFFdO51Hdf/Z",
    category: "web",
    tags: ["Hobby", "Gaming", "Website", "Design"],
    link: "/projects/imo-fan-project",
    images: [
      "/assets/images/designs/Imo_grund_003.jpg",
      "/assets/images/designs/Imo_grund_02_003.jpg",
    ],
  },
];

const getLocalizedProject = async (
  project: Omit<Project, "title" | "description">,
  locale: string
): Promise<Project> => {
  try {
    const t = await getServerTranslation(locale, "projects");

    const title = t(`projects.${project.id}.title`) || project.id;
    const description =
      t(`projects.${project.id}.description`) || t("projects.ui.noDescription");

    return {
      ...project,
      title,
      description,
    };
  } catch (error) {
    console.error(
      `Fehler bei der Lokalisierung des Projekts ${project.id}:`,
      error
    );
    return {
      ...project,
      title: project.id,
      description: "",
    };
  }
};

export const getProjects = cache(async (locale: string): Promise<Project[]> => {
  try {
    return await Promise.all(
      projectsData.map((project) => getLocalizedProject(project, locale))
    );
  } catch (error) {
    console.error("Fehler beim Abrufen aller Projekte:", error);
    return [];
  }
});

export const getProjectById = cache(
  async (id: string, locale: string): Promise<Project | undefined> => {
    try {
      const project = projectsData.find((project) => project.id === id);

      if (project) {
        return await getLocalizedProject(project, locale);
      }

      const numId = parseInt(id);
      if (!isNaN(numId) && numId > 0 && numId <= projectsData.length) {
        return await getLocalizedProject(projectsData[numId - 1], locale);
      }

      console.warn(`Kein Projekt mit ID "${id}" gefunden`);
      return undefined;
    } catch (error) {
      console.error(`Fehler beim Laden des Projekts mit ID ${id}:`, error);
      return undefined;
    }
  }
);

export const getRelatedProjects = cache(
  async (
    category: string,
    excludeId: string,
    locale: string
  ): Promise<Project[]> => {
    try {
      const relatedProjectsData = projectsData
        .filter(
          (project) => project.category === category && project.id !== excludeId
        )
        .slice(0, 3);

      return await Promise.all(
        relatedProjectsData.map((project) =>
          getLocalizedProject(project, locale)
        )
      );
    } catch (error) {
      console.error("Fehler beim Abrufen verwandter Projekte:", error);
      return [];
    }
  }
);

export const getProjectsByCategory = cache(
  async (category: string, locale: string): Promise<Project[]> => {
    try {
      const allProjects = await getProjects(locale);

      if (category === "all") {
        return allProjects;
      }

      return allProjects.filter((project) => project.category === category);
    } catch (error) {
      console.error("Fehler beim Filtern von Projekten:", error);
      return [];
    }
  }
);
