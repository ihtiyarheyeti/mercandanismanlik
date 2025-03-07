import { searchImages, downloadImage } from '../utils/pexels'
import { useBlogStore } from '../stores/blog'

const blogStore = useBlogStore()
const blogs = blogStore.getAllBlogs

const downloadBlogImages = async () => {
  for (const blog of blogs) {
    try {
      // Blog başlığına göre görsel ara
      const photos = await searchImages(blog.title, 1)
      
      if (photos && photos.length > 0) {
        const photo = photos[0]
        const fileName = blog.featured_image.split('/').pop() || 'blog-image.jpg'
        
        // Görseli indir
        await downloadImage(photo.src.large, fileName)
        console.log(`İndirilen görsel: ${fileName}`)
      }
    } catch (error) {
      console.error(`Görsel indirme hatası (${blog.title}):`, error)
    }
  }
}

// Script'i çalıştır
downloadBlogImages() 