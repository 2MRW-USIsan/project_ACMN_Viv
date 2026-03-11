import type { YamlData } from '@/types/yaml';

export const mockYamlData: YamlData = {
  title: 'Character Image Generator',
  Orders: [
    {
      property: 'style',
      type: 'Random',
      items: [
        { label: 'anime', weight: 3 },
        { label: 'realistic', weight: 2 },
        { label: 'watercolor', weight: 1 },
        { label: 'oil painting', weight: 1 },
        { label: 'pixel art', weight: 1 },
      ],
    },
    {
      property: 'character',
      type: 'Complex',
      items: [
        {
          label: 'girl',
          weight: 2,
          subitems: [
            { label: 'with long silver hair', weight: 2 },
            { label: 'with twin braids', weight: 1 },
            { label: 'with short bob cut', weight: 1 },
          ],
        },
        {
          label: 'boy',
          weight: 2,
          subitems: [
            { label: 'with dark spiky hair', weight: 2 },
            { label: 'with neat side part', weight: 1 },
          ],
        },
        {
          label: 'warrior',
          weight: 1,
          subitems: [
            { label: 'in heavy armor', weight: 1 },
            { label: 'wielding a greatsword', weight: 1 },
          ],
        },
      ],
    },
    {
      property: 'scripts',
      type: 'Scripts',
      items: [
        { label: 'masterpiece, best quality, highly detailed, 8k resolution' },
      ],
    },
    {
      property: 'background',
      type: 'Color',
      items: [
        { label: 'gradient pastel pink to lavender' },
      ],
    },
  ],
};
