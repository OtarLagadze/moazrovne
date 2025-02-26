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
      name: 'grade',
      title: 'აირჩიეთ კლასი',
      type: 'string',
      options: {
        list: [
          {title: '1', value: '1'},
          {title: '2', value: '2'},
          {title: '3', value: '3'},
          {title: '4', value: '4'},
          {title: '5', value: '5'},
          {title: '6', value: '6'},
          {title: '7', value: '7'},
          {title: '8', value: '8'},
          {title: '9', value: '9'},
          {title: '10', value: '10'},
          {title: '11', value: '11'},
          {title: '12', value: '12'},
          {title: 'გაერთიანებული', value: 'union'},
        ],
      },
      validation: (rule) => rule.required(),
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
