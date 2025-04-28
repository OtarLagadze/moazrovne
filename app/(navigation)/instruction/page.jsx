import { client } from '@/app/libs/sanity';
import classes from './page.module.css'
import Link from 'next/link';

export async function getData() {
  const query = `
  *[_type == 'instruction'] | order(title, desc) {
    title,
    "currentSlug": slug.current
  }
`;

  const data = await client.fetch(query);
  return data;
}

export default async function InstructionList() {
  const instructions = await getData();
  if (!instructions) return <div>მონაცემები არ მოიძებნა</div>;
  return (
    <>
      <div className={classes.cardsWrapper}>
        {instructions.reverse().map((obj, index) => (
          <Link key={index} href={`instruction/${obj.currentSlug}`} className={classes.card}>
            {obj.title}
          </Link>
        ))}
      </div>
    </>
  )
}
