export const getLocale = (key) => localStorage.getItem(key)
export const setLocale = (key, value ) => localStorage.setItem(key, value)

export function slugify(string) { 
  return string.toString().toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
};



export function isUrlValid(string) {
  try {
    new URL(string)
    return true
  }
  catch (err) {
    return false
  }
}