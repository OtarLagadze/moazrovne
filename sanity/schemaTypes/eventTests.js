import { defineField, defineType } from 'sanity';

export const eventTestsType = defineType({
  name: 'eventTests',
  title: 'ოლიმპიადაზე გამოყენებული ტესტები',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'სათაური',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "testId",
      type: "number",
      title: "ტესტის ID",
      description: "ეს ID ავტომატურად გენერირდება"
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
          {title: 'მოაზროვნე', value: 'moazrovne'},
          {title: 'მათემატიკა', value: 'math'},
          {title: 'ქართული', value: 'georgian'},
          {title: 'ინგლისური', value: 'english'},
        ],
      }
    }),
    defineField({
      name: 'tests',
      type: 'file',
      title: 'ტესტი',
      description: 'აქ ატვირთეთ ტესტის ფაილი',
      validation: (rule) => rule.required(),
    })
  ],
  initialValue: async () => {
    const query = `count(*[_type == "eventTests"])`;
    const lastCount = await fetchCountFromSanity(query);
    return {
      testId: lastCount + 1,
    };
  },
})

async function fetchCountFromSanity(query) {
  const url = `https://8390afyw.api.sanity.io/v2023-03-01/data/query/production?query=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    if (data && data.result) {
      return data.result;
    } else {
      throw new Error('Unexpected response structure');
    }
  } catch (error) {
    console.error('Error fetching count from Sanity:', error);
    return 0;
  }
}