import { defineField, defineType } from 'sanity';

export const nationalExamsType = defineType({
  name: 'nationalExams',
  title: 'ეროვნული გამოცდების ტესტები',
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
      name: 'nationalExams',
      type: 'file',
      title: 'PDF ფაილი',
      description: 'აქ ატვირთეთ ფაილი',
      validation: (rule) => rule.required(),
    }),
  ],
}); 

export const practiceTestsType = defineType({
  name: 'practiceTests',
  title: 'სავარჯიშო ტესტები',
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
      name: 'practiceTests',
      type: 'file',
      title: 'PDF ფაილი',
      description: 'აქ ატვირთეთ ფაილი',
      validation: (rule) => rule.required(),
    }),
  ],
});

export const practiceBookType = defineType({
  name: 'practiceBook',
  title: 'მოსამზადებელი კრებული',
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
      name: 'practiceBook',
      type: 'file',
      title: 'PDF ფაილი',
      description: 'აქ ატვირთეთ ფაილი',
      validation: (rule) => rule.required(),
    }),
  ],
});
