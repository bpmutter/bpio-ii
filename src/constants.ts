import IconMail from '@/assets/icons/IconMail.svg'
import IconGitHub from '@/assets/icons/IconGitHub.svg'
import IconBrandX from '@/assets/icons/IconBrandX.svg'
import IconLinkedin from '@/assets/icons/IconLinkedin.svg'
import IconWhatsapp from '@/assets/icons/IconWhatsapp.svg'
import IconFacebook from '@/assets/icons/IconFacebook.svg'
import IconTelegram from '@/assets/icons/IconTelegram.svg'
import IconPinterest from '@/assets/icons/IconPinterest.svg'
import RobotImage from '@/assets/images/robot.ghibli.png'
import CloudImage from '@/assets/images/sitting_on_cloud.ghibli.png'
import TechnicalWriting from '@/assets/images/technical_writing.ghibli.png'
import ReadingImage from '@/assets/images/reading.ghibli.png'
import { SITE } from '@/config'
import type { ImageMetadata } from 'astro'
import type { AstroComponentFactory } from 'astro/runtime/server/index.js'

interface IconLink {
  name: string
  href: string
  linkTitle: string
  icon: AstroComponentFactory
}

export const SOCIALS: IconLink[] = [
  {
    name: 'Github',
    href: 'https://github.com/bpmutter',
    linkTitle: ` ${SITE.title} on Github`,
    icon: IconGitHub,
  },
  {
    name: 'X',
    href: 'https://x.com/bpmutter',
    linkTitle: `${SITE.title} on X`,
    icon: IconBrandX,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ben-perlmutter/',
    linkTitle: `${SITE.title} on LinkedIn`,
    icon: IconLinkedin,
  },
  {
    name: 'Mail',
    href: 'mailto:ben@perlmutter.io',
    linkTitle: `Send an email to ${SITE.title}`,
    icon: IconMail,
  },
] as const

export const SHARE_LINKS: IconLink[] = [
  {
    name: 'WhatsApp',
    href: 'https://wa.me/?text=',
    linkTitle: `Share this post via WhatsApp`,
    icon: IconWhatsapp,
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/sharer.php?u=',
    linkTitle: `Share this post on Facebook`,
    icon: IconFacebook,
  },
  {
    name: 'X',
    href: 'https://x.com/intent/post?url=',
    linkTitle: `Share this post on X`,
    icon: IconBrandX,
  },
  {
    name: 'Telegram',
    href: 'https://t.me/share/url?url=',
    linkTitle: `Share this post via Telegram`,
    icon: IconTelegram,
  },
  {
    name: 'Pinterest',
    href: 'https://pinterest.com/pin/create/button/?url=',
    linkTitle: `Share this post on Pinterest`,
    icon: IconPinterest,
  },
  {
    name: 'Mail',
    href: 'mailto:?subject=See%20this%20post&body=',
    linkTitle: `Share this post via email`,
    icon: IconMail,
  },
] as const

interface CoreCompetency {
  name: string
  image: ImageMetadata
}

export const CORE_COMPETENCIES: CoreCompetency[] = [
  {
    name: 'Learning Quickly',
    image: ReadingImage,
  },
  {
    name: 'Cloud Computing',
    image: CloudImage,
  },
  {
    name: 'Generative AI',
    image: RobotImage,
  },
  {
    name: 'Technical Writing',
    image: TechnicalWriting,
  },
]

export const ABOUT_ME = {
  name: 'Ben Perlmutter',
  title: 'Senior Software Engineer at MongoDB',
  overview:
    "I'm an AI engineer and technical writer. I work at the intersection of content and code.",
}
