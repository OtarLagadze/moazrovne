import {defineField, defineType} from 'sanity'

export const aboutType = defineType({
  name: 'about',
  title: 'ჩვენ შესახებ',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'სათაური',
      description: 'აქ შეგიძლიათ დაწეროთ ტექსტი, რაც სურათის ზევით გინდათ, ეწეროს',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titleImage',
      type: 'image',
      title: 'სურათი',
    }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'ტექსტი',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
        },
      ],
    }),
  ],
})
