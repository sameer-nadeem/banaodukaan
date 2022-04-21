export default function useURL() {
  if (typeof window !== 'undefined') {
    const hostname = `https://${window.location.hostname}`;
    return hostname
  }
  return ""
}
