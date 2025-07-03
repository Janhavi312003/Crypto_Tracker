// Cartoon avatar generator with different styles
export const generateCartoonAvatar = (name, style = "adventurer") => {
  const seed = name.toLowerCase().replace(/\s+/g, "")
  const styles = [
    "adventurer",
    "adventurer-neutral",
    "avataaars",
    "big-ears",
    "big-ears-neutral",
    "big-smile",
    "bottts",
    "croodles",
    "croodles-neutral",
    "fun-emoji",
    "icons",
    "identicon",
    "initials",
    "lorelei",
    "lorelei-neutral",
    "micah",
    "miniavs",
    "open-peeps",
    "personas",
    "pixel-art",
    "pixel-art-neutral",
    "shapes",
    "thumbs",
  ]

  const selectedStyle = styles.includes(style) ? style : "adventurer"
  return `https://api.dicebear.com/7.x/${selectedStyle}/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`
}

export const getRandomCartoonStyle = () => {
  const styles = [
    "adventurer",
    "avataaars",
    "big-smile",
    "bottts",
    "croodles",
    "fun-emoji",
    "lorelei",
    "micah",
    "open-peeps",
    "pixel-art",
  ]
  return styles[Math.floor(Math.random() * styles.length)]
}
