export type LabLink = {
  kind: 'link';
  label: string;
  href: string;
  external?: boolean;
};

export type LabGroup = {
  kind: 'group';
  label: string;
  children: LabMenuItem[];
};

export type LabMenuItem = LabLink | LabGroup;

export const LAB_MENU: LabMenuItem[] = [
  { kind: 'link', label: 'Tempo', href: '/tempo/' },
  { kind: 'link', label: 'PDF', href: '/pdf/' },
  {
    kind: 'link',
    label: 'Cortar',
    href: 'https://corte-imagem-em-varias.vercel.app/',
    external: true,
  },
  {
    kind: 'link',
    label: 'Converter',
    href: 'https://image-webp-alpha.vercel.app/',
    external: true,
  },
  {
    kind: 'link',
    label: 'Memoria',
    href: 'https://second-brain-kappa-azure.vercel.app/',
    external: true,
  },
  {
    kind: 'link',
    label: 'Hide',
    href: 'https://hide-whatsapp-mini.vercel.app/',
    external: true,
  },
  {
    kind: 'link',
    label: 'Fotos',
    href: 'https://mosaico-canvas.vercel.app/',
    external: true,
  },
];
