import { Smartphone, Apple, Monitor, Terminal, Laptop, Globe, type LucideIcon } from 'lucide-vue-next'

export interface Platform {
  id: 'android' | 'ios' | 'windows' | 'linux' | 'macos' | 'web'
  name: string
  icon: LucideIcon
  available: boolean
  description: string
  descriptionEn: string
}

export const platforms: Platform[] = [
  {
    id: 'android',
    name: 'Android',
    icon: Smartphone,
    available: true,
    description: 'APK, Android 8.0+',
    descriptionEn: 'APK, Android 8.0+',
  },
  {
    id: 'ios',
    name: 'iOS',
    icon: Apple,
    available: false,
    description: 'через веб-версию',
    descriptionEn: 'via web version',
  },
  {
    id: 'web',
    name: 'Web',
    icon: Globe,
    available: false,
    description: 'скоро',
    descriptionEn: 'soon',
  },
  {
    id: 'windows',
    name: 'Windows',
    icon: Monitor,
    available: false,
    description: 'в разработке',
    descriptionEn: 'in development',
  },
  {
    id: 'linux',
    name: 'Linux',
    icon: Terminal,
    available: false,
    description: 'в разработке',
    descriptionEn: 'in development',
  },
  {
    id: 'macos',
    name: 'macOS',
    icon: Laptop,
    available: false,
    description: 'в разработке',
    descriptionEn: 'in development',
  }
]