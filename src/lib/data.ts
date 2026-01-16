import { collection, getDocs } from "firebase/firestore";
import { cache } from "react";
import { db } from "@/lib/firebase/firebase";
import { Project } from "@/types";

export const getProjects = cache(async (locale: string): Promise<Project[]> => {
  try {
    const projectsRef = collection(db, "projects");
    const snapshot = await getDocs(projectsRef);

    const firestoreProjects = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title || "",
        description: data.description || "",
        imageUrl: data.imageUrl || "/assets/images/placeholder.jpg",
        images: data.images || [],
        technologies: data.technologies || [],
        category: data.category || "web",
        tags: data.tags || [],
        link: data.link || `/projects/${doc.id}`,
        githubUrl: data.githubUrl,
        liveUrl: data.liveUrl,
        isFeatured: data.isFeatured ?? false,
        isVisible: data.isVisible ?? true,
        source: "firestore",
      } as Project;
    });

    // Filter hidden projects
    return firestoreProjects.filter((p) => p.isVisible !== false);
  } catch (error) {
    console.error("Fehler beim Abrufen aller Projekte:", error);
    return [];
  }
});

export const getProjectById = cache(
  async (id: string, locale: string): Promise<Project | undefined> => {
    try {
      const { doc, getDoc } = await import("firebase/firestore");
      const docRef = doc(db, "projects", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          title: data.title || "",
          description: data.description || "",
          imageUrl: data.imageUrl || "/assets/images/placeholder.jpg",
          images: data.images || [],
          technologies: data.technologies || [],
          category: data.category || "web",
          tags: data.tags || [],
          link: data.link || `/projects/${docSnap.id}`,
          githubUrl: data.githubUrl,
          liveUrl: data.liveUrl,
          content: data.content,
          isFeatured: data.isFeatured ?? false,
          isVisible: data.isVisible ?? true,
          source: "firestore",
        } as Project;
      }

      console.warn(`Kein Projekt mit ID "${id}" gefunden`);
      return undefined;
    } catch (error) {
      console.error(`Fehler beim Laden des Projekts mit ID ${id}:`, error);
      return undefined;
    }
  },
);

export const getRelatedProjects = cache(
  async (
    category: string,
    excludeId: string,
    locale: string,
  ): Promise<Project[]> => {
    try {
      const allProjects = await getProjects(locale);

      const relatedProjects = allProjects
        .filter(
          (project) =>
            project.category === category && project.id !== excludeId,
        )
        .slice(0, 3);

      return relatedProjects;
    } catch (error) {
      console.error("Fehler beim Abrufen verwandter Projekte:", error);
      return [];
    }
  },
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
  },
);
