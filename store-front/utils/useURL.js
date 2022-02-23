export default function useURL() {
  if (typeof window !== 'undefined') {
    const hostname = `http://${window.location.hostname}`;
    return hostname
  }
  return ""
}
