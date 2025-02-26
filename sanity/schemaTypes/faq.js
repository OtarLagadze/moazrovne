import {defineField, defineType} from 'sanity'

export const faqType = defineType({
  name: 'faq',
  title: 'ხშირად დასმული კითხვები',
  type: 'document',
  fields: [
    defineField({
      name: 'faq',
      type: 'string',
      title: 'კითხვა',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'answer',
      type: 'array',
      title: 'პასუხი',
      of: [
        {
          type: 'block',
        },
      ],
      validation: (rule) => rule.required(),
    }),
  ],
})
