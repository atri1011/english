export interface UserApiConfig {
  user_id: string;
  api_url: string;
  // API Key is never exposed to the client
  model_name: string;
}