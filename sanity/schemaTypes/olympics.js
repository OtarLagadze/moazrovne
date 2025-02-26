import {defineField, defineType} from 'sanity'
import {createClient} from 'next-sanity'

const client = createClient({
  apiVersion: '2023-05-03',
  dataset: 'production',
  projectId: '8390afyw',
  useCdn: false,
})

const gradeOptions = [
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
]

const subjectOptions = [
  {title: 'მათემატიკა', value: 'math'},
  {title: 'ქართული', value: 'georgian'},
  {title: 'ინგლისური', value: 'english'},
]

export const olympicsType = defineType({
  name: 'olympics',
  title: 'ოლიმპიადა',
  type: 'document',
  fields: [
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
      type: 'string',
      title: 'ტესტი',
      description: 'აქ ჩასვით გუგლ ფორმსის ლინკი',
      validation: (rule) => rule.required(),
    }),
  ],
  // Creates title from subject and grade
  preview: {
    select: {
      grade: 'grade',
      subject: 'subject',
    },
    prepare(selection) {
      const {grade, subject} = selection
      // Value returns key for grades and subjects, so if we want georgian label we need to find it in subjectOptions and gradeOptions
      const gradeTitle = gradeOptions.find((option) => option.value === grade)?.title
      const subjectTitle = subjectOptions.find((option) => option.value === subject)?.title
      return {
        title: `${subjectTitle} - ${gradeTitle}`,
      }
    },
  },
  validation: (rule) =>
    rule.custom(async (fields, context) => {
      const {grade, subject} = fields
      const {document} = context
      // This is needed because current document Id returns drafts. prefix, so we need to remove it
      const documentId = document._id.replace('drafts.', '')

      // Check if there is already a document with the same grade and subject, but do not include the current document (Otherwise error will still show if current file is published already and we are only editing it)
      const existingDocs = await client.fetch(
        `*[
          _type == "olympics" &&
          grade == "${grade}" &&
          subject == "${subject}" &&
          !(_id in path("drafts.**")) &&
          _id != "${documentId}"
        ]`,
      )
      // This will show an error if there is already a document with the same grade and subject, paths: ['grade', 'subject'] is needed because it will highlight the fields that have the error (If we didnt do it only error icon would show in top right and maybe user wouldn't notice it)
      if (existingDocs.length > 0) {
        return {
          message:
            'ამ კლასისა და საგნის ტესტი უკვე არსებობს, თუ შეცვლა გსურთ, გთხოვთ წაშალოთ არსებული ტესტი ან დაარედაქტიროთ',
          paths: ['grade', 'subject'],
        }
      }
      return true
    }),
})
