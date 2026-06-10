export const DEFAULT_EVENT_IMAGE =
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80';

export function normalizeImageUrl(imageUrl) {
  if (!imageUrl || !imageUrl.trim()) {
    return DEFAULT_EVENT_IMAGE;
  }

  const trimmedUrl = imageUrl.trim();
  const isWebUrl = /^https?:\/\//i.test(trimmedUrl);

  return isWebUrl ? trimmedUrl : DEFAULT_EVENT_IMAGE;
}

