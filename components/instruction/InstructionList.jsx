import { client } from '@/app/libs/sanity';
import classes from './InstructionList.module.css'
import Link from 'next/link';

export async function getData() {
  const query = `
  *[_type == 'instruction'] {
    title,
    "currentSlug": slug.current
  }
`;

  const data = await client.fetch(query);
  return data;
}

export default async function InstructionList() {
  const instructions = await getData();
  if (!instructions) return;
  return (
    <div className={classes.cardsWrapper}>
      {instructions.map((obj, index) => (
        <Link key={index} href={`instruction/${obj.currentSlug}`} className={classes.card}>
          {obj.title}
        </Link>
      ))}
    </div>
  )
}
