import { defineField, defineType } from 'sanity';

export const problemsType = defineType({
  name: "problems",
  title: "ამოცანები",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "სათაური",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "taskId",
      type: "number",
      title: "ამოცანის ID",
      description: "ეს ID ავტომატურად გენერირდება",
      readOnly: true,
    }),
    defineField({
      name: "statement",
      type: "text",
      title: "ამოცანის პირობა",
      description: "აქ დაწერეთ ამოცანის პირობა",
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
      name: "tags",
      title: "თეგები",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: 'მაგალითად: "ალგებრა", "რიცხვთა თეორია", "კომბინატორიკა"',
    }),
    defineField({
      name: "hints",
      title: "მითითებები",
      type: "array",
      of: [{ type: "text" }],
      description: "დაამატეთ მითითებები",
    }),
    defineField({
      name: "comments",
      title: "კომენტარები",
      type: "array",
      of: [{ type: "text" }],
      description: "დაამატეთ კომენტარები",
    }),
    defineField({
      name: "photos",
      title: "ფოტოები",
      type: "array",
      of: [{ type: "image" }],
      description: "დაამატეთ ფოტოები ამოცანასთან დაკავშირებული",
    }),
  ],
  initialValue: async () => {
    const query = `count(*[_type == "problems"])`;
    const lastCount = await fetchCountFromSanity(query);
    return {
      taskId: lastCount + 1,
    };
  },
});

async function fetchCountFromSanity(query) {
  // const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  // const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  // const url = `https://${projectId}.api.sanity.io/v2023-03-01/data/query/${dataset}?query=${encodeURIComponent(query)}`;
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
