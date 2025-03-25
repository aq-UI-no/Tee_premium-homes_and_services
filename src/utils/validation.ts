export interface ValidationError {
  field: string;
  message: string;
}

export interface PropertyFormData {
  title: string;
  description: string;
  type: string;
  price: string;
  location: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  maxGuests: string;
  amenities: string;
  rules: string;
}

export function validatePropertyForm(data: PropertyFormData): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.title.trim()) {
    errors.push({ field: 'title', message: 'Property title is required' });
  }

  if (!data.description.trim()) {
    errors.push({ field: 'description', message: 'Property description is required' });
  }

  if (!data.type) {
    errors.push({ field: 'type', message: 'Property type is required' });
  }

  if (!data.price || Number(data.price) <= 0) {
    errors.push({ field: 'price', message: 'Valid price is required' });
  }

  if (!data.location.trim()) {
    errors.push({ field: 'location', message: 'Location is required' });
  }

  if (!data.bedrooms || Number(data.bedrooms) <= 0) {
    errors.push({ field: 'bedrooms', message: 'Number of bedrooms is required' });
  }

  if (!data.bathrooms || Number(data.bathrooms) <= 0) {
    errors.push({ field: 'bathrooms', message: 'Number of bathrooms is required' });
  }

  if (!data.area || Number(data.area) <= 0) {
    errors.push({ field: 'area', message: 'Property area is required' });
  }

  if (!data.maxGuests || Number(data.maxGuests) <= 0) {
    errors.push({ field: 'maxGuests', message: 'Maximum number of guests is required' });
  }

  if (!data.amenities.trim()) {
    errors.push({ field: 'amenities', message: 'Please list at least one amenity' });
  }

  if (!data.rules.trim()) {
    errors.push({ field: 'rules', message: 'Please specify house rules' });
  }

  return errors;
} 