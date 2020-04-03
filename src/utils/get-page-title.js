import defaultSettings from '@/settings'

const title = defaultSettings.title || '黄世杰的项目'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
