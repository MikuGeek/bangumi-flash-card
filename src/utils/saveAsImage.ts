import html2canvas from 'html2canvas'

export const saveAsImage = async (element: HTMLElement | null) => {
  if (!element) return

  try {
    // Wait for all images to load
    const images = element.getElementsByTagName('img')
    await Promise.all(
      Array.from(images).map(img => {
        if (img.complete) return Promise.resolve()
        return new Promise((resolve) => {
          img.onload = resolve
          img.onerror = resolve // Handle error case as well
        })
      })
    )

    // Configure html2canvas with better image handling
    const canvas = await html2canvas(element, {
      useCORS: true, // Enable CORS for images
      allowTaint: true, // Allow cross-origin images
      logging: true, // Enable logging for debugging
      imageTimeout: 0, // No timeout for images
      scale: 2, // Higher quality output
    })

    const image = canvas.toDataURL('image/png', 1.0)
    const link = document.createElement('a')
    link.download = 'anime-card.png'
    link.href = image
    link.click()
  } catch (error) {
    console.error('Failed to save image:', error)
  }
}