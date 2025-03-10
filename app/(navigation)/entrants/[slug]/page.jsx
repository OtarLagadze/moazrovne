import { client } from "@/app/libs/sanity";
import classes from "@/app/(navigation)/tests/page.module.css"

export const revalidate = 30;

async function getData(type) {
  const query = `
    *[_type == '${type}'] | order(title desc) {
      title,
      "file": ${type}.asset->url
    }
  `; 

  const data = await client.fetch(query);
  return data;
}

export default async function EntrantsSlug({ params }) {
  const data = await getData(params.slug);

  return (
    <>
      <h1 className={classes.mainHeading}>{params.slug === 'nationalExams' ? 'ეროვნული გამოცდების ტესტები მითითებებით და პასუხებით' : 'სავარჯიშო ტესტები პასუხებით'}</h1>
      <div className={classes.testWrapper}>
        {data?.map((test, i) => (
          <a
            href={test.file}
            key={test.file + i}
            className={classes.test}
            target="_blank"
            rel="noopener noreferrer"
            >
            {test.title}
            <div className={classes.testLabel}>
              <img src='/svg/test.svg' alt="test icon" style={{width: "30px", height: "30px"}}/>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
