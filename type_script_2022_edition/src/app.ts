const pages = [
  { href: '/get-started', title: 'Get started' },
  { href: '/basics-and-basic-types', title: 'Basics and basic types' },
  { href: '/classes', title: 'Classes' },
  { href: '/interfaces', title: 'Interfaces' },
  { href: '/advanced-types', title: 'Advanced types' },
  { href: '/generics', title: 'Generics' },
  { href: '/decorators', title: 'Decorators' },
  { href: '/drag-and-drop', title: 'Drag & Drop' },
  { href: '/namespaces', title: 'Namespaces' },
  { href: '/modules', title: 'Modules' },
  { href: '/webpack', title: 'Webpack' },
  { href: '/3rd-party-libraries-and-ts', title: '3rd party libraries & TS' },
  { href: '/select-and-share-place', title: 'Select & Share a Place' },
];

function displayLinks() {
  if (!document || !document.body) {
    return
  }

  const title = document.createElement('div');

  title.innerText = 'TS';
  document.body.appendChild(title)

  pages.forEach((page) => {
    const link = document.createElement('a');

    link.setAttribute('href', page.href);
    link.innerText = page.title;
    document.body.appendChild(link)
  })
}

window.onload = displayLinks