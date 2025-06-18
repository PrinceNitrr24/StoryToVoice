export interface Story {
  id: string;
  title: string;
  content?: string;
  thumbnail_url?: string;
  created_at: string;
  updated_at?: string;
  audio_file?: string;
}

export interface CreateStoryRequest {
  title: string;
  content: string;
  thumbnail_url?: string;
}

export interface APIResponse<T> {
  data?: T;
  error?: string;
}
