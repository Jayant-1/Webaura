export const contactDetails = {
  city: 'Pune',
  phoneDisplay: '+91 9699197282',
  phoneHref: 'tel:+919699197282',
  whatsappNumber: '919699197282',
  emails: ['mrunaljadhav5912@gmail.com', 'webaura06@gmail.com'],
  instagram: [
    { label: '@mrunaljadhav99', href: 'https://www.instagram.com/mrunaljadhav99/' },
    { label: '@webaura_06', href: 'https://www.instagram.com/webaura_06/' },
  ],
}

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${contactDetails.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export function buildGmailComposeUrl(subject: string, body: string) {
  const recipients = contactDetails.emails.join(',')

  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipients)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function createLeadMessage({
  business,
  goal,
  name,
  phone,
}: {
  business: string
  goal: string
  name: string
  phone: string
}) {
  return [
    'Hi Webaura, I want to discuss a website project.',
    '',
    `Name: ${name}`,
    `Business: ${business}`,
    `Phone/WhatsApp: ${phone}`,
    `Goal: ${goal}`,
    '',
    'Please contact me for a free consultation.',
  ].join('\n')
}
