
export function generateMessage(type: string) {
    if (type === 'text') {
      return "X".repeat(1024);  // 1KB text
    } else if (type === 'image') {
      return "X".repeat(1024*500);  // 500KB like a image
    } 
  }
  