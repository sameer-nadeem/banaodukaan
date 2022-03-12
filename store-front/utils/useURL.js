export default function useURL() {
  if (typeof window !== 'undefined') {
    const hostname = `http://${window.location.hostname}:5000`;
    return hostname
  }
  return ""
}
