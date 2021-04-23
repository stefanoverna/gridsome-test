<template>
  <Layout>
    <h1>{{ $page.blogPost.title }}</h1>
    <datocms-structured-text
      :data="groupedContent"
      :renderBlock="renderBlock"
      :customRules="customRules"
    />
  </Layout>
</template>

<script>
import { h } from '@vue/composition-api';
import { isBlock, renderRule } from 'datocms-structured-text-utils';
import produce from "immer";

export default {
  metaInfo: {
    title: 'Hello, world!'
  },
  methods: {
    renderBlock({ record }) {
      return h('div', null, 'BLOCK');
    }
  },
  data: () => ({
    customRules: [
      renderRule(
        (node) => node.type === 'group',
        ({ children, key }) => {
          return h("div", { key, style: { background: 'yellow' } }, children);
        },
      ),
    ]
  }),
  computed: {
    groupedContent() {
      return produce(this.$page.blogPost.content, content => {
        content.value.document.children = content.value.document.children.reduce(
          (newChildren, node) => {
            if (isBlock(node)) {
              return [...newChildren, node];
            }

            const lastNode =
              newChildren.length > 0 && newChildren[newChildren.length - 1];

            if (lastNode && lastNode.type === "group") {
              lastNode.children.push(node);
              return newChildren;
            }

            return [...newChildren, { type: "group", children: [node] }];
          },
          []
        );
      });
    },
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>

<page-query>
  {
    blogPost(filter:{id:{eq:"19489273"}}) {
      id
      title
      content {
        value
        blocks {
          __typename
          ... on datocms_InternalVideoRecord {
            id
          }
          ... on datocms_MultipleDemosBlockRecord {
            id
          }
          ... on datocms_ImageRecord {
            id
            image {
              url
            }
          }
        }
      }
    }
  }
</page-query>