import { defineField, defineType } from 'sanity';

export const eventsType = defineType({
  name: "events",
  title: "ოლიმპიადები",
  type: "document",
  fields: [
    defineField({ name: "name", title: "დასახელება", type: "string" }),
    defineField({
      name: "cities",
      title: "ქალაქები",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "grades",
      title: "კლასები",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "dates",
      title: "დროები",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "eventName", title: "სათაური", type: "string" }),
          defineField({ name: "eventDate", title: "დრო", type: "date" }),
        ]
      }],
    }),
    defineField({
      name: "deadline",
      title: "ბოლო დღე რეგისტრაციისთვის",
      type: "date",
    }),
  ],
});
