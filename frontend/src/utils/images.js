export const DEFAULT_EVENT_IMAGE =
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80';

export function handleImageFallback(event) {
  if (event.currentTarget.src !== DEFAULT_EVENT_IMAGE) {
    event.currentTarget.src = DEFAULT_EVENT_IMAGE;
  }
}

