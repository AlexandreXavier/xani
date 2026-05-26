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
    kind: 'group',
    label: 'Image',
    children: [
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
    ],
  },
  {
    kind: 'link',
    label: 'memoria',
    href: 'https://second-brain-kappa-azure.vercel.app/',
    external: true,
  },
  {
    kind: 'link',
    label: 'hide',
    href: 'https://hide-whatsapp-mini.vercel.app/',
    external: true,
  },
];
