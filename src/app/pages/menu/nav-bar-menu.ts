import { NbMenuItem } from '@nebular/theme';

export const navBarMenuItems: NbMenuItem[] = [
  {
    title: '',
    children: [
      {
        title: 'profile',
        icon: 'user',
        data: { id: 'profile' },
      },
      {
        title: 'logout',
        icon: 'power-off',
        data: { id: 'logout' },
      },
    ],
  },
];
