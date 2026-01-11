export interface NavLink {
  label: string;
  href: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

export enum AiMode {
  CHAT = 'chat',
  VISION = 'vision',
  TTS = 'tts'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}