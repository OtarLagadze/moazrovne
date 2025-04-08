import {defineField, defineType} from 'sanity'

export const instructionType = defineType({
  name: 'instruction',
  title: 'ინსტრუქციები',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'სათაური',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
      },
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
      title: 'ინსტრუქცია',
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
