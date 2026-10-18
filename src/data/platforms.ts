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
    id: 'windows',
    name: 'Windows',
    icon: Monitor,
    available: true, // Теперь доступно
    description: 'ZIP, Windows 10+',
    descriptionEn: 'ZIP, Windows 10+',
  },
  {
    id: 'linux',
    name: 'Linux',
    icon: Terminal,
    available: true, // Теперь доступно
    description: 'TAR.GZ, x64',
    descriptionEn: 'TAR.GZ, x64',
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
    id: 'macos',
    name: 'macOS',
    icon: Laptop,
    available: false,
    description: 'в разработке',
    descriptionEn: 'in development',
  }
]