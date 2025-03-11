import {defineField, defineType} from 'sanity'

export const testsType = defineType({
  name: 'tests',
  title: 'ტესტები',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'სათაური',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      type: 'date',
      title: 'თარიღი',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "grade",
      title: "კლასის დიაპაზონი",
      type: "object",
      fields: [
        defineField({
          name: "from",
          type: "number",
          title: "დან (კლასი)",
          validation: (rule) => rule.required().min(1).max(12),
        }),
        defineField({
          name: "to",
          type: "number",
          title: "მდე (კლასი)",
          validation: (rule) =>
            rule
              .required()
              .min(1)
              .max(12)
              .custom((to, context) =>
                to >= context.parent.from
                  ? true
                  : "მინიმალური კლასი უნდა იყოს ნაკლები ან ტოლი მაქსიმალური კლასის"
              ),
        }),
      ],
    }),
    defineField({
      name: 'subject',
      title: 'აირჩიეთ საგანი',
      type: 'string',
      options: {
        list: [
          {title: 'მათემატიკა', value: 'math'},
          {title: 'ქართული', value: 'georgian'},
          {title: 'ინგლისური', value: 'english'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tests',
      type: 'file',
      title: 'ტესტი',
      description: 'აქ ატვირთეთ ტესტის ფაილი',
      validation: (rule) => rule.required(),
    }),
  ],
})
