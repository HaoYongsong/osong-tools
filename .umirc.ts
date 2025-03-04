import { defineConfig } from '@umijs/max';

export default defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  history: {
    type: 'hash',
  },
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: '小彼恩',
      path: '/xiaobien',
      routes: [
        {
          name: 'MP3切割',
          path: '/xiaobien/mp3',
          component: './xiaobien/mp3',
        },
        {
          name: '文档',
          path: '/xiaobien/doc',
          component: './xiaobien/README.mdx',
        },
      ],
    },
  ],
  npmClient: 'yarn',
  mdx: {
    loader: '@mdx-js/loader',
    loaderOptions: {
      // providerImportSource: '@mdx-js/react',
      // remarkPlugins: [
      //   remarkParse,
      //   remarkFrontmatter,
      //   remarkDirective,
      //   remarkBreaks,
      //   remarkGfm,
      // ],
      // rehypePlugins: [
      //   rehypeAutolinkHeadings,
      //   rehypeRemoveComments,
      //   [rehypePrismPlus, { ignoreMissing: true }],
      //   [
      //     rehypeExternalLinks,
      //     {
      //       target(element: Element) {
      //         return element.properties &&
      //           /^https?:\/\//.test(`${element.properties!.href}`)
      //           ? '_blank'
      //           : undefined;
      //       },
      //     },
      //   ],
      // ],
    },
  },
});
