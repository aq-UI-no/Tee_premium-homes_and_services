import { v4 as uuidv4 } from 'uuid';

export interface UploadedImage {
  id: string;
  url: string;
  isMain: boolean;
}

export class ImageUploadService {
  private static instance: ImageUploadService;
  private readonly MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  private readonly ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

  private constructor() {}

  static getInstance(): ImageUploadService {
    if (!ImageUploadService.instance) {
      ImageUploadService.instance = new ImageUploadService();
    }
    return ImageUploadService.instance;
  }

  private validateFile(file: File): string | null {
    if (file.size > this.MAX_FILE_SIZE) {
      return 'File size must be less than 5MB';
    }
    if (!this.ALLOWED_TYPES.includes(file.type)) {
      return 'File type must be JPEG, PNG, or WebP';
    }
    return null;
  }

  async uploadImage(file: File): Promise<UploadedImage> {
    const error = this.validateFile(file);
    if (error) {
      throw new Error(error);
    }

    try {
      // TODO: Replace with actual cloud storage implementation
      // This is a mock implementation
      const formData = new FormData();
      formData.append('file', file);
      formData.append('id', uuidv4());

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      return {
        id: uuidv4(),
        url: URL.createObjectURL(file),
        isMain: false
      };
    } catch (error) {
      throw new Error('Failed to upload image');
    }
  }

  async uploadMultipleImages(files: File[]): Promise<UploadedImage[]> {
    const uploadPromises = files.map(file => this.uploadImage(file));
    return Promise.all(uploadPromises);
  }

  async deleteImage(imageId: string): Promise<void> {
    // TODO: Implement actual image deletion
    console.log('Deleting image:', imageId);
  }
} 