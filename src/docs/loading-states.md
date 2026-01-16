# Loading States - Best Practices

Dieses Dokument beschreibt die Best Practices für die Verwendung von Loading States im Portfolio-Projekt.

## Verfügbare Komponenten

### Basis-Komponenten

- `Skeleton`: Grundlegende Skeleton-Komponente für alle Loading-Zustände
- `LoadingOverlay`: Overlay für asynchrone Operationen
- `LoadingProvider`: Context Provider für globale Loading-Zustände
- `ImagePlaceholder`: Spezieller Placeholder für Bilder

### Spezifische Komponenten

- `ProjectCardSkeleton`: Skeleton für Projektkarten
- `ProjectGallerySkeleton`: Skeleton für die Projektgalerie
- `ProjectsGridSkeleton`: Skeleton für das Projektraster

## Hooks

- `useLoading`: Hook für die Verwaltung von Loading-Zuständen mit Verzögerung und Mindestanzeigezeit

## Integration mit React Suspense

Suspense ist ein React-Feature, das das "Suspendieren" des Renderings ermöglicht, bis bestimmte Bedingungen erfüllt sind (z.B. Daten geladen wurden).

```tsx
<Suspense fallback={<ProjectsGridSkeleton />}>
  <ProjectsGrid initialProjects={projects} />
</Suspense>
```

## Best Practices

### 1. Verwende Suspense für Code-Splitting und asynchrone Komponenten

```tsx
const ProjectGallery = dynamic(
  () => import("@/components/sections/Projects/ProjectGallery"),
  {
    ssr: false,
    loading: () => <ProjectGallerySkeleton />,
  },
);
```

### 2. Verwende den useLoading Hook für UI-Feedback bei asynchronen Operationen

```tsx
const { isLoading, setLoading, setSuccess, wrapAsync } = useLoading();

useEffect(() => {
  const loadData = async () => {
    setLoading();
    try {
      const data = await fetchData();
      setSuccess();
      return data;
    } catch (error) {
      setError();
      throw error;
    }
  };

  loadData();
}, []);

// Oder verwende wrapAsync für einfachere Handhabung
useEffect(() => {
  wrapAsync(fetchData)
    .then((data) => setData(data))
    .catch((error) => console.error(error));
}, []);
```

### 3. Verwende Skeleton-Komponenten für Platzhalter

```tsx
{
  isLoading ? <ProjectCardSkeleton /> : <ProjectCard project={project} />;
}
```

### 4. Füge transition-Animationen hinzu für weichere Übergänge

```tsx
<AnimatePresence mode="wait">
  {isLoading ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Skeleton />
    </motion.div>
  ) : (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Content />
    </motion.div>
  )}
</AnimatePresence>
```

### 5. Verwende die LoadingProvider für globale Loading-Zustände

```tsx
// Im Layout oder einer übergeordneten Komponente
<LoadingProvider>{children}</LoadingProvider>;

// In jeder Komponente
const { showLoading, hideLoading } = useLoadingContext();

const handleSubmit = async () => {
  showLoading("form");
  await submitForm();
  hideLoading("form");
};
```

## Richtlinien

1. **Konsistenz**: Verwende immer die gleichen Loading-Komponenten für ähnliche UI-Elemente
2. **Feedback**: Gib dem Benutzer visuelles Feedback für alle Aktionen, die länger als 300ms dauern
3. **Animation**: Verwende subtile Animationen (pulse oder shimmer), um Loading-Zustände anzuzeigen
4. **Verzögerung**: Verwende kurze Verzögerungen (200-300ms), um Flackern bei schnellen Operationen zu vermeiden
5. **Mindestanzeigezeit**: Setze eine Mindestanzeigezeit (300-500ms), um zu schnelle Wechsel zwischen Loading-Zuständen zu vermeiden
